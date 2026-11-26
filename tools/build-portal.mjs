import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const check = process.argv.includes('--check');
const origin = 'https://sjw0408.github.io';
const email = 'teamcp.channel@gmail.com';
const siteFile = path => fileURLToPath(new URL('../' + path, import.meta.url));
const escape = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);

const sections = {
  games: ['게임', 'Games'],
  apps: ['앱', 'Apps'],
  books: ['전자책', 'Books'],
  support: ['고객지원', 'Support'],
};
const shared = {
  navigation: ['주 메뉴', 'Main menu'],
  skip: ['본문으로 건너뛰기', 'Skip to content'],
  home: ['홈', 'Home'],
  privacy: ['개인정보처리방침', 'Privacy policy'],
  commonPolicy: ['TeamCP 공통 개인정보처리방침', 'TeamCP general privacy policy (Korean)'],
  gameInfo: ['게임 정보', 'Game information'],
  gameInfoKorean: ['게임 정보', 'Game information (Korean)'],
  policyKorean: ['개인정보처리방침', 'Privacy policy (Korean)'],
  oneStore: ['원스토어', 'ONE store'],
  access: ['열람·삭제 요청', 'Request access or deletion'],
  deletion: ['데이터 삭제 안내', 'Data deletion instructions'],
  report: ['오류 신고', 'Report an issue'],
};

const games = [
  {
    slug: 'cat-detective', package: 'catdetective', oneStore: '0001012623',
    name: ['냥탐정', 'Cat Detective'],
    description: ['장면 속 단서를 찾아 사건을 해결하는 관찰 추리 게임.', 'Find clues hiding in each scene and use them to solve the case.'],
  },
  {
    slug: 'cat-gomoku', package: 'catgomoku',
    name: ['고양이 오목', 'Cat Gomoku'],
    description: ['11×11 오목판에서 AI 대국, 묘수 풀이와 온라인 대전을 즐기는 게임.', 'Play AI matches, solve puzzles, or challenge other players online on an 11×11 Gomoku board.'],
  },
  {
    slug: 'slime-express', package: 'slimeexpress', oneStore: '0001012149',
    name: ['슬라임 택배', 'Slime Express'],
    description: ['슬라임을 조종해 장애물을 피하고 택배를 배달하는 점수 도전 게임.', 'Guide a slime past obstacles, deliver packages, and chase your high score.'],
  },
  {
    slug: 'cat-rush3', package: 'catrush3',
    name: ['3분 냥냥 던전', 'CatRush 3'],
    description: ['고양이 기사와 함께 3분 안에 성장하고 던전 보스에 도전하는 액션 RPG.', 'Power up your cat knight and take on the dungeon boss in a three-minute action RPG run.'],
  },
  {
    slug: 'dead-frequency', package: 'deadfrequency',
    name: ['DEAD FREQUENCY', 'DEAD FREQUENCY'],
    description: ['재난 뒤 무전기로 교신하며 15일을 버티는 텍스트 생존 게임.', 'Use radio calls to survive 15 days after a disaster in a text-based survival game.'],
  },
  {
    slug: 'indie-dev-tycoon', package: 'indiedevtycoon',
    name: ['인디 개발 타이쿤', 'Indie Dev Tycoon'],
    description: ['원룸의 1인 개발자에서 게임 회사를 키우는 경영 게임.', 'Start as a solo developer in a small apartment and grow your own game studio.'],
  },
];

