// const express = require('express');
// const { addReservation, updateReservation, deleteReservation, getReservations, getReservation, getBookedSeats, getReservationsByEmail } = require('../controllers/reservation.js');
// const router = express.Router();

// router.post('/', addReservation);
// router.put('/:id', updateReservation);
// router.delete('/:id', deleteReservation);
// router.get('/', getReservations);
// router.get('/:id', getReservation);
// router.get('/booked/book', getBookedSeats);
// router.get('/email/:email', getReservationsByEmail);
// module.exports = router;

const express = require('express');
const { addReservation, updateReservation, deleteReservation, getReservations, getReservation, getBookedSeats, getReservationsByEmail, verifyOTPs, requestOTP } = require('../controllers/reservation.js');
const router = express.Router();

router.post('/sendotp',requestOTP);
router.post('/verify',verifyOTPs);
router.post('/', addReservation);
router.put('/:id', updateReservation);
router.delete('/:id', deleteReservation);
router.get('/', getReservations);
router.get('/:id', getReservation);
router.get('/email/:email', getReservationsByEmail);
router.get('/booked/book', getBookedSeats);

module.exports = router;