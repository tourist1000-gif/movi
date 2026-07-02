import Sidebar from "./components/Sidebar";
import StoriesBar from "./components/StoriesBar";
import MovieFeed from "./components/MovieFeed";
import SuggestionsPanel from "./components/SuggestionsPanel";
import FeedSkeleton from "./components/FeedSkeleton";
import ErrorMessage from "./components/ErrorMessage";
import { useMovies } from "./hooks/useMovies";

export default function App() {
  const { movies, trending, loading, error } = useMovies();

  return (
    <div className="min-h-screen bg-black">
      <Sidebar />

      <main className="ml-[72px] md:ml-[244px]">
        <div className="mx-auto flex max-w-[935px] justify-center gap-8 px-4 py-8 lg:max-w-[1200px] lg:justify-start lg:pl-8">
          <div className="flex w-full max-w-[470px] flex-col">
            {loading ? (
              <>
                <div className="mb-6 h-[98px] animate-pulse rounded-lg border border-[#262626] bg-[#0a0a0a]" />
                <FeedSkeleton />
              </>
            ) : error ? (
              <ErrorMessage message={error} />
            ) : (
              <>
                <StoriesBar movies={trending} />
                <MovieFeed movies={movies} />
              </>
            )}
          </div>
          {!loading && !error && <SuggestionsPanel movies={trending} />}
        </div>
      </main>
    </div>
  );
}
