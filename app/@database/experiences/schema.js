// --------------------------------------------------
//   Require
// --------------------------------------------------

const mongoose = require('mongoose');


// --------------------------------------------------
//   Schema
// --------------------------------------------------

const schema = mongoose.Schema({
  
  _id: { type: String, required: true },
  createdDate: { type: Date, required: true },
  updatedDate: { type: Date, required: true },
  users_id: { type: String, required: true },
  exp: { type: Number, required: true },
  historiesArr: [
    {
      _id: { type: String, required: true },
      createdDate: { type: Date, required: true },
      updatedDate: { type: Date, required: true },
      type: { type: String, enum: ['login', 'good', 'forum', 'recruitment'], required: true },
      countDay: { type: Number, required: true },
      countMonth: { type: Number, required: true },
      countYear: { type: Number, required: true },
      countTotal: { type: Number, required: true },
    }
  ],
  achievementsArr: [
    {
      _id: { type: String, required: true },
      createdDate: { type: Date, required: true },
      achievementID: { type: String, required: true },
    },
  ],
  selectedArr: [String]
  
});


// --------------------------------------------------
//   Exports
// --------------------------------------------------

let model = '';

if (mongoose.models.games) {
  model = mongoose.model('experiences');
} else {
  model = mongoose.model('experiences', schema);
}

module.exports = model;