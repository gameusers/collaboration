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
  threadID: { type: String, required: true },
  userCommunities_id: { type: String },
  users_id: { type: String },
  language: { type: String, enum: ['en', 'ja'], required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  imagesAndVideosObj: {
    mainArr: [
      {
        _id: { type: String, required: true },
        type: { type: String, enum: ['image', 'video'], required: true },
        caption: String,
        srcSetArr: [
          {
            _id: { type: String, required: true },
            src: { type: String, required: true },
            w: { type: String, enum: ['320w', '480w', '640w', '800w'], required: true },
            width: { type: Number, required: true },
            height: { type: Number, required: true },
          }
        ],
      },
    ],
  },
  anonymity: { type: Boolean, required: true },
  comments: { type: Number, default: 0, required: true },
  images: { type: Number, default: 0, required: true },
  videos: { type: Number, default: 0, required: true },
});

module.exports = mongoose.model('forum-threads', schema);