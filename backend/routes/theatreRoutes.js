const express = require('express');
const { addTheatre, updateTheatre, deleteTheatre, getTheatres, getTheatre } = require('../controllers/theatre.js');
const router = express.Router();

router.post('/', addTheatre);
router.put('/:id', updateTheatre);
router.delete('/:id', deleteTheatre);
router.get('/', getTheatres);
router.get('/:id', getTheatre);

module.exports = router;
