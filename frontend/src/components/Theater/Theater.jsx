import { useState, useEffect } from 'react';
import { getAllTheatres, updateTheatre, deleteTheatre } from '../../api/Theater_api/Theater.js';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

function Theater() {
  const [theatres, setTheatres] = useState([]);
  const [editTheatre, setEditTheatre] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const userType = localStorage.getItem("userType") || ""; 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const data = await getAllTheatres();
        setTheatres(data);
      } catch (error) {
        console.error('Error fetching theatres:', error);
      }
    };
    fetchTheatres();
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTheatre({
      ...editTheatre,
      [name]: value,
    });
  };

  const handleUpdateTheatre = async (e) => {
    e.preventDefault();
    try {
      console.log('Updating theater:', editTheatre);

      const updatedTheatre = await updateTheatre(editTheatre._id, editTheatre);
      setTheatres(theatres.map(theatre => theatre._id === editTheatre._id ? updatedTheatre : theatre));
      setIsEditing(false);
      setEditTheatre(null);
    } catch (error) {
      console.error('Error updating theatre:', error.response.data);
      alert('Error updating theater: ' + error.response.data.message);
    }
  };

  const handleDeleteTheatre = async (id, e) => {
    e.stopPropagation(); // Stop event from propagating to the Card's onClick
    try {
      console.log('Deleting theater with ID:', id);
      const response = await deleteTheatre(id);
      console.log('Response:', response);
      
      setTheatres(theatres.filter(theatre => theatre._id !== id));
      
      alert('Theater deleted successfully!');
    } catch (error) {
      alert('You are not authorized to delete this theater');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTheatre(null);
  };

  const handleTheatreClick = (theatreId) => {
    navigate(`/theater/${theatreId}/movies`);
  };

  const handleEditClick = (theatre, e) => {
    e.stopPropagation(); // Stop event from propagating to the Card's onClick
    setIsEditing(true);
    setEditTheatre(theatre);
  };

  return (
    <Box p={2}>
      <Typography variant="h4" color="white" gutterBottom>Theaters</Typography>
      <Grid container spacing={2}>
        {theatres.map(theatre => (
          <Grid item xs={12} sm={6} md={4} key={theatre._id}>
            <Card sx={{ backgroundColor: '#333', color: 'white' }} onClick={() => handleTheatreClick(theatre._id)} >
              <CardMedia
                component="img"
                height="140"
                image={theatre.image}
                alt={theatre.name}
              />
              
              <CardContent>
                <Typography variant="h6">{theatre.name}</Typography>
                <Typography variant="body2">City: {theatre.city}</Typography>
                <Typography variant="body2">Ticket Price: {theatre.ticketPrice}</Typography>
                <Typography variant="body2">Seats: {theatre.seats}</Typography>
                {userType === 'Admin' &&(
                  <>
                    <Button variant="contained" color="primary" onClick={(e) => handleEditClick(theatre, e)}>Edit</Button>
                    <Button variant="contained" color="error" onClick={(e) => handleDeleteTheatre(theatre._id, e)} sx={{ ml: 1 }}>Delete</Button>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {isEditing && userType === 'Admin' && (
        <Box component="form" onSubmit={handleUpdateTheatre} sx={{ mt: 4 }}>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={editTheatre.name}
            onChange={handleEditChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="city"
            label="City"
            type="text"
            fullWidth
            variant="standard"
            value={editTheatre.city}
            onChange={handleEditChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="ticketPrice"
            label="Ticket Price"
            type="text"
            fullWidth
            variant="standard"
            value={editTheatre.ticketPrice}
            onChange={handleEditChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="seats"
            label="Seats"
            type="text"
            fullWidth
            variant="standard"
            value={editTheatre.seats}
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

export default Theater;
