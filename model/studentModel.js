const connection = require('../config/db');

// Function to add a new student
const addStudent = async (studentData) => {
  const {
    student_name_bn,
    student_name_en,
    father_name_bn,
    father_name_en,
    father_mobile_no,
    mother_name_bn,
    mother_name_en,
    mother_mobile_no,
    guardian_name_en,
    guardian_name_bn,
    guardian_mobile_no,
    brid,
    date_of_birth,
    gender,
    religion,
    disability_status,
    student_mobile_no,
    blood_group,
    desired_class,
    previous_school,
    permanent_address_village,
    permanent_address_post_office,
    permanent_address_upazila,
    permanent_address_district,
    current_address_village,
    current_address_post_office,
    current_address_upazila,
    current_address_district,
    desired_study,
    desired_grade_for_admission,
    previous_grade_certificate,
    birth_certificate,
    parents_id_card,
    student_photo,
    status,
    session,
    dept  // New field added
  } = studentData;

  const query = `
    INSERT INTO students (
      student_name_bn, student_name_en, father_name_bn, father_name_en, father_mobile_no,
      mother_name_bn, mother_name_en, mother_mobile_no, guardian_name_en, guardian_name_bn,
      guardian_mobile_no, brid, date_of_birth, gender, religion, disability_status, student_mobile_no,
      blood_group, desired_class, previous_school, permanent_address_village,
      permanent_address_post_office, permanent_address_upazila, permanent_address_district,
      current_address_village, current_address_post_office, current_address_upazila,
      current_address_district, desired_study, desired_grade_for_admission,
      previous_grade_certificate, birth_certificate, parents_id_card, student_photo, status,
      session, dept
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    student_name_bn, student_name_en, father_name_bn, father_name_en, father_mobile_no,
    mother_name_bn, mother_name_en, mother_mobile_no, guardian_name_en, guardian_name_bn,
    guardian_mobile_no, brid, date_of_birth, gender, religion, disability_status, student_mobile_no,
    blood_group, desired_class, previous_school, permanent_address_village,
    permanent_address_post_office, permanent_address_upazila, permanent_address_district,
    current_address_village, current_address_post_office, current_address_upazila,
    current_address_district, desired_study, desired_grade_for_admission,
    previous_grade_certificate, birth_certificate, parents_id_card, student_photo, status,
    session, dept
  ];

  try {
    const [result] = await connection.query(query, values);
    return result;
  } catch (error) {
    console.error('Error adding student:', error);
    throw error;
  }
};

// Function to update an existing student
const updateStudent = async (id, studentData) => {
  const {
    student_name_bn,
    student_name_en,
    father_name_bn,
    father_name_en,
    father_mobile_no,
    mother_name_bn,
    mother_name_en,
    mother_mobile_no,
    guardian_name_en,
    guardian_name_bn,
    guardian_mobile_no,
    brid,
    date_of_birth,
    gender,
    religion,
    disability_status,
    student_mobile_no,
    blood_group,
    desired_class,
    previous_school,
    permanent_address_village,
    permanent_address_post_office,
    permanent_address_upazila,
    permanent_address_district,
    current_address_village,
    current_address_post_office,
    current_address_upazila,
    current_address_district,
    desired_study,
    desired_grade_for_admission,
    previous_grade_certificate,
    birth_certificate,
    parents_id_card,
    student_photo,
    status,
    session,
    dept  // New field added
  } = studentData;

  const query = `
    UPDATE students SET
      student_name_bn = ?, student_name_en = ?, father_name_bn = ?, father_name_en = ?, father_mobile_no = ?,
      mother_name_bn = ?, mother_name_en = ?, mother_mobile_no = ?, guardian_name_en = ?, guardian_name_bn = ?,
      guardian_mobile_no = ?, brid = ?, date_of_birth = ?, gender = ?, religion = ?, disability_status = ?, student_mobile_no = ?,
      blood_group = ?, desired_class = ?, previous_school = ?, permanent_address_village = ?,
      permanent_address_post_office = ?, permanent_address_upazila = ?, permanent_address_district = ?,
      current_address_village = ?, current_address_post_office = ?, current_address_upazila = ?,
      current_address_district = ?, desired_study = ?, desired_grade_for_admission = ?,
      previous_grade_certificate = ?, birth_certificate = ?, parents_id_card = ?, student_photo = ?, status = ?,
      session = ?, dept = ?
    WHERE id = ?
  `;
  const values = [
    student_name_bn, student_name_en, father_name_bn, father_name_en, father_mobile_no,
    mother_name_bn, mother_name_en, mother_mobile_no, guardian_name_en, guardian_name_bn,
    guardian_mobile_no, brid, date_of_birth, gender, religion, disability_status, student_mobile_no,
    blood_group, desired_class, previous_school, permanent_address_village,
    permanent_address_post_office, permanent_address_upazila, permanent_address_district,
    current_address_village, current_address_post_office, current_address_upazila,
    current_address_district, desired_study, desired_grade_for_admission,
    previous_grade_certificate, birth_certificate, parents_id_card, student_photo, status,
    session, dept, id
  ];

  try {
    const [result] = await connection.query(query, values);
    return result;
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

// Function to delete a student by ID
const deleteStudent = async (id) => {
  try {
    const [result] = await connection.query('DELETE FROM students WHERE id = ?', [id]);
    return result;
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};

// Function to get a student by ID
const getStudent = async (id) => {
  try {
    const [rows] = await connection.query('SELECT * FROM students WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Error getting student:', error);
    throw error;
  }
};

// Function to get all students with optional search and pagination
const getAllStudents = async (searchParams, page = 1, limit = 10) => {
  const conditions = [];
  const values = [];

  // Create search conditions
  Object.keys(searchParams).forEach((key) => {
    if (searchParams[key]) {
      conditions.push(`${key} LIKE ?`);
      values.push(`%${searchParams[key]}%`);
    }
  });

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const offset = (page - 1) * limit;
  const query = `
    SELECT * FROM students
    ${whereClause}
    ORDER BY id DESC
    LIMIT ? OFFSET ?
  `;
  values.push(limit, offset);

  try {
    const [rows] = await connection.query(query, values);
    const [countResult] = await connection.query(`SELECT COUNT(*) as count FROM students ${whereClause}`, values.slice(0, conditions.length));
    const totalItems = countResult[0].count;
    return {
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      items: rows
    };
  } catch (error) {
    console.error('Error getting all students:', error);
    throw error;
  }
};

module.exports = {
  addStudent,
  updateStudent,
  deleteStudent,
  getStudent,
  getAllStudents
};
