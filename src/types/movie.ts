export interface NowPlayingMovie {
  id: number;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  overview: string;
  releaseDate: string;
  rating: number;
  genres: { id: number; name: string }[];
}

export interface MovieDetail extends NowPlayingMovie {
  runtime: number | null;
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
