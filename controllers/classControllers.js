const classModel = require('../model/classModel');

async function createClass(req, res) {
    const { name } = req.body;
    try {
        const id = await classModel.createClass(name);
        res.status(201).json({ message: 'Class created successfully', id });
    } catch (error) {
        console.error('Error creating class:', error);
        res.status(500).json({ message: 'Failed to create class' });
    }
}

async function updateClass(req, res) {
    const { id, name } = req.body;
    try {
        const affectedRows = await classModel.updateClass(id, name);
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Class updated successfully' });
        } else {
            res.status(404).json({ message: 'Class not found' });
        }
    } catch (error) {
        console.error('Error updating class:', error);
        res.status(500).json({ message: 'Failed to update class' });
    }
}

async function deleteClass(req, res) {
    const { id } = req.body;
    try {
        const affectedRows = await classModel.deleteClass(id);
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Class deleted successfully' });
        } else {
            res.status(404).json({ message: 'Class not found' });
        }
    } catch (error) {
        console.error('Error deleting class:', error);
        res.status(500).json({ message: 'Failed to delete class' });
    }
}

async function getClass(req, res) {
    const { id } = req.params; // Assuming classID is passed as a URL parameter
    try {
        const classData = await classModel.getClass(id);
        if (classData) {
            res.status(200).json(classData); // Sending the retrieved class data as a JSON response
        } else {
            res.status(404).json({ message: 'Class not found' }); // If class with given ID doesn't exist
        }
    } catch (error) {
        console.error('Error fetching class:', error);
        res.status(500).json({ message: 'Failed to fetch class' }); // Internal server error
    }
}

async function getClasses(req, res) {
    try {
        const classes = await classModel.getClasses();
        res.status(200).json(classes);
    } catch (error) {
        console.error('Error fetching classes:', error);
        res.status(500).json({ message: 'Failed to fetch classes' });
    }
}

module.exports = {
    createClass,
    updateClass,
    deleteClass,
    getClass,
    getClasses
}