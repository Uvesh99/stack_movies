import axios from "axios";

const API_URL = 'http://localhost:5000/api/theatres';

const token = localStorage.getItem('token'); 

// Get All Theaers
  export const getAllTheatres = async () => {
    const res = await axios.get(API_URL);
    return res.data;
  };
  
// Move To Particular  Theater  
  export const getTheatreById = async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  };
  
// Add Thater (By Only Admin)  
  export const addTheatre = async (theatreData) => {
    const formData = new FormData();
    Object.keys(theatreData).forEach(key => formData.append(key, theatreData[key]));
    
    const res = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}` 
      },
    });
    return res.data;
  };

  // Update Thater (By Only Theater Owner)
  export const updateTheatre = async (id, theatreData) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };
    const res = await axios.put(`${API_URL}/${id}`, theatreData, config);
    return res.data;
  };
  
  // Delete Theater (By Only Theater Owner)
  export const deleteTheatre = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting theatre:', error.response.data);
      throw error;
    }
  
  };

  // Show Movies That Are Running In Theater
  export const getMoviesByTheatre = async (theatreId) => {
    const res = await axios.get(`${API_URL}/${theatreId}/movies`); 
    return res.data;
  };

  // Update Movie (By Only Theater Owner)
  export const updateMovie = async (id, movieData) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };
    const res = await axios.put(`http://localhost:5000/api/movies/${id}`, movieData, config);
    return res.data;
  };

  // Delete Movie (By Only Theater Owner)
  export const deleteMovie = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/movies/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting theatre:', error.response.data);
      throw error;
    }
  
  };

  // Get Admin's Theater
  export const getTheaterData = async (adminId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/theatres/admin/${adminId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching theater data:', error);
      if (error.response && error.response.status === 404) {
        console.warn('Theater endpoint not found. Verify the URL and server configuration.');
      }
      throw error;
    }
  };