const express = require('express');
const router = express.Router();
const Role = require('../models/role');
const checkPermission = require('../middleware/permission');

// CREATE
router.post("/", checkPermission("admin"), async (req, res) => {
  try {
    const role = await Role.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Role created successfully',
      data: role
    });
  } catch (err) {
    res.status(400).json({ message: "Failed to create role", error: err });
  }
});

// READ - All
router.get("/", async (_req, res) => {
  try {
    const roles = await Role.find().sort({ createdAt: -1 });
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch roles", error: err });
  }
});

// READ - By Name (similar to user ID lookup but for role name)
router.get("/name/:name", async (req, res) => {
  try {
    const role = await Role.findOne({ name: req.params.name });
    if (!role) return res.status(404).json({ message: "Role not found" });
    res.json(role);
  } catch (err) {
    res.status(500).json({ message: "Error getting role by name", error: err });
  }
});

// READ - Single
router.get("/:id", async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json({ message: "Role not found" });
    res.json(role);
  } catch (err) {
    res.status(500).json({ message: "Error getting role", error: err });
  }
});

// UPDATE
router.put("/:id", checkPermission("admin"), async (req, res) => {
  try {
    const updated = await Role.findByIdAndUpdate(
      req.params.id, 
      { 
        name: req.body.name,
        description: req.body.description,
        // permissions: req.body.permissions
      },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Role not found" });
    res.json({
      success: true,
      message: 'Role updated successfully',
      data: updated
    });
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err });
  }
});

// DELETE
router.delete("/:id", checkPermission("admin"), async (req, res) => {
  try {
    const deleted = await Role.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Role not found" });
    res.json({ 
      success: true,
      message: 'Role deleted successfully' 
    });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err });
  }
});

module.exports = router;