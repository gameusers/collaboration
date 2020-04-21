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
  recruitmentThreads_id: { type: String },
  recruitmentComments_id: { type: String },
  replyToRecruitmentReplies_id: { type: String },
  users_id: { type: String },
  localesArr: [
    {
      _id: { type: String, required: true },
      language: { type: String, enum: ['en', 'ja'] },
      name: { type: String },
      comment: { type: String, required: true },
    }
  ],
  imagesAndVideos_id: { type: String },
  goods: { type: Number, default: 0, required: true },
  ip: { type: String, required: true },
  userAgent: { type: String, required: true },
  
});


// --------------------------------------------------
//   Exports
// --------------------------------------------------

let model = '';

if (mongoose.models['recruitment-replies']) {
  model = mongoose.model('recruitment-replies');
} else {
  model = mongoose.model('recruitment-replies', schema);
}

module.exports = model;