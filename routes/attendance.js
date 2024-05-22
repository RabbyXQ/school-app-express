const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance');

router.post('/mark', attendanceController.markAttendance);
router.delete('/unmark', attendanceController.removeAttendance);
router.get('/get', attendanceController.getAttendance);


module.exports = router;