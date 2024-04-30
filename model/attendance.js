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

async function getAttendanceBetweenDates(studentID, startDate, endDate) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      'SELECT * FROM Attendance WHERE StudentID=? AND AttendanceDate BETWEEN ? AND ?',
      [studentID, startDate, endDate]
    );
    connection.release();
    return rows;
  } catch (error) {
    console.error('Error fetching attendance between dates:', error);
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

async function getAttendanceBetweenDatesByClass(classID, startDate, endDate) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      `SELECT a.*
       FROM Attendance a
       INNER JOIN Students s ON a.StudentID = s.StudentID
       WHERE s.ClassID=? AND a.AttendanceDate BETWEEN ? AND ?`,
      [classID, startDate, endDate]
    );
    connection.release();
    return rows;
  } catch (error) {
    console.error('Error fetching attendance between dates by class:', error);
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
  getAttendanceBetweenDatesByClass
};
