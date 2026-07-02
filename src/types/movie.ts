export interface Movie {
  id: string;
  title: string;
  studio: string;
  studioLogo: string;
  verified: boolean;
  releasedAgo: string;
  poster: string;
  likes: number;
  comments: number;
  shares: number;
  likedBy: string;
  synopsis: string;
  director: string;
  cast: string[];
  rating: number;
  genre: string;
  duration: string;
}

export interface TrendingMovie {
  id: string;
  title: string;
  poster: string;
  isNew?: boolean;
}
