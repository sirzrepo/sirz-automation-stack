const express = require('express');
const router = express.Router();
const BrandcomAiData = require('../models/brandcomAi');

const { uploadFile } = require('../middleware/upload');

router.post("/", uploadFile('logo'), async (req, res) => {
  try {
    const brandValues = JSON.parse(req.body.brandValues || '[]');

    const newEntry = await BrandcomAiData.create({
      companyName: req.body.companyName,
      industry: req.body.industry,
      targetAudience: req.body.targetAudience,
      brandValues,
      preferredStyle: req.body.preferredStyle,
      additionalNotes: req.body.additionalNotes,
      logo: req.file ? req.file.filename : null, // Store filename
      email: req.body.email,
    });

    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ message: "Failed to save data", error: err.message });
  }
});

// // CREATE
// router.post("/", async (req, res) => {
//   try {
//     console.log("req.body", req.body);
//     const brandcomAiData = await BrandcomAiData.create(req.body);
//     res.status(201).json(brandcomAiData);
//   } catch (err) {
//     res.status(400).json({ message: "Failed to upload brandcom AI data", error: err });
//   }
// });

// READ - All
router.get("/", async (req, res) => {
  try {
    const brandcomAiData = await BrandcomAiData.find().sort({ createdAt: -1 });
    res.json(brandcomAiData);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch brandcom AI data", error: err });
  }
});

// READ - Single
router.get("/:id", async (req, res) => {
  try {
    const brandcomAiData = await BrandcomAiData.findById(req.params.id);
    if (!brandcomAiData) return res.status(404).json({ message: "Brandcom AI data not found" });
    res.json(brandcomAiData);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving brandcom AI data", error: err });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await BrandcomAiData.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Brandcom AI data not found" });
    res.json({ message: "Brandcom AI data deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err });
  }
});

module.exports = router;
