const express = require('express');
const router = express.Router();
const DemoData = require('../models/demoData');

// CREATE
router.post("/", async (req, res) => {
  try {
    const demoData = await DemoData.create(req.body);
    res.status(201).json(demoData);
  } catch (err) {
    res.status(400).json({ message: "Failed to upload demo data", error: err });
  }
});

// READ - All
router.get("/", async (req, res) => {
  try {
    const demoData = await DemoData.find().sort({ createdAt: -1 });
    res.json(demoData);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch demo data", error: err });
  }
});

// READ - Single
router.get("/:id", async (req, res) => {
  try {
    const demoData = await DemoData.findById(req.params.id);
    if (!demoData) return res.status(404).json({ message: "Demo data not found" });
    res.json(demoData);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving demo data", error: err });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await DemoData.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Demo data deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err });
  }
});

module.exports = router;
