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
  language: { type: String, enum: ['en', 'ja'], required: true },
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
  commentObj: {
    value: String,
    search: { type: Boolean, required: true },
  },
  birthdayObj: {
    value: Date,
    alternativeText: String,
    search: { type: Boolean, required: true },
  },
  sexObj: {
    value: { type: String, enum: ['male', 'female'], required: true },
    alternativeText: String,
    search: { type: Boolean, required: true },
  },
  addressObj: {
    value: String,
    alternativeText: String,
    search: { type: Boolean, required: true },
  },
  gamingExperienceObj: {
    value: Date,
    alternativeText: String,
    search: { type: Boolean, required: true },
  },
  hobbiesObj: {
    valueArr: [String],
    search: { type: Boolean, required: true },
  },
  specialSkillsObj: {
    valueArr: [String],
    search: { type: Boolean, required: true },
  },
  smartphoneObj: {
    model: String,
    comment: String,
    search: { type: Boolean, required: true },
  },
  tabletObj: {
    model: String,
    comment: String,
    search: { type: Boolean, required: true },
  },
  pcObj: {
    model: String,
    comment: String,
    specsObj: {
      os: String,
      cpu: String,
      cpuCooler: String,
      motherboard: String,
      memory: String,
      storage: String,
      graphicsCard: String,
      opticalDrive: String,
      powerSupply: String,
      pcCase: String,
      monitor: String,
      mouse: String,
      keyboard: String
    },
    search: { type: Boolean, required: true },
  },
  hardwareActiveObj: {
    valueArr: [String],
    search: { type: Boolean, required: true },
  },
  hardwareInactiveObj: {
    valueArr: [String],
    search: { type: Boolean, required: true },
  },
  idArr: [
    {
      _id: { type: String, required: true },
      type: { type: String, enum: ['PlayStation', 'Xbox', 'Nintendo', 'Steam', 'Other'], required: true },
      label: String,
      value: { type: String, required: true },
      showType: { type: Number, min: 1, max: 5 },
      search: { type: Boolean, required: true },
    },
  ],
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
  ]
});

module.exports = mongoose.model('card-players', schema);