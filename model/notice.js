const pool = require('../config/db');

// Create Notice
async function createNotice(title, description, postedBy, expiryDate, isActive, thumbnail) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        'INSERT INTO Notices (Title, Description, PostedBy, PostedDate, ExpiryDate, IsActive, Thumbnail) VALUES (?, ?, ?, NOW(), ?, ?, ?)',
        [title, description, postedBy, expiryDate, isActive, thumbnail]
      );
      connection.release();
      return result.insertId;
    } catch (error) {
      console.error('Error creating Notice:', error);
      connection.release();
      throw error;
    }
  }
  
  // Get Notice by ID
  async function getNoticeByID(noticeID) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT * FROM Notices WHERE NoticeID = ?',
        [noticeID]
      );
      connection.release();
      return rows.length ? rows[0] : null;
    } catch (error) {
      console.error('Error getting Notice by ID:', error);
      connection.release();
      throw error;
    }
  }
  
  // Update Notice
  async function updateNotice(noticeID, title, description, expiryDate, isActive, thumbnail) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        'UPDATE Notices SET Title=?, Description=?, ExpiryDate=?, IsActive=?, Thumbnail=? WHERE NoticeID=?',
        [title, description, expiryDate, isActive, thumbnail, noticeID]
      );
      connection.release();
      return result.affectedRows;
    } catch (error) {
      console.error('Error updating Notice:', error);
      connection.release();
      throw error;
    }
  }
  
  // Delete Notice
  async function deleteNotice(noticeID) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        'DELETE FROM Notices WHERE NoticeID=?',
        [noticeID]
      );
      connection.release();
      return result.affectedRows;
    } catch (error) {
      console.error('Error deleting Notice:', error);
      connection.release();
      throw error;
    }
  }
  
  // Get All Notices
  async function getAllNotices() {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM Notices');
      connection.release();
      return rows;
    } catch (error) {
      console.error('Error getting all Notices:', error);
      connection.release();
      throw error;
    }
  }

  // Get Notices by Creator
async function getNoticesByCreator(creatorID) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT * FROM Notices WHERE PostedBy = ?',
        [creatorID]
      );
      connection.release();
      return rows;
    } catch (error) {
      console.error('Error getting Notices by Creator:', error);
      connection.release();
      throw error;
    }
  }
  
  
  module.exports = {
    createNotice,
    getNoticeByID,
    updateNotice,
    deleteNotice,
    getAllNotices,
    getNoticesByCreator
  };

  