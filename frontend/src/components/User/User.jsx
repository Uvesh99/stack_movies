

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Typography, Grid, Card, CardMedia, CardContent, Button } from "@mui/material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function User() {
  const [userData, setUserData] = useState({});
  const [reservations, setReservations] = useState([]);
  const [movies, setMovies] = useState([]);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      // Fetch user profile
      axios.get(`https://stack-movies4-20.onrender.com/api/users/profile/${storedUserId}`)
        .then(response => {
          setUserData(response.data);
          
          // Fetch user reservations by email
          axios.get(`https://stack-movies4-20.onrender.com/api/reservations/email/${response.data.email}`)
            .then(reservationResponse => {
              setReservations(reservationResponse.data);
              
              // Fetch movie details based on movieId from reservations
              const movieRequests = reservationResponse.data.map(reservation => 
                axios.get(`https://stack-movies4-20.onrender.com/api/movies/${reservation.movie}`)
              );
              console.log(movieRequests);
              // Wait for all movie requests to complete
              Promise.all(movieRequests)
                .then(movieResponses => {
                  const fetchedMovies = movieResponses.map(res => res.data);
                  console.log(fetchedMovies);
                  setMovies(fetchedMovies);
                })
                .catch(error => console.error("Error fetching movies:", error));
            })
            .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
    } else {
      console.error("User ID is not found in localStorage");
    }
  }, [userId]);


  return (
    <>
     <div className="admin">
     <h1 style={{textAlign:'center',marginTop:'2rem'}}>User Dashboard</h1>
     <Box sx={{ width: '100%', display: 'flex', color: 'white', marginTop:'2rem'}}>
        {userData && (
          <Box sx={{ width: '30%', p: 3, textAlign: 'center' }}>
            <AccountCircleIcon sx={{ fontSize: '10rem', mb: 2 }} />
            <Typography variant="h6">Name: {userData.name}</Typography>
            <Typography variant="h6">Email: {userData.email}</Typography>
            <Typography variant="h6">Phone no.: {userData.phone}</Typography>
            <Typography variant="h6">Role: {userData.role}</Typography>
          </Box>
        )}

        <Box sx={{ width: '70%', mt: 3 }}>
          <Typography variant="h5">Booked Movies by {userData.name}</Typography>
          {reservations.length === 0 ? (
            <Typography variant="h6">No reservations found.</Typography>
          ) : (
            <Grid container spacing={3}>
              {reservations.map((reservation, index) => (
                <Grid item xs={12} sm={6} md={4} key={reservation._id}>
                  <Card sx={{ backgroundColor: '#333', color: 'white', cursor: 'pointer' }} onClick={() => navigate(`/movie/${reservation.movie}`)}>
                    <CardMedia 
                      component="img"
                      height="140"
                      image={movies[index] ? movies[index].image : ""}
                      alt={movies[index] ? movies[index].title : "Loading..."}
                      sx={{ objectFit: 'cover', width: '100%', aspectRatio: '16/9' }}
                    />
                    <CardContent>
                      <Typography variant="h6">{movies[index] ? movies[index].title : "Loading..."}</Typography>
                      <Typography variant="body2">Theater: {movies[index] ? movies[index].theater.name: "Loading..."}</Typography>
                      <Typography variant="body2">Date: {new Date(reservation.date).toLocaleDateString()}</Typography>
                      <Typography variant="body2">startAt: {reservation.startAt}</Typography>
                      <Typography variant="body2">Seats: {reservation.seats.join(', ')}</Typography>
                      <Typography variant="body2">Ticket Price: ${reservation.ticketPrice}</Typography>
                      <Typography variant="body2">Director: {movies[index] ? movies[index].director : "Loading..."}</Typography>
                      <Typography variant="body2">Genre: {movies[index] ? movies[index].genre : "Loading..."}</Typography>
                      <Typography variant="body2">Duration: {movies[index] ? movies[index].duration: "Loading..."}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
      </div>  
    </>
  );
}

export default User;
