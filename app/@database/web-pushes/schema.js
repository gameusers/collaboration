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
  sendDate: { type: Date },
  available: { type: Boolean, required: true },
  // target_id: { type: String, required: true },
  subscriptionObj: {
    endpoint: { type: String },
    keys: {
      p256dh: { type: String },
      auth: { type: String },
    },
  },
  // errorTotalCount: { type: Number, default: 0, required: true },
  errorCount: { type: Number, default: 0, required: true },
  // errorDatesArr: [String],
  
});


// --------------------------------------------------
//   Exports
// --------------------------------------------------

let model = '';

if (mongoose.models['web-pushes']) {
  model = mongoose.model('web-pushes');
} else {
  model = mongoose.model('web-pushes', schema);
}

module.exports = model;