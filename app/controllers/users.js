const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.listAll = (req, res) => {
    res.status(200);
    User.find().lean().exec(function (err, users) {
        console.log(JSON.stringify(users));
        res.json(users);
    });
};

exports.create = (req, res) => {
    const {
        name, address, phone, email, username, password, salt
    } = req.body;
    User.create({
        name: name,
        address: address,
        phone: phone,
        email: email,
        username: username,
        password: password,
        salt: salt
    }, (err, user) => {
        if(err) {
            res.status(400);
            res.json(err);
            } else {
            console.log(JSON.stringify(user));
            res.status(200);
            res.json(user);
        }
    });
}

exports.listOne = (req, res) => {
    const username = req.query.username;
    User.findOne({ 'username': username }, (err, user) => {
        if(err){
            console.log(JSON.stringify(err));
            res.status(400);
            res.json(err);
        } else {
            if(user){
                console.log(JSON.stringify(user));
                res.status(200);
                res.json(user);
            } else {
                res.status(404);
                res.json();
            }

        }
    });
};
exports.remove = () => {};
exports.update = () => {};