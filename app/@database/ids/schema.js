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
  users_id: { type: String, required: true },
  gameID: String,
  platform: { type: String, enum: ['PlayStation', 'Xbox', 'Nintendo', 'PC', 'Android', 'iOS', 'Steam', 'Origin', 'Discord', 'Skype', 'ICQ', 'Line', 'Other'], required: true },
  label: String,
  id: { type: String, required: true },
  publicSetting: { type: Number, min: 1, max: 5, required: true },
  search: { type: Boolean, required: true },
});

module.exports = mongoose.model('ids', schema);