const express = require('express');
const router = express.Router();
const WebForm = require('../models/webForm');

// Create a new web form submission
router.post('/', async (req, res) => {
  try {
    const formData = req.body;
    
    // Convert string arrays if needed (for form data that might come as comma-separated strings)
    const arrayFields = ['brandColors', 'websiteType', 'features', 'paymentGateways'];
    arrayFields.forEach(field => {
      if (formData[field] && typeof formData[field] === 'string') {
        formData[field] = formData[field].split(',').map(item => item.trim());
      }
    });

    // Convert string to boolean for checkbox fields
    if (typeof formData.hasLogo === 'string') {
      formData.hasLogo = formData.hasLogo === 'true';
    }
    if (typeof formData.needCopywriting === 'string') {
      formData.needCopywriting = formData.needCopywriting === 'true';
    }

    // Convert string to number for productCount
    if (formData.productCount) {
      formData.productCount = Number(formData.productCount);
    }

    // Convert string to Date for launchDate
    if (formData.launchDate) {
      formData.launchDate = new Date(formData.launchDate);
    }

    const newForm = new WebForm(formData);
    const savedForm = await newForm.save();
    
    res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      data: savedForm
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(400).json({
      success: false,
      message: 'Error submitting form',
      error: error.message
    });
  }
});

// Get all form submissions (with pagination)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const forms = await WebForm.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await WebForm.countDocuments();
    
    res.status(200).json({
      success: true,
      count: forms.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: forms
    });
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching forms',
      error: error.message
    });
  }
});

// Get a single form submission by ID
router.get('/:id', async (req, res) => {
  try {
    const form = await WebForm.findById(req.params.id);
    
    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Form not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: form
    });
  } catch (error) {
    console.error('Error fetching form:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching form',
      error: error.message
    });
  }
});

// Update a form submission
router.put('/:id', async (req, res) => {
  try {
    const updates = req.body;
    
    // Handle array fields
    const arrayFields = ['brandColors', 'websiteType', 'features', 'paymentGateways'];
    arrayFields.forEach(field => {
      if (updates[field] && typeof updates[field] === 'string') {
        updates[field] = updates[field].split(',').map(item => item.trim());
      }
    });

    const form = await WebForm.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    
    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Form not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Form updated successfully',
      data: form
    });
  } catch (error) {
    console.error('Error updating form:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating form',
      error: error.message
    });
  }
});

// Delete a form submission
router.delete('/:id', async (req, res) => {
  try {
    const form = await WebForm.findByIdAndDelete(req.params.id);
    
    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Form not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Form deleted successfully',
      data: {}
    });
  } catch (error) {
    console.error('Error deleting form:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting form',
      error: error.message
    });
  }
});

// Get form statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const stats = {
      totalSubmissions: await WebForm.countDocuments(),
      byIndustry: await WebForm.aggregate([
        { $group: { _id: '$industry', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      byWebsiteType: await WebForm.aggregate([
        { $unwind: '$websiteType' },
        { $group: { _id: '$websiteType', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      byBudget: await WebForm.aggregate([
        { $group: { _id: '$budget', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ])
    };
    
    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching form statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching form statistics',
      error: error.message
    });
  }
});

module.exports = router;
