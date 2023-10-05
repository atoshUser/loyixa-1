const api_key = process.env.NEXT_PUBLIC_API_KEY;
const base_url = process.env.NEXT_PUBLIC_BASE_URL;
export const API_REQUEST = {
  trending_day_data: `${base_url}/trending/movie/day?api_key=${api_key}&language=en-US`,
};
