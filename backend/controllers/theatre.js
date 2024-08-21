const Theatre = require('../models/Theatre');

// Add a new theatre
exports.addTheatre = async (req, res) => {
  try {
    const newTheatre = new Theatre(req.body);
    const savedTheatre = await newTheatre.save();
    res.status(201).json(savedTheatre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing theatre
exports.updateTheatre = async (req, res) => {
  try {
    const updatedTheatre = await Theatre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTheatre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a theatre
exports.deleteTheatre = async (req, res) => {
  try {
    await Theatre.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Theatre deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all theatres
exports.getTheatres = async (req, res) => {
  try {
    const theatres = await Theatre.find();
    res.status(200).json(theatres);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single theatre
exports.getTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.findById(req.params.id);
    res.status(200).json(theatre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
