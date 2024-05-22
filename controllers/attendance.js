const attendanceModel = require('../model/attendance');

async function markAttendance(req, res) {
  const { studentID, attendanceDate, status, classID, subjectID} = req.body;
  try {
    const newAttendanceID = await attendanceModel.createAttendance(classID, subjectID, studentID, attendanceDate, status);
    res.status(201).json({ attendanceID: newAttendanceID, message: 'Attendance created successfully' });
  } catch (error) {
    console.error('Error creating attendance:', error);
    res.status(500).json({ error: 'Unable to create attendance' });
  }
}

async function updateAttendance(req, res) {
  const {attendanceID, classID, subjectID, studentID, attendanceDate, status} = req.body;
  try {
    const rowsAffected = await attendanceModel.updateAttendance(attendanceID, classID, subjectID, studentID, attendanceDate, status);
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

async function getAttendance(req, res) {
  const { studentID, startDate, endingDate, status, classID, subjectID } = req.body;
  try {
    const attendanceRecords = await attendanceModel.getFilteredAttendance(studentID, startDate, endingDate, classID, subjectID, status);
    res.json(attendanceRecords);
  } catch (error) {
    console.error('Error fetching attendance by StudentID:', error);
    res.status(500).json({ error: 'Unable to fetch attendance' });
  }
}



module.exports = {
  markAttendance,
  updateAttendance,
  getAttendance
};
