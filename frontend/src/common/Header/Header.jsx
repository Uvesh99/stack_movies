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
// import { useEffect } from 'react';

// function Header() {
//   const [value, setValue] = useState(0);
//   const [openTheaterDialog, setOpenTheaterDialog] = useState(false);
//   const [openMovieDialog, setOpenMovieDialog] = useState(false); // New state for movie dialog
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
//     endDate: ''
//   }); // New state for movie form

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
//     setOpenTheaterDialog(true); // Open Theater dialog
//   };

//   const handleCloseTheaterDialog = () => {
//     setOpenTheaterDialog(false); // close Theater dialog
//   };

//   const handleOpenMovieDialog = () => {
//     setOpenMovieDialog(true); // Open the movie dialog
//   };

//   const handleCloseMovieDialog = () => {
//     setOpenMovieDialog(false); // Close the movie dialog
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
//       const response = await fetch('http://localhost:5000/api/theatres/', {
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

//   const handleSaveMovie = async () => {
//     if (!movie.title || !movie.description || !movie.language || !movie.genre || !movie.director || !movie.duration || !movie.startDate || !movie.endDate || !movie.image || !movie.trailer) {
//       alert("Please fill all the fields and provide necessary details.");
//       return;
//     }

//     const token = localStorage.getItem('token'); 
//     const adminId = localStorage.getItem('adminId');

//     // if (!token || !adminId) {
//     //   alert("You are not authenticated or admin ID is missing. Please log in again.");
//     //   return;
//     // }
//       if (!token) {
//       alert("You are not authenticated or admin ID is missing. Please log in again.");
//       return;
//     }


//     console.log("Token retrieved from localStorage:", token);
//     // console.log("Admin ID retrieved from localStorage:", adminId);

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
//     };

//     try {
//       const response = await fetch('http://localhost:5000/api/movies/', {
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
//       });
//       handleCloseMovieDialog();
//     } catch (error) {
//       console.error('Error:', error);
//       alert(error.message);
//     }
//   };

