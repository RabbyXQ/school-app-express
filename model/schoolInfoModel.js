const db = require('../config/db');

const getSchoolInfo = async () => {
    try {
        const [rows] = await db.execute('SELECT * FROM school_info LIMIT 1');
        return rows[0];
    } catch (error) {
        console.error('Error fetching school info:', error);
        throw error;
    }
};

const updateSchoolInfo = async (info) => {
    const {
        siteName,
        description,
        long_description,
        email,
        phone,
        address,
        logo,
        image,
        facebook,
        twitter,
        instagram,
        linkedin,
        brief_section,
        slider_gallery
    } = info;

    const data = {
        siteName: siteName ?? null,
        description: description ?? null,
        long_description: long_description ?? null,
        email: email ?? null,
        phone: phone ?? null,
        address: address ?? null,
        logo: logo ?? null,
        image: image ?? null,
        facebook: facebook ?? null,
        twitter: twitter ?? null,
        instagram: instagram ?? null,
        linkedin: linkedin ?? null,
        brief_section: brief_section ?? null,
        slider_gallery: slider_gallery ?? null
    };

    try {
        await db.execute(`
            INSERT INTO school_info (id, site_name, description, long_description, email, phone, address, logo, image, facebook, twitter, instagram, linkedin, brief_section, slider_gallery)
            VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                site_name = VALUES(site_name),
                description = VALUES(description),
                long_description = VALUES(long_description),
                email = VALUES(email),
                phone = VALUES(phone),
                address = VALUES(address),
                logo = VALUES(logo),
                image = VALUES(image),
                facebook = VALUES(facebook),
                twitter = VALUES(twitter),
                instagram = VALUES(instagram),
                linkedin = VALUES(linkedin),
                brief_section = VALUES(brief_section),
                slider_gallery = VALUES(slider_gallery)
        `, [
            data.siteName,
            data.description,
            data.long_description,
            data.email,
            data.phone,
            data.address,
            data.logo,
            data.image,
            data.facebook,
            data.twitter,
            data.instagram,
            data.linkedin,
            data.brief_section,
            data.slider_gallery
        ]);
    } catch (error) {
        console.error('Error updating school info:', error);
        throw error;
    }
};
module.exports = {
    getSchoolInfo,
    updateSchoolInfo,
};
