
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById } from '../../api/Movie_api/getAllmovie'; // Assuming this function exists to fetch movie by ID
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <Typography variant="h5" color="white">Loading...</Typography>;
  }

  return (
    <Box p={2}>
      <Typography variant="h4" color="white" gutterBottom>{movie.title}</Typography>
      <Card sx={{ backgroundColor: '#333', color: 'white' }}>
        <CardMedia
          component="img"
          height="300"
          image={movie.image}
          alt={movie.title}
        />
        <CardContent>
          <Typography variant="h6">Director: {movie.director}</Typography>
          <Typography variant="body2">Language: {movie.language}</Typography>
          <Typography variant="body2">Genre: {movie.genre}</Typography>
          <Typography variant="body2">Duration: {movie.duration} mins</Typography>
          <Typography variant="body2">Start Date: {new Date(movie.startDate).toDateString()}</Typography>
          <Typography variant="body2">End Date: {new Date(movie.endDate).toDateString()}</Typography>
          <Typography variant="body2" sx={{ marginTop: 2 }}>{movie.description}</Typography>
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6">Trailer</Typography>
            <video src={movie.trailer} controls width="100%" />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MovieDetails;
