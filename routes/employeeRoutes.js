const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employeeControllers');

// Route to add a new employee
router.post('/employees', employeesController.addEmployee);

// Route to get an employee by ID
router.get('/employees/:id', employeesController.getEmployeeByID);

// Route to update an employee by ID
router.put('/employees/:id', employeesController.updateEmployee);

// Route to delete an employee by ID
router.delete('/employees/:id', employeesController.deleteEmployee);

// Route to get all employees with pagination
router.get('/employees', employeesController.getAllEmployees);

// Route to get all active employees with pagination
router.get('/employees/active', employeesController.getActiveEmployees);

// Route to get all inactive employees with pagination
router.get('/employees/inactive', employeesController.getInactiveEmployees);

module.exports = router;
