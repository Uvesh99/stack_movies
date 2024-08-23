// import React from "react"
// import { Link } from "react-router-dom"

// const HomeCard = ({ item: { id, cover, name, rating, time, desc, starring, genres, tags, video } }) => {
//   return (
//     <>
//       <div className='box'>
//         <div className='coverImage'>
//           <img src={cover} alt='' />
//         </div>
//         <div className='content flex'>
//           <div className='details row'>
//             <h1>{name}</h1>
//             <div className='rating flex'>
//               <div className='rate'>
//                 <i className='fas fa-star'></i>
//                 <i className='fa fa-star'></i>
//                 <i className='fa fa-star'></i>
//                 <i className='fa fa-star'></i>
//                 <i className='fa fa-star-half'></i>
//               </div>
//               <label>{rating}(Imdb)</label>
//               <span>GP</span>
//               <label>{time}</label>
//             </div>
//             <p>{desc}</p>
//             <div className='cast'>
//               <h4>
//                 <span>Starring </span>
//                 {starring}
//               </h4>
//               <h4>
//                 <span>Genres </span>
//                 {genres}
//               </h4>
//               <h4>
//                 <span>Tags </span>
//                 {tags}
//               </h4>
//             </div>
//             <button className='primary-btn'>
//               <i className='fas fa-play'></i> PLAY NOW
//             </button>
//           </div>
//           <div className='palyButton row'>
//             <Link to={`/singlepage/${id}`}>
//               <button>
//                 <div className='img'>
//                   <img src='./images/play-button.png' alt='' />
//                   <img src='./images/play.png' className='change' />
//                 </div>
//                 WATCH TRAILER
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default HomeCard


import React from "react";
import { Link } from "react-router-dom";

const HomeCard = ({
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
  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}hr : ${minutes}mins`;
  };

  return (
    <div className='box'>
      <div className='coverImage'>
        <img src={image} alt={title} />
      </div>
      <div className='content flex'>
        <div className='details row'>
          <h1>{title}</h1>
          <div className='rating flex'>
            <label>{language}</label>
            <span>{genre}</span>
            <label>{formatDuration(duration)}</label>
            {rating && <label>{rating}(Imdb)</label>} {/* Conditionally render */}
          </div>
          <p>{description}</p>
          {starring && (
            <div className='cast'>
              <h4>
                <span>Starring </span>
                {starring}
              </h4>
            </div>
          )}
          <button className='primary-btn'>
            <i className='fas fa-play'></i> PLAY NOW
          </button>
        </div>
        <div className='playButton row'>
          <Link to={`/movie/${movieId}`}> {/* Use movieId instead of _id */}
            <button>
              <div className='img'>
                <img src='./images/play-button.png' alt='' />
                <img src='./images/play.png' className='change' />
              </div>
              WATCH TRAILER
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
