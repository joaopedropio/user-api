const mongoose = require('mongoose');

module.exports = (req, res) => {
    if(mongoose.connection.readyState == 1) {
        res.status(200).json({ status: "OK"});
    } else {
        res.status(200).json({ status: "Unhealthy!"});
    }
};