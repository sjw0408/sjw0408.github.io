const englishStories = [
  ['galnnk', 'B0HPCRPFTN', '나무 위의 고양이와 첫 등교', 'a cat in a tree and the first day of school'],
  ['alrjwl', 'B0HQGFZ1V6', '도서관 나들이와 잃어버린 공', 'a trip to the library and a lost ball'],
  ['lwctnc', 'B0HJQ8V9F4', '새 이웃과 사과 따기', 'a new neighbor and apple picking'],
  ['miyypj', 'B0HR1RGY8V', '학교 공연과 눈 오는 날 만든 책', 'a school show and a book made on a snowy day'],
  ['zlsticu', 'B0HRNNRW4K', '새 강아지와 가을 소풍', 'a new puppy and an autumn picnic'],
  ['gfxkid', null, '과학 발표회와 겨울 음악회', 'a science fair and a winter concert'],
];

export const storyVolumes = englishStories.map(([gumroad, asin, ko, en], index) => {
  const volume = index + 1;
  const first = index * 4 + 1;
  return {
    title: `Mia and Charlie — Easy English Stories Vol. ${volume}`,
    image: `vol-${volume}`,
    dimensions: [400, 640],
    imageAlt: [`Mia and Charlie 영어 이야기 ${volume}권 표지`, `Cover of Easy English Stories Vol. ${volume}`],
    description: [
      `${first}~${first + 3}화에 ${ko} 이야기가 담겨 있습니다. 영어 읽기를 시작하는 성인 학습자용입니다.`,
      `Episodes ${first}–${first + 3} feature ${en}. For adults beginning to read in English.`,
    ],
    format: `EPUB · PDF${asin ? ' · Kindle' : ''}`,
    gumroad,
    asin,
  };
});

const pictureStories = [
  ['B0HPDQRN3Y', '나무 위의 고양이, 첫 등교, 첫눈', 'a cat in a tree, the first day of school, and the first snow'],
  ['B0HQHRSMGS', '깜짝 생일, 도서관, 이웃집 정원', 'a birthday surprise, the library, and a neighbor’s garden'],
  ['B0HQN3V723', '바닷가, 잃어버린 공, 새 이웃', 'a trip to the beach, a lost ball, and a new neighbor'],
  ['B0HR8FF5YY', '핼러윈, 비 오는 날, 사과 따기', 'Halloween night, a rainy day, and apple picking'],
  ['B0HRS45VDZ', '학교 공연, 아기 새, 눈 오는 날 만든 책', 'a school show, a baby bird, and a book made on a snowy day'],
];

export const picturebooks = pictureStories.map(([asin, ko, en], index) => {
  const volume = index + 1;
  const first = index * 3 + 1;
  return {
    title: `Mia and Charlie: Three Gentle Stories for Beginning Readers · Vol. ${volume}`,
    image: `picturebook-${volume}`,
    dimensions: [600, 600],
    imageAlt: [`Mia and Charlie 그림책 ${volume}권 앞표지`, `Front cover of Mia and Charlie picture book Vol. ${volume}`],
    description: [
      `${first}~${first + 2}화는 ${ko} 이야기입니다. 4~7세 어린이와 함께 읽기 좋은 영어 그림책입니다.`,
      `Stories ${first}–${first + 2} follow ${en}. An English picture book for ages 4–7 to share with a grown-up.`,
    ],
    format: ['종이책', 'Paperback'],
    asin,
  };
});

export const planners = [
  {
    title: '2027 Weekly Planner',
    asin: 'B0HSNGMZMF',
    image: 'planner-2027',
    dimensions: [599, 899],
    imageAlt: ['붓꽃이 그려진 2027년 주간 플래너 앞표지', 'Front cover of the 2027 Weekly Planner with an iris illustration'],
    description: [
      '월간 달력과 주간 계획, 우선순위와 메모를 담은 2027년 날짜형 플래너.',
      'A dated 2027 planner with monthly calendars and weekly space for plans, priorities, and notes.',
    ],
    format: ['종이책', 'Paperback'],
  },
  {
    title: '2027 Weekly Planner PDF',
    gumroad: 'siogq',
    image: 'planner-2027-pdf',
    dimensions: [600, 776],
    imageAlt: ['2027년 주간 플래너 PDF 첫 페이지', 'First page of the 2027 Weekly Planner PDF'],
    description: [
      '한 주의 일정과 할 일을 정리하는 2027년 인쇄용 플래너.',
      'A printable 2027 planner for organizing your weekly schedule and to-do list.',
    ],
    format: ['인쇄용 PDF', 'Printable PDF'],
  },
];
