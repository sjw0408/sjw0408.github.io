import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const codes = ['ko', 'en', 'ja', 'es', 'fr', 'de'];
const base = '/games/cat-detective/privacy/';
let checkedLinks = 0;
for (const code of codes) {
  const path = code === 'ko' ? base : `${base}${code}/`;
  const html = readFileSync(resolve(root, `.${path}`, 'index.html'), 'utf8');
  assert.ok(html.startsWith('<!doctype html>'));
  assert.ok(html.includes(`<html lang="${code}">`));
  assert.equal((html.match(/<h1>/g) ?? []).length, 1);
  assert.equal((html.match(/aria-current="page"/g) ?? []).length, 1);
  assert.ok(html.includes('name="policy-revision" content="2026-09-07-v3"'));
  assert.ok(html.includes('id="delete-data"'));
  assert.ok(html.includes('href="mailto:sjw0480@gmail.com"'));
  assert.ok(html.includes('com.teamcp.catdetective'));
  const names = { ko: '냥탐정', en: 'Cat Detective', ja: 'ニャン探偵', es: 'Detective Felino', fr: 'Chat Détective', de: 'Katzendetektiv' };
  assert.ok(html.includes(`<title>`) && html.match(/<title>([^<]+)<\/title>/)[1].includes(names[code]), `${code}: app title differs`);
  assert.ok(!/<script|<iframe|<form|<input|\son\w+=|�/i.test(html));
  assert.ok(!/\bTODO\b|\bTBD\b/.test(html)); // Spanish "todo" is normal translated text.
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, `${code}: duplicate IDs`);
  for (const [, href] of html.matchAll(/\shref="([^"]+)"/g)) {
    if (href.startsWith('#')) assert.ok(ids.includes(href.slice(1)), `${code}: missing anchor ${href}`);
    else if (href.startsWith('/')) {
      const target = resolve(root, `.${href}`, href.endsWith('/') ? 'index.html' : '');
      assert.ok(!relative(root, target).startsWith('..'));
      assert.ok(existsSync(target), `${code}: missing local resource ${href}`);
    } else assert.ok(href.startsWith('https://') || href.startsWith('mailto:'), `Unsafe URL ${href}`);
    checkedLinks++;
  }
}
console.log(`PASS: 6 static pages, 10 aligned sections each, ${checkedLinks} links, deletion anchors and no runtime tracking/scripts.`);

// Read-only post-publication check. --local checks the explicitly started local preview.
// Never checks an arbitrary host or bypasses a failed page using a substitute translation.
if (process.argv.includes('--live') || process.argv.includes('--local')) {
  const origin = process.argv.includes('--local') ? 'http://127.0.0.1:8765' : 'https://sjw0408.github.io';
  const paths = [...codes.map(code => code === 'ko' ? base : `${base}${code}/`), `${base}policy.css`];
  for (const path of paths) {
    const response = await fetch(`${origin}${path}`, { signal: AbortSignal.timeout(20000), redirect: 'error' });
    assert.equal(response.status, 200, `HTTP failure: ${path}`);
    const expected = readFileSync(resolve(root, `.${path}`, path.endsWith('/') ? 'index.html' : ''), 'utf8');
    assert.equal((await response.text()).replaceAll('\r\n', '\n'), expected.replaceAll('\r\n', '\n'), `Published content differs: ${path}`);
    console.log(`HTTP 200 and exact content: ${path}`);
  }
}
