const pool = require('../config/db');




async function createGrade(studentID, subjectID, examID, marks, fullMarks, classID) {
  const connection = await pool.getConnection();
  try {
    const calculatedGrade = calculateGradeByMarks(marks, fullMarks);

    const [result] = await connection.query(
      'INSERT INTO Grades (StudentID, SubjectID, Grade, ExamID, Marks, FullMarks, ClassID) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [studentID, subjectID, calculatedGrade, examID, marks, fullMarks, classID]
    );
    connection.release();
    return result.insertId;
  } catch (error) {
    console.error('Error creating Grade:', error);
    connection.release();
    throw error;
  }
}

async function updateGrade(gradeID, studentID, subjectID, examID, marks, fullMarks, classID) {
  const connection = await pool.getConnection();
  try {
    const calculatedGrade = calculateGradeByMarks(marks, fullMarks);

    const [result] = await connection.query(
      'UPDATE Grades SET StudentID=?, SubjectID=?, Grade=?, ExamID=?, Marks=?, FullMarks=?, ClassID=? WHERE GradeID=?',
      [studentID, subjectID, calculatedGrade, examID, marks, fullMarks, classID, gradeID]
    );
    connection.release();
    return result.affectedRows;
  } catch (error) {
    console.error('Error updating Grade:', error);
    connection.release();
    throw error;
  }
}

async function getMarkSheet(studentID, examID) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      'SELECT * FROM Grades WHERE StudentID=? AND ExamID=?',
      [studentID, examID]
    );
    connection.release();
    return rows;
  } catch (error) {
    console.error('Error fetching Marksheet:', error);
    connection.release();
    throw error;
  }
}

async function getGradesByClassAndSubject(classID, subjectID) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      'SELECT * FROM Grades WHERE ClassID = ? AND SubjectID = ?',
      [classID, subjectID]
    );
    connection.release();
    return rows;
  } catch (error) {
    console.error('Error getting grades by class and subject:', error);
    connection.release();
    throw error;
  }
}

async function getGradesByClassAndExam(classID, examID) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      'SELECT * FROM Grades WHERE ClassID = ? AND ExamID = ?',
      [classID, examID]
    );
    connection.release();
    return rows;
  } catch (error) {
    console.error('Error getting grades by class and exam:', error);
    connection.release();
    throw error;
  }

}


