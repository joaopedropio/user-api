const crypto = require('crypto');

const interations = 100000;
const keylen = 256;
const digest = 'sha512';
    
exports.hashPassword = async (password, providedSalt) => {
    const salt = providedSalt || await generateSalt();
    const hash = await generateHash(password, salt, interations, keylen, digest);

    return {
        hash: hash,
        salt: salt
    };  
};

function generateHash(password, salt, interations, keylen, digest) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, interations, keylen, digest, (err, key) => {
            if (err) reject(err);
            else resolve(key.toString('hex'));
        });
    })
};

function generateSalt() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(keylen, (err, buf) => {
            if (err) reject(err);
            else resolve(buf.toString('hex'));
        });
    })
};
