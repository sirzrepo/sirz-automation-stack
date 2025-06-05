const express = require('express');
const router = express.Router();
const LadingPageBuilder = require('../models/ladingPageBuilder');

// CREATE
router.post("/", async (req, res) => {
  try {
    const ladingPageBuilder = await LadingPageBuilder.create(req.body);
    res.status(201).json(ladingPageBuilder);
  } catch (err) {
    res.status(400).json({ message: "Failed to upload lading page builder data", error: err });
  }
});

// READ - All
router.get("/", async (req, res) => {
  try {
    const ladingPageBuilder = await LadingPageBuilder.find().sort({ createdAt: -1 });
    res.json(ladingPageBuilder);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch lading page builder data", error: err });
  }
});

// READ - Single
router.get("/:id", async (req, res) => {
  try {
    const ladingPageBuilder = await LadingPageBuilder.findById(req.params.id);
    if (!ladingPageBuilder) return res.status(404).json({ message: "Lading page builder data not found" });
    res.json(ladingPageBuilder);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving lading page builder data", error: err });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await LadingPageBuilder.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Lading page builder data deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err });
  }
});

module.exports = router;
