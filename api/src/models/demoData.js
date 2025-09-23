const mongoose = require('mongoose');

const DemoDataSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    businessType: { 
        type: String, 
        required: true 
    },
    currentPlatform: { 
        type: String, 
        required: true 
    },
    challenge: { 
        type: String, 
        required: true 
    },
    marketTarget: { 
        type: String, 
    },
    isPaidAds: { 
        type: String, 
    },
    isAgency: { 
        type: String, 
    },
    futureGoal: { 
        type: String, 
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model('demoData', DemoDataSchema);
