import { Link } from "react-router-dom";
import { useState } from "react";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

const HomeCard = ({
  item: {
    _id:movieId,
    image,
    title,
    description,
    duration,
    language,
    genre,
    director,
    starring,
    trailer,
  },
}) => {
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);

  const handlePlayTrailer = () => {
    setIsTrailerPlaying(true);
  };

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
          <h1 style={{color:'white'}}>{title}</h1>
          <div className='rating flex'>
            <label>{language}</label>
            <span>{genre}</span>
            <label>{formatDuration(duration)}</label>
          </div>
          <p>{description}</p>

          <Link to={`/movie/${movieId}`}>
          <button className='primary-btn'>
            <PlayCircleFilledIcon></PlayCircleFilledIcon> PLAY NOW
          </button>
          </Link>

        </div>
        <div className='playButton row'>
          <Link to={`/movie/${movieId}`}>
            <button className="trailer-btn">
                <PlayCircleFilledIcon className="play-btn" sx={{ fontSize: 130 }}></PlayCircleFilledIcon>
            </button>
          </Link>
          {/* {isTrailerPlaying ? (
            <video width="400" controls autoPlay>
              <source src={trailer} type="video/mp4" />
            </video>
          ) : (
            <button className="trailer-btn" onClick={handlePlayTrailer}>
              <PlayCircleFilledIcon className="play-btn" sx={{ fontSize: 130 }}></PlayCircleFilledIcon>
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default HomeCard;