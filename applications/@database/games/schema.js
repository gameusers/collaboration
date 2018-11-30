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
  gameId: { type: String, required: true },
  thumbnail: { type: Boolean, required: true },
  imageVideoArr: [
    {
      _id: { type: String, required: true },
      type: { type: String, enum: ['image', 'video'], required: true },
      caption: String,
      fileFormat: { type: String, enum: ['JPEG', 'PNG', 'GIF'] },
      srcSetArr: [
        {
          _id: { type: String, required: true },
          w: { type: String, enum: ['320w', '480w', '640w', '800w', 'source'], required: true },
          width: { type: Number, required: true },
          height: { type: Number, required: true },
        }
      ],
    },
  ],
  dataArr: [
    {
      _id: { type: String, required: true },
      country: { type: String, required: true },
      name: { type: String, required: true },
      subtitle: String,
      similarityArr: [String],
      forSort: { type: String, required: true },
      twitterHashtag: String,
      hardwareArr: [
        {
          _id: { type: String, required: true },
          hardware_id: { type: String, required: true },
          releaseData: Date,
          players: { type: Number, required: true },
          publisher_id: String,
          developer_id: String,
        }
      ],
      linkArr: [
        {
          _id: { type: String, required: true },
          type: { type: String, enum: ['official', 'twitter', 'facebook', 'youtube', 'steam', 'other'], required: true },
          label: String,
          url: { type: String, required: true },
        },
      ],
    },
  ],
});

module.exports = mongoose.model('games', schema);