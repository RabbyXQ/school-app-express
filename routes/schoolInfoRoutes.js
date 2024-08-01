const express = require('express');
const multer = require('multer');
const path = require('path');
const { getSchoolInfo, updateSchoolInfo, uploadLogo } = require('../controllers/schoolInfoControllers');

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

router.get('/school-info', getSchoolInfo);
router.post('/school-info', updateSchoolInfo);
router.post('/school-info/upload-logo', upload.single('file'), uploadLogo)
module.exports = router;
