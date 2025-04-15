const express = require('express');
const router = express.Router();
const blogModel = require('../models/Blog');

// CREATE
router.post("/", async (req, res) => {
  try {
    const blog = await blogModel.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: blog
    });
  } catch (err) {
    res.status(400).json({ message: "Failed to create blog post", error: err });
  }
});

// READ - All
router.get("/", async (_req, res) => {
  try {
    const blogs = await blogModel.find().sort({ createdAt: -1 }).populate("author");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blog posts", error: err });
  }
});

// READ - Published Only
router.get("/published", async (_req, res) => {
  try {
    const blogs = await blogModel.find({ status: "Published" }).sort({ createdAt: -1 }).populate("author");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch published blog posts", error: err });
  }
});

// READ - By Author
router.get("/author/:authorId", async (req, res) => {
  try {
    const blogs = await blogModel.find({ author: req.params.authorId }).sort({ createdAt: -1 }).populate("author");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blogs for author", error: err });
  }
});

// READ - By Slug
router.get("/slug/:slug", async (req, res) => {
  try {
    const blog = await blogModel.findOne({ slug: req.params.slug }).populate("author");
    if (!blog) return res.status(404).json({ message: "Blog post not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Error getting blog post", error: err });
  }
});

// READ - By Tag
router.get("/tag/:tag", async (req, res) => {
  try {
    const blogs = await blogModel.find({ tags: req.params.tag }).sort({ createdAt: -1 }).populate("author");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blogs with tag", error: err });
  }
});

// READ - Single
router.get("/:id", async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id).populate("author");
    if (!blog) return res.status(404).json({ message: "Blog post not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Error getting blog post", error: err });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await blogModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Blog post not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await blogModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Blog post not found" });
    res.json({ message: "Blog post deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err });
  }
});

module.exports = router; 