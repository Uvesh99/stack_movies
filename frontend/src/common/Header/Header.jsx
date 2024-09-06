import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';

function Header() {
  const [value, setValue] = useState(0);
  const [openTheaterDialog, setOpenTheaterDialog] = useState(false);
  const [openMovieDialog, setOpenMovieDialog] = useState(false); // New state for movie dialog
  const [theater, setTheater] = useState({
    name: '',
    city: '',
    ticketPrice: '',
    seats: '',
    image: '',
  });
  const [movie, setMovie] = useState({
    title: '',
    image: '',
    language: '',
    genre: '',
    director: '',
    trailer: '',
    description: '',
    duration: '',
    startDate: '',
    endDate: '',
    timeSlots: [],
  }); // New state for movie form
  
  const [newTimeSlot, setNewTimeSlot] = useState('');
  
  const userEmail = localStorage.getItem("userEmail") || "";
  const userInitial = userEmail ? userEmail.charAt(0).toUpperCase() : "";
  const userType = localStorage.getItem("userType") || ""; 
  console.log('type',userType);
  
  const navigate = useNavigate();



  useEffect(() => {
    document.body.style.inert = openTheaterDialog || openMovieDialog ? 'true' : 'false';
    return () => {
      document.body.style.inert = 'false';
    };
  }, [openTheaterDialog, openMovieDialog]);

  

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token"); 
    localStorage.removeItem("userType");
    navigate("/");
    window.location.reload();
  };

  const handleOpenTheaterDialog = () => {
    setOpenTheaterDialog(true); // Open Theater dialog
  };

  const handleCloseTheaterDialog = () => {
    setOpenTheaterDialog(false); // close Theater dialog
  };

  const handleOpenMovieDialog = () => {
    setOpenMovieDialog(true); // Open the movie dialog
  };

  const handleCloseMovieDialog = () => {
    setOpenMovieDialog(false); // Close the movie dialog
  };

  const handleTheaterChange = (e) => {
    const { name, value } = e.target;
    setTheater({
      ...theater,
      [name]: value,
    });
  };

  const handleMovieChange = (e) => {
    const { name, value } = e.target;
    setMovie({
      ...movie,
      [name]: value,
    });
  };

  const handleAddTimeSlot = () => {
    if (newTimeSlot) {
      setMovie({ ...movie, timeSlots: [...movie.timeSlots, newTimeSlot] });
      setNewTimeSlot('');
    }
  };

  const handleSaveTheater = async () => {
    if (!theater.name || !theater.city || !theater.ticketPrice || !theater.seats || !theater.image) {
      alert("Please fill all the fields and provide an image URL.");
      return;
    }
  
    const token = localStorage.getItem('token'); 
  
    if (!token) {
      alert("You are not authenticated. Please log in.");
      return;
    }

    console.log("Token retrieved from localStorage:", token);
  
    const theaterData = {
      name: theater.name,
      city: theater.city,
      ticketPrice: parseFloat(theater.ticketPrice),
      seats: theater.seats.split(',').map(Number),
      image: theater.image,
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/theatres/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(theaterData),
      });
  
      if (!response.ok) {
        throw new Error('Admin can create only one theater');
      }
  
      const result = await response.json();
      console.log('Theater added:', result);
      
      setTheater({
        name: '',
        city: '',
        ticketPrice: '',
        seats: '',
        image: '',
      });
      handleCloseTheaterDialog();
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };
  
  const handleSaveMovie = async () => {
    if (!movie.title || !movie.description || !movie.language || !movie.genre || !movie.director || !movie.duration || !movie.startDate || !movie.endDate || !movie.image || !movie.trailer) {
      alert("Please fill all the fields and provide necessary details.");
      return;
    }
  
    const token = localStorage.getItem('token'); 
    const adminId = localStorage.getItem('adminId');

      if (!token) {
      alert("You are not authenticated or admin ID is missing. Please log in again.");
      return;
    }
    
  
    console.log("Token retrieved from localStorage:", token);
    
    
    const movieData = {
      title: movie.title,
      description: movie.description,
      language: movie.language,
      genre: movie.genre,
      director: movie.director,
      duration: parseInt(movie.duration),
      startDate: movie.startDate,
      endDate: movie.endDate,
      image: movie.image,
      trailer: movie.trailer,
      adminId: adminId,
      timeSlots: movie.timeSlots,
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/movies/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(movieData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add movie. Please check your inputs.');
      }
  
      const result = await response.json();
      console.log('Movie added:', result);
      
      setMovie({
        title: '',
        description: '',
        language: '',
        genre: '',
        director: '',
        duration: '',
        startDate: '',
        endDate: '',
        image: '',
        trailer: '',
        timeSlots: [],
      });
      handleCloseMovieDialog();
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };
  
  return (
    <>
      <AppBar position='sticky' sx={{background:"black"}}>
        <Toolbar>
          <Box width={"20%"}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height='40'>
              <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm.001 6c-.001 0-.001 0 0 0h-.465l-2.667-4H20l.001 4zM15.5 15 10 18v-6l5.5 3zm-.964-6-2.667-4h2.596l2.667 4h-2.596zm-2.404 0H9.536L6.869 5h2.596l2.667 4zM4 5h.465l2.667 4H4V5z" fill="#ffffff" className="fill-000000"></path>
            </svg>
          </Box>
          <Box display={'flex'} marginLeft={'auto'} sx={{cursor:'pointer'}}>
            <Tabs textColor='inherit' indicatorColor='secondary' onChange={(e,val)=>setValue(val)}>
              <Tab label="Home" component={Link} to="/" sx={{color:"white"}} />
              <Tab label="Theater" component={Link} to="/theater" sx={{color:"white"}} />
              <Tab label="Movies" component={Link} to="/movie" sx={{color:"white"}} />
              {userType === 'Admin' && (
                <Box>
                  <Tab label="Add Your Theater" onClick={handleOpenTheaterDialog} sx={{ color: "white" }} />
                  <Tab label="Add Movie" onClick={handleOpenMovieDialog} sx={{ color: "white" }} /> {/* New Tab for adding movie */}
                </Box>
              )}
              {userInitial ? (
                <Box display="flex" alignItems="center">
                <Box
                  sx={{
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  backgroundColor: '#1b1b1b',
                  color: 'white',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  marginRight: 2,
                  cursor: 'pointer', 
                }}
                onClick={() => {
                  if (userType === 'Admin') {
                    navigate('/admin');
                  } 
                  else if(userType === 'User'){
                    navigate('/user');
                  }
                }}
              >
                {userInitial}
                </Box>
                  <Button
                    variant="outlined"
                    sx={{ color: "white", borderColor: "white" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Box>
              ) : (
                <Tab label="Sign Up" component={Link} to="/register" sx={{ color: "white" }} />
              )}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Theater Dialog */}
      <Dialog open={openTheaterDialog} onClose={handleCloseTheaterDialog} style={{width:'100%'}}>
        <DialogTitle>
          Add Theater
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseTheaterDialog}
            aria-label="close"
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            style={{ width: '100%' }}
            variant="standard"
            onChange={handleTheaterChange}
          />
          <TextField
            margin="dense"
            name="city"
            label="City"
            type="text"
            style={{ width: '100%' }}
            variant="standard"
            onChange={handleTheaterChange}
          />
          <TextField
            margin="dense"
            name="ticketPrice"
            label="Ticket Price"
            type="number"
            style={{ width: '100%' }}
            variant="standard"
            onChange={handleTheaterChange}
          />
          <TextField
            margin="dense"
            name="seats"
            label="Seats"
            type="text"
            style={{ width: '100%' }}
            variant="standard"
            onChange={handleTheaterChange}
          />
          <TextField
           margin="dense"
           name="image"
           label="Image URL"
           type="text"
           style={{ width: '100%' }}
           variant="standard"
           onChange={handleTheaterChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTheaterDialog}>Cancel</Button>
          <Button onClick={handleSaveTheater}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Movie Dialog */}
      <Dialog open={openMovieDialog} onClose={handleCloseMovieDialog} style={{width:'100%'}}>
        <DialogTitle>
          Add Movie
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseMovieDialog}
            aria-label="close"
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            style={{ width: '100%' }}
            variant="standard"
            onChange={handleMovieChange}
          />
          <TextField
            margin="dense"
            name="image"
            label="Image URL"
            type="text"
            style={{ width: '100%' }}
            variant="standard"
            onChange={handleMovieChange}
          />
          <TextField
            margin="dense"
            name="language"
            label="Language"
            type="text"
            style={{ width: '100%' }}
            variant="standard"
            onChange={handleMovieChange}
          />
          <TextField
            margin="dense"
            name="genre"
            label="Genre"
            type="text"
            style={{ width: '100%' }}
            variant="standard"
            onChange={handleMovieChange}
          />
          <TextField
            margin="dense"
            name="director"
            label="Director"
            type="text"
            style={{ width: '100%' }}
            variant="standard"
            onChange={handleMovieChange}
          />
          <TextField
            margin="dense"
            name="trailer"
            label="Trailer URL"
            type="text"
            style={{ width: '100%' }}
            variant="standard"
            onChange={handleMovieChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            style={{ width: '100%' }}
            variant="standard"
            onChange={handleMovieChange}
          />
          <TextField
            margin="dense"
            name="duration"
            label="Duration (in minutes)"
            type="number"
            style={{ width: '100%' }}
            variant="standard"
            onChange={handleMovieChange}
          />
          <TextField
            margin="dense"
            name="startDate"
            label="Start Date"
            type="date"
            style={{ width: '100%' }}
            variant="standard"
            InputLabelProps={{ shrink: true }}
            onChange={handleMovieChange}
          />
          <TextField
            margin="dense"
            name="endDate"
            label="End Date"
            type="date"
            style={{ width: '100%' }}
            variant="standard"
            InputLabelProps={{ shrink: true }}
            onChange={handleMovieChange}
          />
        </DialogContent>

         {/* Time Slots Section */}
         <TextField
            margin="dense"
            label="Add Time Slot"
            type="text"
            style={{ width: '100%' }}
            variant="standard"
            value={newTimeSlot}
            onChange={(e) => setNewTimeSlot(e.target.value)}
          />
          <Button onClick={handleAddTimeSlot}>Add Time Slot</Button>
          <Box>
            {movie.timeSlots.map((slot, index) => (
              <Box key={index}>
                {slot}
              </Box>
            ))}
          </Box>

        <DialogActions>
          <Button onClick={handleCloseMovieDialog}>Cancel</Button>
          <Button onClick={handleSaveMovie}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Header;