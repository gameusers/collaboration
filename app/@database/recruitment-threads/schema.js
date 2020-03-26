// --------------------------------------------------
//   Require
// --------------------------------------------------

const mongoose = require('mongoose');


// --------------------------------------------------
//   Schema
// --------------------------------------------------

const schema = mongoose.Schema({
  
  _id: { type: String, required: true },
  createdDate: { type: Date, required: true },
  updatedDate: { type: Date, required: true },
  gameCommunities_id: { type: String, required: true },
  users_id: { type: String },
  category: { type: Number, default: 1, required: true },
  localesArr: [
    {
      _id: { type: String, required: true },
      language: { type: String, enum: ['en', 'ja'] },
      title: { type: String, required: true },
      name: { type: String, required: true },
      comment: { type: String, required: true },
    }
  ],
  imagesAndVideos_id: { type: String },
  ids_idArr: [String],
  idsArr: [
    {
      _id: { type: String, required: true },
      hardwares_id: { type: String, required: true },
      id: { type: String, required: true },
    }
  ],
  informationsArr: [
    {
      _id: { type: String, required: true },
      title: { type: String, required: true },
      information: { type: String, required: true },
    }
  ],
  comments: { type: Number, default: 0, required: true },
  replies: { type: Number, default: 0, required: true },
  images: { type: Number, default: 0, required: true },
  videos: { type: Number, default: 0, required: true },
  ip: { type: String, required: true },
  userAgent: { type: String, required: true },
  
});


// --------------------------------------------------
//   Exports
// --------------------------------------------------

let model = '';

if (mongoose.models['forum-threads']) {
  model = mongoose.model('forum-threads');
} else {
  model = mongoose.model('forum-threads', schema);
}

module.exports = model;