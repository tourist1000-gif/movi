export interface NowPlayingMovie {
  id: number;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  overview: string;
  releaseDate: string;
  rating: number;
}

export interface MovieDetail extends NowPlayingMovie {
  runtime: number | null;
  genres: string[];
  director: string;
  cast: string[];
  tagline: string;
}

export interface MovieVideo {
  id: string;
  name: string;
  key: string;
  site: string;
  type: string;
  official: boolean;
  embedUrl: string;
  watchUrl: string;
  source: "tmdb" | "youtube";
}
