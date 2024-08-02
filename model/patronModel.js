const connection = require("../config/db");

const addPatron = async (type, name, content) => {
    try {
        const [result] = await connection.query(
            'INSERT INTO patron (type, name, content) VALUES (?, ?, ?)',
            [type, name, content]
        );
        return result;
    } catch (error) {
        console.error('Error creating Patron:', error);
        throw error;
    }
};

const getPatronByID = async (id) => {
    try {
        const [rows] = await connection.query(
            'SELECT * FROM patron WHERE id = ?',
            [id]
        );
        return rows[0];
    } catch (error) {
        console.error('Error getting Patron by ID:', error);
        throw error;
    }
};

const updatePatron = async (id, type, name, content) => {
    try {
        const [result] = await connection.query(
            'UPDATE patron SET type = ?, name = ?, content = ? WHERE id = ?',
            [type, name, content, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error('Error updating Patron:', error);
        throw error;
    }
};

const deletePatron = async (id) => {
    try {
        const [result] = await connection.query(
            'DELETE FROM patron WHERE id = ?',
            [id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error('Error deleting Patron:', error);
        throw error;
    }
};

const getAllPatrons = async (page = 1, limit = 10, type = null) => {
    const offset = (page - 1) * limit;
    let query = 'SELECT id, type, name FROM patron';
    const queryTail = ' ORDER BY id DESC LIMIT ? OFFSET ?';
    
    // Check if we need to filter by type
    if (type !== null) {
        query += ' WHERE type = ?';
    }
    
    query += queryTail;

    try {
        let rows;
        
        // Execute the query based on the presence of the type parameter
        if (type !== null) {
            [rows] = await connection.query(query, [type, limit, offset]);
        } else {
            [rows] = await connection.query(query, [limit, offset]);
        }
        
        // Get the total number of items (considering the filter)
        let countQuery = 'SELECT COUNT(*) as count FROM patron';
        let countParams = [];
        if (type !== null) {
            countQuery += ' WHERE type = ?';
            countParams.push(type);
        }
        
        const [countResult] = await connection.query(countQuery, countParams);
        const totalItems = countResult[0].count;
        
        return {
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
            items: rows
        };
    } catch (error) {
        console.error('Error getting all Patrons:', error);
        throw error;
    }
};

const getActivePatron = async (type) => {
    try {
        const [rows] = await connection.query('SELECT * FROM patron WHERE type = ?', [type]);
        return rows[0];
    } catch (error) {
        console.error('Error getting patron:', error);
        throw error;
    }
}


module.exports = {
    addPatron,
    getPatronByID,
    getAllPatrons,
    updatePatron,
    deletePatron,
    getActivePatron
};
