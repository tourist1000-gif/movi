# MOVI — 넷플릭스 스타일 현재 상영 영화

TMDB API를 사용해 **현재 상영 중인 영화**를 보여주는 React 웹사이트입니다.

## 기능

- **홈** — 현재 상영 영화 목록 (now_playing)
- **영화 상세** — 줄거리, 감독, 출연, 장르, 상영시간
- **검색** — TMDB 영화 검색

## 실행 방법

```bash
npm install
npm run dev
```

**http://localhost:5173**

## 페이지 경로

| 경로 | 설명 |
|------|------|
| `/` | 홈 (현재 상영) |
| `/search?q=검색어` | 영화 검색 |
| `/movie/:id` | 영화 상세 |

## 환경 변수

```
VITE_TMDB_API_KEY=your_api_key
```

## 기술 스택

- React 19 + TypeScript + React Router
- Vite 6 + Tailwind CSS 4
- TMDB API
