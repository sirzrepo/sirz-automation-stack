const mongoose = require('mongoose');

const digitalImagesSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String 
  },
  status: {
    type: String,
    enum: ["Draft", "Published"],
    default: "Draft",
  },
},
{ timestamps: true }
);

module.exports = mongoose.model('digitalImages', digitalImagesSchema); 