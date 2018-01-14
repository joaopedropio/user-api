const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.listAll = (req, res) => {
    res.status(200);
    User.find().lean().exec(function (err, users) {
        console.log(JSON.stringify(users));
        return res.json(users);
    });
};

module.exports.create = (req, res) => {
    User.create({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        salt: req.body.salt
    }, (err, user) => {
        if(err) {
            res.status(400);
            res.json(err);
        } else {
            console.log(user);
            res.status(200);
            res.json(user);
        }
    });
}

/*
    res.status(200);
    //user = new User({ name: "joao", username: "manuel", password: "çlkjalkasdjf"})
    User.create({ 
        name: "Joao Pedro",
        address: "Rua Fulano de Tal, nº 666",
        username: "joaopedro",
        password: "lkjasflaksjflaksjf",
        salt: "slfkjasflkjasf",
    }, (err, user) => {
        console.log(user);
        return res.json(user);
    });
*/

module.exports.listOne = () => {};
module.exports.delete = () => {};
module.exports.update = () => {};