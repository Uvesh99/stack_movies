import "./App.css";
import HomePage from "./home/HomePage";
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import SinglePage from "./components/watch/SinglePage";
// import Header from "./components/header/Header";
import Footer from "./common/Footer.jsx";

import Header from "./common/Header";
// import Footer from "./common/Footer";
import Movie from "../src/components/Movies/Movie.jsx";
import Theater from "../src/components/Theater/Theater";
import AuthForm from "./components/Auth/AuthForm";
import TheaterMovies from "./components/Theater/TheaterMovies.jsx";
import MovieDetails from "./components/Theater/MovieDetails.jsx";
function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/singlepage/:id" element={<SinglePage />} />
        <Route path="/theater" element={<Theater></Theater>}></Route>
        <Route path="/theater/:theatreId/movies" element={<TheaterMovies/>}/>
        <Route path="/movie/:movieId" element={<MovieDetails />} />
        <Route path="/movie" element={<Movie></Movie>}></Route>
        <Route path="/register" element={<AuthForm></AuthForm>}></Route>
      </Routes>
      <Footer />
    
    </>
  );
}

export default App;