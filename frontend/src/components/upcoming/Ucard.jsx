import { Link } from "react-router-dom"
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

const Ucard = ({
  item: {
    _id:movieId, 
    image,
    title,
    description,
    duration,
    language,
    genre,
    director,
    rating, 
    starring, 
  },
}) => {
  return (
    <>
      <div className='MovieBox' style={{color:'white'}}>
        <div className='img'>
          <img src={image} alt='' />
        </div>
        <div className='text'>
          <h3 style={{color:'white'}}>{title}</h3>
          <span>{duration}</span> <br />
          <Link to={`/movie/${movieId}`}>
          <button className='primary-btn'>
            <PlayCircleFilledWhiteIcon className="play-up"></PlayCircleFilledWhiteIcon> PLAY NOW
          </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Ucard