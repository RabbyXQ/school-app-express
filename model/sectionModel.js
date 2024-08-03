const connection = require('../config/db');

async function createSection(class_id, name, shift) {
    try {
        const [result] = await connection.query(
            'INSERT INTO sections (class_id, name, shift) VALUES (?, ?, ?)',
            [class_id, name, shift]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error creating section:', error);
        throw error;
    }
}

async function getSection(id) {
    try {
        const [rows] = await connection.query(
            'SELECT * FROM sections WHERE id = ?',
            [id]
        );
        return rows.length ? rows[0] : null;
    } catch (error) {
        console.error('Error fetching section:', error);
        throw error;
    }
}

async function getSections() {
    try {
        const [rows] = await connection.query('SELECT * FROM sections');
        return rows;
    } catch (error) {
        console.error('Error fetching sections:', error);
        throw error;
    }
}

async function deleteSection(id) {
    try {
        const [result] = await connection.query(
            'DELETE FROM sections WHERE id = ?',
            [id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error('Error deleting section:', error);
        throw error;
    }
}

async function updateSection(id, class_id, name, shift) {
    try {
        const [result] = await connection.query(
            'UPDATE sections SET class_id = ?, name = ?, shift = ? WHERE id = ?',
            [class_id, name, shift, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error('Error updating section:', error);
        throw error;
    }
}

module.exports = {
    createSection,
    updateSection,
    deleteSection,
    getSection,
    getSections
};
