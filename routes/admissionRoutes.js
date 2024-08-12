const express = require('express');
const router = express.Router();
const admissionsController = require('../controllers/admissionController');

// Route to get all admissions with optional search and pagination
router.get('/admissions', admissionsController.handleGetAllAdmissions);

// Route to add a new admission
router.post('/admissions', admissionsController.handleAddAdmission);

// Route to update an existing admission by ID
router.put('/admissions/:id', admissionsController.handleUpdateAdmission);

// Route to delete an admission by ID
router.delete('/admissions/:id', admissionsController.handleDeleteAdmission);

// Route to get a single admission by ID
router.get('/admissions/:id', admissionsController.handleGetAdmission);

// Route to get a single admission by BRID

module.exports = router;
