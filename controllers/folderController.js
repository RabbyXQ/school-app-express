const folderModel = require('../model/folderModel'); // Adjust the path if necessary

// Folder Category Controllers

const getAllFolderCats = async (req, res) => {
  try {
    const [rows] = await folderModel.getFolderCats();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching folder categories:', error);
    res.status(500).json({ error: 'Error fetching folder categories' });
  }
};

const getFolderCat = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID parameter' });
  }
  try {
    const [rows] = await folderModel.getFolderCatById(Number(id));
    if (rows.length === 0) return res.status(404).json({ error: 'Folder category not found' });
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching folder category:', error);
    res.status(500).json({ error: 'Error fetching folder category' });
  }
};

const createFolderCatController = async (req, res) => {
  const folderCat = req.body;
  try {
    const result = await folderModel.createFolderCat(folderCat);
    res.status(201).json({ id: result.insertId, ...folderCat });
  } catch (error) {
    console.error('Error creating folder category:', error);
    res.status(500).json({ error: 'Error creating folder category' });
  }
};

const updateFolderCatController = async (req, res) => {
  const { id } = req.params;
  const folderCat = req.body;
  try {
    const result = await folderModel.updateFolderCat(Number(id), folderCat);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Folder category not found' });
    res.json({ ...folderCat });
  } catch (error) {
    console.error('Error updating folder category:', error);
    res.status(500).json({ error: 'Error updating folder category' });
  }
};

const deleteFolderCatController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await folderModel.deleteFolderCat(Number(id));
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Folder category not found' });
    res.json({ message: 'Folder category deleted successfully' });
  } catch (error) {
    console.error('Error deleting folder category:', error);
    res.status(500).json({ error: 'Error deleting folder category' });
  }
};

// Folder Item Controllers

const getAllFolderItems = async (req, res) => {
  try {
    const [rows] = await folderModel.getFolderItems();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching folder items:', error);
    res.status(500).json({ error: 'Error fetching folder items' });
  }
};

const getFolderItemsByCatID = async (req, res) => {
  const { folder_id } = req.params;
  try {
    const [rows] = await folderModel.getFolderItemsByCatID(Number(folder_id));
    res.json(rows);
  } catch (error) {
    console.error('Error fetching folder items by category ID:', error);
    res.status(500).json({ error: 'Error fetching folder items by category ID' });
  }
};

const getFolderItem = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID parameter' });
  }
  try {
    const [rows] = await folderModel.getFolderItemById(Number(id));
    if (rows.length === 0) return res.status(404).json({ error: 'Folder item not found' });
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching folder item:', error);
    res.status(500).json({ error: 'Error fetching folder item' });
  }
};

const createFolderItemController = async (req, res) => {
  const folderItem = req.body;
  try {
    const result = await folderModel.createFolderItem(folderItem);
    res.status(201).json({ id: result.insertId, ...folderItem });
  } catch (error) {
    console.error('Error creating folder item:', error);
    res.status(500).json({ error: 'Error creating folder item' });
  }
};

const updateFolderItemController = async (req, res) => {
  const { id } = req.params;
  const folderItem = req.body;
  try {
    const result = await folderModel.updateFolderItem(Number(id), folderItem);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Folder item not found' });
    res.json({ ...folderItem });
  } catch (error) {
    console.error('Error updating folder item:', error);
    res.status(500).json({ error: 'Error updating folder item' });
  }
};

const deleteFolderItemController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await folderModel.deleteFolderItem(Number(id));
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Folder item not found' });
    res.json({ message: 'Folder item deleted successfully' });
  } catch (error) {
    console.error('Error deleting folder item:', error);
    res.status(500).json({ error: 'Error deleting folder item' });
  }
};

module.exports = {
  // Folder Category Controllers
  getAllFolderCats,
  getFolderCat,
  createFolderCatController,
  updateFolderCatController,
  deleteFolderCatController,
  
  // Folder Item Controllers
  getAllFolderItems,
  getFolderItemsByCatID,
  getFolderItem,
  createFolderItemController,
  updateFolderItemController,
  deleteFolderItemController
};
