const pool = require('../config/db');

async function createHead(teacherID, speech, startsAt, endsAt) {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query(
            'INSERT INTO Head (TeacherID, Speech, StartsAt, EndsAt) VALUES (?, ?, ?, ?)',
            [teacherID, speech, startsAt, endsAt]
        );
        connection.release();
        return result.insertId;
    } catch (error) {
        console.error('Error creating Head entry:', error);
        connection.release();
        throw error;
    }
}

async function updateHead(headID, teacherID, speech, startsAt, endsAt) {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query(
            'UPDATE Head SET TeacherID=?, Speech=?, StartsAt=?, EndsAt=? WHERE ID=?',
            [teacherID, speech, startsAt, endsAt, headID]
        );
        connection.release();
        return result.affectedRows;
    } catch (error) {
        console.error('Error updating Head entry:', error);
        connection.release();
        throw error;
    }
}


async function deleteHead(headID) {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query(
            'DELETE FROM Head WHERE ID=?',
            [headID]
        );
        connection.release();
        return result.affectedRows;
    } catch (error) {
        console.error('Error deleting Head entry:', error);
        connection.release();
        throw error;
    }
}

// Get All Heads
async function getAllHeads() {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(
            'SELECT * FROM Head'
        );
        connection.release();
        return rows;
    } catch (error) {
        console.error('Error getting all Heads:', error);
        connection.release();
        throw error;
    }
}


// Get Head by TeacherID
async function getHeadByTeacherID(teacherID) {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(
            'SELECT * FROM Head WHERE TeacherID = ?',
            [teacherID]
        );
        connection.release();
        return rows;
    } catch (error) {
        console.error('Error getting Head by TeacherID:', error);
        connection.release();
        throw error;
    }
}

module.exports = {
    createHead,
    updateHead,
    deleteHead,
    getAllHeads,
    getHeadByTeacherID
}


