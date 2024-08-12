const express = require('express');
const {
  getAllFolderCats,
  getFolderCat,
  createFolderCatController,
  updateFolderCatController,
  deleteFolderCatController,
  getAllFolderItems,
  getFolderItemsByCatID,
  getFolderItem,
  createFolderItemController,
  updateFolderItemController,
  deleteFolderItemController
} = require('../controllers/folderController');

const router = express.Router();

// Folder Category Routes
router.get('/folder/categories', getAllFolderCats); // Get all folder categories
router.get('/folder/categories/:id', getFolderCat); // Get a specific folder category
router.post('/folder/categories', createFolderCatController); // Create a new folder category
router.put('/folder/categories/:id', updateFolderCatController); // Update a folder category
router.delete('/folder/categories/:id', deleteFolderCatController); // Delete a folder category

// Folder Item Routes
router.get('/folder/items', getAllFolderItems); // Get all folder items
router.get('/folder/items/category/:folder_id', getFolderItemsByCatID); // Get items by category ID
router.get('/folder/items/:id', getFolderItem); // Get a specific folder item
router.post('/folder/items', createFolderItemController); // Create a new folder item
router.put('/folder/items/:id', updateFolderItemController); // Update a folder item
router.delete('/folder/items/:id', deleteFolderItemController); // Delete a folder item

module.exports = router;
