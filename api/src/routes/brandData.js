const express = require('express');
const router = express.Router();
const BrandData = require('../models/brandData');
const { uploadFile, uploadMultipleFiles } = require('../middleware/upload');

// Create or Update Company Data
router.post("/company", async (req, res) => {
  try {

    const { userId } = req.body;
    const companyData = req.body;

    // Convert brandValues to array if it's a string
    if (companyData.brandValues && typeof companyData.brandValues === 'string') {
      companyData.brandValues = companyData.brandValues.split(',').map(item => item.trim());
    }

    const updated = await BrandData.findOneAndUpdate(
      { userId },
      { $set: { companyData } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    console.error('Error updating company data:', err);
    res.status(400).json({
      message: "Failed to update company data",
      error: err.message
    });
  }
});

// Add New Asset
router.post("/assets", uploadMultipleFiles('logo_image,website_image,color_palette'), async (req, res) => {
  try {
    const { userId } = req.body;
    const { files } = req;
    
    // Process file uploads
    // const fileFields = {};
    // if (files && files.length > 0) {
    //   files.forEach(file => {
    //     fileFields[file.fieldname] = file.path;
    //   });
    // }

    const fileFields = {};
    if (files) {
      Object.keys(files).forEach((field) => {
        fileFields[field] = files[field][0].path;
      });
    }

    const newAsset = {
      logo_image: fileFields.logo_image || req.body.logo_image,
      website_image: fileFields.website_image || req.body.website_image,
      color_palette: fileFields.color_palette || req.body.color_palette,
      createdAt: new Date()
    };

    const updated = await BrandData.findOneAndUpdate(
      { userId },
      { $push: { assets: newAsset } },
      { new: true, upsert: true }
    );

    res.status(201).json(updated);
  } catch (err) {
    console.error('Error adding asset:', err);
    res.status(400).json({
      message: "Failed to add asset",
      error: err.message
    });
  }
});

// Get Company Data
router.get("/company/:userId", async (req, res) => {
  try {
    const data = await BrandData.findOne({ userId: req.params.userId });
    if (!data) {
      return res.status(404).json({ message: "Company data not found" });
    }
    res.json(data.companyData || {});
  } catch (err) {
    res.status(500).json({ 
      message: "Error retrieving company data", 
      error: err.message 
    });
  }
});

// Get All Assets for User
router.get("/assets/:userId", async (req, res) => {
  try {
    const data = await BrandData.findOne({ userId: req.params.userId });
    if (!data) {
      return res.status(404).json({ message: "User data not found" });
    }
    res.json(data.assets || []);
  } catch (err) {
    res.status(500).json({ 
      message: "Error retrieving assets", 
      error: err.message 
    });
  }
});

// Get Single Asset
router.get("/assets/:userId/:assetId", async (req, res) => {
  try {
    const data = await BrandData.findOne({
      userId: req.params.userId,
      'assets._id': req.params.assetId
    });
    
    if (!data) {
      return res.status(404).json({ message: "Asset not found" });
    }
    
    const asset = data.assets.id(req.params.assetId);
    res.json(asset);
  } catch (err) {
    res.status(500).json({ 
      message: "Error retrieving asset", 
      error: err.message 
    });
  }
});

// Update Asset
router.put("/assets/:userId/:assetId", uploadMultipleFiles('logo_image,website_image,color_palette'), async (req, res) => {
  try {
    const { userId, assetId } = req.params;
    const updateData = { ...req.body };
    const { files } = req;

    // Process file uploads
    if (files && files.length > 0) {
      files.forEach(file => {
        updateData[file.fieldname] = file.path;
      });
    }

    // Build the update object dynamically
    const updateObj = {};
    ['logo_image', 'website_image', 'color_palette'].forEach(field => {
      if (updateData[field] !== undefined) {
        updateObj[`assets.$.${field}`] = updateData[field];
      }
    });

    const updated = await BrandData.findOneAndUpdate(
      { userId, 'assets._id': assetId },
      { $set: updateObj },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Asset not found" });
    }

    res.json(updated.assets.id(assetId));
  } catch (err) {
    res.status(400).json({ 
      message: "Failed to update asset", 
      error: err.message 
    });
  }
});

// Delete Asset
router.delete("/assets/:userId/:assetId", async (req, res) => {
  try {
    const { userId, assetId } = req.params;
    
    const updated = await BrandData.findOneAndUpdate(
      { userId },
      { $pull: { assets: { _id: assetId } } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "User or asset not found" });
    }

    res.json({ message: "Asset deleted successfully" });
  } catch (err) {
    res.status(400).json({ 
      message: "Failed to delete asset", 
      error: err.message 
    });
  }
});

// Get Company Data and Assets Together
router.get("/company-assets/:userId", async (req, res) => {
  try {
    const data = await BrandData.findOne({ userId: req.params.userId });
    
    if (!data) {
      return res.status(404).json({ 
        message: "User data not found",
        companyData: {},
        assets: []
      });
    }

    res.json({
      companyData: data.companyData || {},
      assets: data.assets || []
    });
  } catch (err) {
    res.status(500).json({ 
      message: "Error retrieving brand data", 
      error: err.message,
      companyData: {},
      assets: []
    });
  }
});

// Get All Companies Data (Admin Only)
router.get("/admin/companies", async (req, res) => {
  try {
    // In a real app, you'd want to add authentication/authorization here
    // Example: check if the requesting user is an admin
    // if (!req.user || !req.user.isAdmin) {
    //   return res.status(403).json({ message: "Unauthorized" });
    // }

    
    const companies = await BrandData.find({})
      .populate('userId', 'email name') // Assuming you want to include some user info
      .select('userId companyData assets')
      .sort({ 'companyData.companyName': 1 });

    const formattedCompanies = companies.map(company => ({
      _id: company._id,
      userId: company.userId,
      companyName: company.companyData?.companyName || 'Unnamed Company',
      industry: company.companyData?.industry,
      email: company.companyData?.email,
      assetsCount: company.assets?.length || 0,
      lastUpdated: company.updatedAt
    }));

    res.json({
      total: companies.length,
      companies: formattedCompanies
    });
  } catch (err) {
    console.error('Error fetching companies:', err);
    res.status(500).json({
      message: 'Failed to fetch companies',
      error: err.message,
      companies: []
    });
  }
});

// Get Full Company Details by ID (Admin Only)
router.get("/admin/company/:id", async (req, res) => {
  try {
    // Add admin check here in production
    const company = await BrandData.findById(req.params.id)
      .populate('userId', 'email name');
      
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({
      _id: company._id,
      userId: company.userId,
      companyData: company.companyData || {},
      assets: company.assets || [],
      createdAt: company.createdAt,
      updatedAt: company.updatedAt
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching company details',
      error: err.message
    });
  }
});

module.exports = router;
