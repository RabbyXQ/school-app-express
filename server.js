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
const pageRoutes = require("./routes/pageRoutes");
const noticesRoutes = require("./routes/noticeRoutes");
const newsRoutes = require("./routes/newsRoutes");
const eventRoutes = require("./routes/eventRoutes");
const patronRoutes = require("./routes/patronRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const classesRoutes = require("./routes/classRoutes");
const syllabusRoutes = require("./routes/syllabusRoutes");
const routineRoutes = require("./routes/routineRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const sectionRoutes = require("./routes/sectionRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const cors = require('cors');
const https = require('https');
const app = express();
const port = 4000;

const privateKey = fs.readFileSync(path.join(__dirname, 'certs', 'privatekey.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'certs', 'certificate.pem'), 'utf8');
const credentials = { key: privateKey, cert: certificate };



app.use(sessionMiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); 


app.use('/users', userRoutes);
app.use('/attendance', requireLogin, attendanceRoutes);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(schoolInfoRoutes);
app.use(dashboardRoutes);
app.use('/menus', menuRoutes);
app.use('/pages', pageRoutes);


app.use(newsRoutes);
app.use(eventRoutes);
app.use(patronRoutes);
app.use(galleryRoutes)
app.use(noticesRoutes);
app.use(classesRoutes);
app.use(syllabusRoutes);
app.use(routineRoutes);
app.use(employeeRoutes);
app.use(sectionRoutes);
app.use(sectionRoutes);
app.use(subjectRoutes);



app.get('/', (req, res) => {
  res.send('Visit, bhbss.com');
});




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});




// app.get('/', (req, res) => {
//   res.send('Hello HTTPS!');
// });

// // Create HTTPS server
// const httpsServer = https.createServer(credentials, app);

// // Start server
// httpsServer.listen(443, () => {
//   console.log('HTTPS server running on port 443');
// });