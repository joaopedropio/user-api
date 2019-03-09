const User = require('../domain/userRepository');
const Password = require('../domain/password');

exports.listAll = (req, res) => {
    User.getAll((err, users) => {
        (err)? res.status(400).json(err)
             : res.status(200).json(users.map(User.getResponseObject));
    });
};

exports.createOne = (req, res) => {
    let user = req.body;
    const { hash, salt } = Password.hashPassword(user.password)
    user.hash = hash;
    user.salt = salt;
    User.post(user,(err, createdUser) => {
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
            res.status(201).json();
        }
    })
};

exports.listOne = (req, res) => {
    const username = req.params.username;
    User.get(username, (err, user) => {
        if (err) throw err;

        (user) ? res.status(200).json(User.getResponseObject(user))
               : res.status(404).json();
    });
};

exports.removeOne = (req, res) => {
    const username = req.params.username;
    User.delete(username, (err) => {
        (err) ? res.status(400).json(err)
              : res.status(204).json();
    })
};

exports.updateOne = (req, res) => {
    const username = req.params.username;
    const attributes = req.body;
    User.put(username, attributes, (err, user) => {
        (err) ? res.status(400).json(err)
              : res.status(201).json();
    })
};

exports.changePassword = (req, res) => {
    const username = req.params.username;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    User.get(username, (err, user) => {
        if(err) throw err;
        if(!user) return res.status(400).json({ error: "User does not exits"});

        const persistedHash = user.hash;
        const providedHash = Password.hashPassword(oldPassword, user.salt);

        if(persistedHash == providedHash.hash) {
            const { hash, salt } = Password.hashPassword(newPassword);
            user.hash = hash;
            user.salt = salt;
            User.put(user.username, user, (errr, newUser) => {
                if(errr) throw errr;
    
                (newUser) ? res.status(201).json()
                          : res.status(500).json({ error: "Something went wrong when trying to persist user" });
            });
        } else {
            res.status(401).json({ error: "The password provided is invalid" });
        }
    });
};

exports.checkAuthenticity = (req, res) => {
    const username = req.params.username;
    const password = req.query.password;

    User.isAuthentic(username, password, (result) => {
        if (result) {
            res.status(200).json();
        } else {
            res.status(400).json();
        }
    });
};