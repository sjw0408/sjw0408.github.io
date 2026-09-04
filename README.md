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

새 게임을 추가할 때는 게임 소개와 개인정보처리방침을 같은 디렉터리에 추가하고 루트 `index.html`에 게임 카드를 연결한다. 광고 사업자를 추가할 때는 해당 대시보드에서 발급·검증된 판매자 정보만 `app-ads.txt`에 반영한다.
