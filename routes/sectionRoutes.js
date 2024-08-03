const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/sectionController');

// Routes for section management
router.post('/sections', sectionController.createSection); // Create a new section
router.get('/sections', sectionController.getSections); // Get all sections
router.get('/sections/:id', sectionController.getSection); // Get a specific section by ID
router.delete('/sections/:id', sectionController.deleteSection); // Delete a section by ID
router.put('/sections/:id', sectionController.updateSection); // Update a section by ID

module.exports = router;
