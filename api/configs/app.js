const domain = process.env.API_DOMAIN || 'localhost';
const port = process.env.API_PORT || '3000';
const url = `http://${domain}:${port}`;

exports.url = url;
exports.port = port;
exports.domain = domain;
