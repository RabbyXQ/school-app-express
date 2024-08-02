const getBrief = async (connection) => {
    const [rows] = await connection.query('SELECT * FROM brief WHERE id = 1');
    return rows[0];
  };
  
  const updateBrief = async (connection, briefData) => {
    const { title, description, image, links_title, links_description, links_link } = briefData;
  
    await connection.query(`
      INSERT INTO brief (id, title, description, image, links_title, links_description, links_link)
      VALUES (1, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
          title = VALUES(title),
          description = VALUES(description),
          image = VALUES(image),
          links_title = VALUES(links_title),
          links_description = VALUES(links_description),
          links_link = VALUES(links_link)
    `, [title, description, image, links_title, links_description, links_link]);
  
    const [rows] = await connection.query('SELECT * FROM brief WHERE id = 1');
    return rows[0];
  };
  
  module.exports = { getBrief, updateBrief };
  