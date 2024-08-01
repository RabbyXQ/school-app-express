const pool = require('../config/db');

async function createUser(email, pass, type) {
  const connection = await pool.getConnection();
  const [result] = await connection.query(
    'INSERT INTO Users (UserEmail, UserPass, Type) VALUES (?, ?, ?)',
    [email, pass, type]
  );
  connection.release();
  return result.insertId; 
}

async function updateUser(newEmail, newPassword, newType, userId, oldEmail) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      'UPDATE Users SET UserEmail = ?, UserPass = ?, Type = ?, ID = ? WHERE UserEmail = ?',
      [newEmail, newPassword, newType, userId, oldEmail]
    );
    return result.affectedRows; // Return the number of affected rows
  } finally {
    connection.release();
  }
}

async function deleteUser(email) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      'DELETE FROM Users WHERE UserEmail = ?',
      [email]
    );
    return result.affectedRows; // Return the number of affected rows
  } finally {
    connection.release();
  }
}

async function getUserByEmail(email) {
  const connection = await pool.getConnection();
  const [rows] = await connection.query('SELECT * FROM Users WHERE UserEmail = ?', [email]);
  connection.release();
  return rows.length ? rows[0] : null; 
}

async function userExist(criteria, value) {
  const connection = await pool.getConnection();
  const [rows] = await connection.query(`SELECT * FROM Users WHERE ${criteria} = ?`, [value]);
  connection.release();
  return rows.length > 0; 
}

async function verifyLogin(email, password) {
  const connection = await pool.getConnection();
  const [rows] = await connection.query('SELECT * FROM Users WHERE UserEmail = ? AND UserPass = ?', [email, password]);
  connection.release();
  return rows.length ? rows[0] : null; 
}

module.exports = { createUser, userExist, getUserByEmail, verifyLogin };