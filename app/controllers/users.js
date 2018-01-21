const User = require('mongoose').model('User');

exports.listAll = (req, res) => {
    User.find().lean().exec(function (err, users) {
        console.log(JSON.stringify(users));
        res.status(200).json(users);
    });
};

exports.create = (req, res) => {
    const user = req.body;
    User.create(user, (err, user) => {
        if(err) {
            res.status(400).json(err);
        } else {
            console.log(JSON.stringify(user));
            res.status(200).json(user);
        }
    });
};

exports.listOne = (req, res) => {
    const username = req.body.username;
    User.findOne({ 'username': username }, (err, user) => {
        if(err){
            console.log(JSON.stringify(err));
            res.status(400).json(err);
        } else {
            if(user){
                console.log(JSON.stringify(user));
                res.status(200).json(user);
            } else {
                res.status(404)
            }
        }
    });
};

exports.remove = (req, res) => {
    const username = req.body.username;
    User.deleteOne({ 'username': username }, (err, user) => {
        if(err){
            console.log(JSON.stringify(err));
            res.status(400).json(err);
        } else {
            res.status(204).json();
        }
    });
};

exports.update = () => {};