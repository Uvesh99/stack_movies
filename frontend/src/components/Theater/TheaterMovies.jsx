import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMoviesByTheatre, updateMovie, deleteMovie } from '../../api/Theater_api/Theater';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function TheaterMovies() {
  const { theatreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [editMovie, setEditMovie] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const userType = localStorage.getItem("userType") || "";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMoviesByTheatre(theatreId);
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [theatreId]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditMovie({
      ...editMovie,
      [name]: value,
    });
  };

  const handleUpdateMovie = async (e) => {
    e.preventDefault();
    try {
      const updatedMovie = await updateMovie(editMovie._id, editMovie);
      setMovies(movies.map(movie => movie._id === editMovie._id ? updatedMovie : movie));
      setIsEditing(false);
      setEditMovie(null);
    } catch (error) {
      alert('Error updating movie');
    }
  };

  const handleDeleteMovie = async (id, e) => {
    e.stopPropagation();
    try {
      await deleteMovie(id);
      setMovies(movies.filter(movie => movie._id !== id));
      alert('Movie deleted successfully!');
    } catch (error) {
      alert('You are not authorized to delete this movie');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditMovie(null);
  };

  const handleMovieClick = (movieId) => {
    if (!isEditing) {
      navigate(`/movie/${movieId}`);
    }
  };

  const handleEditClick = (movie, e) => {
    e.stopPropagation();
    setIsEditing(true);
    setEditMovie(movie);
  };

  return (
    <Box p={2}>
      <Typography variant="h4" color="white" gutterBottom>Movies</Typography>
      <Grid container spacing={2}>
        {movies.map(movie => (
          <Grid item xs={12} sm={6} md={4} key={movie._id}>
            <Card sx={{ backgroundColor: '#333', color: 'white' }} onClick={() => handleMovieClick(movie._id)}>
              <CardMedia
                component="img"
                height="140"
                image={movie.image}
                alt={movie.title}
              />
              <CardContent>
                <Typography variant="h6">{movie.title}</Typography>
                <Typography variant="body2">Director: {movie.director}</Typography>
                <Typography variant="body2">Genre: {movie.genre}</Typography>
                <Typography variant="body2">Duration: {movie.duration}</Typography>
                {userType === 'Admin' && (
                  <>
                    <Button variant="contained" color="primary" onClick={(e) => handleEditClick(movie, e)}>Edit</Button>
                    <Button variant="contained" color="error" onClick={(e) => handleDeleteMovie(movie._id, e)} sx={{ ml: 1 }}>Delete</Button>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {isEditing && userType === 'Admin' && (
        <Box component="form" onSubmit={handleUpdateMovie} sx={{ mt: 4 }}>
          <TextField
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={editMovie.title}
            onChange={handleEditChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="director"
            label="Director"
            type="text"
            fullWidth
            variant="standard"
            value={editMovie.director}
            onChange={handleEditChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="genre"
            label="Genre"
            type="text"
            fullWidth
            variant="standard"
            value={editMovie.genre}
            onChange={handleEditChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="duration"
            label="Duration"
            type="text"
            fullWidth
            variant="standard"
            value={editMovie.duration}
            onChange={handleEditChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="image"
            label="Image URL"
            type="text"
            fullWidth
            variant="standard"
            value={editMovie.image}
            onChange={handleEditChange}
            sx={{ mb: 2 }}
          />
          <Box display="flex" justifyContent="space-between">
            <Button type="submit" variant="contained" color="primary">Save</Button>
            <Button variant="contained" color="secondary" onClick={handleCancelEdit}>Cancel</Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default TheaterMovies;
