// import React, { useState } from "react"
// import "./home.css"
// import { homeData } from "../../dummyData"
// import Home from "./Home"

// const Homes = () => {
//   const [items, setItems] = useState(homeData)

//   return (
//     <>
//       <section className='home'>
//         <Home items={items} />
//       </section>
//       <div className='mragin'></div>
//     </>
//   )
// }

// export default Homes
import React, { useState, useEffect } from "react";
import "./home.css";
import Home from "./Home";
import { getAllMovies } from "../../api/Movie_api/getAllmovie";

const Homes = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await getAllMovies(); // Ensure this returns an array of movie objects
        setItems(movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <section className="home">
        <Home items={items} />
      </section>
      <div className="margin"></div>
    </>
  );
};

export default Homes;
