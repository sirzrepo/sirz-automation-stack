const mongoose = require('mongoose');

const BrandcomAISchema = new mongoose.Schema(
  {
    companyName: { 
        type: String, 
        // required: true 
    },
    industry: { 
        type: String, 
        // required: true 
    },
    targetAudience: { 
        type: String, 
        // required: true 
    },
    brandValues: { 
        type: [String], 
        // required: true 
    },
    logo: { 
        type: String,
    },
    preferredStyle: { 
        type: String, 
        // required: true 
    },
    additionalNotes: { 
        type: String, 
        // required: true 
    },

    // others
    email: { 
        type: String, 
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model('brancdcomAiData', BrandcomAISchema);
