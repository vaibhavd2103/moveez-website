export const API_KEY = "1bbd459c320f161b8dee93104cf1740e";

const requests = {
  fetchAllMovies: `/discover/movie?api_key=${API_KEY}&page=100`,
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchAction: `/discover/tv?api_key=${API_KEY}&with_networks=28`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchAdventure: `/discover/tv?api_key=${API_KEY}&with_networks=12`,
  fetchAnimation: `/discover/tv?api_key=${API_KEY}&with_networks=16`,
  fetchComedy: `/discover/tv?api_key=${API_KEY}&with_networks=35`,
  fetchCrime: `/discover/tv?api_key=${API_KEY}&with_networks=80`,
  fetchDocumentary: `/discover/tv?api_key=${API_KEY}&with_networks=99`,
  fetchDrama: `/discover/tv?api_key=${API_KEY}&with_networks=18`,
  fetchFamily: `/discover/tv?api_key=${API_KEY}&with_networks=10751`,
  fetchFantasy: `/discover/tv?api_key=${API_KEY}&with_networks=14`,
  fetchHistory: `/discover/tv?api_key=${API_KEY}&with_networks=36`,
  fetchHorror: `/discover/tv?api_key=${API_KEY}&with_networks=27`,
  fetchMystery: `/discover/tv?api_key=${API_KEY}&with_networks=9648`,
  fetchRomance: `/discover/tv?api_key=${API_KEY}&with_networks=10749`,
  fetchScience: `/discover/tv?api_key=${API_KEY}&with_networks=878`,
  fetchThriller: `/discover/tv?api_key=${API_KEY}&with_networks=53`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchMovie: `/movie/429617?api_key=${API_KEY}`,
};

export { requests };
