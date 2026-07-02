# MOVI — 인스타그램 스타일 영화 정보 홈페이지

인스타그램 웹 UI를 참고한 다크 모드 영화 정보 사이트입니다. [TMDB API](https://www.themoviedb.org/documentation/api)로 실시간 영화 데이터를 불러옵니다.

## 실행 방법

### 1. TMDB API 키 발급

1. [TMDB](https://www.themoviedb.org/signup) 회원가입
2. [API 설정](https://www.themoviedb.org/settings/api)에서 API Key (v3 auth) 발급

### 2. 환경 변수 설정

```bash
cp .env.example .env
```

`.env` 파일에 발급받은 API 키를 입력합니다:

```
VITE_TMDB_API_KEY=your_api_key_here
```

### 3. 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 으로 접속하세요.

## TMDB 연동

| UI 영역 | TMDB API |
|--------|----------|
| 스토리 바 | `/trending/movie/day` |
| 메인 피드 | `/movie/popular` + `/movie/{id}?append_to_response=credits` |
| 추천 패널 | 트렌딩 영화 목록 |

## 기술 스택

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- TMDB API
