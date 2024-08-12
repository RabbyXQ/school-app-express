const db = require('../config/db'); // Assuming you have a database connection module

// Folder Category Functions
const createFolderCat = async (folderCat) => {
  const { name } = folderCat;
  const query = 'INSERT INTO folder_cat (name) VALUES (?)';
  try {
    const result = await db.query(query, [name]);
    return result;
  } catch (error) {
    console.error('Error creating folder category:', error);
    throw new Error('Database error occurred while creating folder category.');
  }
};

const updateFolderCat = async (id, folderCat) => {
  const { name } = folderCat;
  const query = 'UPDATE folder_cat SET name = ? WHERE id = ?';
  try {
    const result = await db.query(query, [name, id]);
    return result;
  } catch (error) {
    console.error('Error updating folder category:', error);
    throw new Error('Database error occurred while updating folder category.');
  }
};

const deleteFolderCat = async (id) => {
  const query = 'DELETE FROM folder_cat WHERE id = ?';
  try {
    const result = await db.query(query, [id]);
    return result;
  } catch (error) {
    console.error('Error deleting folder category:', error);
    throw new Error('Database error occurred while deleting folder category.');
  }
};

const getFolderCats = async () => {
  const query = 'SELECT * FROM folder_cat';
  try {
    const result = await db.query(query);
    return result;
  } catch (error) {
    console.error('Error fetching folder categories:', error);
    throw new Error('Database error occurred while fetching folder categories.');
  }
};

const getFolderCatById = async (id) => {
  const query = 'SELECT * FROM folder_cat WHERE id = ?';
  try {
    const result = await db.query(query, [id]);
    return result;
  } catch (error) {
    console.error('Error fetching folder category by ID:', error);
    throw new Error('Database error occurred while fetching folder category by ID.');
  }
};

// Folder Item Functions
const createFolderItem = async (folderItem) => {
  const { folder_id, file } = folderItem;
  const query = 'INSERT INTO folder_item (folder_id, file) VALUES (?, ?)';
  try {
    const result = await db.query(query, [folder_id, file]);
    return result;
  } catch (error) {
    console.error('Error creating folder item:', error);
    throw new Error('Database error occurred while creating folder item.');
  }
};

const updateFolderItem = async (id, folderItem) => {
  const { folder_id, file } = folderItem;
  const query = 'UPDATE folder_item SET folder_id = ?, file = ? WHERE id = ?';
  try {
    const result = await db.query(query, [folder_id, file, id]);
    return result;
  } catch (error) {
    console.error('Error updating folder item:', error);
    throw new Error('Database error occurred while updating folder item.');
  }
};

const deleteFolderItem = async (id) => {
  const query = 'DELETE FROM folder_item WHERE id = ?';
  try {
    const result = await db.query(query, [id]);
    return result;
  } catch (error) {
    console.error('Error deleting folder item:', error);
    throw new Error('Database error occurred while deleting folder item.');
  }
};

const getFolderItems = async () => {
  const query = 'SELECT * FROM folder_item';
  try {
    const result = await db.query(query);
    return result;
  } catch (error) {
    console.error('Error fetching folder items:', error);
    throw new Error('Database error occurred while fetching folder items.');
  }
};

const getFolderItemsByCatID = async (folder_id) => {
  const query = 'SELECT * FROM folder_item WHERE folder_id = ?';
  try {
    const result = await db.query(query, [folder_id]);
    return result;
  } catch (error) {
    console.error('Error fetching folder items by category ID:', error);
    throw new Error('Database error occurred while fetching folder items by category ID.');
  }
};

const getFolderItemById = async (id) => {
  if (isNaN(id)) {
    throw new Error('Invalid ID parameter');
  }

  const query = 'SELECT * FROM folder_item WHERE id = ?';
  try {
    const result = await db.query(query, [id]);
    return result;
  } catch (error) {
    console.error('Error fetching folder item by ID:', error);
    throw new Error('Database error occurred while fetching folder item by ID.');
  }
};

module.exports = {
  createFolderCat,
  updateFolderCat,
  deleteFolderCat,
  getFolderCats,
  getFolderCatById,
  createFolderItem,
  updateFolderItem,
  deleteFolderItem,
  getFolderItems,
  getFolderItemById,
  getFolderItemsByCatID,
};
