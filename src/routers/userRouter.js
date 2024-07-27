const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authenticate = require('../middleWare/authenticate'); // Ensure 'middlewares' is correctly named

// Route to get user profile, protected by authentication middleware
router.get('/profile', authenticate, userController.getUserProfileHandler);

module.exports = router;
