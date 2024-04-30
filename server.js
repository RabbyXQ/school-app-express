const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const pool = require('./config/db');
const sessionMiddleware = require('./middlewares/sessionMiddleware');
const dashboardRoutes = require('./routes/dashboard');
const router = express.Router();


const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(sessionMiddleware);

app.use('/users', userRoutes);
app.use(dashboardRoutes);



// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});