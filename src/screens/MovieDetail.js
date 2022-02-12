import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import instance from "../axios/axios";
import { API_KEY } from "../axios/requests";
import { Colors, imageUrl, useWindowDimensions } from "../constants/constants";
import "./MovieDetail.css";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { FaStar } from "react-icons/fa";

function MovieDetail(props) {
  const { width, height } = useWindowDimensions();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState({});
  const [images, setImages] = useState([]);
  const [logo, setLogo] = useState({});
  const [similar, setSimilar] = useState([]);
  const [cast, setCast] = useState([]);
  useEffect(() => {
    const fetchDetails = async () => {
      const response = await instance.get(
        `/movie/${location.state.id}?api_key=${API_KEY}`
      );
      //  console.log(response.data);
      const images = await instance.get(
        `/movie/${location.state.id}/images?api_key=${API_KEY}`
      );
      //  console.log(images.data);
      const filteredLogo = images.data.logos.filter(
        (item) => item.iso_639_1 === "en"
      );
      const similar = await instance.get(
        `/movie/${location.state.id}/similar?api_key=${API_KEY}`
      );
      const credits = await instance.get(
        `/movie/${location.state.id}/credits?api_key=${API_KEY}`
      );
      console.log(credits.data);
      setCast(credits.data.cast);
      //  console.log(similar.data);
      setSimilar(similar.data.results);
      setImages(images.data.backdrops);
      setLogo(filteredLogo[0]);
      //  setLogo(images.data.logos[0]);
      setDetail(response.data);
      setLoading(false);
    };
    fetchDetails();
  }, []);

  const length = images.length;
  const [current, setCurrent] = useState(0);
  const nextImg = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const previousImg = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  if (!Array.isArray(images) || images.length <= 0) {
    return null;
  }
  return (
    <div className="container" style={{ backgroundColor: Colors.bg }}>
      {loading && <h1 style={{ color: "white" }}>Loading...</h1>}
      <div className="backdrop_similar_container">
        <div style={{ display: "flex", flex: 1 }}>
          <div className="backdrop_container">
            {/* <div className="backdrop_fade"></div>
            <div className="backdrop_right_fade"></div>
            <div className="movie_detail_container">
              {logo && logo.file_path ? (
                <>
                  <img
                    src={`${imageUrl}${logo.file_path}`}
                    className="movie_logo"
                  />
                </>
              ) : (
                <h1 className="movie_title">{detail.title}</h1>
              )}
              {detail && detail.genres ? (
                <div>
                  {detail.genres.map((item) => {
                    return (
                      <a
                        key={item.id}
                        style={{
                          color: Colors.yellow,
                          fontWeight: "bold",
                          letterSpacing: 1,
                          fontSize: width < 1000 ? width / 60 : 17,
                        }}
                        className="overview"
                      >
                        {item.name}
                      </a>
                    );
                  })}
                </div>
              ) : null}
            </div>
            <div
              onClick={previousImg}
              className="left_arrow"
              style={{
                paddingTop: width < 1000 ? width / 50 : 25,
                paddingBottom: width < 1000 ? width / 50 : 25,
                paddingInline: width < 1000 ? width / 1000 : 5,
              }}
            >
              <MdArrowBackIosNew
                size={width < 1000 ? width / 24 : 40}
                color="white"
              />
            </div>
            <div
              onClick={nextImg}
              className="right_arrow"
              style={{
                paddingTop: width < 1000 ? width / 50 : 25,
                paddingBottom: width < 1000 ? width / 50 : 25,
                paddingInline: width < 1000 ? width / 1000 : 5,
              }}
            >
              <MdArrowForwardIos
                size={width < 1000 ? width / 24 : 40}
                color="white"
              />
            </div>
            <div
              style={{
                display: "flex",
                padding: 10,
                position: "absolute",
                bottom: width / 20,
                right: width / 30,
                zIndex: 20,
                alignItems: "center",
              }}
            >
              <FaStar
                color={Colors.yellow}
                size={width < 1000 ? width / 24 : 40}
              />
              <a
                className="movie_title"
                style={{
                  fontSize: width < 1000 ? width / 20 : 50,
                  marginLeft: width < 1000 ? width / 100 : 10,
                }}
              >
                {detail.vote_average}
              </a>
              <a
                className="overview"
                style={{
                  position: "absolute",
                  bottom: -30,
                  textAlign: "center",
                  fontSize: width < 1000 ? width / 60 : 17,
                }}
              >
                Released in{" "}
                {detail && detail.release_date
                  ? detail.release_date.slice(0, 4)
                  : "Unknown"}
              </a>
            </div> */}
            {/* <img src={`${imageUrl}${detail.backdrop_path}`} className="backdrop" /> */}
            {images.map((item, index) => {
              return (
                <div
                  key={item.file_path}
                  className={
                    index === current
                      ? "backdrop_image_container"
                      : "non_active"
                  }
                >
                  {index === current && (
                    <img
                      src={`${imageUrl}${item.file_path}`}
                      className="backdrop"
                    />
                  )}
                </div>
              );
            })}
            <div className="backdrop_fade"></div>
            <div className="backdrop_right_fade"></div>
            <div className="movie_detail_container">
              {logo && logo.file_path ? (
                <>
                  <img
                    src={`${imageUrl}${logo.file_path}`}
                    className="movie_logo"
                  />
                </>
              ) : (
                <h1 className="movie_title">{detail.title}</h1>
              )}
              {detail && detail.genres ? (
                <div>
                  {detail.genres.map((item) => {
                    return (
                      <a
                        key={item.id}
                        style={{
                          color: Colors.yellow,
                          fontWeight: "bold",
                          letterSpacing: 1,
                          fontSize: width < 1000 ? width / 60 : 17,
                        }}
                        className="overview"
                      >
                        {item.name}
                      </a>
                    );
                  })}
                </div>
              ) : null}
            </div>
            <div
              onClick={previousImg}
              className="left_arrow"
              style={{
                paddingTop: width < 1000 ? width / 50 : 25,
                paddingBottom: width < 1000 ? width / 50 : 25,
                paddingInline: width < 1000 ? width / 1000 : 5,
              }}
            >
              <MdArrowBackIosNew
                size={width < 1000 ? width / 24 : 40}
                color="white"
              />
            </div>
            <div
              onClick={nextImg}
              className="right_arrow"
              style={{
                paddingTop: width < 1000 ? width / 50 : 25,
                paddingBottom: width < 1000 ? width / 50 : 25,
                paddingInline: width < 1000 ? width / 1000 : 5,
              }}
            >
              <MdArrowForwardIos
                size={width < 1000 ? width / 24 : 40}
                color="white"
              />
            </div>
            <div
              style={{
                display: "flex",
                padding: 10,
                position: "absolute",
                bottom: width / 20,
                right: width / 30,
                zIndex: 20,
                alignItems: "center",
              }}
            >
              <FaStar
                color={Colors.yellow}
                size={width < 1000 ? width / 24 : 40}
              />
              <a
                className="movie_title"
                style={{
                  fontSize: width < 1000 ? width / 20 : 50,
                  marginLeft: width < 1000 ? width / 100 : 10,
                }}
              >
                {detail.vote_average}
              </a>
              <a
                className="overview"
                style={{
                  position: "absolute",
                  bottom: -30,
                  textAlign: "center",
                  fontSize: width < 1000 ? width / 60 : 17,
                }}
              >
                Released in{" "}
                {detail && detail.release_date
                  ? detail.release_date.slice(0, 4)
                  : "Unknown"}
              </a>
            </div>
          </div>
        </div>
        {/* <div className="backdrop_right_fade"></div> */}
        <div className="similar_movies_container">
          {/* <div className="backdrop_fade"></div> */}
          <a
            className="similar_movies_title"
            style={{
              fontSize: width < 1000 ? width / 35 : 30,
            }}
          >
            Similar Movies
          </a>
          <div className="similar_movies_scroller">
            {similar.map((item) => {
              return (
                <div className="similar_movie_box" key={item.id}>
                  <img
                    src={`${imageUrl}${item.backdrop_path}`}
                    className="similar_movies_img"
                  />
                  <a
                    className="similar_movie_name"
                    style={{ fontSize: width < 1000 ? width / 60 : 18 }}
                  >
                    {item.title}
                  </a>
                </div>
              );
            })}
          </div>
          <div className="similar_fade"></div>
        </div>
      </div>
      <div
        style={{
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          // marginTop: width * 0.42,
          width: "100vw",
        }}
      >
        <a
          className="overview"
          style={{
            fontSize: width < 1000 ? width / 50 : 20,
          }}
        >
          {detail.overview}
        </a>
        <a
          style={{
            fontSize: width < 1000 ? width / 45 : 24,
            //   color: Colors.primary,
          }}
          className="detail_category"
        >
          Cast
        </a>
        <div className="cast_container">
          {cast.map((item) => {
            return (
              <div className="cast_box">
                <img
                  src={`${imageUrl}${item.profile_path}`}
                  className="cast_image"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
