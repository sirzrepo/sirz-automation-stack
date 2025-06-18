const mongoose = require('mongoose');

const ChatbotDataSchema = new mongoose.Schema(
  {
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
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


module.exports = mongoose.model('chatbotData', ChatbotDataSchema);
