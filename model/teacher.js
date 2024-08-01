const pool = require('../config/db');

async function createTeacher(firstName, lastName, dateOfBirth, gender, subjectTaught, classID, photo, active, retired) {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query(
            'INSERT INTO Teachers (FirstName, LastName, DateOfBirth, Gender, SubjectTaught, ClassID, Photo, Active, Retired) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [firstName, lastName, dateOfBirth, gender, subjectTaught, classID, photo, active, retired]
        );
        connection.release();
        return result.insertId;
    } catch (error) {
        console.error('Error creating Teacher:', error);
        connection.release();
        throw error;
    }
}

async function getTeacherByID(teacherID) {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(
            'SELECT * FROM Teachers WHERE TeacherID = ?',
            [teacherID]
        );
        connection.release();
        return rows.length ? rows[0] : null;
    } catch (error) {
        console.error('Error getting Teacher by ID:', error);
        connection.release();
        throw error;
    }
}

async function updateTeacher(teacherID, firstName, lastName, dateOfBirth, gender, subjectTaught, classID, photo, active, retired) {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query(
            'UPDATE Teachers SET FirstName=?, LastName=?, DateOfBirth=?, Gender=?, SubjectTaught=?, ClassID=?, Photo=?, Active=?, Retired=? WHERE TeacherID=?',
            [firstName, lastName, dateOfBirth, gender, subjectTaught, classID, photo, active, retired, teacherID]
        );
        connection.release();
        return result.affectedRows;
    } catch (error) {
        console.error('Error updating Teacher:', error);
        connection.release();
        throw error;
    }
}

// Get Active Teachers
async function getActiveTeachers() {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(
            'SELECT * FROM Teachers WHERE Active = ?',
            [true] // Assuming true represents active status in your database
        );
        connection.release();
        return rows;
    } catch (error) {
        console.error('Error getting Active Teachers:', error);
        connection.release();
        throw error;
    }
}

// Get Active Teachers Not Retired
async function getActiveTeachersNotRetired() {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(
            'SELECT * FROM Teachers WHERE Active = ? AND Retired = ?',
            [true, false] // Assuming true represents active and false represents not retired
        );
        connection.release();
        return rows;
    } catch (error) {
        console.error('Error getting Active Teachers Not Retired:', error);
        connection.release();
        throw error;
    }
}


// Get Retired Teachers
async function getRetiredTeachers() {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(
            'SELECT * FROM Teachers WHERE Retired = ?',
            [true] // Assuming true represents retired status in your database
        );
        connection.release();
        return rows;
    } catch (error) {
        console.error('Error getting Retired Teachers:', error);
        connection.release();
        throw error;
    }
}

// Delete Teacher by TeacherID
async function deleteTeacherByID(teacherID) {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query(
            'DELETE FROM Teachers WHERE TeacherID = ?',
            [teacherID]
        );
        connection.release();
        return result.affectedRows; // Number of affected rows (should be 1 for successful delete)
    } catch (error) {
        console.error('Error deleting Teacher by ID:', error);
        connection.release();
        throw error;
    }
}



module.exports = {
    createTeacher,
    updateTeacher,
    getTeacherByID,
    getActiveTeachers,
    getActiveTeachersNotRetired,
    getRetiredTeachers,
    deleteTeacherByID
}