const express = require('express');
const router = express.Router();
const { requireLogin } = require('../middlewares/authMiddleware');

router.get('/dashboard', requireLogin, (req, res) => {
  res.json({ message: 'Welcome to the dashboard!' });
});


module.exports = router;