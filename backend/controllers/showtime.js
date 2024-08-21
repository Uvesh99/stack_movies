const Showtime = require('../models/Showtime');

// Add a new showtime
exports.addShowtime = async (req, res) => {
  try {
    const newShowtime = new Showtime(req.body);
    const savedShowtime = await newShowtime.save();
    res.status(201).json(savedShowtime);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing showtime
exports.updateShowtime = async (req, res) => {
  try {
    const updatedShowtime = await Showtime.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedShowtime);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a showtime
exports.deleteShowtime = async (req, res) => {
  try {
    await Showtime.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Showtime deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all showtimes
exports.getShowtimes = async (req, res) => {
  try {
    const showtimes = await Showtime.find().populate('movie theatre');
    res.status(200).json(showtimes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single showtime
exports.getShowtime = async (req, res) => {
  try {
    const showtime = await Showtime.findById(req.params.id).populate('movie theatre');
    res.status(200).json(showtime);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
