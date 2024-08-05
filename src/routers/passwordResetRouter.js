const express = require('express');
const router = express.Router();
const passwordResetController = require('../controller/passwordResetController');


router.post('/forgot',passwordResetController.requestPasswordReset  );

router.put('/reset', passwordResetController.resetPassword);

module.exports = router;
