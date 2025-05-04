const express = require('express');
const router = express.Router();
const AutomationData = require('../models/automation');

// CREATE
router.post("/", async (req, res) => {
  try {
    const automationData = await AutomationData.create(req.body);
    res.status(201).json(automationData);
  } catch (err) {
    res.status(400).json({ message: "Failed to upload automation data", error: err });
  }
});

// READ - All
router.get("/", async (req, res) => {
  try {
    const automationData = await AutomationData.find().sort({ createdAt: -1 });
    res.json(automationData);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch automation data", error: err });
  }
});

// READ - Single
router.get("/:id", async (req, res) => {
  try {
    const automationData = await AutomationData.findById(req.params.id);
    if (!automationData) return res.status(404).json({ message: "Automation data not found" });
    res.json(automationData);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving automation data", error: err });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await AutomationData.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Automation data deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err });
  }
});

module.exports = router;
