import React, { useEffect, useState } from "react";
import instance from "../axios/axios";
import { API_KEY, requests } from "../axios/requests";
import TopTab from "../components/TopTab";
import { Colors, imageUrl, useWindowDimensions } from "../constants/constants";
import "./Home.css";
import analyze from "rgbaster";

function Home() {
  const { width, height } = useWindowDimensions();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avgColor, setAvgColor] = useState("");
  const [id, setId] = useState(Math.floor(Math.random() * 20));
  const [poster, setPoster] = useState({});
  const [images, setImages] = useState([]);
  const [logo, setLogo] = useState("");

  useEffect(() => {
    setId(Math.floor(Math.random() * 20));
    const fetchMovies = async () => {
      const movies = await instance.get(requests.fetchTrending);
      //  setLoading(false);
      const poster = await instance.get(
        `/movie/${movies.data.results[id].id}?api_key=${API_KEY}`
      );
      const posterImages = await instance.get(
        `/movie/${movies.data.results[id].id}/images?api_key=${API_KEY}`
      );
      console.log(posterImages.data);
      console.log(poster.data);

      setLogo(posterImages.data.logos[0]);
      setMovies(movies.data.results);
      setPoster(movies.data.results[id]);
      setLoading(false);
      const result = await analyze(
        `${imageUrl}${movies.data.results[id].backdrop_path}`,

        {
          scale: 0.6,
          // ignore: ["rgb(255,255,255)", "rgb(0,0,0)"],
        }
      );
      const length = result.length;
      //  console.log(movies.data.results[id]);
      //  setLoading(false);
      setAvgColor(result[length / 2].color);
    };
    fetchMovies();
  }, []);

  return (
    <div className="container" style={{ backgroundColor: Colors.bg }}>
      {loading && (
        <h1 className="poster_name" style={{ position: "absolute", top: 300 }}>
          Loading
        </h1>
      )}
      <TopTab />
      <div className="poster_container">
        {/* <div className="poster_fade_left"></div> */}
        <img
          src={`${imageUrl}${poster.backdrop_path}`}
          style={{ width: width, objectFit: "contain" }}
        />
        <div
          className="poster_fade"
          style={{
            display: "flex",
            //   height: 200,
          }}
        ></div>
        <div className="poster_detail_container">
          {logo && logo.file_path ? (
            <img
              src={`${imageUrl}${logo.file_path}`}
              style={{
                width: width / 3 - 30,
                objectFit: "contain",
                //  maxHeight: width / 7,
              }}
            />
          ) : (
            <h1
              className="poster_name"
              style={{
                color: avgColor,
                textShadow: "3px 3px 5px black",
                letterSpacing: 5,
              }}
            >
              {poster.title ? poster.title : poster.name}
            </h1>
          )}
          {logo && logo.file_path ? (
            <h1
              className="poster_name"
              style={{
                color: avgColor,
                fontSize: width < 850 ? width / 40 : 20,
                letterSpacing: 2,
                textAlign: "left",
                textShadow: "2px 2px 5px black",
              }}
            >
              {poster.title ? poster.title : poster.name}
            </h1>
          ) : null}
          <a
            className="poster_overview"
            style={{ fontSize: width < 1000 ? width / 50 : 20 }}
          >
            {poster.overview}
          </a>
        </div>
      </div>

      <h1>walla</h1>
      <h1>walla</h1>
      <h1>walla</h1>
      <h1>walla</h1>
      <h1>walla</h1>
      <h1>walla</h1>
      <h1>walla</h1>
      <h1>walla</h1>
      <h1>walla</h1>
      <h1>walla</h1>
      <h1>walla</h1>
    </div>
  );
}

export default Home;
