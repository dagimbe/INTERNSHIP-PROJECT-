const express = require('express');
const router = express.Router();
const athuController = require("../controller/athucontroller"); 
const authenticate = require('../middleWare/authenticate');

router.post("/signup", athuController.register);
router.post("/signin", athuController.login);
router.post("/logout", authenticate(), athuController.logout);
router.post('/admin/signup', authenticate('ROLE_ADMIN'), athuController.register);
router.post('/admin/signin', athuController.login);

module.exports = router;
