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
const upload = multer({ dest: 'static/' });
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
const SchemaUserCommunities = require('../@database/user-communities/model');
const SchemaForumThreads = require('../@database/forum-threads/model');
const SchemaForumComments = require('../@database/forum-comments/model');


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
    const ISO8601 = moment().toISOString();
    
    
    
    
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
        pagesArr: [
          {
            _id: '51WW1NG1r',
            type: 'top',
            name: 'マリオのプロフィール',
            language: 'ja',
          },
        ],
        loginID: '8OM0dhDak',
        loginPassword: '$2b$10$NsuOPWswqCkJ2STKfbKg/OMXfxdWabz1oy36HKOwRojHJ4S8FPsPS',
        emailObj: {
          value: '38cda58a026a9703cc8f5e8a104d8c88ab32965e4e6aba5e18ca93366c71e7db',// aaa@gameusers.org
          confirmation: true,
        },
        country: 'JP',
        termsOfServiceConfirmedDate: ISO8601,
        exp: 999,
        titleArr: [// これなに？
          {
            _id: 'pFJEn_2MO',
            createdDate: ISO8601,
            updatedDate: ISO8601,
            titleID: 'MuK2dKVpn',
            count: 0,
          }
        ],
        followArr: [],
        followCount: 0,
        followedArr: ['P7UJMuUnx'],
        followedCount: 1,
        role: 'User'
      },
      
      
      {
        _id: 'P7UJMuUnx',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        accessDate: ISO8601,
        userID: 'user2',
        pagesArr: [
          {
            _id: 'bZiZ-kQjo',
            type: 'top',
            name: '',
            language: 'ja',
          },
        ],
        loginID: 'enPLLYBBEg3y',
        loginPassword: '$2b$10$.O/ZmfEO2QOV6IRxxmQO1eSRMx8yhL83ISq9z/gyOpTCtbYL3j4B.',
        emailObj: {
          value: '0509b58e75540f35054f9b7acdbf0771ae7151614f805a61fe2556f6fe947e78',// bbb@gameusers.org
          confirmation: false,
        },
        country: 'JP',
        termsOfServiceConfirmedDate: ISO8601,
        exp: 10,
        titleArr: [],
        followArr: ['jun-deE4J'],
        followCount: 1,
        followedArr: [],
        followedCount: 0,
        role: 'User'
      },
      
      
      {
        _id: '6GWOpEcD3',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        accessDate: ISO8601,
        userID: 'user3',
        pagesArr: [
          {
            _id: '5UDVe_gui',
            type: 'top',
            name: '',
            language: 'ja',
          },
        ],
        loginID: 'nzPR7R9GO',
        loginPassword: '$2b$10$.qPAsMTPieChFehxF7TC2OXYWZdek0FKuJPABVxtBPo1UzrpOwZ6.',
        emailObj: {
          value: '',
          confirmation: false,
        },
        country: 'JP',
        termsOfServiceConfirmedDate: ISO8601,
        exp: 0,
        titleArr: [],
        followArr: [],
        followCount: 0,
        followedArr: [],
        followedCount: 0,
        role: 'User'
      },
    ];
    
    
    // ---------------------------------------------
    //   Upsert
    // ---------------------------------------------
    
    await SchemaUsers.deleteMany({});
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
        gameID: 'Jk92aglWl',
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
        gameID: 'Jk92aglWl',
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
        gameID: 'lxdubg6IY',
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
        gameID: 'lxdubg6IY',
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
        gameID: 'YcIvt9hf7',
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
        gameID: 'WMHFmAp8e',
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
    
    await SchemaGames.deleteMany({});
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
    
    await SchemaGameGenres.deleteMany({});
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
    
    await SchemaHardwares.deleteMany({});
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
    
    await SchemaDevelopersPublishers.deleteMany({});
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
        gameID: '',
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
        gameID: '',
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
        gameID: '',
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
        gameID: '',
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
        gameID: 'Jk92aglWl',
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
        gameID: 'lxdubg6IY',
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
        gameID: '',
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
        gameID: 'YcIvt9hf7',
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
        gameID: '',
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
        gameID: '',
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
        gameID: '',
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
        gameID: '',
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
        gameID: '',
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
        gameID: '',
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
        gameID: '',
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
        gameID: '',
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
    
    await SchemaIDs.deleteMany({});
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
          comment: `BTOで買ったPCが壊れそうになったので、ケースや光学ドライブなどを流用しながらパーツを新しくしました。HDからSSDに移行したときはその速さに驚きましたね！容量があまりないので大量にゲームをインストールできないのですが、高速なのでなんとかSSDでやりくりしていきたいです。
    
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
        ids_idArr: ['GcymNACvc', 'mDuSVm6S7', 'n4I1BDtxH', 'L00bEpD46', '8bJV9G6MU', 'UVOFSNbXR'],
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
        ids_idArr: [],
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
      }
    ];
    
    
    // --------------------------------------------------
    //   insertMany
    // --------------------------------------------------
    
    await SchemaCardPlayers.deleteMany({});
    returnObj = await SchemaCardPlayers.insertMany({ saveArr });
    
    
    
    
    // --------------------------------------------------
    //   DB / Email Confirmations
    // --------------------------------------------------
    
    // --------------------------------------------------
    //   deleteMany
    // --------------------------------------------------
    
    await SchemaEmailConfirmations.deleteMany({});
    
    
    
    
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
        type: 'game',
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
        type: 'game',
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
        type: 'game',
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
        type: 'game',
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
        type: 'game',
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
        type: 'player',
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
        type: 'player',
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
      
      
      
      
      // forum comment 1
      {
        
        _id: 'nA0rYeYu9',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: '',
        type: 'forum',
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
    
    await SchemaImagesAndVideos.deleteMany({});
    returnObj = await SchemaImagesAndVideos.insertMany({ saveArr });
    
    
    
    
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
            description: 'RPG好きが集まるコミュニティです。新旧問わず名作・駄作について話し合いましょう！',
            descriptionShort: 'descriptionShort',
          },
        ],
        imagesAndVideos_id: '',
        imagesAndVideosThumbnail_id: '',
        gameIDArr: [],
        memberObj: {
          count: 0,
          membersArr: [],
        },
        forumObj: {
          threadCount: 5,
        },
        updatedDateObj: {
          notification: ISO8601,
          forum: ISO8601,
        }
      },
    ];
    
    
    // ---------------------------------------------
    //   Insert
    // ---------------------------------------------
    
    await SchemaUserCommunities.deleteMany({});
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
            description: `みんなで気になる話題について話し合いましょう！
            ゲームの話は特に大歓迎です。
            おすすめの作品などがあったら、ぜひ紹介してください。`,
          },
          {
            _id: '_Ov63CsHc',
            language: 'en',
            name: 'Thread 1: English',
            description: 'English',
          }
        ],
        imagesAndVideos_id: '',
        comments: 2,
        images: 108,
        videos: 50,
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
            description: `Next.js を試してみたところ、とても優秀だったので採用することに決めました。サーバーサイドレンダリングの機能や、Code Splitting をデフォルトで行ってくれるのは非常に便利です。ただすべての機能を提供してくれるわけではないので、結局、自分で Express を利用したサーバー用コードを書かないといけない部分も多くあるのですが。
  
  それと Next.js はデータベースへのアクセスをすべて API で行うことを推奨しているようです。そこそこの規模のサイトになると、そういった構成が増えてくるのかもしれないのですが、自分は小規模なサイトしか作ったことがないので、初めての経験でちょっと不安です。`,
          }
        ],
        imagesAndVideos_id: '',
        comments: 0,
        images: 4,
        videos: 3,
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
            description: `ジョバンニはまるで毎日教室でもねむく、本を読むひまも読む本もないので、なんだかどんなこともよくわからないという気持きもちがするのでした。`,
          }
        ],
        imagesAndVideos_id: '',
        comments: 0,
        images: 0,
        videos: 0,
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
            description: `Next.js で styled-components + Material UI を使う場合、それ用に別途コードを書かなければならない必要が生まれます。しかも Material UI がアップデートすると動かなくなったりするので、とても面倒な組み合わせです。

