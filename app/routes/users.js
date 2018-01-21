const router = require('express').Router();

const { create, listAll, listOne, remove, update
} = require('../controllers/users');

router.post('/create', create);
router.get('/listAll', listAll);
router.get('/listOne', listOne);
router.put('/update', update);
router.delete('/remove', remove);

module.exports = router;