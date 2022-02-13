import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import instance from "../axios/axios";
import { API_KEY } from "../axios/requests";
import { Colors, imageUrl, useWindowDimensions } from "../constants/constants";
import "./MovieDetail.css";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { FaStar } from "react-icons/fa";

function TVDetails(props) {
  const { width, height } = useWindowDimensions();
  const location = useLocation();
  const [id, setId] = useState(location.state.id);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState({});
  const [images, setImages] = useState([]);
  const [logo, setLogo] = useState({});
  const [similar, setSimilar] = useState([]);
  const [cast, setCast] = useState([]);
  const [castHover, setCastHover] = useState("");
  const [seasons, setSeasons] = useState([]);
  const [activeSeason, setActiveSeason] = useState({});
  const [activeEpisode, setActiveEpisode] = useState({});

  const fetchDetails = async (id) => {
    const response = await instance.get(`/tv/${id}?api_key=${API_KEY}`);
    //     console.log(response.data);
    const images = await instance.get(`/tv/${id}/images?api_key=${API_KEY}`);
    //  console.log(images.data);
    const filteredLogo = images.data.logos.filter(
      (item) => item.iso_639_1 === "en"
    );
    const similar = await instance.get(`/tv/${id}/similar?api_key=${API_KEY}`);
    const credits = await instance.get(`/tv/${id}/credits?api_key=${API_KEY}`);
    //     console.log(credits.data);
    setCast(credits.data.cast);
    setSeasons(response.data.seasons);
    //  console.log(similar.data);
    setSimilar(similar.data.results);
    setImages(images.data.backdrops);
    setLogo(filteredLogo[0]);
    //  setLogo(images.data.logos[0]);
    setDetail(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDetails(id);
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
                <h1 className="movie_title">{detail.name}</h1>
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
                  bottom: width < 1000 ? -(width / 25) : -40,
                  textAlign: "center",
                  fontSize: width < 1000 ? width / 60 : 17,
                }}
              >
                Released in{" "}
                {detail && detail.first_air_date
                  ? detail.first_air_date.slice(0, 4)
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
            Similar Tv Shows
          </a>
          <div className="similar_movies_scroller">
            {similar.map((item) => {
              return (
                <div
                  className="similar_movie_box"
                  key={item.id}
                  onClick={() => {
                    fetchDetails(item.id);
                    setLoading(true);
                  }}
                >
                  <img
                    src={`${imageUrl}${item.backdrop_path}`}
                    className="similar_movies_img"
                  />
                  <a
                    className="similar_movie_name"
                    style={{ fontSize: width < 1000 ? width / 60 : 18 }}
                  >
                    {item.name}
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
          Seasons
        </a>
        <div className="seasons_container">
          {seasons.map((item) => {
            return (
              <>
                <div
                  key={item.id}
                  className="season_box"
                  onClick={async () => {
                    setLoading(true);
                    const seasonInfo = await instance.get(
                      `/tv/${id}/season/${item.season_number}?api_key=${API_KEY}`
                    );
                    console.log(seasonInfo.data);
                    setActiveSeason(seasonInfo.data);
                    setLoading(false);
                  }}
                >
                  <img
                    src={`${imageUrl}${item.poster_path}`}
                    className="season_poster"
                  />
                  {activeSeason.name === item.name ? (
                    <div className="active_season_box">
                      <a
                        className="active_season"
                        style={{
                          fontSize: width < 1000 ? 18 : 24,
                        }}
                      >
                        {item.name}
                      </a>
                    </div>
                  ) : null}
                </div>
              </>
            );
          })}
        </div>
        {activeSeason.name !== undefined ? (
          <div className="season_info_container">
            <a
              className="season_overview"
              style={{
                fontSize: width < 1000 ? width / 45 : 24,
                fontWeight: "bold",
              }}
            >
              {activeSeason.name} Episodes
            </a>
            <a
              className="season_overview"
              style={{
                fontSize: width < 1000 ? width / 60 : 18,
                opacity: 0.7,
              }}
            >
              {activeSeason.overview}
            </a>
            {loading ? (
              <div>
                <a className="loading">Loading...</a>
              </div>
            ) : (
              <div className="episodes_container">
                {activeSeason && activeSeason.episodes
                  ? activeSeason.episodes.map((item) => {
                      return (
                        <div
                          className="episode_box"
                          key={item.id}
                          onClick={async () => {
                            setLoading(true);
                            const response = await instance.get(
                              `/tv/${id}/season/${item.season_number}/episode/${item.episode_number}?api_key=${API_KEY}`
                            );
                            console.log(response.data);
                            setActiveEpisode(response.data);
                            setLoading(false);
                          }}
                        >
                          <img
                            src={`${imageUrl}${item.still_path}`}
                            className="episode_image"
                          />
                        </div>
                      );
                    })
                  : null}
              </div>
            )}
          </div>
        ) : null}
        {activeEpisode &&
          activeEpisode.episode_number &&
          activeEpisode.still_path && (
            <>
              <a
                style={{
                  fontSize: width < 1000 ? width / 45 : 24,
                  marginTop: 0,
                }}
                className="detail_category"
              >
                Episode {activeEpisode.episode_number}{" "}
                <span style={{ color: Colors.yellow }}>
                  {activeEpisode.name}
                </span>
              </a>
              {activeEpisode && activeEpisode.still_path && (
                <div className="active_episode_container">
                  <img
                    src={`${imageUrl}${activeEpisode.still_path}`}
                    className="active_episode_image"
                  />
                  <div className="active_episode_details_container">
                    <a
                      className="overview"
                      style={{ fontSize: width < 1000 ? width / 60 : 17 }}
                    >
                      Crew
                    </a>
                    <div className="guest_stars_container">
                      {activeEpisode && activeEpisode.crew
                        ? activeEpisode.crew.map((item) => {
                            if (item && item.profile_path) {
                              return (
                                <div
                                //    className="guest_box"
                                >
                                  <a
                                    className="overview"
                                    style={{
                                      fontSize: width < 1000 ? width / 60 : 17,
                                      margin: 0,
                                      padding: 0,
                                      marginRight: 5,
                                      textAlign: "left",
                                    }}
                                  >
                                    {item.name} as
                                    <span style={{ color: Colors.yellow }}>
                                      {"\n"}
                                      {item.job}
                                    </span>
                                  </a>
                                </div>
                              );
                            }
                          })
                        : null}
                    </div>
                    <a
                      className="overview"
                      style={{ fontSize: width < 1000 ? width / 60 : 17 }}
                    >
                      Guest Stars
                    </a>
                    <div className="guest_stars_container">
                      {activeEpisode && activeEpisode.guest_stars
                        ? activeEpisode.guest_stars.map((item) => {
                            if (item && item.profile_path) {
                              return (
                                <div className="guest_box">
                                  <img
                                    src={`${imageUrl}${item.profile_path}`}
                                    className="cast_image"
                                  />
                                </div>
                              );
                            }
                          })
                        : null}
                    </div>
                  </div>
                </div>
              )}
              <a
                className="season_overview"
                style={{
                  opacity: 0.7,
                  marginTop: 0,
                }}
              >
                {activeEpisode.overview}
              </a>
            </>
          )}
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
              <div
                className="cast_box"
                key={item.id}
                onMouseEnter={() => {
                  setCastHover(item.id);
                }}
                onMouseOut={() => {
                  setCastHover("");
                }}
              >
                <img
                  src={`${imageUrl}${item.profile_path}`}
                  className="cast_image"
                />
                <a
                  className="cast_name"
                  style={{
                    fontSize: width < 1000 ? width / 70 : 16,
                  }}
                >
                  {item.name} as {item.character}
                </a>
              </div>
            );
          })}
        </div>
        {detail &&
        detail.belongs_to_collection &&
        detail.belongs_to_collection.backdrop_path ? (
          <div className="collection_container">
            <img
              src={`${imageUrl}${detail.belongs_to_collection.backdrop_path}`}
              className="collection_image"
            />
            <img
              src={`${imageUrl}${detail.belongs_to_collection.poster_path}`}
              className="collection_image_poster"
            />
            <a
              className="collection_name"
              style={{
                fontSize: width / 30,
              }}
            >
              {detail.belongs_to_collection.name}
            </a>
          </div>
        ) : null}
        <a
          style={{
            fontSize: width < 1000 ? width / 45 : 24,
            //   color: Colors.primary,
          }}
          className="detail_category"
        >
          Production Companies
        </a>
        <div className="cast_container">
          {detail && detail.production_companies
            ? detail.production_companies.map((item) => {
                return (
                  <div
                    className="production_company_box"
                    key={item.id}
                    onMouseEnter={() => {
                      setCastHover(item.id);
                    }}
                    onMouseOut={() => {
                      setCastHover("");
                    }}
                  >
                    {item && item.logo_path ? (
                      <img
                        src={`${imageUrl}${item.logo_path}`}
                        className="production_company_image"
                      />
                    ) : (
                      <a
                        className="movie_title"
                        style={{
                          color: "black",
                          fontSize: width < 1000 ? width / 25 : 40,
                        }}
                      >
                        {item.name}
                      </a>
                    )}
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}

export default TVDetails;
