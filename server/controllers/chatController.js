const Chat = require("../models/Chat");
const User = require("../models/User");

/* =====================================================
   GET ALL CHATS FOR CURRENT USER
===================================================== */
const getUserChats = async (req, res) => {
  try {
    const userId = req.user.id;

    const chats = await Chat.find({
      participants: { $in: [userId] },
    })
      .populate("participants", "name email profilePic")
      .populate("messages.sender", "name email profilePic")
      .sort({ updatedAt: -1 });

    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/* =====================================================
   CREATE OR GET CHAT BETWEEN TWO USERS
===================================================== */
const createOrGetChat = async (req, res) => {
  try {
    const { otherUserId } = req.body;
    const userId = req.user.id;

    // Check if chat already exists
    let chat = await Chat.findOne({
      participants: { $all: [userId, otherUserId] },
    })
      .populate("participants", "name email profilePic")
      .populate("messages.sender", "name email profilePic");

    if (!chat) {
      chat = await Chat.create({
        participants: [userId, otherUserId],
        messages: [],
      });

      chat = await Chat.findById(chat._id).populate("participants", "name email profilePic");
    }

    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/* =====================================================
   SEND MESSAGE
===================================================== */
const sendMessage = async (req, res) => {
  try {
    const { chatId, text } = req.body;
    const userId = req.user.id;

    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    const newMessage = {
      sender: userId,
      text,
      createdAt: new Date(),
    };

    chat.messages.push(newMessage);
    chat.updatedAt = new Date();

    await chat.save();

    const populatedChat = await Chat.findById(chatId)
      .populate("participants", "name email profilePic")
      .populate("messages.sender", "name email profilePic");

    res.json(populatedChat);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/* =====================================================
   DELETE MESSAGE (optional)
===================================================== */
const deleteMessage = async (req, res) => {
  try {
    const { chatId, messageId } = req.params;
    const userId = req.user.id;

    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    const messageIndex = chat.messages.findIndex(
      (msg) => msg._id.toString() === messageId && msg.sender.toString() === userId
    );

    if (messageIndex === -1) return res.status(404).json({ message: "Message not found" });

    chat.messages.splice(messageIndex, 1);
    await chat.save();

    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getUserChats,
  createOrGetChat,
  sendMessage,
  deleteMessage,
};
