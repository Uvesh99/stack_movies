const express = require('express');
const { addMovie, updateMovie, deleteMovie, getMovies, getMovie } = require('../controllers/movie.js');
const verifyAdmin = require("../middlewares/authAdminMiddleware.js");
const router = express.Router();

router.post('/', addMovie);
router.put('/:id', verifyAdmin, updateMovie);
router.delete('/:id', verifyAdmin, deleteMovie);
router.get('/',getMovies);
router.get('/:id',getMovie);

module.exports = router;
