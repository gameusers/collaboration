// --------------------------------------------------
//   Require
// --------------------------------------------------

const mongoose = require('mongoose');


// --------------------------------------------------
//   Schema
// --------------------------------------------------

const schema = mongoose.Schema({

  _id: { type: String, required: true },
  id: { type: String, required: true },
  key: { type: String, required: true },

});


// --------------------------------------------------
//   Exports
// --------------------------------------------------

let model = '';

if (mongoose.models['temp-ids']) {
  model = mongoose.model('temp-ids');
} else {
  model = mongoose.model('temp-ids', schema);
}

module.exports = model;
