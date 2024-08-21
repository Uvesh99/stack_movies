const express = require('express');
const { addShowtime, updateShowtime, deleteShowtime, getShowtimes, getShowtime } = require('../controllers/showtime.js');
const router = express.Router();

router.post('/', addShowtime);
router.put('/:id', updateShowtime);
router.delete('/:id', deleteShowtime);
router.get('/', getShowtimes);
router.get('/:id', getShowtime);

module.exports = router;
