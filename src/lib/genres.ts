import type { NowPlayingMovie } from "../types/movie";

export interface GenreRow {
  id: number;
  title: string;
  movies: NowPlayingMovie[];
}

export function buildGenreRows(
  movies: NowPlayingMovie[],
  minMovies = 1,
): GenreRow[] {
  const genreMap = new Map<number, GenreRow>();

  for (const movie of movies) {
    for (const genre of movie.genres) {
      const existing = genreMap.get(genre.id);
      if (existing) {
        if (!existing.movies.some((item) => item.id === movie.id)) {
          existing.movies.push(movie);
        }
      } else {
        genreMap.set(genre.id, {
          id: genre.id,
          title: genre.name,
          movies: [movie],
        });
      }
    }
  }

  return [...genreMap.values()]
    .filter((row) => row.movies.length >= minMovies)
    .sort((a, b) => b.movies.length - a.movies.length);
}
