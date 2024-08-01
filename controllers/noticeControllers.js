const noticeModel = require('../model/noticeModel');

const createNotice = async (req, res) => {
  const { title, content } = req.body;
  try {
    const result = await noticeModel.addNotice(title, content);
    res.status(201).json({ message: 'Notice created successfully', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating notice', error: error.message });
  }
};

const getNotice = async (req, res) => {
  const { id } = req.params;
  try {
    const notice = await noticeModel.getNoticeByID(id);
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    res.status(200).json(notice);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notice', error: error.message });
  }
};

const updateNotice = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const affectedRows = await noticeModel.updateNotice(id, title, content);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    res.status(200).json({ message: 'Notice updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating notice', error: error.message });
  }
};

const deleteNotice = async (req, res) => {
  const { id } = req.params;
  try {
    const affectedRows = await noticeModel.deleteNotice(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    res.status(200).json({ message: 'Notice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting notice', error: error.message });
  }
};

const getAllNotices = async (req, res) => {
const { page = 1, limit = 10 } = req.query;

  try {
    const notices = await noticeModel.getAllNotices(parseInt(page), parseInt(limit));
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notices', error: error.message });
  }
};


module.exports = {
  createNotice,
  getNotice,
  updateNotice,
  deleteNotice,
  getAllNotices,
};
