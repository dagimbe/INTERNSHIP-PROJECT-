const express = require('express');
const router = express.Router();
const athuController = require("../controller/athucontroller"); // Adjusted filename

// User registration
router.post("/signup",athuController.register);

// User login
router.post("/signin", athuController.login);

module.exports = router;
