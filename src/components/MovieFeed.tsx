import type { Movie } from "../types/movie";
import MoviePost from "./MoviePost";

interface MovieFeedProps {
  movies: Movie[];
}

export default function MovieFeed({ movies }: MovieFeedProps) {
  return (
    <div className="w-full max-w-[470px]">
      {movies.map((movie) => (
        <MoviePost key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
