const express = require('express');
const router = express.Router();
const controllers = require('../controllers/menuController');

// Routes for Menu Class
router.get('/classes', controllers.getAllClasses);
router.get('/classes/:id', controllers.getClassById);
router.post('/classes', controllers.createClass);
router.put('/classes/:id', controllers.updateClass);
router.delete('/classes/:id', controllers.deleteClass);

// Routes for Menu Section
router.get('/classes/:classId/sections', controllers.getSectionsByClassId);
router.post('/sections', controllers.createSection);
router.delete('/sections/:id', controllers.deleteSection);

// Route for All Sections Grouped by Type
router.get('/sections/grouped', controllers.getAllSectionsGroupedByType);

module.exports = router;
