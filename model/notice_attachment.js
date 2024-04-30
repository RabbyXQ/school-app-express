const pool = require('../config/db');


async function createNoticeAttachment(link, noticeID) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        'INSERT INTO NoticeAttachment (Link, NoticeID) VALUES (?, ?)',
        [link, noticeID]
      );
      connection.release();
      return result.insertId;
    } catch (error) {
      console.error('Error creating Notice Attachment:', error);
      connection.release();
      throw error;
    }
  }
  
  
  async function getNoticeAttachmentsByNoticeID(noticeID) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT * FROM NoticeAttachment WHERE NoticeID = ?',
        [noticeID]
      );
      connection.release();
      return rows;
    } catch (error) {
      console.error('Error getting Notice Attachments by NoticeID:', error);
      connection.release();
      throw error;
    }
  }
  
  // Update Notice Attachment
  async function updateNoticeAttachment(noticeAttachmentID, link, noticeID) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        'UPDATE NoticeAttachment SET Link=?, NoticeID=? WHERE ID=?',
        [link, noticeID, noticeAttachmentID]
      );
      connection.release();
      return result.affectedRows;
    } catch (error) {
      console.error('Error updating Notice Attachment:', error);
      connection.release();
      throw error;
    }
  }
  
  // Delete Notice Attachment
  async function deleteNoticeAttachment(noticeAttachmentID) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        'DELETE FROM NoticeAttachment WHERE ID=?',
        [noticeAttachmentID]
      );
      connection.release();
      return result.affectedRows;
    } catch (error) {
      console.error('Error deleting Notice Attachment:', error);
      connection.release();
      throw error;
    }
  }
  
  module.exports = {
    createNoticeAttachment,
    getNoticeAttachmentByID,
    getNoticeAttachmentsByNoticeID,
    updateNoticeAttachment,
    deleteNoticeAttachment,
  };
  