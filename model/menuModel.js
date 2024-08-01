const pool = require('../config/db'); // Ensure this uses mysql2/promise

// Model for Menu Class
const getAllClasses = async () => {
  try {
    const [results] = await pool.query('SELECT * FROM menu_class');
    return results;
  } catch (err) {
    throw new Error(`Error fetching classes: ${err.message}`);
  }
};

const getClassById = async (id) => {
  try {
    const [results] = await pool.query('SELECT * FROM menu_class WHERE id = ?', [id]);
    return results[0];
  } catch (err) {
    throw new Error(`Error fetching class: ${err.message}`);
  }
};

const createClass = async (name, menuType) => {
  try {
    const [results] = await pool.query('INSERT INTO menu_class (name, menu_type) VALUES (?, ?)', [name, menuType]);
    return results.insertId;
  } catch (err) {
    throw new Error(`Error creating class: ${err.message}`);
  }
};

const updateClass = async (id, name, menuType) => {
  try {
    const [results] = await pool.query('UPDATE menu_class SET name = ?, menu_type = ? WHERE id = ?', [name, menuType, id]);
    return results.affectedRows;
  } catch (err) {
    throw new Error(`Error updating class: ${err.message}`);
  }
};


const updateSection = async (id, name, classId, type, value) => {
  try {
    // Ensure id is included in the query
    const [results] = await pool.query(
      'UPDATE menu_section SET name = ?, class_id = ?, type = ?, value = ? WHERE id = ?',
      [name, classId, type, value, id]
    );
    return results.affectedRows;
  } catch (error) {
    throw new Error(`Error updating section: ${error.message}`);
  }
};


const deleteClass = async (id) => {
  try {
    const [results] = await pool.query('DELETE FROM menu_class WHERE id = ?', [id]);
    return results.affectedRows;
  } catch (err) {
    throw new Error(`Error deleting class: ${err.message}`);
  }
};

// Model for Menu Section
const getSectionsByClassId = async (classId) => {
  try {
    const [results] = await pool.query('SELECT * FROM menu_section WHERE class_id = ?', [classId]);
    return results;
  } catch (err) {
    throw new Error(`Error fetching sections: ${err.message}`);
  }
};

const createSection = async (classId, type, name, value) => {
  try {
    const [results] = await pool.query('INSERT INTO menu_section (class_id, type, name, value) VALUES (?, ?, ?, ?)', [classId, type, name, value]);
    return results.insertId;
  } catch (err) {
    throw new Error(`Error creating section: ${err.message}`);
  }
};

const deleteSection = async (id) => {
  try {
    const [results] = await pool.query('DELETE FROM menu_section WHERE id = ?', [id]);
    return results.affectedRows;
  } catch (err) {
    throw new Error(`Error deleting section: ${err.message}`);
  }
};

const getAllSectionsGroupedByType = async () => {
    try {
      const [results] = await pool.query(`
        SELECT 
          mc.menu_type AS menu_type,
          mc.id AS menu_id,
          mc.name AS menu_name,
          ms.id AS section_id,
          ms.name AS section_name,
          ms.type as section_type,
          ms.value AS section_value
        FROM 
          menu_class mc
        LEFT JOIN 
          menu_section ms 
        ON 
          mc.id = ms.class_id
        ORDER BY 
          mc.menu_type, mc.id, ms.id;
      `);
  
      // Process results to group by menu_type
      const groupedMenus = results.reduce((acc, row) => {
        if (!acc[row.menu_type]) {
          acc[row.menu_type] = [];
        }
  
        const menu = acc[row.menu_type].find(menu => menu.menu_id === row.menu_id);
        if (menu) {
          if (row.section_id) {
            menu.sections.push({
              section_id: row.section_id,
              section_type: row.section_type,
              section_name: row.section_name,
              section_value: row.section_value,
            });
          }
        } else {
          acc[row.menu_type].push({
            menu_id: row.menu_id,
            menu_name: row.menu_name,
            sections: row.section_id ? [{
              section_id: row.section_id,
              section_type: row.section_type,
              section_name: row.section_name,
              section_value: row.section_value,
            }] : [],
          });
        }
  
        return acc;
      }, {});
  
      // Convert grouped data to JSON
      const jsonResult = Object.keys(groupedMenus).map(menuType => ({
        menu_type: menuType,
        menus: groupedMenus[menuType],
      }));
  
      return jsonResult;
    } catch (err) {
      throw new Error(`Error fetching menus grouped by type: ${err.message}`);
    }
  };
  
  
  
  
  
  
  
module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  getSectionsByClassId,
  createSection,
  deleteSection,
  getAllSectionsGroupedByType,
  updateSection
};
