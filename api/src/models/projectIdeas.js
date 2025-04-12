const mongoose = require('mongoose');

const projectIdeaSchema = new mongoose.Schema({
  idea: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Planned', 'In progress', 'Complete'],
    default: 'Planned',
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
  },
  service: {
    type: String,
    required: true,
  },
  
}, { timestamps: true });

module.exports = mongoose.model('ProjectIdea', projectIdeaSchema);
