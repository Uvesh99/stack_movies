import axios from "axios";

export const getAllMovies = async () => {
    const res = await axios.get("http://localhost:5000/api/movies/")
    .catch((err) => console.log(err));
  
    if (res.status !== 200) {
      return console.log("No Data");
    }
  
    const data = await res.data;
    return data;
  };


  export const getMovieById = async (movieId) => {
    const res = await axios.get(`http://localhost:5000/api/movies/${movieId}`); 
    return res.data;
  };