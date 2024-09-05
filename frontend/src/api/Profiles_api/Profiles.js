import axios from 'axios';

// Admin Profile
export const getAdminData = async (adminId) => {    // Admin Information
  try {
    const response = await axios.get(`https://stack-movies4-20.onrender.com/api/admin/profile/${adminId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//get UserData
export const getUserData= async (userId)=>{
  try{
    const response =await axios.get(`http://localhost:5000/api/users/profile/${userId}`);
    return response.data;
  }
  catch(error){
    console.error(error);
    throw error;
  }
}

// Get Reservation Information By User's Email
export const getReservations = async (email) => {
  try {
    const response = await axios.get(`https://stack-movies4-20.onrender.com/api/reservations/email/${email}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Get Movie By Reservation Information
export const getMovie = async (movieId) => {
  try {
    const response = await axios.get(`https://stack-movies4-20.onrender.com/api/movies/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie:", error);
    throw error;
  }
};

export const updateUserProfile = async (userId, editData) => {
  try {
    const res = await axios.put(`http://localhost:5000/api/users/${userId}`, editData);
    return res.data;
  } catch (err) {
    console.error('Error updating profile:', err.message);
    throw err;
  }
};

