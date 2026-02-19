const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/messages/:matchId', chatController.getMessages);
router.post('/send/:matchId', chatController.sendMessage);
router.delete('/message/:messageId', chatController.deleteMessage);

module.exports = router;
