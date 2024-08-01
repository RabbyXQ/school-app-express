const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

// Ensure the directory exists
const ensureDirectoryExistence = async (dir) => {
    try {
        await fs.mkdir(dir, { recursive: true });
    } catch (error) {
        console.error(`Error creating directory at ${dir}:`, error);
        throw new Error('Failed to create directory');
    }
};

// Handle file upload
const uploadFile = async (file) => {
    if (!file) {
        throw new Error('No file provided');
    }

    const currentDate = new Date();
    const year = String(currentDate.getFullYear()); // Convert to string
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Convert to string
    const day = String(currentDate.getDate()).padStart(2, '0'); // Convert to string

    const uploadDir = path.join(__dirname, '../uploads', year, month, day);
    await ensureDirectoryExistence(uploadDir);

    const uniqueFileName = `${uuidv4()}_${file.originalname}`;
    const filePath = path.join(uploadDir, uniqueFileName);

    try {
        // Use fs.rename or fs.copyFile depending on the initial file storage
        await fs.rename(file.path, filePath);
    } catch (error) {
        console.error(`Error moving file from ${file.path} to ${filePath}:`, error);
        throw new Error('Failed to move file');
    }

    const fileUrl = `/uploads/${year}/${month}/${day}/${uniqueFileName}`;

    return { url: fileUrl };
};

module.exports = {
    uploadFile
};
