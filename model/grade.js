const pool = require('../config/db');

async function calculateGradeByMarks(mark) {
  if (mark >= 80) {
      return 5.00; // A+
  } else if (mark >= 70) {
      return 4.00; // A
  } else if (mark >= 60) {
      return 3.50; // A-
  } else if (mark >= 50) {
      return 3.00; // B
  } else if (mark >= 40) {
      return 2.00; // C
  } else if (mark >= 33) {
      return 1.00; // D
  } else {
      return 0.00; // F
  }
}

function calculateCGPA(subjectGradePoints, credits) {
  let totalGradePoints = 0;
  let totalCredits = 0;

  for (let i = 0; i < subjectGradePoints.length; i++) {
      totalGradePoints += subjectGradePoints[i] * credits[i];
      totalCredits += credits[i];
  }

  const cgpa = totalGradePoints / totalCredits;
  return cgpa.toFixed(2); 
}


async function addGrade(studentID, subjectID, examID, marks, fullMarks, classID) {
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

async function deleteGrade(gradeID) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      'DELETE FROM Grades WHERE GradeID=?',
      [gradeID]
    );
    connection.release();
    return result.affectedRows; // Return the number of affected rows (should be 1 if successful)
  } catch (error) {
    console.error('Error deleting Grade:', error);
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

async function getFilteredGrades()
{

}



module.exports = {
  calculateCGPA,
  calculateGradeByMarks,
  addGrade,
  updateGrade,
  deleteGrade,
  getMarkSheet,
  getFilteredGrades
}


