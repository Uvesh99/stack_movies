// import "./App.css";
// import HomePage from "./home/HomePage";
// import { Routes, Route } from "react-router-dom";
// import { useState } from 'react';
// import SinglePage from "./components/watch/SinglePage";
// // import Header from "./components/header/Header";
// import Footer from "./common/Footer.jsx";

// import Header from "./common/Header";
// // import Footer from "./common/Footer";
// import Movie from "../src/components/Movies/Movie.jsx";
// import Theater from "../src/components/Theater/Theater";
// import AuthForm from "./components/Auth/AuthForm";
// import TheaterMovies from "./components/Theater/TheaterMovies.jsx";
// import MovieDetails from "./components/Theater/MovieDetails.jsx";
// import Admin from "./components/Admin/Admin.jsx";
// import User from "./components/User/User.jsx";
// function App() {

//   return (
//     <>
//       <Header />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/singlepage/:id" element={<SinglePage />} />
//         <Route path="/theater" element={<Theater></Theater>}></Route>
//         <Route path="/theater/:theatreId/movies" element={<TheaterMovies/>}/>
//         <Route path="/movie/:movieId" element={<MovieDetails />} />
//         {/* <Route path="/movie" element={<Movie></Movie>}></Route> */}
//         <Route path="/movie" element={<HomePage/>}></Route>
//         <Route path="/register" element={<AuthForm></AuthForm>}></Route>
//         <Route path="/admin" element={<Admin/>}></Route>
//         <Route path="/user" element={<User/>}></Route>
//       </Routes>
//       <Footer />
    
//     </>
//   );
// }

// export default App;

import { Routes, Route, Navigate  } from "react-router-dom";
import Header from "./common/Header/Header.jsx";
import HomePage from "./home/HomePage";
import AuthForm from "./components/Auth/AuthForm";
// import SinglePage from "./components/watch/SinglePage";
import Theater from "../src/components/Theater/Theater";
// import TheaterMovies from "./components/Theater/TeaterMovies.jsx";
import MovieDetails from "./components/Movies/MovieDetails.jsx";
import Footer from "./common/Footer/Footer.jsx";
import Admin from "./components/Admin/Admin.jsx";
import User from "./components/User/User.jsx";
import "./App.css";
import TheaterMovies from "./components/Theater/TheaterMovies.jsx";


function App() {

  const isLoggedIn = localStorage.getItem("token");

  return (
    <>
   
      <Header />
        <Routes>
        <Route path="/register" element={<AuthForm></AuthForm>}></Route>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/admin"
          element={isLoggedIn ? <Admin /> : <Navigate to="/register" />}
        />
        <Route
          path="/user"
          element={isLoggedIn ? <User /> : <Navigate to="/register" />}
        />
        <Route
          path="/theater"
          element={isLoggedIn ? <Theater /> : <Navigate to="/register" />}
        />
        <Route
          path="/theater/:theatreId/movies"
          element={isLoggedIn ? <TheaterMovies/> : <Navigate to="/register" />}
        />
        <Route
          path="/movie/:movieId"
          element={isLoggedIn ? <MovieDetails /> : <Navigate to="/register" />}
        />
        <Route 
          path="/movie" 
          element={isLoggedIn ? <HomePage /> : <Navigate to="/register" />} 
        />
         
        </Routes>
      <Footer />
    
    </>
  );
}

export default App;