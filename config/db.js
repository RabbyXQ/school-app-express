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

    const createSchoolInfoTableSQL = `
      CREATE TABLE IF NOT EXISTS school_info (
        id INT AUTO_INCREMENT PRIMARY KEY,
        site_name VARCHAR(255) NOT NULL,
        description TEXT,
        long_description TEXT,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(20),
        address TEXT,
        logo VARCHAR(255),
        image VARCHAR(255),
        facebook VARCHAR(255),
        twitter VARCHAR(255),
        instagram VARCHAR(255),
        linkedin VARCHAR(255),
        brief_section VARCHAR(255),
        slider_gallery INT
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
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL
      );  
    `;

    await connection.query(createNoticeTable);

    const createNewsTable =`
      CREATE TABLE IF NOT EXISTS news(
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        news_date DATE DEFAULT CURRENT_DATE,
        content TEXT NOT NULL
      );
    `;

    await connection.query(createNewsTable);

    const createEventTable = `
      CREATE TABLE IF NOT EXISTS events(
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        gallery_id INT, 
        event_date DATE DEFAULT CURRENT_DATE,
        content TEXT NOT NULL
      )
    `

    await connection.query(createEventTable);

    const createHeadTable = `
      CREATE TABLE IF NOT EXISTS patron(
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        content TEXT NOT NULL 
      );
    `;

    await connection.query(createHeadTable);


    const createGalleryCat = `
    CREATE TABLE IF NOT EXISTS gallery_cat(
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255)
    );
    `;

    await connection.query(createGalleryCat);

    const createGallery = `
      CREATE TABLE IF NOT EXISTS gallery_item(
        id INT AUTO_INCREMENT PRIMARY KEY,
        gallery_id INT NOT NULL,
        image VARCHAR(255)
      );
    `;

    await connection.query(createGallery);

    const createClassTable = `
    CREATE TABLE IF NOT EXISTS classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
    );
    `;

    await connection.query(createClassTable);


    const createSectionTable = `
      CREATE TABLE IF NOT EXISTS sections(
        id INT AUTO_INCREMENT PRIMARY KEY,
        class_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        shift VARCHAR(255) NOT NULL
      );
    `;

    await connection.query(createSectionTable);

    const createTableSubjects = `
      CREATE TABLE IF NOT EXISTS subjects(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255)
      );
    `;

    await connection.query(createTableSubjects);

    const createSyllabusTable = `
      CREATE TABLE IF NOT EXISTS syllabus(
        id INT AUTO_INCREMENT PRIMARY KEY,
        class_id INT NOT NULL,
        year VARCHAR(255),
        page_slug VARCHAR(255)
      );
    
    `;

    await connection.query(createSyllabusTable);

    const createRoutineTable = `
      CREATE TABLE IF NOT EXISTS routines (
      id INT AUTO_INCREMENT PRIMARY KEY,
      day VARCHAR(20) NOT NULL,
      subject VARCHAR(100) NOT NULL,
      time_From TIME NOT NULL,
      time_To TIME NOT NULL,
      class_id INT NOT NULL,
      section_id INT NOT NULL,
      UNIQUE KEY unique_routine (day, time_from, class_id, section_id)
      );
    `;

    await connection.query(createRoutineTable);

    const createEmployeeTable = `
      CREATE TABLE IF NOT EXISTS employees(
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(255),
        active INT NOT NULL,
        name VARCHAR(255),
        phone VARCHAR(255),
        email VARCHAR(255),
        photo VARCHAR(255)
      );
    `
    await connection.query(createEmployeeTable);



    console.log('Tables created successfully.');
  } catch (error) {
    console.error('Error creating tables:', error.message);
  } finally {
    connection.release();
  }
};

createTableIfNotExists();

module.exports = pool;
