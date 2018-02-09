const router = require('express').Router();
const { create, listAll, listOne, remove, update } = require('../controllers/users');

router.post('/', create);
router.get('/', listAll);
router.get('/:userId', listOne);
router.put('/:userId', update);
router.delete('/:userId', remove);

module.exports = router;