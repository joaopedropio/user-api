const crypto = require('crypto');

const interations = 100000;
const keylen = 256;
const digest = 'sha512';
    
exports.hashPassword = (password, providedSalt) => {

    const salt = providedSalt || generateSalt();
    const key = crypto.pbkdf2Sync(password, salt, interations, keylen, digest);

    return {
        hash: key.toString('hex'),
        salt: salt
    };  
};

function generateSalt() {
    return crypto.randomBytes(keylen).toString('hex');
};
