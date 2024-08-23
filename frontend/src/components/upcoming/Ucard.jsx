// import React from "react"
// import { Link } from "react-router-dom"

// const Ucard = ({ item: { id, cover, name, time } }) => {
//   return (
//     <>
//       <div className='MovieBox'>
//         <div className='img'>
//           <img src={cover} alt='' />
//         </div>
//         <div className='text'>
//           <h3>{name}</h3>
//           <span>{time}</span> <br />
//           {/*<Link to={`/singlepage/${id}`}>*/}
//           <button className='primary-btn'>
//             <i className='fa fa-play'></i> PLAY NOW
//           </button>
//           {/*</Link>*/}
//         </div>
//       </div>
//     </>
//   )
// }

// export default Ucard

import React from "react"
import { Link } from "react-router-dom"

const Ucard = ({
  item: {
    _id:movieId, // Change from _id to movieId
    image,
    title,
    description,
    duration,
    language,
    genre,
    director,
    rating, // Include if available
    starring, // Include if available
  },
}) => {
  return (
    <>
      <div className='MovieBox'>
        <div className='img'>
          <img src={image} alt='' />
        </div>
        <div className='text'>
          <h3>{title}</h3>
          <span>{duration}</span> <br />
          <Link to={`/movie/${movieId}`}>
          <button className='primary-btn'>
            <i className='fa fa-play'></i> PLAY NOW
          </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Ucard
