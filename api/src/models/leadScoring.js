const mongoose = require('mongoose');

const LeadScoringSchema = new mongoose.Schema(
  {
    companyUrl: { 
        type: String, 
        required: true 
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model('leadScoring', LeadScoringSchema);
