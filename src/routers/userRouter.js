const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authenticate = require('../middleWare/authenticate');


router.get('/profile',  authenticate(), userController.getUserProfileHandler);

module.exports = router;
