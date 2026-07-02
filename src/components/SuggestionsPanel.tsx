import type { TrendingMovie } from "../types/movie";

interface SuggestionsPanelProps {
  movies: TrendingMovie[];
}

export default function SuggestionsPanel({ movies }: SuggestionsPanelProps) {
  const suggestions = movies.slice(0, 5);

  return (
    <aside className="hidden w-[320px] shrink-0 xl:block">
      <div className="sticky top-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop"
              alt="프로필"
              className="h-14 w-14 rounded-full object-cover"
            />
            <div>
              <p className="text-[14px] font-semibold">movie_fan</p>
              <p className="text-[14px] text-[#a8a8a8]">영화 애호가</p>
            </div>
          </div>
          <button type="button" className="text-[12px] font-semibold text-[#0095f6]">
            전환
          </button>
        </div>

        <div className="mb-3 flex items-center justify-between">
          <span className="text-[14px] font-semibold text-[#a8a8a8]">
            추천 영화
          </span>
          <button type="button" className="text-[12px] font-semibold">
            모두 보기
          </button>
        </div>

        <ul className="space-y-3">
          {suggestions.map((movie) => (
            <li key={movie.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-[14px] font-semibold">{movie.title}</p>
                  <p className="text-[12px] text-[#a8a8a8]">
                    {movie.isNew ? "신작" : "인기 급상승"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="text-[12px] font-semibold text-[#0095f6]"
              >
                팔로우
              </button>
            </li>
          ))}
        </ul>

        <footer className="mt-8 space-y-2 text-[11px] text-[#737373]">
          <p>소개 · 도움말 · API · 채용 · 개인정보 · 약관 · 위치 · 언어</p>
          <p>© 2026 MOVI · Powered by TMDB</p>
        </footer>
      </div>
    </aside>
  );
}
