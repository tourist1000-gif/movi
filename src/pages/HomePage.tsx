import HeroBanner from "../components/HeroBanner";
import MovieRow from "../components/MovieRow";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import { useNowPlaying } from "../hooks/useNowPlaying";

export default function HomePage() {
  const { movies, genreRows, loading, error } = useNowPlaying();

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} />;
  if (movies.length === 0) {
    return <ErrorScreen message="현재 상영 중인 영화가 없습니다." />;
  }

  const featured = movies[0];

  return (
    <>
      <main>
        <HeroBanner movie={featured} />

        <div className="relative -mt-16 space-y-2 pb-12 md:-mt-24">
          <MovieRow title="현재 상영 중" movies={movies} />
          {genreRows.map((row) => (
            <MovieRow key={row.id} title={row.title} movies={row.movies} />
          ))}
        </div>
      </main>
    </>
  );
}
