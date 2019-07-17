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
  imagesAndVideosObj: {
    thumbnailArr: [
      {
        _id: { type: String, required: true },
        type: { type: String, enum: ['image', 'video'], required: true },
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
        localesArr: {
          type: [
            {
              _id: { type: String, required: true },
              language: { type: String, enum: ['en', 'ja'] },
              caption: { type: String, required: true },
            }
          ],
          default: undefined,
        },
        srcSetArr: {
          type: [
            {
              _id: { type: String, required: true },
              src: { type: String, required: true },
              w: { type: String, enum: ['320w', '480w', '640w', '800w'], required: true },
              width: { type: Number, required: true },
              height: { type: Number, required: true },
            }
          ],
          default: undefined,
        },
        videoChannel: { type: String, enum: ['youtube'] },
        videoID: String,
      },
    ],
  },
  commentObj: {
    value: String,
    search: { type: Boolean, required: true },
  },
  ageObj: {
    value: Date,
    alternativeText: String,
    search: { type: Boolean, required: true },
  },
  sexObj: {
    value: { type: String, enum: ['empty', 'male', 'female'], required: true },
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
  idArr: [String],
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
      _id: { type: String, required: true },
      type: { type: String, enum: ['Twitter', 'Facebook', 'Instagram', 'YouTube', 'Twitch', 'Steam', 'Discord', 'Flickr', 'Tumblr', 'Pinterest', 'Other'], required: true },
      label: String,
      url: { type: String, required: true },
      search: { type: Boolean, required: true },
    },
  ]
});

module.exports = mongoose.model('card-players', schema);