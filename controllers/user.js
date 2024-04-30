const sessionMiddleware = require('../middlewares/sessionMiddleware');
const userModel = require('../model/user');


async function signup(req, res) {
    const {email, pass, type } = req.body;
  
    if (!email || !pass || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }else
    {
      if(userModel.userExist){
        return res.status(400).json({ error: 'User already exist' });
      }
    }
    try {
      const userId = await userModel.createUser(email, pass, type);
      console.log('User inserted successfully');
      res.json({ success: true, userId });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  async function login(req, res) {
    const { email, pass } = req.body;
  
    if (!email || !pass) {
      return res.status(400).json({ error: 'Missing email or password' });
    }
  
    try {
      const user = await userModel.verifyLogin(email, pass);
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      req.session.userEmail = user.UserEmail;
      req.session.userPass = user.UserPass;
      req.session.sessionId = req.sessionID;

      res.json({ success: true, user });
      console.log('User logged in successfully');
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async function logout(req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          return res.status(500).json({ error: 'Error logging out' });
        }
        res.clearCookie('connect.sid');
        res.json({ success: true, message: 'Logout successful' });
        console.log('User logged out successfully');
      });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }



module.exports = { signup, login, logout };