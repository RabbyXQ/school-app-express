const express = require('express');
const newsController = require('../controllers/newsControllers');

const router = express.Router();

router.post('/news', newsController.addNews);
router.get('/news/:id', newsController.getNewsByID);
router.put('/news/:id', newsController.updateNews);
router.delete('/news/:id', newsController.deleteNews);
router.get('/news', newsController.getAllNews);

module.exports = router;
