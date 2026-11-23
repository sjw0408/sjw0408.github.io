// 개인정보 보호법 추가 고지(POLICY-FIX·FIX2·FIX3)를 생성기 출력에 넣는다.
// - 국외 이전 세부 고지(제28조의8): 한국어는 국외 처리 절, 외국어는 providers(없으면 ads) 절 끝
// - 정보주체 권리·만 14세 미만·안전성 확보 조치·개인정보 보호책임자(제30조, 시행령 제31조): 푸터 바로 앞 + 차례
// 원문: tools/policy-notice.json (보호책임자 표기는 officer 항목 한 곳만 고치면 전 쪽에 반영)
// 게임별 원문 JSON은 텍스트만 담으므로, HTML 구조가 필요한 게임별 추가 문단은 같은 파일의 inserts에 둔다.
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const D = JSON.parse(readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), 'policy-notice.json'), 'utf8'));
const NL = '\n';

const ul = xs => '<ul>' + xs.map(x => `<li>${x}</li>`).join('') + '</ul>';
const dl = (title, idattr, labels, vals) => [`<div class="xfer-item" id="${idattr}"><h4>${title}</h4><dl>`,
  ...vals.map((v, i) => `<dt>${labels[i]}</dt><dd>${v}</dd>`), '</dl></div>'].join(NL);

function officerHtml(lang) {
  const colon = ['ja', 'zh-tw'].includes(lang) ? '：' : lang === 'fr' ? ' : ' : ': ';
  const rows = D.officer[lang].map(([k, v]) => `<li><strong>${k}</strong>${colon}${v.replaceAll('{mail}', D.mail)}</li>`).join('');
  return `<ul class="pipa-officer">${rows}</ul>${NL}<p>${D.officerNote[lang]}</p>`;
}

function pipaBlock(g, lang) {
  const t = D.pipa[lang], c = D.games[g];
  const mail = s => s.replaceAll('{mail}', D.mail);
  const rights = [t.r_1, mail(t.r_2), t.r_3, t.r_4, t.r_5, t.r_6];
  const mode = D.adsMode[g] ?? 'choice';
  const kids = [t.c_law, t.c_facts + (D.noSignal.includes(g) ? '' : ' ' + t.c_signal),
    t['c_ads_' + { choice: 'choice', np: 'default_np', eea: 'eea', os: 'os' }[mode]], t.c_no_pi, t.c_guardian, t.c_delete];
  const parts = [t.p_ads];
  if (c.pgs || c.backup) parts.push(t.p_google);
  if (c.report) parts.push(t.p_report);
  if (c.firebase) parts.push(t.p_firebase);
  const sep = ['ja', 'zh-tw'].includes(lang) ? '、' : lang !== 'ko' ? ', ' : '·';
  const sec = [t.s_device, t.s_transport.replace('{parts}', parts.join(sep))];
  if (c.report) sec.push(t.s_report);
  if (c.firebase) sec.push(t.s_firebase);
  sec.push(t.s_min);
  if (c.report) sec.push(t.s_ret_report);
  if (c.firebase) sec.push(t.s_ret_fb);
  if (!c.report && !c.firebase) sec.push(t.s_ret_none);
  sec.push(t.s_ret_mail, t.s_third);
  return [D.pipaStyle,
    '<section id="pipa-notice" class="pipa" aria-labelledby="pipa-notice-h">',
    `<h2 id="pipa-notice-h">${t.title}</h2>`, `<p>${t.intro}</p>`,
    `<h3 id="pipa-rights">${t.r_h}</h3>`, ul(rights),
    `<h3 id="pipa-children">${t.c_h}</h3>`, ul(kids),
    `<h3 id="pipa-security">${t.s_h}</h3>`, ul(sec),
    `<h3 id="privacy-officer">${t.o_h}</h3>`, officerHtml(lang),
    `<p>${mail(t.o_contact)}</p>`, '</section>'].join(NL);
}

function xferForeign(g, lang) {
  const x = D.xfer[lang], c = D.games[g], L = x.L;
  const out = [D.xferStyle, '<div class="xfer" id="overseas-transfer">', `<h3>${x.h}</h3>`, `<p>${x.intro}</p>`,
    dl(x.ads_t, 'xfer-ads', L, [x.u_who, x.u_country, x.u_items, x.u_when, x.u_why, x.u_keep, x.u_basis, x.u_refuse])];
  const pgs = c.pgs, bk = c.backup;
  if (pgs || bk) {
    const p = pgs ? D.pgs[g][lang] : null;
    const items = [], why = [], refuse = [];
    if (pgs) { items.push(x.pgs_label + p[0]); why.push(p[1] || x.pgs_why_default); refuse.push(p[2]); }
    if (bk) { items.push(x.backup_item); why.push(x.backup_why); refuse.push(x.backup_refuse); }
    const title = 'Google — ' + [...(pgs ? [x.pgs_t] : []), ...(bk ? [x.backup_t] : [])].join(' · ');
    const basis = pgs ? x.g_basis_pgs + (bk ? x.g_basis_pgs_backup : '') : x.g_basis_backup;
    const jw = ['ja', 'zh-tw'].includes(lang) ? '、' : ', ';
    out.push(dl(title, 'xfer-google', L, [x.g_who, x.g_country, items.join('<br>'), x.g_when, why.join(jw),
      pgs ? x.g_keep_pgs : x.g_keep_backup, basis, refuse.join(' ')]));
  }
  if (c.firebase) out.push(dl(x.fb_t, 'xfer-firebase', L, [x.fb_who, x.fb_country, x.fb_items, x.fb_when, x.fb_why, x.fb_keep, x.fb_basis, x.fb_refuse]));
  const dom = [];
  if (c.report) dom.push(`<li>${x.dom_report}</li>`);
  if (c.onestore_iap) dom.push(`<li>${x.dom_os}</li>`);
  if (dom.length) out.push(`<p>${x.dom}</p><ul>` + dom.join('') + '</ul>');
  out.push('</div>');
  return out.join(NL);
}

