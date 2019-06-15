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
  userCommunities_id: { type: String },
  users_id: { type: String },
  name: { type: String, required: true },
  description: { type: String, required: true },
  comments: { type: Number, default: 0, required: true },
  images: { type: Number, default: 0, required: true },
  videos: { type: Number, default: 0, required: true },
});

module.exports = mongoose.model('forum-threads', schema);