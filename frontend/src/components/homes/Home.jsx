import Slider from "react-slick";
import HomeCard from "./HomeCard";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='next'>
        <ArrowCircleRightIcon></ArrowCircleRightIcon>
      </button>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='prev'>
        <ArrowCircleLeftIcon></ArrowCircleLeftIcon>
      </button>
    </div>
  );
};

const Home = ({ items }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className='homeContainer'>
      <Slider {...settings}>
      {items.map((item) => (
        <HomeCard key={item._id} item={item} />
      ))}
      </Slider>
    </div>
  );
};

export default Home;