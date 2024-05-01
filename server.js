const express = require('express');
const bodyParser = require('body-parser');
const multer  = require('multer');
const path = require('path');
const userRoutes = require('./routes/user');
const pool = require('./config/db');
const sessionMiddleware = require('./middlewares/sessionMiddleware');
const dashboardRoutes = require('./routes/dashboard');



const app = express();
const port = 3000;

app.use(sessionMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use(dashboardRoutes);


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Files will be saved in the 'uploads/' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // Use the original file name as the file name
  }
});
const upload = multer({ storage });

// Serve static files from the 'uploads/' directory
app.use(express.static(path.join(__dirname, 'uploads')));

// Route to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.status(200).send('File uploaded successfully: ' + req.file.filename);
});




// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});