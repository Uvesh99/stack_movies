const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
  ticketPrice: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  theatre: { type: mongoose.Schema.Types.ObjectId, ref: 'Theatre', required: true },
});

const Showtime = mongoose.model('Showtime', showtimeSchema);

module.exports = Showtime;
