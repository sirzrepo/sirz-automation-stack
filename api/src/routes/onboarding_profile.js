const express = require('express');
const router = express.Router();
const applicationformModal = require('../models/onboarding_profiles');
const checkPermission = require('../middleware/permission');

// CREATE or INITIALIZE application form for a user
router.post("/", async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Check if form already exists
    const existingForm = await applicationformModal.findOne({ userId });
    if (existingForm) {
      return res.status(400).json({ 
        success: false,
        message: 'Application form already exists for this user' 
      });
    }

    const form = new applicationformModal({ 
      userId,
      applicationFormData: [],
      completionStatus: {},
      progressStatus: {},
      isComplete: false
    });
    
    await form.save();  
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
    const form = await applicationformModal.findOne({ userId: req.params.userId });
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

// Update form section data
// router.put("/:userId/section/:sectionName", async (req, res) => {
//   try {
//     const { userId, sectionName } = req.params;
//     const { data, isComplete, progress } = req.body;
//     console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^", req.body, "********************", userId, sectionName)

//     // Find the form
//     const form = await applicationformModal.findOne({ userId });
//     if (!form) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Application form not found' 
//       });
//     }

//     // Find the section index if it exists
//     const sectionIndex = form.applicationFormData.findIndex(
//       section => section.sectionName === sectionName
//     );

//     // Update or add the section data
//     const sectionData = { sectionName, data };
//     if (sectionIndex >= 0) {
//       form.applicationFormData[sectionIndex] = sectionData;
//     } else {
//       form.applicationFormData.push(sectionData);
//     }

//     // Update completion status if provided
//     if (isComplete !== undefined) {
//       form.completionStatus[sectionName] = isComplete;
      
//       // Check if all sections are complete
//       const allSections = [...new Set([
//         ...Object.keys(form.completionStatus),
//         sectionName
//       ])];
      
//       form.isComplete = allSections.every(section => form.completionStatus[section] === true);
//     }

//     // Update progress if provided
//     if (progress !== undefined) {
//       form.progressStatus[sectionName] = progress;
//     }

//     await form.save();

//     res.json({
//       success: true,
//       message: 'Section updated successfully',
//       data: form
//     });
//   } catch (err) {
//     res.status(400).json({ 
//       success: false,
//       message: "Failed to update section", 
//       error: err.message 
//     });
//   }
// });

router.put("/:userId/section/:sectionName", async (req, res) => {
  console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^", req.body);
  try {
    const { userId, sectionName } = req.params;
    let { data, isComplete, progress } = req.body;

    // Normalize isComplete
    if (typeof isComplete === "string") {
      isComplete = isComplete === "true";
    }

    // Try to update existing section first
    let form = await applicationformModal.findOneAndUpdate(
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
      form = await applicationformModal.findOneAndUpdate(
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

    const form = await applicationformModal.findOneAndUpdate(
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
    const form = await applicationformModal.findOne({ userId: req.params.userId });
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

// GET all forms (for admin purposes)
router.get("/", async (req, res) => {
  try {
    const forms = await applicationformModal.find()
      .sort({ updatedAt: -1 })
      .populate('userId', 'email firstName lastName');
      
    res.json({
      success: true,
      count: forms.length,
      data: forms
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch application forms", 
      error: err.message 
    });
  }
});

module.exports = router;