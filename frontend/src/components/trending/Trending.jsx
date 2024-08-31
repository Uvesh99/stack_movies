import { useState } from "react"
import Home from "../homes/Home"
import "./Trending.css"

const Trending = ({ items }) => {
  const [movies, setMovies] = useState(items)
  return (
    <>
    <h1 style={{marginTop:"20px",marginLeft:'6rem',color:'white'}}>Trending Movies</h1>
      <section className='trending'>
        <Home items={items} />
      </section>
    </>
  )
}

export default Trending