const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 6,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin', 'SuperAdmin'],
    default: 'Admin'
  },
  phone: {
    type: String,
    required: true,
    minLength: 10,
    trim: true
  },
  addMovies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

adminSchema.pre('save', async function (next) {
  
  if (!this.isModified('password')) {
    return next();
  }
  
  // Validate phone number length
  if (this.phone.length !== 10) {
    return next(new Error('Invalid Phone Number.'));
  }

  // Validate password length
  if (this.password.length < 6) {
    return next(new Error('Password must be at least 6 characters long.'));
  }

  next();
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;

