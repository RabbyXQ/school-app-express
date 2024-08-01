const db = require('../config/db');

const getSchoolInfo = async () => {
    const [rows] = await db.execute('SELECT * FROM school_info LIMIT 1');
    return rows[0];
};

const updateSchoolInfo = async (info) => {
    const {
        siteName,
        description,
        email,
        phone,
        address,
        logo,
        facebook,
        twitter,
        instagram,
        linkedin
    } = info;

    const data = {
        siteName: siteName ?? null,
        description: description ?? null,
        email: email ?? null,
        phone: phone ?? null,
        address: address ?? null,
        logo: logo ?? null,
        facebook: facebook ?? null,
        twitter: twitter ?? null,
        instagram: instagram ?? null,
        linkedin: linkedin ?? null
    };

    await db.execute(`
        INSERT INTO school_info (id, site_name, description, email, phone, address, logo, facebook, twitter, instagram, linkedin)
        VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            site_name = VALUES(site_name),
            description = VALUES(description),
            email = VALUES(email),
            phone = VALUES(phone),
            address = VALUES(address),
            logo = VALUES(logo),
            facebook = VALUES(facebook),
            twitter = VALUES(twitter),
            instagram = VALUES(instagram),
            linkedin = VALUES(linkedin)
    `, [
        data.siteName,
        data.description,
        data.email,
        data.phone,
        data.address,
        data.logo,
        data.facebook,
        data.twitter,
        data.instagram,
        data.linkedin
    ]);
};

module.exports = {
    getSchoolInfo,
    updateSchoolInfo,
};
