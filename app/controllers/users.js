const User = require('mongoose').model('User');

exports.listAll = (req, res) => {
    User.find().lean().exec(function (err, users) {
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(users);
        }
    });
};

exports.createOne = (req, res) => {
    const user = req.body;
    User.create(user, (err, user) => {
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
            res.status(201).json(user);
        }
    });
};

exports.listOne = (req, res) => {
    const username = req.params.username;
    User.findOne({ 'username': username }, (err, user) => {
        if(err){
            res.status(400).json(err);
        } else {
            if(user){
                res.status(200).json(user);
            } else {
                res.status(404)
            }
        }
    });
};

exports.removeOne = (req, res) => {
    const username = req.params.username;
    User.deleteOne({ 'username': username }, (err, user) => {
        if(err){
            res.status(400).json(err);
        } else {
            res.status(204).json();
        }
    });
};

exports.updateOne = () => {};