const mongoose = require('mongoose');

const brandOnboardingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },

    // Array of form sections (fully dynamic)
    applicationFormData: [
      {
        sectionName: { type: String, required: true },
        data: { type: Object, required: false },
        _id: false
      }
    ],

    // Currently selected section (dynamic — no enum restriction)
    selectedSection: {
      type: String,
      default: null
    },

    // Completion flags per section
    completionStatus: {
      type: Object,
      default: {}
    },

    // Progress numbers per section
    progressStatus: {
      type: Object,
      default: {}
    },

    applicationNumber: { 
      type: String, 
      unique: true, 
      // required: true 
    },

    // Overall form completion
    isComplete: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('brandOnboardingProfile', brandOnboardingSchema);
