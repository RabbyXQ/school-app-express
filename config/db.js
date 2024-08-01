const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bhbss',
});

const createTableIfNotExists = async () => {
  const connection = await pool.getConnection();
  
  try {
    // Create school_info table if it doesn't exist
    const createSchoolInfoTableSQL = `
      CREATE TABLE IF NOT EXISTS school_info (
        id INT AUTO_INCREMENT PRIMARY KEY,
        site_name VARCHAR(255) NOT NULL,
        description TEXT,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(20),
        address TEXT,
        logo VARCHAR(255),
        facebook VARCHAR(255),
        twitter VARCHAR(255),
        instagram VARCHAR(255),
        linkedin VARCHAR(255)
      );
    `;
    await connection.query(createSchoolInfoTableSQL);

    // Create menu_class table if it doesn't exist
    const createMenuClassTableSQL = `
      CREATE TABLE IF NOT EXISTS menu_class (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        menu_type ENUM('top', 'mid', 'bot') NOT NULL
      );
    `;
    await connection.query(createMenuClassTableSQL);

    // Create menu_section table if it doesn't exist
    const createMenuSectionTableSQL = `
      CREATE TABLE IF NOT EXISTS menu_section (
        id INT AUTO_INCREMENT PRIMARY KEY,
        class_id INT,
        type ENUM('link', 'page') NOT NULL,
        name VARCHAR(255),
        value VARCHAR(255) NOT NULL,
        FOREIGN KEY (class_id) REFERENCES menu_class(id) ON DELETE CASCADE
      );
    `;
    await connection.query(createMenuSectionTableSQL);

    const createPageTable  = `
      CREATE TABLE IF NOT EXISTS pages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      content TEXT NOT NULL
    );
    `;
    await connection.query(createPageTable);

    const createNoticeTable = `
      CREATE TABLE IF NOT EXISTS notices(
        id INT AUTO_INCREMENT PRIMARY KEY,
        title varchar(255) NOT NULL,
        content TEXT NOT NULL
      );  
    `;

    await connection.query(createNoticeTable);

    console.log('Tables created successfully.');
  } catch (error) {
    console.error('Error creating tables:', error.message);
  } finally {
    connection.release();
  }
};

createTableIfNotExists();

module.exports = pool;
