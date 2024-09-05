// /**check */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById } from '../../api/Movie_api/getAllmovie';
import { fetchBookedSeats, saveReservation, sendOTP, verifyOTP } from '../../api/Reservation_api/Reservation';
import { v4 as uuidv4 } from 'uuid';
import "./movieDetails.css";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [openBookingDialog, setOpenBookingDialog] = useState(false);
  const [openUserInfoDialog, setOpenUserInfoDialog] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [Seats, setSeats] = useState([]);
  const [Date, setDate] = useState('');
  const [Time, setTime] = useState('');
  const [userInfo, setUserInfo] = useState({ name: '', phone: '' ,email: ''});
  const [ticketPrice, setTicketPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [otp, setOtp] = useState('');

  const dateOptions = ['2024-09-01', '2024-09-02', '2024-09-03', '2024-09-04', '2024-09-05'];
  const timeOptions = ['10:00 AM', '01:00 PM', '04:00 PM', '07:00 PM', '10:00 PM'];

  useEffect(() => {
    const fetchMovieDetails = async () => {   // Fetching Movie Details
      try {
        const data = await getMovieById(movieId);
        setMovie(data);
        setTicketPrice(data.theater.ticketPrice); 
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  useEffect(() => {
    if (Date && Time) {                            // Fetching Booked Seats
      const fetchBookedSeatsData = async () => {  
        const bookedSeats = await fetchBookedSeats(movieId, Date, Time);
        setBookedSeats(bookedSeats);
      };
      fetchBookedSeatsData();
    }
  }, [Date, Time, movieId]);

  if (!movie) {
    return <Typography variant="h5" color="white">Loading...</Typography>;
  }

  const handleBookingDialogOpen = () => {
    setOpenBookingDialog(true); // Open Book Dialog
  };

  const handleBookingDialogClose = () => {
    setOpenBookingDialog(false); // Close Book Dialog
  };

  const handleUserInfoDialogClose = () => {
    setOpenUserInfoDialog(false); // Close User Dialog
  };

  const handleOpenPaymentDialog = () => {
    setOpenPaymentDialog(true); // Open Payment Dialog
  };

  const handleClosePaymentDialog = () => {
    setOpenPaymentDialog(false); // Close Payment Dialog
  };

  const handleSeatClick = (seat) => {
    if (!bookedSeats.includes(seat)) {
      setSeats((prev) => 
        prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
      );
    }
    
  };

  const handleDateClick = (date) => {
    setDate(date); // Set Date
  };

  const handleTimeClick = (time) => {
    setTime(time); // Set Time
  };

  const handleUserChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const updateTotalAmount = () => { // Counting Total Price
    const totalSeats = Seats.length;
    const amount = totalSeats * ticketPrice; 
    setTotalAmount(amount);
  };

  const handleBookingConfirm = () => {   // Condition for booked tickets
    if (!Date || !Time) {
      alert('Please select both date and time');
      return;
    }
    updateTotalAmount(); 
    setOpenBookingDialog(false);
    setOpenUserInfoDialog(true);
  };

  const handleOtpChange = (event) => {    // Set OTP
    setOtp(event.target.value);
  };
  
  const handleUserInfoConfirm = async () => {    // Collect Reservation Data

    if (!Date || !Time || Seats.length === 0) {
      alert('Please select date, time, and seats');
      return;
    }

    if (!userInfo.name || !userInfo.phone) {
      alert("Please enter valid name and phone number");
      return;
    }
   
    try {
      console.log('user_email',userInfo.email);
      
      await sendOTP(userInfo.email);
      // console.log('OTP sent successfully');
     alert('OTP sent successfully to your email');
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Error sending OTP. Please try again.');
      return;
    }

    handleUserInfoDialogClose();
    handleOpenPaymentDialog(); 
  };

  const handleConfirmPayment = async () => {        // Payment
    
    try {
    const response = await verifyOTP(userInfo.email, otp);
    if (response.data.message !== 'OTP verified successfully') {
      alert('Invalid OTP. Please try again.');
      return;
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    alert('Error verifying OTP. Please try again.');
    return;
  }

    const reservationData = {
      date: Date,
      startAt: Time,
      seats: Seats,
      isBooked: true, 
      orderID: uuidv4(),
      ticketPrice: ticketPrice,
      movie: movie._id,
      theatre: movie.theater._id, 
      name: userInfo.name,
      phone: userInfo.phone,
      email: userInfo.email,
    };

    try {
      const response = await saveReservation(reservationData);
      console.log('Reservation successfully saved:', response.data);
    } 
    catch (error) {
      console.error('Error saving reservation:', error);
      alert('There was an error saving your reservation. Please try again.');
    }

    alert('Your Tickets Are Booked!'); 
    console.log('Payment confirmed for amount:', totalAmount);
    alert('Payment Successfully done');
    setSeats([]);
    setDate('');
    setTime('');
    setUserInfo({ name: '', phone: '' });
    setTotalAmount(0);
    handleClosePaymentDialog();
  };

  const renderSeats = () => {          // Seats Rendering
    const rows = 10;
    const columns = 20;
    const seats = [];

    for (let i = 0; i < rows; i++) {
      const rowLabel = String.fromCharCode(65 + i);
      for (let j = 1; j <= columns; j++) {
        const seat = `${rowLabel}${j}`;
        seats.push(
          <Button
            key={seat}
            variant={Seats.includes(seat) ? "contained" : "outlined"}
            onClick={() => handleSeatClick(seat)}
            disabled={bookedSeats.includes(seat)}
            sx={{ margin: '2px', width: '40px', height: '40px' }}
          >
            {seat}
          </Button>
        );
      }
    }

    return seats;
  };

  return (
    <>
    <Box className="container">
      {/* <div className="movie-details-container">
        <div className="images-container">
          <img
            src={movie.image}
            alt="Large Movie"
            className="large-image"
          />
          <img
            src={movie.image}
            alt="Small Movie"
            className="small-image"
          />
        </div>

        <div className="content-container">
          
          <h1>{movie.title}</h1>
          <p><b>Genre</b>: {movie.genre}</p>
          <p><b>Language</b>: {movie.language}</p>
          <p><b>Duration</b>: {movie.duration}</p>
          <p><b>Director</b>: {movie.director}</p>
          <p><b> startDate</b>:{movie. startDate}</p>
          <p><b>endDate</b>:{movie.endDate}</p>
          <p>{movie.description}</p>
          
          <div className="trailer-container">
            <h2>Watch the Trailer</h2>*/}
            {/* <video src={movie.trailer} controls width="100%" className="trailer-video"/> */}
           {/*} <iframe src={movie.trailer} width="100%" className="trailer-video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write;" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>

          <div className="book-btn">
            <Button 
              variant="contained" 
              className="book-movie-button"
              sx={{ marginTop: 2 }} 
              onClick={handleBookingDialogOpen}
            >
              Book Movie
            </Button>
          </div>
        </div>
      </div> */}
      <div className="movie-details-container">
          <div className="images-container">
            <img
              src={movie.image}
              alt="Large Movie"
              className="large-image"
            />
            <img
              src={movie.image}
              alt="Small Movie"
              className="small-image"
            />
          </div>

          <div className="content-container">
            <h1>{movie.title}</h1>
            <p><b>Genre</b>: {movie.genre}</p>
            <p><b>Language</b>: {movie.language}</p>
            <p><b>Duration</b>: {movie.duration}</p>
            <p><b>Director</b>: {movie.director}</p>
            <p><b>startDate</b>: {movie.startDate}</p>
            <p><b>endDate</b>: {movie.endDate}</p>
            <p>{movie.description}</p>

            <div className="trailer-container">
              <h2>Watch the Trailer</h2>
              <iframe 
                src={movie.trailer} 
                width="100%" 
                className="trailer-video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write;" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </div>

            <div className="book-btn">
              <Button 
                variant="contained" 
                className="book-movie-button"
                sx={{ marginTop: 2 }} 
                onClick={handleBookingDialogOpen}
              >
                Book Movie
              </Button>
            </div>
          </div>
        </div>

      {/* Booking Dialog */}
      <Dialog open={openBookingDialog} onClose={handleBookingDialogClose} maxWidth="md" fullWidth>
        <DialogTitle className="dialog-title">Book Movie</DialogTitle>
        <DialogContent className="dialog-content">
          <Typography>Select Date:</Typography>
          <Grid container spacing={1} sx={{ marginTop: 2 }}>
            {dateOptions.map((date) => (
              <Grid item xs={4} key={date}>
                <Button
                  variant={Date === date ? "contained" : "outlined"}
                  onClick={() => handleDateClick(date)}
                  className={`date-button ${Date === date ? "contained" : "outlined"}`}
                  sx={{ width: '100%' }}
                >
                  {date}
                </Button>
              </Grid>
            ))}
          </Grid>
          <Typography>Select Time:</Typography>
          <Grid container spacing={1} sx={{ marginTop: 2 }}>
            {timeOptions.map((time) => (
              <Grid item xs={4} key={time}>
                <Button
                  variant={Time === time ? "contained" : "outlined"}
                  onClick={() => handleTimeClick(time)}
                  className={`time-button ${Time === time ? "contained" : "outlined"}`}
                  sx={{ width: '100%' }}
                >
                  {time}
                </Button>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" sx={{ marginTop: 2 }}>Select Seats:</Typography>
          <div className="seating-chart" style={{ marginTop: '10px' }}>
            {renderSeats()}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBookingDialogClose}>Cancel</Button>
          <Button onClick={handleBookingConfirm}>Confirm Booking</Button>
        </DialogActions>
      </Dialog>

      {/* User Info Dialog */}
      <Dialog open={openUserInfoDialog} onClose={handleUserInfoDialogClose}>
        <DialogTitle>User Information</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            name="name"
            value={userInfo.name}
            onChange={handleUserChange}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            name="email"
            value={userInfo.email}
            onChange={handleUserChange}
            placeholder='Enter your login email only'
          />
          <TextField
            margin="dense"
            label="Phone"
            type="text"
            fullWidth
            variant="outlined"
            name="phone"
            value={userInfo.phone}
            onChange={handleUserChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUserInfoDialogClose}>Cancel</Button>
          <Button onClick={handleUserInfoConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={openPaymentDialog} onClose={handleClosePaymentDialog}>
        <DialogTitle>Payment</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Total Amount: ${totalAmount}</Typography>
          <TextField
            margin="dense"
            label="Enter OTP"
            type="text"
            fullWidth
            variant="outlined"
            value={otp}
            onChange={handleOtpChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePaymentDialog}>Cancel</Button>
          <Button onClick={handleConfirmPayment}>Pay Now</Button>
        </DialogActions>
      </Dialog>
    </Box>
    </>
  );
};

export default MovieDetails;