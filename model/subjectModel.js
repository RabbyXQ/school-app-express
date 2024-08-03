const connection = require('../config/db');

async function createSubject(name) {
    try {
        const [result] = await connection.query(
            'INSERT INTO subjects (name) VALUES (?)',
            [name]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error creating subject:', error);
        throw error;
    }
}

async function getSubject(id) {
    try {
        const [rows] = await connection.query(
            'SELECT * FROM subjects WHERE id = ?',
            [id]
        );
        return rows.length ? rows[0] : null;
    } catch (error) {
        console.error('Error fetching subject:', error);
        throw error;
    }
}

async function getSubjects() {
    try {
        const [rows] = await connection.query('SELECT * FROM subjects');
        return rows;
    } catch (error) {
        console.error('Error fetching subjects:', error);
        throw error;
    }
}

async function deleteSubject(id) {
    try {
        const [result] = await connection.query(
            'DELETE FROM subjects WHERE id = ?',
            [id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error('Error deleting subject:', error);
        throw error;
    }
}

async function updateSubject(id, name) {
    try {
        const [result] = await connection.query(
            'UPDATE subjects SET name = ? WHERE id = ?',
            [name, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error('Error updating subject:', error);
        throw error;
    }
}

module.exports = {
    createSubject,
    updateSubject,
    deleteSubject,
    getSubject,
    getSubjects
};
