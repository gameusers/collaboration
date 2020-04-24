// --------------------------------------------------
//   File ID: Mv7RFeKQ1
// --------------------------------------------------

// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'public/' });
const shortid = require('shortid');
const moment = require('moment');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { errorCodeIntoErrorObj } = require('../@modules/error/error-obj');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const SchemaUsers = require('../@database/users/model');
const SchemaGames = require('../@database/games/model');
const SchemaIDs = require('../@database/ids/model');
const SchemaCardPlayers = require('../@database/card-players/model');
// const SchemaCardGames = require('../@database/card-games/model');
const SchemaGameGenres = require('../@database/game-genres/model');
const SchemaHardwares = require('../@database/hardwares/model');
const SchemaDevelopersPublishers = require('../@database/developers-publishers/model');
const SchemaEmailConfirmations = require('../@database/email-confirmations/model');
const SchemaImagesAndVideos = require('../@database/images-and-videos/model');
const SchemaGameCommunities = require('../@database/game-communities/model');
const SchemaUserCommunities = require('../@database/user-communities/model');
const SchemaForumThreads = require('../@database/forum-threads/model');
const SchemaForumComments = require('../@database/forum-comments/model');
const SchemaRecruitmentThreads = require('../@database/recruitment-threads/model');
const SchemaRecruitmentComments = require('../@database/recruitment-comments/model');
const SchemaRecruitmentReplies = require('../@database/recruitment-replies/model');
const SchemaFollows = require('../@database/follows/model');
const SchemaGoods = require('../@database/goods/model');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

// const { addLocaleData } = require('react-intl');
// const en = require('react-intl/locale-data/en');
// const ja = require('react-intl/locale-data/ja');
// addLocaleData([...en, ...ja]);

const { locale } = require('../@locales/locale');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();




// --------------------------------------------------
//   Status Code & Error Arguments Object
// --------------------------------------------------

let statusCode = 400;

let errorArgumentsObj = {
  fileID: 'Mv7RFeKQ1',
  functionID: '',
  errorCodeArr: [],
  errorObj: {},
  loginUsers_id: ''
};




// --------------------------------------------------
//   Initial Props / endpointID: gUwZx1hDG
// --------------------------------------------------

