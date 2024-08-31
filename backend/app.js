const express = require('express');
const cors = require('cors');/*cors*/ 
const connectDB = require('./config/db.js');
const movieRoutes = require('./routes/movieRoutes.js');
const theatreRoutes = require('./routes/theatreRoutes.js');
const showtimeRoutes = require('./routes/showtimeRoutes.js');
const reservationRoutes = require('./routes/reservationRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const addminRoutes = require("./routes/adminRoutes.js");
const paymentRoutes=require("./routes/paymentRoutes.js")
const app = express();
connectDB();
app.use(cors());/*cors*/ 
app.use(express.json());

app.use('/api/movies', movieRoutes);
app.use('/api/theatres', theatreRoutes);
app.use('/api/showtimes', showtimeRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/users', userRoutes);
app.use("/api/admin",addminRoutes);
app.use("/api/payment",paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
