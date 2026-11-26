import { shareTags } from './portal-head.mjs';
import { officerHtml, policyContactLink } from './policy-notice.mjs';

const games = [
  ['cat-gomoku', '고양이 오목 (Cat Gomoku)', 'Cat Gomoku'],
  ['cat-detective', '냥탐정 (Cat Detective)', 'Cat Detective'],
  ['slime-express', '슬라임 택배 (Slime Express)', 'Slime Express'],
  ['dead-frequency', 'DEAD FREQUENCY', 'DEAD FREQUENCY'],
  ['cat-rush3', '3분 냥냥 던전 (Cat Dungeon: 3-Min Rush)', 'Cat Dungeon: 3-Min Rush'],
  ['indie-dev-tycoon', '인디 개발 타이쿤 (Indie Dev Tycoon)', 'Indie Dev Tycoon'],
];

const policyCopy = {
  ko: {
    title: 'TeamCP 개인정보처리방침',
    description: 'TeamCP 게임·앱·책 및 공식 사이트의 공통 개인정보처리방침입니다.',
    effective: '시행일: 2026년 11월 26일',
    intro: '이 문서는 TeamCP 게임·앱, 책·PDF 소개 및 공식 웹사이트에 공통으로 적용됩니다.',
    gameDetails: '제품마다 처리하는 정보가 다를 수 있으므로 제품별 방침도 확인하세요. 외부 판매처에서 책이나 PDF를 구매할 때에는 해당 판매처의 방침을 확인하세요.',
    operator: '1. 운영자',
    controller: '개인정보처리자: TeamCP',
    inquiries: '문의',
    directCollection: 'TeamCP는 자체 게임 계정을 운영하지 않습니다. 지원 요청을 이메일로 보내면 문의에 응답하기 위해 발신 주소와 요청 내용을 처리합니다.',
    games: '2. 출시 게임 방침',
    processed: '3. 게임·앱에서 처리할 수 있는 정보',
    storage: '<strong>기기 저장:</strong> 게임 진행, 설정, 보상·해금 상태는 Android 앱 전용 저장소에 보관합니다.',
    play: '<strong>Google Play Games(선택):</strong> 로그인, 플레이어 식별, 최고 점수 등 랭킹·저장 기능을 위해 Google이 인증 정보와 게임 진행 일부를 처리할 수 있습니다. 연결하지 않아도 싱글 플레이가 가능하도록 구성합니다.',
    ads: '<strong>광고:</strong> 일부 게임은 Unity LevelPlay와 Unity Ads로 배너 또는 선택형 보상 광고를 제공합니다. 광고 사업자는 광고 제공·측정·부정 이용 방지를 위해 기기·광고 식별자, 대략적 지역, 광고 이벤트 정보를 처리할 수 있습니다.',
    sales: 'TeamCP는 이용자 개인정보를 판매하지 않으며, 자체 분석 서버로 플레이 기록을 수집하지 않습니다.',
    services: '4. 외부 서비스',
    googlePolicy: 'Google 개인정보처리방침',
    playDeletion: 'Google Play Games 데이터 삭제',
    unityPolicy: 'Unity 게임 이용자 개인정보처리방침',
    providerHandling: '외부 서비스 제공자는 각자의 방침에 따라 정보를 보관하거나 국외에서 처리할 수 있습니다.',
    retention: '5. 보관, 삭제, 권리',
    retentionDetails: '기기 정보는 앱 데이터 삭제 또는 앱 삭제로 제거할 수 있습니다. Google Play Games 및 광고 정보는 각 사업자의 보관·삭제 정책과 권리 행사 경로를 따릅니다. 확인·정정·삭제가 필요하면 위 문의 주소로 앱 이름과 요청 종류를 알려 주세요.',
    children: '6. 아동',
    childrenDetails: '한국 「개인정보 보호법」에 따라 만 14세 미만 아동의 개인정보를 동의에 근거해 처리하는 경우 법정대리인의 동의가 필요합니다. 제품별 처리 방식은 해당 제품 방침을 확인하세요.',
    changes: '7. 변경',
    changeDetails: '처리 항목이나 연동 서비스가 바뀌면 이 페이지와 관련 제품 방침의 시행일을 갱신합니다.',
    currentRevision: '2026년 11월 26일 — 제공하는 게임 목록에 인디 개발 타이쿤을 추가하고 개인정보 보호책임자 안내를 반영했습니다.',
    revision: '2026년 11월 26일 — 공통 방침 적용 범위와 만 14세 미만 아동 동의 안내를 정리했습니다.',
    previousEffective: '2026년 9월 19일 — 이전 시행일',
    officer: '8. 개인정보 보호책임자',
  },
  en: {
    title: 'TeamCP Privacy Policy',
    description: 'General privacy policy for TeamCP games, apps, books, and the official website.',
    effective: 'Effective date: November 26, 2026',
    intro: 'This general policy covers TeamCP games and apps, book and PDF listings, and the official website.',
    gameDetails: 'Data handling may vary by product. Check the product’s own policy for details. If you buy a book or PDF from a retailer, check that retailer’s privacy policy.',
    operator: '1. Operator',
    controller: 'Data controller: TeamCP',
    inquiries: 'Inquiries',
    directCollection: 'TeamCP does not operate its own game accounts. If you contact support by email, we use the sender’s address and message to respond.',
    games: '2. Privacy policies for released games',
    processed: '3. Information games and apps may handle',
    storage: '<strong>Device storage:</strong> Game progress, settings, rewards, and unlocks are kept in Android app-specific storage.',
    play: '<strong>Google Play Games (optional):</strong> Google may process authentication information and some game progress for sign-in, player identification, leaderboards, and saves. Single-player play is available without connecting.',
    ads: '<strong>Advertising:</strong> Some games use Unity LevelPlay and Unity Ads for banners or optional rewarded ads. Ad providers may process device and advertising identifiers, approximate location, and ad events to deliver and measure ads and prevent abuse.',
    sales: 'TeamCP does not sell personal information or collect gameplay records on its own analytics servers.',
    services: '4. External services',
    googlePolicy: 'Google Privacy Policy',
    playDeletion: 'Delete Google Play Games data',
    unityPolicy: 'Unity Game Player and App User Privacy Policy',
    providerHandling: 'External providers may retain information or process it overseas according to their own policies.',
    retention: '5. Retention, deletion, and rights',
    retentionDetails: 'You can remove locally stored information by clearing Android app data or uninstalling the app. For Google Play Games and advertising information, the providers’ retention, deletion, and rights procedures apply. To request access, correction, or deletion, email us with the app name and the type of request.',
    children: '6. Children',
    childrenDetails: 'Under Korea’s Personal Information Protection Act, processing the personal information of a child under 14 on the basis of consent requires consent from the child’s legal representative. See the relevant product policy for its data handling practices.',
    changes: '7. Changes',
    changeDetails: 'When the types of information we process or the services we use change, we update the effective date on this page and in the relevant product policy.',
    currentRevision: 'November 26, 2026 — Added Indie Dev Tycoon to the game list and included privacy officer information.',
    revision: 'November 26, 2026 — Clarified the scope of this policy and the consent rule for children under 14.',
    previousEffective: 'September 19, 2026 — Previous effective date',
    officer: '8. Privacy officer',
  },
};

