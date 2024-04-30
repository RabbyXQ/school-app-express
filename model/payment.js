const pool = require('../config/db');

// Create Payment
async function createPayment(payerType, payerID, paymentDate, amount, description, method, number, trxID) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        'INSERT INTO Payments (PayerType, PayerID, PaymentDate, Amount, Description, Method, Number, TrxID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [payerType, payerID, paymentDate, amount, description, method, number, trxID]
      );
      connection.release();
      return result.insertId;
    } catch (error) {
      console.error('Error creating Payment:', error);
      connection.release();
      throw error;
    }
  }
  
  // Get Payment by ID
  async function getPaymentByID(paymentID) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT * FROM Payments WHERE PaymentID = ?',
        [paymentID]
      );
      connection.release();
      return rows.length ? rows[0] : null;
    } catch (error) {
      console.error('Error getting Payment by ID:', error);
      connection.release();
      throw error;
    }
  }
  
  // Update Payment
  async function updatePayment(paymentID, payerType, payerID, paymentDate, amount, description, method, number, trxID) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        'UPDATE Payments SET PayerType=?, PayerID=?, PaymentDate=?, Amount=?, Description=?, Method=?, Number=?, TrxID=? WHERE PaymentID=?',
        [payerType, payerID, paymentDate, amount, description, method, number, trxID, paymentID]
      );
      connection.release();
      return result.affectedRows;
    } catch (error) {
      console.error('Error updating Payment:', error);
      connection.release();
      throw error;
    }
  }
  
  // Delete Payment
  async function deletePayment(paymentID) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        'DELETE FROM Payments WHERE PaymentID=?',
        [paymentID]
      );
      connection.release();
      return result.affectedRows;
    } catch (error) {
      console.error('Error deleting Payment:', error);
      connection.release();
      throw error;
    }
  }
  
  // Get Payments by Payer Type and ID
  async function getPaymentsByPayer(payerType, payerID) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT * FROM Payments WHERE PayerType = ? AND PayerID = ?',
        [payerType, payerID]
      );
      connection.release();
      return rows;
    } catch (error) {
      console.error('Error getting Payments by Payer:', error);
      connection.release();
      throw error;
    }
  }

  // Get Payments by Date Range
async function getPaymentsByDate(startDate, endDate) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT * FROM Payments WHERE PaymentDate >= ? AND PaymentDate <= ?',
        [startDate, endDate]
      );
      connection.release();
      return rows;
    } catch (error) {
      console.error('Error getting Payments by date range:', error);
      connection.release();
      throw error;
    }
  }

  // Get Payments by User and Date Range
async function getPaymentsByUserAndDate(userID, startDate, endDate) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT * FROM Payments WHERE PayerID = ? AND PaymentDate >= ? AND PaymentDate <= ?',
        [userID, startDate, endDate]
      );
      connection.release();
      return rows;
    } catch (error) {
      console.error('Error getting Payments by user and date range:', error);
      connection.release();
      throw error;
    }
  }

  
  // Get Payments by User
async function getPaymentsByUser(userID) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT * FROM Payments WHERE PayerID = ?',
        [userID]
      );
      connection.release();
      return rows;
    } catch (error) {
      console.error('Error getting Payments by user:', error);
      connection.release();
      throw error;
    }
  }
  

  
  module.exports = {
    createPayment,
    getPaymentByID,
    updatePayment,
    deletePayment,
    getPaymentsByPayer,
  };
  