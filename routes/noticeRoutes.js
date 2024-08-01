const express = require('express');
const noticeController = require('../controllers/noticeControllers');

const router = express.Router();

router.post('/notices', noticeController.createNotice);
router.get('/notices/:id', noticeController.getNotice);
router.put('/notices/:id', noticeController.updateNotice);
router.delete('/notices/:id', noticeController.deleteNotice);
router.get('/notices', noticeController.getAllNotices);

module.exports = router;
