// --------------------------------------------------
//   Require
// --------------------------------------------------

const mongoose = require('mongoose');


// --------------------------------------------------
//   Schema
// --------------------------------------------------

const schema = mongoose.Schema({
  _id: { type: String, required: true },
  createdDate: { type: Date, default: Date.now, required: true },
  updatedDate: { type: Date, default: Date.now, required: true },
  accessDate: { type: Date, default: Date.now, required: true },
  playerID: { type: String, required: true, unique: true },
  loginID: { type: String, required: true },
  loginPassword: { type: String, required: true },
  email: String,
  country: { type: String, required: true },
  experience: { type: Number, default: 0, required: true },
  titleArr: [
    {
      _id: { type: String, required: true },
      createdDate: { type: Date, default: Date.now, required: true },
      updatedDate: { type: Date, default: Date.now, required: true },
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

module.exports = mongoose.model('users', schema);