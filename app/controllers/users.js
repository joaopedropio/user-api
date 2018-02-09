const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.listAll = (req, res) => {
    User.find().lean().exec((err, users) => {
        res.status(200).json(users);
    });
};

exports.create = (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
        (err) ? res.status(400).json(err)
              : res.status(200).json(user);
    });
};

exports.listOne = (req, res) => {
    const id = req.params.userId;
    User.findById(id, (err, user) => {
        if(err){
            res.status(400).json(err);
        } else {
            (user) ? res.status(200).json(user)
                   : res.status(404).json();
        }
    });
};

exports.remove = (req, res) => {
    const id = req.params.userId;
    User.findByIdAndRemove(id, (err, user) => {
        (err) ? res.status(400).json(err)
              : res.status(204).json(user);
    });
};

exports.update = (req, res) => {
    const id = req.params.userId;
    const attributes = req.body;
    User.findByIdAndUpdate(id, attributes, (err, user) => {
        (err) ? res.status(400).json(err)
              : res.status(200).json(user);
    })

};