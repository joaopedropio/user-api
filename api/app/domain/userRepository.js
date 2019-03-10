const User = require('mongoose').model('User');
const Password = require('../domain/password');
const fs = require('fs');

exports.getAll = async () => {
    try {
        return await User.find().select('username email name address phone').exec();
    } catch (error) {
        throw error;
    };
};

exports.get = async (username) => {
    try {
        return  await User.findOne({ 'username': username }).exec();
    } catch(error) {
        throw error;
    };
};

exports.put = async (username, attributes) => {
    try {
        return await User.findOneAndUpdate({ 'username': username }, attributes).exec();
    } catch(error) {
        throw error;
    };
};

exports.post = async (user) => {
    try {
        await User.create(user);
    } catch(error) {
        throw error;
    };
};

exports.delete = async (username) => {
    try {
        await User.deleteOne({ 'username': username });
    } catch (error) {
        throw error;
    };
};

exports.getResponseObject = (user) => {
    return {
        username: user.username,
        email: user.email,
        name: user.name,
        address: user.address,
        phone: user.phone
    };
};

exports.getResponseObjectWithAvatar = (user) => {
    return {
        username: user.username,
        email: user.email,
        name: user.name,
        address: user.address,
        phone: user.phone,
        avatar: user.avatar
    };
};

// Just an example on how to store image from base64 string
function storeImageFromBase64String(base64String) {
    const buffer = new Buffer.from(base64String, 'base64');
    fs.writeFile('./output.png', buffer, {}, (err) => { throw err; }); 
};

exports.isAuthentic = async (user, password) => {    
    const persistedHash = user.hash;
    const providedHash = (await Password.hashPassword(password, user.salt)).hash;

    return persistedHash == providedHash;
};

exports.changePassword = async (user, newPassword) => {
    const { hash, salt } = await Password.hashPassword(newPassword);
    user.hash = hash;
    user.salt = salt;

    return user;
};