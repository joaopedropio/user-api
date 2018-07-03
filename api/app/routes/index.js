const router = require('express').Router();

router.use('/', require('./status'));
router.use('/users', require('./users'));
router.use('/docs', require('./swagger'));

module.exports = router;