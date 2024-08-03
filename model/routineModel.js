const connection = require('../config/db');

// Function to add a new routine
const addRoutine = async (day, subject, time_From, time_To, class_id, section_id) => {
    try {
        const [result] = await connection.query(
            'INSERT INTO routines (day, subject, time_From, time_To, class_id, section_id) VALUES (?, ?, ?, ?, ?, ?)',
            [day, subject, time_From, time_To, class_id, section_id]
        );
        return result;
    } catch (error) {
        console.error('Error creating Routine:', error);
        throw error;
    }
};

// Function to get a routine by ID
const getRoutineByID = async (id) => {
    try {
        const [rows] = await connection.query(
            'SELECT * FROM routines WHERE id = ?',
            [id]
        );
        return rows[0];
    } catch (error) {
        console.error('Error getting Routine by ID:', error);
        throw error;
    }
};

// Function to update a routine by ID
const updateRoutine = async (id, day, subject, time_From, time_To, class_id, section_id) => {
    try {
        const [result] = await connection.query(
            'UPDATE routines SET day = ?, subject = ?, time_From = ?, time_To = ?, class_id = ?, section_id = ? WHERE id = ?',
            [day, subject, time_From, time_To, class_id, section_id, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error('Error updating Routine:', error);
        throw error;
    }
};

// Function to delete a routine by ID
const deleteRoutine = async (id) => {
    try {
        const [result] = await connection.query(
            'DELETE FROM routines WHERE id = ?',
            [id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error('Error deleting Routine:', error);
        throw error;
    }
};

// Function to get all routines with pagination
const getAllRoutines = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    try {
        const [rows] = await connection.query(
            'SELECT id, day, subject, time_From, time_To, class_id, section_id FROM routines ORDER BY id DESC LIMIT ? OFFSET ?',
            [limit, offset]
        );
        const [countResult] = await connection.query('SELECT COUNT(*) as count FROM routines');
        const totalItems = countResult[0].count;
        return {
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
            items: rows
        };
    } catch (error) {
        console.error('Error getting all Routines:', error);
        throw error;
    }
};

module.exports = {
    addRoutine,
    getRoutineByID,
    updateRoutine,
    deleteRoutine,
    getAllRoutines
};
