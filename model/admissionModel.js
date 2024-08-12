const connection = require("../config/db");

// Function to get all admissions with optional multiple field searches and pagination
const getAllAdmissions = async (searchFields = {}, page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM admissions';
    let queryParams = [];
    
    // Build dynamic query based on search fields
    const fieldClauses = [];
    for (const [field, value] of Object.entries(searchFields)) {
      // Sanitize field names to prevent SQL injection
      if (['student_name_bn', 'student_name_en', 'father_name_bn', 'father_name_en', 'mother_name_bn', 'mother_name_en', 'guardian_name_en', 'guardian_name_bn', 'brid', 'date_of_birth', 'gender', 'religion', 'disability_status', 'student_mobile_no', 'blood_group', 'desired_class', 'previous_school', 'permanent_address_village', 'permanent_address_post_office', 'permanent_address_upazila', 'permanent_address_district', 'current_address_village', 'current_address_post_office', 'current_address_upazila', 'current_address_district', 'desired_study', 'desired_grade_for_admission', 'previous_grade_certificate', 'birth_certificate', 'parents_id_card', 'student_photo', 'status', 'session'].includes(field)) {
        fieldClauses.push(`${field} LIKE ?`);
        queryParams.push(`%${value}%`);
      }
    }

    if (fieldClauses.length > 0) {
      query += ` WHERE ${fieldClauses.join(' AND ')}`;
    }

    query += ' ORDER BY id DESC LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);

    const [rows] = await connection.query(query, queryParams);
    const [countResult] = await connection.query('SELECT COUNT(*) as count FROM admissions');
    const totalItems = countResult[0].count;

    return {
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      items: rows
    };
  } catch (error) {
    console.error('Error getting all admissions:', error);
    throw error;
  }
};

const addAdmission = async (admissionData) => {
  try {
    const {
      student_name_bn, student_name_en, father_name_bn, father_name_en,
      father_mobile_no, mother_name_bn, mother_name_en, mother_mobile_no,
      guardian_name_en, guardian_name_bn, guardian_mobile_no, brid,
      date_of_birth, gender, religion, disability_status, student_mobile_no,
      blood_group, desired_class, previous_school, permanent_address_village,
      permanent_address_post_office, permanent_address_upazila, permanent_address_district,
      current_address_village, current_address_post_office, current_address_upazila,
      current_address_district, desired_study, desired_grade_for_admission,
      previous_grade_certificate, birth_certificate, parents_id_card, student_photo,
      status, session
    } = admissionData;

    const [result] = await connection.query(
      `INSERT INTO admissions (
        student_name_bn, student_name_en, father_name_bn, father_name_en,
        father_mobile_no, mother_name_bn, mother_name_en, mother_mobile_no,
        guardian_name_en, guardian_name_bn, guardian_mobile_no, brid,
        date_of_birth, gender, religion, disability_status, student_mobile_no,
        blood_group, desired_class, previous_school, permanent_address_village,
        permanent_address_post_office, permanent_address_upazila, permanent_address_district,
        current_address_village, current_address_post_office, current_address_upazila,
        current_address_district, desired_study, desired_grade_for_admission,
        previous_grade_certificate, birth_certificate, parents_id_card, student_photo,
        status, session
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        student_name_bn, student_name_en, father_name_bn, father_name_en,
        father_mobile_no, mother_name_bn, mother_name_en, mother_mobile_no,
        guardian_name_en, guardian_name_bn, guardian_mobile_no, brid,
        date_of_birth, gender, religion, disability_status, student_mobile_no,
        blood_group, desired_class, previous_school, permanent_address_village,
        permanent_address_post_office, permanent_address_upazila, permanent_address_district,
        current_address_village, current_address_post_office, current_address_upazila,
        current_address_district, desired_study, desired_grade_for_admission,
        previous_grade_certificate, birth_certificate, parents_id_card, student_photo,
        status, session
      ]
    );
    return result;
  } catch (error) {
    console.error('Error adding admission:', error);
    throw error;
  }
};

const updateAdmission = async (id, admissionData) => {
  try {
    const {
      student_name_bn, student_name_en, father_name_bn, father_name_en,
      father_mobile_no, mother_name_bn, mother_name_en, mother_mobile_no,
      guardian_name_en, guardian_name_bn, guardian_mobile_no, brid,
      date_of_birth, gender, religion, disability_status, student_mobile_no,
      blood_group, desired_class, previous_school, permanent_address_village,
      permanent_address_post_office, permanent_address_upazila, permanent_address_district,
      current_address_village, current_address_post_office, current_address_upazila,
      current_address_district, desired_study, desired_grade_for_admission,
      previous_grade_certificate, birth_certificate, parents_id_card, student_photo,
      status, session
    } = admissionData;

    const [result] = await connection.query(
      `UPDATE admissions SET
        student_name_bn = ?, student_name_en = ?, father_name_bn = ?, father_name_en = ?,
        father_mobile_no = ?, mother_name_bn = ?, mother_name_en = ?, mother_mobile_no = ?,
        guardian_name_en = ?, guardian_name_bn = ?, guardian_mobile_no = ?, brid = ?,
        date_of_birth = ?, gender = ?, religion = ?, disability_status = ?, student_mobile_no = ?,
        blood_group = ?, desired_class = ?, previous_school = ?, permanent_address_village = ?,
        permanent_address_post_office = ?, permanent_address_upazila = ?, permanent_address_district = ?,
        current_address_village = ?, current_address_post_office = ?, current_address_upazila = ?,
        current_address_district = ?, desired_study = ?, desired_grade_for_admission = ?,
        previous_grade_certificate = ?, birth_certificate = ?, parents_id_card = ?, student_photo = ?,
        status = ?, session = ?
      WHERE id = ?`,
      [
        student_name_bn, student_name_en, father_name_bn, father_name_en,
        father_mobile_no, mother_name_bn, mother_name_en, mother_mobile_no,
        guardian_name_en, guardian_name_bn, guardian_mobile_no, brid,
        date_of_birth, gender, religion, disability_status, student_mobile_no,
        blood_group, desired_class, previous_school, permanent_address_village,
        permanent_address_post_office, permanent_address_upazila, permanent_address_district,
        current_address_village, current_address_post_office, current_address_upazila,
        current_address_district, desired_study, desired_grade_for_admission,
        previous_grade_certificate, birth_certificate, parents_id_card, student_photo,
        status, session, id
      ]
    );
    return result;
  } catch (error) {
    console.error('Error updating admission:', error);
    throw error;
  }
};

const deleteAdmission = async (id) => {
  try {
    const [result] = await connection.query('DELETE FROM admissions WHERE id = ?', [id]);
    return result;
  } catch (error) {
    console.error('Error deleting admission:', error);
    throw error;
  }
};

const getAdmission = async (id) => {
  try {
    const [rows] = await connection.query('SELECT * FROM admissions WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Error getting admission:', error);
    throw error;
  }
};


module.exports = {
  getAllAdmissions,
  addAdmission,
  updateAdmission,
  deleteAdmission,
  getAdmission,
};
