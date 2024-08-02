const db = require('../config/db'); // Assuming you have a database connection module

// Gallery Category Functions
const createGalleryCat = async (galleryCat) => {
  const { name } = galleryCat;
  const query = 'INSERT INTO gallery_cat (name) VALUES (?)';
  try {
    const result = await db.query(query, [name]);
    return result;
  } catch (error) {
    console.error('Error creating gallery category:', error);
    throw new Error('Database error occurred while creating gallery category.');
  }
};

const updateGalleryCat = async (id, galleryCat) => {
  const { name } = galleryCat;
  const query = 'UPDATE gallery_cat SET name = ? WHERE id = ?';
  try {
    const result = await db.query(query, [name, id]);
    return result;
  } catch (error) {
    console.error('Error updating gallery category:', error);
    throw new Error('Database error occurred while updating gallery category.');
  }
};

const deleteGalleryCat = async (id) => {
  const query = 'DELETE FROM gallery_cat WHERE id = ?';
  try {
    const result = await db.query(query, [id]);
    return result;
  } catch (error) {
    console.error('Error deleting gallery category:', error);
    throw new Error('Database error occurred while deleting gallery category.');
  }
};

const getGalleryCats = async () => {
  const query = 'SELECT * FROM gallery_cat';
  try {
    const result = await db.query(query);
    return result;
  } catch (error) {
    console.error('Error fetching gallery categories:', error);
    throw new Error('Database error occurred while fetching gallery categories.');
  }
};

const getGalleryCatById = async (id) => {
  const query = 'SELECT * FROM gallery_cat WHERE id = ?';
  try {
    const result = await db.query(query, [id]);
    return result;
  } catch (error) {
    console.error('Error fetching gallery category by ID:', error);
    throw new Error('Database error occurred while fetching gallery category by ID.');
  }
};

// Gallery Item Functions
const createGalleryItem = async (galleryItem) => {
  const { gallery_id, image } = galleryItem;
  const query = 'INSERT INTO gallery_item (gallery_id, image) VALUES (?, ?)';
  try {
    const result = await db.query(query, [gallery_id, image]);
    return result;
  } catch (error) {
    console.error('Error creating gallery item:', error);
    throw new Error('Database error occurred while creating gallery item.');
  }
};

const updateGalleryItem = async (id, galleryItem) => {
  const { gallery_id, image } = galleryItem;
  const query = 'UPDATE gallery_item SET gallery_id = ?, image = ? WHERE id = ?';
  try {
    const result = await db.query(query, [gallery_id, image, id]);
    return result;
  } catch (error) {
    console.error('Error updating gallery item:', error);
    throw new Error('Database error occurred while updating gallery item.');
  }
};

const deleteGalleryItem = async (id) => {
  const query = 'DELETE FROM gallery_item WHERE id = ?';
  try {
    const result = await db.query(query, [id]);
    return result;
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    throw new Error('Database error occurred while deleting gallery item.');
  }
};

const getGalleryItems = async () => {
  const query = 'SELECT * FROM gallery_item';
  try {
    const result = await db.query(query);
    return result;
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    throw new Error('Database error occurred while fetching gallery items.');
  }
};

const getGalleryItemsByCatID = async (gallery_id) => {
  const query = 'SELECT * FROM gallery_item WHERE gallery_id = ?';
  try {
    const result = await db.query(query, [gallery_id]);
    return result;
  } catch (error) {
    console.error('Error fetching gallery items by category ID:', error);
    throw new Error('Database error occurred while fetching gallery items by category ID.');
  }
};

const getGalleryItemById = async (id) => {
  if (isNaN(id)) {
    throw new Error('Invalid ID parameter');
  }

  const query = 'SELECT * FROM gallery_item WHERE id = ?';
  try {
    const result = await db.query(query, [id]);
    return result;
  } catch (error) {
    console.error('Error fetching gallery item by ID:', error);
    throw new Error('Database error occurred while fetching gallery item by ID.');
  }
};

module.exports = {
  createGalleryCat,
  updateGalleryCat,
  deleteGalleryCat,
  getGalleryCats,
  getGalleryCatById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getGalleryItems,
  getGalleryItemById,
  getGalleryItemsByCatID,
};
