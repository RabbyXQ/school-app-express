const express = require('express');
const router = express.Router();
const routinesController = require('../controllers/routineControllers');

// Route to add a new routine
router.post('/routines', routinesController.addRoutine);

// Route to get a routine by ID
router.get('/routines/:id', routinesController.getRoutineByID);

// Route to update a routine by ID
router.put('/routines/:id', routinesController.updateRoutine);

// Route to delete a routine by ID
router.delete('/routines/:id', routinesController.deleteRoutine);

// Route to get all routines with pagination
router.get('/routines', routinesController.getAllRoutines);

module.exports = router;
