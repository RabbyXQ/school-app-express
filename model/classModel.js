const connection = require('../config/db')


async function createClass(name) {
    try {
        const [result] = await connection.query(
            'INSERT INTO classes (name) VALUES (?)',
            [name]
        );
        return result.insertId; 
    } catch (error) {
        console.error('Error creating class:', error);
        throw error;
    }
}


async function getClass(id) {
    try {
        const [rows] = await connection.query(
            'SELECT * FROM classes WHERE id = ?',
            [id]
        );
        return rows.length ? rows[0] : null; 
    } catch (error) {
        console.error('Error fetching class:', error);
        throw error; 
    }
}

async function getClasses() {
    try {
        const [rows] = await connection.query('SELECT * FROM classes');
        return rows;
    } catch (error) {
        console.error('Error fetching classes:', error);
        throw error;
    }
}

  async function deleteClass(id) {
    try {
        const [result] = await connection.query(
            'DELETE FROM classes WHERE id = ?',
            [id]
        );
        return result.affectedRows; 
    } catch (error) {
        console.error('Error deleting class:', error);
        throw error; 
    }
}


async function updateClass(id, name) {
    try {
        const [result] = await connection.query(
            'UPDATE classes SET name=? WHERE id = ?',
            [name, id]
        );
        return result.affectedRows;
    } catch (error) {
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



