const domain = process.env.DB_DOMAIN || 'localhost';
const db = process.env.DB_NAME || 'UserAPI';

exports.dbURL = `mongodb://${domain}/${db}`;