//   return (
//     <>
//       <AppBar position='sticky' sx={{background:"black"}}>
//         <Toolbar>
//           <Box width={"20%"}>
//             <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height='40'>
//               <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm.001 6c-.001 0-.001 0 0 0h-.465l-2.667-4H20l.001 4zM15.5 15 10 18v-6l5.5 3zm-.964-6-2.667-4h2.596l2.667 4h-2.596zm-2.404 0H9.536L6.869 5h2.596l2.667 4zM4 5h.465l2.667 4H4V5z" fill="#ffffff" className="fill-000000"></path>
//             </svg>
//           </Box>
//           <Box display={'flex'} marginLeft={'auto'} sx={{cursor:'pointer'}}>
//             <Tabs textColor='inherit' indicatorColor='secondary' onChange={(e,val)=>setValue(val)}>
//               <Tab label="Home" component={Link} to="/" sx={{color:"white"}} />
//               <Tab label="Theater" component={Link} to="/theater" sx={{color:"white"}} />
//               <Tab label="Movies" component={Link} to="/movie" sx={{color:"white"}} />
//               {userType === 'Admin' && (
//                 <Box>
//                   <Tab label="Add Your Theater" onClick={handleOpenTheaterDialog} sx={{ color: "white" }} />
//                   <Tab label="Add Movie" onClick={handleOpenMovieDialog} sx={{ color: "white" }} /> {/* New Tab for adding movie */}
//                 </Box>
//               )}
//               {userInitial ? (
//                 <Box display="flex" alignItems="center">
//                 <Box
//                   sx={{
//                   width: 40,
//                   height: 40,
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   borderRadius: '50%',
//                   backgroundColor: '#1b1b1b',
//                   color: 'white',
//                   fontWeight: 'bold',
//                   textTransform: 'uppercase',
//                   marginRight: 2,
//                   cursor: 'pointer', 
//                 }}
//                 onClick={() => {
//                   if (userType === 'Admin') {
//                     navigate('/admin');
//                   } 
//                   else if(userType === 'User'){
//                     navigate('/user');
//                   }
//                 }}
//               >
//                 {userInitial}
//                 </Box>
//                   <Button
//                     variant="outlined"
//                     sx={{ color: "white", borderColor: "white" }}
//                     onClick={handleLogout}
//                   >
//                     Logout
//                   </Button>
//                 </Box>
//               ) : (
//                 <Tab label="Sign Up" component={Link} to="/register" sx={{ color: "white" }} />
//               )}
//             </Tabs>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Theater Dialog */}
//       <Dialog open={openTheaterDialog} onClose={handleCloseTheaterDialog} style={{width:'100%'}}>
//         <DialogTitle>
//           Add Theater
//           <IconButton
//             edge="end"
//             color="inherit"
//             onClick={handleCloseTheaterDialog}
//             aria-label="close"
//             sx={{ position: 'absolute', right: 8, top: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             name="name"
//             label="Name"
//             type="text"
//             style={{ width: '100%' }}
//             variant="standard"
//             onChange={handleTheaterChange}
//           />
//           <TextField
//             margin="dense"
//             name="city"
//             label="City"
//             type="text"
//             style={{ width: '100%' }}
//             variant="standard"
//             onChange={handleTheaterChange}
//           />
//           <TextField
//             margin="dense"
//             name="ticketPrice"
//             label="Ticket Price"
//             type="number"
//             style={{ width: '100%' }}
//             variant="standard"
//             onChange={handleTheaterChange}
//           />
//           <TextField
//             margin="dense"
//             name="seats"
//             label="Seats"
//             type="text"
//             style={{ width: '100%' }}
//             variant="standard"
//             onChange={handleTheaterChange}
//           />
//           <TextField
//            margin="dense"
//            name="image"
//            label="Image URL"
//            type="text"
//            style={{ width: '100%' }}
//            variant="standard"
//            onChange={handleTheaterChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseTheaterDialog}>Cancel</Button>
//           <Button onClick={handleSaveTheater}>Save</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Movie Dialog */}
//       <Dialog open={openMovieDialog} onClose={handleCloseMovieDialog} style={{width:'100%'}}>
//         <DialogTitle>
//           Add Movie
//           <IconButton
//             edge="end"
//             color="inherit"
//             onClick={handleCloseMovieDialog}
//             aria-label="close"
//             sx={{ position: 'absolute', right: 8, top: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             name="title"
//             label="Title"
//             type="text"
//             style={{ width: '100%' }}
//             variant="standard"
//             onChange={handleMovieChange}
//           />
//           <TextField
//             margin="dense"
//             name="image"
//             label="Image URL"
//             type="text"
//             style={{ width: '100%' }}
//             variant="standard"
//             onChange={handleMovieChange}
//           />
//           <TextField
//             margin="dense"
//             name="language"
//             label="Language"
//             type="text"
//             style={{ width: '100%' }}
//             variant="standard"
//             onChange={handleMovieChange}
//           />
//           <TextField
//             margin="dense"
//             name="genre"
//             label="Genre"
//             type="text"
//             style={{ width: '100%' }}
//             variant="standard"
//             onChange={handleMovieChange}
//           />
//           <TextField
//             margin="dense"
//             name="director"
//             label="Director"
//             type="text"
//             style={{ width: '100%' }}
//             variant="standard"
//             onChange={handleMovieChange}
//           />
//           <TextField
//             margin="dense"
//             name="trailer"
//             label="Trailer URL"
//             type="text"
//             style={{ width: '100%' }}
//             variant="standard"
//             onChange={handleMovieChange}
//           />
//           <TextField
//             margin="dense"
//             name="description"
//             label="Description"
//             type="text"
//             style={{ width: '100%' }}
//             variant="standard"
//             onChange={handleMovieChange}
//           />
//           <TextField
//             margin="dense"
//             name="duration"
//             label="Duration (in minutes)"
//             type="number"
//             style={{ width: '100%' }}
//             variant="standard"
//             onChange={handleMovieChange}
//           />
//           <TextField
//             margin="dense"
//             name="startDate"
//             label="Start Date"
//             type="date"
//             style={{ width: '100%' }}
//             variant="standard"
//             InputLabelProps={{ shrink: true }}
//             onChange={handleMovieChange}
//           />
//           <TextField
//             margin="dense"
//             name="endDate"
//             label="End Date"
//             type="date"
//             style={{ width: '100%' }}
//             variant="standard"
//             InputLabelProps={{ shrink: true }}
//             onChange={handleMovieChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseMovieDialog}>Cancel</Button>
//           <Button onClick={handleSaveMovie}>Save</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }

// export default Header;

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
    endDate: ''
  });
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
        <DialogActions>
          <Button onClick={handleCloseMovieDialog} color="secondary">Cancel</Button>
          <Button onClick={handleSaveMovie} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Header;
