const router = require('express').Router();

const { createOne, listAll, listOne, removeOne, updateOne
} = require('../controllers/users');

router.post('/', createOne);
router.get('/', listAll);
router.get('/:username', listOne);
router.put('/:username', updateOne);
router.delete('/:username', removeOne);
module.exports = router;