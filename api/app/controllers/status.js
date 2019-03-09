const mongoose = require('mongoose');

module.exports = (req, res) => {
    (mongoose.connection.readyState == 1)
        ? res.status(200).json({ status: "OK"})
        : res.status(500).json({ status: "Unhealthy!"});
};