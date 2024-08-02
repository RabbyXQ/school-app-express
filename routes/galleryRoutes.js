const express = require('express');
const {
  getAllGalleryCats,
  getGalleryCat,
  createGalleryCat,
  updateGalleryCat,
  deleteGalleryCat,
  getAllGalleryItems,
  getGalleryItemsByCatID,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} = require('../controllers/galleryControllers');

const router = express.Router();

// Gallery Category Routes
router.get('/gallery/categories', getAllGalleryCats); // Get all gallery categories
router.get('/gallery/categories/:id', getGalleryCat); // Get a specific gallery category
router.post('/gallery/categories', createGalleryCat); // Create a new gallery category
router.put('/gallery/categories/:id', updateGalleryCat); // Update a gallery category
router.delete('/gallery/categories/:id', deleteGalleryCat); // Delete a gallery category

// Gallery Item Routes
router.get('/gallery/items', getAllGalleryItems); // Get all gallery items
router.get('/gallery/items/category/:gallery_id', getGalleryItemsByCatID); // Get items by category ID
router.get('/gallery/items/:id', getGalleryItem); // Get a specific gallery item
router.post('/gallery/items', createGalleryItem); // Create a new gallery item
router.put('/gallery/items/:id', updateGalleryItem); // Update a gallery item
router.delete('/gallery/items/:id', deleteGalleryItem); // Delete a gallery item

module.exports = router;
