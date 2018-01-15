const express = require('express');
const router = express.Router();

const {
    create, listAll, listOne, remove, update
} = require('../controllers/users');

// User Routes
router.post('/create', create);
router.get('/listAll', listAll);
router.get('/listOne', listOne);
router.put('/update/:userId', update);
router.delete('/remove/:userId', remove);

module.exports = router;