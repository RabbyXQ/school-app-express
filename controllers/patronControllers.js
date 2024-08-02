const patronModel = require('../model/patronModel');

const addPatron = async (req, res) => {
    const { type, name, content } = req.body;
    try {
        const result = await patronModel.addPatron(type, name, content);
        res.status(201).json({ message: 'Patron created successfully', result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create patron' });
    }
};

const getPatronByID = async (req, res) => {
    const { id } = req.params;
    try {
        const patron = await patronModel.getPatronByID(id);
        if (patron) {
            res.status(200).json(patron);
        } else {
            res.status(404).json({ error: 'Patron not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to get patron' });
    }
};

const getActivePatron = async (req, res) => {
    const { type } = req.params;
    try {
        const activePatron = await patronModel.getActivePatron(type.toString());
        if (activePatron) {
            res.status(200).json(activePatron);
        } else {
            res.status(404).json({ error: 'Patron not found' });
        }
    } catch (error) {
        console.error('Error getting patron:', error);
        res.status(500).json({ error: 'Failed to get patron' });
    }
}



const updatePatron = async (req, res) => {
    const { id } = req.params;
    const { type, name, content } = req.body;
    try {
        const affectedRows = await patronModel.updatePatron(id, type, name, content);
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Patron updated successfully' });
        } else {
            res.status(404).json({ error: 'Patron not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update patron' });
    }
};

const deletePatron = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await patronModel.deletePatron(id);
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Patron deleted successfully' });
        } else {
            res.status(404).json({ error: 'Patron not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete patron' });
    }
};

const getAllPatrons = async (req, res) => {
    const { page = 1, limit = 10, type=null } = req.query;
    try {
        const result = await patronModel.getAllPatrons(parseInt(page), parseInt(limit), type);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get patrons' });
    }
};

module.exports = {
    addPatron,
    getPatronByID,
    updatePatron,
    deletePatron,
    getAllPatrons,
    getActivePatron
};
