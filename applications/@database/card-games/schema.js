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
  users_id: { type: String, required: true },
  games_id: { type: String, required: true },
  theme: String,
  comment: String,
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
  playingHardwareObj: {
    valueArr: [String],
    search: { type: Boolean, required: true },
  },
  itemArr: mongoose.Schema.Types.Mixed,
  idArr: [
    {
      _id: { type: String, required: true },
      quotation_id: String,
      type: { type: String, enum: ['playstation', 'xbox', 'nintendo', 'steam', 'other', 'quotation'], required: true },
      label: String,
      value: { type: String, required: true },
      showType: { type: Number, min: 1, max: 5 },
      search: { type: Boolean, required: true },
    },
  ],
  activityTimeObj: {
    quotation: { type: Boolean, required: true },
    valueArr: [
      {
        _id: { type: String, required: true },
        beginTime: { type: String, required: true },
        endTime: { type: String, required: true },
        weekArr: [Number],
      },
    ],
    search: { type: Boolean, required: true },
  },
  lookingForFriendsObj: {
    quotation: { type: Boolean, required: true },
    value: { type: Boolean, required: true },
    icon: { type: String, required: true },
    comment: String,
    search: { type: Boolean, required: true },
  },
  voiceChatObj: {
    quotation: { type: Boolean, required: true },
    value: { type: Boolean, required: true },
    comment: String,
    search: { type: Boolean, required: true },
  },
  linkArr: [
    {
      _id: { type: String, required: true },
      quotation_id: String,
      type: { type: String, enum: ['twitter', 'facebook', 'instagram', 'youtube', 'twitch', 'steam', 'pixiv', 'other', 'quotation'], required: true },
      label: String,
      url: { type: String, required: true },
      search: { type: Boolean, required: true },
    },
  ],
});

module.exports = mongoose.model('card-games', schema);