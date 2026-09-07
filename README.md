# TeamCP Games website

TeamCP 게임의 공식 정보와 공개 문서를 관리하는 GitHub Pages 저장소다.

## 구조

- `/index.html`: 전체 게임 목록과 공식 지원 허브
- `/games/<game-slug>/index.html`: 게임별 소개 페이지
- `/games/<game-slug>/privacy/index.html`: 게임별 개인정보처리방침
- `/app-ads.txt`: 출시 앱의 광고 판매자 인증 파일

현재 등록된 게임:

- 고양이 오목 (`com.teamcp.catgomoku`)
- 냥탐정 (`com.teamcp.catdetective`)

## 냥탐정 개인정보처리방침

한국어 기본 URL과 `#delete-data` 앵커를 유지한다. 영어·일본어·스페인어·프랑스어·독일어는
`/games/cat-detective/privacy/{en,ja,es,fr,de}/`에 제공한다. HTML은 JavaScript 없이 읽을 수 있다.
`tools/privacy/*.json`에서 수정하고 `node tools/build-cat-privacy.mjs`로 정적 페이지를 생성한다.
`node tools/build-cat-privacy.mjs --check` 및 `node tools/check-cat-privacy.mjs`로 생성 누락·경로·삭제 앵커를 검사한다.
승인된 게시 뒤 `node tools/check-cat-privacy.mjs --live`로 공개 6개 페이지와 CSS를 소스와 대조한다.
`--local`은 별도로 실행한 `127.0.0.1:8765` 미리보기만 검사한다. 어느 명령도 게시·사용자 데이터 변경을 수행하지 않는다.
번역은 자동 전수 법률 인증이 아니다. 실제 버전의 기능/SDK와 운영자 사실을 확인하고 갱신한다.

새 게임을 추가할 때는 게임 소개와 개인정보처리방침을 같은 디렉터리에 추가하고 루트 `index.html`에 게임 카드를 연결한다. 광고 사업자를 추가할 때는 해당 대시보드에서 발급·검증된 판매자 정보만 `app-ads.txt`에 반영한다.
