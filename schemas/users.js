const mongoose = require('mongoose');

const schema = mongoose.Schema({
  username: String,
  password: String,
  date: { type: Date, default: new Date() },
  imagePath: String,
  twitterProfileId: String
});

module.exports = mongoose.model('users', schema);
