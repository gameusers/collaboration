// --------------------------------------------------
//   Require
// --------------------------------------------------

const mongoose = require('mongoose');
const shortid = require('shortid');
// import mongoose from 'mongoose';
// import shortid from 'shortid';


// --------------------------------------------------
//   Schema
// --------------------------------------------------

const schema = mongoose.Schema({
  _id: { type: String, default: shortid.generate() },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  accessDate: { type: Date, default: Date.now },
  loginId: String,
  loginPassword: String,
  email: String,
  name: String,
  status: String,
  playerId: String,
  // playerPagePath: String,
  level: { type: Number, default: 1 },
  // imagePath: String,
  // twitterProfileId: String
});

module.exports = mongoose.model('Users', schema);