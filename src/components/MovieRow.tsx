import MovieCard from "./MovieCard";
import type { NowPlayingMovie } from "../types/movie";

interface MovieRowProps {
  title: string;
  movies: NowPlayingMovie[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  return (
    <section className="mb-8 md:mb-10">
      <h2 className="mb-3 px-4 text-lg font-semibold text-white md:px-10 md:text-xl">
        {title}
      </h2>
      <div className="movie-row flex gap-3 overflow-x-auto px-4 pb-2 md:gap-4 md:px-10">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
