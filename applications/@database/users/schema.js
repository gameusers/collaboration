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
  loginId: { type: String, required: true },
  loginPassword: { type: String, required: true },
  email: String,
  name: String,
  status: String,
  playerId: { type: String, required: true, unique: true },
  level: { type: Number, default: 1, required: true },
  followArr: [String],
  followCount:{ type: Number, default: 0, required: true },
  followedArr: [String],
  followedCount:{ type: Number, default: 0, required: true },
  role: { type: String, default: 'User', required: true },
});

module.exports = mongoose.model('users', schema);