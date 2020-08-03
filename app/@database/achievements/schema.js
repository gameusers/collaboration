// --------------------------------------------------
//   Require
// --------------------------------------------------

const mongoose = require('mongoose');


// --------------------------------------------------
//   Schema
// --------------------------------------------------

const schema = mongoose.Schema({
  
  _id: { type: String, required: true },
  type: { type: String, enum: ['level-count', 'account-datetime', 'login-count', 'good-count-click', 'good-count-clicked', 'forum-count-post', 'recruitment-count-post', 'follow-count', 'followed-count', 'title-count', 'title-select', 'card-player-edit', 'card-player-upload-image-main', 'card-player-upload-image-thumbnail', 'user-page-upload-image-main', 'web-push-permission'], required: true },
  limitDay: { type: Number, required: true },
  limitMonth: { type: Number, required: true },
  limitYear: { type: Number, required: true },
  conditionsArr: [
    {
      _id: { type: String, required: true },
      titles_id: { type: String, required: true },
      datetime: { type: Date },
      count: { type: Number },
    }
  ],
  
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