function xferKo(g) {
  const k = D.xferKo, c = D.games[g], u = k.unity;
  const L = ['이전받는 자·연락처', '이전 국가', '이전 항목', '이전 시기·방법', '이전 목적', '보유·이용 기간', '이전 근거', '거부 방법과 효과'];
  const out = [D.xferStyle, '<div class="xfer" id="overseas-transfer">', `<h3>국외 이전 세부 고지 (${k.date} 추가)</h3>`, `<p>${k.intro}</p>`,
    dl(k.ads_t, 'xfer-ads', L, [u.who, u.country, u.items, u.when, u.why, u.keep, u.basis, u.refuse])];
  if (c.pgs || c.backup) {
    const items = [], purpose = [], refuse = [];
    if (c.pgs) { items.push((c.pgs_label ?? 'Google Play 게임즈: ') + c.pgs); purpose.push(c.pgs_why ?? k.pgs_why_default); refuse.push(c.pgs_refuse); }
    if (c.backup) { items.push(k.backup_item); purpose.push(k.backup_why); refuse.push(k.backup_refuse); }
    const title = 'Google — ' + [c.pgs ? 'Google Play 게임즈' : '', c.backup ? 'Android 자동 백업' : ''].filter(Boolean).join(' · ');
    const basis = c.pgs ? k.basis_pgs + (c.backup ? k.basis_pgs_backup : '') : k.basis_backup;
    out.push(dl(title, 'xfer-google', L, [k.google_who, k.google_country, items.join('<br>'), k.google_when, purpose.join(', '),
      c.pgs ? k.google_keep_pgs : k.google_keep_backup, basis, refuse.join(' ')]));
  }
  if (c.firebase) out.push(dl(k.fb_t, 'xfer-firebase', L, k.fb));
  const li = [];
  if (c.report) li.push(`<li>${k.dom_report}</li>`);
  if (c.onestore_iap) li.push(`<li>${k.dom_os}</li>`);
  out.push(li.length ? `<p>${k.dom}</p><ul>` + li.join('') + '</ul>' : '');
  out.push('</div>');
  return out.join(NL);
}

// 절의 끝(</section>) 바로 앞에 블록을 넣는다. 들여쓰기 공백은 블록 앞 줄에 그대로 남는다(기존 게시본과 같은 모양).
function insertAt(s, pos, block) { return s.slice(0, pos) + NL + block + NL + s.slice(pos); }

function insertXfer(s, g, lang) {
  if (lang === 'ko') {
    let m = null;
    for (const re of [/<h2[^>]*>[^<]*(국외 처리|해외 처리|외부 서비스와 정보 처리)[^<]*<\/h2>/, /<h2[^>]*>[^<]*광고와 선택[^<]*<\/h2>/]) {
      m = re.exec(s); if (m) break;
    }
    if (!m) throw new Error(`${g}/${lang}: 국외 이전 고지 위치(국외 처리 절)를 찾지 못함`);
    const end = m.index + m[0].length;
    const nxt = /<\/section>|<h2/.exec(s.slice(end));
    return insertAt(s, end + nxt.index, xferKo(g));
  }
  let m = null;
  for (const id of ['providers', 'ads']) { m = new RegExp(`<h2 id="${id}"`).exec(s); if (m) break; }
  if (!m) throw new Error(`${g}/${lang}: providers·ads 절 없음`);
  return insertAt(s, s.indexOf('</section>', m.index + m[0].length), xferForeign(g, lang));
}

function insertBeforeFooter(s, block) {
  let i = s.indexOf('<footer');
  if (i < 0) i = s.indexOf('</main>');
  if (i < 0) throw new Error('footer 없음');
  const j = s.lastIndexOf('\n', i) + 1;
  return s.slice(0, j) + block + NL + s.slice(j);
}

function addToc(s, label) {
  if (s.includes('href="#pipa-notice"')) return s;
  const m = /<nav class="contents"[^>]*>[\s\S]*?<\/ul>/.exec(s);
  if (!m) return s;
  const seg = m[0];
  const mli = /\n(\s*)<li>/.exec(seg);
  const ind = mli ? mli[1] : '        ';
  const close = ind.length >= 2 ? ind.slice(0, -2) : '';
  return s.replace(seg, () => seg.slice(0, -5) + `${ind}<li><a href="#pipa-notice">${label}</a></li>\n${close}</ul>`);
}

function applyInserts(s, g, lang) {
  for (const { after, html } of D.inserts?.[g]?.[lang] ?? []) {
    const n = s.split(after).length - 1;
    if (n !== 1) throw new Error(`${g}/${lang}: 추가 문단 기준 문구가 ${n}번 나옴: ${after.slice(0, 40)}`);
    s = s.replace(after, () => after + html);
  }
  return s;
}

export function applyPolicyNotice(html, game, code) {
  const lang = code.toLowerCase();
  if (!D.games[game]) throw new Error(`policy-notice.json에 ${game} 설정 없음`);
  let s = applyInserts(html, game, lang);
  s = insertXfer(s, game, lang);
  s = insertBeforeFooter(s, pipaBlock(game, lang));
  return addToc(s, D.toc[lang]);
}
