const userModel = require('../model/user');

async function requireLogin(req, res, next) {
  try {
    if (!req.session || !req.session.userEmail || !req.session.sessionId) {
      return res.status(401).json({ error: 'Invalid session' });
    }
    const user = await userModel.getUserByEmail(req.session.userEmail);
    if (!user || user.UserPass !== req.session.userPass) {
      return res.status(401).json({ error: 'Invalid session' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
  
  module.exports = { requireLogin };
  