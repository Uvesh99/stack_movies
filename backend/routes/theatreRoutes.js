const express = require('express');
const { addTheatre, updateTheatre, deleteTheatre, getTheatres, getTheatre, getMoviesBytheaterId, getAdminTheatre } = require('../controllers/theatre.js');
const router = express.Router();

router.post('/', addTheatre);
router.put('/:id', updateTheatre);
router.delete('/:id', deleteTheatre);
router.get('/', getTheatres);
router.get('/:id', getTheatre);
router.get('/:theatreId/movies', getMoviesBytheaterId);
router.get('/admin/:id',getAdminTheatre);
module.exports = router;
