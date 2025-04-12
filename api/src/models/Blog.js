const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  summary: { 
    type: String, 
    required: true 
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true
  },
  coverImage: { 
    type: String 
  },
  tags: [{ 
    type: String 
  }],
  status: {
    type: String,
    enum: ["Draft", "Published"],
    default: "Draft",
  },
  slug: { 
    type: String, 
    required: true,
    unique: true
  }
},
{ timestamps: true }
);

module.exports = mongoose.model('blogs', BlogSchema); 