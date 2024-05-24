const pool = require('../config/db');



async function addEvent(eventName, eventDate, description) {
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

// Add Event Attachment
async function addEventAttachment(link, eventID, type) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      'INSERT INTO EventAttachment (Link, EventID, Type) VALUES (?, ?, ?)',
      [link, eventID, type]
    );
    connection.release();
    return result.insertId;
  } catch (error) {
    console.error('Error creating EventAttachment:', error);
    connection.release();
    throw error;
  }
}

// Update Event Attachment
async function updateEventAttachment(id, link, eventID, type) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      'UPDATE EventAttachment SET Link=?, EventID=?, Type=? WHERE ID=?',
      [link, eventID, type, id]
    );
    connection.release();
    return result.affectedRows;
  } catch (error) {
    console.error('Error updating EventAttachment:', error);
    connection.release();
    throw error;
  }
}

// Delete Event Attachment
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
    addEvent,
    updateEvent,
    deleteEvent,
    addEventAttachment,
    updateEventAttachment,
    deleteEventAttachment
  };

  