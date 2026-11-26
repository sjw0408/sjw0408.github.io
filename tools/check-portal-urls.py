#!/usr/bin/env python3
"""Check the approved URL inventory against a served GitHub Pages build."""

import argparse
from concurrent.futures import ThreadPoolExecutor
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.error import HTTPError
from urllib.parse import quote, unquote, urljoin, urlsplit, urlunsplit
from urllib.request import HTTPRedirectHandler, Request, build_opener

BASELINE_ADS_HASH = 'a7296836ba9b169088ff6c58aa48fe708d8e85e02741b3e4e4c13b2add6847e3'
INVENTORY = Path(__file__).with_name('portal-urls.json')


class Document(HTMLParser):
    def __init__(self, contents):
        super().__init__(convert_charrefs=True)
        self.anchors = set()
        self.refresh = None
        self.document_link = None
        self.feed(contents.decode('utf-8', errors='replace'))

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if 'id' in attrs:
            self.anchors.add(attrs['id'])
        if tag == 'a' and 'name' in attrs:
            self.anchors.add(attrs['name'])
        if tag == 'a' and attrs.get('id') == 'document-link':
            self.document_link = attrs.get('href')
        if tag == 'meta' and (attrs.get('http-equiv') or '').lower() == 'refresh':
            refresh = re.fullmatch(r'0\s*;\s*url=(.+)', attrs.get('content', ''), re.I)
            if refresh:
                self.refresh = refresh[1]


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, hdrs, newurl):
        return None


def encoded_url(url):
    parts = urlsplit(url)
    path = quote(parts.path, safe="/%:@!$&'()*+,;=-._~")
    query = quote(parts.query, safe="%!$&'()*+,;=:/?@-._~")
    fragment = quote(parts.fragment, safe="%!$&'()*+,;=:/?@-._~")
    return urlunsplit(parts._replace(path=path, query=query, fragment=fragment))


def resolve_redirect(url, destination, preserve_query=False):
    result = urlsplit(urljoin(url, destination))
    source = urlsplit(url)
    if '#' not in destination:
        result = result._replace(fragment=source.fragment)
    if preserve_query and '?' not in destination:
        result = result._replace(query=source.query)
    return encoded_url(urlunsplit(result))


def equivalent(a, b):
    a, b = urlsplit(a), urlsplit(b)
    return (a.scheme, a.netloc, unquote(a.path), a.query, unquote(a.fragment)) == (
        b.scheme, b.netloc, unquote(b.path), b.query, unquote(b.fragment)
    )


def fetch(url):
    req = Request(urlunsplit(urlsplit(url)._replace(fragment='')), headers={
        'User-Agent': 'TeamCP Pages URL compatibility check',
    })
    try:
        response = build_opener(NoRedirect).open(req, timeout=20)
    except HTTPError as error:
        response = error
    with response:
        return response.code, response.headers, response.read()


def check(row, base):
    start = encoded_url(urljoin(base, row['request']))
    expected = encoded_url(urljoin(base, row['expected']))
    source = urlsplit(start)
    is_doc_alias = row['request'].endswith('.md') and row['expected'].endswith('.html')
    current = start
    result = {
        **row, 'requestUrl': start, 'expectedUrl': expected,
        'steps': [], 'finalStatus': None, 'finalUrl': None, 'errors': [],
    }
    errors = result['errors']
    try:
        for _ in range(6):
            status, headers, body = fetch(current)
            result['steps'].append({'url': current, 'status': status})
            if status in (301, 302, 303, 307, 308) and headers.get('Location'):
                current = resolve_redirect(current, headers['Location'])
                continue
            result['finalStatus'], result['finalUrl'] = status, current
            if status != 200:
                errors.append(f'HTTP {status}')
                break
            document = Document(body) if headers.get_content_type() == 'text/html' else None
            if is_doc_alias and not equivalent(current, expected) and document:
                redirect_to = document.refresh
                if redirect_to and redirect_to == document.document_link:
                    result['steps'][-1]['documentRedirect'] = redirect_to
                    current = resolve_redirect(current, redirect_to, preserve_query=True)
                    continue
            anchors = []
            if source.fragment:
                anchors.append(unquote(source.fragment))
            if row['request'] in ('/', '/index.html'):
                anchors.extend(('hero-title', 'games-title'))
            result['anchors'] = {name: bool(document and name in document.anchors) for name in anchors}
            if not all(result['anchors'].values()):
                errors.append('Missing anchor')
            if row['request'] == '/app-ads.txt':
                result['sha256'] = hashlib.sha256(body).hexdigest()
                if result['sha256'] != BASELINE_ADS_HASH:
                    errors.append('app-ads.txt SHA-256 mismatch')
            break
        else:
            errors.append('Too many redirects')
    except (OSError, ValueError) as exc:
        errors.append(str(exc))
    result['queryPreserved'] = bool(result['finalUrl'] and source.query == urlsplit(result['finalUrl']).query)
    result['fragmentPreserved'] = bool(
        result['finalUrl'] and unquote(source.fragment) == unquote(urlsplit(result['finalUrl']).fragment)
    )
    if not result['queryPreserved']:
        errors.append('Query changed')
    if not result['fragmentPreserved']:
        errors.append('Fragment changed')
    if not result['finalUrl'] or not equivalent(expected, result['finalUrl']):
        errors.append('Unexpected final URL')
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('base_url', help='Origin of the local preview or deployed website')
    parser.add_argument('result', type=Path, help='Path to the JSON result')
    args = parser.parse_args()
    rows = json.loads(INVENTORY.read_text(encoding='utf-8'))
    if len(rows) != 167 or len({row['request'] for row in rows}) != 167:
        parser.error('expected exactly 167 unique URL contracts')
    with ThreadPoolExecutor(max_workers=8) as pool:
        results = list(pool.map(lambda row: check(row, args.base_url), rows))
    passed = sum(not item['errors'] for item in results)
    fixed = sum(not item['errors'] and item['baselineStatus'] == 404 for item in results)
    report = {'baseUrl': args.base_url, 'total': len(results), 'passed': passed,
              'failed': len(results) - passed, 'baseline404Resolved': fixed, 'rows': results}
    args.result.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'{passed}/{len(results)} passed; {fixed}/7 baseline 404s resolved. {args.result}')
    for result in results:
        if result['errors']:
            print(result['request'], '|', ', '.join(result['errors']))
    return int(passed != len(results))


if __name__ == '__main__':
    raise SystemExit(main())
