const pool = require('../config/db')


async function createClass(className, classTeacherID) {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query(
            'INSERT INTO Classes (ClassName, ClassTeacherID) VALUES (?, ?)',
            [className, classTeacherID]
        );
        connection.release();
        return result.insertId; 
    } catch (error) {
        console.error('Error creating class:', error);
        connection.release();
        throw error;
    }
}


  async function getClass(classID) {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(
            'SELECT * FROM Classes WHERE ClassID = ?',
            [classID]
        );
        connection.release();
        return rows.length ? rows[0] : null; 
    } catch (error) {
        console.error('Error fetching class:', error);
        connection.release();
        throw error; 
    }
}


  async function deleteClass(classID) {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query(
            'DELETE FROM Classes WHERE ClassID = ?',
            [classID]
        );
        connection.release();
        return result.affectedRows; 
    } catch (error) {
        console.error('Error deleting class:', error);
        connection.release();
        throw error; 
    }
}


async function updateClass(classID, className, classTeacherID) {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query(
            'UPDATE Classes SET ClassName=?, ClassTeacherID=? WHERE ClassID = ?',
            [className, classTeacherID, classID]
        );
        connection.release();
        return result.affectedRows;
    } catch (error) {
        console.error('Error updating class:', error);
        connection.release();
        throw error; 
    }
}



