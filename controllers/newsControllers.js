const newsModel = require('../model/newsModel');

const addNews = async (req, res) => {
    const { title, content } = req.body;
    try {
        const result = await newsModel.addNews(title, content);
        res.status(201).json({ message: 'News created successfully', result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create news' });
    }
};

const getNewsByID = async (req, res) => {
    const { id } = req.params;
    try {
        const news = await newsModel.getNewsByID(id);
        if (news) {
            res.status(200).json(news);
        } else {
            res.status(404).json({ error: 'News not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to get news' });
    }
};

const updateNews = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const affectedRows = await newsModel.updateNews(id, title, content);
        if (affectedRows > 0) {
            res.status(200).json({ message: 'News updated successfully' });
        } else {
            res.status(404).json({ error: 'News not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update news' });
    }
};

const deleteNews = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await newsModel.deleteNews(id);
        if (affectedRows > 0) {
            res.status(200).json({ message: 'News deleted successfully' });
        } else {
            res.status(404).json({ error: 'News not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete news' });
    }
};

const getAllNews = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const result = await newsModel.getAllNews(parseInt(page), parseInt(limit));
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get news' });
    }
};

module.exports = {
    addNews,
    getNewsByID,
    updateNews,
    deleteNews,
    getAllNews
};
