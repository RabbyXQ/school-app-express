const express = require('express');
const eventsController = require('../controllers/eventsControllers');

const router = express.Router();

router.post('/events', eventsController.addEvent);
router.get('/events/:id', eventsController.getEventByID);
router.put('/events/:id', eventsController.updateEvent);
router.delete('/events/:id', eventsController.deleteEvent);
router.get('/events', eventsController.getAllEvents);

module.exports = router;
