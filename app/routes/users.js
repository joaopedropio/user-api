const router = require('express').Router();
const { create, listAll, listOne, remove, update } = require('../controllers/users');

router.post('/', create);
router.get('/', listAll);
router.get('/:username', listOne);
router.put('/:username', update);
router.delete('/:username', remove);

module.exports = router;