const upcoming = [
  {
    slug: 'cat-pirates',
    name: ['냥냥 해적단', 'Cat Pirates: Midnight Snack Heist'],
    description: ['낮에는 집을 정찰하고, 밤에는 고양이 원정대를 꾸려 경비를 피해 간식을 노리는 잠입 퍼즐.', 'Scout the house by day and lead a crew of cats on a stealthy snack heist by night.'],
  },
  {
    slug: 'nyang-merge',
    name: ['냥이 합치기', 'Nyang Merge'],
    description: ['같은 단계의 고양이를 합쳐 더 높은 단계의 고양이를 만드는 퍼즐.', 'Drop and merge matching cats to create higher-level cats and beat your high score.'],
  },
  {
    slug: 'nyan-churu-bus',
    name: ['냥이 츄르 버스', 'Nyan Churu Bus'],
    description: ['길이 열린 고양이를 같은 색 버스에 태워 보내는 길 찾기 퍼즐.', 'Clear paths and send each cat to the bus of its color.'],
  },
  {
    slug: 'cat-bento-sort',
    name: ['냥냥 도시락 공장', 'Cat Bento Sort'],
    description: ['벨트 위 간식을 골라 고양이 손님의 도시락 주문을 채우는 정리 퍼즐.', 'Pick snacks from the conveyor belt to fill your cat customers’ bento orders.'],
  },
  {
    slug: 'cat-way-out',
    name: ['냥냥 길 비켜', 'CatWayOut'],
    description: ['고양이가 바라보는 방향을 살펴 출구까지 길을 여는 퍼즐.', 'Look where each cat is facing and clear its path to the exit.'],
  },
  {
    slug: 'cat-fishing-aquarium', detail: false,
    name: ['냥이 낚시 어항', 'Cat Fishing Aquarium'],
    description: ['물고기를 잡고 도감을 채우며 나만의 어항을 꾸미는 게임.', 'Catch fish, complete your collection, and decorate your own aquarium.'],
  },
  {
    slug: 'cat-water-buddy', detail: false,
    name: ['냥이 물그릇', 'Cat Water Buddy'],
    description: ['마신 물을 기록할 때마다 고양이 물그릇을 채우는 앱.', 'Fill a cat’s water bowl every time you log a glass of water.'],
  },
];

const policyProducts = [
  ...games,
  ...upcoming,
  { slug: 'yarn-tangle-cats', name: ['냥이 털실 풀기', 'Yarn Tangle Cats'] },
  { slug: 'cat-ring-twist', name: ['냥냥 고리 돌리기', 'Cat Ring Twist'] },
  { slug: 'meow-hangul', name: ['냥이랑 한글', 'Meow Hangul'] },
];
const gumroad = ['galnnk', 'alrjwl', 'lwctnc', 'miyypj', 'zlsticu', 'gfxkid'];

function pageURL(language, section = '') {
  const prefix = language === 'ko' ? '/' : '/en/';
  return prefix + (section ? section + '/' : '');
}

function policy(product, language) {
  const root = '/games/' + product.slug + '/privacy/';
  const english = root + 'en/';
  if (language === 'en' && existsSync(siteFile(english.slice(1) + 'index.html'))) {
    return { href: english, language: 'en' };
  }
  return { href: root, language: 'ko' };
}

