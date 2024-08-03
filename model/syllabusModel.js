const connection = require("../config/db");

const addSyllabus = async (class_id, year, page_slug) => {
  try {
    const [result] = await connection.query(
      'INSERT INTO syllabus (class_id, year, page_slug) VALUES (?, ?, ?)',
      [class_id, year, page_slug]
    );
    return result;
  } catch (error) {
    console.error('Error creating Syllabus:', error);
    throw error;
  }
};

const getSyllabusByID = async (id) => {
  try {
    const [rows] = await connection.query(
      'SELECT * FROM syllabus WHERE id = ?',
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error('Error getting Syllabus by ID:', error);
    throw error;
  }
};

const updateSyllabus = async (id, class_id, year, page_slug) => {
  try {
    const [result] = await connection.query(
      'UPDATE syllabus SET class_id = ?, year = ?, page_slug = ? WHERE id = ?',
      [class_id, year, page_slug, id]
    );
    return result.affectedRows;
  } catch (error) {
    console.error('Error updating Syllabus:', error);
    throw error;
  }
};

const deleteSyllabus = async (id) => {
  try {
    const [result] = await connection.query(
      'DELETE FROM syllabus WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  } catch (error) {
    console.error('Error deleting Syllabus:', error);
    throw error;
  }
};

const getAllSyllabi = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  try {
    const [rows] = await connection.query(
      'SELECT id, class_id, year, page_slug FROM syllabus ORDER BY id, year DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );
    const [countResult] = await connection.query('SELECT COUNT(*) as count FROM syllabus');
    const totalItems = countResult[0].count;
    return {
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      items: rows
    };
  } catch (error) {
    console.error('Error getting all Syllabi:', error);
    throw error;
  }
};

module.exports = {
  addSyllabus,
  getSyllabusByID,
  getAllSyllabi,
  updateSyllabus,
  deleteSyllabus
};
