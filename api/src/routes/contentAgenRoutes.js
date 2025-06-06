const express = require('express');
const router = express.Router();
const ContentAgent = require('../models/contentAgent');

// CREATE
router.post("/", async (req, res) => {
  try {
    const contentAgent = await ContentAgent.create(req.body);
    res.status(201).json(contentAgent);
  } catch (err) {
    res.status(400).json({ message: "Failed to upload content agent data", error: err });
  }
});

// READ - All
router.get("/", async (req, res) => {
  try {
    const contentAgent = await ContentAgent.find().sort({ createdAt: -1 });
    res.json(contentAgent);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch content agent data", error: err });
  }
});

// READ - Single
router.get("/:id", async (req, res) => {
  try {
    const contentAgent = await ContentAgent.findById(req.params.id);
    if (!contentAgent) return res.status(404).json({ message: "Content agent data not found" });
    res.json(contentAgent);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving content agent data", error: err });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await ContentAgent.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Content agent data deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err });
  }
});

module.exports = router;
