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
const schoolInfoRoutes = require('./routes/schoolInfoRoutes');
const menuRoutes = require("./routes/menuRoutes");
const cors = require('cors');

const app = express();
const port = 4000;

app.use(sessionMiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // Allow all origins by default

// Optionally, configure CORS options
// const corsOptions = {
//   origin: 'http://localhost:3000', // Replace with your frontend origin
// };

// Define your routes
app.use('/users', userRoutes);
app.use('/attendance', requireLogin, attendanceRoutes);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(schoolInfoRoutes);
app.use(dashboardRoutes);
app.use('/menus', menuRoutes);

app.get('/', (req, res) => {
  res.send('Visit, bhbss.com');
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
