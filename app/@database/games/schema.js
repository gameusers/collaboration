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
  imagesAndVideosObj: {
    thumbnailArr: [
      {
        _id: { type: String, required: true },
        type: { type: String, enum: ['image', 'video'], required: true },
        caption: String,
        srcSetArr: [
          {
            _id: { type: String, required: true },
            src: { type: String, required: true },
            w: { type: String, enum: ['320w', '480w', '640w', '800w', 'source'], required: true },
            width: { type: Number, required: true },
            height: { type: Number, required: true },
          }
        ],
      },
    ],
    mainArr: [
      {
        _id: { type: String, required: true },
        type: { type: String, enum: ['image', 'video'], required: true },
        caption: String,
        srcSetArr: [
          {
            _id: { type: String, required: true },
            src: { type: String, required: true },
            w: { type: String, enum: ['320w', '480w', '640w', '800w', '960w', '1120w', '1280w', '1440w', '1600w', '1760w', '1920w', 'source'], required: true },
            width: { type: Number, required: true },
            height: { type: Number, required: true },
          }
        ],
      },
    ],
  },
  // thumbnail: { type: Boolean, required: true },
  // imageVideoArr: [
  //   {
  //     _id: { type: String, required: true },
  //     type: { type: String, enum: ['image', 'video'], required: true },
  //     caption: String,
  //     fileFormat: { type: String, enum: ['JPEG', 'PNG', 'GIF'] },
  //     srcSetArr: [
  //       {
  //         _id: { type: String, required: true },
  //         w: { type: String, enum: ['320w', '480w', '640w', '800w', 'source'], required: true },
  //         width: { type: Number, required: true },
  //         height: { type: Number, required: true },
  //       }
  //     ],
  //   },
  // ],
  name: { type: String, required: true },
  subtitle: String,
  searchKeywordsArr: [String],
  forSort: { type: String, required: true },
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

// module.exports = mongoose.model('games', schema);