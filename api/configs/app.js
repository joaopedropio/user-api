const domain = process.env.API_DOMAIN || 'localhost';
const port = process.env.API_PORT || '3000';
const url = `http://${domain}:${port}`;
const jsonLimitSize = process.env.JSON_LIMIT_SIZE || '50mb';

const dbDomain = process.env.DB_DOMAIN || 'localhost';
const dbName = process.env.DB_NAME || 'UserAPI';

exports.dbURL = `mongodb://${dbDomain}/${dbName}`;
exports.url = url;
exports.port = port;
exports.domain = domain;
exports.jsonLimitSize = jsonLimitSize;
