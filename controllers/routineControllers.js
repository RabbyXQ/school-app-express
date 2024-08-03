const routinesModel = require('../model/routineModel');

// Controller to add a new routine
const addRoutine = async (req, res) => {
    const { day, subject, time_From, time_To, class_id, section_id } = req.body;
    try {
        const result = await routinesModel.addRoutine(day, subject, time_From, time_To, class_id, section_id);
        res.status(201).json({ id: result.insertId, message: 'Routine created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating Routine' });
    }
};

// Controller to get a routine by ID
const getRoutineByID = async (req, res) => {
    const { id } = req.params;
    try {
        const routine = await routinesModel.getRoutineByID(id);
        if (routine) {
            res.status(200).json(routine);
        } else {
            res.status(404).json({ message: 'Routine not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error getting Routine by ID' });
    }
};

// Controller to update a routine by ID
const updateRoutine = async (req, res) => {
    const { id } = req.params;
    const { day, subject, time_From, time_To, class_id, section_id } = req.body;
    try {
        const affectedRows = await routinesModel.updateRoutine(id, day, subject, time_From, time_To, class_id, section_id);
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Routine updated successfully' });
        } else {
            res.status(404).json({ message: 'Routine not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating Routine' });
    }
};

// Controller to delete a routine by ID
const deleteRoutine = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await routinesModel.deleteRoutine(id);
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Routine deleted successfully' });
        } else {
            res.status(404).json({ message: 'Routine not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting Routine' });
    }
};

// Controller to get all routines with pagination
const getAllRoutines = async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    try {
        const result = await routinesModel.getAllRoutines(page, limit);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error getting all Routines' });
    }
};

module.exports = {
    addRoutine,
    getRoutineByID,
    updateRoutine,
    deleteRoutine,
    getAllRoutines
};
