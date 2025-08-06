const express = require('express');
const router = express.Router();
const {
	createChatRoom,
	getChatRooms,
} = require('../controllers/chat.controllers');

router.post('/create', createChatRoom);
router.get('/user/:userId', getChatRooms);

module.exports = router;
