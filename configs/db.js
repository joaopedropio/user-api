const config = {};

config.domain = process.env.DB_DOMAIN || '127.0.0.1';
config.db = process.env.DB_NAME || 'UserAPI';

config.dbURI = 'mongodb://' + config.domain + '/' + config.db;

module.exports = config;