const express = require('express');
const router = express.Router();
const Document = require('../models/documents');

// CREATE
router.post("/", async (req, res) => {
  try {
    const doc = await Document.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ message: "Failed to upload document", error: err });
  }
});

// READ - All
router.get("/", async (req, res) => {
  try {
    const documents = await Document.find().sort({ createdAt: -1 });
    res.json(documents);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch documents", error: err });
  }
});

// READ - By User ID
router.get("/userId/:userId", async (req, res) => {
  try {
    const documents = await Document.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(documents);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch documents for user", error: err });
  }
});

// READ - Single
router.get("/:id", async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id).populate("projectId");
    if (!doc) return res.status(404).json({ message: "Document not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving document", error: err });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Document.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Document deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err });
  }
});

module.exports = router;
