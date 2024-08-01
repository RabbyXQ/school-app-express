const models = require('../model/menuModel');

// Controller for Menu Class
const getAllClasses = async (req, res) => {
  try {
    const classes = await models.getAllClasses();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllSectionsGroupedByType = async (req, res) => {
  try {
    const results = await models.getAllSectionsGroupedByType();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getClassById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const classData = await models.getClassById(id);
    if (!classData) return res.status(404).json({ message: 'Class not found' });
    res.json(classData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createClass = async (req, res) => {
  const { name, menu_type } = req.body;
  try {
    const id = await models.createClass(name, menu_type);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateClass = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, menu_type } = req.body;
  try {
    const affectedRows = await models.updateClass(id, name, menu_type);
    if (affectedRows === 0) return res.status(404).json({ message: 'Class not found' });
    res.json({ message: 'Class updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateSection = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, classId, type, value } = req.body;
  try {
    const affectedRows = await models.updateSection(id, name, classId, type, value);
    if (affectedRows === 0) return res.status(404).json({ message: 'Section not found' });
    res.json({ message: 'Section updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


const deleteClass = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const affectedRows = await models.deleteClass(id);
    if (affectedRows === 0) return res.status(404).json({ message: 'Class not found' });
    res.json({ message: 'Class deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller for Menu Section
const getSectionsByClassId = async (req, res) => {
  const classId = parseInt(req.params.classId, 10);
  try {
    const sections = await models.getSectionsByClassId(classId);
    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createSection = async (req, res) => {
  const { classId, type, name, value } = req.body;
  try {
    const id = await models.createSection(classId, type, name, value);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSection = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const affectedRows = await models.deleteSection(id);
    if (affectedRows === 0) return res.status(404).json({ message: 'Section not found' });
    res.json({ message: 'Section deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  getSectionsByClassId,
  createSection,
  deleteSection,
  getAllSectionsGroupedByType,
  updateSection
};
