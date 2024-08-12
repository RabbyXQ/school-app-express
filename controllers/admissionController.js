const admissionModel = require('../model/admissionModel');

// Controller to handle fetching all admissions with optional search and pagination
const handleGetAllAdmissions = async (req, res) => {
  const { page = 1, limit = 10, ...searchFields } = req.query;
  try {
    const result = await admissionModel.getAllAdmissions(searchFields, parseInt(page), parseInt(limit));
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve admissions', error });
  }
};

// Controller to handle adding a new admission
const handleAddAdmission = async (req, res) => {
  const admissionData = req.body;
  try {
    await admissionModel.addAdmission(admissionData);
    return res.status(201).json({ message: 'Admission added successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to add admission', error });
  }
};

// Controller to handle updating an existing admission
const handleUpdateAdmission = async (req, res) => {
  const { id } = req.params;
  const admissionData = req.body;
  try {
    await admissionModel.updateAdmission(parseInt(id), admissionData);
    return res.status(200).json({ message: 'Admission updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update admission', error });
  }
};

// Controller to handle deleting an admission
const handleDeleteAdmission = async (req, res) => {
  const { id } = req.params;
  try {
    await admissionModel.deleteAdmission(parseInt(id));
    return res.status(200).json({ message: 'Admission deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete admission', error });
  }
};

// Controller to handle fetching a single admission by ID
const handleGetAdmission = async (req, res) => {
  const { id } = req.params;
  try {
    const admission = await admissionModel.getAdmission(parseInt(id));
    if (!admission) {
      return res.status(404).json({ message: 'Admission not found' });
    }
    return res.status(200).json(admission);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve admission', error });
  }
};

module.exports = {
  handleGetAllAdmissions,
  handleAddAdmission,
  handleUpdateAdmission,
  handleDeleteAdmission,
  handleGetAdmission
};
