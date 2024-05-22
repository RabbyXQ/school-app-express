const pool = require('../config/db');

async function createAttendance(classID, subjectID, studentID, attendanceDate, status) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      'INSERT INTO Attendance (ClassID, SubjectID, StudentID, AttendanceDate, Status) VALUES (?, ?, ?, ?, ?)',
      [classID, subjectID, studentID, attendanceDate, status]
    );
    connection.release();
    return result.insertId; 
  } catch (error) {
    console.error('Error creating attendance:', error);
    connection.release();
    throw error; 
  }
}


async function updateAttendance(attendanceID, classID, subjectID, studentID, attendanceDate, status) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      'UPDATE Attendance SET ClassID=?, SubjectID=?, StudentID=?, AttendanceDate=?, Status=? WHERE AttendanceID=?',
      [classID, subjectID, studentID, attendanceDate, status, attendanceID]
    );
    connection.release();
    return result.affectedRows; 
  } catch (error) {
    console.error('Error updating attendance:', error);
    connection.release();
    throw error; 
  }
}



async function getAttendanceByStudentID(studentID, startDate, endDate) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      'SELECT * FROM Attendance WHERE StudentID=? AND AttendanceDate BETWEEN ? AND ?',
      [studentID, startDate, endDate]
    );
    connection.release();
    return rows; 
  } catch (error) {
    console.error('Error fetching attendance by StudentID:', error);
    connection.release();
    throw error; 
  }
}


async function getFilteredAttendance(studentID, startDate, endDate, classID, subjectID, status) {
  const connection = await pool.getConnection();
  let query = 'SELECT * FROM Attendance WHERE StudentID=?';
  const queryParams = [studentID];

  if (startDate && endDate) {
    query += ' AND AttendanceDate BETWEEN ? AND ?';
    queryParams.push(startDate, endDate);
  }
  if (classID) {
    query += ' AND ClassID=?';
    queryParams.push(classID);
  }
  if (subjectID) {
    query += ' AND SubjectID=?';
    queryParams.push(subjectID);
  }
  if (status) {
    query += ' AND Status=?';
    queryParams.push(status);
  }

  try {
    const [rows] = await connection.query(query, queryParams);
    connection.release();
    return rows; 
  } catch (error) {
    console.error('Error fetching filtered attendance:', error);
    connection.release();
    throw error; 
  }
}

module.exports = {
  createAttendance,
  deleteAttendance,
  getAttendanceByStudentID,
  getFilteredAttendance,
  updateAttendance
};
