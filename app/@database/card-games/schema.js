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
  gameID: { type: String, required: true },
  language: { type: String, enum: ['en', 'ja'], required: true },
  theme: String,
  nameObj: {
    value: String,
    search: { type: Boolean, required: true },
  },
  statusObj: {
    value: String,
    search: { type: Boolean, required: true },
  },
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
  itemArr: mongoose.Schema.Types.Mixed,
  commentObj: {
    value: String,
    search: { type: Boolean, required: true },
  },
  hardwarePlayingObj: {
    valueArr: [String],
    search: { type: Boolean, required: true },
  },
  idArr: [String],
  // idArr: [
  //   {
  //     _id: { type: String, required: true },
  //     quotation_id: String,
  //     type: { type: String, enum: ['PlayStation', 'Xbox', 'Nintendo', 'Steam', 'Other'], required: true },
  //     label: String,
  //     value: { type: String, required: true },
  //     showType: { type: Number, min: 1, max: 5 },
  //     search: { type: Boolean, required: true },
  //   },
  // ],
  activityTimeObj: {
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
    icon: { type: String, required: true },
    comment: String,
    search: { type: Boolean, required: true },
  },
  voiceChatObj: {
    comment: String,
    search: { type: Boolean, required: true },
  },
  linkArr: [
    {
      _id: { type: String, required: true },
      type: { type: String, enum: ['Twitter', 'Facebook', 'Instagram', 'YouTube', 'Twitch', 'Steam', 'Pixiv', 'Other'], required: true },
      label: String,
      url: { type: String, required: true },
      search: { type: Boolean, required: true },
    },
  ],
  quotationObj: {
    cardPlayers_id: { type: String, required: true },
    activityTime: { type: Boolean, required: true },
    lookingForFriends: { type: Boolean, required: true },
    voiceChat: { type: Boolean, required: true },
    link: { type: Boolean, required: true },
  },
});

module.exports = mongoose.model('card-games', schema);