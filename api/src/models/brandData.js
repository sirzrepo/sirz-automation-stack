const mongoose = require('mongoose');

const BrandDataSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },

    // Array of assets
    assets: [
      {
        logo_image: {
          type: String,
          required: true,
        },
        website_image: {
          type: String,
          required: true,
        },
        color_palette: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        }
      }
    ],

    // Single editable company data object
    companyData: {
      companyName: String,
      industry: String,
      targetAudience: String,
      brandValues: [String],
      logo: String,
      preferredStyle: String,
      additionalNotes: String,
      email: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('brandData', BrandDataSchema);
