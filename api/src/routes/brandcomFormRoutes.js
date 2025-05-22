const express = require('express');
const router = express.Router();
const BrandcomForm = require('../models/brandcomForm');

// CREATE
router.post("/", async (req, res) => {
  try {
    const brandcomForm = await BrandcomForm.create(req.body);
    res.status(201).json(brandcomForm);
  } catch (err) {
    res.status(400).json({ message: "Failed to upload brandcom form data", error: err });
  }
});

// READ - All
router.get("/", async (req, res) => {
  try {
    const brandcomForm = await BrandcomForm.find().sort({ createdAt: -1 });
    res.json(brandcomForm);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch brandcom form data", error: err });
  }
});

// READ - Single
router.get("/:id", async (req, res) => {
  try {
    const brandcomForm = await BrandcomForm.findById(req.params.id);
    if (!brandcomForm) return res.status(404).json({ message: "Brandcom form not found" });
    res.json(brandcomForm);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving brandcom form data", error: err });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await BrandcomForm.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Brandcom form deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err });
  }
});

module.exports = router;
