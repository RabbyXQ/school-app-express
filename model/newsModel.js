const connection = require("../config/db");

const addNews = async(title, content)=>{
    try{
    const [result] = await connection.query(
        'INSERT INTO news (title, content) VALUES (?, ?)',
        [title, content]
        );
        return result;
    }catch(error){
        console.error('Error creating Notice:', error);
        throw error;
    }
}

const getNewsByID = async (id) => {
    try {
      const [rows] = await connection.query(
        'SELECT * FROM news WHERE id = ?',
        [id]
      );
      return rows[0];
    } catch (error) {
      console.error('Error getting News by ID:', error);
      throw error;
    }
  };


const updateNews = async (id, title, content) => {
try {
    const [result] = await connection.query(
    'UPDATE news SET title = ?, content = ? WHERE id = ?',
    [title, content, id]
    );
    return result.affectedRows;
} catch (error) {
    console.error('Error updating News:', error);
    throw error;
}
};


const deleteNews = async (id) => {
    try {
      const [result] = await connection.query(
        'DELETE FROM news WHERE id = ?',
        [id]
      );
      return result.affectedRows;
    } catch (error) {
      console.error('Error deleting Notice:', error);
      throw error;
    }
  };

  const getAllNews = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit; 
    try {
      const [rows] = await connection.query('SELECT id, title, news_date FROM news ORDER BY id DESC LIMIT ? OFFSET ? ', [limit, offset]);
      const [countResult] = await connection.query('SELECT COUNT(*) as count FROM news');
      const totalItems = countResult[0].count;
      return {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
        items: rows
      };
    } catch (error) {
      console.error('Error getting all News:', error);
      throw error;
    }
  }; 

module.exports = {
    addNews,
    getNewsByID,
    getAllNews,
    updateNews,
    deleteNews
}