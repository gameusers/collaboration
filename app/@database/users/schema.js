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
  accessDate: { type: Date, required: true },
  userID: { type: String, required: true, unique: true },
  pagesObj: {
    imagesAndVideos_id: { type: String },
    arr: [
      {
        _id: { type: String, required: true },
        type: { type: String, required: true },
        name: { type: String },
        language: { type: String, enum: ['en', 'ja'], required: true },
      },
    ],
  },
  loginID: { type: String, required: true },
  loginPassword: { type: String, required: true },
  emailObj: {
    value: { type: String },
    confirmation: { type: Boolean, default: false, required: true },
  },
  language: { type: String, required: true },
  countriesArr: [String],
  termsOfServiceConfirmedDate: { type: Date, required: true },
  exp: { type: Number, default: 0, required: true },
  achievementsArr: [
    {
      _id: { type: String, required: true },
      createdDate: { type: Date, required: true },
      updatedDate: { type: Date, required: true },
      achievementID: { type: String, required: true },
      count: { type: Number, default: 1, required: true },
    },
  ],
  // webPushAvailable: { type: Boolean, required: true },
  webPushes_id: { type: String },
  role: { type: String, enum: ['user', 'administrator'], required: true },
  
});


// --------------------------------------------------
//   Exports
// --------------------------------------------------

let model = '';

if (mongoose.models['users']) {
  model = mongoose.model('users');
} else {
  model = mongoose.model('users', schema);
}

module.exports = model;