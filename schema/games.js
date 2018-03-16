const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: String,
  score: Number,
  date: { type: Date, default: new Date() },
  imagePath: String
});

module.exports = mongoose.model('games', schema);
