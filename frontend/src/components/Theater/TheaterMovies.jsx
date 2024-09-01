import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMoviesByTheatre, updateMovie, deleteMovie } from '../../api/Theater_api/Theater';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Dialog } from '@mui/material';
import ContactLink from '../../common/ContactLink/ContactLink';

function TheaterMovies() {
  const { theatreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [editMovie, setEditMovie] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const userType = localStorage.getItem("userType") || "";
  const navigate = useNavigate();

  useEffect(() => {

    // Get All The Movies
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

  // Edite Movie Information
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditMovie({
      ...editMovie,
      [name]: value,
    });
  };

  // Update Movie
  const handleUpdateMovie = async (e) => {
    e.preventDefault();
    try {
      const updatedMovie = await updateMovie(editMovie._id, editMovie);
      setMovies(movies.map(movie => movie._id === editMovie._id ? updatedMovie : movie));
      setIsEditing(false);
      setEditMovie(null);
    } catch (e) {
      alert('Error updating movie');
      console.log('error',e);
    }
  };

  // Delete Movie
  const handleDeleteMovie = async (id, e) => {
    e.stopPropagation();
    try {
      await deleteMovie(id);
      setMovies(movies.filter(movie => movie._id !== id));
      alert('Movie deleted successfully!');
    } catch (e) {
      alert('You are not authorized to delete this movie');
      console.log('error',e);
    }
  };

  // Cancel Edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditMovie(null);
  };

  // Move To Particuler Movie
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

  const inputStyles = {
    mb: 2,
    '& .MuiInputBase-input': {
      color: 'black',
    },
    '& .MuiFormLabel-root': {
      color: 'black',
    },
    '& .MuiInput-underline:before': {
      borderBottom: '1px solid white',
    },
    '& .MuiInput-underline:after': {
      borderBottom: '2px solid white',
    },
  };
  

  return (
    <Box p={2}>
      <Typography variant="h4" color="white" gutterBottom textAlign={'center'} marginBottom={'3rem'}> Available Movies</Typography>
      <Grid container spacing={2}>
        {movies.map(movie => (
          <Grid item xs={12} sm={6} md={4} key={movie._id} spacing={7}>
            <Card sx={{ backgroundColor: '#333', color: 'white'}} onClick={() => handleMovieClick(movie._id)}>
              <CardMedia
                component="img"
                image={movie.image}
                alt={movie.title}
                sx={{objectFit: 'cover',width: '100%',aspectRatio: '16/9'}}
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
      <div className="contact" style={{ display: 'flex', alignItems: 'center', marginLeft: '42rem', marginTop: '2rem' }}>
      <p style={{ color: 'white', fontSize: '2rem', marginRight: '0rem',paddingRight:'1rem' }}>
        Feel free to contact
      </p><ContactLink />
      </div>
      {isEditing && userType === 'Admin' && (
        <Dialog open={true} PaperProps={{ style: { borderRadius: 20, overflow: 'hidden', width: 500 } }}>
        <Box component="form" onSubmit={handleUpdateMovie} sx={{ mt: 4 }}>
          <TextField
            margin="dense"
            name="title"
            label="Title"
            type="text"
            style={{width:'100%'}}
            variant="standard"
            value={editMovie.title}
            onChange={handleEditChange}
            sx={inputStyles}
          />
          <TextField
            margin="dense"
            name="director"
            label="Director"
            type="text"
            style={{width:'100%'}}
            variant="standard"
            value={editMovie.director}
            onChange={handleEditChange}
            sx={inputStyles}
          />
          <TextField
            margin="dense"
            name="genre"
            label="Genre"
            type="text"
            style={{width:'100%'}}
            variant="standard"
            value={editMovie.genre}
            onChange={handleEditChange}
            sx={inputStyles}
          />
          <TextField
            margin="dense"
            name="duration"
            label="Duration"
            type="text"
            style={{width:'100%'}}
            variant="standard"
            value={editMovie.duration}
            onChange={handleEditChange}
            sx={inputStyles}
          />
          <TextField
            margin="dense"
            name="image"
            label="Image URL"
            type="text"
            style={{width:'100%'}}
            variant="standard"
            value={editMovie.image}
            onChange={handleEditChange}
            sx={inputStyles}
          />
          <Box display="flex" justifyContent="space-between">
            <Button type="submit" variant="contained" color="primary">Save</Button>
            <Button variant="contained" color="secondary" onClick={handleCancelEdit}>Cancel</Button>
          </Box>
        </Box>
        </Dialog>
      )}
    </Box>
  );
}

export default TheaterMovies;