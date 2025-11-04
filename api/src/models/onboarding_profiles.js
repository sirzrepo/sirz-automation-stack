const mongoose = require('mongoose');

const applicationFormSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },

    // Array of form sections (fully dynamic)
    applicationFormData: [
      {
        sectionName: { type: String, required: true },
        data: { type: Object, required: true },
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

    // Overall form completion
    isComplete: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ApplicationForm', applicationFormSchema);
