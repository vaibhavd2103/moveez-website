import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import instance from "../axios/axios";
import { API_KEY } from "../axios/requests";
import { Colors } from "../constants/constants";
import "./MovieDetail.css";

function MovieDetail(props) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState({});
  useEffect(() => {
    const fetchDetails = async () => {
      const response = await instance.get(
        `/movie/${location.state.id}?api_key=${API_KEY}`
      );
      console.log(response.data);
      setDetail(response.data);
      setLoading(false);
    };
    fetchDetails();
  }, []);

  return (
    <div className="container" style={{ backgroundColor: Colors.bg }}>
      {loading && <h1 style={{ color: "white" }}>Loading...</h1>}
      <h1 style={{ color: "white" }}>Movie detail {detail.title}</h1>
    </div>
  );
}

export default MovieDetail;
