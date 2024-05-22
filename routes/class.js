const express = require('express');
const router = express.Router();
const classController = require('../controllers/class');
const { requireLogin } = require('../middlewares/authMiddleware');

router.post('/create', requireLogin, classController.createClass);
router.delete('/delete', requireLogin, classController.deleteClass);
router.put('/update', requireLogin, classController.updateClass);
router.get('/class/:classID', classController.getClass); 
router.get('/classes', classController.getClasses); 

module.exports = router;
