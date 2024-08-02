const galleryModel = require('../model/galleryModel');

// Fetch all gallery categories
const getAllGalleryCats = async (req, res) => {
  try {
    const [rows] = await galleryModel.getGalleryCats(); // Ensure it’s an array of rows
    res.json(rows); // Send the data as JSON
  } catch (error) {
    console.error('Error fetching gallery categories:', error);
    res.status(500).json({ error: 'Error fetching gallery categories' });
  }
};

// Fetch a single gallery category by ID
const getGalleryCat = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await galleryModel.getGalleryCatById(Number(id));
    if (rows.length === 0) return res.status(404).json({ error: 'Gallery category not found' });
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching gallery category:', error);
    res.status(500).json({ error: 'Error fetching gallery category' });
  }
};

// Create a new gallery category
const createGalleryCat = async (req, res) => {
  const galleryCat = req.body;
  try {
    const result = await galleryModel.createGalleryCat(galleryCat);
    res.status(201).json({ id: result.insertId, ...galleryCat });
  } catch (error) {
    console.error('Error creating gallery category:', error);
    res.status(500).json({ error: 'Error creating gallery category' });
  }
};

// Update an existing gallery category
const updateGalleryCat = async (req, res) => {
  const { id } = req.params;
  const galleryCat = req.body;
  try {
    const result = await galleryModel.updateGalleryCat(Number(id), galleryCat);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Gallery category not found' });
    res.json({ ...galleryCat });
  } catch (error) {
    console.error('Error updating gallery category:', error);
    res.status(500).json({ error: 'Error updating gallery category' });
  }
};

// Delete a gallery category
const deleteGalleryCat = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await galleryModel.deleteGalleryCat(Number(id));
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Gallery category not found' });
    res.json({ message: 'Gallery category deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery category:', error);
    res.status(500).json({ error: 'Error deleting gallery category' });
  }
};

// Fetch all gallery items
const getAllGalleryItems = async (req, res) => {
  try {
    const [rows] = await galleryModel.getGalleryItems(); // Ensure it’s an array of rows
    res.json(rows); // Send the data as JSON
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    res.status(500).json({ error: 'Error fetching gallery items' });
  }
};

// Fetch gallery items by category ID
const getGalleryItemsByCatID = async (req, res) => {
  const { gallery_id } = req.params;
  try {
    const [rows] = await galleryModel.getGalleryItemsByCatID(Number(gallery_id));
    res.json(rows);
  } catch (error) {
    console.error('Error fetching gallery items by category ID:', error);
    res.status(500).json({ error: 'Error fetching gallery items by category ID' });
  }
};

// Fetch a single gallery item by ID
const getGalleryItem = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID parameter' });
  }
  try {
    const [rows] = await galleryModel.getGalleryItemById(Number(id));
    if (rows.length === 0) return res.status(404).json({ error: 'Gallery item not found' });
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching gallery item:', error);
    res.status(500).json({ error: 'Error fetching gallery item' });
  }
};

// Create a new gallery item
const createGalleryItem = async (req, res) => {
  const galleryItem = req.body;
  try {
    const result = await galleryModel.createGalleryItem(galleryItem);
    res.status(201).json({ id: result.insertId, ...galleryItem });
  } catch (error) {
    console.error('Error creating gallery item:', error);
    res.status(500).json({ error: 'Error creating gallery item' });
  }
};

// Update an existing gallery item
const updateGalleryItem = async (req, res) => {
  const { id } = req.params;
  const galleryItem = req.body;
  try {
    const result = await galleryModel.updateGalleryItem(Number(id), galleryItem);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Gallery item not found' });
    res.json({ ...galleryItem });
  } catch (error) {
    console.error('Error updating gallery item:', error);
    res.status(500).json({ error: 'Error updating gallery item' });
  }
};

// Delete a gallery item
const deleteGalleryItem = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await galleryModel.deleteGalleryItem(Number(id));
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Gallery item not found' });
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    res.status(500).json({ error: 'Error deleting gallery item' });
  }
};

module.exports = {
  getAllGalleryCats,
  getGalleryCat,
  createGalleryCat,
  updateGalleryCat,
  deleteGalleryCat,
  getAllGalleryItems,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getGalleryItemsByCatID
};
