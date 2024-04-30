const attendanceModel = require('../model/attendance');

async function markAttendance (req, res) {
    const { studentID, attendanceDate, status } = req.body;
    try {
      const newAttendanceID = await attendanceModel.createAttendance(studentID, attendanceDate, status);
      res.status(201).json({ attendanceID: newAttendanceID, message: 'Attendance created successfully' });
    } catch (error) {
      console.error('Error creating attendance:', error);
      res.status(500).json({ error: 'Unable to create attendance' });
    }
  }


async function removeAttendance(req, res) {
    const attendanceID = req.params.attendanceID;
    try {
      const rowsAffected = await attendanceModel.deleteAttendance(attendanceID);
      if (rowsAffected > 0) {
        res.json({ message: 'Attendance deleted successfully' });
      } else {
        res.status(404).json({ error: 'Attendance not found' });
      }
    } catch (error) {
      console.error('Error deleting attendance:', error);
      res.status(500).json({ error: 'Unable to delete attendance' });
    }
  }

async function getAttendance (req, res) {
    const studentID = req.params.studentID;
    try {
      const attendanceRecords = await attendanceModel.getAttendanceByStudentID(studentID);
      res.json(attendanceRecords);
    } catch (error) {
      console.error('Error fetching attendance by StudentID:', error);
      res.status(500).json({ error: 'Unable to fetch attendance' });
    }
  }


  module.exports = {
        markAttendance,
        updateMark,
        removeAttendance,
        getAttendance
  }