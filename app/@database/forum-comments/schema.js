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
  forumThreads_id: { type: String, required: true },
  forumComments_id: { type: String },
  replyToForumComments_id: { type: String },
  users_id: { type: String },
  name: { type: String },
  comment: { type: String, required: true },
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
  goods: { type: Number, default: 0, required: true },
  replies: { type: Number, default: 0, required: true },
});

module.exports = mongoose.model('forum-comments', schema);