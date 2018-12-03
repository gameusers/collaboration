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
  type: { type: Number, min: 1, max: 3, required: true },
  dataArr: [
    {
      _id: { type: String, required: true },
      createdDate: { type: Date, default: Date.now, required: true },
      updatedDate: { type: Date, default: Date.now, required: true },
      lcid: { type: String, enum: ['en', 'ja'], required: true },
      name: { type: String, required: true },
    }
  ]
});

module.exports = mongoose.model('game-genres', schema);