function writePage(url, html) {
  const file = siteFile(url.slice(1) + 'index.html');
  if (check) {
    if (!existsSync(file) || readFileSync(file, 'utf8') !== html) {
      console.error('Out of date:', url);
      process.exitCode = 1;
    }
    return;
  }
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

function build(language) {
  const isEnglish = language === 'en';
  const other = isEnglish ? 'ko' : 'en';
  function local(pair) {
    if (!pair[0] || !pair[1]) throw new Error('Missing portal translation: ' + pair.join(' / '));
    return pair[Number(isEnglish)];
  }
  const t = key => local(shared[key]);
  const url = section => pageURL(language, section);
  const otherLabel = isEnglish ? '한국어로 보기' : 'Switch to English';
  const sectionLabel = section => local(sections[section]);
  const link = (label, href, attributes = '') => `<a href="${escape(href)}"${attributes ? ' ' + attributes : ''}>${escape(label)}</a>`;
  const textLink = (label, href, attributes = '') => link(label, href, `class="text-link" ${attributes}`.trim());
  const arrow = '<span aria-hidden="true">→</span>';
  const button = (label, href) => `<a class="button primary-action" href="${escape(href)}">${escape(label)} ${arrow}</a>`;
  const actions = (...links) => `<div class="item-actions">${links.filter(Boolean).join('\n        ')}</div>`;
  const icon = game => `<img class="game-icon" src="/games/${game.slug}/icon.png" alt="" width="128" height="128">`;
  const play = game => 'https://play.google.com/store/apps/details?id=com.teamcp.' + game.package;
  const mail = subject => `mailto:${email}${subject ? '?subject=' + encodeURIComponent(subject) : ''}`;
  const intro = (title, description) => `<header class="page-intro">
      <h1>${escape(title)}</h1>
      <p>${escape(description)}</p>
    </header>`;
  function catalog(title, cards, list = false) {
    const tag = list ? 'ul' : 'div';
    return `<section class="catalog-section">
      <h2>${escape(title)}</h2>
      <${tag} class="catalog-grid${list ? ' support-index' : ''}">
        ${cards.join('\n        ')}
      </${tag}>
    </section>`;
  }

  function page(section, title, description, body) {
    const path = url(section);
    const otherPath = pageURL(other, section);
    const currentSection = section === 'games/cat-gomoku' ? 'games' : section;
    const currentLink = currentSection === section ? 'aria-current="page"' : 'aria-current="location"';
    return `<!doctype html>
<html lang="${language}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escape(title ? title + ' · TeamCP' : 'TeamCP')}</title>
  <meta name="description" content="${escape(description)}">
  <link rel="canonical" href="${origin}${path}">
  <link rel="alternate" hreflang="ko" href="${origin}${pageURL('ko', section)}">
  <link rel="alternate" hreflang="en" href="${origin}${pageURL('en', section)}">
  <link rel="stylesheet" href="/assets/portal/portal.css">
</head>
<body>
  ${link(t('skip'), '#main', 'class="skip"')}
  <header class="wrap header">
    <a class="brand" href="${url()}" aria-label="TeamCP ${t('home')}"><span class="mark" aria-hidden="true">CP</span>TeamCP</a>
    <nav class="navigation" aria-label="${t('navigation')}">
      ${Object.keys(sections).map(key => link(sectionLabel(key), url(key), currentSection === key ? currentLink : '')).join('\n      ')}
    </nav>
    ${link(isEnglish ? '한국어' : 'EN', otherPath, `class="lang" lang="${other}" hreflang="${other}" aria-label="${otherLabel}"`)}
  </header>
  <main id="main" class="wrap site-main" tabindex="-1">
    ${body}
  </main>
  <footer class="wrap footer">
    <span>TeamCP</span>
    <div class="footer-links">
      ${link(sectionLabel('support'), url('support'))}
      ${link(isEnglish ? t('policyKorean') : t('privacy'), '/privacy/', 'hreflang="ko"')}
    </div>
  </footer>
</body>
</html>
`;
  }

  function policyLink(product, key = 'privacy', hash = '') {
    const target = policy(product, language);
    const koreanFallback = isEnglish && target.language === 'ko';
    const label = key === 'privacy' && koreanFallback
      ? t('policyKorean') : t(key) + (koreanFallback ? ' (Korean)' : '');
    return textLink(label, target.href + hash, `hreflang="${target.language}"`);
  }
  function detailLink(game) {
    const localized = game.slug === 'cat-gomoku';
    const href = localized ? url('games/cat-gomoku') : `/games/${game.slug}/`;
    return textLink(t(isEnglish && !localized ? 'gameInfoKorean' : 'gameInfo'), href, `hreflang="${localized ? language : 'ko'}"`);
  }

  const homeDescription = local(['게임, 일상을 돕는 앱, 이야기를 담은 책을 만드는 작은 스튜디오입니다.', 'We are a small studio making games, everyday apps, and books.']);
  const heading = isEnglish ? 'Small joys,<br>made by TeamCP' : '작은 즐거움을<br>만드는 TeamCP';
  const tiles = [
    ['games', '🎮', ['게임 모아보기', 'Browse our games']],
    ['apps', '', ['TeamCP가 만든 앱', 'Apps by TeamCP']],
    ['books', '', ['TeamCP가 펴낸 책', 'Books by TeamCP']],
    ['support', '', ['문의·개인정보', 'Contact and privacy']],
  ];
  const featured = [
    [games[0], ['장면 속 단서를 찾는 관찰 추리', 'A hidden-clue mystery']],
    [games[1], ['한 수씩 생각하는 11×11 오목', 'A thoughtful game of 11×11 Gomoku']],
    [games[2], ['장애물을 피해 달리는 택배 모험', 'An obstacle-dodging delivery adventure']],
  ];
  writePage(url(), page('', '', homeDescription, `<section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <h1 id="hero-title">${heading}</h1>
        <p>${escape(homeDescription)}</p>
        ${button(local(['게임 둘러보기', 'Explore games']), url('games'))}
      </div>
      <div class="hero-art" aria-hidden="true"><i class="orbit"></i><i class="token pad"></i><i class="token hero-book"></i><i class="token hero-app"></i><span class="spark">✦</span><span class="spark alt">✧</span></div>
    </section>
    <div class="tiles">
      ${tiles.map(([key, symbol, caption]) => `<a href="${url(key)}" class="tile ${key}">
        <span class="tile-icon" aria-hidden="true">${symbol}</span>
        <span class="tile-copy"><strong>${sectionLabel(key)}</strong><small>${local(caption)}</small></span>
        <span class="arrow" aria-hidden="true">→</span>
      </a>`).join('\n      ')}
    </div>
    <section id="games" aria-labelledby="games-title">
      <div class="section-head">
        <h2 id="games-title">${local(['TeamCP 게임', 'TeamCP games'])}</h2>
        <a href="${url('games')}">${local(['전체 게임 보기', 'All games'])} ${arrow}</a>
      </div>
      <div class="games-grid">
        ${featured.map(([game, caption]) => {
          const href = game.slug === 'cat-gomoku' ? url('games/cat-gomoku') : `/games/${game.slug}/`;
          const destinationLanguage = game.slug === 'cat-gomoku' ? language : 'ko';
          return `<a class="game" href="${href}" hreflang="${destinationLanguage}">
          ${icon(game)}
          <span class="game-copy"><strong>${local(game.name)}</strong><small>${local(caption)}</small></span>
          <span class="arrow" aria-hidden="true">→</span>
        </a>`;
        }).join('\n        ')}
      </div>
    </section>`));

  const gamesDescription = local(['TeamCP가 만든 게임을 둘러보고 이용할 수 있는 스토어를 찾아보세요.', 'Explore TeamCP’s games and find them in your app store.']);
  const gameCards = games.map(game => `<article class="panel catalog-card">
          <div class="item-heading">${icon(game)}<h3>${escape(local(game.name))}</h3></div>
          <p>${escape(local(game.description))}</p>
          ${actions(button('Google Play', play(game)), ...(game.oneStore ? [textLink(t('oneStore'), 'https://m.onestore.co.kr/v2/ko-kr/app/' + game.oneStore, 'hreflang="ko"')] : []))}
          ${actions(detailLink(game), policyLink(game))}
        </article>`);
  const upcomingCards = upcoming.map(game => `<article class="panel catalog-card">
          <h3>${escape(local(game.name))}</h3>
          <p>${escape(local(game.description))}</p>
          ${actions(...(game.detail === false ? [] : [detailLink(game)]), policyLink(game))}
        </article>`);
  writePage(url('games'), page('games', sectionLabel('games'), gamesDescription,
    intro(sectionLabel('games'), gamesDescription) + '\n    ' +
    catalog(local(['출시 게임', 'Available now']), gameCards) + '\n    ' +
    catalog(local(['출시 준비 중', 'In development']), upcomingCards)));

  const appsDescription = local(['공개 앱을 준비하고 있어요.', 'Our apps are in preparation.']);
  writePage(url('apps'), page('apps', sectionLabel('apps'), appsDescription,
    intro(sectionLabel('apps'), appsDescription) + '\n    ' +
    actions(button(t('home'), url()), textLink(sectionLabel('support'), url('support')))));

  const booksDescription = local(['미아와 찰리의 이야기로 쉬운 영어 읽기를 연습해 보세요.', 'Practice reading English with easy stories about Mia and Charlie.']);
  const bookCards = gumroad.map((slug, index) => {
    const volume = index + 1;
    return `<article class="panel catalog-card">
          <img class="cover" src="/assets/portal/books/vol-${volume}.webp" alt="" width="400" height="640">
          <h3 class="book-title" lang="en">Mia and Charlie — Easy English Stories Vol. ${volume}</h3>
          <p>${local(['짧은 이야기로 쉬운 영어 읽기를 연습하는 전자책.', 'An e-book for practicing English with short, easy stories.'])}</p>
          <p class="book-format">EPUB · PDF</p>
          ${actions(button(local(['Gumroad에서 보기', 'View on Gumroad']), 'https://channelteam.gumroad.com/l/' + slug))}
        </article>`;
  });
  writePage(url('books'), page('books', sectionLabel('books'), booksDescription,
    intro(sectionLabel('books'), booksDescription) + '\n    ' +
    catalog(local(['Mia and Charlie 시리즈', 'Mia and Charlie series']), bookCards)));

  const supportDescription = local(['제품 문의, 오류 신고, 개인정보 열람과 삭제를 도와드립니다.', 'Get help with our products, report an issue, or ask to access or delete your data.']);
  const supportCards = policyProducts.map(product => {
    const subjectName = local(product.name);
    const policyPath = policy(product, language).href.slice(1) + 'index.html';
    const html = readFileSync(siteFile(policyPath), 'utf8');
    const hasAnchor = id => new RegExp(`\\bid=["']${id}["']`).test(html);
    const access = local(['개인정보 열람·삭제', 'Data access or deletion']);
    const reportLink = hasAnchor('reports')
      ? policyLink(product, 'report', '#reports') : textLink(t('report'), mail(subjectName + ' · ' + t('report')));
    const deletionLink = hasAnchor('delete-data') ? policyLink(product, 'deletion', '#delete-data') : '';
    return `<li class="panel">
          <h3>${escape(subjectName)}</h3>
          ${actions(policyLink(product), reportLink, deletionLink, textLink(t('access'), mail(subjectName + ' · ' + access)))}
        </li>`;
  });
  writePage(url('support'), page('support', sectionLabel('support'), supportDescription, `${intro(sectionLabel('support'), supportDescription)}
    <section class="panel contact">
      <h2>${local(['이메일 문의', 'Email support'])}</h2>
      <p>${local(['문의나 오류 신고에는 제품 이름, 버전, 어떤 일이 있었는지 적어 주세요.', 'Include the product name, version, and what happened in your message.'])}</p>
      ${actions(textLink(email, mail()), textLink(t('commonPolicy'), '/privacy/', 'hreflang="ko"'))}
    </section>
    ${catalog(local(['제품별 지원과 개인정보처리방침', 'Product support and privacy policies']), supportCards, true)}`));

  const gomoku = games[1];
  writePage(url('games/cat-gomoku'), page('games/cat-gomoku', local(gomoku.name), local(gomoku.description),
    intro(local(gomoku.name), local(gomoku.description)) + '\n    ' +
    actions(button('Google Play', play(gomoku)), policyLink(gomoku), textLink(sectionLabel('games'), url('games')))));
}

for (const language of ['ko', 'en']) build(language);
