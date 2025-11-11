const express = require('express');
const router = express.Router();
const brandOnboardingProfileModel = require('../models/brandOnboardingProfiles');
const userModel = require('../models/user');
const checkPermission = require('../middleware/permission');

// CREATE or INITIALIZE application form for a user
router.post("/", async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Check if form already exists
    const existingForm = await brandOnboardingProfileModel.findOne({ userId });
    if (existingForm) {
      return res.status(400).json({ 
        success: false,
        message: 'Application form already exists for this user' 
      });
    }

    // 🔹 Generate unique application number
    const year = new Date().getFullYear();
    const count = await brandOnboardingProfileModel.countDocuments({}) + 1;
    const paddedCount = String(count).padStart(3, "0");
    const applicationNumber = `#SIRz-${year}-${paddedCount}`;

    const form = new brandOnboardingProfileModel({ 
      userId,
      applicationNumber,
      applicationFormData: [],
      completionStatus: {},
      progressStatus: {},
      isComplete: false
    });
    
    await form.save();  
    
    // Update user's onboarding status
    await userModel.findByIdAndUpdate(userId, { onboardingStatus: 'in_progress' });
    
    res.status(201).json({
      success: true,
      message: 'Application form initialized successfully',
      data: form
    });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      message: "Failed to initialize application form", 
      error: err.message 
    });
  }
});

// GET form by user ID
router.get("/user/:userId", async (req, res) => {
  try {
    const form = await brandOnboardingProfileModel.findOne({ userId: req.params.userId });
    if (!form) {
      return res.status(404).json({ 
        success: false,
        message: 'Application form not found' 
      });
    }
    res.json({
      success: true,
      data: form
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Error fetching application form", 
      error: err.message 
    });
  }
});

router.put("/:userId/section/:sectionName", async (req, res) => {
  try {
    const { userId, sectionName } = req.params;
    let { data, isComplete, progress } = req.body;

    // Normalize isComplete
    if (typeof isComplete === "string") {
      isComplete = isComplete === "true";
    }

    // Try to update existing section first
    let form = await brandOnboardingProfileModel.findOneAndUpdate(
      { userId, "applicationFormData.sectionName": sectionName },
      {
        $set: {
          "selectedSection": sectionName,
          [`applicationFormData.$.data`]: data,
          [`applicationFormData.$.isComplete`]: !!isComplete,
          [`completionStatus.${sectionName}`]: !!isComplete,
          [`progressStatus.${sectionName}`]: progress ?? 0,
        },
      },
      { new: true }
    );

    // If section doesn't exist yet, push it instead
    if (!form) {
      form = await brandOnboardingProfileModel.findOneAndUpdate(
        { userId },
        {
          $push: {
            applicationFormData: { sectionName, data, isComplete: !!isComplete },
          },
          $set: {
            [`completionStatus.${sectionName}`]: !!isComplete,
            [`progressStatus.${sectionName}`]: progress ?? 0,
            selectedSection: sectionName,
          },
        },
        { new: true, upsert: true }
      );
    }

    // Recalculate form.isComplete
    const allStatuses = Object.values(form.completionStatus);
    form.isComplete = allStatuses.length > 0 && allStatuses.every(Boolean);
    await form.save();

    res.json({
      success: true,
      message: "Section and completion status updated successfully",
      data: form,
    });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(400).json({
      success: false,
      message: "Failed to update section",
      error: err.message,
    });
  }
});


// Update selected section
router.put("/:userId/selected-section", async (req, res) => {
  try {
    const { userId } = req.params;
    const { sectionName } = req.body;

    const form = await brandOnboardingProfileModel.findOneAndUpdate(
      { userId },
      { selectedSection: sectionName },
      { new: true }
    );

    if (!form) {
      return res.status(404).json({ 
        success: false, 
        message: 'Application form not found' 
      });
    }

    res.json({
      success: true,
      message: 'Selected section updated successfully',
      data: form
    });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      message: "Failed to update selected section", 
      error: err.message 
    });
  }
});


// GET progress summary
router.get("/:userId/progress", async (req, res) => {
  try {
    const form = await brandOnboardingProfileModel.findOne({ userId: req.params.userId });
    if (!form) {
      return res.status(404).json({ 
        success: false,
        message: 'Application form not found' 
      });
    }
    
    const { isComplete, completionStatus, progressStatus, applicationFormData } = form;
    
    // Calculate overall progress based on section progresses
    const sections = Object.keys(progressStatus);
    const totalProgress = sections.length > 0 
      ? sections.reduce((sum, section) => sum + (progressStatus[section] || 0), 0) / sections.length 
      : 0;
    
    res.json({
      success: true,
      data: {
        isComplete,
        overallProgress: Math.round(totalProgress),
        sections: applicationFormData.map(section => ({
          sectionName: section.sectionName,
          progress: progressStatus[section.sectionName] || 0,
          isComplete: completionStatus[section.sectionName] || false
        }))
      }
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Error fetching progress", 
      error: err.message 
    });
  }
});

// GET all onboarding profiles with pagination, search, and sorting
// router.get("/", async (req, res) => {
//   try {
//     // Extract query parameters
//     const { 
//       page = 1, 
//       limit = 10, 
//       search = '',
//       sortBy = 'updatedAt',
//       sortOrder = 'desc',
//       status
//     } = req.query;

//     // Build query
//     const query = {};
    
//     // Add search filter
//     if (search) {
//       query.$or = [
//         { 'user.firstName': { $regex: search, $options: 'i' } },
//         { 'user.lastName': { $regex: search, $options: 'i' } },
//         { 'user.email': { $regex: search, $options: 'i' } },
//         { applicationNumber: { $regex: search, $options: 'i' } }
//       ];
//     }

//     // Add status filter if provided
//     if (status && status !== 'all') {
//       query.status = status;
//     }

//     // Calculate pagination
//     const skip = (parseInt(page) - 1) * parseInt(limit);
//     const total = await brandOnboardingProfileModel.countDocuments(query);

//     // Fetch profiles with pagination and sorting
//     const profiles = await brandOnboardingProfileModel
//       .find(query)
//       .populate('userId', 'email firstName lastName image')
//       .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
//       .skip(skip)
//       .limit(parseInt(limit));

//     res.json({
//       success: true,
//       count: profiles.length,
//       total,
//       totalPages: Math.ceil(total / limit),
//       currentPage: parseInt(page),
//       data: profiles
//     });
//   } catch (err) {
//     console.error('Error fetching onboarding profiles:', err);
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to fetch onboarding profiles", 
//       error: err.message 
//     });
//   }
// });

// Get all users
router.get('/', async (req, res) => {
  try {
    const profiles = await brandOnboardingProfileModel.find().sort({ createdAt: -1 }).populate('userId'); 
    res.json({
      success: true,
      data: profiles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching brand onboarding profiles',
      error: error.message
    });
  }
});

// Update user onboarding status
router.put('/user/onboarding-status', async (req, res) => {
  try {
    const { onboardingStatus, userId } = req.body;
    
    if (!onboardingStatus || !userId) {
      return res.status(400).json({
        success: false,
        message: 'onboardingStatus and userId are required'
      });
    }

    const validStatuses = ['not_started', 'in_progress', 'completed'];
    if (!validStatuses.includes(onboardingStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid onboarding status. Must be one of: not_started, in_progress, completed'
      });
    }

    const user = await userModel.findByIdAndUpdate(
      userId,
      { onboardingStatus },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User onboarding status updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user onboarding status',
      error: error.message
    });
  }
});

module.exports = router;