const express = require('express');
const router = express.Router();
const {
  getMessages,
  sendMessage,
} = require('../controllers/messageController');

router.route('/').get(getMessages).post(sendMessage);

module.exports = router;
