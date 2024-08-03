const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectControllers');

// Route to create a new subject
router.post('/subjects', subjectController.createSubject);

// Route to get a single subject by ID
router.get('/subjects/:id', subjectController.getSubject);

// Route to get all subjects
router.get('/subjects', subjectController.getSubjects);

// Route to delete a subject by ID
router.delete('/subjects/:id', subjectController.deleteSubject);

// Route to update a subject by ID
router.put('/subjects/:id', subjectController.updateSubject);

module.exports = router;
