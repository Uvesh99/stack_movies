import { getAllMovies } from "../../api/Movie_api/getAllmovie";
import { useEffect } from "react";

function Movie() {

  useEffect(()=>{
    getAllMovies()
    .then((data)=>console.log(data))
    .catch((e)=>console.log(e));
   },[]);

  return (
    <div>Movie</div>
  ) 
}

export default Movie
