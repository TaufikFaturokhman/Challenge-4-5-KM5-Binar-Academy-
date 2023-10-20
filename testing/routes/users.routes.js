var express = require('express');
var router = express.Router();
const {create, getuserById, getAllUser} = require('../controllers/userControllers');

router.post('/', create);
router.get('/:id', getuserById);
router.get('/', getAllUser);

module.exports = router;
