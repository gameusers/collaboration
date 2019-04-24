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

// const { verifyCsrfToken } = require('../@modules/csrf');
const { errorCodeIntoErrorObj } = require('../@modules/error/error-obj');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelUsers = require('../@database/users/model');
const ModelGames = require('../@database/games/model');
const ModelIDs = require('../@database/ids/model');
const ModelCardPlayers = require('../@database/card-players/model');
const ModelCardGames = require('../@database/card-games/model');
const ModelGameGenres = require('../@database/game-genres/model');
const ModelHardwares = require('../@database/hardwares/model');
const ModelDevelopersPublishers = require('../@database/developers-publishers/model');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { addLocaleData } = require('react-intl');
const en = require('react-intl/locale-data/en');
const ja = require('react-intl/locale-data/ja');
addLocaleData([...en, ...ja]);

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
  usersLogin_id: ''
};




// --------------------------------------------------
//   Initial Props / Function ID: gUwZx1hDG
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
        playerID: 'user1',
        loginID: '8OM0dhDak',
        loginPassword: '$2b$10$NsuOPWswqCkJ2STKfbKg/OMXfxdWabz1oy36HKOwRojHJ4S8FPsPS',
        emailObj: {
          value: '486b136d80cca6546d9b5a88161b941e9ff774a1eff937493781152843423f58',
          confirmation: true,
        },
        country: 'JP',
        termsOfServiceConfirmedDate: ISO8601,
        experience: 999,
        titleArr: [
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
        playerID: 'user2',
        loginID: 'enPLLYBBEg3y',
        loginPassword: '$2b$10$.O/ZmfEO2QOV6IRxxmQO1eSRMx8yhL83ISq9z/gyOpTCtbYL3j4B.',
        emailObj: {
          value: '9b8383b1e34b684f357899abf58f3dd99e4cca2b830e87ad5f9f1bbbd077853c',
          confirmation: false,
        },
        country: 'JP',
        termsOfServiceConfirmedDate: ISO8601,
        experience: 10,
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
        playerID: 'user3',
        loginID: 'nzPR7R9GO',
        loginPassword: '$2b$10$.qPAsMTPieChFehxF7TC2OXYWZdek0FKuJPABVxtBPo1UzrpOwZ6.',
        emailObj: {
          value: '',
          confirmation: false,
        },
        country: 'JP',
        termsOfServiceConfirmedDate: ISO8601,
        experience: 0,
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
    
    await ModelUsers.deleteMany({});
    returnObj = await ModelUsers.insertMany({ saveArr });
    
    
    
    
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
        imagesAndVideosObj: {
          thumbnailArr: [
            {
              _id: 'rykFm6Vfg',
              type: 'image',
              caption: '',
              srcSetArr: [
                {
                  _id: '6Wh-bORu5',
                  src: '/static/img/game/w_zkqpr3R/thumbnail/rykFm6Vfg/320w.jpg',
                  w: '320w',
                  width: 256,
                  height: 256,
                },
              ],
            },
          ],
          mainArr: [
            {
              _id: 'w_xujtkWJ',
              type: 'image',
              caption: '',
              srcSetArr: [
                {
                  _id: 'TJV1VSY3b',
                  src: '/static/img/game/w_zkqpr3R/main/w_xujtkWJ/320w.jpg',
                  w: '320w',
                  width: 320,
                  height: 212,
                },
                {
                  _id: 's3Xs7RYbB',
                  src: '/static/img/game/w_zkqpr3R/main/w_xujtkWJ/480w.jpg',
                  w: '480w',
                  width: 480,
                  height: 318,
                },
                {
                  _id: 'ZWEnlME8G',
                  src: '/static/img/game/w_zkqpr3R/main/w_xujtkWJ/640w.jpg',
                  w: '640w',
                  width: 640,
                  height: 424,
                },
                {
                  _id: '5dlieCGRx',
                  src: '/static/img/game/w_zkqpr3R/main/w_xujtkWJ/800w.jpg',
                  w: '800w',
                  width: 800,
                  height: 530,
                },
                {
                  _id: 'HnXYejt-g',
                  src: '/static/img/game/w_zkqpr3R/main/w_xujtkWJ/960w.jpg',
                  w: '960w',
                  width: 960,
                  height: 636,
                },
                {
                  _id: '8MEIYDuvc',
                  src: '/static/img/game/w_zkqpr3R/main/w_xujtkWJ/1120w.jpg',
                  w: '1120w',
                  width: 1120,
                  height: 741,
                },
                {
                  _id: 'd9vKCEvKE',
                  src: '/static/img/game/w_zkqpr3R/main/w_xujtkWJ/1280w.jpg',
                  w: '1280w',
                  width: 1280,
                  height: 847,
                },
                {
                  _id: '0QhbD9Ckz',
                  src: '/static/img/game/w_zkqpr3R/main/w_xujtkWJ/1440w.jpg',
                  w: '1440w',
                  width: 1440,
                  height: 953,
                },
                {
                  _id: 'A5malK_QA',
                  src: '/static/img/game/w_zkqpr3R/main/w_xujtkWJ/1600w.jpg',
                  w: '1600w',
                  width: 1600,
                  height: 1059,
                },
                {
                  _id: 'F1a-fC6Mv',
                  src: '/static/img/game/w_zkqpr3R/main/w_xujtkWJ/1760w.jpg',
                  w: '1760w',
                  width: 1760,
                  height: 1165,
                },
                {
                  _id: 'F1a-fC6Mv',
                  src: '/static/img/game/w_zkqpr3R/main/w_xujtkWJ/1920w.jpg',
                  w: '1920w',
                  width: 1920,
                  height: 1271,
                },
              ],
            },
            {
              _id: 'kaAcL8EDb',
              type: 'image',
              caption: '',
              srcSetArr: [
                {
                  _id: 'V4caK_q1p',
                  src: '/static/img/game/w_zkqpr3R/main/kaAcL8EDb/480w.jpg',
                  w: '480w',
                  width: 480,
                  height: 320,
                },
                {
                  _id: 'xdMMfLfqC',
                  src: '/static/img/game/w_zkqpr3R/main/kaAcL8EDb/640w.jpg',
                  w: '640w',
                  width: 640,
                  height: 427,
                },
                {
                  _id: 'tPVCYWlfa',
                  src: '/static/img/game/w_zkqpr3R/main/kaAcL8EDb/800w.jpg',
                  w: '800w',
                  width: 800,
                  height: 533,
                },
                {
                  _id: 'TT1DvDDnF',
                  src: '/static/img/game/w_zkqpr3R/main/kaAcL8EDb/1920w.jpg',
                  w: '1920w',
                  width: 1920,
                  height: 1280,
                },
              ],
            },
          ],
        },
        name: 'Dead by Daylight',
        subtitle: '',
        searchKeywordsArr: [
          'デッドバイデイライト',
          'でっどばいでいらいと',
          'Dead by Daylight',
          'DbD',
        ],
        forSort: 'デッドバイデイライト',
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
        imagesAndVideosObj: {
          thumbnailArr: [],
          mainArr: [],
        },
        name: 'Dead by Daylight',
        subtitle: '',
        searchKeywordsArr: [
          'Dead by Daylight',
          'DbD',
        ],
        forSort: 'Dead by Daylight',
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
        imagesAndVideosObj: {
          thumbnailArr: [],
          mainArr: [],
        },
        name: '大乱闘スマッシュブラザーズ SPECIAL',
        subtitle: '',
        searchKeywordsArr: [
          '大乱闘スマッシュブラザーズ SPECIAL',
          '大乱闘スマッシュブラザーズSPECIAL',
          '大乱闘スマッシュブラザーズスペシャル',
          'スマブラSP',
        ],
        forSort: 'ダイラントウスマッシュブラザーズスペシャル',
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
        imagesAndVideosObj: {
          thumbnailArr: [],
          mainArr: [],
        },
        name: 'Super Smash Bros. Ultimate',
        subtitle: '',
        searchKeywordsArr: [
          'Super Smash Bros. Ultimate',
        ],
        forSort: 'Super Smash Bros. Ultimate',
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
        imagesAndVideosObj: {
          thumbnailArr: [
            {
              _id: 'b0gqRt4fd',
              type: 'image',
              caption: '',
              srcSetArr: [
                {
                  _id: 'BWl9SejbC',
                  src: '/static/img/game/PdWVRzkoW/thumbnail/b0gqRt4fd/320w.jpg',
                  w: '320w',
                  width: 256,
                  height: 256,
                },
              ],
            },
          ],
          mainArr: [
            {
              _id: 'DnLgLJ003',
              type: 'image',
              caption: '',
              srcSetArr: [
                {
                  _id: '-rv2yOt4k',
                  src: '/static/img/game/PdWVRzkoW/main/DnLgLJ003/320w.jpg',
                  w: '320w',
                  width: 320,
                  height: 170,
                },
                {
                  _id: 'qDJbmdGnR',
                  src: '/static/img/game/PdWVRzkoW/main/DnLgLJ003/480w.jpg',
                  w: '480w',
                  width: 480,
                  height: 255,
                },
                {
                  _id: 'kGr_fOL6a',
                  src: '/static/img/game/PdWVRzkoW/main/DnLgLJ003/640w.jpg',
                  w: '640w',
                  width: 640,
                  height: 339,
                },
                {
                  _id: 'ZS6Jl4xoi',
                  src: '/static/img/game/PdWVRzkoW/main/DnLgLJ003/800w.jpg',
                  w: '800w',
                  width: 800,
                  height: 424,
                },
                {
                  _id: '_H1fNemtu',
                  src: '/static/img/game/PdWVRzkoW/main/DnLgLJ003/960w.jpg',
                  w: '960w',
                  width: 960,
                  height: 509,
                },
                {
                  _id: 'fL37SuBzp',
                  src: '/static/img/game/PdWVRzkoW/main/DnLgLJ003/1120w.jpg',
                  w: '1120w',
                  width: 1120,
                  height: 594,
                },
                {
                  _id: 'B7MUrUXJk',
                  src: '/static/img/game/PdWVRzkoW/main/DnLgLJ003/1280w.jpg',
                  w: '1280w',
                  width: 1280,
                  height: 679,
                },
                {
                  _id: 'DN5-HwNOC',
                  src: '/static/img/game/PdWVRzkoW/main/DnLgLJ003/1440w.jpg',
                  w: '1440w',
                  width: 1440,
                  height: 764,
                },
                {
                  _id: 'IZJv-42u1',
                  src: '/static/img/game/PdWVRzkoW/main/DnLgLJ003/1600w.jpg',
                  w: '1600w',
                  width: 1600,
                  height: 848,
                },
                {
                  _id: 'waKbKhcEt',
                  src: '/static/img/game/PdWVRzkoW/main/DnLgLJ003/1760w.jpg',
                  w: '1760w',
                  width: 1760,
                  height: 933,
                },
                {
                  _id: '_7cXbeut3',
                  src: '/static/img/game/PdWVRzkoW/main/DnLgLJ003/1920w.jpg',
                  w: '1920w',
                  width: 1920,
                  height: 1018,
                },
              ],
            },
            {
              _id: 'yR4nKoMYz',
              type: 'image',
              caption: '',
              srcSetArr: [
                {
                  _id: 'qDJbmdGnR',
                  src: '/static/img/game/PdWVRzkoW/main/yR4nKoMYz/480w.jpg',
                  w: '480w',
                  width: 480,
                  height: 320,
                },
                {
                  _id: 'kGr_fOL6a',
                  src: '/static/img/game/PdWVRzkoW/main/yR4nKoMYz/640w.jpg',
                  w: '640w',
                  width: 640,
                  height: 426,
                },
                {
                  _id: 'ZS6Jl4xoi',
                  src: '/static/img/game/PdWVRzkoW/main/yR4nKoMYz/800w.jpg',
                  w: '800w',
                  width: 800,
                  height: 533,
                },
                {
                  _id: '_7cXbeut3',
                  src: '/static/img/game/PdWVRzkoW/main/yR4nKoMYz/1920w.jpg',
                  w: '1920w',
                  width: 1920,
                  height: 1279,
                },
              ],
            },
            {
              _id: '1-dGMXkDr',
              type: 'image',
              caption: '',
              srcSetArr: [
                {
                  _id: 'qDJbmdGnR',
                  src: '/static/img/game/PdWVRzkoW/main/1-dGMXkDr/480w.jpg',
                  w: '480w',
                  width: 480,
                  height: 320,
                },
                {
                  _id: 'kGr_fOL6a',
                  src: '/static/img/game/PdWVRzkoW/main/1-dGMXkDr/640w.jpg',
                  w: '640w',
                  width: 640,
                  height: 427,
                },
                {
                  _id: 'ZS6Jl4xoi',
                  src: '/static/img/game/PdWVRzkoW/main/1-dGMXkDr/800w.jpg',
                  w: '800w',
                  width: 800,
                  height: 533,
                },
                {
                  _id: '_7cXbeut3',
                  src: '/static/img/game/PdWVRzkoW/main/1-dGMXkDr/1920w.jpg',
                  w: '1920w',
                  width: 1920,
                  height: 1280,
                },
              ],
            },
          ],
        },
        name: 'ドラゴンクエストビルダーズ2',
        subtitle: '',
        searchKeywordsArr: [
          'ドラゴンクエストビルダーズ2',
          'ドラクエビルダーズ2',
          'DQB2'
        ],
        forSort: 'ドラゴンクエストビルダーズ2',
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
        imagesAndVideosObj: {
          thumbnailArr: [
            {
              _id: '2My7aB184',
              type: 'image',
              caption: '',
              srcSetArr: [
                {
                  _id: 'Oc-oi5Lqz',
                  src: '/static/img/game/LQevTtUuJ/thumbnail/2My7aB184/320w.png',
                  w: '320w',
                  width: 256,
                  height: 256,
                },
              ],
            },
          ],
          mainArr: [],
        },
        name: 'Overcooked 2',
        subtitle: '',
        searchKeywordsArr: [
          'オーバークック2',
          'オバク2',
          'おーばーくっく2',
          'おばく',
          'Overcooked 2',
        ],
        forSort: 'オーバークック2',
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
    
    await ModelGames.deleteMany({});
    returnObj = await ModelGames.insertMany({ saveArr });
    
    
    
    
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
    
    await ModelGameGenres.deleteMany({});
    returnObj = await ModelGameGenres.insertMany({ saveArr });
    
    
    
    
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
    
    await ModelHardwares.deleteMany({});
    returnObj = await ModelHardwares.insertMany({ saveArr });
    
    
    
    
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
    
    await ModelDevelopersPublishers.deleteMany({});
    returnObj = await ModelDevelopersPublishers.insertMany({ saveArr });
    
    
    
    
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
    
    await ModelIDs.deleteMany({});
    returnObj = await ModelIDs.insertMany({ saveArr });
    
    
    
    
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
        imagesAndVideosObj: {
          thumbnailArr: [
            {
              _id: 'glbzJb34t',
              type: 'image',
              caption: '',
              srcSetArr: [
                {
                  _id: 'BWl9SejbC',
                  src: '/static/img/card/players/zaoOWw89g/thumbnail/glbzJb34t/320w.png',
                  w: '320w',
                  width: 256,
                  height: 256,
                },
              ],
            },
          ],
          mainArr: [
            {
              _id: 'H_NXaMPKG',
              type: 'image',
              caption: 'ライオン',
              srcSetArr: [
                {
                  _id: 'himsYqtCL',
                  src: '/static/img/card/players/zaoOWw89g/main/H_NXaMPKG/320w.jpg',
                  w: '320w',
                  width: 320,
                  height: 180,
                },
                {
                  _id: 'Cfjt2j3Y_',
                  src: '/static/img/card/players/zaoOWw89g/main/H_NXaMPKG/480w.jpg',
                  w: '480w',
                  width: 480,
                  height: 270,
                },
                {
                  _id: 'EjUz0NL8z',
                  src: '/static/img/card/players/zaoOWw89g/main/H_NXaMPKG/640w.jpg',
                  w: '640w',
                  width: 640,
                  height: 360,
                },
                {
                  _id: 'g9u6JQkLh',
                  src: '/static/img/card/players/zaoOWw89g/main/H_NXaMPKG/800w.jpg',
                  w: '800w',
                  width: 800,
                  height: 450,
                },
                {
                  _id: 'TsNkkGwok',
                  src: '/static/img/card/players/zaoOWw89g/main/H_NXaMPKG/source.jpg',
                  w: 'source',
                  width: 1920,
                  height: 1080,
                },
              ],
            },
          ],
        },
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
        idArr: ['GcymNACvc', 'mDuSVm6S7', 'n4I1BDtxH', 'L00bEpD46', '8bJV9G6MU', 'UVOFSNbXR'],
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
        imagesAndVideosObj: {
          thumbnailArr: [],
          mainArr: [],
        },
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
        idArr: [],
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
    
    await ModelCardPlayers.deleteMany({});
    returnObj = await ModelCardPlayers.insertMany({ saveArr });
    
    
    
    
    // --------------------------------------------------
    //   DB / Card Games
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Save Object
    // ---------------------------------------------
    
//     saveArr = [
//       {
//         _id: 'TzjNMDQyl',
//         createdDate: ISO8601,
//         updatedDate: ISO8601,
//         users_id: 'jun-deE4J',
//         gameID: 'Jk92aglWl',
//         language: 'ja',
//         theme: '',
//         nameObj: {
//           value: 'AZ-1979',
//           search: true,
//         },
//         statusObj: {
//           value: 'トラッパー',
//           search: true,
//         },
//         thumbnail: false,
//         imageVideoArr: [
//           {
//             _id: 'ZIEOqRppY',
//             type: 'image',
//             caption: '黄色のお花',
//             srcSetArr: [
//               {
//                 _id: 'xz_HamTMS',
//                 src: '/static/img/card/players/TzjNMDQyl/ZIEOqRppY/320w.jpg',
//                 w: '320w',
//                 width: 320,
//                 height: 213,
//               },
//               {
//                 _id: 'VGaeXottk',
//                 src: '/static/img/card/players/TzjNMDQyl/ZIEOqRppY/480w.jpg',
//                 w: '480w',
//                 width: 480,
//                 height: 320,
//               },
//               {
//                 _id: 'E3kjgGmJ7',
//                 src: '/static/img/card/players/TzjNMDQyl/ZIEOqRppY/640w.jpg',
//                 w: '640w',
//                 width: 640,
//                 height: 427,
//               },
//               {
//                 _id: 'JHgN0IFXD',
//                 src: '/static/img/card/players/TzjNMDQyl/ZIEOqRppY/800w.jpg',
//                 w: '800w',
//                 width: 800,
//                 height: 533,
//               },
//               {
//                 _id: 'XMZ2Ioh2x',
//                 src: '/static/img/card/players/TzjNMDQyl/ZIEOqRppY/source.jpg',
//                 w: 'source',
//                 width: 1920,
//                 height: 1280,
//               },
//             ],
//           },
//         ],
//         itemArr: [],
//         commentObj: {
//           value: `楽しかった時間が終わってしまいました。
//   いいゲームをプレイしたときの独特の余韻を味わえました。
//   今までゼルダの伝説でこんなに余韻が残ることはなかったのですが
//   やり遂げた嬉しさに少しの寂しさが混じったような、ビターな味わいです。
  
//   今作はかなりの高評価を受けていて
//   それは任天堂ファンボーイが騒いでるだけだと思っていたのですが
//   実際やってみるとその評価に違わない面白さでした。
//   オープンワールド童貞だった任天堂なのに
//   このクオリティのものをいきなり作れるのは正直すごいと思いましたね。
//   僕の場合、オープンワールドゲームはやり込みすぎて
//   いつも最後は嫌になってクリアする感じなのですが
//   BotWはラストも楽しめて良かったです（まさか最後にシロと一緒に戦えるなんて！）`,
//           search: true,
//         },
//         hardwarePlayingObj: {
//           valueArr: ['TdK3Oc-yV'],
//           search: true,
//         },
//         idArr: ['GcymNACvc', 'mDuSVm6S7', 'n4I1BDtxH', 'L00bEpD46', '8bJV9G6MU', 'UVOFSNbXR'],
//         activityTimeObj: {
//           valueArr: [
//             {
//               _id: '0X3yH-BnG',
//               beginTime: '19:00',
//               endTime: '24:00',
//               weekArr: [0, 1, 2, 3, 4]
//             },
//             {
//               _id: '7Euewb_Ik',
//               beginTime: '21:00',
//               endTime: '03:00',
//               weekArr: [5, 6]
//             }
//           ],
//           search: true,
//         },
//         lookingForFriendsObj: {
//           icon: 'emoji_u1f61c',
//           comment: '学生の方よろしく！',
//           search: true,
//         },
//         voiceChatObj: {
//           comment: '朝9時まで',
//           search: true,
//         },
//         linkArr: [
//           {
//             _id: 'K2NRYVCox',
//             type: 'Twitter',
//             label: '',
//             url: 'https://twitter.com/Azumi1979',
//             search: true,
//           },
//           {
//             _id: '0syPuDv6O',
//             type: 'Facebook',
//             label: '',
//             url: 'https://www.youtube.com/',
//             search: true,
//           },
//           {
//             _id: 'spRqODqbz',
//             type: 'Other',
//             label: 'Game開発サイト',
//             url: 'http://dev-1.gameusers.org:8080/',
//             search: true,
//           },
//         ],
//         quotationObj: {
//           cardPlayers_id: 'zaoOWw89g',
//           activityTime: true,
//           lookingForFriends: true,
//           voiceChat: true,
//           link: true,
//         },
//       },
      
      
//       {
//         _id: '3sZUV34Q_',
//         createdDate: ISO8601,
//         updatedDate: ISO8601,
//         users_id: 'P7UJMuUnx',
//         gameID: 'lxdubg6IY',
//         language: 'ja',
//         theme: '',
//         nameObj: {
//           value: 'パックンフラワー',
//           search: true,
//         },
//         statusObj: {
//           value: '人喰い植物',
//           search: true,
//         },
//         thumbnail: false,
//         imageVideoArr: [
//           {
//             _id: 'BrhMB9ieu',
//             type: 'image',
//             caption: 'Tree',
//             srcSetArr: [
//               {
//                 _id: 'BolWOUmkF',
//                 src: '/static/img/card/players/3sZUV34Q_/BrhMB9ieu/320w.jpg',
//                 w: '320w',
//                 width: 320,
//                 height: 213,
//               },
//               {
//                 _id: 'gsRUhcWl3',
//                 src: '/static/img/card/players/3sZUV34Q_/BrhMB9ieu/480w.jpg',
//                 w: '480w',
//                 width: 480,
//                 height: 320,
//               },
//               {
//                 _id: '54sVdlP49',
//                 src: '/static/img/card/players/3sZUV34Q_/BrhMB9ieu/640w.jpg',
//                 w: '640w',
//                 width: 640,
//                 height: 427,
//               },
//               {
//                 _id: 'kyUo0yIl2',
//                 src: '/static/img/card/players/3sZUV34Q_/BrhMB9ieu/800w.jpg',
//                 w: '800w',
//                 width: 800,
//                 height: 533,
//               },
//               {
//                 _id: 'Tnp5c8Yh0',
//                 src: '/static/img/card/players/3sZUV34Q_/BrhMB9ieu/source.jpg',
//                 w: 'source',
//                 width: 1920,
//                 height: 1280,
//               },
//             ],
//           },
//         ],
//         itemArr: [],
//         commentObj: {
//           value: `ドラゴンクエストビルダーズ2 #2～5

// 序盤のモンゾーラ島でめちゃくちゃ気合を入れて
// 街を作ってしまいました。
// このペースだとクリアまで相当時間がかかるかもしれませんね。

// あと進行不能バグがめっちゃ怖いです。
// バグ満載で購入者にデバッグさせる姿勢は悪どすぎますね。
// ゲームは面白いだけにもうちょっと真面目に取り組んでもらいたいです。

// からっぽ島に戻ってきて開拓を始める話になりましたが
// 広大で整地もされていない土地をどう開拓していくのか
// まったくビジョンが見えないので、ちゃんとやっていけるか心配です。
// はたして最初の街のように綺麗な場所にできるんでしょうか？`,
//           search: true,
//         },
//         hardwarePlayingObj: {
//           valueArr: ['TdK3Oc-yV'],
//           search: true,
//         },
//         idArr: [],
//         activityTimeObj: {
//           valueArr: [
//             {
//               _id: 'dZCJsb6f-',
//               beginTime: '19:00',
//               endTime: '24:00',
//               weekArr: [0, 1, 2, 3, 4]
//             },
//             {
//               _id: '2eD3Ovfqr',
//               beginTime: '21:00',
//               endTime: '03:00',
//               weekArr: [5, 6]
//             }
//           ],
//           search: true,
//         },
//         lookingForFriendsObj: {
//           icon: 'emoji_u1f61e',
//           comment: '',
//           search: true,
//         },
//         voiceChatObj: {
//           comment: '',
//           search: true,
//         },
//         linkArr: [
//           {
//             _id: 'c8gHFXEij',
//             type: 'Twitter',
//             label: '',
//             url: 'https://twitter.com/Azumi1979',
//             search: true,
//           },
//           {
//             _id: '6tHU4FvfC',
//             type: 'Facebook',
//             label: '',
//             url: 'https://www.youtube.com/',
//             search: true,
//           },
//           {
//             _id: 'CTyK8Om31',
//             type: 'Other',
//             label: 'Game開発サイト',
//             url: 'http://dev-1.gameusers.org:8080/',
//             search: true,
//           },
//         ],
//         quotationObj: {
//           cardPlayers_id: 'WAMuArrBZ',
//           activityTime: false,
//           lookingForFriends: false,
//           voiceChat: false,
//           link: false,
//         },
//       },
      
      
//     ];

    saveArr = [];
    
    
    // --------------------------------------------------
    //   Upsert
    // --------------------------------------------------
    
    await ModelCardGames.deleteMany({});
    returnObj = await ModelCardGames.insertMany({ saveArr });
    
    
    
    
    // --------------------------------------------------
    //   DB / Test
    // --------------------------------------------------
    
    // returnObj = await ModelCardGames.find({
    //   countryArr: ['JP', 'US'],
    //   languageArr: ['ja'],
    //   usersLogin_id: 'P7UJMuUnx'
    // });
    
    // const cardGamesObj = await ModelCardGames.find({
    //   users_id: 'jun-deE4J',
    //   language: localeObj.language,
    //   country: localeObj.country,
    //   usersLogin_id: 'P7UJMuUnx'
    // });
    
    // const cardPlayersObj = await ModelCardPlayers.find({
    //   users_id: 'jun-deE4J',
    //   language: localeObj.language,
    //   country: localeObj.country,
    //   usersLogin_id: 'P7UJMuUnx'
    // });
    
    
    
    
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