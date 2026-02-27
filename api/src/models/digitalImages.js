// const mongoose = require('mongoose');

// const digitalImagesSchema = new mongoose.Schema({
//   title: { 
//     type: String, 
//     required: true 
//   },
//   category: { 
//     type: String, 
//     required: true 
//   },
//   image: { 
//     type: String 
//   },
//   status: {
//     type: String,
//     enum: ["Draft", "Published"],
//     default: "Draft",
//   },
// },
// { timestamps: true }
// );

// module.exports = mongoose.model('digitalImages', digitalImagesSchema); 

const mongoose = require('mongoose');

const digitalMediaSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },

  category: { 
    type: String, 
    required: true 
  },

  mediaUrl: { 
    type: String,
    required: true,
  },

  mediaType: {
    type: String,
    enum: ["image", "video"],
    required: true,
  },

  status: {
    type: String,
    enum: ["Draft", "Published"],
    default: "Draft",
  },

}, { timestamps: true });

module.exports = mongoose.model('DigitalMedia', digitalMediaSchema);