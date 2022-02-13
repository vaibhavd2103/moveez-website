import React, { useEffect, useState } from "react";
import "./TopTab.css";
import { AiFillHome } from "react-icons/ai";
import {
  MdLocalMovies,
  MdOutlineScreenSearchDesktop,
  MdUpcoming,
} from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { Colors, useWindowDimensions } from "../constants/constants";
import { useNavigate } from "react-router";

function TopTab({ headerColor }) {
  const navigate = useNavigate();
  const [profileHover, setProfileHover] = useState(false);
  const { width, height } = useWindowDimensions();
  return (
    <>
      <div
        className="top_tab_container"
        style={{
          backgroundImage: headerColor,
        }}
      >
        <img src={require("../assets/MOVEEZ.png")} className="logo" />
        {width < 850 ? (
          <div className="category_container">
            <AiFillHome
              color={Colors.white}
              size={width < 850 ? width / 40 : 20}
              className="category_icon"
            />

            <MdLocalMovies
              color={Colors.white}
              size={width < 850 ? width / 40 : 20}
              className="category_icon"
            />

            <MdOutlineScreenSearchDesktop
              color={Colors.white}
              size={width < 850 ? width / 40 : 20}
              className="category_icon"
            />

            <MdUpcoming
              color={Colors.white}
              size={width < 850 ? width / 40 : 20}
              className="category_icon"
            />
          </div>
        ) : (
          <div className="category_container">
            <a
              className="category_name"
              style={{
                fontSize: width < 850 ? width / 45 : 16,
                //  border: "solid 1px white",
                //  borderWidth: 0,
                //  borderBottomWidth: 2,
                //  padding: 10,
              }}
              onClick={() => {
                navigate("/home");
              }}
            >
              Home
            </a>
            <a
              className="category_name"
              style={{ fontSize: width < 850 ? width / 45 : 16 }}
              onClick={() => {
                navigate("/movies");
              }}
            >
              Movies
            </a>
            <a
              className="category_name"
              style={{ fontSize: width < 850 ? width / 45 : 16 }}
              onClick={() => {
                navigate("/tvshows");
              }}
            >
              Tv
            </a>
            <a
              className="category_name"
              style={{ fontSize: width < 850 ? width / 45 : 16 }}
              onClick={() => {
                navigate("/upcoming");
              }}
            >
              Upcoming
            </a>
          </div>
        )}
        <div className="search_profile_box">
          <FiSearch
            color={Colors.white}
            size={width < 850 ? width / 40 : 20}
            style={{
              marginRight: width < 850 ? width / 35 : 30,
              cursor: "pointer",
            }}
          />
          <img
            src="https://media.istockphoto.com/videos/be-confident-when-pursuing-success-video-id1130630420?b=1&k=20&m=1130630420&s=640x640&h=Wi-bpyAKfPMNqOUWC-dICMgnDc64GivflpQPwK1bOPM="
            style={{
              width: width < 850 ? width / 20 : 40,
              height: width < 850 ? width / 20 : 40,
              objectFit: "cover",
              borderRadius: 20,
              cursor: "pointer",
            }}
            onMouseOver={() => setProfileHover(true)}
            onMouseOut={() => setProfileHover(false)}
          />
        </div>
      </div>
      {profileHover ? (
        <div className="profile_hover_container">
          <div className="profile_setting_div">
            <a className="profile_setting_name">Manage Profile</a>
          </div>
          <div className="profile_setting_div">
            <a className="profile_setting_name">Change Plan</a>
          </div>
          <div className="profile_setting_div">
            <a className="profile_setting_name">Edit Profile</a>
          </div>
          <div className="profile_setting_div">
            <a className="profile_setting_name">Favorites</a>
          </div>
          <div className="profile_setting_div">
            <a className="profile_setting_name">Sign out</a>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default TopTab;
