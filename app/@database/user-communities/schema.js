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
  userCommunityID: { type: String },
  users_id: { type: String },
  localesArr: [
    {
      _id: { type: String, required: true },
      language: { type: String, enum: ['en', 'ja'] },
      name: { type: String, required: true },
      description: { type: String, required: true },
      descriptionShort: { type: String, required: true },
    }
  ],
  imagesAndVideosObj: {
    thumbnailArr: [
      {
        _id: { type: String, required: true },
        type: { type: String, enum: ['image'], required: true },
        srcSetArr: [
          {
            _id: { type: String, required: true },
            src: { type: String, required: true },
            w: { type: String, enum: ['320w'], required: true },
            width: { type: Number, required: true },
            height: { type: Number, required: true },
          }
        ],
      },
    ],
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
              w: { type: String, enum: ['320w', '480w', '640w', '800w', '960w', '1120w', '1280w', '1440w', '1600w', '1760w', '1920w'], required: true },
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
  gameIDArr: [String],
  memberObj: {
    count: { type: Number, default: 0, required: true },
    membersArr: [String],
  },
  forumObj: {
    threadCount: { type: Number, default: 0, required: true },
  },
  updatedDateObj: {
    notification: { type: Date, required: true },
    thread: { type: Date, required: true },
    comment: { type: Date, required: true },
  }
});


// --------------------------------------------------
//   Exports
// --------------------------------------------------

let model = '';

if (mongoose.models['user-communities']) {
  model = mongoose.model('user-communities');
} else {
  model = mongoose.model('user-communities', schema);
}

module.exports = model;


// module.exports = mongoose.model('user-communities', schema);