router.post('/db', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  // const localeObj = locale({
  //   acceptLanguage: req.headers['accept-language']
  // });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  errorArgumentsObj.functionID = 'gUwZx1hDG';
  
  
  
  
  try {
    
    
    // --------------------------------------------------
    //   Development Check
    // --------------------------------------------------
    
    if (process.env.NODE_ENV !== 'development') {
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    let returnObj = {};
    let saveArr = [];
    const ISO8601 = moment().utc().toISOString();
    
    
    
    
    // --------------------------------------------------
    //   DB / Users
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Save Object
    // ---------------------------------------------
    
    saveArr = [
      {
        _id: 'jun-deE4J',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        accessDate: ISO8601,
        userID: 'user1',
        pagesObj: {
          imagesAndVideos_id: '',
          arr: [
            {
              _id: '51WW1NG1r',
              type: 'top',
              name: 'マリオのプロフィール',
              language: 'ja',
            },
          ],
        },
        loginID: '8OM0dhDak',
        loginPassword: '$2b$10$NsuOPWswqCkJ2STKfbKg/OMXfxdWabz1oy36HKOwRojHJ4S8FPsPS',
        emailObj: {
          value: '38cda58a026a9703cc8f5e8a104d8c88ab32965e4e6aba5e18ca93366c71e7db',// aaa@gameusers.org
          confirmation: true,
        },
        countriesArr: ['JP'],
        termsOfServiceConfirmedDate: ISO8601,
        exp: 999,
        achievementsArr: [// 実績用
          {
            _id: 'pFJEn_2MO',
            createdDate: ISO8601,
            updatedDate: ISO8601,
            achievementID: 'MuK2dKVpn',
            count: 1,
          }
        ],
        // webPushSubscriptionObj: {
        //   endpoint: '',
        //   keys: {
        //     p256dh: '',
        //     auth: ''
        //   }
        // },
        webPushSubscriptionObj: {
          endpoint: 'https://fcm.googleapis.com/fcm/send/fStle9C5HJk:APA91bFMuBrN4DaT6QOVLhkXbaDJCTEM3q0hE8gM_FPqMqE7SgN6fkxylrFLfve3C8QA7O03Q-UWMXI2LQINSpCCveDrMV3FOpTfPfRhjabMbM43dsBVcKHJy4QcasADEW9KqA40Ea5y',
          keys: {
            p256dh: 'BCleeWTRP95hSeOXd3lTmcGInU2AFR4xEfy6W_kgzwd7IT_GMXzbhriEerFEFZDEXOQJNTGUFObhkol2P7qTMWw',
            auth: 'siDbUa9DCbg-n9AMsvWA1w'
          }
        },
        role: 'user'
      },
      
      
      {
        _id: 'P7UJMuUnx',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        accessDate: ISO8601,
        userID: 'user2',
        pagesObj: {
          imagesAndVideos_id: '',
          arr: [],
        },
        loginID: 'enPLLYBBEg3y',
        loginPassword: '$2b$10$.O/ZmfEO2QOV6IRxxmQO1eSRMx8yhL83ISq9z/gyOpTCtbYL3j4B.',
        emailObj: {
          value: '0509b58e75540f35054f9b7acdbf0771ae7151614f805a61fe2556f6fe947e78',// bbb@gameusers.org
          confirmation: false,
        },
        countriesArr: ['JP'],
        termsOfServiceConfirmedDate: ISO8601,
        exp: 10,
        achievementsArr: [],
        webPushSubscriptionObj: {
          endpoint: '',
          keys: {
            p256dh: '',
            auth: ''
          }
        },
        role: 'user'
      },
      
      
      {
        _id: '6GWOpEcD3',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        accessDate: ISO8601,
        userID: 'user3',
        pagesObj: {
          imagesAndVideos_id: '',
          arr: [],
        },
        loginID: 'nzPR7R9GO',
        loginPassword: '$2b$10$.qPAsMTPieChFehxF7TC2OXYWZdek0FKuJPABVxtBPo1UzrpOwZ6.',
        emailObj: {
          value: '',
          confirmation: false,
        },
        countriesArr: ['JP'],
        termsOfServiceConfirmedDate: ISO8601,
        exp: 0,
        achievementsArr: [],
        webPushSubscriptionObj: {
          endpoint: '',
          keys: {
            p256dh: '',
            auth: ''
          }
        },
        role: 'user'
      },
    ];
    
    
    // ---------------------------------------------
    //   Upsert
    // ---------------------------------------------
    
    await SchemaUsers.deleteMany({ reset: true });
    returnObj = await SchemaUsers.insertMany({ saveArr });
    
    
    
    
    // --------------------------------------------------
    //   DB / Games
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Save Object
    // ---------------------------------------------
    
    saveArr = [
      
      
      {
        _id: 'w_zkqpr3R',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        gameCommunities_id: 'Jk92aglWl',
        urlID: 'Dead-by-Daylight',
        language: 'ja',
        country: 'JP',
        imagesAndVideos_id: 'jhxEOPKbg',
        imagesAndVideosThumbnail_id: '2G5j7D3AM',
        name: 'Dead by Daylight',
        subtitle: '',
        searchKeywordsArr: [
          'デッドバイデイライト',
          'でっどばいでいらいと',
          'Dead by Daylight',
          'DbD',
        ],
        sortKeyword: 'デッドバイデイライト',
        twitterHashtag: 'DeadbyDaylight',
        genreArr: ['YC3gSkK67'],
        genreSubArr: [],
        genreTagArr: [],
        hardwareArr: [
          {
            _id: '9ePBexkQh',
            hardwareID: 'P0UG-LHOQ',
            releaseDate: '2016-06-14T00:00:00.000Z',
            playersMin: 1,
            playersMax: 5,
            publisherID: 'YtKRcK3Ar',
            developerID: 'YtKRcK3Ar',
          },
          {
            _id: 'pIcOj6-43',
            hardwareID: 'TdK3Oc-yV',
            releaseDate: '2018-04-04T00:00:00.000Z',
            playersMin: 1,
            playersMax: 5,
            publisherID: 'YtKRcK3Ar',
            developerID: 'YtKRcK3Ar',
          },
          {
            _id: '45jlnaOGB',
            hardwareID: 'uPqoiXA_8',
            releaseDate: '2017-06-23T00:00:00.000Z',
            playersMin: 1,
            playersMax: 5,
            publisherID: 'YtKRcK3Ar',
            developerID: 'YtKRcK3Ar',
          },
          {
            _id: 'XEqwnquRs',
            hardwareID: 'Zd_Ia4Hwm',
            releaseDate: '2019-08-04T00:00:00.000Z',
            playersMin: 1,
            playersMax: 5,
            publisherID: 'YtKRcK3Ar',
            developerID: 'YtKRcK3Ar',
          },
        ],
        linkArr: [
          {
            _id: 'aiK3_xZsM',
            type: 'Twitter',
            label: '',
            url: 'https://twitter.com/',
          },
          {
            _id: 'YPIzVEYuA',
            type: 'Facebook',
            label: '',
            url: 'https://ja-jp.facebook.com/',
          },
          {
            _id: 'j14biyEhD',
            type: 'YouTube',
            label: '',
            url: 'https://www.youtube.com/',
          },
          {
            _id: 'RAI0yDihN',
            type: 'Steam',
            label: '',
            url: 'https://steamcommunity.com/',
          },
          {
            _id: 'BtePeoi0i',
            type: 'Other',
            label: '開発サイト',
            url: 'http://dev-1.gameusers.org:8080/',
          },
        ],
      },
      
      
      {
        _id: 'dhjc8SPwK',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        gameCommunities_id: 'Jk92aglWl',
        urlID: 'Dead-by-Daylight',
        language: 'en',
        country: 'US',
        imagesAndVideos_id: '',
        imagesAndVideosThumbnail_id: '',
        name: 'Dead by Daylight',
        subtitle: '',
        searchKeywordsArr: [
          'Dead by Daylight',
          'DbD',
        ],
        sortKeyword: 'Dead by Daylight',
        twitterHashtag: 'DeadbyDaylight',
        genreArr: ['YC3gSkK67'],
        genreSubArr: [],
        genreTagArr: [],
        hardwareArr: [
          {
            _id: '7kDhzjxI9',
            hardwareID: 'TdK3Oc-yV',
            releaseDate: '2016-06-14T00:00:00.000Z',
            playersMin: 1,
            playersMax: 5,
            publisherID: 'YtKRcK3Ar',
            developerID: 'YtKRcK3Ar',
          }
        ],
        linkArr: [
          {
            _id: 'MBT2C5WGE',
            type: 'Twitter',
            label: '',
            url: 'https://twitter.com/',
          },
        ]
      },
      
      
      {
        _id: '8OKcZy3R-',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        gameCommunities_id: 'lxdubg6IY',
        urlID: 'Super-Smash-Bros-SPECIAL',
        language: 'ja',
        country: 'JP',
        imagesAndVideos_id: '',
        imagesAndVideosThumbnail_id: '',
        name: '大乱闘スマッシュブラザーズ SPECIAL',
        subtitle: '',
        searchKeywordsArr: [
          '大乱闘スマッシュブラザーズ SPECIAL',
          '大乱闘スマッシュブラザーズSPECIAL',
          '大乱闘スマッシュブラザーズスペシャル',
          'スマブラSP',
        ],
        sortKeyword: 'ダイラントウスマッシュブラザーズスペシャル',
        twitterHashtag: 'スマブラSP',
        genreArr: ['n2k7J_e12'],
        genreSubArr: [],
        genreTagArr: [],
        hardwareArr: [
          {
            _id: '4q7tQG2I8',
            hardwareID: 'Zd_Ia4Hwm',
            releaseDate: '2018-12-07T00:00:00.000Z',
            playersMin: 1,
            playersMax: 8,
            publisherID: 'mcMOetOTh',
            developerID: 'mcMOetOTh',
          }
        ],
        linkArr: [
          {
            _id: 'VZ2G-g2a4',
            type: 'Official',
            label: '',
            url: 'https://www.smashbros.com/ja_JP/',
          },
          {
            _id: 'l0oy9ei0f',
            type: 'Twitter',
            label: '',
            url: 'https://twitter.com/smashbrosjp',
          },
        ],
      },
      
      
      {
        _id: '007_qLOR2',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        gameCommunities_id: 'lxdubg6IY',
        urlID: 'Super-Smash-Bros-Ultimate',
        language: 'en',
        country: 'US',
        imagesAndVideos_id: '',
        imagesAndVideosThumbnail_id: '',
        name: 'Super Smash Bros. Ultimate',
        subtitle: '',
        searchKeywordsArr: [
          'Super Smash Bros. Ultimate',
        ],
        sortKeyword: 'Super Smash Bros. Ultimate',
        twitterHashtag: '',
        genreArr: ['n2k7J_e12'],
        genreSubArr: [],
        genreTagArr: [],
        hardwareArr: [
          {
            _id: '4q7tQG2I8',
            hardwareID: 'Zd_Ia4Hwm',
            releaseDate: '2018-12-07T00:00:00.000Z',
            playersMin: 1,
            playersMax: 8,
            publisherID: 'mcMOetOTh',
            developerID: 'mcMOetOTh',
          }
        ],
        linkArr: [
          {
            _id: 'Tqogz4MEv',
            type: 'Official',
            label: '',
            url: 'https://www.smashbros.com/en_US/',
          },
          {
            _id: 'fH-Ttr3wh',
            type: 'Twitter',
            label: '',
            url: 'https://twitter.com/NintendoVS',
          },
        ],
      },
      
      
      {
        _id: 'PdWVRzkoW',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        gameCommunities_id: 'YcIvt9hf7',
        urlID: 'Dragon-Quest-Builders2',
        language: 'ja',
        country: 'JP',
        imagesAndVideos_id: 'PdWVRzkoW',
        imagesAndVideosThumbnail_id: 'I_n3l4y8_',
        name: 'ドラゴンクエストビルダーズ2',
        subtitle: '',
        searchKeywordsArr: [
          'ドラゴンクエストビルダーズ2',
          'ドラクエビルダーズ2',
          'DQB2'
        ],
        sortKeyword: 'ドラゴンクエストビルダーズ2',
        twitterHashtag: 'DQB2',
        genreArr: ['sU94RUPS7'],
        genreSubArr: [],
        genreTagArr: [],
        hardwareArr: [
          {
            _id: 'loHJZngJ2',
            hardwareID: 'TdK3Oc-yV',
            releaseDate: '2018-12-20T00:00:00.000Z',
            playersMin: 1,
            playersMax: 4,
            publisherID: 'zXOweU_0y',
            developerID: 'zXOweU_0y',
          },
          {
            _id: 'N_O4r9Xfe',
            hardwareID: 'Zd_Ia4Hwm',
            releaseDate: '2017-12-20T00:00:00.000Z',
            playersMin: 1,
            playersMax: 4,
            publisherID: 'zXOweU_0y',
            developerID: 'zXOweU_0y',
          },
        ],
        linkArr: [
          {
            _id: 'uW1gkb8B6',
            type: 'Official',
            label: '',
            url: 'http://www.dragonquest.jp/builders2/',
          },
          {
            _id: 'frOx6A5WQ',
            type: 'Twitter',
            label: '',
            url: 'https://twitter.com/DQ_BUILDERS2',
          },
        ],
      },
      
      
      {
        _id: 'LQevTtUuJ',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        gameCommunities_id: 'WMHFmAp8e',
        urlID: 'Overcooked2',
        language: 'ja',
        country: 'JP',
        imagesAndVideos_id: '',
        imagesAndVideosThumbnail_id: 'DGTgnBdOd',
        name: 'Overcooked 2',
        subtitle: '',
        searchKeywordsArr: [
          'オーバークック2',
          'オバク2',
          'おーばーくっく2',
          'おばく',
          'Overcooked 2',
        ],
        sortKeyword: 'オーバークック2',
        twitterHashtag: 'Overcooked2',
        genreArr: ['YC3gSkK67'],
        genreSubArr: [],
        genreTagArr: [],
        hardwareArr: [
          {
            _id: 'VPzn7A__v',
            hardwareID: 'P0UG-LHOQ',
            releaseDate: '2018-08-08T00:00:00.000Z',
            playersMin: 1,
            playersMax: 4,
            publisherID: 'ELrNnOjDc',
            developerID: 'xu-H3gHC7',
          },
          {
            _id: '6dzxwiIcs',
            hardwareID: 'TdK3Oc-yV',
            releaseDate: '2018-08-08T00:00:00.000Z',
            playersMin: 1,
            playersMax: 4,
            publisherID: 'ELrNnOjDc',
            developerID: 'xu-H3gHC7',
          },
          {
            _id: 'Ra0mLWzB8',
            hardwareID: 'uPqoiXA_8',
            releaseDate: '2018-08-08T00:00:00.000Z',
            playersMin: 1,
            playersMax: 4,
            publisherID: 'ELrNnOjDc',
            developerID: 'xu-H3gHC7',
          },
          {
            _id: 'kVesCU_YT',
            hardwareID: 'Zd_Ia4Hwm',
            releaseDate: '2018-08-08T00:00:00.000Z',
            playersMin: 1,
            playersMax: 4,
            publisherID: 'ELrNnOjDc',
            developerID: 'xu-H3gHC7',
          },
        ],
        linkArr: [
          {
            _id: 'JQ-XzUWIQ',
            type: 'Twitter',
            label: '',
            url: 'https://twitter.com/',
          },
          {
            _id: 'gPLlOYRTr',
            type: 'Facebook',
            label: '',
            url: 'https://ja-jp.facebook.com/',
          },
          {
            _id: '13E0goy_I',
            type: 'YouTube',
            label: '',
            url: 'https://www.youtube.com/',
          },
          {
            _id: 'SUhHRGV72',
            type: 'Steam',
            label: '',
            url: 'https://steamcommunity.com/',
          },
          {
            _id: 'vmg2X8tyU',
            type: 'Other',
            label: 'Ghost Town Games',
            url: 'http://www.ghosttowngames.com/overcooked-2/',
          },
          {
            _id: '6J6VGT8DX',
            type: 'Other',
            label: 'Team17',
            url: 'https://www.team17.com/games/overcooked-2/',
          },
        ],
      },
      
    ];
    
    
    // ---------------------------------------------
    //   Upsert
    // ---------------------------------------------
    
    await SchemaGames.deleteMany({ reset: true });
    returnObj = await SchemaGames.insertMany({ saveArr });
    
    
    
    
    // --------------------------------------------------
    //   DB / Game Genres
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Save Arr
    // ---------------------------------------------
    
    saveArr = [
      {
        _id: 'nO7XxHZYM',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'en',
        country: 'US',
        genreID: 'YC3gSkK67',
        name: 'Action'
      },
      {
        _id: 'iWeBuc0j2',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        genreID: 'YC3gSkK67',
        name: 'アクション'
      },
      
      
      {
        _id: 'ksTu6wRs0l',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'en',
        country: 'US',
        genreID: 'jpPfXudBt',
        name: 'Shooter'
      },
      {
        _id: 'ohPaZnDHr',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        genreID: 'jpPfXudBt',
        name: 'シューティング'
      },
      
      
      {
        _id: 'ouLGbf_KSd',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'en',
        country: 'US',
        genreID: 'aiB1RZ0f8',
        name: 'Adventure'
      },
      {
        _id: 'XErEwHoNy',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        genreID: 'aiB1RZ0f8',
        name: 'アドベンチャー'
      },
      
      
      {
        _id: '9iRS29w3we',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'en',
        country: 'US',
        genreID: 'sU94RUPS7',
        name: 'RPG'
      },
      {
        _id: 'acQTo-M0r',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        genreID: 'sU94RUPS7',
        name: 'RPG'
      },
      
      
      {
        _id: '0Uaz_dOxXq',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'en',
        country: 'US',
        genreID: 'lDdVW5ANX',
        name: 'Simulation'
      },
      {
        _id: 'AmPQz8iqR',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        genreID: 'lDdVW5ANX',
        name: 'シミュレーター'
      },
      
      
      {
        _id: 'RpptnE2zlp',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'en',
        country: 'US',
        genreID: '-HKDHuR2v',
        name: 'Strategy'
      },
      {
        _id: 'nwCUpgBxm',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        genreID: '-HKDHuR2v',
        name: 'シミュレーション（ストラテジー）'
      },
      
      
      {
        _id: 'b_QI2RFSEQ6',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'en',
        country: 'US',
        genreID: 'NCt2Bb7WF',
        name: 'Sports'
      },
      {
        _id: 'nbGG_uNfA',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        genreID: 'NCt2Bb7WF',
        name: 'スポーツ'
      },
      
      
      {
        _id: 'mlfWkx-ZxJL',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'en',
        country: 'US',
        genreID: 'CoIMeJDxB',
        name: 'Racing'
      },
      {
        _id: 'kQ_135dZL',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        genreID: 'CoIMeJDxB',
        name: 'レース'
      },
      
      
      {
        _id: 'deBQJJV-m8s',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'en',
        country: 'US',
        genreID: 'n2k7J_e12',
        name: 'Fighting'
      },
      {
        _id: 'kG0O00psM',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        genreID: 'n2k7J_e12',
        name: '格闘ゲーム'
      },
      
      
      {
        _id: 'uEUpcTb87D_',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'en',
        country: 'US',
        genreID: 'SV1mg4iuD',
        name: 'Puzzle'
      },
      {
        _id: 'qrIbvFXm2',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        genreID: 'SV1mg4iuD',
        name: 'パズル'
      },
      
      
      {
        _id: 'ejdGhTwE1Gb',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'en',
        country: 'US',
        genreID: '691Od0Wty',
        name: 'Board game / Card game'
      },
      {
        _id: 'lkNbIGAUE',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        genreID: '691Od0Wty',
        name: 'ボードゲーム / カードゲーム'
      },
      
      
      {
        _id: 'cU9z-CA3d29',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'en',
        country: 'US',
        genreID: 'rsx6C2bsy',
        name: 'Music game'
      },
      {
        _id: '7Asj0C1FV',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        genreID: 'rsx6C2bsy',
        name: '音ゲー'
      },
      
      
      {
        _id: 'bfxzmy3eib9',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'en',
        country: 'US',
        genreID: 'HBpRRumc3',
        name: 'Other'
      },
      {
        _id: 'Nm8Nyp82f',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        genreID: 'HBpRRumc3',
        name: 'その他'
      },
    ]
    
    
    // --------------------------------------------------
    //   insertMany
    // --------------------------------------------------
    
    await SchemaGameGenres.deleteMany({ reset: true });
    returnObj = await SchemaGameGenres.insertMany({ saveArr });
    
    
    
    
    // --------------------------------------------------
    //   DB / Hardware
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Save Arr
    // ---------------------------------------------
    
    saveArr = [
      {
        _id: '4FJM8n4Xa',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'en',
        country: 'US',
        hardwareID: 'I-iu-WmkO',
        name: 'Nintendo Entertainment System',
        searchKeywordsArr: [
          'Nintendo Entertainment System',
          'NES',
        ]
      },
      {
        _id: 'R6uD6BzZ5',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'I-iu-WmkO',
        name: 'ファミリーコンピュータ',
        searchKeywordsArr: [
          'ファミリーコンピューター',
          'ファミコン',
          'ふぁみりーこんぴゅーたー',
          'ふぁみこん',
          'Family Computer',
          'FamilyComputer',
          'Famicom',
          'FC',
        ]
      },
      
      
      {
        _id: 'adzG1JLYu',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'KyOSlwcLk',
        name: 'PCエンジン',
        searchKeywordsArr: [
          'PCエンジン',
          'ピーシーエンジン',
          'ぴーしーえんじん',
          'PC Engine',
          'PCEngine',
          'PCE',
        ]
      },
      
      
      {
        _id: 'KVvkuvZF2',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: '2yKF4qXAw',
        name: 'メガドライブ',
        searchKeywordsArr: [
          'メガドライブ',
          'めがどらいぶ',
          'MEGA DRIVE',
          'MEGADRIVE',
          'MD',
        ]
      },
      
      
      {
        _id: 'WOQKUSPPR',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'eKmDxi8lX',
        name: 'スーパーファミコン',
        searchKeywordsArr: [
          'スーパーファミコン',
          'スーファミ',
          'すーぱーふぁみこん',
          'すーふぁみ',
          'SUPER Famicom',
          'SUPERFamicom',
          'Super Family Computer',
          'SuperFamilyComputer',
          'SFC',
        ]
      },
      
      
      {
        _id: '8oGNQ2hMR',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'Z4R-SPN2-',
        name: 'ネオジオ',
        searchKeywordsArr: [
          'ネオジオ',
          'ねおじお',
          'NEO GEO',
          'NEOGEO',
          'NEO・GEO',
          'NG',
        ]
      },
      
      
      {
        _id: '9zeb0m_13',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'lBSGQeGmx',
        name: 'セガサターン',
        searchKeywordsArr: [
          'セガサターン',
          'せがさたーん',
          'SEGA SATURN',
          'SEGASATURN',
          'SS',
        ]
      },
      
      
      {
        _id: 'zSvRzOp0V',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'zB4ivcsqM',
        name: 'PlayStation',
        searchKeywordsArr: [
          'プレイステーション',
          'プレーステーション',
          'プレステ',
          'ぷれいすてーしょん',
          'ぷれーすてーしょん',
          'ぷれすて',
          'Play Station',
          'PlayStation',
          'PS',
        ]
      },
      
      
      {
        _id: 'wlDy9Dqmv',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'o9bdsq5af',
        name: 'バーチャルボーイ',
        searchKeywordsArr: [
          'バーチャルボーイ',
          'ばーちゃるぼーい',
          'VIRTUAL BOY',
          'VIRTUALBOY',
          'VB',
        ]
      },
      
      
      {
        _id: 'N-V_maXNc',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: '45syCFviA',
        name: 'NINTENDO64',
        searchKeywordsArr: [
          '任天堂64',
          '任天堂６４',
          'ニンテンドー64',
          'ニンテンドウ64',
          'ニンテンドオ64',
          'ニンテンドー６４',
          'ニンテンドウ６４',
          'ニンテンドオ６４',
          'ニンテンドーロクジュウヨン',
          'ニンテンドウロクジュウヨン',
          'ニンテンドオロクジュウヨン',
          'ロクヨン',
          'にんてんどー64',
          'にんてんどう64',
          'にんてんどお64',
          'にんてんどー６４',
          'にんてんどう６４',
          'にんてんどお６４',
          'にんてんどーろくじゅうよん',
          'にんてんどうろくじゅうよん',
          'にんてんどおろくじゅうよん',
          'ろくよん',
          'NINTENDO 64',
          'NINTENDO64',
          'N64',
        ]
      },
      
      
      {
        _id: 'iZ7MmkuQw',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'Kj_Djheqt',
        name: 'ドリームキャスト',
        searchKeywordsArr: [
          'ドリームキャスト',
          'ドリキャス',
          'どりーむきゃすと',
          'どりきゃす',
          'Dreamcast',
          'DC',
        ]
      },
      
      
      {
        _id: 'I2cKTLJNk',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: '8RERfeQQ9',
        name: 'PlayStation 2',
        searchKeywordsArr: [
          'プレイステーション2',
          'プレーステーション2',
          'プレステ2',
          'プレイステーション２',
          'プレーステーション２',
          'プレステ２',
          'プレイステーションツー',
          'プレーステーションツー',
          'プレステツー',
          'ぷれいすてーしょん2',
          'ぷれーすてーしょん2',
          'ぷれすて2',
          'ぷれいすてーしょん２',
          'ぷれーすてーしょん２',
          'ぷれすて２',
          'ぷれいすてーしょんつー',
          'ぷれーすてーしょんつー',
          'ぷれすてつー',
          'Play Station 2',
          'PlayStation 2',
          'PlayStation2',
          'PS2',
        ]
      },
      
      
      {
        _id: 'PlRw2lxiy',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'XLUt628gr',
        name: 'ニンテンドーゲームキューブ',
        searchKeywordsArr: [
          '任天堂ゲームキューブ',
          'ニンテンドーゲームキューブ',
          'ニンテンドウゲームキューブ',
          'ニンテンドオゲームキューブ',
          'にんてんどーげーむきゅーぶ',
          'にんてんどうげーむきゅーぶ',
          'にんてんどおげーむきゅーぶ',
          'NINTENDO GAMECUBE',
          'NINTENDOGAMECUBE',
          'NGC',
          'GC',
        ]
      },
      
      
      {
        _id: 'XLUt628gr',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: '78lc0hPjL',
        name: 'Xbox',
        searchKeywordsArr: [
          'エックスボックス',
          'えっくすぼっくす',
          'Xbox',
        ]
      },
      
      
      {
        _id: 'NiozcDYe-',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: '08Qp5KxPA',
        name: 'Xbox 360',
        searchKeywordsArr: [
          'エックスボックス360',
          'エックスボックス３６０',
          'エックスボックスサンロクマル',
          'エックスボックスサンビャクロクジュウ',
          'えっくすぼっくす360',
          'えっくすぼっくす３６０',
          'えっくすぼっくすさんろくまる',
          'えっくすぼっくすさんびゃくろくじゅう',
          'Xbox 360',
          'Xbox360',
          'X360'
        ]
      },
      
      
      {
        _id: '4iGMasHh4',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'YNZ6nb1Ki',
        name: 'PlayStation 3',
        searchKeywordsArr: [
          'プレイステーション3',
          'プレーステーション3',
          'プレステ3',
          'プレイステーション３',
          'プレーステーション３',
          'プレステ３',
          'プレイステーションスリー',
          'プレーステーションスリー',
          'プレステスリー',
          'ぷれいすてーしょん3',
          'ぷれーすてーしょん3',
          'ぷれすて3',
          'ぷれいすてーしょん３',
          'ぷれーすてーしょん３',
          'ぷれすて３',
          'ぷれいすてーしょんすりー',
          'ぷれーすてーしょんすりー',
          'ぷれすてすりー',
          'Play Station 3',
          'PlayStation 3',
          'PlayStation3',
          'PS3',
        ]
      },
      
      
      {
        _id: '91N2yPx6B',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'n3wYKZ_ao',
        name: 'Wii',
        searchKeywordsArr: [
          'ウィー',
          'ウイー',
          'うぃー',
          'ういー',
          'Wii',
          'We',
        ]
      },
      
      
      {
        _id: 'qX8WLLubQ',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'GTxWVd0z-',
        name: 'Wii U',
        searchKeywordsArr: [
          'ウィーユー',
          'ウイーユー',
          'うぃーゆー',
          'ういーゆー',
          'Wii U',
          'Wi U',
          'We U',
          'WiiU',
          'WiU',
          'WeU',
        ]
      },
      
      
      {
        _id: 'FW76LaH_H',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'TdK3Oc-yV',
        name: 'PlayStation 4',
        searchKeywordsArr: [
          'プレイステーション4',
          'プレーステーション4',
          'プレステ4',
          'プレイステーション４',
          'プレーステーション４',
          'プレステ４',
          'プレイステーションフォー',
          'プレーステーションフォー',
          'プレステフォー',
          'ぷれいすてーしょん4',
          'ぷれーすてーしょん4',
          'ぷれすて4',
          'ぷれいすてーしょん４',
          'ぷれーすてーしょん４',
          'ぷれすて４',
          'ぷれいすてーしょんふぉー',
          'ぷれーすてーしょんふぉー',
          'ぷれすてふぉー',
          'Play Station 4',
          'PlayStation 4',
          'PlayStation4',
          'PS4',
        ]
      },
      
      
      {
        _id: 'vk2kF94Ks',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'uPqoiXA_8',
        name: 'Xbox One',
        searchKeywordsArr: [
          'エックスボックスワン',
          'エックスボックスイチ',
          'えっくすぼっくすわん',
          'えっくすぼっくすいち',
          'Xbox One',
          'XboxOne',
          'Xbox 1',
          'Xbox1',
          'XO'
        ]
      },
      
      
      {
        _id: 'Gu1hYjbv7',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'Zd_Ia4Hwm',
        name: 'Nintendo Switch',
        searchKeywordsArr: [
          '任天堂スイッチ',
          '任天堂スウィッチ',
          'ニンテンドースイッチ',
          'ニンテンドースウィッチ',
          'ニンテンドウスイッチ',
          'ニンテンドウスウィッチ',
          'ニンテンドオスイッチ',
          'ニンテンドオスウィッチ',
          'にんてんどーすいっち',
          'にんてんどーすうぃっち',
          'にんてんどうすいっち',
          'にんてんどうすうぃっち',
          'にんてんどおすいっち',
          'にんてんどおすうぃっち',
          'Nintendo Switch',
          'NintendoSwitch',
          'NS',
        ]
      },
      
      
      {
        _id: '_z4DBLYNi',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'XBKalRRW7',
        name: 'ゲームボーイ',
        searchKeywordsArr: [
          'ゲームボーイ',
          'げーむぼーい',
          'Game Boy',
          'GameBoy',
          'GB',
        ]
      },
      
      
      {
        _id: '9Z6Wh_JJ2',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'sO2U2PzHl',
        name: 'ゲームギア',
        searchKeywordsArr: [
          'ゲームギア',
          'げーむぎあ',
          'GAME GEAR',
          'GAMEGEAR',
          'GG',
        ]
      },
      
      
      {
        _id: 'QQtnx7FEN',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'qBsY8y0nO',
        name: 'PCエンジンGT',
        searchKeywordsArr: [
          'PCエンジンGT',
          'ピーシーエンジンジーティー',
          'ぴーしーえんじんじーてぃー',
          'PC Engine GT',
          'PCEngineGT',
          'PCEGT',
        ]
      },
      
      
      {
        _id: 'IcH7HG2f7',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'u3SQqtJ-u',
        name: 'ネオジオポケット',
        searchKeywordsArr: [
          'ネオジオポケット',
          'ねおじおぽけっと',
          'NEO GEO POCKET',
          'NEOGEO POCKET',
          'NEOGEOPOCKET',
          'NEO・GEO POCKET',
          'NGP',
        ]
      },
      
      
      {
        _id: 'S2Q_3MrBo',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'PYIE0rv_e',
        name: 'ワンダースワン',
        searchKeywordsArr: [
          'ワンダースワン',
          'わんだーすわん',
          'Wonder Swan',
          'WonderSwan',
          'WS',
        ]
      },
      
      
      {
        _id: '4OkTt-VSM',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'AIvzEgDCd',
        name: 'ゲームボーイアドバンス',
        searchKeywordsArr: [
          'ゲームボーイアドバンス',
          'げーむぼーいあどばんす',
          'GAMEBOY ADVANCE',
          'GAMEBOYADVANCE',
          'GBA',
        ]
      },
      
      
      {
        _id: 'Uem6UalMW',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'HATpnt7sl',
        name: 'ニンテンドーDS',
        searchKeywordsArr: [
          '任天堂DS',
          '任天堂ディーエス',
          'ニンテンドーDS',
          'ニンテンドーディーエス',
          'ニンテンドウDS',
          'ニンテンドウディーエス',
          'ニンテンドオDS',
          'ニンテンドオディーエス',
          'にんてんどーDS',
          'にんてんどーでぃーえす',
          'にんてんどうDS',
          'にんてんどうでぃーえす',
          'にんてんどおDS',
          'にんてんどおでぃーえす',
          'Nintendo DS',
          'NintendoDS',
          'NDS',
        ]
      },
      
      
      {
        _id: 'nMhdlLGm6',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'efIOgWs3N',
        name: 'PlayStation Portable',
        searchKeywordsArr: [
          'プレイステーション・ポータブル',
          'プレイステーションポータブル',
          'プレーステーション・ポータブル',
          'プレーステーションポータブル',
          'プレステポータブル',
          'ぷれいすてーしょん・ぽーたぶる',
          'ぷれいすてーしょんぽーたぶる',
          'ぷれーすてーしょん・ぽーたぶる',
          'ぷれーすてーしょんぽーたぶる',
          'ぷれすて・ぽーたぶる',
          'ぷれすてぽーたぶる',
          'Play Station Portable',
          'PlayStation Portable',
          'PlayStationPortable',
          'PS Portable',
          'PSPortable',
          'PSP',
        ]
      },
      
      
      {
        _id: 'YvgkE6inK',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'qk9DiUwN-',
        name: 'ニンテンドー3DS',
        searchKeywordsArr: [
          '任天堂3DS',
          '任天堂スリーディーエス',
          'ニンテンドー3DS',
          'ニンテンドースリーディーエス',
          'ニンテンドウ3DS',
          'ニンテンドウスリーディーエス',
          'ニンテンドオ3DS',
          'ニンテンドオスリーディーエス',
          'にんてんどー3DS',
          'にんてんどーすりーでぃーえす',
          'にんてんどう3DS',
          'にんてんどうすりーでぃーえす',
          'にんてんどお3DS',
          'にんてんどおすりーでぃーえす',
          'Nintendo 3DS',
          'Nintendo3DS',
          'N3DS',
        ]
      },
      
      
      {
        _id: '_3asC9ODV',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'mOpBZsQBm',
        name: 'PlayStation Vita',
        searchKeywordsArr: [
          'プレイステーション・ヴィータ',
          'プレイステーションヴィータ',
          'プレーステーション・ヴィータ',
          'プレーステーションヴィータ',
          'プレステヴィータ',
          'プレイステーション・ビータ',
          'プレイステーションビータ',
          'プレーステーション・ビータ',
          'プレーステーションビータ',
          'プレステビータ',
          'ぷれいすてーしょん・ゔぃーた',
          'ぷれいすてーしょんゔぃーた',
          'ぷれーすてーしょん・ゔぃーた',
          'ぷれーすてーしょんゔぃーた',
          'ぷれすて・ゔぃーた',
          'ぷれすてゔぃーた',
          'ぷれいすてーしょん・びーた',
          'ぷれいすてーしょんびーた',
          'ぷれーすてーしょん・びーた',
          'ぷれーすてーしょんびーた',
          'ぷれすて・びーた',
          'ぷれすてびーた',
          'Play Station Vita',
          'PlayStation Vita',
          'PlayStationVita',
          'PS Vita',
          'PSVita',
          'PSV',
        ]
      },
      
      
      {
        _id: 'pr6k8Jn6_',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'P0UG-LHOQ',
        name: 'PC',
        searchKeywordsArr: [
          'ピーシー',
          'パソコン',
          'パーソナル・コンピューター',
          'パーソナルコンピューター',
          'ぴーしー',
          'ぱーそなる・こんぴゅーたー',
          'ぱーそなるこんぴゅーたー',
          'Personal Computer',
          'PersonalComputer',
          'PC',
        ]
      },
      
      
      {
        _id: 'KN9AMVKP7',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'SXybALV1f',
        name: 'Android',
        searchKeywordsArr: [
          'アンドロイド',
          'あんどろいど',
          'Android',
        ]
      },
      
      
      {
        _id: 'M7YVRglvr',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'o-f3Zxd49',
        name: 'iOS',
        searchKeywordsArr: [
          'アイオーエス',
          'あいおーえす',
          'iOS',
        ]
      },
      
    ];
    
    
    // --------------------------------------------------
    //   insertMany
    // --------------------------------------------------
    
    await SchemaHardwares.deleteMany({ reset: true });
    returnObj = await SchemaHardwares.insertMany({ saveArr });
    
    
    
    
    // --------------------------------------------------
    //   DB / Developers Publishers
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Save Arr
    // ---------------------------------------------
    
    saveArr = [
      {
        _id: 'rwi-zvOuc',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        developerPublisherID: 'YtKRcK3Ar',
        urlID: 'Behaviour-Interactive',
        name: 'Behaviour Interactive'
      },
      {
        _id: 'LHHV6Xh78',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        developerPublisherID: 'zXOweU_0y',
        urlID: 'Square-Enix',
        name: 'スクウェア・エニックス'
      },
      {
        _id: 'e4gmri5Ro',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        developerPublisherID: 'mcMOetOTh',
        urlID: 'Nintendo',
        name: '任天堂'
      },
      {
        _id: 'QG3pK-dTU',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        developerPublisherID: 'xu-H3gHC7',
        urlID: 'Ghost-Town-Games',
        name: 'Ghost Town Games'
      },
      {
        _id: 'K6xtFlbGS',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        developerPublisherID: 'ELrNnOjDc',
        urlID: 'Team17',
        name: 'Team17 Digital Limited'
      },
    ]
    
    
    // --------------------------------------------------
    //   insertMany
    // --------------------------------------------------
    
    await SchemaDevelopersPublishers.deleteMany({ reset: true });
    returnObj = await SchemaDevelopersPublishers.insertMany({ saveArr });
    
    
    
    
    // --------------------------------------------------
    //   DB / ID
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Save Object
    // ---------------------------------------------
    
    saveArr = [
      {
        _id: 'GcymNACvc',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: 'jun-deE4J',
        gameCommunities_id: '',
        platform: 'PlayStation',
        label: '',
        id: 'PSN-ID',
        publicSetting: 1,
        search: true,
      },
      {
        _id: 'mDuSVm6S7',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: 'jun-deE4J',
        gameCommunities_id: '',
        platform: 'Xbox',// ゲーマータグ
        label: '',
        id: 'Xbox-ID',
        publicSetting: 1,
        search: true,
      },
      {
        _id: 'n4I1BDtxH',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: 'jun-deE4J',
        gameCommunities_id: '',
        platform: 'Nintendo',// フレンドコード
        label: '',
        id: 'Nintendo-ID',
        publicSetting: 2,
        search: true,
      },
      {
        _id: 'L00bEpD46',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: 'jun-deE4J',
        gameCommunities_id: '',
        platform: 'Steam',
        label: '',
        id: 'Steam-ID',
        publicSetting: 3,
        search: true,
      },
      {
        _id: '8bJV9G6MU',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: 'jun-deE4J',
        gameCommunities_id: 'Jk92aglWl',
        platform: 'PC',
        label: '',
        id: 'DbD-ID',
        publicSetting: 4,
        search: true,
      },
      {
        _id: 'UVOFSNbXR',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: 'jun-deE4J',
        gameCommunities_id: 'lxdubg6IY',
        platform: 'Other',
        label: 'スマブラSP',
        id: 'Super-Smash-Bros-SPECIAL-ID',
        publicSetting: 5,
        search: true,
      },
      {
        _id: 'ixVVi-MyF',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: 'jun-deE4J',
        gameCommunities_id: '',
        platform: 'Other',
        label: '未選択',
        id: 'Unselected-ID',
        publicSetting: 1,
        search: true,
      },
      {
        _id: '6tzEJLtel',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: 'jun-deE4J',
        gameCommunities_id: 'YcIvt9hf7',
        platform: 'PC',
        label: '',
        id: 'PC-ID',
        publicSetting: 1,
        search: true,
      },
      {
        _id: 'lgOWOBejs',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: 'jun-deE4J',
        gameCommunities_id: '',
        platform: 'Android',
        label: '',
        id: 'Android-ID',
        publicSetting: 1,
        search: true,
      },
      {
        _id: 'QyAZzwSod',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: 'jun-deE4J',
        gameCommunities_id: '',
        platform: 'iOS',
        label: '',
        id: 'iOS-ID',
        publicSetting: 1,
        search: true,
      },
      {
        _id: 'VambZTyDP',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: 'P7UJMuUnx',
        gameCommunities_id: '',
        platform: 'PlayStation',
        label: '',
        id: 'User2-PlayStation-ID',
        publicSetting: 1,
        search: true,
      },
      {
        _id: 'bE_ZC3ZVP',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: 'jun-deE4J',
        gameCommunities_id: '',
        platform: 'Origin',
        label: '',
        id: 'Origin-ID',
        publicSetting: 1,
        search: true,
      },
      {
        _id: 'Coo5CUWvD',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: 'jun-deE4J',
        gameCommunities_id: '',
        platform: 'Discord',
        label: '',
        id: 'Discord-ID',
        publicSetting: 1,
        search: true,
      },
      {
        _id: 'um7xutKBz',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: 'jun-deE4J',
        gameCommunities_id: '',
        platform: 'Skype',
        label: '',
        id: 'Skype-ID',
        publicSetting: 1,
        search: true,
      },
      {
        _id: '9Ct5SCS5-',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: 'jun-deE4J',
        gameCommunities_id: '',
        platform: 'ICQ',
        label: '',
        id: 'ICQ-ID',
        publicSetting: 1,
        search: true,
      },
      {
        _id: 'XmvY-9or6',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: 'jun-deE4J',
        gameCommunities_id: '',
        platform: 'Line',
        label: '',
        id: 'Line-ID',
        publicSetting: 1,
        search: true,
      },
    ];
    
    
    // --------------------------------------------------
    //   insertMany
    // --------------------------------------------------
    
    await SchemaIDs.deleteMany({ reset: true });
    returnObj = await SchemaIDs.insertMany({ saveArr });
    
    
    
    
    // --------------------------------------------------
    //   DB / Card Players
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Save Object
    // ---------------------------------------------
    
    saveArr = [
      {
        _id: 'zaoOWw89g',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: 'jun-deE4J',
        language: 'ja',
        nameObj: {
          value: 'マリオ',
          search: true,
        },
        statusObj: {
          value: 'ビルダー',
          search: true,
        },
        imagesAndVideos_id: '-uskdLoSC',
        imagesAndVideosThumbnail_id: '9h6n2gyyK',
        commentObj: {
          value: `Next.js を試してみたところ、とても優秀だったので採用することに決めました。サーバーサイドレンダリングの機能や、Code Splitting をデフォルトで行ってくれるのは非常に便利です。ただすべての機能を提供してくれるわけではないので、結局、自分で Express を利用したサーバー用コードを書かないといけない部分も多くあるのですが。
  
  それと Next.js はデータベースへのアクセスをすべて API で行うことを推奨しているようです。そこそこの規模のサイトになると、そういった構成が増えてくるのかもしれないのですが、自分は小規模なサイトしか作ったことがないので、初めての経験でちょっと不安です。`,
          search: true,
        },
        ageObj: {
          value: '2002-10-19T00:00:00Z',
          alternativeText: '',
          search: true,
        },
        sexObj: {
          value: 'male',
          alternativeText: '',
          search: true,
        },
        addressObj: {
          value: '',
          alternativeText: '大阪',
          search: true,
        },
        gamingExperienceObj: {
          value: '2008-09-19T00:00:00Z',
          alternativeText: '',
          search: true,
        },
        hobbiesObj: {
          valueArr: ['映画鑑賞', '料理', '海外旅行', 'ヴァイオリン演奏'],
          search: true,
        },
        specialSkillsObj: {
          valueArr: ['英語を話せる！'],
          search: true,
        },
        smartphoneObj: {
          model: 'g06',
          comment: `月額無料でスマホを利用したい！ということで買った端末です。電話としては機能してるけど、これでゲームをやるのは難しそうです。`,
          search: true,
        },
        tabletObj: {
          model: 'Google Nexus 9 Wi-Fiモデル 32GB',
          comment: `2015年に買ったタブレットなので最近はブラウザをチェックするだけでも重い…。`,
          search: true,
        },
        pcObj: {
          model: '自作PC',
          comment: `BTOで買ったPCが壊れそうになったので、ケースや光学ドライブなを流用しながらパーツを新しくしました。HDからSSDに移行したときはその速さに驚きましたね！容量があまりないので大量にゲームをインストールできないのですが、高速なのでなんとかSSDでやりくりしていきたいです。
    
    グラボを積んでいないのですが、Ryzen 3 2200Gの機能で昔のゲームや2Dゲームなら普通に動きます。比較的最近のゲームですが、ダーケストダンジョンもいけました。`,
          specsObj: {
            os: 'Windows 10 Home',
            cpu: 'AMD CPU Ryzen 3 2200G',
            cpuCooler: 'CPU 付属品',
            motherboard: 'MSI B350 PC MATE',
            memory: 'Crucial DDR4 8GB x 2',
            storage: 'WD SSD 240GB / WD Green / WDS240G2G0A',
            graphicsCard: '-',
            opticalDrive: 'NEC AD7240S/BK',
            powerSupply: 'Antec EARTHWATTS EA650 650W',
            pcCase: 'COOLER MASTER CM690',
            monitor: 'MITSUBISHI TFT RDT233WX / ASUS VZ239HR',
            mouse: 'Logitech MX300',
            keyboard: 'Microsoft Keyboard With Fingerprint Reader'
          },
          search: true,
        },
        hardwareActiveObj: {
          valueArr: ['P0UG-LHOQ', 'n3wYKZ_ao', 'TdK3Oc-yV', 'Zd_Ia4Hwm', 'qk9DiUwN-', 'SXybALV1f', 'YNZ6nb1Ki', '8RERfeQQ9'],
          search: true,
        },
        hardwareInactiveObj: {
          valueArr: ['I-iu-WmkO', 'KyOSlwcLk', 'eKmDxi8lX', 'lBSGQeGmx', '45syCFviA', '_z4DBLYNi', 'HATpnt7sl', 'M7YVRglvr'],
          search: true,
        },
        ids_idsArr: ['GcymNACvc', 'mDuSVm6S7', 'n4I1BDtxH', 'L00bEpD46', '8bJV9G6MU', 'UVOFSNbXR'],
        activityTimeObj: {
          valueArr: [
            {
              _id: 'fkqjMZzff',
              beginTime: '19:00',
              endTime: '00:00',
              weekArr: [1, 2, 3, 4, 5]
            },
            {
              _id: 'J-ReJUaTK',
              beginTime: '09:00',
              endTime: '23:30',
              weekArr: [0, 6]
            }
          ],
          search: true,
        },
        lookingForFriendsObj: {
          value: true,
          icon: 'emoji_u1f61c',
          comment: 'ゲーム配信をしているので、その際に一緒に遊べる人がいればいいなと思ってます。学生から社会人の方まで、誰でもフレンド申請してもらってOKです。ただ配信外ではひとりで遊ぶのが好きなので、招待をもらっても応えられないのですが、それでもいい方はぜひフレンドになってください。',
          search: true,
        },
        voiceChatObj: {
          value: false,
          comment: 'ボイスチャットはゲーム配信のときにどうしても必要になったら使いますが、基本的には使っていません。',
          search: true,
        },
        linkArr: [
          {
            _id: 'FbbgE5PTW',
            type: 'Twitter',
            label: '',
            url: 'https://twitter.com/',
            search: true,
          },
          {
            _id: 'VMp_Vlk_V',
            type: 'Facebook',
            label: '',
            url: 'https://www.facebook.com/',
            search: true,
          },
          {
            _id: 'IqNtEQQsO',
            type: 'Instagram',
            label: '',
            url: 'https://www.instagram.com/',
            search: true,
          },
          {
            _id: 'yBC3AHqrP',
            type: 'YouTube',
            label: '',
            url: 'https://www.youtube.com/',
            search: true,
          },
          {
            _id: 'YD8DHCvb_',
            type: 'Twitch',
            label: '',
            url: 'https://www.twitch.tv/',
            search: true,
          },
          {
            _id: '8u2ht4NLv',
            type: 'Steam',
            label: '',
            url: 'https://store.steampowered.com/',
            search: true,
          },
          {
            _id: 'UxQZSjwRr',
            type: 'Discord',
            label: '',
            url: 'https://discordapp.com/',
            search: true,
          },
          {
            _id: 'rHLKWD-1B',
            type: 'Flickr',
            label: '',
            url: 'https://www.flickr.com/',
            search: true,
          },
          {
            _id: '7iq2JagxP',
            type: 'Tumblr',
            label: '',
            url: 'https://www.tumblr.com/',
            search: true,
          },
          {
            _id: '3tx98YDjT',
            type: 'Pinterest',
            label: '',
            url: 'https://www.pinterest.jp/',
            search: true,
          },
          {
            _id: 'zcPp3XyEw',
            type: 'Other',
            label: '開発サイト',
            url: 'http://dev-1.gameusers.org:8080/',
            search: true,
          },
        ]
      },
      
      
      {
        _id: 'WAMuArrBZ',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: 'P7UJMuUnx',
        language: 'ja',
        nameObj: {
          value: 'ジョナサン・ジョースター',
          search: true,
        },
        statusObj: {
          value: 'オーバードライブ',
          search: true,
        },
        imagesAndVideos_id: '',
        imagesAndVideosThumbnail_id: '',
        commentObj: {
          value: `サブタイトルというのは例えば、ドラゴンクエストIII そして伝説へ… 「そして伝説へ…」の部分になります。未記入でも問題ありません。

ゲームを登録するとゲームページが同時に作成されます。登録直後はゲームページのURLは以下のようにランダムな文字列に設定され、運営が確認後、正式なURLに置き換わります。URLをブラウザのお気に入りに入れたり、ブログなどに掲載する場合は気をつけてください。`,
          search: true,
        },
        ageObj: {
          value: '1868-04-04T00:00:00Z',
          alternativeText: '',
          search: true,
        },
        sexObj: {
          value: 'male',
          alternativeText: '',
          search: true,
        },
        addressObj: {
          value: '',
          alternativeText: 'イギリス',
          search: true,
        },
        gamingExperienceObj: {
          value: '1878-04-04T00:00:00Z',
          alternativeText: '',
          search: true,
        },
        hobbiesObj: {
          valueArr: ['サンライトイエローオーバードライブ', 'ターコイズブルーオーバードライブ', 'メタルシルバーオーバードライブ'],
          search: true,
        },
        specialSkillsObj: {
          valueArr: ['英国貴族'],
          search: true,
        },
        smartphoneObj: {
          model: '',
          comment: ``,
          search: true,
        },
        tabletObj: {
          model: '',
          comment: ``,
          search: true,
        },
        pcObj: {
          model: '',
          comment: ``,
          specsObj: {
            os: '',
            cpu: '',
            cpuCooler: '',
            motherboard: '',
            memory: '',
            storage: '',
            graphicsCard: '',
            opticalDrive: '',
            powerSupply: '',
            pcCase: '',
            monitor: '',
            mouse: '',
            keyboard: ''
          },
          search: true,
        },
        hardwareActiveObj: {
          valueArr: ['P0UG-LHOQ', 'n3wYKZ_ao', 'TdK3Oc-yV', 'Zd_Ia4Hwm', 'qk9DiUwN-', 'SXybALV1f', 'YNZ6nb1Ki', '8RERfeQQ9'],
          search: true,
        },
        hardwareInactiveObj: {
          valueArr: ['I-iu-WmkO', 'KyOSlwcLk', 'eKmDxi8lX', 'lBSGQeGmx', '45syCFviA', '_z4DBLYNi', 'HATpnt7sl', 'M7YVRglvr'],
          search: true,
        },
        ids_idsArr: [],
        activityTimeObj: {
          valueArr: [
            {
              _id: 'QNRzpKmGB',
              beginTime: '19:00',
              endTime: '21:50',
              weekArr: [0, 1, 2, 3, 4]
            },
            {
              _id: '1qaGh3U0i',
              beginTime: '09:00',
              endTime: '22:00',
              weekArr: [5, 6]
            }
          ],
          search: true,
        },
        lookingForFriendsObj: {
          value: true,
          icon: 'emoji_u1f47f',
          comment: '',
          search: true,
        },
        voiceChatObj: {
          value: true,
          comment: '',
          search: true,
        },
        linkArr: [
          {
            _id: 'KFOJ-nwgq',
            type: 'Twitter',
            label: '',
            url: 'https://twitter.com/',
            search: true,
          },
        ]
      },
      
      
      {
        _id: 'MwsJKtJ3m',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: '6GWOpEcD3',
        language: 'ja',
        nameObj: {
          value: 'User No.3',
          search: true,
        },
        statusObj: {
          value: 'ステータス',
          search: true,
        },
        imagesAndVideos_id: '',
        imagesAndVideosThumbnail_id: '',
        commentObj: {
          value: `test comment`,
          search: true,
        },
        ageObj: {
          value: '2000-01-01T00:00:00Z',
          alternativeText: '',
          search: true,
        },
        sexObj: {
          value: 'male',
          alternativeText: '',
          search: true,
        },
        addressObj: {
          value: '',
          alternativeText: '天国',
          search: true,
        },
        gamingExperienceObj: {
          value: '2010-01-01T00:00:00Z',
          alternativeText: '',
          search: true,
        },
        hobbiesObj: {
          valueArr: ['趣味'],
          search: true,
        },
        specialSkillsObj: {
          valueArr: ['特技'],
          search: true,
        },
        smartphoneObj: {
          model: '',
          comment: ``,
          search: true,
        },
        tabletObj: {
          model: '',
          comment: ``,
          search: true,
        },
        pcObj: {
          model: '',
          comment: ``,
          specsObj: {
            os: '',
            cpu: '',
            cpuCooler: '',
            motherboard: '',
            memory: '',
            storage: '',
            graphicsCard: '',
            opticalDrive: '',
            powerSupply: '',
            pcCase: '',
            monitor: '',
            mouse: '',
            keyboard: ''
          },
          search: true,
        },
        hardwareActiveObj: {
          valueArr: ['P0UG-LHOQ'],
          search: true,
        },
        hardwareInactiveObj: {
          valueArr: ['I-iu-WmkO'],
          search: true,
        },
        ids_idsArr: [],
        activityTimeObj: {
          valueArr: [
            {
              _id: 'ftXBIjJui',
              beginTime: '20:00',
              endTime: '23:00',
              weekArr: [0, 1, 2, 3, 4]
            },
            {
              _id: '_b9s9fzsy',
              beginTime: '12:00',
              endTime: '23:00',
              weekArr: [5, 6]
            }
          ],
          search: true,
        },
        lookingForFriendsObj: {
          value: true,
          icon: 'emoji_u1f47f',
          comment: '',
          search: true,
        },
        voiceChatObj: {
          value: true,
          comment: '',
          search: true,
        },
        linkArr: [
          {
            _id: 'qhvbe8GRl',
            type: 'Twitter',
            label: '',
            url: 'https://twitter.com/',
            search: true,
          },
        ]
      }
      
    ];
    
    
    // --------------------------------------------------
    //   insertMany
    // --------------------------------------------------
    
    await SchemaCardPlayers.deleteMany({ reset: true });
    returnObj = await SchemaCardPlayers.insertMany({ saveArr });
    
    
    
    
    // --------------------------------------------------
    //   DB / Email Confirmations
    // --------------------------------------------------
    
    // --------------------------------------------------
    //   deleteMany
    // --------------------------------------------------
    
    await SchemaEmailConfirmations.deleteMany({ reset: true });
    
    
    
    
    // --------------------------------------------------
    //   DB / Images and Videos
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Save Object
    // ---------------------------------------------
    
    saveArr = [
      
      
      // games 1
      {
        
        _id: 'jhxEOPKbg',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: '',
        type: 'gc',
        images: 2,
        videos: 0,
        arr: [
          
          {
            _id: 'w_xujtkWJ',
            type: 'image',
            imageType: 'JPEG',
            srcSetArr: [
              {
                _id: 'TJV1VSY3b',
                w: '320w',
                width: 320,
                height: 212,
              },
              {
                _id: 's3Xs7RYbB',
                w: '480w',
                width: 480,
                height: 318,
              },
              {
                _id: 'ZWEnlME8G',
                w: '640w',
                width: 640,
                height: 424,
              },
              {
                _id: '5dlieCGRx',
                w: '800w',
                width: 800,
                height: 530,
              },
              {
                _id: 'F1a-fC6Mv',
                w: '1920w',
                width: 1920,
                height: 1271,
              },
            ],
          },
          
          
          {
            _id: 'kaAcL8EDb',
            type: 'image',
            imageType: 'JPEG',
            srcSetArr: [
              {
                _id: 'V4caK_q1p',
                w: '480w',
                width: 480,
                height: 320,
              },
              {
                _id: 'xdMMfLfqC',
                w: '640w',
                width: 640,
                height: 427,
              },
              {
                _id: 'tPVCYWlfa',
                w: '800w',
                width: 800,
                height: 533,
              },
              {
                _id: 'TT1DvDDnF',
                w: '1920w',
                width: 1920,
                height: 1280,
              },
            ],
          },
          
        ]
        
      },
      
      
      // games 1 - thumbnail
      {
        
        _id: '2G5j7D3AM',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: '',
        type: 'gc',
        images: 1,
        videos: 0,
        arr: [
          
          {
            _id: 'rykFm6Vfg',
            type: 'image',
            imageType: 'JPEG',
            srcSetArr: [
              {
                _id: 'z4UR_-Hzi',
                w: '320w',
                width: 256,
                height: 256,
              },
            ],
          },
          
        ]
        
      },
      
      
      
      
      // games 2
      {
        
        _id: 'PdWVRzkoW',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: '',
        type: 'gc',
        images: 2,
        videos: 0,
        arr: [
          
          {
            _id: '5dDVxbb6M',
            type: 'image',
            imageType: 'JPEG',
            localesArr: [
              {
                _id: '2lWCkADfP',
                language: 'ja',
                caption: 'caption1',
              }
            ],
            srcSetArr: [
              {
                _id: '-rv2yOt4k',
                w: '320w',
                width: 320,
                height: 151,
              },
              {
                _id: 'qDJbmdGnR',
                w: '480w',
                width: 480,
                height: 226,
              },
              {
                _id: 'kGr_fOL6a',
                w: '640w',
                width: 640,
                height: 302,
              },
              {
                _id: 'ZS6Jl4xoi',
                w: '800w',
                width: 800,
                height: 377,
              },
              {
                _id: '_7cXbeut3',
                w: '1920w',
                width: 1920,
                height: 906,
              },
            ],
          },
          
          
          {
            _id: 'uhP-XpW76',
            type: 'image',
            imageType: 'JPEG',
            srcSetArr: [
              {
                _id: '-JNNKxlhJ',
                w: '480w',
                width: 320,
                height: 212,
              },
              {
                _id: 'rHtf4QZtC',
                w: '480w',
                width: 480,
                height: 318,
              },
              {
                _id: 'm8JopuIHI',
                w: '640w',
                width: 640,
                height: 424,
              },
              {
                _id: '70aNJbgbA',
                w: '800w',
                width: 800,
                height: 530,
              },
              {
                _id: 'z1vwXwV_V',
                w: '1920w',
                width: 1920,
                height: 1271,
              },
            ],
          },
          
        ]
        
      },
      
      
      // games 2 - thumbnail
      {
        
        _id: 'I_n3l4y8_',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: '',
        type: 'gc',
        images: 1,
        videos: 0,
        arr: [
          
          {
            _id: 'b0gqRt4fd',
            type: 'image',
            imageType: 'JPEG',
            srcSetArr: [
              {
                _id: 'dj8cwyVSP',
                w: '320w',
                width: 256,
                height: 256,
              },
            ],
          },
          
        ]
        
      },
      
      
      
      
      // games 3 - thumbnail
      {
        
        _id: 'DGTgnBdOd',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: '',
        type: 'gc',
        images: 1,
        videos: 0,
        arr: [
          
          {
            _id: 'GMZC4vupw',
            type: 'image',
            imageType: 'PNG',
            srcSetArr: [
              {
                _id: 'UEtIRf5pr',
                w: '320w',
                width: 256,
                height: 256,
              },
            ],
          },
          
        ]
        
      },
      
      
      
      
      // card-players 1
      {
        
        _id: '-uskdLoSC',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: 'jun-deE4J',
        type: 'ur',
        images: 1,
        videos: 0,
        arr: [
          
          {
            _id: 'XGsNK-uxy',
            type: 'image',
            imageType: 'JPEG',
            srcSetArr: [
              {
                _id: '06UU3ovKt',
                w: '320w',
                width: 320,
                height: 180,
              },
              {
                _id: 'JkkA8B87Q',
                w: '480w',
                width: 480,
                height: 270,
              },
              {
                _id: 'Mbcbd10hF',
                w: '640w',
                width: 640,
                height: 360,
              },
              {
                _id: '6XRCAxorS',
                w: '800w',
                width: 800,
                height: 450,
              },
            ],
          },
          
        ]
        
      },
      
      
      // card-players 1 - thumbnail
      {
        
        _id: '9h6n2gyyK',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: 'jun-deE4J',
        type: 'ur',
        images: 1,
        videos: 0,
        arr: [
          
          {
            _id: 'JvApY7kSd',
            type: 'image',
            imageType: 'PNG',
            srcSetArr: [
              {
                _id: 'AkCw84zpT',
                w: '320w',
                width: 256,
                height: 256,
              },
            ],
          },
          
        ]
        
      },
      
      
      // gc / Dead-by-Daylight / recruitment
      {
        
        _id: 'DZLBgxuVId',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: 'jun-deE4J',
        type: 'recruitment',
        images: 1,
        videos: 0,
        arr: [
          
          {
            _id: 'qLqnzIadJf',
            type: 'image',
            imageType: 'JPEG',
            srcSetArr: [
              {
                _id: 'IfVKtaKt_',
                w: '800w',
                width: 800,
                height: 503,
              },
            ],
            localesArr: [
              {
                _id: 'I1h1vhv-ro',
                language: 'ja',
                caption: 'Cat'
              }
            ]
          },
          
        ]
        
      },
      
      
      // uc / community1 - top
      {
        
        _id: 'pg6-XZehF',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: 'jun-deE4J',
        type: 'uc',
        images: 1,
        videos: 0,
        arr: [
          
          {
            _id: 'kDcX0KUa_',
            type: 'image',
            imageType: 'JPEG',
            srcSetArr: [
              {
                _id: 'ldrGV5Pcu',
                w: '320w',
                width: 320,
                height: 135,
              },
              {
                _id: 'aUWTLwA1N',
                w: '480w',
                width: 480,
                height: 202,
              },
              {
                _id: 'pGwmd5W2O',
                w: '640w',
                width: 640,
                height: 269,
              },
              {
                _id: '6EixTGJ_i',
                w: '800w',
                width: 800,
                height: 337,
              },
              {
                _id: 'XY8iTeQoP',
                w: '1920w',
                width: 1920,
                height: 808,
              },
            ],
          },
          
        ]
        
      },
      
      
      // uc / community1 - thumbnail
      {
        
        _id: 'ed38Uf030',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: 'jun-deE4J',
        type: 'uc',
        images: 1,
        videos: 0,
        arr: [
          
          {
            _id: 'wRCzuPBqS',
            type: 'image',
            imageType: 'PNG',
            srcSetArr: [
              {
                _id: '34bkMkDRg',
                w: '320w',
                width: 256,
                height: 256,
              },
            ],
          },
          
        ]
        
      },
      
      
      
      // forum comment 1
      {
        
        _id: 'nA0rYeYu9',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: '',
        type: 'forum',
        images: 7,
        videos: 2,
        arr: [
          
          {
            _id: 'LIpgMV4H3',
            type: 'image',
            imageType: 'JPEG',
            localesArr: [
              {
                _id: 'JttzzcaSa',
                language: 'ja',
                caption: 'パノラマ画像',
              }
            ],
            srcSetArr: [
              {
                _id: '7QKcCmHvW',
                w: '320w',
                width: 320,
                height: 120,
              },
              {
                _id: 'm5RV6KTP3',
                w: '480w',
                width: 480,
                height: 180,
              },
              {
                _id: 'V1eodatCl',
                w: '640w',
                width: 640,
                height: 240,
              },
              {
                _id: 'QI3Ux6GBb',
                w: '800w',
                width: 800,
                height: 300,
              },
            ],
          },
          
          
          {
            _id: 'rlEoEK75y',
            type: 'image',
            imageType: 'JPEG',
            localesArr: [
              {
                _id: 'vw934dMWp',
                language: 'ja',
                caption: '動画＋画像のテスト',
              }
            ],
            srcSetArr: [
              {
                _id: 'Jtb7GDwTO',
                w: '320w',
                width: 128,
                height: 85,
              },
            ],
          },
          
          
          {
            _id: 'dFnadiGia',
            type: 'image',
            imageType: 'JPEG',
            localesArr: [
              {
                _id: 'x30n1i1O1',
                language: 'ja',
                caption: '猫',
              }
            ],
            srcSetArr: [
              {
                _id: 'PCD799h1p',
                w: '320w',
                width: 213,
                height: 320,
              },
              {
                _id: 'mzixmZhKn',
                w: '480w',
                width: 320,
                height: 480,
              },
              {
                _id: 'et6Jk4aja',
                w: '640w',
                width: 427,
                height: 640,
              },
              {
                _id: 'JUEZB9zJb',
                w: '800w',
                width: 533,
                height: 800,
              },
            ],
          },
          
          
          {
            _id: 'NeQ-I0kHE',
            type: 'image',
            imageType: 'JPEG',
            srcSetArr: [
              {
                _id: 'arOjE8QqM',
                w: '320w',
                width: 96,
                height: 144,
              },
            ],
          },
          
          
          {
            _id: '0Q4HnJTGa',
            type: 'video',
            videoChannel: 'youtube',
            videoID: '1yIHLQJNvDw',
          },
          
          
          {
            _id: 'BKzQGyalu',
            type: 'image',
            imageType: 'JPEG',
            localesArr: [
              {
                _id: 'JttzzcaSa',
                language: 'ja',
                caption: '教会',
              }
            ],
            srcSetArr: [
              {
                _id: '7QKcCmHvW',
                w: '320w',
                width: 320,
                height: 213,
              },
              {
                _id: 'm5RV6KTP3',
                w: '480w',
                width: 480,
                height: 320,
              },
              {
                _id: 'V1eodatCl',
                w: '640w',
                width: 640,
                height: 426,
              },
              {
                _id: 'QI3Ux6GBb',
                w: '800w',
                width: 800,
                height: 533,
              },
            ],
          },
          
          
          {
            _id: '_Ed74zfen',
            type: 'image',
            imageType: 'JPEG',
            srcSetArr: [
              {
                _id: 'P5kwos-Yd',
                w: '320w',
                width: 256,
                height: 256,
              },
            ],
          },
          
          
          {
            _id: 'YYNOIfeRC',
            type: 'image',
            imageType: 'JPEG',
            srcSetArr: [
              {
                _id: '7QKcCmHvW',
                w: '320w',
                width: 320,
                height: 320,
              },
              {
                _id: 'm5RV6KTP3',
                w: '480w',
                width: 480,
                height: 480,
              },
              {
                _id: 'V1eodatCl',
                w: '640w',
                width: 640,
                height: 640,
              },
              {
                _id: 'QI3Ux6GBb',
                w: '800w',
                width: 800,
                height: 800,
              },
            ],
          },
          
          
          {
            _id: 'bMc2H7YCk',
            type: 'video',
            videoChannel: 'youtube',
            videoID: 'HR0NB_ZDypM',
          },
          
        ]
        
      },
      
    ];
    
    
    // ---------------------------------------------
    //   Insert
    // ---------------------------------------------
    
    await SchemaImagesAndVideos.deleteMany({ reset: true });
    returnObj = await SchemaImagesAndVideos.insertMany({ saveArr });
    
    
    
    
    // --------------------------------------------------
    //   DB / Game Community
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Save Object
    // ---------------------------------------------
    
    saveArr = [
      {
        _id: 'Jk92aglWl',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        forumObj: {
          threadCount: 2,
        },
        recruitmentObj: {
          threadCount: 3,
        },
        updatedDateObj: {
          notification: ISO8601,
          forum: ISO8601,
          recruitment: ISO8601,
        },
        anonymity: true,
      },
      
      
      {
        _id: 'lxdubg6IY',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        forumObj: {
          threadCount: 0,
        },
        recruitmentObj: {
          threadCount: 0,
        },
        updatedDateObj: {
          notification: ISO8601,
          forum: ISO8601,
          recruitment: ISO8601,
        },
        anonymity: true,
      },
      
      
      {
        _id: 'YcIvt9hf7',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        forumObj: {
          threadCount: 0,
        },
        recruitmentObj: {
          threadCount: 0,
        },
        updatedDateObj: {
          notification: ISO8601,
          forum: ISO8601,
          recruitment: ISO8601,
        },
        anonymity: true,
      },
      
      
      {
        _id: 'WMHFmAp8e',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        forumObj: {
          threadCount: 0,
        },
        recruitmentObj: {
          threadCount: 0,
        },
        updatedDateObj: {
          notification: ISO8601,
          forum: ISO8601,
          recruitment: ISO8601,
        },
        anonymity: true,
      },
    ];
    
    
    // ---------------------------------------------
    //   Insert
    // ---------------------------------------------
    
    await SchemaGameCommunities.deleteMany({ reset: true });
    returnObj = await SchemaGameCommunities.insertMany({ saveArr });
    
    
    
    
    // --------------------------------------------------
    //   DB / User Community
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Save Object
    // ---------------------------------------------
    
    saveArr = [
      {
        _id: 'cxO8tEGty',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        userCommunityID: 'community1',
        users_id: 'jun-deE4J',
        localesArr: [
          {
            _id: 'qFJnYnMDA',
            language: 'ja',
            name: 'User Community 1',
            description: `RPG好きが集まるコミュニティです。新旧問わず名作・駄作について話し合いましょう！\nドラクエやファイナルファンタジーなど、有名なタイトルから誰も知らないようなタイトルまで、なんの話題でも大丈夫です。\n\nぜひ気軽に参加してください！`,
            descriptionShort: 'descriptionShort',
          },
        ],
        imagesAndVideos_id: 'pg6-XZehF',
        imagesAndVideosThumbnail_id: 'ed38Uf030',
        gameCommunities_idsArr: ['Jk92aglWl', 'lxdubg6IY', 'WMHFmAp8e'],
        forumObj: {
          threadCount: 6,
        },
        updatedDateObj: {
          notification: ISO8601,
          forum: ISO8601,
        },
        communityType: 'open',
        anonymity: true,
      },
    ];
    
    
    // ---------------------------------------------
    //   Insert
    // ---------------------------------------------
    
    await SchemaUserCommunities.deleteMany({ reset: true });
    returnObj = await SchemaUserCommunities.insertMany({ saveArr });
    
    
    
    
    // --------------------------------------------------
    //   DB / Forum Threads
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Save Object
    // ---------------------------------------------
    
    // スレッド　userCommunities_id: 'cxO8tEGty'で検索
    saveArr = [
      
      {
        _id: 'qNiOLKdRt',
        createdDate: '2019-01-01T00:00:00Z',
        updatedDate: '2019-01-01T00:00:00Z',
        gameCommunities_id: '',
        userCommunities_id: 'cxO8tEGty',
        users_id: 'jun-deE4J',
        localesArr: [
          {
            _id: 'qhpRQ_fGB',
            language: 'ja',
            name: 'Thread 1: 雑談スレッド',
            comment: `みんなで気になる話題について話し合いましょう！\nゲームの話は特に大歓迎です。\nおすすめの作品などがあったら、ぜひ紹介してください。`,
          },
          {
            _id: '_Ov63CsHc',
            language: 'en',
            name: 'Thread 1: English',
            comment: 'English',
          }
        ],
        imagesAndVideos_id: '',
        comments: 2,
        replies: 3,
        images: 7,
        videos: 2,
        main: false,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      {
        _id: '_XDDSTWV_',
        createdDate: '2019-01-02T00:00:00Z',
        updatedDate: '2019-01-02T00:00:00Z',
        gameCommunities_id: '',
        userCommunities_id: 'cxO8tEGty',
        users_id: '',
        localesArr: [
          {
            _id: 'bV1gwPnYs',
            language: 'ja',
            name: 'Thread 2: カムパネルラ',
            comment: `Next.js を試してみたところ、とても優秀だったので採用することに決めました。サーバーサイドレンダリングの機能や、Code Splitting をデフォルトで行ってくれるのは非常に便利です。ただすべての機能を提供してくれるわけではないので、結局、自分で Express を利用したサーバー用コードを書かないといけない部分も多くあるのですが。
  
  それと Next.js はデータベースへのアクセスをすべて API で行うことを推奨しているようです。そこそこの規模のサイトになると、そういった構成が増えてくるのかもしれないのですが、自分は小規模なサイトしか作ったことがないので、初めての経験でちょっと不安です。`,
          }
        ],
        imagesAndVideos_id: '',
        comments: 2,
        replies: 2,
        images: 0,
        videos: 0,
        main: false,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      {
        _id: 'HpzNGyKQE',
        createdDate: '2019-01-03T00:00:00Z',
        updatedDate: '2019-01-03T00:00:00Z',
        gameCommunities_id: '',
        userCommunities_id: 'cxO8tEGty',
        users_id: 'P7UJMuUnx',
        localesArr: [
          {
            _id: 'avaUoJn0L',
            language: 'ja',
            name: 'Thread 3: スレッド名複数行に渡る長文テスト/二行目になるとどうなるのかをテスト(文字数：52)',
            comment: `ジョバンニはまるで毎日教室でもねむく、本を読むひまも読む本もないので、なんだかどんなこともよくわからないという気持きもちがするのでした。`,
          }
        ],
        imagesAndVideos_id: '',
        comments: 0,
        replies: 0,
        images: 0,
        videos: 0,
        main: false,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      {
        _id: 'KQ_FuEYRu',
        createdDate: '2019-01-04T00:00:00Z',
        updatedDate: '2019-01-04T00:00:00Z',
        gameCommunities_id: '',
        userCommunities_id: 'cxO8tEGty',
        users_id: '',
        localesArr: [
          {
            _id: 'qhpRQ_fGB',
            language: 'ja',
            name: 'Thread 4: test4',
            comment: `Next.js で styled-components + Material UI を使う場合、それ用に別途コードを書かなければならない必要が生まれます。しかも Material UI がアップデートすると動かなくなったりするので、とても面倒な組み合わせです。

今回もまた Material UI を Ver.4 にアップデートしてみたところ正常に動かなくなったため、なにか他に方法はないのかと調べてみました。すると emotion という CSS in JS の新しめのライブラリを発見することができました。なんと Material UI では emotion を特別なことをせずにそのまま使えるようなのです。実際、使用してみたところ styled-components との組み合わせよりも、全然相性がいい気がします。

Material UI にスタイルを当てる場合、Material UI がデフォルトで用意している書き方を使う方法もあるのですが、自分はその書き方が気に入らなかったのと、サイト全体のスタイルシートの書き方を統一する意味も込めて、これまでは styled-components を採用していました。`,
          },
        ],
        imagesAndVideos_id: '',
        comments: 0,
        replies: 0,
        images: 0,
        videos: 0,
        main: false,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      {
        _id: '8xJS6lZCm',
        createdDate: '2019-01-05T00:00:00Z',
        updatedDate: '2019-01-05T00:00:00Z',
        gameCommunities_id: '',
        userCommunities_id: 'cxO8tEGty',
        users_id: '',
        localesArr: [
          {
            _id: '6-g2SWieU',
            language: 'ja',
            name: 'Thread 5: test5',
            comment: `今回使ってみて emotion の感触が良かったので、こちらに移行することにしました。 後発のライブラリなので機能的にもいいとこ取りをしていて、とても優秀です。同じように Material UI を利用している方はチェックしてみて欲しいですね。いろいろ楽になると思います。

emotion: https://emotion.sh/docs/introduction`,
          },
        ],
        imagesAndVideos_id: '',
        comments: 0,
        replies: 0,
        images: 0,
        videos: 0,
        main: false,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      {
        _id: 'uzU4Wt_NS',
        createdDate: '2020-03-20T00:00:00Z',
        updatedDate: '2020-03-20T00:00:00Z',
        gameCommunities_id: '',
        userCommunities_id: 'cxO8tEGty',
        users_id: '',
        localesArr: [
          {
            _id: '-rmdfMhdz',
            language: 'ja',
            name: 'Thread 6: test6',
            comment: `test6`,
          },
        ],
        imagesAndVideos_id: '',
        comments: 0,
        replies: 0,
        images: 0,
        videos: 0,
        main: false,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      {
        _id: 'H6pB91tMq',
        createdDate: '2019-01-06T00:00:00Z',
        updatedDate: '2019-01-06T00:00:00Z',
        gameCommunities_id: 'Jk92aglWl',
        userCommunities_id: '',
        users_id: '',
        localesArr: [
          {
            _id: 'O3B0mpAxO',
            language: 'ja',
            name: 'GC Thread 1',
            comment: `昔、しなの都に、ムスタフという貧乏びんぼうな仕立屋が住んでいました。このムスタフには、おかみさんと、アラジンと呼ぶたった一人の息子むすことがありました。

　この仕立屋は大へん心がけのよい人で、一生けんめいに働きました。けれども、悲しいことには、息子が大だいのなまけ者で、年が年じゅう、町へ行って、なまけ者の子供たちと遊びくらしていました。何か仕事をおぼえなければならない年頃になっても、そんなことはまっぴらだと言ってはねつけますので、ほんとうにこの子のことをどうしたらいいのか、両親もとほうにくれているありさまでした。`,
          },
        ],
        imagesAndVideos_id: '',
        comments: 1,
        replies: 1,
        images: 0,
        videos: 0,
        main: true,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      {
        _id: 'OE5OhVudP',
        createdDate: '2019-01-07T00:00:00Z',
        updatedDate: '2019-01-07T00:00:00Z',
        gameCommunities_id: 'Jk92aglWl',
        userCommunities_id: '',
        users_id: '',
        localesArr: [
          {
            _id: 'NW63d-U-C',
            language: 'ja',
            name: 'GC Thread 2',
            comment: `それでも、お父さんのムスタフは、せめて仕立屋にでもしようと思いました。それである日、アラジンを仕事場へつれて入って、仕立物を教おしえようとしましたが、アラジンは、ばかにして笑っているばかりでした。そして、お父さんのゆだんを見すまして、いち早くにげ出してしまいました。お父さんとお母さんは、すぐに追っかけて出たのですけれど、アラジンの走り方があんまり早いので、もうどこへ行ったのか、かいもく、姿は見えませんでした。

「ああ、わしには、このなまけ者をどうすることもできないのか。」

　ムスタフは、なげきました。そして、まもなく、子供のことを心配のあまり、病気になって、死んでしまいました。こうなると、アラジンのお母さんは、少しばかりあった仕立物に使う道具どうぐを売りはらって、それから後は、糸をつむいでくらしを立てていました。`,
          },
        ],
        imagesAndVideos_id: '',
        comments: 0,
        replies: 0,
        images: 0,
        videos: 0,
        main: true,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
    ];
    
    
    // ---------------------------------------------
    //   Insert
    // ---------------------------------------------
    
    await SchemaForumThreads.deleteMany({ reset: true });
    returnObj = await SchemaForumThreads.insertMany({ saveArr });
    
    
    
    
    // --------------------------------------------------
    //   DB / Forum Comments
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Save Object
    // ---------------------------------------------
    
    saveArr = [
      
      
      // コメント1
      {
        _id: '8_AsHN1fm',
        createdDate: '2019-01-01T00:00:00Z',
        updatedDate: '2019-01-01T00:00:00Z',
        gameCommunities_id: '',
        userCommunities_id: 'cxO8tEGty',
        forumThreads_id: 'qNiOLKdRt',
        forumComments_id: '',
        replyToForumComments_id: '',
        users_id: '',
        localesArr: [
          {
            _id: '2DagvbZ4q',
            language: 'ja',
            name: '動画＋画像',
            comment: `No.1 / Comment 1: 動画＋画像のテスト`,
          }
        ],
        imagesAndVideos_id: 'nA0rYeYu9',
        anonymity: false,
        goods: 100,
        replies: 2,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      // 返信1 / コメント1に対して
      {
        _id: 'HJut0iubX',
        createdDate: '2019-01-02T00:00:00Z',
        updatedDate: '2019-01-02T00:00:00Z',
        gameCommunities_id: '',
        userCommunities_id: 'cxO8tEGty',
        forumThreads_id: 'qNiOLKdRt',
        forumComments_id: '8_AsHN1fm',
        replyToForumComments_id: '',
        users_id: 'jun-deE4J',
        localesArr: [
          {
            _id: 'Z2x6S7Sua',
            language: 'ja',
            name: '',
            comment: 'No.2 / Reply 1: ジョバンニは勢いよく立ちあがりましたが、立ってみるともうはっきりとそれを答えることができないのでした。',
          }
        ],
        imagesAndVideos_id: '',
        anonymity: false,
        goods: 50,
        replies: 1,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      // 返信2 / 返信1に対して
      {
        _id: 'R2hdDidB6',
        createdDate: '2019-01-03T00:00:00Z',
        updatedDate: '2019-01-03T00:00:00Z',
        gameCommunities_id: '',
        userCommunities_id: 'cxO8tEGty',
        forumThreads_id: 'qNiOLKdRt',
        forumComments_id: '8_AsHN1fm',
        replyToForumComments_id: 'HJut0iubX',
        users_id: '',
        localesArr: [
          {
            _id: 's6z-LtF6x',
            language: 'ja',
            name: '天川',
            comment: 'No.3 / Reply 2: ですからもしもこの天あまの川がわがほんとうに川だと考えるなら、その一つ一つの小さな星はみんなその川のそこの砂や砂利じゃりの粒つぶにもあたるわけです。',
          }
        ],
        imagesAndVideos_id: '',
        anonymity: false,
        goods: 25,
        replies: 0,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      
      
      // コメント2
      {
        _id: 'm2N3ijR3A',
        createdDate: '2019-01-04T00:00:00Z',
        updatedDate: '2019-01-04T00:00:00Z',
        gameCommunities_id: '',
        userCommunities_id: 'cxO8tEGty',
        forumThreads_id: 'qNiOLKdRt',
        forumComments_id: '',
        replyToForumComments_id: '',
        users_id: 'P7UJMuUnx',
        localesArr: [
          {
            _id: 'MWXoBzBVk',
            language: 'ja',
            name: '',
            comment: `No.4 / Comment 2: まっ黒な頁ページいっぱいに白い点々のある美しい写真を二人でいつまでも見たのでした。
            
            それをカムパネルラが忘れる筈はずもなかったのに、すぐに返事をしなかったのは、このごろぼくが、朝にも午后にも仕事がつらく、学校に出てももうみんなともはきはき遊ばず、カムパネルラともあんまり物を云わないようになったので、カムパネルラがそれを知って気の毒がってわざと返事をしなかったのだ。
            
            そう考えるとたまらないほど、じぶんもカムパネルラもあわれなような気がするのでした。`,
          }
        ],
        imagesAndVideos_id: '',
        anonymity: false,
        goods: 50,
        replies: 1,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      // 返信3 / コメント2に対して
      {
        _id: 'XDDd61fux',
        createdDate: '2019-01-05T00:00:00Z',
        updatedDate: '2019-01-05T00:00:00Z',
        gameCommunities_id: '',
        userCommunities_id: 'cxO8tEGty',
        forumThreads_id: 'qNiOLKdRt',
        forumComments_id: 'm2N3ijR3A',
        replyToForumComments_id: '',
        users_id: '',
        localesArr: [
          {
            _id: '8AmTHEgzD',
            language: 'ja',
            name: '',
            comment: 'No.5 / Reply 3: test',
          }
        ],
        imagesAndVideos_id: '',
        anonymity: false,
        goods: 25,
        replies: 0,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      
      
      // コメント3
      {
        _id: 'VktTIYpBH',
        createdDate: '2019-01-06T00:00:00Z',
        updatedDate: '2019-01-06T00:00:00Z',
        gameCommunities_id: '',
        userCommunities_id: 'cxO8tEGty',
        forumThreads_id: '_XDDSTWV_',
        forumComments_id: '',
        replyToForumComments_id: '',
        users_id: '',
        localesArr: [
          {
            _id: '1UBLw2__S',
            language: 'ja',
            name: 'No Name 1',
            comment: `No.6 / Comment 3`,
          }
        ],
        imagesAndVideos_id: '',
        anonymity: false,
        goods: 1,
        replies: 2,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      // 返信4
      {
        _id: 'ebOf-iLHg',
        createdDate: '2019-01-07T00:00:00Z',
        updatedDate: '2019-01-07T00:00:00Z',
        gameCommunities_id: '',
        userCommunities_id: 'cxO8tEGty',
        forumThreads_id: '_XDDSTWV_',
        forumComments_id: 'VktTIYpBH',
        replyToForumComments_id: '',
        users_id: '',
        localesArr: [
          {
            _id: 'sY0jgZclI',
            language: 'ja',
            name: '',
            comment: `No.8 / Reply 4`,
          }
        ],
        imagesAndVideos_id: '',
        anonymity: false,
        goods: 0,
        replies: 0,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      // 返信5
      {
        _id: 'qUypQnOQ7',
        createdDate: '2019-01-08T00:00:00Z',
        updatedDate: '2019-01-08T00:00:00Z',
        gameCommunities_id: '',
        userCommunities_id: 'cxO8tEGty',
        forumThreads_id: '_XDDSTWV_',
        forumComments_id: 'VktTIYpBH',
        replyToForumComments_id: 'ebOf-iLHg',
        users_id: '',
        localesArr: [
          {
            _id: 'sh-8rsy_k',
            language: 'ja',
            name: '',
            comment: `No.9 / Reply 5`,
          }
        ],
        imagesAndVideos_id: '',
        anonymity: false,
        goods: 0,
        replies: 0,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      
      
      // コメント4
      {
        _id: '48lyHT_2U',
        createdDate: '2019-01-09T00:00:00Z',
        updatedDate: '2019-01-09T00:00:00Z',
        gameCommunities_id: '',
        userCommunities_id: 'cxO8tEGty',
        forumThreads_id: '_XDDSTWV_',
        forumComments_id: '',
        replyToForumComments_id: '',
        users_id: 'jun-deE4J',
        localesArr: [
          {
            _id: 'TT3o43rQF',
            language: 'ja',
            name: '',
            comment: `No.7 / Comment 4`,
          }
        ],
        imagesAndVideos_id: '',
        anonymity: false,
        goods: 2,
        replies: 0,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      
      
      // GC コメント1
      {
        _id: 'q8KUQI6xk',
        createdDate: '2020-03-24T00:00:00Z',
        updatedDate: '2020-02-24T00:00:00Z',
        gameCommunities_id: 'Jk92aglWl',
        userCommunities_id: '',
        forumThreads_id: 'H6pB91tMq',
        forumComments_id: '',
        replyToForumComments_id: '',
        users_id: 'jun-deE4J',
        localesArr: [
          {
            _id: 'RNTC-Jsel',
            language: 'ja',
            name: '',
            comment: `GC / No.1 / Comment 1`,
          }
        ],
        imagesAndVideos_id: '',
        anonymity: false,
        goods: 0,
        replies: 1,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      // GC 返信1
      {
        _id: 'gocEJSDyv',
        createdDate: '2020-03-27T07:35:00Z',
        updatedDate: '2020-03-27T07:35:00Z',
        gameCommunities_id: 'Jk92aglWl',
        userCommunities_id: '',
        forumThreads_id: 'H6pB91tMq',
        forumComments_id: 'q8KUQI6xk',
        replyToForumComments_id: '',
        users_id: 'jun-deE4J',
        localesArr: [
          {
            _id: 'dxmmzQA50',
            language: 'ja',
            name: '',
            comment: `GC / No.1 / Reply 1`,
          }
        ],
        imagesAndVideos_id: '',
        anonymity: false,
        goods: 0,
        replies: 0,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      
      
    ];
    
    
    // ---------------------------------------------
    //   Insert
    // ---------------------------------------------
    
    await SchemaForumComments.deleteMany({ reset: true });
    returnObj = await SchemaForumComments.insertMany({ saveArr });
    
    
    
    
    // --------------------------------------------------
    //   DB / Recruitment Threads
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Save Object
    // ---------------------------------------------
    
    saveArr = [
      
      {
        _id: 'nEQMNMWDy',
        createdDate: '2020-03-27T00:00:00Z',
        updatedDate: '2020-03-27T00:00:00Z',
        gameCommunities_id: 'Jk92aglWl',
        users_id: 'jun-deE4J',
        hardwareIDsArr: ['TdK3Oc-yV'],
        // hardwareIDsArr: ['P0UG-LHOQ', 'SXybALV1f', 'o-f3Zxd49', 'TdK3Oc-yV', 'uPqoiXA_8', 'Zd_Ia4Hwm', 'qk9DiUwN-', 'mOpBZsQBm', 'efIOgWs3N', 'I-iu-WmkO', 'KyOSlwcLk'],
        category: 3,
        localesArr: [
          {
            _id: 'mlHfW2oMv',
            language: 'ja',
            title: 'イベントを一緒にプレイしてくれる方募集！',
            name: '',
            comment: `ずゐぶん遠いむかしの話だけれど、由はうどんやの女中をした事がありました。短いあひだではありましたが、はじめての奉公なので、これがお前の寝るところだと云はれた暗い納戸のやうな部屋へ這入りますと、いつぺんに涙が噴きあげて体がちつとも動かないのです。

　そのうどんやは尾道と云ふ港町から船に乗つて小一時間位ありました。みんな「いんのしま」と云つてをりましたので、由は「犬の島」とでも書くのかと思つてをりましたところ、買つて貰つた切符には「因ノ島」と書いてありました。由は此島で短いながら淋しい三週間を過しました。`,
          },
        ],
        imagesAndVideos_id: 'DZLBgxuVId',
        ids_idsArr: ['GcymNACvc', 'mDuSVm6S7', 'n4I1BDtxH', 'L00bEpD46', '8bJV9G6MU', 'UVOFSNbXR'],
        publicIDsArr: [],
        publicInformationsArr: [],
        publicSetting: 1,
        deadlineDate: '2020-05-31T00:00:00Z',
        close: false,
        webPush: true,
        webPushSubscriptionObj: {
          endpoint: '',
          keys: {
            p256dh: '',
            auth: ''
          }
        },
        publicCommentsUsers_idsArr: [],
        publicApprovalUsers_idsArrr: [],
        comments: 2,
        replies: 0,
        images: 1,
        videos: 0,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      {
        _id: 'jlpBu0RfB',
        createdDate: '2020-04-07T00:00:00Z',
        updatedDate: '2020-04-07T00:00:00Z',
        gameCommunities_id: 'Jk92aglWl',
        users_id: '',
        hardwareIDsArr: ['P0UG-LHOQ', 'o-f3Zxd49'],
        category: 2,
        localesArr: [
          {
            _id: 'HF1lNznMv',
            language: 'ja',
            title: 'PC版とiOS版のフレンド募集',
            name: '牧野信一',
            comment: `今度東京へ戻つてからの住むべき部屋を頼む意味の手紙を八代龍太に書くつもりで、炉端で鉛筆を削つた。酒を飲んでゐる平次と倉造が、茶わんの杯をさして、村境の茶屋に三味線の技に長けたひとりの貌麗しい酌女が現れてゆききの遊冶郎のあぶらをしぼつてゐるとのことであるから見参に赴かうではないかと誘つた。

賛成の旨を応へ、手紙一本書く間を待ち給へ、と二階へあがつた。窓からは、暮色の波に揺れる一面の稲田が、もう遥の山々は空との境もなく深い宵暗やみに閉ざされてゐるので――沼の観であつた。向ふ岸に一点の灯が見ゆるのだ。

茶屋の灯である。村里を左様に離れた畑中に、ひとり花やかな館を営む所以を不思議と思つたところが、彼は同村民を野蛮で吝嗇の徒と排して、夙に街道の旅人を招ぶべき念であつたとのことである。茶屋の者達は努めて都の言葉を用意して、村言葉の連中をわらふとの由だつた。`,
          },
        ],
        imagesAndVideos_id: '',
        ids_idsArr: [],
        publicIDsArr: [
          {
            _id: 'XZUlw4SiC',
            platform: 'PC',
            id: 'test-id-1',
          },
          {
            _id: 'EXUDsazUS',
            platform: 'Discord',
            id: 'test-id-2',
          },
          {
            _id: 'TBs8GWeqf',
            platform: 'Other',
            id: 'test-id-3',
          },
        ],
        publicInformationsArr: [
          {
            _id: '5PKhtkAAk',
            title: 'サーバー名',
            information: 'Game-Server',
          },
          {
            _id: 'to18A4ZRo',
            title: 'メンバー数',
            information: '20人',
          },
          {
            _id: 'fILlNuMcO',
            title: 'PVP',
            information: 'あり',
          },
        ],
        publicSetting: 2,
        deadlineDate: '2020-04-13T15:00:00Z',
        close: false,
        webPush: false,
        webPushSubscriptionObj: {
          endpoint: '',
          keys: {
            p256dh: '',
            auth: ''
          }
        },
        publicCommentsUsers_idsArr: [],
        publicApprovalUsers_idsArrr: [],
        comments: 1,
        replies: 0,
        images: 0,
        videos: 0,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      {
        _id: 'JWHzs2yPs',
        createdDate: '2020-04-10T00:00:00Z',
        updatedDate: '2020-04-10T00:00:00Z',
        gameCommunities_id: 'Jk92aglWl',
        users_id: '',
        hardwareIDsArr: ['Zd_Ia4Hwm'],
        category: 1,
        localesArr: [
          {
            _id: 'HF1lNznMv',
            language: 'ja',
            title: '求む和風家具！交換してくれる方いませんか？',
            name: 'たぬきち',
            comment: `「あつまれ どうぶつの森」をプレイしています。
今、和風の家具を集めているので、余っている家具がある方、交換してもらえないでしょうか？

私が持っている家具のリストはこちらになります。

・家具1
・家具2
・家具3

この中で交換したい家具があれば言ってください。
`,
          },
        ],
        imagesAndVideos_id: '',
        ids_idsArr: [],
        publicIDsArr: [
          {
            _id: '1xbPcxCoZ',
            platform: 'Nintendo',
            id: 'Nintendo-1',
          },
        ],
        publicInformationsArr: [
          {
            _id: 'oaZNfyGO5',
            title: '活動時間',
            information: '20時～23時くらい',
          },
          {
            _id: 'Ya81Lq26z',
            title: '島',
            information: 'タヌポータル島',
          },
        ],
        publicSetting: 3,
        deadlineDate: '2023-12-31T00:00:00Z',
        close: false,
        webPush: false,
        webPushSubscriptionObj: {
          endpoint: '',
          keys: {
            p256dh: '',
            auth: ''
          }
        },
        publicCommentsUsers_idsArr: [],
        publicApprovalUsers_idsArrr: [],
        comments: 0,
        replies: 0,
        images: 0,
        videos: 0,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
    ];
    
    
    // ---------------------------------------------
    //   Insert
    // ---------------------------------------------
    
    await SchemaRecruitmentThreads.deleteMany({ reset: true });
    returnObj = await SchemaRecruitmentThreads.insertMany({ saveArr });
    
    
    
    
    // --------------------------------------------------
    //   DB / Recruitment Comments
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Save Object
    // ---------------------------------------------
    
    saveArr = [
      
      {
        _id: 'hSe73CMkq',
        createdDate: '2020-04-24T00:00:00Z',
        updatedDate: '2020-04-24T00:00:00Z',
        gameCommunities_id: 'Jk92aglWl',
        recruitmentThreads_id: 'nEQMNMWDy',
        users_id: 'jun-deE4J',
        localesArr: [
          {
            _id: 'KCH7Abzg7',
            language: 'ja',
            name: '',
            comment: `子供の時分の冬の夜の記憶の中に浮上がって来る数々の物象の中に「行燈あんどん」がある。自分の思い出し得られる限りその当時の夜の主なる照明具は石油ランプであった。時たま特別の来客を饗応でもするときに、西洋蝋燭ろうそくがばね仕掛じかけで管の中からせり上がって来る当時ではハイカラな燭台を使うこともあったが、しかし就寝時の有明けにはずっと後までも行燈を使っていた。`,
          },
        ],
        imagesAndVideos_id: '',
        ids_idsArr: ['UVOFSNbXR'],
        publicIDsArr: [],
        publicInformationsArr: [],
        publicSetting: 1,
        webPush: true,
        webPushSubscriptionObj: {
          endpoint: '',
          keys: {
            p256dh: '',
            auth: ''
          }
        },
        goods: 0,
        replies: 2,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      {
        _id: 'oMXuuwr61',
        createdDate: '2020-04-23T00:00:00Z',
        updatedDate: '2020-04-23T00:00:00Z',
        gameCommunities_id: 'Jk92aglWl',
        recruitmentThreads_id: 'nEQMNMWDy',
        users_id: '',
        localesArr: [
          {
            _id: 'pWi8vpTsa',
            language: 'ja',
            name: '聖剣伝説',
            comment: `「幸福しあわせ」がいろいろな家へ訪たずねて行きました。

誰でも幸福の欲しくない人はありませんから
どこの家を訪ねましても、みんな大喜びで迎えてくれるにちがいありません。
けれども、それでは人の心がよく分りません。
そこで「幸福」は貧しい貧しい乞食こじきのような服装なりをしました。

誰か聞いたら、自分は「幸福」だと言わずに「貧乏」だと言うつもりでした。
そんな貧しい服装をしていても
それでも自分をよく迎えてくれる人がありましたら
その人のところへ幸福を分けて置いて来るつもりでした。`,
          },
        ],
        imagesAndVideos_id: '',
        ids_idsArr: ['UVOFSNbXR'],
        publicIDsArr: [],
        publicInformationsArr: [],
        publicSetting: 1,
        webPush: false,
        webPushSubscriptionObj: {
          endpoint: '',
          keys: {
            p256dh: '',
            auth: ''
          }
        },
        goods: 0,
        replies: 0,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      {
        _id: '4obJ8p4vf',
        createdDate: '2020-04-20T00:00:00Z',
        updatedDate: '2020-04-20T00:00:00Z',
        gameCommunities_id: 'Jk92aglWl',
        recruitmentThreads_id: 'jlpBu0RfB',
        users_id: 'P7UJMuUnx',
        localesArr: [
          {
            _id: 'pJ2DaA5xb',
            language: 'ja',
            name: '',
            comment: `私は随分遊び好きな方だった。お友達を訪ねて行くなどということは、余りなかったけれども、決して温順おとなしい、陰気な子供ではなかった。したがって、じっと書斎に閉じ籠って、書いてばかりいたのだとは思えない。`,
          },
        ],
        imagesAndVideos_id: '',
        ids_idsArr: [],
        publicIDsArr: [],
        publicInformationsArr: [],
        publicSetting: 1,
        webPush: false,
        webPushSubscriptionObj: {
          endpoint: '',
          keys: {
            p256dh: '',
            auth: ''
          }
        },
        goods: 0,
        replies: 1,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
    ];
    
    
    // ---------------------------------------------
    //   Insert
    // ---------------------------------------------
    
    await SchemaRecruitmentComments.deleteMany({ reset: true });
    returnObj = await SchemaRecruitmentComments.insertMany({ saveArr });
    
    
    
    
    // --------------------------------------------------
    //   DB / Recruitment Replies
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Save Object
    // ---------------------------------------------
    
    saveArr = [
      
      {
        _id: 'pd4s2Arht',
        createdDate: '2020-04-20T00:00:00Z',
        updatedDate: '2020-04-20T00:00:00Z',
        gameCommunities_id: 'Jk92aglWl',
        recruitmentThreads_id: 'nEQMNMWDy',
        recruitmentComments_id: 'hSe73CMkq',
        replyToRecruitmentReplies_id: '',
        users_id: 'jun-deE4J',
        localesArr: [
          {
            _id: 'q6aFUKOlY',
            language: 'ja',
            name: '',
            comment: `玄関の横の少し薄暗い四畳半、それは一寸茶室のような感じの、畳からすぐに窓のとってあるような、陰気な部屋だった。女学校へ通う子供の時分から、いつとはなしに、私はその部屋を自分の勉強部屋と決めて独占してしまったのである。
            
私はその部屋で、誰にも邪魔されないで、自分の好きなものを、随分沢山書いた。書いて、書いて、ただ書いただけだった。何といっても、まるっきり子供のことではあり、それらをどうしようという気持は少しもなかった。投書というようなことも嫌いで一度もしたことはなかった。`,
          },
        ],
        imagesAndVideos_id: '',
        goods: 0,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      {
        _id: 'XHNLEQl8N',
        createdDate: '2020-04-21T00:00:00Z',
        updatedDate: '2020-04-21T00:00:00Z',
        gameCommunities_id: 'Jk92aglWl',
        recruitmentThreads_id: 'nEQMNMWDy',
        recruitmentComments_id: 'hSe73CMkq',
        replyToRecruitmentReplies_id: 'pd4s2Arht',
        users_id: '',
        localesArr: [
          {
            _id: 'tCNK79D8y',
            language: 'ja',
            name: 'ナイチンゲール',
            comment: `中国という国では、みなさんもごぞんじのことと思いますが、皇帝こうていは中国人です。
            
それから、おそばにつかえている人たちも、みんな中国人です。さて、これからするお話は、もう今からずっとむかしにあったことですけれど、それだけに、かえって今お話しておくほうがいいと思うのです。なぜって、そうでもしておかなければ、忘れられてしまいますからね。`,
          },
        ],
        imagesAndVideos_id: '',
        goods: 0,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      {
        _id: '7_PH3n0CK',
        createdDate: '2020-04-21T00:00:00Z',
        updatedDate: '2020-04-21T00:00:00Z',
        gameCommunities_id: 'Jk92aglWl',
        recruitmentThreads_id: 'nEQMNMWDy',
        recruitmentComments_id: '4obJ8p4vf',
        replyToRecruitmentReplies_id: '',
        users_id: '6GWOpEcD3',
        localesArr: [
          {
            _id: 'oZkq_bH7q',
            language: 'ja',
            name: '',
            comment: `蛞蝓のように地面を這って
歩く練習をしていたら
体が充血して熱くなってきた
丁度向うから女が
這ってきたので交接した
女は子供を産んだ
子供はごむ製だった
口から息を吹きこむと
だんだん大きくなった
もっともっと大きくしようと
ふくらませたら
パァーンと花火のように
破裂した
女と大笑いして別れた
さらに這ってゆくと日が暮れて
怠惰になった
骨まで解体してぐったりと寝た
やがて星よりもよく光る
白骨になった`,
          },
        ],
        imagesAndVideos_id: '',
        goods: 0,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
    ];
    
    
    // ---------------------------------------------
    //   Insert
    // ---------------------------------------------
    
    await SchemaRecruitmentReplies.deleteMany({ reset: true });
    returnObj = await SchemaRecruitmentReplies.insertMany({ saveArr });
    
    
    
    
    // --------------------------------------------------
    //   DB / Follows
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Save Object
    // ---------------------------------------------
    
    saveArr = [
      {
        _id: 'sz3BZt4Kp',
        updatedDate: ISO8601,
        gameCommunities_id: '',
        userCommunities_id: '',
        users_id: 'jun-deE4J',
        approval: false,
        followArr: [],
        followCount: 0,
        followedArr: ['P7UJMuUnx'],
        followedCount: 1,
        approvalArr: ['6GWOpEcD3'],
        approvalCount: 1,
        blockArr: [],
        blockCount: 0,
      },
      
      
      {
        _id: 'q1Ys28XTs',
        updatedDate: ISO8601,
        gameCommunities_id: '',
        userCommunities_id: '',
        users_id: 'P7UJMuUnx',
        approval: false,
        followArr: ['jun-deE4J'],
        followCount: 1,
        followedArr: [],
        followedCount: 0,
        approvalArr: [],
        approvalCount: 0,
        blockArr: [],
        blockCount: 0,
      },
      
      
      {
        _id: 'g8mT68Zc0',
        updatedDate: ISO8601,
        gameCommunities_id: '',
        userCommunities_id: '',
        users_id: '6GWOpEcD3',
        approval: false,
        followArr: [],
        followCount: 0,
        followedArr: [],
        followedCount: 0,
        approvalArr: [],
        approvalCount: 0,
        blockArr: [],
        blockCount: 0,
      },
      
      
      {
        _id: 'rys6GHf1g',
        updatedDate: ISO8601,
        gameCommunities_id: '',
        userCommunities_id: 'cxO8tEGty',
        users_id: '',
        approval: false,
        followArr: [],
        followCount: 0,
        followedArr: ['jun-deE4J', 'P7UJMuUnx'],
        followedCount: 2,
        approvalArr: ['6GWOpEcD3'],
        approvalCount: 1,
        blockArr: [],
        blockCount: 0,
      },
      
      
      {
        _id: 'CpcIZRiRK',
        updatedDate: ISO8601,
        gameCommunities_id: 'Jk92aglWl',
        userCommunities_id: '',
        users_id: '',
        approval: false,
        followArr: [],
        followCount: 0,
        followedArr: [],
        followedCount: 0,
        approvalArr: [],
        approvalCount: 0,
        blockArr: [],
        blockCount: 0,
      },
      
      
      {
        _id: 'Ku56fb9T5',
        updatedDate: ISO8601,
        gameCommunities_id: 'lxdubg6IY',
        userCommunities_id: '',
        users_id: '',
        approval: false,
        followArr: [],
        followCount: 0,
        followedArr: [],
        followedCount: 0,
        approvalArr: [],
        approvalCount: 0,
        blockArr: [],
        blockCount: 0,
      },
      
      
      {
        _id: 'DjPetpzxL',
        updatedDate: ISO8601,
        gameCommunities_id: 'YcIvt9hf7',
        userCommunities_id: '',
        users_id: '',
        approval: false,
        followArr: [],
        followCount: 0,
        followedArr: [],
        followedCount: 0,
        approvalArr: [],
        approvalCount: 0,
        blockArr: [],
        blockCount: 0,
      },
      
      
      {
        _id: 'hH7TPcQe5',
        updatedDate: ISO8601,
        gameCommunities_id: 'WMHFmAp8e',
        userCommunities_id: '',
        users_id: '',
        approval: false,
        followArr: [],
        followCount: 0,
        followedArr: [],
        followedCount: 0,
        approvalArr: [],
        approvalCount: 0,
        blockArr: [],
        blockCount: 0,
      },
    ];
    
    
    // ---------------------------------------------
    //   Insert
    // ---------------------------------------------
    
    await SchemaFollows.deleteMany({ reset: true });
    returnObj = await SchemaFollows.insertMany({ saveArr });
    
    
    
    
    // --------------------------------------------------
    //   DB / Goods
    // --------------------------------------------------
    
    // --------------------------------------------------
    //   deleteMany
    // --------------------------------------------------
    
    await SchemaGoods.deleteMany({ reset: true });
    
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   users_id: {green ${users_id}}
    // `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(returnObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // ---------------------------------------------
    //   Return Json Object / Success
    // ---------------------------------------------
    
    return res.status(200).json(returnObj);
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   Error Object
    // ---------------------------------------------
    
    errorArgumentsObj.errorObj = errorObj;
    const resultErrorObj = errorCodeIntoErrorObj(errorArgumentsObj);
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
});


module.exports = router;