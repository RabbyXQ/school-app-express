const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance');

router.post('/mark', attendanceController.markAttendance);
router.delete('/remove/:attendanceID', attendanceController.removeAttendance);
router.get('/get/:attendanceID', attendanceController.getAttendance);