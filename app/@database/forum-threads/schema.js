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
  gameCommunities_id: { type: String },
  userCommunities_id: { type: String },
  users_id: { type: String },
  localesArr: [
    {
      _id: { type: String, required: true },
      language: { type: String, enum: ['en', 'ja'] },
      name: { type: String, required: true },
      description: { type: String, required: true },
    }
  ],
  imagesAndVideosObj: {
    mainArr: [
      {
        _id: { type: String, required: true },
        type: { type: String, enum: ['image', 'video'], required: true },
        localesArr: {
          type: [
            {
              _id: { type: String, required: true },
              language: { type: String, enum: ['en', 'ja'] },
              caption: { type: String, required: true },
            }
          ],
          default: undefined,
        },
        srcSetArr: {
          type: [
            {
              _id: { type: String, required: true },
              src: { type: String, required: true },
              w: { type: String, enum: ['320w', '480w', '640w', '800w'], required: true },
              width: { type: Number, required: true },
              height: { type: Number, required: true },
            }
          ],
          default: undefined,
        },
        videoChannel: { type: String, enum: ['youtube'] },
        videoID: String,
      },
    ],
  },
  comments: { type: Number, default: 0, required: true },
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

// module.exports = mongoose.model('forum-threads', schema);