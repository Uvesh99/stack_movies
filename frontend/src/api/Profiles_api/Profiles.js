import axios from 'axios';

// Admin Profile
export const getAdminData = async (adminId) => {    // Admin Information
  try {
    const response = await axios.get(`http://localhost:5000/api/admin/profile/${adminId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



// Get Reservation Information By User's Email
export const getReservations = async (email) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/reservations/email/${email}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Get Movie By Reservation Information
export const getMovie = async (movieId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/movies/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie:", error);
    throw error;
  }
};