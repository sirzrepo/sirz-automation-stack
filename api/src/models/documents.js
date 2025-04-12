const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema(
  {
    documentName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "MyProject", required: true },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model('document', DocumentSchema);
