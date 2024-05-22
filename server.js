const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const userRoutes = require('./routes/user');
const pool = require('./config/db');
const sessionMiddleware = require('./middlewares/sessionMiddleware');
const {requireLogin} = require('./middlewares/authMiddleware');
const dashboardRoutes = require('./routes/dashboard');
const attendanceRoutes = require('./routes/attendance');



const app = express();
const port = 3000;

app.use(sessionMiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define your routes
app.use('/users', userRoutes);
app.use('/attendance', requireLogin, attendanceRoutes);
app.use(dashboardRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
