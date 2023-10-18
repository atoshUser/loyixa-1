export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  name?: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovieTrailer {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface IProduct {
  id: string;
  images: string[];
  metadata: {
    adv: string;
  };
  name: string;
  default_price: {
    unit_amount: number;
    id: string;
  };
}

export interface Subscription {
  start_date: number;
  id: string;
  current_period_end: number;
  current_period_start: number;
  customer: {
    email: string;
    metadata: {
      user_id: string;
    };
  };
  plan: {
    nickname: string;
    amount: number;
    active: boolean;
  };
  default_payment_method: {
    card: {
      brand: string;
      exp_month: number;
      exp_year: number;
      last4: number;
    };
  };
}

export interface IMyList {
  userId: string;
  product: IMovie;
}
