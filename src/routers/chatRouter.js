const express = require('express');
const router = express.Router();
const chatController = require('../controller/chatController');
const authenticate = require('../middleWare/authenticate');


router.post('/', authenticate(), chatController.addChat)
router.get('/', authenticate(), chatController.getChats); 
router.get('/:chatId', authenticate(), chatController.getChat); 
router.post('/:chatId/messages', authenticate(), chatController.addMessage); 
router.get('/:chatId/messages', authenticate(), chatController.getMessages); 
router.patch('/:chatId/read', authenticate(), chatController.readChat); 

module.exports = router;
