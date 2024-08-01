const connection = require("../config/db");

const addPage = async (title, slug, content) => {
  try {
    const [result] = await connection.query('INSERT INTO pages (title, slug, content) VALUES (?, ?, ?)', [title, slug, content]);
    return result;
  } catch (error) {
    console.error('Error adding page:', error);
    throw error; // rethrow the error after logging it
  }
};

const updatePage = async (id, title, slug, content) => {
  try {
    const [result] = await connection.query('UPDATE pages SET title = ?, slug = ?, content = ? WHERE id = ?', [title, slug, content, id]);
    return result;
  } catch (error) {
    console.error('Error updating page:', error);
    throw error; // rethrow the error after logging it
  }
};

const deletePage = async (id) => {
  try {
    const [result] = await connection.query('DELETE FROM pages WHERE id = ?', [id]);
    return result;
  } catch (error) {
    console.error('Error deleting page:', error);
    throw error; // rethrow the error after logging it
  }
};

const getPage = async (id) => {
  try {
    const [rows] = await connection.query('SELECT * FROM pages WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Error getting page:', error);
    throw error; // rethrow the error after logging it
  }
};

const getPageBySlug = async (slug) => {
  try {
    const [rows] = await connection.query('SELECT * FROM pages WHERE slug = ?', [slug]);
    return rows[0];
  } catch (error) {
    console.error('Error getting page by slug:', error);
    throw error; // rethrow the error after logging it
  }
};

const getAllPages = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;
    const [rows] = await connection.query('SELECT * FROM pages LIMIT ? OFFSET ?', [limit, offset]);
    const [countResult] = await connection.query('SELECT COUNT(*) as count FROM pages');
    const totalItems = countResult[0].count;
    return {
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      items: rows
    };
  } catch (error) {
    console.error('Error getting all pages:', error);
    throw error; // rethrow the error after logging it
  }
};

module.exports = {
  addPage,
  updatePage,
  deletePage,
  getPage,
  getAllPages,
  getPageBySlug
};
