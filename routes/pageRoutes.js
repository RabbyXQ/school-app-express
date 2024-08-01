const express = require('express');
const multer = require('multer');
const path = require('path'); // Add this line to import the 'path' module
const {
  handleAddPage,
  handleUpdatePage,
  handleDeletePage,
  handleGetPage,
  handleGetAllPages,
  handleUploadFile,
  handleGetPageBySlug
} = require('../controllers/pageControllers');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../temp_uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), handleUploadFile);
router.post('/add', handleAddPage);
router.put('/update/:id', handleUpdatePage);
router.delete('/delete/:id', handleDeletePage);
router.get('/get/:id', handleGetPage);
router.get('/get-all', handleGetAllPages);
router.get('/slug/:slug', handleGetPageBySlug);

module.exports = router;
