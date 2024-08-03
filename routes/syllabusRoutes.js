const express = require('express');
const router = express.Router();
const syllabusController = require('../controllers/syllabusController');

// Route to create a new syllabus
router.post('/syllabus', syllabusController.addSyllabus);

// Route to get a syllabus by ID
router.get('/syllabus/:id', syllabusController.getSyllabusByID);

// Route to update a syllabus by ID
router.put('/syllabus/:id', syllabusController.updateSyllabus);

// Route to delete a syllabus by ID
router.delete('/syllabus/:id', syllabusController.deleteSyllabus);

// Route to get all syllabi with pagination
router.get('/syllabi', syllabusController.getAllSyllabi);

module.exports = router;
