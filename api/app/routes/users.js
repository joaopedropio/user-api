const router = require('express').Router();

const { createOne, listAll, listOne, removeOne, updateOne, changePassword
} = require('../controllers/users');

router.post('/', createOne);
router.get('/', listAll);
router.get('/:username', listOne);
router.put('/:username', updateOne);
router.delete('/:username', removeOne);

router.put('/:username/changePassword', changePassword);
module.exports = router;