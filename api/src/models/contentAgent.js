const mongoose = require('mongoose');

const ContentAgentSchema = new mongoose.Schema(
  {
    prompt: { 
        type: String, 
        required: true 
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model('contentAgent', ContentAgentSchema);
