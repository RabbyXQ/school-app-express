const path = require('path');
const { uploadFile } = require('../config/upload');
const studentModel = require('../model/studentModel');

// Handle file upload
const handleUploadFile = async (req, res) => {
  const { file } = req;
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  try {
    const uploadResult = await uploadFile(file);
    res.json({ status: true, url: uploadResult.url });
  } catch (error) {
    res.status(500).json({ message: 'Failed To Upload File' });
  }
};

// Add a new student
const handleAddStudent = async (req, res) => {
  const studentData = req.body;
  if (!studentData.student_name_bn || !studentData.student_name_en || !studentData.brid) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }
  try {
    await studentModel.addStudent(studentData);
    return res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to add student', error });
  }
};

// Update an existing student
const handleUpdateStudent = async (req, res) => {
  const { id } = req.params;
  const studentData = req.body;
  if (!studentData.student_name_bn || !studentData.student_name_en || !studentData.brid) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }
  try {
    await studentModel.updateStudent(id, studentData);
    return res.status(200).json({ message: 'Student updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update student', error });
  }
};

// Delete a student by ID
const handleDeleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    await studentModel.deleteStudent(id);
    return res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete student', error });
  }
};

// Get a student by ID
const handleGetStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await studentModel.getStudent(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve student', error });
  }
};

// Get all students with optional search and pagination
const handleGetAllStudents = async (req, res) => {
  const { page = 1, limit = 10, ...searchParams } = req.query;
  try {
    const result = await studentModel.getAllStudents(searchParams, parseInt(page), parseInt(limit));
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve students', error });
  }
};

module.exports = {
  handleUploadFile,
  handleAddStudent,
  handleUpdateStudent,
  handleDeleteStudent,
  handleGetStudent,
  handleGetAllStudents
};