export function commonPrivacy(language, productPolicy) {
  const english = language === 'en';
  const copy = policyCopy[language];
  const path = english ? '/en/privacy/' : '/privacy/';
  const alternate = english ? '/privacy/' : '/en/privacy/';
  const home = english ? '/en/' : '/';
  const gameLinks = games.map(([slug, ko, en]) => {
    const target = productPolicy(slug);
    const fallback = english && target.language === 'ko' ? ' (Korean)' : '';
    return `      <li><a href="${target.href}" hreflang="${target.language}">${english ? en : ko}${fallback}</a></li>`;
  }).join('\n');

  const html = `<!doctype html>
<html lang="${language}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <meta name="theme-color" content="#fff8ed">
  <title>${copy.title}</title>
  <meta name="description" content="${copy.description}">
${shareTags(copy.title, copy.description, path, language)}
  <link rel="canonical" href="https://sjw0408.github.io${path}">
  <link rel="alternate" hreflang="ko" href="https://sjw0408.github.io/privacy/">
  <link rel="alternate" hreflang="en" href="https://sjw0408.github.io/en/privacy/">
  <style>
    :root {
      color-scheme: only light;
      font-family: Pretendard, "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: #4b382f;
      background: #fff8ed;
    }
    * { box-sizing: border-box; }
    body { margin: 0; line-height: 1.75; }
    main {
      width: min(820px, calc(100% - 32px));
      margin: 38px auto;
      padding: clamp(26px, 6vw, 54px);
      border: 1px solid rgb(118 80 61 / 14%);
      border-radius: 30px;
      background: #fffdf8;
      box-shadow: 0 18px 56px rgb(93 67 45 / 11%);
    }
    .policy-nav { display: flex; flex-wrap: wrap; gap: 8px; justify-content: space-between; }
    .policy-nav a, .link-list a {
      padding: 5px 12px;
      border: 1px solid #a78068;
      border-radius: 9px;
      background: #fff2e1;
      font-weight: 750;
      text-decoration: none;
    }
    .policy-nav a:hover, .policy-nav a:active, .link-list a:hover, .link-list a:active { background: #f6e2cb; }
    h1 {
      margin: 38px 0 6px;
      color: #76503d;
      font-size: clamp(1.9rem, 6vw, 2.8rem);
      line-height: 1.2;
      letter-spacing: -0.045em;
      word-break: keep-all;
    }
    h2 {
      margin: 38px 0 10px;
      color: #76503d;
      font-size: 1.22rem;
      letter-spacing: -0.02em;
    }
    p, li { word-break: keep-all; }
    .effective { margin: 0 0 28px; color: #715c50; }
    .notice {
      margin: 0 0 34px;
      padding: 18px 20px;
      border: 1px solid #ead7bd;
      border-radius: 18px;
      background: #fff2d8;
    }
    ul { padding-left: 22px; }
    li + li { margin-top: 6px; }
    a {
      display: inline-flex;
      align-items: center;
      min-width: 48px;
      min-height: 48px;
      max-width: 100%;
      color: #884736;
      text-underline-offset: 3px;
      overflow-wrap: anywhere;
    }
    a:focus-visible { outline: 3px solid #884736; outline-offset: 3px; }
    footer {
      margin-top: 42px;
      padding-top: 20px;
      border-top: 1px solid #ead7bd;
      color: #715c50;
      font-size: 0.86rem;
    }
    footer p { margin: 4px 0; }
    @media (prefers-color-scheme: dark) {
      :root { color-scheme: dark; background: #171425; color: #f4ebff; }
      main { background: #211b31; border-color: #56466d; }
      h1, h2 { color: #efdbff; }
      .effective, footer { color: #ddcfe8; }
      .notice, .policy-nav a, .link-list a { background: #382851; border-color: #775e9e; }
      .policy-nav a:hover, .policy-nav a:active, .link-list a:hover, .link-list a:active { background: #50386f; }
      a { color: #e3c6ff; }
      a:focus-visible { outline-color: #c5a2ff; }
      footer { border-color: #56466d; }
    }
  </style>
</head>
<body>
  <main>
    <div class="policy-nav">
      <a class="back" href="${home}">← TeamCP</a>
      <a class="lang" href="${alternate}" lang="${english ? 'ko' : 'en'}" hreflang="${english ? 'ko' : 'en'}">${english ? '한국어' : 'English'}</a>
    </div>
    <h1>${copy.title}</h1>
    <p class="effective">${copy.effective}</p>

    <p class="notice">
      ${copy.intro}
      ${copy.gameDetails}
    </p>

    <h2>${copy.operator}</h2>
    <p>${copy.controller}</p>
    <p>${copy.inquiries}: ${policyContactLink}</p>
    <p>${copy.directCollection}</p>

    <h2>${copy.games}</h2>
    <ul class="link-list">
${gameLinks}
    </ul>

    <h2>${copy.processed}</h2>
    <ul>
      <li>${copy.storage}</li>
      <li>${copy.play}</li>
      <li>${copy.ads}</li>
    </ul>
    <p>${copy.sales}</p>

    <h2>${copy.services}</h2>
    <ul class="link-list">
      <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener">${copy.googlePolicy}</a></li>
      <li><a href="https://support.google.com/googleplay/answer/9130646?hl=${language}" target="_blank" rel="noopener">${copy.playDeletion}</a></li>
      <li><a href="https://unity.com/legal/game-player-and-app-user-privacy-policy" target="_blank" rel="noopener">${copy.unityPolicy}</a></li>
    </ul>
    <p>${copy.providerHandling}</p>

    <h2>${copy.retention}</h2>
    <p>${copy.retentionDetails}</p>

    <h2>${copy.children}</h2>
    <p>${copy.childrenDetails}</p>

    <h2>${copy.changes}</h2>
    <p>${copy.changeDetails}</p>
    <ul>
      <li>${copy.revision}</li>
      <li>${copy.currentRevision}</li>
      <li>${copy.previousEffective}</li>
    </ul>

    <section aria-labelledby="privacy-officer">
      <h2 id="privacy-officer">${copy.officer}</h2>
${officerHtml(language).split('\n').map(line => '      ' + line).join('\n')}
    </section>

    <footer>
      <p>TeamCP · <a href="${home}">sjw0408.github.io</a></p>
    </footer>
  </main>
</body>
</html>
`;
  return english ? html : html.replaceAll('\n', '\r\n');
}
