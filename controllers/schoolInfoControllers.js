const schoolInfoModel = require('../model/schoolInfoModel');
const { uploadFile } = require('../config/upload');

const getSchoolInfo = async (req, res) => {
    try {
        const info = await schoolInfoModel.getSchoolInfo();
        info.logo = info.logo;
        res.json(info);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve school information' });
    }
};


const uploadLogo = async(req, res) => {
    try{
        if (req.file) {
            const uploadResult = await uploadFile(req.file);
            res.json({ status: true, url: uploadResult.url });
        }
    }catch(error){
        res.status(500).json({ message: 'Failed To Upload Logo' });
    }
}

const updateSchoolInfo = async (req, res) => {
    try {
        const info = {
            siteName: req.body.site_name,
            description: req.body.description,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            logo: req.body.logo,
            facebook: req.body.facebook,
            twitter: req.body.twitter,
            instagram: req.body.instagram,
            linkedin: req.body.linkedin,
        };

        await schoolInfoModel.updateSchoolInfo(info);
        res.json({ message: 'School information updated successfully' });
    } catch (error) {
        console.error('Error updating school information:', error);  // Enhanced logging for debugging
        res.status(500).json({ message: 'Failed to update school information' });
    }
};



module.exports = {
    getSchoolInfo,
    updateSchoolInfo,
    uploadLogo
};
