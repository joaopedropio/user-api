const express = require('express');
const router = express.Router();

const status = require('../controllers/status');

router.get('/', status);

module.exports = router;