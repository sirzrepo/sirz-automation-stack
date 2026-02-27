// const express = require('express');
// const router = express.Router();
// const digitalImagesModel = require('../models/digitalImages');

// // CREATE
// router.post("/", async (req, res) => {
//   try {
//     const digitalImage = await digitalImagesModel.create(req.body);
//     res.status(201).json({
//       success: true,
//       message: 'Digital image created successfully',
//       data: digitalImage
//     });
//   } catch (err) {
//     res.status(400).json({ message: "Failed to create digital image", error: err });
//   }
// });

// // READ - All
// router.get("/", async (_req, res) => {
//   try {
//     const blogs = await digitalImagesModel.find().sort({ createdAt: -1 });
//     res.json(blogs);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch digital images", error: err });
//   }
// });

// // READ - Published Only
// router.get("/published", async (_req, res) => {
//   try {
//     const blogs = await digitalImagesModel.find({ status: "Published" }).sort({ createdAt: -1 });
//     res.json(blogs);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch published digital images", error: err });
//   }
// });

// // READ - By Category
// router.get("/category/:category", async (req, res) => {
//   try {
//     const images = await digitalImagesModel.find({ category: req.params.category, status: "Published" }).sort({ createdAt: -1 });
//     res.json(images);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch digital images by category", error: err });
//   }
// });

// // READ - Single
// router.get("/:id", async (req, res) => {
//   try {
//     const blog = await digitalImagesModel.findById(req.params.id);
//     if (!blog) return res.status(404).json({ message: "Digital image not found" });
//     res.json(blog);
//   } catch (err) {
//     res.status(500).json({ message: "Error getting digital image", error: err });
//   }
// });

// // UPDATE
// router.put("/:id", async (req, res) => {
//   try {
//     const updated = await digitalImagesModel.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!updated) return res.status(404).json({ message: "Digital image not found" });
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ message: "Update failed", error: err });
//   }
// });

// // DELETE
// router.delete("/:id", async (req, res) => {
//   try {
//     const deleted = await digitalImagesModel.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: "Digital image not found" });
//     res.json({ message: "Digital image deleted successfully" });
//   } catch (err) {
//     res.status(400).json({ message: "Delete failed", error: err });
//   }
// });


// module.exports = router; 





const express = require('express');
const router = express.Router();
const digitalMediaModel = require('../models/digitalImages'); // rename to digitalMedia.js in models

// CREATE
router.post("/", async (req, res) => {
  try {
    const digitalMedia = await digitalMediaModel.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Digital media created successfully',
      data: digitalMedia
    });
  } catch (err) {
    res.status(400).json({ message: "Failed to create digital media", error: err });
  }
});

// READ - All
router.get("/", async (_req, res) => {
  try {
    const mediaItems = await digitalMediaModel.find().sort({ createdAt: -1 });
    res.json(mediaItems);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch digital media", error: err });
  }
});

// READ - Published Only
router.get("/published", async (_req, res) => {
  try {
    const mediaItems = await digitalMediaModel.find({ status: "Published" }).sort({ createdAt: -1 });
    res.json(mediaItems);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch published digital media", error: err });
  }
});

// READ - By Category
router.get("/category/:category", async (req, res) => {
  try {
    const mediaItems = await digitalMediaModel.find({
      category: req.params.category,
      status: "Published"
    }).sort({ createdAt: -1 });
    res.json(mediaItems);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch digital media by category", error: err });
  }
});

// READ - Single
router.get("/:id", async (req, res) => {
  try {
    const media = await digitalMediaModel.findById(req.params.id);
    if (!media) return res.status(404).json({ message: "Digital media not found" });
    res.json(media);
  } catch (err) {
    res.status(500).json({ message: "Error getting digital media", error: err });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await digitalMediaModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Digital media not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await digitalMediaModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Digital media not found" });
    res.json({ message: "Digital media deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err });
  }
});

module.exports = router;