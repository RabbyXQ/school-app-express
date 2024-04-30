const pool = require('../config/db');

// Create Event
async function createEvent(eventName, eventDate, description) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        'INSERT INTO Events (EventName, EventDate, Description) VALUES (?, ?, ?)',
        [eventName, eventDate, description]
      );
      connection.release();
      return result.insertId;
    } catch (error) {
      console.error('Error creating Event:', error);
      connection.release();
      throw error;
    }
  }
  
  // Update Event
  async function updateEvent(eventID, eventName, eventDate, description) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        'UPDATE Events SET EventName=?, EventDate=?, Description=? WHERE EventID=?',
        [eventName, eventDate, description, eventID]
      );
      connection.release();
      return result.affectedRows;
    } catch (error) {
      console.error('Error updating Event:', error);
      connection.release();
      throw error;
    }
  }
  
  // Delete Event
  async function deleteEvent(eventID) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        'DELETE FROM Events WHERE EventID=?',
        [eventID]
      );
      connection.release();
      return result.affectedRows;
    } catch (error) {
      console.error('Error deleting Event:', error);
      connection.release();
      throw error;
    }
  }
  
 // Delete Events by IDs
async function deleteEventsByIds(eventIDs) {
    const connection = await pool.getConnection();
    try {
      // Create a comma-separated string of placeholders for the IDs
      const placeholders = eventIDs.map(() => '?').join(',');
      
      // Construct the SQL query with the placeholders
      const sql = `DELETE FROM Events WHERE EventID IN (${placeholders})`;
      
      // Execute the query with the array of IDs as parameters
      const [result] = await connection.query(sql, eventIDs);
      
      connection.release();
      return result.affectedRows;
    } catch (error) {
      console.error('Error deleting Events by IDs:', error);
      connection.release();
      throw error;
    }
  }
  
  module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    deleteEventsByIds,
  };

  