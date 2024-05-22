const pool = require('../config/db');



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

  async function createEventAttachment(){

  }
  
  async function updateEventAttachment(){
  
  }
  
  async function deleteEventAttachment()
  {
    
  }
  
  
  module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    createEventAttachment,
    updateEventAttachment,
    deleteEventAttachment
  };

  