const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
  name: String,
  score: Number
});

module.exports = mongoose.model('games', gameSchema);
