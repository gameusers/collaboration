// --------------------------------------------------
//   File ID: Mv7RFeKQ1
// --------------------------------------------------

// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
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
    const date = moment().utcOffset(0);
    
    
    
    
    // --------------------------------------------------
    //   DB / Users
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Save Object
    // ---------------------------------------------
    
    saveArr = [
      {
        _id: 'jun-deE4J',
        createdDate: date,
        updatedDate: date,
        accessDate: date,
        level: 99,
        playerID: 'user1',
        loginID: '8OM0dhDak',
        loginPassword: '$2b$10$NsuOPWswqCkJ2STKfbKg/OMXfxdWabz1oy36HKOwRojHJ4S8FPsPS',
        email: '',
        country: 'JP',
        followArr: [],
        followCount: 0,
        followedArr: ['P7UJMuUnx'],
        followedCount: 1,
        role: 'User'
      },
      
      
      {
        _id: 'P7UJMuUnx',
        createdDate: date,
        updatedDate: date,
        accessDate: date,
        level: 1,
        playerID: 'user2',
        loginID: 'enPLLYBBEg3y',
        loginPassword: '$2b$10$.O/ZmfEO2QOV6IRxxmQO1eSRMx8yhL83ISq9z/gyOpTCtbYL3j4B.',
        email: '',
        country: 'JP',
        followArr: ['jun-deE4J'],
        followCount: 1,
        followedArr: [],
        followedCount: 0,
        role: 'User'
      },
      
      
      {
        _id: '6GWOpEcD3',
        createdDate: date,
        updatedDate: date,
        accessDate: date,
        level: 1,
        playerID: 'user3',
        loginID: 'nzPR7R9GO',
        loginPassword: '$2b$10$.qPAsMTPieChFehxF7TC2OXYWZdek0FKuJPABVxtBPo1UzrpOwZ6.',
        email: '',
        country: 'JP',
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
        createdDate: date,
        updatedDate: date,
        gameID: 'Jk92aglWl',
        urlID: 'Dead-by-Daylight',
        language: 'ja',
        country: 'JP',
        thumbnail: true,
        imageVideoArr: [],
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
            _id: 'pIcOj6-43',
            hardwareID: 'TdK3Oc-yV',
            releaseData: '2016-06-14T00:00:00.000Z',
            playersMin: 1,
            playersMax: 5,
            publisherID: '',
            developerID: '',
          }
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
            url: 'http://35.203.143.160:8080/',
          },
        ],
      },
      
      
      {  
        _id: 'dhjc8SPwK',
        createdDate: date,
        updatedDate: date,
        gameID: 'Jk92aglWl',
        urlID: 'Dead-by-Daylight',
        language: 'en',
        country: 'US',
        thumbnail: false,
        imageVideoArr: [],
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
            releaseData: '2016-06-14T00:00:00.000Z',
            playersMin: 1,
            playersMax: 5,
            publisherID: '',
            developerID: '',
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
        createdDate: date,
        updatedDate: date,
        gameID: 'lxdubg6IY',
        urlID: 'Super-Smash-Bros-SPECIAL',
        language: 'ja',
        country: 'JP',
        thumbnail: false,
        imageVideoArr: [],
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
            releaseData: '2018-12-07T00:00:00.000Z',
            playersMin: 1,
            playersMax: 8,
            publisherID: '',
            developerID: '',
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
        createdDate: date,
        updatedDate: date,
        gameID: 'lxdubg6IY',
        urlID: 'Super-Smash-Bros-Ultimate',
        language: 'en',
        country: 'US',
        thumbnail: false,
        imageVideoArr: [],
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
            releaseData: '2018-12-07T00:00:00.000Z',
            playersMin: 1,
            playersMax: 8,
            publisherID: '',
            developerID: '',
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
        createdDate: date,
        updatedDate: date,
        gameID: 'YcIvt9hf7',
        urlID: 'Dragon-Quest-Builders2',
        language: 'ja',
        country: 'JP',
        thumbnail: true,
        imageVideoArr: [],
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
            releaseData: '2018-12-20T00:00:00.000Z',
            playersMin: 1,
            playersMax: 4,
            publisherID: '',
            developerID: '',
          }
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
        createdDate: date,
        updatedDate: date,
        language: 'en',
        country: 'US',
        genreID: 'YC3gSkK67',
        name: 'Action'
      },
      {
        _id: 'iWeBuc0j2',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        genreID: 'YC3gSkK67',
        name: 'アクション'
      },
      
      
      {
        _id: 'ksTu6wRs0l',
        createdDate: date,
        updatedDate: date,
        language: 'en',
        country: 'US',
        genreID: 'jpPfXudBt',
        name: 'Shooter'
      },
      {
        _id: 'ohPaZnDHr',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        genreID: 'jpPfXudBt',
        name: 'シューティング'
      },
      
      
      {
        _id: 'ouLGbf_KSd',
        createdDate: date,
        updatedDate: date,
        language: 'en',
        country: 'US',
        genreID: 'aiB1RZ0f8',
        name: 'Adventure'
      },
      {
        _id: 'XErEwHoNy',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        genreID: 'aiB1RZ0f8',
        name: 'アドベンチャー'
      },
      
      
      {
        _id: '9iRS29w3we',
        createdDate: date,
        updatedDate: date,
        language: 'en',
        country: 'US',
        genreID: 'sU94RUPS7',
        name: 'RPG'
      },
      {
        _id: 'acQTo-M0r',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        genreID: 'sU94RUPS7',
        name: 'RPG'
      },
      
      
      {
        _id: '0Uaz_dOxXq',
        createdDate: date,
        updatedDate: date,
        language: 'en',
        country: 'US',
        genreID: 'lDdVW5ANX',
        name: 'Simulation'
      },
      {
        _id: 'AmPQz8iqR',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        genreID: 'lDdVW5ANX',
        name: 'シミュレーター'
      },
      
      
      {
        _id: 'RpptnE2zlp',
        createdDate: date,
        updatedDate: date,
        language: 'en',
        country: 'US',
        genreID: '-HKDHuR2v',
        name: 'Strategy'
      },
      {
        _id: 'nwCUpgBxm',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        genreID: '-HKDHuR2v',
        name: 'シミュレーション（ストラテジー）'
      },
      
      
      {
        _id: 'b_QI2RFSEQ6',
        createdDate: date,
        updatedDate: date,
        language: 'en',
        country: 'US',
        genreID: 'NCt2Bb7WF',
        name: 'Sports'
      },
      {
        _id: 'nbGG_uNfA',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        genreID: 'NCt2Bb7WF',
        name: 'スポーツ'
      },
      
      
      {
        _id: 'mlfWkx-ZxJL',
        createdDate: date,
        updatedDate: date,
        language: 'en',
        country: 'US',
        genreID: 'CoIMeJDxB',
        name: 'Racing'
      },
      {
        _id: 'kQ_135dZL',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        genreID: 'CoIMeJDxB',
        name: 'レース'
      },
      
      
      {
        _id: 'deBQJJV-m8s',
        createdDate: date,
        updatedDate: date,
        language: 'en',
        country: 'US',
        genreID: 'n2k7J_e12',
        name: 'Fighting'
      },
      {
        _id: 'kG0O00psM',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        genreID: 'n2k7J_e12',
        name: '格闘ゲーム'
      },
      
      
      {
        _id: 'uEUpcTb87D_',
        createdDate: date,
        updatedDate: date,
        language: 'en',
        country: 'US',
        genreID: 'SV1mg4iuD',
        name: 'Puzzle'
      },
      {
        _id: 'qrIbvFXm2',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        genreID: 'SV1mg4iuD',
        name: 'パズル'
      },
      
      
      {
        _id: 'ejdGhTwE1Gb',
        createdDate: date,
        updatedDate: date,
        language: 'en',
        country: 'US',
        genreID: '691Od0Wty',
        name: 'Board game / Card game'
      },
      {
        _id: 'lkNbIGAUE',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        genreID: '691Od0Wty',
        name: 'ボードゲーム / カードゲーム'
      },
      
      
      {
        _id: 'cU9z-CA3d29',
        createdDate: date,
        updatedDate: date,
        language: 'en',
        country: 'US',
        genreID: 'rsx6C2bsy',
        name: 'Music game'
      },
      {
        _id: '7Asj0C1FV',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        genreID: 'rsx6C2bsy',
        name: '音ゲー'
      },
      
      
      {
        _id: 'bfxzmy3eib9',
        createdDate: date,
        updatedDate: date,
        language: 'en',
        country: 'US',
        genreID: 'HBpRRumc3',
        name: 'Other'
      },
      {
        _id: 'Nm8Nyp82f',
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        _id: '8RERfeQQ9',
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
    //   DB / ID
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Save Object
    // ---------------------------------------------
    
    saveArr = [
      {
        _id: 'GcymNACvc',
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
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
        createdDate: date,
        updatedDate: date,
        users_id: 'P7UJMuUnx',
        gameID: '',
        platform: 'PlayStation',
        label: '',
        id: 'User2-PlayStation-ID',
        publicSetting: 1,
        search: true,
      }
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
        createdDate: date,
        updatedDate: date,
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
        thumbnail: true,
        imageVideoArr: [
          {
            _id: 'H_NXaMPKG',
            type: 'image',
            caption: 'ライオン',
            fileFormat: 'JPEG',
            srcSetArr: [
              {
                _id: 'himsYqtCL',
                w: '320w',
                width: 320,
                height: 180,
              },
              {
                _id: 'Cfjt2j3Y_',
                w: '480w',
                width: 480,
                height: 270,
              },
              {
                _id: 'EjUz0NL8z',
                w: '640w',
                width: 640,
                height: 360,
              },
              {
                _id: 'g9u6JQkLh',
                w: '800w',
                width: 800,
                height: 450,
              },
              {
                _id: 'TsNkkGwok',
                w: 'source',
                width: 1920,
                height: 1080,
              },
            ],
          },
        ],
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
            url: 'https://twitter.com/Azumi1979',
            search: true,
          },
          {
            _id: 'VMp_Vlk_V',
            type: 'Facebook',
            label: '',
            url: 'https://www.youtube.com/',
            search: true,
          },
          {
            _id: 'IqNtEQQsO',
            type: 'Instagram',
            label: '',
            url: 'https://www.youtube.com/',
            search: true,
          },
          {
            _id: 'yBC3AHqrP',
            type: 'YouTube',
            label: '',
            url: 'https://gaming.youtube.com/channel/UCGmS-B707Sqa19BXRn02JIw/live',
            search: true,
          },
          {
            _id: 'YD8DHCvb_',
            type: 'Twitch',
            label: '',
            url: 'https://gaming.youtube.com/channel/UCGmS-B707Sqa19BXRn02JIw/live',
            search: true,
          },
          {
            _id: '8u2ht4NLv',
            type: 'Steam',
            label: '',
            url: 'https://steamcommunity.com/profiles/76561198031526480/',
            search: true,
          },
          {
            _id: 'lqNaKEL49',
            type: 'Pixiv',
            label: '',
            url: 'https://www.youtube.com/',
            search: true,
          },
          {
            _id: 'zcPp3XyEw',
            type: 'Other',
            label: '開発サイト',
            url: 'http://35.203.143.160:8080/',
            search: true,
          },
        ]
      },
      
      
      {
        _id: 'WAMuArrBZ',
        createdDate: date,
        updatedDate: date,
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
        thumbnail: false,
        imageVideoArr: [],
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
    
    saveArr = [
      {
         _id: 'TzjNMDQyl',
        createdDate: date,
        updatedDate: date,
        users_id: 'jun-deE4J',
        gameID: 'Jk92aglWl',
        language: 'ja',
        theme: '',
        nameObj: {
          value: 'AZ-1979',
          search: true,
        },
        statusObj: {
          value: 'トラッパー',
          search: true,
        },
        thumbnail: false,
        imageVideoArr: [
          {
            _id: 'ZIEOqRppY',
            type: 'image',
            caption: '黄色のお花',
            fileFormat: 'JPEG',
            srcSetArr: [
              {
                _id: 'xz_HamTMS',
                w: '320w',
                width: 320,
                height: 213,
              },
              {
                _id: 'VGaeXottk',
                w: '480w',
                width: 480,
                height: 320,
              },
              {
                _id: 'E3kjgGmJ7',
                w: '640w',
                width: 640,
                height: 427,
              },
              {
                _id: 'JHgN0IFXD',
                w: '800w',
                width: 800,
                height: 533,
              },
              {
                _id: 'XMZ2Ioh2x',
                w: 'source',
                width: 1920,
                height: 1280,
              },
            ],
          },
        ],
        itemArr: [],
        commentObj: {
          value: `楽しかった時間が終わってしまいました。
  いいゲームをプレイしたときの独特の余韻を味わえました。
  今までゼルダの伝説でこんなに余韻が残ることはなかったのですが
  やり遂げた嬉しさに少しの寂しさが混じったような、ビターな味わいです。
  
  今作はかなりの高評価を受けていて
  それは任天堂ファンボーイが騒いでるだけだと思っていたのですが
  実際やってみるとその評価に違わない面白さでした。
  オープンワールド童貞だった任天堂なのに
  このクオリティのものをいきなり作れるのは正直すごいと思いましたね。
  僕の場合、オープンワールドゲームはやり込みすぎて
  いつも最後は嫌になってクリアする感じなのですが
  BotWはラストも楽しめて良かったです（まさか最後にシロと一緒に戦えるなんて！）`,
          search: true,
        },
        hardwarePlayingObj: {
          valueArr: ['TdK3Oc-yV'],
          search: true,
        },
        idArr: ['GcymNACvc', 'mDuSVm6S7', 'n4I1BDtxH', 'L00bEpD46', '8bJV9G6MU', 'UVOFSNbXR'],
        activityTimeObj: {
          valueArr: [
            {
              _id: '0X3yH-BnG',
              beginTime: '19:00',
              endTime: '24:00',
              weekArr: [0, 1, 2, 3, 4]
            },
            {
              _id: '7Euewb_Ik',
              beginTime: '21:00',
              endTime: '03:00',
              weekArr: [5, 6]
            }
          ],
          search: true,
        },
        lookingForFriendsObj: {
          icon: 'emoji_u1f61c',
          comment: '学生の方よろしく！',
          search: true,
        },
        voiceChatObj: {
          comment: '朝9時まで',
          search: true,
        },
        linkArr: [
          {
            _id: 'K2NRYVCox',
            type: 'Twitter',
            label: '',
            url: 'https://twitter.com/Azumi1979',
            search: true,
          },
          {
            _id: '0syPuDv6O',
            type: 'Facebook',
            label: '',
            url: 'https://www.youtube.com/',
            search: true,
          },
          {
            _id: 'spRqODqbz',
            type: 'Other',
            label: 'Game開発サイト',
            url: 'http://35.203.143.160:8080/',
            search: true,
          },
        ],
        quotationObj: {
          cardPlayers_id: 'zaoOWw89g',
          activityTime: true,
          lookingForFriends: true,
          voiceChat: true,
          link: true,
        },
      },
      
      
      {
         _id: '3sZUV34Q_',
        createdDate: date,
        updatedDate: date,
        users_id: 'P7UJMuUnx',
        gameID: 'lxdubg6IY',
        language: 'ja',
        theme: '',
        nameObj: {
          value: 'パックンフラワー',
          search: true,
        },
        statusObj: {
          value: '人喰い植物',
          search: true,
        },
        thumbnail: false,
        imageVideoArr: [
          {
            _id: 'BrhMB9ieu',
            type: 'image',
            caption: 'Tree',
            fileFormat: 'JPEG',
            srcSetArr: [
              {
                _id: 'BolWOUmkF',
                w: '320w',
                width: 320,
                height: 213,
              },
              {
                _id: 'gsRUhcWl3',
                w: '480w',
                width: 480,
                height: 320,
              },
              {
                _id: '54sVdlP49',
                w: '640w',
                width: 640,
                height: 427,
              },
              {
                _id: 'kyUo0yIl2',
                w: '800w',
                width: 800,
                height: 533,
              },
              {
                _id: 'Tnp5c8Yh0',
                w: 'source',
                width: 1920,
                height: 1280,
              },
            ],
          },
        ],
        itemArr: [],
        commentObj: {
          value: `ドラゴンクエストビルダーズ2 #2～5

序盤のモンゾーラ島でめちゃくちゃ気合を入れて
街を作ってしまいました。
このペースだとクリアまで相当時間がかかるかもしれませんね。

あと進行不能バグがめっちゃ怖いです。
バグ満載で購入者にデバッグさせる姿勢は悪どすぎますね。
ゲームは面白いだけにもうちょっと真面目に取り組んでもらいたいです。

からっぽ島に戻ってきて開拓を始める話になりましたが
広大で整地もされていない土地をどう開拓していくのか
まったくビジョンが見えないので、ちゃんとやっていけるか心配です。
はたして最初の街のように綺麗な場所にできるんでしょうか？`,
          search: true,
        },
        hardwarePlayingObj: {
          valueArr: ['TdK3Oc-yV'],
          search: true,
        },
        idArr: [],
        activityTimeObj: {
          valueArr: [
            {
              _id: 'dZCJsb6f-',
              beginTime: '19:00',
              endTime: '24:00',
              weekArr: [0, 1, 2, 3, 4]
            },
            {
              _id: '2eD3Ovfqr',
              beginTime: '21:00',
              endTime: '03:00',
              weekArr: [5, 6]
            }
          ],
          search: true,
        },
        lookingForFriendsObj: {
          icon: 'emoji_u1f61e',
          comment: '',
          search: true,
        },
        voiceChatObj: {
          comment: '',
          search: true,
        },
        linkArr: [
          {
            _id: 'c8gHFXEij',
            type: 'Twitter',
            label: '',
            url: 'https://twitter.com/Azumi1979',
            search: true,
          },
          {
            _id: '6tHU4FvfC',
            type: 'Facebook',
            label: '',
            url: 'https://www.youtube.com/',
            search: true,
          },
          {
            _id: 'CTyK8Om31',
            type: 'Other',
            label: 'Game開発サイト',
            url: 'http://35.203.143.160:8080/',
            search: true,
          },
        ],
        quotationObj: {
          cardPlayers_id: 'WAMuArrBZ',
          activityTime: false,
          lookingForFriends: false,
          voiceChat: false,
          link: false,
        },
      },
      
      
    ];
    
    
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