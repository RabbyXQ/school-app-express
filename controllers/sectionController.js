const sectionModel = require('../model/sectionModel');

async function createSection(req, res) {
    const { class_id, name, shift } = req.body;
    try {
        const id = await sectionModel.createSection(class_id, name, shift);
        res.status(201).json({ id, message: 'Section created successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating section', error: error.message });
    }
}

async function getSection(req, res) {
    const { id } = req.params;
    try {
        const section = await sectionModel.getSection(id);
        if (section) {
            res.status(200).json(section);
        } else {
            res.status(404).json({ message: 'Section not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching section', error: error.message });
    }
}

async function getSections(req, res) {
    try {
        const sections = await sectionModel.getSections();
        res.status(200).json(sections);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sections', error: error.message });
    }
}

async function deleteSection(req, res) {
    const { id } = req.params;
    try {
        const affectedRows = await sectionModel.deleteSection(id);
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Section deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Section not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting section', error: error.message });
    }
}

async function updateSection(req, res) {
    const { id } = req.params;
    const { classId, name, shift } = req.body;
    try {
        const affectedRows = await sectionModel.updateSection(id, classId, name, shift);
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Section updated successfully.' });
        } else {
            res.status(404).json({ message: 'Section not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating section', error: error.message });
    }
}

module.exports = {
    createSection,
    getSection,
    getSections,
    deleteSection,
    updateSection
};
