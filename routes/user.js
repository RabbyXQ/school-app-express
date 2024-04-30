const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// POST route for user sign-up
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

router.get('/profile', (req, res) => {

    if (req.sessionID) {
      res.json({ profile: 'User profile data' });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  });

module.exports = router;