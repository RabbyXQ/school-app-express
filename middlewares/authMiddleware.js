const userModel = require('../model/user');


async function requireLogin(req, res) {
    try {
      const sessionId = req.cookies.sessionId;
  
      if (!sessionId) {
        return res.status(401).json({ error: 'Session cookie not found' });
      }
  
      // Check if session exists in the session store
      req.sessionStore.get(sessionId, async (err, session) => {
        if (err || !session || !session.userId) {
          return res.status(401).json({ error: 'Invalid session' });
        }
  
        res.json({ success: true, user });
        console.log('Session and cookie validated successfully');
        next();
      });
    } catch (error) {
      console.error('Error validating cookie:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  module.exports = { requireLogin };
  