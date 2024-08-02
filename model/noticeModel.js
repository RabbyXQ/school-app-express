const connection = require('../config/db');

const addNotice = async (title, content) => {
  try {
    const [result] = await connection.query(
      'INSERT INTO notices (title, content) VALUES (?, ?)',
      [title, content]
    );
    return result;
  } catch (error) {
    console.error('Error creating Notice:', error);
    throw error;
  }
};

const getNoticeByID = async (id) => {
  try {
    const [rows] = await connection.query(
      'SELECT * FROM notices WHERE id = ?',
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error('Error getting Notice by ID:', error);
    throw error;
  }
};

const updateNotice = async (id, title, content) => {
  try {
    const [result] = await connection.query(
      'UPDATE notices SET title = ?, content = ? WHERE id = ?',
      [title, content, id]
    );
    return result.affectedRows;
  } catch (error) {
    console.error('Error updating Notice:', error);
    throw error;
  }
};

const deleteNotice = async (id) => {
  try {
    const [result] = await connection.query(
      'DELETE FROM notices WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  } catch (error) {
    console.error('Error deleting Notice:', error);
    throw error;
  }
};

const getAllNotices = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit; 
  try {
    const [rows] = await connection.query('SELECT id, title FROM notices ORDER BY id DESC LIMIT ? OFFSET ? ', [limit, offset]);
    const [countResult] = await connection.query('SELECT COUNT(*) as count FROM notices');
    const totalItems = countResult[0].count;
    return {
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      items: rows
    };
  } catch (error) {
    console.error('Error getting all Notices:', error);
    throw error;
  }
};


module.exports = {
  addNotice,
  getNoticeByID,
  updateNotice,
  deleteNotice,
  getAllNotices,
};
