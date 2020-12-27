let express = require('express');
let router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true })
const userController = require('../Controllers/user.js');
router.post('/register',urlencodedParser,userController.register);
router.post('/login',urlencodedParser,userController.login);
router.get("/email/:email",urlencodedParser,userController.emailExist);
router.get("/userExist/:username",urlencodedParser,userController.userExist);
module.exports = router;
