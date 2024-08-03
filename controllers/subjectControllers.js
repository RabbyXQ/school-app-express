const subjectModel = require('../model/subjectModel');

// Create a new subject
async function createSubject(req, res) {
    const { name } = req.body;
    try {
        const insertId = await subjectModel.createSubject(name);
        res.status(201).json({ id: insertId, name });
    } catch (error) {
        console.error('Error creating subject:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Get a single subject by ID
async function getSubject(req, res) {
    const { id } = req.params;
    try {
        const subject = await subjectModel.getSubject(id);
        if (subject) {
            res.status(200).json(subject);
        } else {
            res.status(404).json({ error: 'Subject not found' });
        }
    } catch (error) {
        console.error('Error fetching subject:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Get all subjects
async function getSubjects(req, res) {
    try {
        const subjects = await subjectModel.getSubjects();
        res.status(200).json(subjects);
    } catch (error) {
        console.error('Error fetching subjects:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Delete a subject by ID
async function deleteSubject(req, res) {
    const { id } = req.params;
    try {
        const affectedRows = await subjectModel.deleteSubject(id);
        if (affectedRows > 0) {
            res.status(204).end(); // No Content
        } else {
            res.status(404).json({ error: 'Subject not found' });
        }
    } catch (error) {
        console.error('Error deleting subject:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Update a subject by ID
async function updateSubject(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const affectedRows = await subjectModel.updateSubject(id, name);
        if (affectedRows > 0) {
            res.status(200).json({ id, name });
        } else {
            res.status(404).json({ error: 'Subject not found' });
        }
    } catch (error) {
        console.error('Error updating subject:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    createSubject,
    getSubject,
    getSubjects,
    deleteSubject,
    updateSubject
};
