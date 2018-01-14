var config = {}

config.domain = process.env.API_DOMAIN || 'localhost';
config.port = process.env.API_PORT || 3000;

module.exports = config;