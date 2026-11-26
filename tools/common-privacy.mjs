import { officerHtml, policyContactLink } from './policy-notice.mjs';

const games = [
  ['cat-gomoku', '고양이 오목 (Cat Gomoku)', 'Cat Gomoku'],
  ['cat-detective', '냥탐정 (Cat Detective)', 'Cat Detective'],
  ['slime-express', '슬라임 택배 (Slime Express)', 'Slime Express'],
  ['dead-frequency', 'DEAD FREQUENCY', 'DEAD FREQUENCY'],
  ['cat-rush3', '3분 냥냥 던전 (CatRush 3)', 'CatRush 3'],
];

const policyCopy = {
  ko: {
    title: 'TeamCP 개인정보처리방침',
    description: 'TeamCP 게임과 Google Play Games 연동에 관한 개인정보처리방침입니다.',
    effective: '시행일: 2026년 9월 19일',
    intro: 'TeamCP는 Android 게임을 개발·운영합니다. 이 문서는 TeamCP 게임 전반과 Google Play Games 연동에 공통으로 적용되는 안내입니다.',
    gameDetails: '게임별로 처리하는 정보가 다를 수 있으므로, 각 게임의 상세 방침도 함께 확인하세요.',
    operator: '1. 운영자',
    controller: '개인정보처리자: TeamCP',
    inquiries: '문의',
    directCollection: 'TeamCP는 자체 게임 계정을 운영하지 않으며, 이름·이메일·전화번호·결제 정보를 앱에서 직접 입력받지 않습니다.',
    games: '2. 제공하는 게임',
    processed: '3. 공통으로 처리하는 정보',
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
    childrenDetails: 'TeamCP 게임은 아동 전용 서비스가 아니며, 스토어 타겟층은 만 13세 이상을 기준으로 합니다. 콘텐츠 연령 등급은 개인정보 동의 자격을 의미하지 않습니다.',
    changes: '7. 변경',
    changeDetails: '처리 항목이나 연동 서비스가 바뀌면 이 페이지와 각 게임 방침의 시행일을 갱신합니다.',
    officer: '8. 개인정보 보호책임자',
  },
  en: {
    title: 'TeamCP Privacy Policy',
    description: 'Privacy policy for TeamCP games and Google Play Games integration.',
    effective: 'Effective date: September 19, 2026',
    intro: 'TeamCP develops and operates Android games. This policy covers TeamCP games in general and their Google Play Games integration.',
    gameDetails: 'See the policy for each game for details about the information it handles.',
    operator: '1. Operator',
    controller: 'Data controller: TeamCP',
    inquiries: 'Inquiries',
    directCollection: 'TeamCP does not operate its own game accounts or ask players to enter their name, email address, phone number, or payment information directly in its apps.',
    games: '2. Our games',
    processed: '3. Information commonly processed',
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
    childrenDetails: 'TeamCP games are designed for a general audience, with a store target age of 13 and above. Content age ratings do not determine whether someone can consent to personal data processing.',
    changes: '7. Changes',
    changeDetails: 'When the types of information we process or the services we use change, we update the effective date on this page and on each game’s policy.',
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
  <meta name="color-scheme" content="light">
  <meta name="theme-color" content="#fff8ed">
  <title>${copy.title}</title>
  <meta name="description" content="${copy.description}">
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
  </style>
</head>
<body>
  <main>
    <div class="policy-nav">
      <a class="back" href="${home}">← TeamCP Games</a>
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

    <section aria-labelledby="privacy-officer">
      <h2 id="privacy-officer">${copy.officer}</h2>
${officerHtml(language).split('\n').map(line => '      ' + line).join('\n')}
    </section>

    <footer>
      <p>TeamCP Games · <a href="${home}">sjw0408.github.io</a></p>
    </footer>
  </main>
</body>
</html>
`;
  return english ? html : html.replaceAll('\n', '\r\n');
}
