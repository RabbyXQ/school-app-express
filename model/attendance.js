const pool = require('../config/db');


async function createAttendance(studentID, attendanceDate, status) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      'INSERT INTO Attendance (StudentID, AttendanceDate, Status) VALUES (?, ?, ?)',
      [studentID, attendanceDate, status]
    );
    connection.release();
    return result.insertId; 
  } catch (error) {
    console.error('Error creating attendance:', error);
    connection.release();
    throw error; 
  }
}


async function updateAttendance(attendanceID, studentID, attendanceDate, status) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      'UPDATE Attendance SET StudentID=?, AttendanceDate=?, Status=? WHERE AttendanceID=?',
      [studentID, attendanceDate, status, attendanceID]
    );
    connection.release();
    return result.affectedRows; 
  } catch (error) {
    console.error('Error updating attendance:', error);
    connection.release();
    throw error; 
  }
}


async function deleteAttendance(attendanceID) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      'DELETE FROM Attendance WHERE AttendanceID=?',
      [attendanceID]
    );
    connection.release();
    return result.affectedRows; 
  } catch (error) {
    console.error('Error deleting attendance:', error);
    connection.release();
    throw error; 
  }
}


async function getAttendanceByStudentID(studentID) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      'SELECT * FROM Attendance WHERE StudentID=?',
      [studentID]
    );
    connection.release();
    return rows; 
  } catch (error) {
    console.error('Error fetching attendance by StudentID:', error);
    connection.release();
    throw error; 
  }
}

async function getAttendancesByStudentID(studentID) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      'SELECT * FROM Attendance WHERE StudentID=?',
      [studentID]
    );
    connection.release();
    return rows;
  } catch (error) {
    console.error('Error fetching attendances by StudentID:', error);
    connection.release();
    throw error; 
  }
}


async function getAttendanceByDateStudentID(attendanceDate, studentID) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      'SELECT * FROM Attendance WHERE AttendanceDate=? AND StudentID=?',
      [attendanceDate, studentID]
    );
    connection.release();
    return rows; 
  } catch (error) {
    console.error('Error fetching attendance by Date and StudentID:', error);
    connection.release();
    throw error; 
  }
}

module.exports = {
  createAttendance,
  updateAttendance,
  deleteAttendance,
  getAttendanceByStudentID,
  getAttendancesByStudentID,
  getAttendanceByDateStudentID,
};
