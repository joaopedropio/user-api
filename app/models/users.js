const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    createOn: { type: Date, "default": Date.now }
});

mongoose.model('User', userSchema, 'Users');