import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import appRouter from "./router/appRouter";
import Home from "./screens/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/Authentication/Login";
import MovieDetail from "./screens/MovieDetail";
import Movies from "./screens/Movies";
import TVDetails from "./screens/TVDetails";
import TVShows from "./screens/TVShows";
import Upcoming from "./screens/Upcoming";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/tvshows" element={<TVShows />}></Route>
          <Route path="/moviedetails" element={<MovieDetail />}></Route>
          <Route path="/tvdetails" element={<TVDetails />}></Route>
          <Route path="/upcoming" element={<Upcoming />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
