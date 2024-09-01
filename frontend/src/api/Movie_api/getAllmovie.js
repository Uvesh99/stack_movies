import axios from "axios";

// const API = axios.create({ baseURL: `https://stack-movies4-20.onrender.com` });
//Instead of http://localhost:5000 use :https://stack-movies4-20.onrender.com
// Get All The Movies
export const getAllMovies = async () => {
    const res = await axios.get("https://stack-movies4-20.onrender.com/api/movies/")
    .catch((err) => console.log(err));
  
    if (res.status !== 200) {
      return console.log("No Data");
    }
  
    const data = await res.data;
    return data;
  };

// Move To Particular Movie
  export const getMovieById = async (movieId) => {
    const res = await axios.get(`https://stack-movies4-20.onrender.com/api/movies/${movieId}`); 
    return res.data;
  };