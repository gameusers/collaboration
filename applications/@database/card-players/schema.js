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
  userId: { type: String, required: true },
  comment: String,
  imageVideoArr: [
    {
      id: { type: String, required: true },
      type: { enum: ['image', 'video'], required: true },
      caption: String,
      srcSetArr: [
        {
          w: { enum: ['320w', '480w', '640w', '800w', 'source'], required: true },
          width: { type: Number, required: true },
          height: { type: Number, required: true },
          type: { enum: ['JPEG', 'PNG', 'GIF'], required: true }
        }
      ],
    },
  ],
  birthdayObj: {
    value: Date,
    alternativeText: String,
    search: { type: Boolean, required: true },
  },
  sexObj: {
    value: { enum: ['male', 'female'], required: true },
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
  ownedHardwareObj: {
    valueArr: [String],
    search: { type: Boolean, required: true },
  },
  idArr: [
    {
      type: { enum: ['PlayStation', 'Xbox', 'Nintendo', 'Steam', 'Other'], required: true },
      label: String,
      id: { type: String, required: true },
      showType: { type: Number, min: 1, max: 5 },
      search: { type: Boolean, required: true },
    },
  ],
  activityTimeObj: {
    valueArr: [
      {
        beginTime: { type: String, required: true },
        endTime: { type: String, required: true },
        weekArr: [Number],
      },
    ],
    search: { type: Boolean, required: true },
  },
  lookingForFriendsObj: {
    value: { type: Boolean, required: true },
    icon: { type: String, required: true },
    comment: String,
    search: { type: Boolean, required: true },
  },
  voiceChatObj: {
    value: { type: Boolean, required: true },
    comment: String,
    search: { type: Boolean, required: true },
  },
  linkArr: [
    {
      type: { enum: ['twitter', 'facebook', 'instagram', 'youtube', 'twitch', 'steam', 'pixiv', 'other'], required: true },
      label: String,
      url: { type: String, required: true },
      search: { type: Boolean, required: true },
    },
  ],
});

module.exports = mongoose.model('CardPlayers', schema);