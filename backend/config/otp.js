const crypto = require('crypto');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const OTP_STORE = {}; 
dotenv.config();

function generateOTP(){
  return crypto.randomInt(100000, 999999).toString();
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, 
  secure: true, 
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.PASSWORD, 
  },
  tls: {
    rejectUnauthorized: false,
  },
});


exports.sendOTP = async (email) => {
  const otp = generateOTP();
  OTP_STORE[email] = otp;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP for Movie Booking',
    text: `Your OTP for movie booking is: ${otp}. This OTP is valid for 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully to', email);
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }

  setTimeout(() => {
    delete OTP_STORE[email];
  }, 10 * 60 * 1000); 
}

exports.verifyOTP = (email, otp) => {
  if (OTP_STORE[email] && OTP_STORE[email] === otp) {
    delete OTP_STORE[email];
    return true;
  }
  return false;
}