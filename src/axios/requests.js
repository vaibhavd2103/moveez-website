export const API_KEY = "1bbd459c320f161b8dee93104cf1740e";

const requests = {
  fetchAllMovies: `/discover/movie?api_key=${API_KEY}&page=100`,
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchAction: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchNetflixOriginals: `/discover/movie?api_key=${API_KEY}&with_genres=213`,
  fetchAdventure: `/discover/movie?api_key=${API_KEY}&with_genres=12`,
  fetchAnimation: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
  fetchComedy: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchCrime: `/discover/movie?api_key=${API_KEY}&with_genres=80`,
  fetchDocumentary: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchDrama: `/discover/movie?api_key=${API_KEY}&with_genres=18`,
  fetchFamily: `/discover/movie?api_key=${API_KEY}&with_genres=10751`,
  fetchFantasy: `/discover/movie?api_key=${API_KEY}&with_genres=14`,
  fetchHistory: `/discover/movie?api_key=${API_KEY}&with_genres=36`,
  fetchHorror: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchMystery: `/discover/movie?api_key=${API_KEY}&with_genres=9648`,
  fetchRomance: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchScience: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
  fetchThriller: `/discover/movie?api_key=${API_KEY}&with_genres=53`,
  fetchNetflixOriginals: `/discover/movie?api_key=${API_KEY}&with_genres=213`,
  fetchMovie: `/movie/429617?api_key=${API_KEY}`,
};

export { requests };
