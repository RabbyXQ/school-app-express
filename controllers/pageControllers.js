const path = require('path');
const { uploadFile } = require('../config/upload');
const { addPage, updatePage, deletePage, getPage, getAllPages, getPageBySlug } = require('../model/pageModel');
const fs = require("fs");

const handleUploadFile = async (req, res) => {
  const { file } = req;
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  try{
    const uploadResult = await uploadFile(file);
    res.json({ status: true, url: uploadResult.url });
  }catch(error){
    res.status(500).json({ message: 'Failed To Upload Logo' });
  }
};


const handleAddPage = async (req, res) => {
  const { title, slug, content } = req.body;
  if (!title || !slug || !content) {
    return res.status(400).json({ message: 'Title, slug, and content are required' });
  }
  try {
    await addPage(title, slug, content);
    return res.status(201).json({ message: 'Page added successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to add page', error });
  }
};


const handleUpdatePage = async (req, res) => {
  const { id } = req.params;
  const { title, slug, content } = req.body;
  if (!title || !slug || !content) {
    return res.status(400).json({ message: 'Title, slug, and content are required' });
  }
  try {
    await updatePage(id, title, slug, content);
    return res.status(200).json({ message: 'Page updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update page', error });
  }
};

const handleDeletePage = async (req, res) => {
  const { id } = req.params;
  try {
    /*
    const page_items = await getPageFiles(id);
    page_items.forEach(element => {
        const fileDir = path.join(__dirname, element.link);
        fs.unlink(filePath, (err) => {
            if (err) {
              console.error('Error deleting file:', err);
              return res.status(500).json({ message: 'Error deleting file' });
            }
            res.status(200).json({ message: 'File deleted successfully' });
          });
    });
    */
    await deletePage(id);
    return res.status(200).json({ message: 'Page deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete page', error });
  }
};

const handleGetPage = async (req, res) => {
  const { id } = req.params;
  try {
    const page = await getPage(id);
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    return res.status(200).json(page);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve page', error });
  }
};

const handleGetPageBySlug = async(req, res)=>{
    const {slug} = req.params;
    try{
        const page = await getPageBySlug(slug);
        if(!page){
            return res.status(400).json({ message: "Page Not Found" });
        }
    return res.status(200).json(page);
    }catch(error){
        return res.status(500).json({message: 'Failed to retrieve page', error});
    }
}


const handleGetAllPages = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const result = await getAllPages(parseInt(page), parseInt(limit));
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve pages', error });
  }
};

module.exports = {
  handleUploadFile,
  handleAddPage,
  handleUpdatePage,
  handleDeletePage,
  handleGetPage,
  handleGetAllPages,
  handleGetPageBySlug
};
