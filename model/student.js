const pool = require('../config/db')

// Create Student


async function createStudent(studentID, firstName, lastName, dateOfBirth, gender, classID, photo, session) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        'INSERT INTO Students (StudentID, FirstName, LastName, DateOfBirth, Gender, ClassID, Photo, Session) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [studentID, firstName, lastName, dateOfBirth, gender, classID, photo, session]
      );
      connection.release();
      return result.insertId;
    } catch (error) {
      console.error('Error creating Student:', error);
      connection.release();
      throw error;
    }
}

// Update Student
async function updateStudent(studentID, firstName, lastName, dateOfBirth, gender, classID, photo, session) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        'UPDATE Students SET FirstName=?, LastName=?, DateOfBirth=?, Gender=?, ClassID=?, Photo=?, Session=? WHERE StudentID=?',
        [firstName, lastName, dateOfBirth, gender, classID, photo, session, studentID]
      );
      connection.release();
      return result.affectedRows;
    } catch (error) {
      console.error('Error updating Student:', error);
      connection.release();
      throw error;
    }
}

// Get Students by Session and Class ID
async function getStudentsBySessionAndClass(session, classID) {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(
            'SELECT * FROM Students WHERE Session = ? AND ClassID = ?',
            [session, classID]
        );
        connection.release();
        return rows;
    } catch (error) {
        console.error('Error getting Students by Session and Class ID:', error);
        connection.release();
        throw error;
    }
}


// Get Student by StudentID
async function getStudentByStudentID(studentID) {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(
            'SELECT * FROM Students WHERE StudentID = ?',
            [studentID]
        );
        connection.release();
        return rows.length ? rows[0] : null; // Return the first row if found, otherwise null
    } catch (error) {
        console.error('Error getting Student by StudentID:', error);
        connection.release();
        throw error;
    }
}

// Delete Student by StudentID
async function deleteStudentByStudentID(studentID) {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query(
            'DELETE FROM Students WHERE StudentID = ?',
            [studentID]
        );
        connection.release();
        return result.affectedRows; // Number of affected rows (should be 1 for successful delete)
    } catch (error) {
        console.error('Error deleting Student by StudentID:', error);
        connection.release();
        throw error;
    }
}


async function getFilteredStudents(){

}

module.exports = {
    getStudentsBySession,
    createStudent,
    updateStudent,
    getStudentByStudentID,
    deleteStudentByStudentID,
    getFilteredStudents
};
