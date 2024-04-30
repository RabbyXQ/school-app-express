const express = require('express');
const router = express.Router();
const {sessionMiddleware} = require('../middlewares/sessionMiddleware');
const { requireLogin } = require('../middlewares/authMiddleware');
const session = require('express-session');

router.get('/dashboard',requireLogin, (req, res) => {
  console.log(req.session.userEmail);
  res.json({ message: 'Welcome to the dashboard!' });
  console.log(req.session.sessionId);
});


module.exports = router;