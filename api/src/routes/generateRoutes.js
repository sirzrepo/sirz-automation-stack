const express = require('express');
const router = express.Router();
const websiteGenerator = require('../services/websiteGenerator');
const logoGenerator = require('../services/logoGenerator');
const paletteGenerator = require('../services/palletGenerator');

// POST /generate-assets
router.post('/', async (req, res) => {
  try {
    console.log('Received request for brand assets generation', req.body);
    const {
      input0, // Describe your business
      input1, // Domain name
      input2, // Business name
      input3  // Describe your website
    } = req.body;

    // Step 1: Generate website image from inputs
    const websiteImage = await websiteGenerator(input0, input1, input3);
    console.log('Website image generated:', websiteImage);

    // Step 2: Generate logo image from business name, domain, and type
    const logoImage = await logoGenerator(input1, input2, input3);
    console.log('Logo image generated:', logoImage);

    // Step 3: Generate color palette text from business name and website description
    const colorPalette = await paletteGenerator(input2, input3);
    console.log('Color palette generated:', colorPalette);

    // Send all generated assets back to frontend
    res.json({
      website_image: websiteImage,
      logo_image: logoImage,
      color_palette: colorPalette
    });

  } catch (err) {
    console.error('❌ Generation Error:', err.message);
    res.status(500).json({
      error: 'Failed to generate brand assets.',
      message: err.message
    });
  }
});

router.get('/', (req, res) => {
  res.send('Hello World for generate-assets!');
});

module.exports = router;