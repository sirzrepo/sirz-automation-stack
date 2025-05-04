const mongoose = require('mongoose');

const AutomationDataSchema = new mongoose.Schema(
  {
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    website: { 
        type: String, 
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model('automationData', AutomationDataSchema);
