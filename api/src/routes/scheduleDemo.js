const express = require('express');
const router = express.Router();
const ScheduleDemoData = require('../models/scheduleDemo');

// CREATE
router.post("/", async (req, res) => {
  try {
    const scheduleDemoData = await ScheduleDemoData.create(req.body);
    res.status(201).json(scheduleDemoData);
  } catch (err) {
    res.status(400).json({ message: "Failed to upload schedule demo data", error: err });
  }
});

// READ - All
router.get("/", async (req, res) => {
  try {
    const scheduleDemoData = await ScheduleDemoData.find().sort({ createdAt: -1 });
    res.json(scheduleDemoData);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch schedule demo data", error: err });
  }
});

// READ - Single
router.get("/:id", async (req, res) => {
  try {
    const scheduleDemoData = await ScheduleDemoData.findById(req.params.id);
    if (!scheduleDemoData) return res.status(404).json({ message: "Schedule demo data not found" });
    res.json(scheduleDemoData);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving schedule demo data", error: err });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await ScheduleDemoData.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Schedule demo data deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err });
  }
});

module.exports = router;
