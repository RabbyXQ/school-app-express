const connection = require("../config/db");

const addPage = async (title, slug, content) => {
  const [result] = await connection.query('INSERT INTO pages (title, slug, content) VALUES (?, ?, ?)', [title, slug, content]);
  return result;
};

const updatePage = async (id, title, slug, content) => {
  const [result] = await connection.query('UPDATE pages SET title = ?, slug = ?, content = ? WHERE id = ?', [title, slug, content, id]);
  return result;
};

const deletePage = async (id) => {
  const [result] = await connection.query('DELETE FROM pages WHERE id = ?', [id]);
  return result;
};

const getPage = async (id) => {
  const [rows] = await connection.query('SELECT * FROM pages WHERE id = ?', [id]);
  return rows[0];
};


const getPageBySlug = async(slug) => {
    const [rows] = await connection.query('SELECT * FROM pages WHERE slug = ?', [slug]);
    return rows[0];
} 



const getAllPages = async (page = 1, limit = 10) => {
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
};

module.exports = {
  addPage,
  updatePage,
  deletePage,
  getPage,
  getAllPages,
  getPageBySlug
};
