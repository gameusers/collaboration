// --------------------------------------------------
//   Require
// --------------------------------------------------

const mongoose = require('mongoose');
const shortid = require('shortid');


// --------------------------------------------------
//   Schema
// --------------------------------------------------

const schema = mongoose.Schema({
  // _id: { type: String, default: shortid.generate() },
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
  // playerPagePath: String,
  level: { type: Number, default: 1, required: true },
  role: { type: String, default: 'User', required: true },
  // imagePath: String,
  // twitterProfileId: String
});

module.exports = mongoose.model('Users', schema);