const employeesModel = require('../model/employeeModel');

// Controller to add a new employee
const addEmployee = async (req, res) => {
    const { type, active, name, phone, email, photo } = req.body;
    try {
        const result = await employeesModel.addEmployee(type, active, name, phone, email, photo);
        res.status(201).json({ message: 'Employee added successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error adding employee', error });
    }
};

// Controller to get an employee by ID
const getEmployeeByID = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const employee = await employeesModel.getEmployeeByID(id);
        if (employee) {
            res.json(employee);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error getting employee by ID', error });
    }
};

// Controller to update an employee by ID
const updateEmployee = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { type, active, name, phone, email, photo } = req.body;
    try {
        const affectedRows = await employeesModel.updateEmployee(id, type, active, name, phone, email, photo);
        if (affectedRows > 0) {
            res.json({ message: 'Employee updated successfully' });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating employee', error });
    }
};

// Controller to delete an employee by ID
const deleteEmployee = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const affectedRows = await employeesModel.deleteEmployee(id);
        if (affectedRows > 0) {
            res.json({ message: 'Employee deleted successfully' });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error });
    }
};

// Controller to get all employees with pagination
const getAllEmployees = async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    try {
        const result = await employeesModel.getAllEmployees(page, limit);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving all employees', error });
    }
};

// Controller to get all active employees with pagination
const getActiveEmployees = async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    try {
        const result = await employeesModel.getActiveEmployees(page, limit);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving active employees', error });
    }
};

// Controller to get all inactive employees with pagination
const getInactiveEmployees = async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    try {
        const result = await employeesModel.getInactiveEmployees(page, limit);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving inactive employees', error });
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
