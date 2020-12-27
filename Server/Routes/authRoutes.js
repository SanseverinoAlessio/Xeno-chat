let express = require('express');
let router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true })
const authController = require('../Controllers/auth.js');
router.get('/islogged', authController.islogged);
router.get('/logout',authController.logout);
router.get('/getUsername',authController.getSessionUsername);

module.exports = router;
