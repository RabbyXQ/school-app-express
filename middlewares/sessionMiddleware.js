const session = require('express-session');
const mysqlSession = require('express-mysql-session')(session);
const pool = require('../config/db');
const crypto = require('crypto');

const secretKey = crypto.randomBytes(32).toString('hex');

const sessionStore = new mysqlSession({}, pool);

const sessionMiddleware = session({
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    httpOnly: true,
    secure: false, // Set to true in production with HTTPS
    sameSite: 'strict',
  },
});

module.exports = sessionMiddleware;
