const router = require('express').Router();

const { createOne, listAll, listOne, removeOne, updateOne, changePassword, checkAuthenticity
} = require('../controllers/users');

router.post('/', createOne);
router.get('/', listAll);
router.get('/:username', listOne);
router.put('/:username', updateOne);
router.delete('/:username', removeOne);

router.put('/:username/changePassword', changePassword);
router.get('/:username/checkAuthenticity', checkAuthenticity);
module.exports = router;