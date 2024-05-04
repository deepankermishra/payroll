const crypto = require('crypto');

const generateSalt = () => crypto.randomBytes(16).toString('hex');

const hashPassword = (password) => {
    const salt = generateSalt();
    const derivedKey = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512');
    return `${salt}:${derivedKey.toString('hex')}`;
};

const verifyPassword = (storedHash, password) => {
    const [salt, key] = storedHash.split(':');
    const derivedKey = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512');
    return key === derivedKey.toString('hex');
};

module.exports = { hashPassword, verifyPassword };
