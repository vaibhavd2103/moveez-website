import React, { useEffect, useState } from "react";
import instance from "../axios/axios";
import { API_KEY, requests } from "../axios/requests";
import TopTab from "../components/TopTab";
import { Colors, imageUrl, useWindowDimensions } from "../constants/constants";
import "./Home.css";
import analyze from "rgbaster";
import Category from "../components/Category";
import { FaPlay } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import { useNavigate } from "react-router";

function Movies() {
  const { width, height } = useWindowDimensions();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avgColor, setAvgColor] = useState("white");
  const [id, setId] = useState(Math.floor(Math.random() * 20));
  const [poster, setPoster] = useState({});
  const [images, setImages] = useState([]);
  const [logo, setLogo] = useState("");

  //   const [header, setHeader] = useState(
  //     "linear-gradient(#0b0b0b, #0b0b0baa, transparent)"
  //   );
  //   const listenScrollEvent = (event) => {
  //     if (window.scrollY < 400) {
  //       return setHeader("linear-gradient(#0b0b0b, #0b0b0baa, transparent)");
  //     } else if (window.scrollY > 350) {
  //       return setHeader("rgba(0,0,0,0.5)");
  //     }
  //   };
  //   useEffect(() => {
  //     window.addEventListener("scroll", listenScrollEvent);
  //     return () => window.removeEventListener("scroll", listenScrollEvent);
  //   }, []);

  useEffect(() => {
    setId(Math.floor(Math.random() * 20));
    const fetchMovies = async () => {
      const movies = await instance.get(requests.fetchScience);
      //  setLoading(false);
      const poster = await instance.get(
        `/movie/${movies.data.results[id].id}?api_key=${API_KEY}`
      );
      const posterImages = await instance.get(
        `/movie/${movies.data.results[id].id}/images?api_key=${API_KEY}`
      );
      //  console.log(posterImages.data);
      //  console.log(poster.data);

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
      <TopTab
      //  headerColor={header}
      />
      <div className="poster_container">
        {/* <div className="poster_fade_left"></div> */}
        <a
          className="page_type"
          style={{
            fontSize: width < 1000 ? width / 30 : 40,
            right: width / 20,
            top: width / 10,
          }}
        >
          Movies
        </a>
        <img
          src={`${imageUrl}${poster.backdrop_path}`}
          style={{ width: width, objectFit: "contain" }}
        />
        <div
          className="poster_fade"
          style={{
            display: "flex",
          }}
        ></div>
        <div className="poster_detail_container">
          {logo && logo.file_path ? (
            <img
              src={`${imageUrl}${logo.file_path}`}
              style={{
                width: width / 3 - 30,
                objectFit: "contain",
                maxHeight: width / 3 / 5,
              }}
            />
          ) : (
            <h1
              className="poster_name"
              style={{
                color: avgColor,
                textShadow: "3px 3px 5px black",
                letterSpacing: 2,
                fontSize: width < 1000 ? width / 25 : 40,
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
                fontSize: width < 1000 ? width / 60 : 20,
                letterSpacing: 2,
                textAlign: "left",
                textShadow: "2px 2px 5px black",
                height: width / 100,
                overflow: "visible",
              }}
            >
              {poster.title ? poster.title : poster.name}
            </h1>
          ) : null}
          <a
            className="poster_overview"
            style={{
              fontSize: width < 1000 ? width / 60 : 18,
              textShadow: "2px 2px 3px black",
            }}
          >
            {poster.overview}
          </a>
          <div className="buttons_container" style={{ marginTop: width / 100 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: width / 120,
                borderRadius: 10,
                backgroundColor: avgColor,
                paddingInline: width / 60,
              }}
            >
              <FaPlay />
              <a
                style={{
                  fontFamily: "Quicksand",
                  fontSize: width < 1000 ? width / 60 : 18,
                  fontWeight: "bold",
                  marginLeft: 10,
                }}
              >
                Play
              </a>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: width / 120,
                borderRadius: 10,
                backgroundColor: "white",
                paddingInline: width / 60,
                marginLeft: 10,
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/moviedetails", { state: { id: poster.id } });
              }}
            >
              <FiInfo
                color={avgColor === "white" ? Colors.primary : avgColor}
                //  size={24}
              />
              <a
                style={{
                  fontFamily: "Quicksand",
                  fontSize: width < 1000 ? width / 60 : 18,
                  fontWeight: "bold",
                  marginLeft: 10,
                  color: avgColor === "white" ? Colors.primary : avgColor,
                }}
              >
                More info
              </a>
            </div>
          </div>
        </div>
      </div>
      <Category
        fetchUrl={requests.fetchAction}
        title="Action Movies"
        marginTop={width < 1000 ? -(width / 20) : -(width / 6)}
      />
      <Category fetchUrl={requests.fetchAnimation} title="Cartoons" />
      <Category
        fetchUrl={requests.fetchTrending}
        title="Trending"
        categoryType="poster"
      />
      <Category fetchUrl={requests.fetchAdventure} title="Adventure" />
      <Category fetchUrl={requests.fetchRomance} title="Romantic" />
      <Category
        fetchUrl={requests.fetchComedy}
        title="Comedy"
        categoryType="poster"
      />
      <Category fetchUrl={requests.fetchHorror} title="Horror Movies" />
      <Category fetchUrl={requests.fetchFamily} title="Family Time" />
      <Category
        fetchUrl={requests.fetchHistory}
        title="Historical Movies"
        categoryType="poster"
      />
      <Category fetchUrl={requests.fetchScience} title="Sci-Fi Movies" />
    </div>
  );
}

export default Movies;
