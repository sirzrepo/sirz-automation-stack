const express = require('express');
const router = express.Router();
const ChatbotData = require('../models/chatbot');

// CREATE
router.post("/", async (req, res) => {
  try {
    const chatbotData = await ChatbotData.create(req.body);
    res.status(201).json(chatbotData);
  } catch (err) {
    res.status(400).json({ message: "Failed to upload chatbot data", error: err });
  }
});

// READ - All
router.get("/", async (req, res) => {
  try {
    const chatbotData = await ChatbotData.find().sort({ createdAt: -1 });
    res.json(chatbotData);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch chatbot data", error: err });
  }
});

// READ - Single
router.get("/:id", async (req, res) => {
  try {
    const chatbotData = await ChatbotData.findById(req.params.id);
    if (!chatbotData) return res.status(404).json({ message: "Chatbot data not found" });
    res.json(chatbotData);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving chatbot data", error: err });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await ChatbotData.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Chatbot data deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err });
  }
});

module.exports = router;
