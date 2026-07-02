import type { NowPlayingMovie } from "../types/movie";

export const GENRE_ROW_MOVIE_COUNT = 30;

export interface GenreRow {
  id: number;
  title: string;
  movies: NowPlayingMovie[];
}
