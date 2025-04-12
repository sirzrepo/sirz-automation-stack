const express = require('express');
const router = express.Router();
const projectModel = require('../models/projects');

// CREATE
router.post("/", async (req, res) => {
  try {
    const project = await projectModel.create(req.body);
    res.status(201).json(
      {
        success: true,
        message: 'Project created successfully',
        data: project
      });
  } catch (err) {
    res.status(400).json({ message: "Failed to create project", error: err });
  }
});

// READ - All
router.get("/", async (_req, res) => {
  try {
    const projects = await projectModel.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch projects", error: err });
  }
});

// READ - By User ID
router.get("/userId/:userId", async (req, res) => {
  try {
    const projects = await projectModel.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch projects for user", error: err });
  }
});

// READ - Single
router.get("/:id", async (req, res) => {
  try {
    const project = await projectModel.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Error getting project", error: err });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await projectModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await projectModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err });
  }
});

module.exports = router;