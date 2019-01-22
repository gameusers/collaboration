// --------------------------------------------------
//   Require
// --------------------------------------------------

const mongoose = require('mongoose');


// --------------------------------------------------
//   Schema
// --------------------------------------------------

const schema = mongoose.Schema({
  _id: { type: String, required: true },
  users_id: { type: String, required: true },
  gameID: String,
  platform: { type: String, enum: ['PlayStation', 'Xbox', 'Nintendo', 'Steam', 'PC', 'Android', 'iOS', 'Other'], required: true },
  label: String,
  id: { type: String, required: true },
  showType: { type: Number, min: 1, max: 5, required: true },
  search: { type: Boolean, required: true },
});

module.exports = mongoose.model('ids', schema);