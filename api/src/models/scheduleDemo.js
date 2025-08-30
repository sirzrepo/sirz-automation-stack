const mongoose = require('mongoose');

const ScheduleDemoSchema = new mongoose.Schema(
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
    company: { 
        type: String, 
    },
    employees: { 
        type: String, 
    },
    country: { 
        type: String, 
    },
    phone: { 
        type: Number, 
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model('scheduleDemo', ScheduleDemoSchema);
