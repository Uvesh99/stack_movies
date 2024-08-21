const Movie = require('../models/Movie');
const jwt = require("jsonwebtoken");

// Add a new movie
exports.addMovie = async (req, res) => {
  const exToken = req.headers.authorization?.split(" ")[1];

  if (!exToken || exToken.trim() === "") {
    return res.status(400).json({ message: "Token Not Found" });
  }

  let adminId;

  try {
    const decrypted = await new Promise((resolve, reject) => {
      jwt.verify(exToken, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });

    adminId = decrypted.id;

  } catch (err) {
    return res.status(400).json({ message: `${err}` });
  }

  const { title, description, language, genre, director, image, duration, startDate, endDate, trailer } = req.body;

  const isValidString = (value) => typeof value === 'string' && value.trim() !== '';
  const isValidNumber = (value) => typeof value === 'number' && !isNaN(value);


  const parseDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) ? date : null;
  };

  if (!isValidString(title) || !isValidString(description) || !isValidString(language) || !isValidString(genre) || !isValidString(director) || !isValidString(image) || !isValidString(trailer) || !isValidNumber(duration) || !parseDate(startDate) || !parseDate(endDate)) {
    return res.status(400).json({ message: "Invalid Inputs" });
  }

  let movie;

  try {
    movie = new Movie({
      title,
      description,
      language,
      genre,
      director,
      image,
      duration,
      startDate,
      endDate,
      trailer,
      admin: adminId,
    });

    movie = await movie.save();  

    res.status(201).json(movie);  

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update an existing movie
exports.updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a movie
exports.deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all movies
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single movie
exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
