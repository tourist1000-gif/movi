import { HiChevronRight } from "react-icons/hi2";
import type { TrendingMovie } from "../types/movie";

interface StoriesBarProps {
  movies: TrendingMovie[];
}

export default function StoriesBar({ movies }: StoriesBarProps) {
  return (
    <div className="relative mb-6 rounded-lg border border-[#262626] bg-black py-4">
      <div className="story-scroll flex gap-4 overflow-x-auto px-4">
        <div className="flex shrink-0 flex-col items-center gap-1">
          <div className="relative">
            <div className="flex h-[66px] w-[66px] items-center justify-center rounded-full border-2 border-[#363636] bg-[#121212]">
              <span className="text-2xl text-[#0095f6]">+</span>
            </div>
          </div>
          <span className="max-w-[64px] truncate text-[12px] text-[#fafafa]">
            내 리스트
          </span>
        </div>

        {movies.map((movie) => (
          <button
            key={movie.id}
            type="button"
            className="flex shrink-0 flex-col items-center gap-1"
          >
            <div
              className={`rounded-full p-[2px] ${
                movie.isNew
                  ? "bg-gradient-to-tr from-[#feda75] via-[#fa7e1e] to-[#d62976]"
                  : "bg-[#363636]"
              }`}
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="h-[62px] w-[62px] rounded-full border-2 border-black object-cover"
              />
            </div>
            <span className="max-w-[64px] truncate text-[12px] text-[#fafafa]">
              {movie.title}
            </span>
          </button>
        ))}
      </div>

      <button
        type="button"
        aria-label="더 보기"
        className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-[#262626] text-white shadow-lg"
      >
        <HiChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
