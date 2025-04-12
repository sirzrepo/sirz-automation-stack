const express = require('express');
const router = express.Router();
const ProjectIdea = require('../models/projectIdeas');

// Create a new product idea
router.post('/', async (req, res) => {
  try {
    const projectIdea = await ProjectIdea.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Project idea created successfully',
      data: projectIdea
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating Project idea',
      error: error.message
    });
  }
});

// Get all Project ideas
router.get('/', async (req, res) => {
  try {
    const ProjectIdeas = await ProjectIdea.find();
    res.json(ProjectIdeas);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching Project ideas',
      error: error.message
    });
  }
});

// READ - By User ID
router.get("/userId/:userId", async (req, res) => {
  try {
    const ProjectIdeas = await ProjectIdea.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(ProjectIdeas);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch ProjectIdeas for user", error: err });
  }
});

// Get a single Project idea by ID
router.get('/:id', async (req, res) => {
  try {
    const ProjectIdea = await ProjectIdea.findById(req.params.id);
    if (!ProjectIdea) {
      return res.status(404).json({
        success: false,
        message: 'Project idea not found'
      });
    }
    res.json({
      success: true,
      data: ProjectIdea
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching Project idea',
      error: error.message
    });
  }
});

// Update a Project idea
router.put('/:id', async (req, res) => {
  try { 
    const updatedProjectIdea = await ProjectIdea.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProjectIdea) {
      return res.status(404).json({
        success: false,
        message: 'Project idea not found'
      });
    }

    res.json({
      success: true,
      message: 'Project idea updated successfully',
      data: updatedProjectIdea
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating Project idea',
      error: error.message
    });
  }
});

// Delete a Project idea
router.delete('/:id', async (req, res) => {
  try {
    const deletedProjectIdea = await ProjectIdea.findByIdAndDelete(req.params.id);
    
    if (!deletedProjectIdea) {
      return res.status(404).json({
        success: false,
        message: 'Project idea not found'
      });
    }

    res.json({
      success: true,
      message: 'Project idea deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting Project idea',
      error: error.message
    });
  }
});

module.exports = router;
