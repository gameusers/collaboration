// --------------------------------------------------
//   Require
// --------------------------------------------------

const mongoose = require('mongoose');


// --------------------------------------------------
//   Schema
// --------------------------------------------------

const schema = mongoose.Schema({
  
  _id: { type: String, required: true },
  achievementID: { type: String, required: true },
  urlID: { type: String, required: true },
  language: { type: String, enum: ['en', 'ja'], required: true },
  name: { type: String, required: true },
  
});


// --------------------------------------------------
//   Exports
// --------------------------------------------------

let model = '';

if (mongoose.models.games) {
  model = mongoose.model('achievements');
} else {
  model = mongoose.model('achievements', schema);
}

module.exports = model;