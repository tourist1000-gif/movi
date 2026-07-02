import { Link, useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { useSearch } from "../hooks/useSearch";

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("q") ?? "";
  const { results, loading, error } = useSearch(query);

  return (
    <main className="min-h-screen pt-20 pb-12 md:pt-24">
      <div className="px-4 md:px-10">
        {query ? (
          <h1 className="mb-6 text-lg font-semibold text-white md:text-2xl">
            &quot;{query}&quot; 검색 결과
            {!loading && (
              <span className="ml-2 text-sm font-normal text-[#777]">
                {results.length}편
              </span>
            )}
          </h1>
        ) : (
          <div className="py-12 text-center">
            <h1 className="text-xl font-semibold text-white md:text-2xl">
              영화 검색
            </h1>
            <p className="mt-2 text-sm text-[#777]">
              상단 검색창에 영화 제목을 입력하세요
            </p>
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#333] border-t-[#e50914]" />
          </div>
        )}

        {error && (
          <p className="py-8 text-center text-sm text-[#e50914]">{error}</p>
        )}

        {!loading && !error && query && results.length === 0 && (
          <p className="py-16 text-center text-[#777]">
            검색 결과가 없습니다. 다른 키워드로 시도해 보세요.
          </p>
        )}

        {!loading && results.length > 0 && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {results.map((movie) => (
              <div key={movie.id} className="w-full">
                <MovieCard movie={movie} className="w-full" />
              </div>
            ))}
          </div>
        )}

        {!query && (
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {["듄", "범죄도시", "아바타", "마블", "디즈니"].map((tag) => (
              <Link
                key={tag}
                to={`/search?q=${encodeURIComponent(tag)}`}
                className="rounded-full border border-[#333] px-4 py-1.5 text-sm text-[#aaa] transition hover:border-[#e50914] hover:text-white"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
