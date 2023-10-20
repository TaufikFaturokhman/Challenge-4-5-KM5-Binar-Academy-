var express = require('express');
var router = express.Router();
const {create} = require('../controllers/accountControllers');

router.post('/', create);

module.exports = router;