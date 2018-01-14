var express = require('express');
var ctrlUsers = require('../controllers/users');
var router = express.Router();

// User Routes
router.post('/', ctrlUsers.create)
router.get('/', ctrlUsers.listAll);
router.get('/:userId', ctrlUsers.listOne);
router.put('/:userId', ctrlUsers.update);
router.delete('/:userId', ctrlUsers.delete);

module.exports = router;