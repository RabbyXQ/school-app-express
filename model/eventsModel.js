const connection = require("../config/db");

const addEvent = async (title, content, gallery_id) => {
    try {
        const [result] = await connection.query(
            'INSERT INTO events (title, content, gallery_id) VALUES (?, ?, ?)',
            [title, content, gallery_id]
        );
        return result;
    } catch (error) {
        console.error('Error creating Event:', error);
        throw error;
    }
};

const getEventByID = async (id) => {
    try {
        const [rows] = await connection.query(
            'SELECT * FROM events WHERE id = ?',
            [id]
        );
        return rows[0];
    } catch (error) {
        console.error('Error getting Event by ID:', error);
        throw error;
    }
};

const updateEvent = async (id, title, content, gallery_id) => {
    try {
        const [result] = await connection.query(
            'UPDATE events SET title = ?, content = ?, gallery_id = ? WHERE id = ?',
            [title, content, gallery_id, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error('Error updating Event:', error);
        throw error;
    }
};

const deleteEvent = async (id) => {
    try {
        const [result] = await connection.query(
            'DELETE FROM events WHERE id = ?',
            [id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error('Error deleting Event:', error);
        throw error;
    }
};

const getAllEvents = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    try {
        const [rows] = await connection.query(
            'SELECT id, title FROM events ORDER BY id DESC LIMIT ? OFFSET ?',
            [limit, offset]
        );
        const [countResult] = await connection.query(
            'SELECT COUNT(*) as count FROM events'
        );
        const totalItems = countResult[0].count;
        return {
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
            items: rows
        };
    } catch (error) {
        console.error('Error getting all Events:', error);
        throw error;
    }
};

module.exports = {
    addEvent,
    getEventByID,
    getAllEvents,
    updateEvent,
    deleteEvent
};
