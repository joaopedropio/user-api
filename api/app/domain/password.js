const crypto = require('crypto');

const interations = 100000;
const keylen = 256;
const digest = 'sha512';
    
exports.hashPassword = (password, providedSalt) => {
    const salt = providedSalt || generateSalt();
    const hash = generateHash(password, salt, interations, keylen, digest);

    return {
        hash: hash,
        salt: salt
    };  
};

function generateHash(password, salt, interations, keylen, digest) {
    var key = crypto.pbkdf2Sync(password, salt, interations, keylen, digest);
    return key.toString('hex');
};

function generateSalt() {
    var key = crypto.randomBytes(keylen);
    return key.toString('hex');
};
