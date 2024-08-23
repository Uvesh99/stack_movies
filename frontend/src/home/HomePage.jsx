// import React, { useState } from "react"
// import Homes from "../components/homes/Homes"
// import Trending from "../components/trending/Trending"
// import Upcomming from "../components/upcoming/Upcomming"
// import { latest, recommended, upcome } from "../dummyData"

// const HomePage = () => {
//   const [items, setItems] = useState(upcome)
//   const [item, setItem] = useState(latest)
//   const [rec, setRec] = useState(recommended)
//   return (
//     <>
//       <Homes />
//       <Upcomming items={items} title='Upcomming Movies' />
//       <Upcomming items={item} title='Latest Movies' />
//       <Trending />
//       <Upcomming items={rec} title='Recommended Movies' />
//     </>
//   )
// }

// export default HomePage


import React, { useState, useEffect } from "react";
import Homes from "../components/homes/Homes";
import Trending from "../components/trending/Trending";
import Upcomming from "../components/upcoming/Upcomming";
import { getAllMovies } from "../api/Movie_api/getAllmovie"; // Adjust the import path if needed

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState([]);
  const [rec, setRec] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await getAllMovies();

        // Shuffle the movies to distribute randomly
        const shuffledMovies = movies.sort(() => 0.5 - Math.random());

        // Assuming you want to distribute the first few movies
        setItems(shuffledMovies.slice(0, 5)); // Upcomming Movies
        setItem(shuffledMovies.slice(5, 10)); // Latest Movies
        setRec(shuffledMovies.slice(10, 15)); // Recommended Movies
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <Homes />
      <Upcomming items={items} title='Upcomming Movies' />
      <Upcomming items={item} title='Latest Movies' />
      <Trending />
      <Upcomming items={rec} title='Recommended Movies' />
    </>
  );
};

export default HomePage;
