const express = require('express');
const { addReservation, updateReservation, deleteReservation, getReservations, getReservation } = require('../controllers/reservation.js');
const router = express.Router();

router.post('/', addReservation);
router.put('/:id', updateReservation);
router.delete('/:id', deleteReservation);
router.get('/', getReservations);
router.get('/:id', getReservation);

module.exports = router;
