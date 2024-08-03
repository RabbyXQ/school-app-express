const syllabusModel = require('../model/syllabusModel');

const addSyllabus = async (req, res) => {
  const { class_id, year, page_slug } = req.body;
  try {
    const result = await syllabusModel.addSyllabus(class_id, year, page_slug);
    res.status(201).json({ id: result.insertId, class_id, year, page_slug });
  } catch (error) {
    console.error('Error creating Syllabus:', error);
    res.status(500).json({ message: 'Error creating Syllabus' });
  }
};

const getSyllabusByID = async (req, res) => {
  const { id } = req.params;
  try {
    const syllabus = await syllabusModel.getSyllabusByID(id);
    if (syllabus) {
      res.json(syllabus);
    } else {
      res.status(404).json({ message: 'Syllabus not found' });
    }
  } catch (error) {
    console.error('Error getting Syllabus by ID:', error);
    res.status(500).json({ message: 'Error getting Syllabus by ID' });
  }
};

const updateSyllabus = async (req, res) => {
  const { id } = req.params;
  const { class_id, year, page_slug } = req.body;
  try {
    const affectedRows = await syllabusModel.updateSyllabus(id, class_id, year, page_slug);
    if (affectedRows) {
      res.json({ id, class_id, year, page_slug });
    } else {
      res.status(404).json({ message: 'Syllabus not found' });
    }
  } catch (error) {
    console.error('Error updating Syllabus:', error);
    res.status(500).json({ message: 'Error updating Syllabus' });
  }
};

const deleteSyllabus = async (req, res) => {
  const { id } = req.params;
  try {
    const affectedRows = await syllabusModel.deleteSyllabus(id);
    if (affectedRows) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Syllabus not found' });
    }
  } catch (error) {
    console.error('Error deleting Syllabus:', error);
    res.status(500).json({ message: 'Error deleting Syllabus' });
  }
};

const getAllSyllabi = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const result = await syllabusModel.getAllSyllabi(parseInt(page, 10), parseInt(limit, 10));
    res.json(result);
  } catch (error) {
    console.error('Error getting all Syllabi:', error);
    res.status(500).json({ message: 'Error getting all Syllabi' });
  }
};

module.exports = {
  addSyllabus,
  getSyllabusByID,
  updateSyllabus,
  deleteSyllabus,
  getAllSyllabi
};
