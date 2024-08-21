const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const reservationSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  startAt: { type: String, required: true },
  seats: { type: Array, required: true },
  orderID: { type: String, required: true, unique: true },
  ticketPrice: { type: mongoose.Schema.Types.ObjectId, ref: 'Theatre', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  theatre: { type: mongoose.Schema.Types.ObjectId, ref: 'Theatre', required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
});

reservationSchema.pre('save', function(next) {
  if (!this.orderID) {
    this.orderID = uuidv4();
  }
  next();
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
