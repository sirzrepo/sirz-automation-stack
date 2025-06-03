const express = require('express');
const router = express.Router();
const LeadScoring = require('../models/leadScoring');

// CREATE
router.post("/", async (req, res) => {
  try {
    const leadScoring = await LeadScoring.create(req.body);
    res.status(201).json(leadScoring);
  } catch (err) {
    res.status(400).json({ message: "Failed to upload lead scoring data", error: err });
  }
});

// READ - All
router.get("/", async (req, res) => {
  try {
    const leadScoring = await LeadScoring.find().sort({ createdAt: -1 });
    res.json(leadScoring);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch lead scoring data", error: err });
  }
});

// READ - Single
router.get("/:id", async (req, res) => {
  try {
    const leadScoring = await LeadScoring.findById(req.params.id);
    if (!leadScoring) return res.status(404).json({ message: "Lead scoring data not found" });
    res.json(leadScoring);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving lead scoring data", error: err });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await LeadScoring.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Lead scoring data deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err });
  }
});

module.exports = router;
