const router = require('express').Router();

router.use('/', require('./status'));
router.use('/users', require('./users'));

module.exports = router;