import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../axios/axios";
import { imageUrl, useWindowDimensions } from "../constants/constants";
import "./Category.css";

function TVCategory({ title, fetchUrl, marginTop, categoryType }) {
  const navigate = useNavigate();
  const { width, height } = useWindowDimensions();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [hover, setHover] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await instance.get(fetchUrl);
      setMovies(movies.data.results);
      //  console.log(movies);
      setLoading(false);
    };
    fetchMovies();
  }, []);

  return (
    <>
      {categoryType === "poster" ? (
        <div
          className="category_container"
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            marginTop: marginTop ? marginTop : 0,
            zIndex: 1,
            marginBottom: 30,
          }}
        >
          <h1
            className="category_title"
            style={{
              fontSize: width < 850 ? width / 37 : 22,
              marginLeft: 20,
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            {title}
          </h1>
          {loading && (
            <h1
              style={{ fontFamily: "Quicksand", color: "white", fontSize: 30 }}
            >
              Loading...
            </h1>
          )}
          <div
            className="movies_container"
            style={{
              paddingLeft: width < 850 ? width / 100 : 15,
              paddingTop: 40,
              paddingBottom: 60,
            }}
          >
            {movies.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    navigate("/tvdetails", { state: { id: item.id } });
                  }}
                  className="movie_poster_div"
                  onMouseOver={() => {
                    setHover(item.id);
                  }}
                  onMouseOut={() => {
                    setHover("");
                  }}
                  style={
                    {
                      // transform: `scale: ${hover === item.id ? 2 : 1}`,
                    }
                  }
                >
                  <img
                    src={`${imageUrl}${item.poster_path}`}
                    className="category_poster_image"
                  />
                  {/* <a style={{ color: "white" }}>{item.title}</a> */}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div
          className="category_container"
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            marginTop: marginTop ? marginTop : 0,
            zIndex: 1,
            marginBottom: 30,
          }}
        >
          <h1
            className="category_title"
            style={{
              fontSize: width < 850 ? width / 37 : 22,
              marginLeft: 20,
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            {title}
          </h1>
          {loading && (
            <h1
              style={{ fontFamily: "Quicksand", color: "white", fontSize: 30 }}
            >
              Loading...
            </h1>
          )}
          <div
            className="movies_container"
            style={{
              paddingLeft: width < 850 ? width / 100 : 15,
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            {movies.map((item) => {
              return (
                <div
                  className="movie_div"
                  key={item.id}
                  onClick={() => {
                    navigate("/tvdetails", { state: { id: item.id } });
                  }}
                  className="movie_poster_div"
                  onMouseOver={() => {
                    setHover(item.id);
                  }}
                  onMouseOut={() => {
                    setHover("");
                  }}
                >
                  <img
                    src={`${imageUrl}${item.backdrop_path}`}
                    className="category_image"
                  />
                  {/* <a style={{ color: "white" }}>{item.title}</a> */}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default TVCategory;
