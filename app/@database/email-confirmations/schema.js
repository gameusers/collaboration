// --------------------------------------------------
//   Require
// --------------------------------------------------

const mongoose = require('mongoose');


// --------------------------------------------------
//   Schema
// --------------------------------------------------

const schema = mongoose.Schema({
  _id: { type: String, required: true },
  createdDate: { type: Date, required: true, expires: 86400 },
  users_id: { type: String, required: true },
  emailConfirmationID: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model('email-confirmations', schema);