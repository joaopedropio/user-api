const router = require('express').Router();

router.use('/', require('./status'));
router.use('/', require('./users'));

module.exports = router;