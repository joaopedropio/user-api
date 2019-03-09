const User = require('mongoose').model('User');
const Password = require('../domain/password');

exports.listAll = (req, res) => {
    User.find().lean().exec(function (err, users) {
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(users.map(getResponseUserObject));
        }
    });
};

exports.createOne = (req, res) => {
    let user = req.body;
    const { hash, salt } = Password.hashPassword(user.password)
    user.password = hash;
    user.salt = salt;
    User.create(user, (err, createdUser) => {
        if(err) {
            switch (err.code) {
                // Duplicate key error collection
                case 11000:
                    res.status(409).json(err);
                    break;
                default:
                    res.status(400).json(err);
                    break;
            }
        } else {
            res.status(201).json(getResponseUserObject(createdUser));
        }
    });
};

function getUser (username, callback) {
    return User.findOne({ 'username': username }, callback);
};

exports.listOne = (req, res) => {
    const username = req.params.username;
    getUser(username, (err, user) => {
        if (err) throw err;

        (user) ? res.status(200).json(getResponseUserObject(user))
               : res.status(404).json();
    });
};

exports.removeOne = (req, res) => {
    const username = req.params.username;
    User.deleteOne({ 'username': username }, (err) => {
        if(err){
            res.status(400).json(err);
        } else {
            res.status(204).json();
        }
    });
};

function putUser(username, attributes, callback) {
    User.findOneAndUpdate({ 'username': username }, attributes, callback);
};

exports.updateOne = (req, res) => {
    const username = req.params.username;
    const attributes = req.body;
    User.findOneAndUpdate({ 'username': username }, attributes, (err, user) => {
        (err) ? res.status(400).json(err)
              : res.status(200).json(getResponseUserObject(user));
    });
};

exports.changePassword = (req, res) => {
    const username = req.params.username;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    getUser(username, (err, user) => {
        if(err) throw err;
        const persistedHash = user.password;
        const providedHash = Password.hashPassword(oldPassword, user.salt);

        if(persistedHash == providedHash.hash) {
            const { hash, salt } = Password.hashPassword(newPassword);
            user.password = hash;
            user.salt = salt;
            putUser(user.username, user, (err, newUser) => {
                if(err) throw err;
    
                (newUser) ? res.status(200).json(getResponseUserObject(newUser))
                          : res.status(400).json("deu algum ruim na hora de guardar o usuario");
            });
    
        } else {
            res.status(400).json("a senha fornecida é inválida")
        }
    });
};

function getResponseUserObject(user) {
    return {
        name: user.name,
        address: user.address,
        phone: user.phone,
        email: user.email,
        username: user.username
    };
};