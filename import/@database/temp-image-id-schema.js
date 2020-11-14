// --------------------------------------------------
//   Require
// --------------------------------------------------

const mongoose = require('mongoose');


// --------------------------------------------------
//   Schema
// --------------------------------------------------

const schema = mongoose.Schema({

  _id: { type: String, required: true },
  id1: { type: String },
  id2Arr: [String],
  idThumbnail1: { type: String },
  idThumbnail2: { type: String },
  key: { type: String, required: true },

});


// --------------------------------------------------
//   Exports
// --------------------------------------------------

let model = '';

if (mongoose.models['temp-image-ids']) {
  model = mongoose.model('temp-image-ids');
} else {
  model = mongoose.model('temp-image-ids', schema);
}

module.exports = model;
