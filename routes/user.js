const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { requireLogin } = require('../middlewares/authMiddleware');
const session = require('express-session');


router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.put('/update', requireLogin, userController.updateUser);
router.delete('/delete', requireLogin, userController.deleteUser);

router.get('/profile', requireLogin, (req, res) => {
    user = req.session.user;
    if (req.sessionID) {
      res.json({success: true, user});
    } 
  });


module.exports = router;