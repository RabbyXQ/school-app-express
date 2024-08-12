const express = require('express');
const router = express.Router();
const {
  handleUploadFile,
  handleAddStudent,
  handleUpdateStudent,
  handleDeleteStudent,
  handleGetStudent,
  handleGetAllStudents
} = require('../controllers/studentController');

// Route for handling file uploads
router.post('/upload', handleUploadFile);

// Route for adding a new student
router.post('/students', handleAddStudent);

// Route for updating an existing student
router.put('/students/:id', handleUpdateStudent);

// Route for deleting a student
router.delete('/students/:id', handleDeleteStudent);

// Route for getting a student by ID
router.get('/students/:id', handleGetStudent);

// Route for getting all students with optional search and pagination
router.get('/students', handleGetAllStudents);

module.exports = router;
