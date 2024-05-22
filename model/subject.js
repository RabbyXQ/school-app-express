const pool = reuqire('../config/db.js');

async function createSubject(subjectName, classID) {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query(
            'INSERT INTO Subjects (SubjectName, ClassID) VALUES (?, ?)',
            [subjectName, classID]
        );
        connection.release();
        return result.insertId;
    } catch (error) {
        console.error('Error creating Subject:', error);
        connection.release();
        throw error;
    }
}

async function getSubject(subjectID) {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(
            'SELECT * FROM Subjects WHERE SubjectID = ?',
            [subjectID]
        );
        connection.release();
        return rows.length ? rows[0] : null;
    } catch (error) {
        console.error('Error getting Subject by ID:', error);
        connection.release();
        throw error;
    }
}

async function updateSubject(subjectID, subjectName, classID) {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query(
            'UPDATE Subjects SET SubjectName=?, ClassID=? WHERE SubjectID=?',
            [subjectName, classID, subjectID]
        );
        connection.release();
        return result.affectedRows;
    } catch (error) {
        console.error('Error updating Subject:', error);
        connection.release();
        throw error;
    }
}

async function deleteSubject(subjectID) {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query(
            'DELETE FROM Subjects WHERE SubjectID=?',
            [subjectID]
        );
        connection.release();
        return result.affectedRows;
    } catch (error) {
        console.error('Error deleting Subject:', error);
        connection.release();
        throw error;
    }
}

async function getSubjects()
{

}

module.exports = {
    createSubject,
    updateSubject,
    deleteSubject,
    getSubject,
    getSubjects
}
