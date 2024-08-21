const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  admin: { type: mongoose.Types.ObjectId, ref: "Admin", required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  language: { type: String, required: true },
  genre: { type: String, required: true },
  director: { type: String, required: true },
  trailer: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
