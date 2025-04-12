const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({

    projectName: { type: String, required: true },
    projectImage: { type: String },
    attachment: { type: String },
    status: {
      type: String,
      enum: ["Planned", "In progress", "Complete"],
      default: "Planned",
    },
    consultant: { type: String, required: true },
    manager: { type: String, required: true },
    notes: { type: String, required: true },
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('projects', ProjectSchema);
