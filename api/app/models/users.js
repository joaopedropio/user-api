const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    username: { type: String, required: true, index: { unique: true } },
    hash: { type: String, required: true },
    salt: { type: String, required: true },
    avatar: { type: String },
    createOn: { type: Date, "default": Date.now }
});
mongoose.model('User', userSchema, 'Users');