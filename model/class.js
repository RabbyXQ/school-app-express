const pool = require('../config/db')


async function createClass(className) {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query(
            'INSERT INTO Classes (ClassName) VALUES (?)',
            [className]
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

async function getClasses() {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query('SELECT * FROM Classes');
        connection.release();
        return rows;
    } catch (error) {
        console.error('Error fetching classes:', error);
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


async function updateClass(classID, className) {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query(
            'UPDATE Classes SET ClassName=? WHERE ClassID = ?',
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

module.exports = {
    createClass,
    updateClass,
    deleteClass,
    getClass,
    getClasses
}



