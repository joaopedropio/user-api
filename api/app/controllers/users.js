const User = require('../domain/userRepository');
const Password = require('../domain/password');

exports.listAll = async (_, res) => {
    var users;
    try {
        users = await User.getAll();
        return res.status(200).json(users.map(User.getResponseObject));
    } catch(error) {
        return res.status(400).json(error);
    }
};

exports.createOne = async (req, res) => {
    let user = req.body;
    const { hash, salt } = await Password.hashPassword(user.password)
    user.hash = hash;
    user.salt = salt;

    try {
        await User.post(user);
        return res.status(201).json();
    } catch(error) {
        switch (error.code) {
            // Duplicate key error collection
            case 11000:
                return res.status(409).json(error);
            default:
                return res.status(400).json(error);
        }
    };
};

exports.listOne = async (req, res) => {
    const username = req.params.username;
    var user;
    try {
        user = await User.get(username);
    } catch(error) {
        throw error;
    };

    (user) ? res.status(200).json(User.getResponseObject(user))
           : res.status(404).json();
};

exports.removeOne = async (req, res) => {
    const username = req.params.username;
    const user = await User.get(username);
    if(!user) return res.status(404).json({ error: "User does not exist"});

    try {
        await User.delete(username);
        return res.status(204).json();
    } catch(error) {
        return res.status(400).json(error);
    };
};

exports.updateOne = async (req, res) => {
    const username = req.params.username;
    const attributes = req.body;
    try {
        await User.put(username, attributes);
        return res.status(201).json();
    } catch(error) {
        return res.status(400).json(error);
    }
};

exports.changePassword = async (req, res) => {
    const username = req.params.username;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    let user = await User.get(username);
    if(!user) return res.status(404).json({ error: "User does not exist"});

    var isAuthentic;
    try {
        isAuthentic = await User.isAuthentic(user, oldPassword)
    } catch (error) {
        return res.status(500).json(error);
    }

    if(isAuthentic) {
        var userWithNewPassword = await User.changePassword(user, newPassword);

        try {
            await User.put(username, userWithNewPassword);
            return res.status(201).json()
        } catch(error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(401).json({ error: "The password provided is invalid" });
    }
};

exports.checkAuthenticity = async (req, res) => {
    const username = req.params.username;
    const password = req.query.password;

    let user = await User.get(username);
    if(!user) return res.status(204).json({ error: "User does not exist"});

    var result;
    try {
        result = await User.isAuthentic(user, password);
    } catch(error) {
        return res.status(500).json(error);
    }

    (result)
        ? res.status(200).json()
        : res.status(400).json();
};
