const router = require('express').Router();

router.get('/', require('../controllers/status'));

module.exports = router;