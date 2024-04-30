const pool = require('../config/db');

// Create Exam
async function createExam(examName, examDate, startTime, endTime) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        'INSERT INTO Exams (ExamName, ExamDate, StartTime, EndTime) VALUES (?, ?, ?, ?)',
        [examName, examDate, startTime, endTime]
      );
      connection.release();
      return result.insertId;
    } catch (error) {
      console.error('Error creating Exam:', error);
      connection.release();
      throw error;
    }
  }
  
  // Update Exam
  async function updateExam(examID, examName, examDate, startTime, endTime) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        'UPDATE Exams SET ExamName=?, ExamDate=?, StartTime=?, EndTime=? WHERE ExamID=?',
        [examName, examDate, startTime, endTime, examID]
      );
      connection.release();
      return result.affectedRows;
    } catch (error) {
      console.error('Error updating Exam:', error);
      connection.release();
      throw error;
    }
  }
  
  // Delete Exam
  async function deleteExam(examID) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        'DELETE FROM Exams WHERE ExamID=?',
        [examID]
      );
      connection.release();
      return result.affectedRows;
    } catch (error) {
      console.error('Error deleting Exam:', error);
      connection.release();
      throw error;
    }
  }
  
  module.exports = {
    createExam,
    updateExam,
    deleteExam,
  };
  