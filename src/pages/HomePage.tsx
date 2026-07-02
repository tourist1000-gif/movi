import HeroBanner from "../components/HeroBanner";
import MovieRow from "../components/MovieRow";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import { useNowPlaying } from "../hooks/useNowPlaying";

export default function HomePage() {
  const { movies, loading, error } = useNowPlaying();

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} />;
  if (movies.length === 0) {
    return <ErrorScreen message="현재 상영 중인 영화가 없습니다." />;
  }

  const featured = movies[0];
  const rest = movies.slice(1);

  return (
    <>
      <main>
        <HeroBanner movie={featured} />

        <div className="relative -mt-16 space-y-2 pb-12 md:-mt-24">
          <MovieRow title="현재 상영 중" movies={movies} />
          {rest.length > 0 && (
            <MovieRow title="이번 주 추천" movies={rest} />
          )}
        </div>
      </main>
    </>
  );
}
