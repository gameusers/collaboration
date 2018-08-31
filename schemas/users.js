// --------------------------------------------------
//   Import
// --------------------------------------------------

import mongoose from 'mongoose';
import shortid from 'shortid';


// --------------------------------------------------
//   Schema
// --------------------------------------------------

const schema = mongoose.Schema({
  _id: { type: String, default: shortid.generate() },
  createdDate: { type: Date, default: new Date() },
  updatedDate: { type: Date, default: new Date() },
  accessDate: { type: Date, default: new Date() },
  username: String,
  password: String,
  name: String,
  status: String,
  playerId: String,
  playerPagePath: String,
  level: { type: Number, default: 1 },
  imagePath: String,
  twitterProfileId: String
});

module.exports = mongoose.model('Users', schema);
