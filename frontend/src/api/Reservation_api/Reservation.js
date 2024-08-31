import axios from 'axios';

export const fetchBookedSeats = async (movieId, Date, Time) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/reservations/booked/book?movieId=${movieId}&date=${Date}&startAt=${Time}`);
    return response.data.bookedSeats;
  } catch (error) {
    console.error('Error fetching booked seats:', error);
    return [];
  }
};

export const saveReservation = async (reservationData) => {
    try {
      const response = await axios.post("http://localhost:5000/api/reservations", reservationData);
      return response.data;
    } catch (error) {
      console.error('Error saving reservation:', error);
      throw error;
    }
  };
  
  export const sendOTP = async (email) => {
    return await axios.post('http://localhost:5000/api/reservations/sendotp', { email });
  };
  
  export const verifyOTP = async (email, otp) => {
    return await axios.post('http://localhost:5000/api/reservations/verify', { email, otp });
  };