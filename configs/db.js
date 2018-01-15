const domain = process.env.DB_DOMAIN || '127.0.0.1';
const db = process.env.DB_NAME || 'UserAPI';

exports.dbURI = `mongodb://${domain}/${db}`;