const User = require('mongoose').model('User');
const Password = require('../domain/password');

exports.getAll = (callback) => {
    User.find().lean().exec(callback);
};

exports.get = (username, callback) => {
    return User.findOne({ 'username': username }, callback);
};

exports.put = (username, attributes, callback) => {
    User.findOneAndUpdate({ 'username': username }, attributes, callback);
};

exports.post = (user, callback) => {
    User.create(user, callback);
};

exports.delete = (username, callback) => {
    User.deleteOne({ 'username': username }, callback);
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

exports.isAuthentic = (username, password, callback) => {
    exports.get(username, (err, user) => {
        if(err) throw err;
        if(!user) return false;
        
        const persistedHash = user.hash;
        const providedHash = Password.hashPassword(password, user.salt);

        callback(persistedHash == providedHash.hash);
    });
};