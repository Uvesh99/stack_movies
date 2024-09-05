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
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function Header() {
  const [value, setValue] = useState(0);
  const [openTheaterDialog, setOpenTheaterDialog] = useState(false);
  const [openMovieDialog, setOpenMovieDialog] = useState(false);
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
  });
  const [newTimeSlot, setNewTimeSlot] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false); // State for mobile drawer

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect if the screen is small

  const userEmail = localStorage.getItem("userEmail") || "";
  const userInitial = userEmail ? userEmail.charAt(0).toUpperCase() : "";
  const userType = localStorage.getItem("userType") || "";
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
    setOpenTheaterDialog(true);
  };

  const handleCloseTheaterDialog = () => {
    setOpenTheaterDialog(false);
  };

  const handleOpenMovieDialog = () => {
    setOpenMovieDialog(true);
  };

  const handleCloseMovieDialog = () => {
    setOpenMovieDialog(false);
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
      const response = await fetch('https://stack-movies4-20.onrender.com/api/theatres/', {
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
      const response = await fetch('https://stack-movies4-20.onrender.com/api/movies/', {
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

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/theater">
          <ListItemText primary="Theater" />
        </ListItem>
        <ListItem button component={Link} to="/movie">
          <ListItemText primary="Movies" />
        </ListItem>
        {userType === 'Admin' && (
          <>
            <ListItem button onClick={handleOpenTheaterDialog}>
              <ListItemText primary="Add Your Theater" />
            </ListItem>
            <ListItem button onClick={handleOpenMovieDialog}>
              <ListItemText primary="Add Movie" />
            </ListItem>
          </>
        )}
        {userInitial ? (
          <>
            <ListItem button onClick={() => {
              if (userType === 'Admin') {
                navigate('/admin');
              } else if (userType === 'User') {
                navigate('/user');
              }
            }}>
              <ListItemText primary={`Profile (${userInitial})`} />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <ListItem button component={Link} to="/register">
            <ListItemText primary="Sign Up" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position='sticky' sx={{ background: "black" }}>
        <Toolbar>
          <Box width={isMobile ? "100%" : "20%"} display="flex" justifyContent={isMobile ? "space-between" : "flex-start"}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height='40'>
              <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm.001 6c-.001 0-.001 0 0 0h-.465l-2.667-4H20l.001 4zM15.5 15 10 18v-6l5.5 3zm-.964-6-2.667-4h2.596l2.667 4h-2.596zm-2.404 0H9.536L6.869 5h2.596l2.667 4zM4 5h.465l2.667 4H4V5z" fill="#ffffff" className="fill-000000"></path>
            </svg>
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
          {!isMobile && (
            <Tabs
              sx={{ ml: 'auto', textTransform: 'none' }}
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
              indicatorColor="secondary"
            >
              <Tab LinkComponent={Link} to="/" label="Home" />
              <Tab LinkComponent={Link} to="/theater" label="Theater" />
              <Tab LinkComponent={Link} to="/movie" label="Movies" />
              {userType === 'Admin' && (
                <>
                  <Tab label="Add Your Theater" onClick={handleOpenTheaterDialog} />
                  <Tab label="Add Movie" onClick={handleOpenMovieDialog} />
                </>
              )}
            </Tabs>
          )}
          {!isMobile && (
            <Box display="flex" marginLeft="auto">
              {userInitial ? (
                <>
                  <Button
                    onClick={() => {
                      if (userType === 'Admin') {
                        navigate('/admin');
                      } else if (userType === 'User') {
                        navigate('/user');
                      }
                    }}
                    variant="contained"
                    sx={{
                      marginLeft: 1,
                      borderRadius: 10,
                      backgroundColor: 'black',
                      color: 'white',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#FFD700',
                        color: 'black',
                      },
                    }}
                  >
                    Profile ({userInitial})
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="contained"
                    sx={{
                      marginLeft: 1,
                      borderRadius: 10,
                      backgroundColor: 'black',
                      color: 'white',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#FFD700',
                        color: 'black',
                      },
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  LinkComponent={Link}
                  to="/register"
                  variant="contained"
                  sx={{
                    marginLeft: 1,
                    borderRadius: 10,
                    backgroundColor: 'black',
                    color: 'white',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#FFD700',
                      color: 'black',
                    },
                  }}
                >
                  Sign Up
                </Button>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerList}
      </Drawer>
      {/* Theater Dialog */}
      <Dialog open={openTheaterDialog} onClose={handleCloseTheaterDialog} fullWidth maxWidth="sm">
        <DialogTitle>Add Your Theater</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseTheaterDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <TextField
            name="name"
            label="Theater Name"
            fullWidth
            margin="dense"
            value={theater.name}
            onChange={handleTheaterChange}
          />
          <TextField
            name="city"
            label="City"
            fullWidth
            margin="dense"
            value={theater.city}
            onChange={handleTheaterChange}
          />
          <TextField
            name="ticketPrice"
            label="Ticket Price"
            fullWidth
            margin="dense"
            type="number"
            value={theater.ticketPrice}
            onChange={handleTheaterChange}
          />
          <TextField
            name="seats"
            label="Seats"
            fullWidth
            margin="dense"
            value={theater.seats}
            onChange={handleTheaterChange}
            helperText="Enter seat numbers separated by commas"
          />
          <TextField
            name="image"
            label="Image URL"
            fullWidth
            margin="dense"
            value={theater.image}
            onChange={handleTheaterChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTheaterDialog} color="secondary">Cancel</Button>
          <Button onClick={handleSaveTheater} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Movie Dialog */}
      <Dialog open={openMovieDialog} onClose={handleCloseMovieDialog} fullWidth maxWidth="sm">
        <DialogTitle>Add Movie</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseMovieDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <TextField
            name="title"
            label="Movie Title"
            fullWidth
            margin="dense"
            value={movie.title}
            onChange={handleMovieChange}
          />
          <TextField
            name="description"
            label="Description"
            fullWidth
            margin="dense"
            multiline
            value={movie.description}
            onChange={handleMovieChange}
          />
          <TextField
            name="language"
            label="Language"
            fullWidth
            margin="dense"
            value={movie.language}
            onChange={handleMovieChange}
          />
          <TextField
            name="genre"
            label="Genre"
            fullWidth
            margin="dense"
            value={movie.genre}
            onChange={handleMovieChange}
          />
          <TextField
            name="director"
            label="Director"
            fullWidth
            margin="dense"
            value={movie.director}
            onChange={handleMovieChange}
          />
          <TextField
            name="trailer"
            label="Trailer URL"
            fullWidth
            margin="dense"
            value={movie.trailer}
            onChange={handleMovieChange}
          />
          <TextField
            name="image"
            label="Image URL"
            fullWidth
            margin="dense"
            value={movie.image}
            onChange={handleMovieChange}
          />
          <TextField
            name="duration"
            label="Duration (in minutes)"
            fullWidth
            margin="dense"
            type="number"
            value={movie.duration}
            onChange={handleMovieChange}
          />
          <TextField
            name="startDate"
            label="Start Date"
            fullWidth
            margin="dense"
            type="date"
            value={movie.startDate}
            onChange={handleMovieChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name="endDate"
            label="End Date"
            fullWidth
            margin="dense"
            type="date"
            value={movie.endDate}
            onChange={handleMovieChange}
            InputLabelProps={{
              shrink: true,
            }}
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
          <Button onClick={handleCloseMovieDialog} color="secondary">Cancel</Button>
          <Button onClick={handleSaveMovie} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Header;

/**second */
// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Box from '@mui/material/Box';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import MenuIcon from '@mui/icons-material/Menu';
// import Drawer from '@mui/material/Drawer';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import { useEffect } from 'react';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import Chip from '@mui/material/Chip';


// function Header() {
//   const [value, setValue] = useState(0);
//   const [openTheaterDialog, setOpenTheaterDialog] = useState(false);
//   const [openMovieDialog, setOpenMovieDialog] = useState(false);
//   const [customTime, setCustomTime] = useState('');
//   const [theater, setTheater] = useState({
//     name: '',
//     city: '',
//     ticketPrice: '',
//     seats: '',
//     image: '',
//   });
//   const [movie, setMovie] = useState({
//     title: '',
//     image: '',
//     language: '',
//     genre: '',
//     director: '',
//     trailer: '',
//     description: '',
//     duration: '',
//     startDate: '',
//     endDate: '',
//     times: ['10:00 AM', '01:00 PM', '04:00 PM'],
//   });
//   const [drawerOpen, setDrawerOpen] = useState(false); // State for mobile drawer


//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect if the screen is small

//   const userEmail = localStorage.getItem("userEmail") || "";
//   const userInitial = userEmail ? userEmail.charAt(0).toUpperCase() : "";
//   const userType = localStorage.getItem("userType") || "";
//   const navigate = useNavigate();

//   useEffect(() => {
//     document.body.style.inert = openTheaterDialog || openMovieDialog ? 'true' : 'false';
//     return () => {
//       document.body.style.inert = 'false';
//     };
//   }, [openTheaterDialog, openMovieDialog]);

//   const handleLogout = () => {
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("token");
//     localStorage.removeItem("userType");
//     navigate("/");
//     window.location.reload();
//   };

//   const handleOpenTheaterDialog = () => {
//     setOpenTheaterDialog(true);
//   };

//   const handleCloseTheaterDialog = () => {
//     setOpenTheaterDialog(false);
//   };

//   const handleOpenMovieDialog = () => {
//     setOpenMovieDialog(true);
//   };

//   const handleCloseMovieDialog = () => {
//     setOpenMovieDialog(false);
//   };

//   const handleTheaterChange = (e) => {
//     const { name, value } = e.target;
//     setTheater({
//       ...theater,
//       [name]: value,
//     });
//   };

//   const handleMovieChange = (e) => {
//     const { name, value } = e.target;
//     setMovie({
//       ...movie,
//       [name]: value,
//     });
//   };

//   const handleTimeChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setMovie({
//       ...movie,
//       times: typeof value === 'string' ? value.split(',') : value,
//     });
//   };


//   const addCustomTime = () => {
//     if (customTime && !movie.times.includes(customTime)) {
//       setMovie((movie) => ({
//         ...movie,
//         times: [...movie.times, customTime]
//       }));
//       setCustomTime(''); // Clear the input field after adding
//     }
//   };

//   const handleSaveTheater = async () => {
//     if (!theater.name || !theater.city || !theater.ticketPrice || !theater.seats || !theater.image) {
//       alert("Please fill all the fields and provide an image URL.");
//       return;
//     }

//     const token = localStorage.getItem('token');

//     if (!token) {
//       alert("You are not authenticated. Please log in.");
//       return;
//     }

//     console.log("Token retrieved from localStorage:", token);

//     const theaterData = {
//       name: theater.name,
//       city: theater.city,
//       ticketPrice: parseFloat(theater.ticketPrice),
//       seats: theater.seats.split(',').map(Number),
//       image: theater.image,
//     };

//     try {
//       const response = await fetch('https://stack-movies4-20.onrender.com/api/theatres/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(theaterData),
//       });

//       if (!response.ok) {
//         throw new Error('Admin can create only one theater');
//       }

//       const result = await response.json();
//       console.log('Theater added:', result);

//       setTheater({
//         name: '',
//         city: '',
//         ticketPrice: '',
//         seats: '',
//         image: '',
//       });
//       handleCloseTheaterDialog();
//     } catch (error) {
//       console.error('Error:', error);
//       alert(error.message);
//     }
//   };

//   // const handleSaveMovie = async () => {
//   //   if (!movie.title || !movie.description || !movie.language || !movie.genre || !movie.director || !movie.duration || !movie.startDate || !movie.endDate || !movie.image || !movie.trailer || movie.times.length === 0) {
//   //     alert("Please fill all the fields and provide necessary details.");
//   //     return;
//   //   }

//   //   const token = localStorage.getItem('token');
//   //   const adminId = localStorage.getItem('adminId');

//   //   if (!token) {
//   //     alert("You are not authenticated or admin ID is missing. Please log in again.");
//   //     return;
//   //   }


//   //   console.log("Token retrieved from localStorage:", token);
//   //   console.log("Movie times:", movie.times); 

//   //   const movieData = {
//   //     title: movie.title,
//   //     description: movie.description,
//   //     language: movie.language,
//   //     genre: movie.genre,
//   //     director: movie.director,
//   //     duration: parseInt(movie.duration),
//   //     startDate: movie.startDate,
//   //     endDate: movie.endDate,
//   //     image: movie.image,
//   //     trailer: movie.trailer,
//   //     adminId: adminId,
//   //     times: movie.times,
//   //   };
//   //   console.log("Movie Data", movieData);
//   //   try {
//   //     const response = await fetch('https://stack-movies4-20.onrender.com/api/movies/', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //         'Authorization': `Bearer ${token}`
//   //       },
//   //       body: JSON.stringify(movieData),
//   //     });

//   //     if (!response.ok) {
//   //       throw new Error('Failed to add movie. Please check your inputs.');
//   //     }

//   //     const result = await response.json();
//   //     console.log('Movie added:', result);

//   //     setMovie({
//   //       title: '',
//   //       description: '',
//   //       language: '',
//   //       genre: '',
//   //       director: '',
//   //       duration: '',
//   //       startDate: '',
//   //       endDate: '',
//   //       image: '',
//   //       trailer: '',
//   //       times: [],
//   //     });
//   //     handleCloseMovieDialog();
//   //   } catch (error) {
//   //     console.error('Error:', error);
//   //     alert(error.message);
//   //   }
//   // };


//   const handleSaveMovie = async () => {
//     // Ensure all movie details are filled correctly
//     if (!movie.title || !movie.description || !movie.language || !movie.genre || !movie.director || !movie.duration || !movie.startDate || !movie.endDate || !movie.image || !movie.trailer || movie.times.length === 0) {
//       alert("Please fill all the fields and provide necessary details.");
//       return;
//     }
  
//     // Get token and adminId from localStorage
//     const token = localStorage.getItem('token');
//     const adminId = localStorage.getItem('adminId');
  
//     if (!token) {
//       alert("You are not authenticated or admin ID is missing. Please log in again.");
//       return;
//     }
  
//     // Ensure times are in the correct format (array of strings)
//     const formattedTimes = movie.times.map(time => time.toString());
  
//     const movieData = {
//       title: movie.title,
//       description: movie.description,
//       language: movie.language,
//       genre: movie.genre,
//       director: movie.director,
//       duration: parseInt(movie.duration),
//       startDate: movie.startDate,
//       endDate: movie.endDate,
//       image: movie.image,
//       trailer: movie.trailer,
//       adminId: adminId,
//       times: formattedTimes, // Ensure times are correctly formatted
//     };
//   console.log(movieData);
//     try {
//       const response = await fetch('https://stack-movies4-20.onrender.com/api/movies/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(movieData),
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to add movie. Please check your inputs.');
//       }
  
//       const result = await response.json();
//       console.log('Movie added:', result);
  
//       // Reset the movie state after successful save
//       setMovie({
//         title: '',
//         description: '',
//         language: '',
//         genre: '',
//         director: '',
//         duration: '',
//         startDate: '',
//         endDate: '',
//         image: '',
//         trailer: '',
//         times: [],
//       });
  
//       handleCloseMovieDialog(); // Close the dialog on success
//     } catch (error) {
//       console.error('Error:', error);
//       alert(error.message);
//     }
//   };
  

//   const toggleDrawer = (open) => (event) => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }
//     setDrawerOpen(open);
//   };

//   const drawerList = (
//     <Box
//       sx={{ width: 250 }}
//       role="presentation"
//       onClick={toggleDrawer(false)}
//       onKeyDown={toggleDrawer(false)}
//     >
//       <List>
//         <ListItem button component={Link} to="/">
//           <ListItemText primary="Home" />
//         </ListItem>
//         <ListItem button component={Link} to="/theater">
//           <ListItemText primary="Theater" />
//         </ListItem>
//         <ListItem button component={Link} to="/movie">
//           <ListItemText primary="Movies" />
//         </ListItem>
//         {userType === 'Admin' && (
//           <>
//             <ListItem button onClick={handleOpenTheaterDialog}>
//               <ListItemText primary="Add Your Theater" />
//             </ListItem>
//             <ListItem button onClick={handleOpenMovieDialog}>
//               <ListItemText primary="Add Movie" />
//             </ListItem>
//           </>
//         )}
//         {userInitial ? (
//           <>
//             <ListItem button onClick={() => {
//               if (userType === 'Admin') {
//                 navigate('/admin');
//               } else if (userType === 'User') {
//                 navigate('/user');
//               }
//             }}>
//               <ListItemText primary={`Profile (${userInitial})`} />
//             </ListItem>
//             <ListItem button onClick={handleLogout}>
//               <ListItemText primary="Logout" />
//             </ListItem>
//           </>
//         ) : (
//           <ListItem button component={Link} to="/register">
//             <ListItemText primary="Sign Up" />
//           </ListItem>
//         )}
//       </List>
//     </Box>
//   );

//   return (
//     <>
//       <AppBar position='sticky' sx={{ background: "black" }}>
//         <Toolbar>
//           <Box width={isMobile ? "100%" : "20%"} display="flex" justifyContent={isMobile ? "space-between" : "flex-start"}>
//             <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height='40'>
//               <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm.001 6c-.001 0-.001 0 0 0h-.465l-2.667-4H20l.001 4zM15.5 15 10 18v-6l5.5 3zm-.964-6-2.667-4h2.596l2.667 4h-2.596zm-2.404 0H9.536L6.869 5h2.596l2.667 4zM4 5h.465l2.667 4H4V5z" fill="#ffffff" className="fill-000000"></path>
//             </svg>
//             {isMobile && (
//               <IconButton
//                 edge="start"
//                 color="inherit"
//                 aria-label="menu"
//                 onClick={toggleDrawer(true)}
//               >
//                 <MenuIcon />
//               </IconButton>
//             )}
//           </Box>
//           {!isMobile && (
//             <Tabs
//               sx={{ ml: 'auto', textTransform: 'none' }}
//               textColor="inherit"
//               value={value}
//               onChange={(e, val) => setValue(val)}
//               indicatorColor="secondary"
//             >
//               <Tab LinkComponent={Link} to="/" label="Home" />
//               <Tab LinkComponent={Link} to="/theater" label="Theater" />
//               <Tab LinkComponent={Link} to="/movie" label="Movies" />
//               {userType === 'Admin' && (
//                 <>
//                   <Tab label="Add Your Theater" onClick={handleOpenTheaterDialog} />
//                   <Tab label="Add Movie" onClick={handleOpenMovieDialog} />
//                 </>
//               )}
//             </Tabs>
//           )}
//           {!isMobile && (
//             <Box display="flex" marginLeft="auto">
//               {userInitial ? (
//                 <>
//                   <Button
//                     onClick={() => {
//                       if (userType === 'Admin') {
//                         navigate('/admin');
//                       } else if (userType === 'User') {
//                         navigate('/user');
//                       }
//                     }}
//                     variant="contained"
//                     sx={{
//                       marginLeft: 1,
//                       borderRadius: 10,
//                       backgroundColor: 'black',
//                       color: 'white',
//                       textTransform: 'none',
//                       '&:hover': {
//                         backgroundColor: '#FFD700',
//                         color: 'black',
//                       },
//                     }}
//                   >
//                     Profile ({userInitial})
//                   </Button>
//                   <Button
//                     onClick={handleLogout}
//                     variant="contained"
//                     sx={{
//                       marginLeft: 1,
//                       borderRadius: 10,
//                       backgroundColor: 'black',
//                       color: 'white',
//                       textTransform: 'none',
//                       '&:hover': {
//                         backgroundColor: '#FFD700',
//                         color: 'black',
//                       },
//                     }}
//                   >
//                     Logout
//                   </Button>
//                 </>
//               ) : (
//                 <Button
//                   LinkComponent={Link}
//                   to="/register"
//                   variant="contained"
//                   sx={{
//                     marginLeft: 1,
//                     borderRadius: 10,
//                     backgroundColor: 'black',
//                     color: 'white',
//                     textTransform: 'none',
//                     '&:hover': {
//                       backgroundColor: '#FFD700',
//                       color: 'black',
//                     },
//                   }}
//                 >
//                   Sign Up
//                 </Button>
//               )}
//             </Box>
//           )}
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         anchor="left"
//         open={drawerOpen}
//         onClose={toggleDrawer(false)}
//       >
//         {drawerList}
//       </Drawer>
//       {/* Theater Dialog */}
//       <Dialog open={openTheaterDialog} onClose={handleCloseTheaterDialog} fullWidth maxWidth="sm">
//         <DialogTitle>Add Your Theater</DialogTitle>
//         <IconButton
//           aria-label="close"
//           onClick={handleCloseTheaterDialog}
//           sx={{
//             position: 'absolute',
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//         <DialogContent>
//           <TextField
//             name="name"
//             label="Theater Name"
//             fullWidth
//             margin="dense"
//             value={theater.name}
//             onChange={handleTheaterChange}
//           />
//           <TextField
//             name="city"
//             label="City"
//             fullWidth
//             margin="dense"
//             value={theater.city}
//             onChange={handleTheaterChange}
//           />
//           <TextField
//             name="ticketPrice"
//             label="Ticket Price"
//             fullWidth
//             margin="dense"
//             type="number"
//             value={theater.ticketPrice}
//             onChange={handleTheaterChange}
//           />
//           <TextField
//             name="seats"
//             label="Seats"
//             fullWidth
//             margin="dense"
//             value={theater.seats}
//             onChange={handleTheaterChange}
//             helperText="Enter seat numbers separated by commas"
//           />
//           <TextField
//             name="image"
//             label="Image URL"
//             fullWidth
//             margin="dense"
//             value={theater.image}
//             onChange={handleTheaterChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseTheaterDialog} color="secondary">Cancel</Button>
//           <Button onClick={handleSaveTheater} color="primary">Save</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Movie Dialog */}
//       <Dialog open={openMovieDialog} onClose={handleCloseMovieDialog} fullWidth maxWidth="sm">
//         <DialogTitle>Add Movie</DialogTitle>
//         <IconButton
//           aria-label="close"
//           onClick={handleCloseMovieDialog}
//           sx={{
//             position: 'absolute',
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//         <DialogContent>
//           <TextField
//             name="title"
//             label="Movie Title"
//             fullWidth
//             margin="dense"
//             value={movie.title}
//             onChange={handleMovieChange}
//           />
//           <TextField
//             name="description"
//             label="Description"
//             fullWidth
//             margin="dense"
//             multiline
//             value={movie.description}
//             onChange={handleMovieChange}
//           />
//           <TextField
//             name="language"
//             label="Language"
//             fullWidth
//             margin="dense"
//             value={movie.language}
//             onChange={handleMovieChange}
//           />
//           <TextField
//             name="genre"
//             label="Genre"
//             fullWidth
//             margin="dense"
//             value={movie.genre}
//             onChange={handleMovieChange}
//           />
//           <TextField
//             name="director"
//             label="Director"
//             fullWidth
//             margin="dense"
//             value={movie.director}
//             onChange={handleMovieChange}
//           />
//           <TextField
//             name="trailer"
//             label="Trailer URL"
//             fullWidth
//             margin="dense"
//             value={movie.trailer}
//             onChange={handleMovieChange}
//           />
//           <TextField
//             name="image"
//             label="Image URL"
//             fullWidth
//             margin="dense"
//             value={movie.image}
//             onChange={handleMovieChange}
//           />
//           <TextField
//             name="duration"
//             label="Duration (in minutes)"
//             fullWidth
//             margin="dense"
//             type="number"
//             value={movie.duration}
//             onChange={handleMovieChange}
//           />
//           <TextField
//             name="startDate"
//             label="Start Date"
//             fullWidth
//             margin="dense"
//             type="date"
//             value={movie.startDate}
//             onChange={handleMovieChange}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           <TextField
//             name="endDate"
//             label="End Date"
//             fullWidth
//             margin="dense"
//             type="date"
//             value={movie.endDate}
//             onChange={handleMovieChange}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />

// <TextField
//           label="Custom Time"
//           fullWidth
//           margin="dense"
//           value={customTime}
//           onChange={(e) => setCustomTime(e.target.value)}
//           placeholder="Enter a custom time"
//         />
//         <Button onClick={addCustomTime} color="primary" variant="outlined" style={{ marginTop: '8px' }}>
//           Add Time
//         </Button>

//         <FormControl fullWidth margin="dense">
//           <InputLabel id="times-label">Selected Times</InputLabel>
//           <Select
//             labelId="times-label"
//             multiple
//             value={movie.times}
//             onChange={handleTimeChange}
//             renderValue={(selected) => (
//               <div>
//                 {selected.map((value) => (
//                   <Chip key={value} label={value} />
//                 ))}
//               </div>
//             )}
//           >
//             {movie.times.map((time) => (
//               <MenuItem key={time} value={time}>
//                 {time}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseMovieDialog} color="secondary">Cancel</Button>
//           <Button onClick={handleSaveMovie} color="primary">Save</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }

// export default Header;

