const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    name: { type: String, require: true},
    email: { type: String, require: true},
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    price: { type: Number, require: true },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports= Payment;

