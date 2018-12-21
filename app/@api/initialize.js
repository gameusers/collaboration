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
//   Initial Props / Function ID: gUwZx1hDG
// --------------------------------------------------

router.post('/db', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  let returnObj = {};
  let statusCode = 400;
  
  let errorArgumentsObj = {
    fileId: 'Mv7RFeKQ1',
    functionId: 'gUwZx1hDG',
    errorCodeArr: [500000],
    errorObj: {},
  };
  
  
  try {
    
    
    // --------------------------------------------------
    //   Development Check
    // --------------------------------------------------
    
    if (process.env.NODE_ENV !== 'development') {
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   Locale
    // --------------------------------------------------
    
    // const localeObj = locale({
    //   acceptLanguage: req.headers['accept-language']
    // });
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const date = moment().utcOffset(0);
    let conditionObj = {};
    let saveObj = {};
    let saveArr = [];
    
    
    
    
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
    //   Condition Object
    // ---------------------------------------------
    
    conditionObj = { _id: 'w_zkqpr3R' || shortid.generate() };
    
    
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
        similarityArr: [
          'DbD'
        ],
        forSort: 'デッドバイデイライト',
        twitterHashtag: 'DeadbyDaylight',
        genreArr: ['YC3gSkK67'],
        genreSubArr: [],
        genreTagArr: [],
        hardwareArr: [
          {
            _id: 'pIcOj6-43',
            hardware_id: '60TVB7_if',
            releaseData: '2016-06-14T00:00:00.000Z',
            players: 5,
            publisher_id: 'fa_jpSg5L',
            developer_id: '_sCyO1JV1',
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
        similarityArr: [
          'DbD'
        ],
        forSort: 'Dead by Daylight',
        twitterHashtag: 'DeadbyDaylight',
        genreArr: ['YC3gSkK67'],
        genreSubArr: [],
        genreTagArr: [],
        hardwareArr: [
          {
            _id: '7kDhzjxI9',
            hardware_id: '60TVB7_if',
            releaseData: '2016-06-14T00:00:00.000Z',
            players: 5,
            publisher_id: 'fa_jpSg5L',
            developer_id: '_sCyO1JV1',
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
        similarityArr: [
          'スマブラSP'
        ],
        forSort: 'ダイラントウスマッシュブラザーズスペシャル',
        twitterHashtag: 'スマブラSP',
        genreArr: ['n2k7J_e12'],
        genreSubArr: [],
        genreTagArr: [],
        hardwareArr: [
          {
            _id: '4q7tQG2I8',
            hardware_id: '60TVB7_if',
            releaseData: '2018-12-07T00:00:00.000Z',
            players: 8,
            publisher_id: 'fa_jpSg5L',
            developer_id: '_sCyO1JV1',
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
        similarityArr: [
          ''
        ],
        forSort: 'Super Smash Bros. Ultimate',
        twitterHashtag: '',
        genreArr: ['n2k7J_e12'],
        genreSubArr: [],
        genreTagArr: [],
        hardwareArr: [
          {
            _id: '4q7tQG2I8',
            hardware_id: '60TVB7_if',
            releaseData: '2018-12-07T00:00:00.000Z',
            players: 8,
            publisher_id: 'fa_jpSg5L',
            developer_id: '_sCyO1JV1',
          }
        ],
        linkArr: [
          {
            _id: 'VZ2G-g2a4',
            type: 'Official',
            label: '',
            url: 'https://www.smashbros.com/en_US/',
          },
          {
            _id: 'l0oy9ei0f',
            type: 'Twitter',
            label: '',
            url: 'https://twitter.com/NintendoVS',
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
        name: 'Nintendo Entertainment System'
      },
      {
        _id: 'R6uD6BzZ5',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: 'I-iu-WmkO',
        name: 'ファミリーコンピュータ'
      },
      
      
      {
        _id: 'adzG1JLYu',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: 'KyOSlwcLk',
        name: 'PCエンジン'
      },
      
      
      {
        _id: 'KVvkuvZF2',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: '2yKF4qXAw',
        name: 'メガドライブ'
      },
      
      
      {
        _id: 'WOQKUSPPR',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: 'eKmDxi8lX',
        name: 'スーパーファミコン'
      },
      
      
      {
        _id: '8oGNQ2hMR',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: 'Z4R-SPN2-',
        name: 'ネオジオ'
      },
      
      
      {
        _id: '9zeb0m_13',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: 'lBSGQeGmx',
        name: 'セガサターン'
      },
      
      
      {
        _id: 'zSvRzOp0V',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: 'zB4ivcsqM',
        name: 'PlayStation'
      },
      
      
      {
        _id: 'wlDy9Dqmv',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: 'o9bdsq5af',
        name: 'バーチャルボーイ'
      },
      
      
      {
        _id: 'N-V_maXNc',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: '45syCFviA',
        name: 'NINTENDO64'
      },
      
      
      {
        _id: 'iZ7MmkuQw',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: 'Kj_Djheqt',
        name: 'ドリームキャスト'
      },
      
      
      {
        _id: 'I2cKTLJNk',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: '8RERfeQQ9',
        name: 'PlayStation 2'
      },
      
      
      {
        _id: '8RERfeQQ9',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: 'XLUt628gr',
        name: 'ニンテンドーゲームキューブ'
      },
      
      
      {
        _id: 'XLUt628gr',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: '78lc0hPjL',
        name: 'Xbox'
      },
      
      
      {
        _id: 'NiozcDYe-',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: '08Qp5KxPA',
        name: 'Xbox 360'
      },
      
      
      {
        _id: '4iGMasHh4',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: 'YNZ6nb1Ki',
        name: 'PlayStation 3'
      },
      
      
      {
        _id: '91N2yPx6B',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: 'n3wYKZ_ao',
        name: 'Wii'
      },
      
      
      {
        _id: 'qX8WLLubQ',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: 'GTxWVd0z-',
        name: 'Wii U'
      },
      
      
      {
        _id: 'FW76LaH_H',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: 'TdK3Oc-yV',
        name: 'PlayStation 4'
      },
      
      
      {
        _id: 'vk2kF94Ks',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: 'uPqoiXA_8',
        name: 'Xbox One'
      },
      
      
      {
        _id: 'Gu1hYjbv7',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: 'Zd_Ia4Hwm',
        name: 'Nintendo Switch'
      },
      
      
      {
        _id: '_z4DBLYNi',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: 'XBKalRRW7',
        name: 'ゲームボーイ'
      },
      
      
      {
        _id: '9Z6Wh_JJ2',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: 'sO2U2PzHl',
        name: 'ゲームギア'
      },
      
      
      {
        _id: 'QQtnx7FEN',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: 'qBsY8y0nO',
        name: 'PCエンジンGT'
      },
      
      
      {
        _id: 'IcH7HG2f7',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: 'u3SQqtJ-u',
        name: 'ネオジオポケット'
      },
      
      
      {
        _id: 'S2Q_3MrBo',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: 'PYIE0rv_e',
        name: 'ワンダースワン'
      },
      
      
      {
        _id: '4OkTt-VSM',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: 'AIvzEgDCd',
        name: 'ゲームボーイアドバンス'
      },
      
      
      {
        _id: 'Uem6UalMW',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: 'HATpnt7sl',
        name: 'ニンテンドーDS'
      },
      
      
      {
        _id: 'nMhdlLGm6',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: 'efIOgWs3N',
        name: 'PlayStation Portable'
      },
      
      
      {
        _id: 'YvgkE6inK',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: 'qk9DiUwN-',
        name: 'ニンテンドー3DS'
      },
      
      
      {
        _id: '_3asC9ODV',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: 'mOpBZsQBm',
        name: 'PlayStation Vita'
      },
      
      
      {
        _id: 'pr6k8Jn6_',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: 'P0UG-LHOQ',
        name: 'PC'
      },
      
      
      {
        _id: 'KN9AMVKP7',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: 'SXybALV1f',
        name: 'Android'
      },
      
      
      {
        _id: 'M7YVRglvr',
        createdDate: date,
        updatedDate: date,
        language: 'ja',
        country: 'JP',
        hardwareID: 'o-f3Zxd49',
        name: 'iOS'
      },
      
    ];
    
    
    // --------------------------------------------------
    //   insertMany
    // --------------------------------------------------
    
    await ModelHardwares.deleteMany({});
    returnObj = await ModelHardwares.insertMany({ saveArr });
    
    
    
    
    // --------------------------------------------------
    //   DB / Card Players
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Condition Object
    // ---------------------------------------------
    
    conditionObj = { _id: 'zaoOWw89g' || shortid.generate() };
    
    
    // ---------------------------------------------
    //   Save Object
    // ---------------------------------------------
    
    saveObj = {
      createdDate: date,
      updatedDate: date,
      users_id: 'jun-deE4J',
      language: 'ja',
      name: 'あづみ',
      status: 'ビルダー',
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
      comment: `Next.js を試してみたところ、とても優秀だったので採用することに決めました。サーバーサイドレンダリングの機能や、Code Splitting をデフォルトで行ってくれるのは非常に便利です。ただすべての機能を提供してくれるわけではないので、結局、自分で Express を利用したサーバー用コードを書かないといけない部分も多くあるのですが。

それと Next.js はデータベースへのアクセスをすべて API で行うことを推奨しているようです。そこそこの規模のサイトになると、そういった構成が増えてくるのかもしれないのですが、自分は小規模なサイトしか作ったことがないので、初めての経験でちょっと不安です。`,
      birthdayObj: {
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
        value: '大阪',
        alternativeText: '',
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
      idArr: [
        {
          _id: 'au1gnYf6b',
          type: 'PlayStation',
          label: '',
          value: 'AZ-1979',
          showType: 1,
          search: true,
          // 1.表示する
          // 2.自分をフォローしているユーザーに表示する
          // 3.自分がフォローしているユーザーに表示する
          // 4.相互フォローで表示する
          // 5.表示しない
        },
        {
          _id: 'OXNtQjxgF',
          type: 'Xbox',// ゲーマータグ
          label: '',
          value: 'AZ-1979-Xbox',
          showType: 1,
          search: true,
        },
        {
          _id: 'VY9aFMoVh',
          type: 'nintendo',// フレンドコード
          label: '',
          value: 'AZ-1979',
          showType: 2,
          search: true,
        },
        {
          _id: 'BNJPgqtoR',
          type: 'Steam',
          label: '',
          value: 'Azumi1979',
          showType: 3,
          search: true,
        },
        {
          _id: 'ndQgliRHK',
          type: 'Other',
          label: 'LoL ID',
          value: 'lol-id',
          showType: 4,
          search: true,
        },
        {
          _id: 'pJxHh8ZaR',
          type: 'Other',
          label: 'MHW ID',
          value: 'mhw-id',
          showType: 5,
          search: true,
        }
      ],
      activityTimeObj: {
        valueArr: [
          {
            _id: 'fkqjMZzff',
            beginTime: '19:00',
            endTime: '24:00',
            weekArr: [0, 1, 2, 3, 4]
          },
          {
            _id: 'J-ReJUaTK',
            beginTime: '9:00',
            endTime: '24:00',
            weekArr: [5, 6]
          }
        ],
        search: true,
      },
      lookingForFriendsObj: {
        icon: 'emoji_u1f61c',
        comment: '社会人の方よろしく！',
        search: true,
      },
      voiceChatObj: {
        comment: '夜21時まで',
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
    };
    
    
    // --------------------------------------------------
    //   Upsert
    // --------------------------------------------------
    
    returnObj = await ModelCardPlayers.upsert({
      conditionObj,
      saveObj
    });
    
    
    
    
    // --------------------------------------------------
    //   DB / Card Games
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Condition Object
    // ---------------------------------------------
    
    conditionObj = { _id: 'TzjNMDQyl' || shortid.generate() };
    
    
    // ---------------------------------------------
    //   Save Object
    // ---------------------------------------------
    
    saveObj = {
      createdDate: date,
      updatedDate: date,
      users_id: 'jun-deE4J',
      gameID: 'Jk92aglWl',
      language: 'ja',
      theme: '',
      name: 'AZ-1979',
      status: 'トラッパー',
      thumbnail: true,
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
      comment: `楽しかった時間が終わってしまいました。
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
      hardwarePlayingObj: {
        valueArr: ['TdK3Oc-yV'],
        search: true,
      },
      idArr: [
        {
          _id: '9_-NXN6rQ',
          quotation_id: '',
          type: 'PlayStation',
          label: '',
          value: 'AZ-1979-Game',
          showType: 1,
          search: true,
        },
        {
          _id: '-9hC-izPG',
          quotation_id: '',
          type: 'Xbox',// ゲーマータグ
          label: '',
          value: 'AZ-1979-Xbox-Game',
          showType: 1,
          search: true,
        },
        {
          _id: 'QbkY_-AjW',
          quotation_id: 'VY9aFMoVh',
          type: 'Other',
          label: '',
          value: '',
          showType: 5,
          search: true,
        },
        {
          _id: 'qMsL_dgHW',
          quotation_id: '',
          type: 'Steam',
          label: '',
          value: 'Azumi1979',
          showType: 1,
          search: true,
        },
        {
          _id: 'quLSl_A90',
          quotation_id: '',
          type: 'Other',
          label: 'LoL ID',
          value: 'lol-id',
          showType: 1,
          search: true,
        },
        {
          _id: '19bLgUTWU',
          quotation_id: '',
          type: 'Other',
          label: 'MHW ID',
          value: 'mhw-id',
          showType: 1,
          search: true,
        }
      ],
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
            endTime: '3:00',
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
    };
    
    
    // --------------------------------------------------
    //   Upsert
    // --------------------------------------------------
    
    returnObj = await ModelCardGames.upsert({
      conditionObj,
      saveObj
    });
    
    
    
    
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
    //   Console 出力
    // --------------------------------------------------
    
    // console.log('db');
    
    // console.log(chalk`
    //   users_id: {green ${users_id}}
    // `);
    
    // console.log(`
    //   req.user: \n${util.inspect(req.user, { colors: true, depth: null })}
    //   req.query: \n${util.inspect(req.query, { colors: true, depth: null })}
    // `);
    
    // console.log(`
    //   ----- localeObj -----\n
    //   ${util.inspect(localeObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- cardPlayersObj -----\n
    //   ${util.inspect(cardPlayersObj, { colors: true, depth: null })}\n
    //   --------------------\n
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