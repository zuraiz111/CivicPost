const Message = require('../models/Message');

// @desc    Get all messages
// @route   GET /api/messages
// @access  Public
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Send a message
// @route   POST /api/messages
// @access  Public
const sendMessage = async (req, res) => {
  try {
    const { sender, text, isAdmin } = req.body;

    const message = new Message({
      sender,
      text,
      isAdmin: isAdmin || false,
    });

    const createdMessage = await message.save();
    res.status(201).json(createdMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getMessages,
  sendMessage,
};
