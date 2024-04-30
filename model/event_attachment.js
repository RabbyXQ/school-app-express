const pool = require('../config/db');

async function createEventAttachment(link, eventID) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        'INSERT INTO EventAttachment (Link, EventID) VALUES (?, ?)',
        [link, eventID]
      );
      connection.release();
      return result.insertId;
    } catch (error) {
      console.error('Error creating EventAttachment:', error);
      connection.release();
      throw error;
    }
  }
  
  async function updateEventAttachment(id, link, eventID) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        'UPDATE EventAttachment SET Link=?, EventID=? WHERE ID=?',
        [link, eventID, id]
      );
      connection.release();
      return result.affectedRows;
    } catch (error) {
      console.error('Error updating EventAttachment:', error);
      connection.release();
      throw error;
    }
  }
  
  async function deleteEventAttachment(id) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        'DELETE FROM EventAttachment WHERE ID=?',
        [id]
      );
      connection.release();
      return result.affectedRows;
    } catch (error) {
      console.error('Error deleting EventAttachment:', error);
      connection.release();
      throw error;
    }
  }
  
  module.exports = {
    createEventAttachment,
    updateEventAttachment,
    deleteEventAttachment,
  };
  