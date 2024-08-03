const express = require('express');
const router = express.Router();
const classController = require('../controllers/classControllers');
const { requireLogin } = require('../middlewares/authMiddleware');

router.post('/classes', classController.createClass);
router.delete('/classes/:id', classController.deleteClass);
router.put('/classes/:id', classController.updateClass);
router.get('/classes/:id', classController.getClass); 
router.get('/classes', classController.getClasses); 

module.exports = router;
