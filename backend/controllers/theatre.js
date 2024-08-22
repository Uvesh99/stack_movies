// const Theatre = require('../models/Theatre');

// // Add a new theatre
// exports.addTheatre = async (req, res) => {
//   try {
//     const newTheatre = new Theatre(req.body);
//     const savedTheatre = await newTheatre.save();
//     res.status(201).json(savedTheatre);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Update an existing theatre
// exports.updateTheatre = async (req, res) => {
//   try {
//     const updatedTheatre = await Theatre.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.status(200).json(updatedTheatre);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete a theatre
// exports.deleteTheatre = async (req, res) => {
//   try {
//     await Theatre.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Theatre deleted successfully' });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get all theatres
// exports.getTheatres = async (req, res) => {
//   try {
//     const theatres = await Theatre.find();
//     res.status(200).json(theatres);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get a single theatre
// exports.getTheatre = async (req, res) => {
//   try {
//     const theatre = await Theatre.findById(req.params.id);
//     res.status(200).json(theatre);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


// const Theatre = require('../models/Theatre');
// const Movie = require('../models/Movie');
// const jwt = require('jsonwebtoken');

// // Add a new theatre
// exports.addTheatre = async (req, res) => {
//   // try {
//   //   const newTheatre = new Theatre(req.body);
//   //   const savedTheatre = await newTheatre.save();
//   //   res.status(201).json(savedTheatre);
//   // } catch (error) {
//   //   res.status(400).json({ message: error.message });
//   // }

//   const exToken = req.headers.authorization?.split(" ")[1];

//   if (!exToken || exToken.trim() === "") {
//     return res.status(400).json({ message: "Token Not Found" });
//   }

//   let adminId;

//   try {
//     const decrypted = await new Promise((resolve, reject) => {
//       jwt.verify(exToken, process.env.SECRET_KEY, (err, decoded) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(decoded);
//         }
//       });
//     });

//     adminId = decrypted.id;

//   } catch (err) {
//     return res.status(400).json({ message: `${err}` });
//   }

//   // Check if the admin already has a theater
//   const existingTheatre = await Theatre.findOne({ admin: adminId });
//   if (existingTheatre) {
//     return res.status(400).json({ message: "Admin can create only one theater" });
//   }

//   const { name, city, ticketPrice, seats, image } = req.body;

//   if (!name || !city || !ticketPrice || !seats || !image) {
//     return res.status(400).json({ message: "Please provide all required fields" });
//   }

//   try {
//     const newTheatre = new Theatre({
//       name,
//       city,
//       ticketPrice,
//       seats,
//       image,
//       admin: adminId, 
//     });

//     const savedTheatre = await newTheatre.save();
//     res.status(201).json(savedTheatre);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Update an existing theatre
// exports.updateTheatre = async (req, res) => {
//   try {
//     const updatedTheatre = await Theatre.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.status(200).json(updatedTheatre);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete a theatre
// exports.deleteTheatre = async (req, res) => {
//   try {
//     await Theatre.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Theatre deleted successfully' });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get all theatres
// exports.getTheatres = async (req, res) => {
//   try {
//     const theatres = await Theatre.find();
//     res.status(200).json(theatres);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get a single theatre
// exports.getTheatre = async (req, res) => {
//   try {
//     const theatre = await Theatre.findById(req.params.id);
//     res.status(200).json(theatre);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// exports.getMoviesBytheaterId = async (req, res) => {
//   try {
//     const { theatreId } = req.params; 
//     const movies = await Movie.find({ theater: theatreId }); 
//     if (movies.length === 0) {
//       return res.status(404).json({ message: 'No movies found for this theatre' });
//     }
//     res.status(200).json(movies); 
//   } catch (err) {
//     res.status(500).json({ message: err.message }); 
//   }
// };

const Theatre = require('../models/Theatre');
const Movie = require('../models/Movie');
const jwt = require('jsonwebtoken');

// Add a new theatre
exports.addTheatre = async (req, res) => {
  // try {
  //   const newTheatre = new Theatre(req.body);
  //   const savedTheatre = await newTheatre.save();
  //   res.status(201).json(savedTheatre);
  // } catch (error) {
  //   res.status(400).json({ message: error.message });
  // }

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

  // Check if the admin already has a theater
  const existingTheatre = await Theatre.findOne({ admin: adminId });
  if (existingTheatre) {
    return res.status(400).json({ message: "Admin can create only one theater" });
  }

  const { name, city, ticketPrice, seats, image } = req.body;

  if (!name || !city || !ticketPrice || !seats || !image) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    const newTheatre = new Theatre({
      name,
      city,
      ticketPrice,
      seats,
      image,
      admin: adminId, 
    });

    const savedTheatre = await newTheatre.save();
    res.status(201).json(savedTheatre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing theatre
exports.updateTheatre = async (req, res) => {

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

  const { id } = req.params;
  const theatre = await Theatre.findById(id);
  if (!theatre) {
    return res.status(404).json({ message: "Theatre not found" });
  }

  if (theatre.admin.toString() !== adminId) {
    return res.status(403).json({ message: "You are not authorized to update this theater" });
  }

  try {
    const updatedTheatre = await Theatre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTheatre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a theatre
exports.deleteTheatre = async (req, res) => {

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

  const { id } = req.params;
  const theatre = await Theatre.findById(id);
  if (!theatre) {
    return res.status(404).json({ message: "Theatre not found" });
  }

  if (theatre.admin.toString() !== adminId) {
    return res.status(403).json({ message: "You are not authorized to delete this theater" });
  }
  
  try {
    await Theatre.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Theatre deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all theatres
exports.getTheatres = async (req, res) => {
  try {
    const theatres = await Theatre.find();
    res.status(200).json(theatres);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single theatre
exports.getTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.findById(req.params.id);
    res.status(200).json(theatre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMoviesBytheaterId = async (req, res) => {
  try {
    const { theatreId } = req.params; 
    const movies = await Movie.find({ theater: theatreId }); 
    if (movies.length === 0) {
      return res.status(404).json({ message: 'No movies found for this theatre' });
    }
    res.status(200).json(movies); 
  } catch (err) {
    res.status(500).json({ message: err.message }); 
  }
};