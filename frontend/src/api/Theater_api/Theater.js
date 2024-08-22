
import axios from "axios";

const API_URL = 'http://localhost:5000/api/theatres';

const token = localStorage.getItem('token'); 

  export const getAllTheatres = async () => {
    const res = await axios.get(API_URL);
    return res.data;
  };
  
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

  
  export const getMoviesByTheatre = async (theatreId) => {
    const res = await axios.get(`${API_URL}/${theatreId}/movies`); 
    return res.data;
  };

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