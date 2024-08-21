const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  ticketPrice: { type: Number, required: true },
  seats: { type: Array, required: true },
  image: { type: String, required: true },
});

const Theatre = mongoose.model('Theatre', theatreSchema);

module.exports = Theatre;
