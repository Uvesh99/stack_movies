const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");


const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 
  
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }
   
  let adminId;
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const admin = await Admin.findById(decoded.id);
    
    if (!admin) {
      return res.status(403).json({ message: "Access denied. User not found." });
    }
    
    adminId = decoded.id;
    req.admin = admin; 
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = verifyAdmin;
