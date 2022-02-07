import React, { useEffect, useState } from "react";
import instance from "../axios/axios";
import { imageUrl, useWindowDimensions } from "../constants/constants";
import "./Category.css";

function Category({ title, fetchUrl }) {
  const { width, height } = useWindowDimensions();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await instance.get(fetchUrl);
      setMovies(movies.data.results);
      console.log(movies);
      setLoading(false);
    };
    fetchMovies();
  }, []);

  return (
    <div
      className="category_container"
      style={{ flexDirection: "column", alignItems: "flex-start" }}
    >
      <h1
        className="category_title"
        style={{ fontSize: width < 850 ? width / 37 : 22 }}
      >
        {title}
      </h1>
      {loading && (
        <h1 style={{ fontFamily: "Quicksand", color: "white", fontSize: 30 }}>
          Loading...
        </h1>
      )}
      <div
        className="movies_container"
        style={{ padding: width < 850 ? width / 100 : 15 }}
      >
        {movies.map((item) => {
          return (
            <div className="movie_div">
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
  );
}

export default Category;
