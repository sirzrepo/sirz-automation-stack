const mongoose = require('mongoose');

const webFormSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: [true, 'Business name is required'],
    trim: true
  },
  industry: {
    type: String,
    required: [true, 'Industry is required'],
    trim: true
  },
  businessDescription: {
    type: String,
    required: [true, 'Business description is required'],
    trim: true
  },
  brandStyle: {
    type: String,
    trim: true
  },
  hasLogo: {
    type: Boolean,
    default: false
  },
  brandColors: [{
    type: String,
    trim: true
  }],
  websiteType: [{
    type: String,
    trim: true
  }],
  features: [{
    type: String,
    trim: true
  }],
  productCount: {
    type: Number,
    min: 0,
    default: 0
  },
  paymentGateways: [{
    type: String,
    trim: true
  }],
  bookingType: {
    type: String,
    trim: true
  },
  calendarIntegration: {
    type: String,
    trim: true
  },
  contentProvider: {
    type: String,
    trim: true
  },
  needCopywriting: {
    type: Boolean,
    default: false
  },
  maintenancePreference: {
    type: String,
    trim: true
  },
  budget: {
    type: String,
    trim: true
  },
  timeline: {
    type: String,
    trim: true
  },
  launchDate: {
    type: Date
  },
  additionalRequirements: {
    type: String,
    trim: true
  },
  // Timestamps for when the form was created and last updated
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
webFormSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Create a model from the schema
const WebForm = mongoose.model('WebForm', webFormSchema);

module.exports = WebForm;