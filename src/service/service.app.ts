const api_key = process.env.NEXT_PUBLIC_API_KEY;
const base_url = process.env.NEXT_PUBLIC_BASE_URL;
export const API_REQUEST = {
  trending_day_data: `${base_url}/trending/movie/day?api_key=${api_key}&language=en-US`,
  trending_all: `${base_url}/trending/all/day?api_key=${api_key}&language=en-US`,
  top_rated: `${base_url}/movie/top_rated?api_key=${api_key}&language=en-US`,
  tv_series: `${base_url}/tv/on_the_air?api_key=${api_key}&language=en-US`,
  tv_rated: `${base_url}/tv/top_rated?api_key=${api_key}&language=en-US`,
};
