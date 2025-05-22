const mongoose = require('mongoose');

const BrandcomFormSchema = new mongoose.Schema(
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
    phone: { 
        type: Number, 
    },
    company: { 
        type: String, 
    },
    website: { 
        type: String, 
    },
    employees: { 
        type: String, 
    },
    country: { 
        type: String, 
    },
    
  },
  { timestamps: true }
);


module.exports = mongoose.model('brandcomForm', BrandcomFormSchema);
