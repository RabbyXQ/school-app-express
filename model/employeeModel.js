const connection = require('../config/db');

// Function to add a new employee
const addEmployee = async (type, active, name, phone, email, photo) => {
    try {
        const [result] = await connection.query(
            'INSERT INTO employees (type, active, name, phone, email, photo) VALUES (?, ?, ?, ?, ?, ?)',
            [type, active, name, phone, email, photo]
        );
        return result;
    } catch (error) {
        console.error('Error creating Employee:', error);
        throw error;
    }
};

// Function to get an employee by ID
const getEmployeeByID = async (id) => {
    try {
        const [rows] = await connection.query(
            'SELECT * FROM employees WHERE id = ?',
            [id]
        );
        return rows[0];
    } catch (error) {
        console.error('Error getting Employee by ID:', error);
        throw error;
    }
};

// Function to update an employee by ID
const updateEmployee = async (id, type, active, name, phone, email, photo) => {
    try {
        const [result] = await connection.query(
            'UPDATE employees SET type = ?, active = ?, name = ?, phone = ?, email = ?, photo = ? WHERE id = ?',
            [type, active, name, phone, email, photo, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error('Error updating Employee:', error);
        throw error;
    }
};

// Function to delete an employee by ID
const deleteEmployee = async (id) => {
    try {
        const [result] = await connection.query(
            'DELETE FROM employees WHERE id = ?',
            [id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error('Error deleting Employee:', error);
        throw error;
    }
};

// Function to get all employees with pagination
const getAllEmployees = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    try {
        const [rows] = await connection.query(
            'SELECT * FROM employees ORDER BY id DESC LIMIT ? OFFSET ?',
            [limit, offset]
        );
        const [countResult] = await connection.query('SELECT COUNT(*) as count FROM employees');
        const totalItems = countResult[0].count;
        return {
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
            items: rows
        };
    } catch (error) {
        console.error('Error getting all Employees:', error);
        throw error;
    }
};

// Function to get all active employees
const getActiveEmployees = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    try {
        const [rows] = await connection.query(
            'SELECT * FROM employees WHERE active = 1 ORDER BY id DESC LIMIT ? OFFSET ?',
            [limit, offset]
        );
        const [countResult] = await connection.query('SELECT COUNT(*) as count FROM employees WHERE active = 1');
        const totalItems = countResult[0].count;
        return {
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
            items: rows
        };
    } catch (error) {
        console.error('Error getting active Employees:', error);
        throw error;
    }
};

// Function to get all inactive employees
const getInactiveEmployees = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    try {
        const [rows] = await connection.query(
            'SELECT * FROM employees WHERE active = 0 ORDER BY id DESC LIMIT ? OFFSET ?',
            [limit, offset]
        );
        const [countResult] = await connection.query('SELECT COUNT(*) as count FROM employees WHERE active = 0');
        const totalItems = countResult[0].count;
        return {
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
            items: rows
        };
    } catch (error) {
        console.error('Error getting inactive Employees:', error);
        throw error;
    }
};

module.exports = {
    addEmployee,
    getEmployeeByID,
    updateEmployee,
    deleteEmployee,
    getAllEmployees,
    getActiveEmployees,
    getInactiveEmployees
};
