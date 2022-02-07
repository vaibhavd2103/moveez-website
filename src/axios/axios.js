import axios from "axios";

const instance = axios.create({
  //   baseURL: "https://imdb-api.com/en/API",
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;
