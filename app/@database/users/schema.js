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
  playerID: { type: String, required: true, unique: true },
  pagesArr: [
    {
      _id: { type: String, required: true },
      type: { type: String, required: true },
      name: { type: String },
      language: { type: String, enum: ['en', 'ja'], required: true },
    },
  ],
  loginID: { type: String, required: true },
  loginPassword: { type: String, required: true },
  emailObj: {
    value: { type: String },
    confirmation: { type: Boolean, default: false, required: true },
  },
  country: { type: String, required: true },
  termsOfServiceConfirmedDate: { type: Date, required: true },
  experience: { type: Number, default: 0, required: true },
  titleArr: [
    {
      _id: { type: String, required: true },
      createdDate: { type: Date, required: true },
      updatedDate: { type: Date, required: true },
      titleID: { type: String, required: true },
      count: { type: Number, default: 0, required: true },
    },
  ],
  followArr: [String],
  followCount: { type: Number, default: 0, required: true },
  followedArr: [String],
  followedCount: { type: Number, default: 0, required: true },
  role: { type: String, default: 'User', required: true },
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