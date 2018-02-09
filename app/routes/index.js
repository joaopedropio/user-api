const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/', require('./status'));
router.use('/api-docs', require('./swagger'));

module.exports = router;