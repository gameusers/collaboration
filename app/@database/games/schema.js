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
  gameID: { type: String, required: true },
  urlID: { type: String, required: true },
  language: { type: String, enum: ['en', 'ja'], required: true },
  country: { type: String, enum: ['US', 'JP'], required: true },
  imagesAndVideos_id: '',
  imagesAndVideosThumbnail_id: '',
  name: { type: String, required: true },
  subtitle: String,
  searchKeywordsArr: [String],
  sortKeyword: { type: String, required: true },
  twitterHashtag: String,
  genreArr: [String],
  genreSubArr: [String],
  genreTagArr: [String],
  hardwareArr: [
    {
      _id: { type: String, required: true },
      hardwareID: { type: String, required: true },
      releaseDate: Date,
      playersMin: { type: Number, required: true },
      playersMax: { type: Number, required: true },
      publisherID: String,
      developerID: String,
    }
  ],
  linkArr: [
    {
      _id: { type: String, required: true },
      type: { type: String, enum: ['Official', 'Twitter', 'Facebook', 'YouTube', 'Steam', 'Other'], required: true },
      label: String,
      url: { type: String, required: true },
    },
  ]
});


// --------------------------------------------------
//   Exports
// --------------------------------------------------

let model = '';

if (mongoose.models.games) {
  model = mongoose.model('games');
} else {
  model = mongoose.model('games', schema);
}

module.exports = model;