import { useState, useEffect } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

const imageUrl = "https://image.tmdb.org/t/p/original/";

const Colors = {
  primary: "#6E01C0",
  mPurple: "#4D0484",
  dPurple: "#2C0847",
  bg: "#0B0B0B",
  white: "#ffffff",
  black: "#000000",
  red: "#FF2626",
  yellow: "#FFC947",
  lightBg: "#0f0f0f",
  grey: "#5d5d5d",
};

export { useWindowDimensions, Colors, imageUrl };
