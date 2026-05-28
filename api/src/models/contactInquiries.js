const mongoose = require('mongoose');

const ContactInquiriesSchema = new mongoose.Schema(
  {
    firstName: { 
        type: String, 
    },
    lastName: { 
        type: String, 
    },
    email: { 
        type: String,
        required: true,
    },
    phoneNumber: { 
        type: String, 
    },
    businessName: { 
        type: String, 
    }, 
    serviceOfInterest: { 
        type: String, 
    }, 
    message: { 
        type: String, 
    }, 
  },    
  { timestamps: true }
);  


module.exports = mongoose.model('contactInquiries', ContactInquiriesSchema);
