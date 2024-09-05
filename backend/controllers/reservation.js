const Reservation = require('../models/Reservation');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { sendOTP, verifyOTP } = require('../config/otp.js');

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, 
  secure: true, 
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.PASSWORD, 
  },
  tls: {
    rejectUnauthorized: false,
  },
});


exports.requestOTP = async (req, res) => {
  const { email } = req.body;
  console.log('otpemail',email);
  

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    await sendOTP(email);
    // alert('OTP email sent successfully to ' + email);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error in requestOTP:', error.stack);
    res.status(500).json({ message: 'Error sending OTP' });
  }
};

exports.verifyOTPs = (req, res) => {
  const { email, otp } = req.body;

  if (verifyOTP(email, otp)) {
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
};


exports.addReservation = async (req, res) => {
  try {
    console.log('Incoming reservation data:', req.body);
    const newReservation = new Reservation(req.body);
    const savedReservation = await newReservation.save();
    await savedReservation.populate('movie theatre');

    const { email, seats, movie, theatre } = savedReservation;
    const movieName = movie.title; 
    const theatreName = theatre.name;
   
    const mailOptions = {
      from: process.env.EMAIL,
      to: email, 
      subject: "Your Movie Reservation Confirmation",
      html: `
        <h1>Reservation Confirmation</h1>
        <p>Thank you for your reservation!</p>
        <p><strong>Movie:</strong> ${movieName}</p>
        <p><strong>Theater:</strong> ${theatreName}</p>
        <p><strong>Seats:</strong> ${seats.join(', ')}</p>
        <p>We look forward to seeing you!</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json(savedReservation);
  } catch (error) {
    console.error('Error saving reservation:', error); 
    res.status(400).json({ message: error.message });
  }
};


// Update an existing reservation
exports.updateReservation = async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a reservation
exports.deleteReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all reservations
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('movie theatre');
    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single reservation
exports.getReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate('movie theatre');
    res.status(200).json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**getBookedSeats*/
exports.getBookedSeats = async (req, res) => {
  const { movieId, date, startAt } = req.query;

  // Log incoming parameters for debugging
  console.log('Query Parameters:', req.query);

  // Convert date string to Date object
  const reservationDate = new Date(date);
  console.log('Parsed reservationDate:', reservationDate);

  // Check if date is valid
  if (isNaN(reservationDate.getTime())) {  // Use getTime() to check validity
    return res.status(400).json({ message: 'Invalid date format' });
  }

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return res.status(400).json({ message: 'Invalid movieId format' });
  }

  try {
    const reservations = await Reservation.find({
      movie: movieId,
      date: { $eq: reservationDate }, // Use $eq to ensure equality
      startAt: startAt,
      isBooked: true,
    });

    // Get booked seats from reservations
    const bookedSeats = reservations.flatMap(reservation => reservation.seats);

    // Return booked seats
    res.status(200).json({ bookedSeats });
  } catch (error) {
    console.error('Error fetching booked seats:', error);
    res.status(500).json({ message: error.message });
  }
};

/**getReservationsByEmail*/
 exports.getReservationsByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const reservations = await Reservation.find({ email }).populate('movie theatre') ;
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservations", error });
  }
};