今回もまた Material UI を Ver.4 にアップデートしてみたところ正常に動かなくなったため、なにか他に方法はないのかと調べてみました。すると emotion という CSS in JS の新しめのライブラリを発見することができました。なんと Material UI では emotion を特別なことをせずにそのまま使えるようなのです。実際、使用してみたところ styled-components との組み合わせよりも、全然相性がいい気がします。

Material UI にスタイルを当てる場合、Material UI がデフォルトで用意している書き方を使う方法もあるのですが、自分はその書き方が気に入らなかったのと、サイト全体のスタイルシートの書き方を統一する意味も込めて、これまでは styled-components を採用していました。`,
          },
        ],
        imagesAndVideos_id: '',
        comments: 0,
        images: 4,
        videos: 4,
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
            description: `今回使ってみて emotion の感触が良かったので、こちらに移行することにしました。 後発のライブラリなので機能的にもいいとこ取りをしていて、とても優秀です。同じように Material UI を利用している方はチェックしてみて欲しいですね。いろいろ楽になると思います。

emotion: https://emotion.sh/docs/introduction`,
          },
        ],
        imagesAndVideos_id: '',
        comments: 0,
        images: 5,
        videos: 5,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      // {
      //   _id: 'IjE8qr-Mh',
      //   createdDate: '2019-01-06T00:00:00Z',
      //   updatedDate: '2019-01-06T00:00:00Z',
      //   gameCommunities_id: '',
      //   userCommunities_id: 'cxO8tEGty',
      //   users_id: '',
      //   localesArr: [
      //     {
      //       _id: 'ANCAagCg-',
      //       language: 'ja',
      //       name: 'スレッド6: 日本語',
      //       description: `Thread 6`,
      //     },
      //     {
      //       _id: 'PiTg1YYCR',
      //       language: 'en',
      //       name: 'Thread 6: English',
      //       description: `Thread 6`,
      //     },
      //   ],
      //   imagesAndVideos_id: '',
      //   comments: 0,
      //   images: 0,
      //   videos: 0,
      //   ip: '192.168.1.0',
      //   userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      // },
      
    ];
    
    
    // ---------------------------------------------
    //   Insert
    // ---------------------------------------------
    
    await SchemaForumThreads.deleteMany({});
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
        userCommunities_id: 'QD7Ve7yND',
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
        userCommunities_id: 'QD7Ve7yND',
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
        userCommunities_id: 'QD7Ve7yND',
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
        userCommunities_id: 'QD7Ve7yND',
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
        userCommunities_id: 'QD7Ve7yND',
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
        userCommunities_id: 'QD7Ve7yND',
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
        replies: 0,
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      
      
      // コメント4
      {
        _id: '48lyHT_2U',
        createdDate: '2019-01-07T00:00:00Z',
        updatedDate: '2019-01-07T00:00:00Z',
        gameCommunities_id: '',
        userCommunities_id: 'QD7Ve7yND',
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
      
      
    ];
    
    
    // ---------------------------------------------
    //   Insert
    // ---------------------------------------------
    
    await SchemaForumComments.deleteMany({});
    returnObj = await SchemaForumComments.insertMany({ saveArr });
    
    
    
    
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