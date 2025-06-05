const mongoose = require('mongoose');

const LadingPageBuilderSchema = new mongoose.Schema(
  {
    businessName: { 
        type: String, 
    },
    businessWebsite: { 
        type: String, 
    },
    files: { 
        type: [String],
    },
    service: { 
        type: String, 
    },
    description: { 
        type: String, 
    }, 
  },    
  { timestamps: true }
);  


module.exports = mongoose.model('ladingPageBuilder', LadingPageBuilderSchema);
