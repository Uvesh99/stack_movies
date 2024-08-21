/**check */
// App.jsx
import "./App.css";
import HomePage from "./home/HomePage";
import { Routes, Route } from "react-router-dom";
import SinglePage from "./components/watch/SinglePage";
// import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import Header from "./common/Header";
// import Footer from "./common/Footer";
import Movie from "./components/Movie";
import Theater from "./components/Theater";
import AuthForm from "./components/Auth/AuthForm";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/singlepage/:id" element={<SinglePage />} />
        <Route path="/theater" element={<Theater></Theater>}></Route>
        <Route path="/movie" element={<Movie></Movie>}></Route>
        <Route path="/register" element={<AuthForm></AuthForm>}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;


/**Mine */
// import Header from "./common/Header";
// import Footer from "./common/Footer";
// import { Route, Routes } from "react-router-dom";
// import HomePage from "./components/Homepage";
// import Movie from "./components/Movie";
// import Theater from "./components/Theater";
// import AuthForm from "./components/Auth/AuthForm";

// function App() {
//   return (
//     <>
    
//       <Header isAdmin={true}></Header>
//       <section>
//         <Routes>
//           <Route path="/" element={<HomePage></HomePage>}></Route>
//           <Route path="/theater" element={<Theater></Theater>}></Route>
//           <Route path="/movie" element={<Movie></Movie>}></Route>
//           <Route path="/register" element={<AuthForm></AuthForm>}></Route>
//         </Routes>
//       </section>
     
//     </>
//   ) 
// }

// export default App

// import Header from "./common/Header";
// import Footer from "./common/Footer";
// import { Route, Routes } from "react-router-dom";
// import HomePage from "./components/Homepage";
// import Movie from "./components/Movie";
// import Admin from "./components/Admin/Admin";
// import User from "./components/User/User";
// import Authuser from "./components/Auth/Authuser";
// import Theater from "./components/Theater";

// function App() {
//   return (
//     <>
    
//       <Header isAdmin={true}></Header>
//       <section>
//         <Routes>
//           <Route path="/" element={<HomePage></HomePage>}></Route>
//           <Route path="/theater" element={<Theater></Theater>}></Route>
//           <Route path="/movie" element={<Movie></Movie>}></Route>
//           <Route path="/admin" element={<Admin></Admin>}></Route>
//           <Route path="/user" element={<Authuser></Authuser>}></Route>
//         </Routes>
//       </section>
     
//     </>
//   )
// }

// export default App
