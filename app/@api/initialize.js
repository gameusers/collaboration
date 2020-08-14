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
//   Schema
// ---------------------------------------------

const SchemaUsers = require('../@database/users/model');
const SchemaExperiences = require('../@database/experiences/model');
const SchemaAchievements = require('../@database/achievements/model');
const SchemaTitles = require('../@database/titles/model');
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
const SchemaNotifications = require('../@database/notifications/model');
const SchemaWebPushes = require('../@database/web-pushes/model');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { errorCodeIntoErrorObj } = require('../@modules/error/error-obj');




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
        _id: 'etJp0y_Vt',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        accessDate: ISO8601,
        userID: 'administrator',
        userIDInitial: 'j4l6spaP4hwK53vu7Y14lx1T8jg',
        pagesObj: {
          imagesAndVideos_id: '',
          arr: [],
        },
        loginID: 'sTXPyssv8',
        loginPassword: '$2a$10$4ze0DB.y8MbnodiJ3P.dbOQ23MqkzLNijqdkn64sfldAnicTaNVRO',
        emailObj: {
          value: '',
          confirmation: false,
        },
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
        countriesArr: ['JP'],
        termsOfServiceConfirmedDate: ISO8601,
        // exp: 0,
        // achievementsArr: [],
        webPushes_id: '',
        role: 'administrator'
      },
      
      
      {
        _id: 'jun-deE4J',
        createdDate: '2015-01-01T00:00:00.000Z',
        updatedDate: ISO8601,
        accessDate: ISO8601,
        userID: 'user1',
        userIDInitial: 'SuCUOYBa8lkwVqYbuVTMWLp4PhG',
        pagesObj: {
          imagesAndVideos_id: 'wLZYxmd29v',
          arr: [
            {
              _id: '51WW1NG1r',
              type: 'top',
              title: 'マリオのプロフィール',
              language: 'ja',
            },
            {
              _id: 's_MGYAQea',
              type: 'follow',
              title: 'マリオのフォロー相手',
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
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
        countriesArr: ['JP'],
        termsOfServiceConfirmedDate: ISO8601,
        // exp: 999,
        // achievementsArr: [// 実績用
        //   {
        //     _id: 'pFJEn_2MO',
        //     createdDate: ISO8601,
        //     updatedDate: ISO8601,
        //     achievementID: 'MuK2dKVpn',
        //     count: 1,
        //   }
        // ],
        webPushes_id: 'nOVilxpSk',
        role: 'user'
      },
      
      
      {
        _id: 'P7UJMuUnx',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        accessDate: ISO8601,
        userID: 'user2',
        userIDInitial: '3ae4Mv35IRDFdGOpLabm5_iIqCX',
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
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
        countriesArr: ['JP'],
        termsOfServiceConfirmedDate: ISO8601,
        // exp: 10,
        // achievementsArr: [],
        webPushes_id: '',
        role: 'user'
      },
      
      
      {
        _id: '6GWOpEcD3',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        accessDate: ISO8601,
        userID: 'user3',
        userIDInitial: 'QbpROv3BKon8YBU6Q9VEOACcqwd',
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
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
        countriesArr: ['JP'],
        termsOfServiceConfirmedDate: ISO8601,
        // exp: 0,
        // achievementsArr: [],
        webPushes_id: '',
        role: 'user'
      },
      
    ];
    
    
    // ---------------------------------------------
    //   Upsert
    // ---------------------------------------------
    
    await SchemaUsers.deleteMany({ reset: true });
    returnObj = await SchemaUsers.insertMany({ saveArr });
    
    
    
    
    // --------------------------------------------------
    //   DB / Experiences
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Save Object
    // ---------------------------------------------
    
    saveArr = [
      
      {
        _id: 'G2_wxtDBi',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: 'jun-deE4J',
        exp: 1916,
        historiesArr: [// アカウント開設日、goodボタン、フォーラム書き込み、募集書き込み、ゲーム登録、日記、経験値
          
          {
            _id: 'V5gmtBJC_',
            createdDate: '2020-08-12T04:53:54.804Z',
            updatedDate: '2020-08-12T04:53:54.804Z',
            type: 'account-ancient',
            countDay: 0,
            countMonth: 0,
            countYear: 0,
            countValid: 1,
            countTotal: 1
          },
          {
            _id: 'Hc-iVQxJ8',
            createdDate: '2020-08-12T04:53:54.804Z',
            updatedDate: '2020-08-12T08:59:20.171Z',
            type: 'login-count',
            countDay: 1,
            countMonth: 0,
            countYear: 0,
            countValid: 10,
            countTotal: 10
          },
          {
            _id: 'Xt1Jny7Hb',
            createdDate: '2020-08-12T04:53:54.804Z',
            updatedDate: '2020-08-12T08:59:20.171Z',
            type: 'good-count-click',
            countDay: 5,
            countMonth: 0,
            countYear: 0,
            countValid: 25,
            countTotal: 30
          },
          {
            _id: '-6rOeYCIj',
            createdDate: '2020-08-12T04:53:54.804Z',
            updatedDate: '2020-08-12T08:59:20.171Z',
            type: 'forum-count-post',
            countDay: 0,
            countMonth: 0,
            countYear: 0,
            countValid: 5,
            countTotal: 5
          },
          {
            _id: 'v-UWbg-ye',
            createdDate: '2020-08-12T04:53:54.804Z',
            updatedDate: '2020-08-12T08:59:20.171Z',
            type: 'recruitment-count-post',
            countDay: 0,
            countMonth: 0,
            countYear: 0,
            countValid: 4,
            countTotal: 10
          },
          {
            _id: '84HXxL4z4Z',
            createdDate: '2020-08-12T04:54:09.617Z',
            updatedDate: '2020-08-12T08:59:20.171Z',
            type: 'account-count-day',
            countDay: 0,
            countMonth: 0,
            countYear: 0,
            countValid: 2050,
            countTotal: 2050
          },
          {
            _id: 'FUVULIosfT',
            createdDate: '2020-08-12T04:54:09.617Z',
            updatedDate: '2020-08-12T08:59:20.171Z',
            type: 'follow-count',
            countDay: 0,
            countMonth: 0,
            countYear: 0,
            countValid: 0,
            countTotal: 0
          },
          {
            _id: '-8rOVdTiSy',
            createdDate: '2020-08-12T04:54:09.617Z',
            updatedDate: '2020-08-12T08:59:20.171Z',
            type: 'followed-count',
            countDay: 0,
            countMonth: 0,
            countYear: 0,
            countValid: 1,
            countTotal: 1
          },
          {
            _id: '91jldS6hJG',
            createdDate: '2020-08-12T04:54:09.617Z',
            updatedDate: '2020-08-12T08:59:20.171Z',
            type: 'title-show',
            countDay: 0,
            countMonth: 0,
            countYear: 0,
            countValid: 1,
            countTotal: 1
          },
          {
            _id: 'qlR-o1nZ3Q',
            createdDate: '2020-08-12T04:54:09.617Z',
            updatedDate: '2020-08-12T08:59:20.171Z',
            type: 'card-player-upload-image-main',
            countDay: 0,
            countMonth: 0,
            countYear: 0,
            countValid: 1,
            countTotal: 1
          },
          {
            _id: 'Jjjj11rkl3',
            createdDate: '2020-08-12T04:54:09.617Z',
            updatedDate: '2020-08-12T08:59:20.171Z',
            type: 'card-player-upload-image-thumbnail',
            countDay: 0,
            countMonth: 0,
            countYear: 0,
            countValid: 1,
            countTotal: 1
          },
          {
            _id: '8BriLq5GdJ',
            createdDate: '2020-08-12T04:54:09.617Z',
            updatedDate: '2020-08-12T08:59:20.171Z',
            type: 'user-page-upload-image-main',
            countDay: 0,
            countMonth: 0,
            countYear: 0,
            countValid: 1,
            countTotal: 1
          },
          {
            _id: 'lEh6WpyIY_',
            createdDate: '2020-08-12T04:54:09.617Z',
            updatedDate: '2020-08-12T08:59:20.171Z',
            type: 'web-push-permission',
            countDay: 0,
            countMonth: 0,
            countYear: 0,
            countValid: 1,
            countTotal: 1
          },
          {
            _id: 'BLDzo4IV02',
            createdDate: '2020-08-12T04:54:09.617Z',
            updatedDate: '2020-08-12T08:59:20.171Z',
            type: 'title-count',
            countDay: 0,
            countMonth: 0,
            countYear: 0,
            countValid: 35,
            countTotal: 35
          },
          {
            _id: 'SHflGotqtf',
            createdDate: '2020-08-12T04:54:09.617Z',
            updatedDate: '2020-08-12T08:59:20.171Z',
            type: 'level-count',
            countDay: 0,
            countMonth: 0,
            countYear: 0,
            countValid: 4,
            countTotal: 4
          },
          {
            _id: 'UegggOhlpk',
            createdDate: '2020-08-12T08:59:20.171Z',
            updatedDate: '2020-08-12T08:59:20.171Z',
            type: 'good-count-clicked',
            countDay: 0,
            countMonth: 0,
            countYear: 0,
            countValid: 0,
            countTotal: 0
          },
          // {
          //   _id: 'Kc2TWwfGnc',
          //   createdDate: '2020-08-12T08:59:20.171Z',
          //   updatedDate: '2020-08-12T08:59:20.171Z',
          //   type: 'card-player-edit',
          //   countDay: 0,
          //   countMonth: 0,
          //   countYear: 0,
          //   countValid: 0,
          //   countTotal: 0
          // },
          // {
          //   _id: '4NxenoLm6l',
          //   createdDate: '2020-08-12T08:59:20.171Z',
          //   updatedDate: '2020-08-12T08:59:20.171Z',
          //   type: 'user-page-change-url',
          //   countDay: 0,
          //   countMonth: 0,
          //   countYear: 0,
          //   countValid: 0,
          //   countTotal: 0
          // }
          
        ],
        // acquiredTitles_idsArr: [],
        acquiredTitles_idsArr: [
          'NwzUOqsiC', 'MuK2dKVpn', 'rYAf6jFYK',
          '8z7LyZQ_5', 'W8sbxpWTe', 'QZbmznsqU',
          'LOUgnlj36', 'L_p3lJfig', 'CBZfxt-5L',
          'yHSTXY0Uv', 'DLV53cJSO', 'tegNhho16',
          'xvY5bY9yH', 'GPoSK78Rj', 'OvFFDioQV',
          'MBNo5yFTg', 'yKAZQg45T', 'krhg5hHmV',
          'nFJYEhwWB', 'k4xm8yGJD', '7K8R91Chm',
          '0kh9wSxkK', 'ksytsAh44', '6u1Me1S13',
          '7YCic-Yds', 'RhpW8VDw4', 'bnOJOwQN4',
          '4e2otkg81', 'iPgdAE8rL', 'oU2EDF7vI',
          '0c0jL9cW-', '065apjMq1', 'oZlexPqhS',
          'GjGPfC8e1', 'MYLwdOLD1'
        ],
        selectedTitles_idsArr: ['MuK2dKVpn', 'NwzUOqsiC', '8Fbta4f9O'],
      },
      
    ];
    
    
    // ---------------------------------------------
    //   Upsert
    // ---------------------------------------------
    
    await SchemaExperiences.deleteMany({ reset: true });
    returnObj = await SchemaExperiences.insertMany({ saveArr });
    
    
    
    
    // --------------------------------------------------
    //   DB / Achievements
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Save Object
    // ---------------------------------------------
    
    saveArr = [
      
      
      // ---------------------------------------------
      //   古のアカウント / account-ancient
      // ---------------------------------------------
      
      {
        _id: 'c55H3lZ5Z',
        type: 'account-ancient',
        exp: 1000,
        limitDay: 0,
        limitMonth: 0,
        limitYear: 0,
        conditionsArr: [
          {
            _id: 'nPV9y7brx',
            titles_id: 'MuK2dKVpn',
            count: 1,
            countDay: 0,
          },
        ],
      },
      
      
      // ---------------------------------------------
      //   レベルアップ / level-count
      // ---------------------------------------------
      
      {
        _id: 'ukBe6i7yQ',
        type: 'level-count',
        exp: 0,
        limitDay: 0,
        limitMonth: 0,
        limitYear: 0,
        conditionsArr: [
          {
            _id: '4JqOt5hLa',
            titles_id: '065apjMq1',
            count: 1,
            countDay: 0,
          },
          {
            _id: 'ya1KK2d-B',
            titles_id: 'oZlexPqhS',
            count: 2,
            countDay: 0,
          },
          {
            _id: 'okRG_KnV1',
            titles_id: 'GjGPfC8e1',
            count: 3,
            countDay: 0,
          },
          {
            _id: 'QHNzx7Hfw',
            titles_id: 'MYLwdOLD1',
            count: 4,
            countDay: 0,
          },
          {
            _id: 'Y6HRgbn3c',
            titles_id: 'XdNCO6eIe',
            count: 5,
            countDay: 0,
          },
          {
            _id: 'UsbhgG7A2',
            titles_id: '0lmhBTKPF',
            count: 6,
            countDay: 0,
          },
          {
            _id: 'oLPAB2LwH',
            titles_id: 'VN3reZuRi',
            count: 7,
            countDay: 0,
          },
          {
            _id: 'GpKQHoVFK',
            titles_id: 'NwRla-9WG',
            count: 8,
            countDay: 0,
          },
          {
            _id: 'CF9WNHeSj',
            titles_id: 'C00pgN_Xn',
            count: 9,
            countDay: 0,
          },
          {
            _id: 'jvB0I2QwX',
            titles_id: 'FM8hGmeqv',
            count: 10,
            countDay: 0,
          },
          {
            _id: 'jQiOMsW63',
            titles_id: 'BWqIWFilB',
            count: 11,
            countDay: 0,
          },
          {
            _id: 'LyvZTfB6x',
            titles_id: 'AW2KhpcxM',
            count: 12,
            countDay: 0,
          },
          {
            _id: 'aoPBHhKkp',
            titles_id: 'nxZrZpuiy',
            count: 13,
            countDay: 0,
          },
          {
            _id: 'Xr0EO7JfW',
            titles_id: 'h5b34wdsc',
            count: 14,
            countDay: 0,
          },
          {
            _id: 'sUEQBrkKk',
            titles_id: 'QEd4nWllx',
            count: 15,
            countDay: 0,
          },
          {
            _id: 'QMXGLEkvZ',
            titles_id: 'YC0hOO6mu',
            count: 16,
            countDay: 0,
          },
          {
            _id: 'e3Eb0D9aD',
            titles_id: 'pRR5Qc8oO',
            count: 17,
            countDay: 0,
          },
          {
            _id: '4bGcgFwf8',
            titles_id: '-VG1v7kcD',
            count: 18,
            countDay: 0,
          },
          {
            _id: '7wAs17uKC',
            titles_id: 'kdEKzT2du',
            count: 19,
            countDay: 0,
          },
          {
            _id: 'aQycCCdQT',
            titles_id: 'nowtpqr6_',
            count: 20,
            countDay: 0,
          },
          {
            _id: '9mYe35alD',
            titles_id: 'yAGGRAkFG',
            count: 21,
            countDay: 0,
          },
          {
            _id: 'e9i0pUMro',
            titles_id: 'T8yCXNXn1',
            count: 22,
            countDay: 0,
          },
          {
            _id: 'gwzKVB9fe',
            titles_id: 'jDUBpaZs4',
            count: 23,
            countDay: 0,
          },
          {
            _id: 'QyJE3cOPQ',
            titles_id: '2ZvB6qs8O',
            count: 24,
            countDay: 0,
          },
          {
            _id: 'JVHDDtQKY',
            titles_id: 'gpABkVPwE',
            count: 25,
            countDay: 0,
          },
          {
            _id: 'KOSvAwf9B',
            titles_id: 'RZmgRzPkb',
            count: 26,
            countDay: 0,
          },
          {
            _id: 'zCCnN4Osn',
            titles_id: 'OQbA1CIGZ',
            count: 27,
            countDay: 0,
          },
          {
            _id: '_kt4FCZOq',
            titles_id: '0c00gASC1',
            count: 28,
            countDay: 0,
          },
          {
            _id: 'u13iuefYg',
            titles_id: 'N1uUsUmpP',
            count: 29,
            countDay: 0,
          },
          {
            _id: '8extiWm-i',
            titles_id: '9V_XbaxwZ',
            count: 30,
            countDay: 0,
          },
          {
            _id: 'gB2EZOWAn',
            titles_id: 'TrSEsmN7h',
            count: 31,
            countDay: 0,
          },
          {
            _id: '16IUQIdI8',
            titles_id: 'XkgxqdmPp',
            count: 32,
            countDay: 0,
          },
          {
            _id: 'hDVXu9B9e',
            titles_id: 'xVu0pGDtI',
            count: 33,
            countDay: 0,
          },
          {
            _id: '9PS2aFrqq',
            titles_id: '3hdye-b-T',
            count: 34,
            countDay: 0,
          },
          {
            _id: 'Nme0u9kuJ',
            titles_id: 'gmLjWaOPk',
            count: 35,
            countDay: 0,
          },
          {
            _id: 'uS00EqvT5',
            titles_id: '5WLv0C11_',
            count: 36,
            countDay: 0,
          },
          {
            _id: 'KLF4TXL3L',
            titles_id: '0I1ULpaSC',
            count: 37,
            countDay: 0,
          },
          {
            _id: '7PFtWz19J',
            titles_id: 'jl3skqUCw',
            count: 38,
            countDay: 0,
          },
          {
            _id: 'M0v3_HrXZ',
            titles_id: 'lMahzRskP',
            count: 39,
            countDay: 0,
          },
          {
            _id: 'Y9O7g8eJB',
            titles_id: 'd5wM-NjJ6',
            count: 40,
            countDay: 0,
          },
          {
            _id: 'i7LbZ9jJt',
            titles_id: 'tWuUZX5gC',
            count: 41,
            countDay: 0,
          },
          {
            _id: 'mfjLoHRoZ',
            titles_id: 'quNmsBMAv',
            count: 42,
            countDay: 0,
          },
          {
            _id: 'Blnk80reT',
            titles_id: 'kzPLdbzW8',
            count: 43,
            countDay: 0,
          },
        ],
      },
      
      
      // ---------------------------------------------
      //   アカウント作成後 / account-count-day
      // ---------------------------------------------
      
      {
        _id: 'IYzjRslI-',
        type: 'account-count-day',
        exp: 0,
        limitDay: 0,
        limitMonth: 0,
        limitYear: 0,
        conditionsArr: [
          {
            _id: '46ZQU3vaO',
            titles_id: 'rYAf6jFYK',
            count: 0,
            countDay: 7,
          },
          {
            _id: '0c8ul1Z-G',
            titles_id: '8z7LyZQ_5',
            count: 0,
            countDay: 30,
          },
          {
            _id: 'toLR8M6aH',
            titles_id: 'W8sbxpWTe',
            count: 0,
            countDay: 90,
          },
          {
            _id: '2Z6L97-Py',
            titles_id: 'QZbmznsqU',
            count: 0,
            countDay: 180,
          },
          {
            _id: 'BgtOUenAC',
            titles_id: 'LOUgnlj36',
            count: 0,
            countDay: 365,
          },
          {
            _id: '2WLQKMU7U',
            titles_id: 'L_p3lJfig',
            count: 0,
            countDay: 730,
          },
          {
            _id: 'NIrxrmdYo',
            titles_id: 'CBZfxt-5L',
            count: 0,
            countDay: 1095,
          },
          {
            _id: 'yHSTXY0Uv',
            titles_id: 'yHSTXY0Uv',
            count: 0,
            countDay: 1460,
          },
          {
            _id: 'ZbjFIaB-F',
            titles_id: 'DLV53cJSO',
            count: 0,
            countDay: 1825,
          },
        ],
      },
      
      
      // ---------------------------------------------
      //   ログイン回数 / login-count
      // ---------------------------------------------
      
      {
        _id: '4Q2kY-neR',
        type: 'login-count',
        exp: 50,
        limitDay: 1,
        limitMonth: 0,
        limitYear: 0,
        conditionsArr: [
          {
            _id: 'Km8qKK3Xe',
            titles_id: 'tegNhho16',
            count: 1,
            countDay: 0,
          },
          {
            _id: 'xkJLEvRMG',
            titles_id: 'xvY5bY9yH',
            count: 5,
            countDay: 0,
          },
          {
            _id: 'ynHOM2Pkv',
            titles_id: 'GPoSK78Rj',
            count: 10,
            countDay: 0,
          },
          {
            _id: 'eE1kCtjIN',
            titles_id: 'TIucZj9SX',
            count: 20,
            countDay: 0,
          },
          {
            _id: '30l-hJa0A',
            titles_id: 'zqAxK8mRN',
            count: 30,
            countDay: 0,
          },
          {
            _id: '-84Hxy21m',
            titles_id: 'KIYiKgZFQ',
            count: 40,
            countDay: 0,
          },
          {
            _id: 'j4Chqv1hH',
            titles_id: 'gXzXHvnPG',
            count: 50,
            countDay: 0,
          },
          {
            _id: '6r7jc3o69',
            titles_id: 'CF-BqxD_-',
            count: 60,
            countDay: 0,
          },
          {
            _id: 'cuuQ1jixT',
            titles_id: '4CjPpkvKH',
            count: 70,
            countDay: 0,
          },
          {
            _id: 'TOg8A8aaI',
            titles_id: 'd1Yv3ixS_',
            count: 80,
            countDay: 0,
          },
          {
            _id: 'zRRiPHIdv',
            titles_id: 'W71yk14CX',
            count: 90,
            countDay: 0,
          },
          {
            _id: 'MQ0nd-kJA',
            titles_id: 'v4IWCI0K9',
            count: 100,
            countDay: 0,
          },
          {
            _id: 'jns34DkN7',
            titles_id: '-RbTjxeMB',
            count: 110,
            countDay: 0,
          },
          {
            _id: 'QMG2pmnpF',
            titles_id: 'P81q63Gax',
            count: 120,
            countDay: 0,
          },
          {
            _id: 'Z6-aZ4tu5',
            titles_id: 'JQ4EdkmVY',
            count: 130,
            countDay: 0,
          },
          {
            _id: 'JYUBULQP9',
            titles_id: 'u5khnDn8e',
            count: 140,
            countDay: 0,
          },
          {
            _id: 'dV5u7pKbD',
            titles_id: 'wVfpH2aLB',
            count: 150,
            countDay: 0,
          },
          {
            _id: 'VCIiTdPva',
            titles_id: 'jmoIcgxpY',
            count: 160,
            countDay: 0,
          },
          {
            _id: 'L9j94Shh6',
            titles_id: 'yfbgYncsB',
            count: 170,
            countDay: 0,
          },
          {
            _id: 'NpgnMmMGI',
            titles_id: 'nLvby1IsJ',
            count: 180,
            countDay: 0,
          },
          {
            _id: 'XupODkQ9p',
            titles_id: '_vXx7_K4G',
            count: 190,
            countDay: 0,
          },
          {
            _id: 'wg_1helJ9',
            titles_id: 'Jvf9Lijjm',
            count: 200,
            countDay: 0,
          },
          {
            _id: 'Tpnu9IMhm',
            titles_id: 'eyvU_SACO',
            count: 210,
            countDay: 0,
          },
          {
            _id: 'A2gzCYW73',
            titles_id: '5upcKu5zF',
            count: 220,
            countDay: 0,
          },
          {
            _id: 'jm8UqwNkc',
            titles_id: 'YK_KSzwsG',
            count: 230,
            countDay: 0,
          },
          {
            _id: 'XyEw29pmx',
            titles_id: 'i6c5Dfu-m',
            count: 240,
            countDay: 0,
          },
          {
            _id: 'mHcEmf6Se',
            titles_id: 'dKBIlPEoa',
            count: 250,
            countDay: 0,
          },
        ],
      },
      
      
      // ---------------------------------------------
      //   Goodボタンを押す / good-count-click
      // ---------------------------------------------
      
      {
        _id: 'lID2jlB6N',
        type: 'good-count-click',
        exp: 1,
        limitDay: 5,
        limitMonth: 0,
        limitYear: 0,
        conditionsArr: [
          {
            _id: 'bhtezFPHn',
            titles_id: 'OvFFDioQV',
            count: 1,
            countDay: 0,
          },
          {
            _id: 'Cv_SkmT7b',
            titles_id: 'MBNo5yFTg',
            count: 5,
            countDay: 0,
          },
          {
            _id: '4hUGBPmDa',
            titles_id: 'yKAZQg45T',
            count: 10,
            countDay: 0,
          },
          {
            _id: '7p-eDvX9B',
            titles_id: 'krhg5hHmV',
            count: 20,
            countDay: 0,
          },
          {
            _id: 'AuOckZP_O',
            titles_id: 'YMqxD6ALt',
            count: 30,
            countDay: 0,
          },
          {
            _id: 'gRsjBxW77',
            titles_id: 'dxDtrrPc7',
            count: 50,
            countDay: 0,
          },
          {
            _id: 'vxL9L_ak7',
            titles_id: 'LBK1jIxgT',
            count: 100,
            countDay: 0,
          },
          {
            _id: 'nAJ--EE_-',
            titles_id: 'wjuY6Q2lk',
            count: 150,
            countDay: 0,
          },
          {
            _id: 'UFwZJ7gMV',
            titles_id: 'ywapJh2Yi',
            count: 200,
            countDay: 0,
          },
          {
            _id: '4ergGamok',
            titles_id: 'kecLQlRQi',
            count: 250,
            countDay: 0,
          },
          {
            _id: 'CHA1TJI9x',
            titles_id: 'aVcpTftl9',
            count: 300,
            countDay: 0,
          },
          {
            _id: 'TPeO95XEq',
            titles_id: 'o1aIdzdBF',
            count: 350,
            countDay: 0,
          },
          {
            _id: 'QGUiUV67i',
            titles_id: '6kHbHpzv8',
            count: 400,
            countDay: 0,
          },
          {
            _id: 'lGFnbtWi4',
            titles_id: 'YFMuKFuQc',
            count: 450,
            countDay: 0,
          },
          {
            _id: '_XwctULuo',
            titles_id: '0w9fjuWVw',
            count: 500,
            countDay: 0,
          },
          {
            _id: 'e9mF6lhl1',
            titles_id: 'Zu1Uq6XIE',
            count: 550,
            countDay: 0,
          },
        ],
      },
      
      
      
      // ---------------------------------------------
      //   Goodボタンを押される / good-count-clicked
      // ---------------------------------------------
      
      {
        _id: '6LMHjIeDP',
        type: 'good-count-clicked',
        exp: 1,
        limitDay: 5,
        limitMonth: 0,
        limitYear: 0,
        conditionsArr: [
          {
            _id: 'CRjIXFcn3',
            titles_id: '-qbom3GV8',
            count: 1,
            countDay: 0,
          },
          {
            _id: 'dTHjCXS7n',
            titles_id: 'jni4Si4Hn',
            count: 5,
            countDay: 0,
          },
          {
            _id: 'hEa40CPHm',
            titles_id: 'N46yXHfp6',
            count: 10,
            countDay: 0,
          },
          {
            _id: 'sbUziW0WK',
            titles_id: 've1zL3KLa',
            count: 20,
            countDay: 0,
          },
          {
            _id: 'krDg9lqId',
            titles_id: 'O-cemW2Yj',
            count: 30,
            countDay: 0,
          },
          {
            _id: 'B90wZE816',
            titles_id: 'QNGUdMEvH',
            count: 50,
            countDay: 0,
          },
          {
            _id: '1tXkRXFvm',
            titles_id: 'y4gno22iq',
            count: 100,
            countDay: 0,
          },
          {
            _id: 'W07KdhsWq',
            titles_id: '7F-dv9721',
            count: 150,
            countDay: 0,
          },
          {
            _id: 'ySZAOAvx1',
            titles_id: 'AYZJY5Dmk',
            count: 200,
            countDay: 0,
          },
          {
            _id: '1mXA8c6wY',
            titles_id: 'Q-VdNpq0A',
            count: 250,
            countDay: 0,
          },
          {
            _id: 'qecpnNcvU',
            titles_id: 'OHF_0sr4f',
            count: 300,
            countDay: 0,
          },
          {
            _id: 'qMZDyLhhQ',
            titles_id: '2lp1a9nry',
            count: 350,
            countDay: 0,
          },
          {
            _id: 'p4Repl5A8',
            titles_id: 'sRZIe_DIL',
            count: 400,
            countDay: 0,
          },
          {
            _id: '96yJhLzhA',
            titles_id: 'gwn-HZQud',
            count: 450,
            countDay: 0,
          },
          {
            _id: 'yOWgY-WxM',
            titles_id: 'BIA1DRFjt',
            count: 500,
            countDay: 0,
          },
          {
            _id: 'vOJN3blU1',
            titles_id: 'BNJ30I7Wu',
            count: 550,
            countDay: 0,
          },
        ],
      },
      
      
      // ---------------------------------------------
      //   フォーラム書き込み / forum-count-post
      // ---------------------------------------------
      
      {
        _id: 'ZgsxDaKaN',
        type: 'forum-count-post',
        exp: 10,
        limitDay: 5,
        limitMonth: 0,
        limitYear: 0,
        conditionsArr: [
          {
            _id: 'L7kIcm4ny',
            titles_id: 'nFJYEhwWB',
            count: 1,
            countDay: 0,
          },
          {
            _id: 'qvhczmNDa',
            titles_id: 'k4xm8yGJD',
            count: 5,
            countDay: 0,
          },
          {
            _id: '5CwxDvHtR',
            titles_id: 'ljIghwR69',
            count: 10,
            countDay: 0,
          },
          {
            _id: 'mSwdldpkC',
            titles_id: 'WJlkVSLub',
            count: 20,
            countDay: 0,
          },
          {
            _id: 'DYqIyGTOj',
            titles_id: '349Q_q5h8',
            count: 30,
            countDay: 0,
          },
          {
            _id: 'Qzr2FZS1u',
            titles_id: 'rIK64YljB',
            count: 40,
            countDay: 0,
          },
          {
            _id: 'pAK_y84br',
            titles_id: 'DQ9iH_r31',
            count: 50,
            countDay: 0,
          },
          {
            _id: 'BwgfIetVr',
            titles_id: 'RTMuPDYkt',
            count: 60,
            countDay: 0,
          },
        ],
      },
      
      
      // ---------------------------------------------
      //   募集の投稿 / recruitment-count-post
      // ---------------------------------------------
      
      {
        _id: 'XuPlS68UZ',
        type: 'recruitment-count-post',
        exp: 10,
        limitDay: 3,
        limitMonth: 0,
        limitYear: 0,
        conditionsArr: [
          {
            _id: 'ia6G_rM3O',
            titles_id: '7K8R91Chm',
            count: 1,
            countDay: 0,
          },
          {
            _id: 'TpGXT5Tyh',
            titles_id: '0kh9wSxkK',
            count: 2,
            countDay: 0,
          },
          {
            _id: 'Qd6Ck9A0r',
            titles_id: 'ksytsAh44',
            count: 3,
            countDay: 0,
          },
          {
            _id: 'wKAAOLxHd',
            titles_id: '6u1Me1S13',
            count: 4,
            countDay: 0,
          },
          {
            _id: '0EgB9eWgc',
            titles_id: 'n-OyxEgZE',
            count: 5,
            countDay: 0,
          },
          {
            _id: '8EPiVe16H',
            titles_id: 'iJhdcsAnj',
            count: 6,
            countDay: 0,
          },
          {
            _id: 'hh4_-DpCa',
            titles_id: 'VYe67sAJI',
            count: 7,
            countDay: 0,
          },
          {
            _id: '6sXfe7h30',
            titles_id: 'LgqylZRLH',
            count: 8,
            countDay: 0,
          },
          {
            _id: '-ztR4cSxg',
            titles_id: 'cy-FSwJ6x',
            count: 9,
            countDay: 0,
          },
          {
            _id: 'vhdLYJU_5',
            titles_id: 'iQrrWOHai',
            count: 10,
            countDay: 0,
          },
        ],
      },
      
      
      // ---------------------------------------------
      //   フォローする / follow-count
      // ---------------------------------------------
      
      {
        _id: 'orqlX1W0h',
        type: 'follow-count',
        exp: 1,
        limitDay: 20,
        limitMonth: 0,
        limitYear: 0,
        conditionsArr: [
          {
            _id: 'TsUL6l4sg',
            titles_id: 'Klp5SO8K2',
            count: 1,
            countDay: 0,
          },
          {
            _id: 'hVHAnPN0D',
            titles_id: 'WuJd0ECX0',
            count: 5,
            countDay: 0,
          },
          {
            _id: 'IJdLr73vH',
            titles_id: 'LMeLQQZft',
            count: 10,
            countDay: 0,
          },
          {
            _id: 'BxeNGC0hp',
            titles_id: 'lMRySntAn',
            count: 20,
            countDay: 0,
          },
          {
            _id: 'FoAsel9xG',
            titles_id: 'i_NBtroQY',
            count: 30,
            countDay: 0,
          },
          {
            _id: '2hoiz0nzC',
            titles_id: 'R8XwivxCN',
            count: 40,
            countDay: 0,
          },
          {
            _id: 'ad6nyBDK5',
            titles_id: 'E_4zTVN8O',
            count: 50,
            countDay: 0,
          },
        ],
      },
      
      
      // ---------------------------------------------
      //   フォローされる / followed-count
      // ---------------------------------------------
      
      {
        _id: 'V8iU147M5',
        type: 'followed-count',
        exp: 1,
        limitDay: 0,
        limitMonth: 0,
        limitYear: 0,
        conditionsArr: [
          {
            _id: 'E1euCTkWl',
            titles_id: '7YCic-Yds',
            count: 1,
            countDay: 0,
          },
          {
            _id: 'MxvcTJcnp',
            titles_id: 'p-XWgcOtK',
            count: 5,
            countDay: 0,
          },
          {
            _id: '9yR48O2uq',
            titles_id: '8Fbta4f9O',
            count: 10,
            countDay: 0,
          },
          {
            _id: 'rC8aaBIm3',
            titles_id: 'g65dAP992',
            count: 50,
            countDay: 0,
          },
          {
            _id: 'aQ1RZ2-y6',
            titles_id: 'Lcqo1Q7Up',
            count: 100,
            countDay: 0,
          },
          {
            _id: 'lCtOeCTaG',
            titles_id: '8Z3SDtXgN',
            count: 200,
            countDay: 0,
          },
          {
            _id: 'T48vRrIDx',
            titles_id: 'wQ-ywcRpP',
            count: 300,
            countDay: 0,
          },
          {
            _id: 'KVfmGZ6xb',
            titles_id: 'DrgkgbsbH',
            count: 400,
            countDay: 0,
          },
          {
            _id: 'a9LQjhgWy',
            titles_id: 'Rb-hOZVrb',
            count: 500,
            countDay: 0,
          },
        ],
      },
      
      
      // ---------------------------------------------
      //   称号を獲得する / title-count
      // ---------------------------------------------
      
      {
        _id: 'NIbdRwvzO',
        type: 'title-count',
        exp: 0,
        limitDay: 0,
        limitMonth: 0,
        limitYear: 0,
        conditionsArr: [
          {
            _id: 'k1v4HwL1T',
            titles_id: '0c0jL9cW-',
            count: 20,
            countDay: 0,
          },
          {
            _id: 'LuNckKLGW',
            titles_id: 'ZDNXA6mwh',
            count: 40,
            countDay: 0,
          },
          {
            _id: 'enahNNVEv',
            titles_id: 'hJgT4h1s6',
            count: 60,
            countDay: 0,
          },
          {
            _id: 'NLdiUoLtL',
            titles_id: 'vhTNgUcb0',
            count: 80,
            countDay: 0,
          },
          {
            _id: 'G3prpzccY',
            titles_id: 'PiVoTxcDG',
            count: 100,
            countDay: 0,
          },
          {
            _id: 'uYXRrIDi8',
            titles_id: 'xiwWB50ug',
            count: 120,
            countDay: 0,
          },
          {
            _id: '0ZUPnIiSt',
            titles_id: '7uqCc8K1z',
            count: 140,
            countDay: 0,
          },
        ],
      },
      
      
      // ---------------------------------------------
      //   称号を表示する / title-show
      // ---------------------------------------------
      
      {
        _id: 'XRNtAlBCt',
        type: 'title-show',
        exp: 50,
        limitDay: 0,
        limitMonth: 0,
        limitYear: 0,
        conditionsArr: [
          {
            _id: '01VkGKbc2',
            titles_id: 'RhpW8VDw4',
            count: 1,
            countDay: 0,
          },
        ],
      },
      
      
      // ---------------------------------------------
      //   プレイヤーカードを編集する / card-player-edit
      // ---------------------------------------------
      
      {
        _id: 'ekm-IVyO7',
        type: 'card-player-edit',
        exp: 50,
        limitDay: 0,
        limitMonth: 0,
        limitYear: 0,
        conditionsArr: [
          {
            _id: 'OWkbdl3GY',
            titles_id: '1FYXcjzEb',
            count: 1,
            countDay: 0,
          },
        ],
      },
      
      
      // ---------------------------------------------
      //   プレイヤーカードにメイン画像をアップロードする / card-player-upload-image-main
      // ---------------------------------------------
      
      {
        _id: 'uOPtHulWE',
        type: 'card-player-upload-image-main',
        exp: 50,
        limitDay: 0,
        limitMonth: 0,
        limitYear: 0,
        conditionsArr: [
          {
            _id: '15FMrKPWF',
            titles_id: 'bnOJOwQN4',
            count: 1,
            countDay: 0,
          },
        ],
      },
      
      
      // ---------------------------------------------
      //   プレイヤーカードにサムネイル画像をアップロードする / card-player-upload-image-thumbnail
      // ---------------------------------------------
      
      {
        _id: 'qIKFIEaKL',
        type: 'card-player-upload-image-thumbnail',
        exp: 50,
        limitDay: 0,
        limitMonth: 0,
        limitYear: 0,
        conditionsArr: [
          {
            _id: 'a7fyXxFTo',
            titles_id: '4e2otkg81',
            count: 1,
            countDay: 0,
          },
        ],
      },
      
      
      // ---------------------------------------------
      //   ユーザーページに画像をアップロードする / user-page-upload-image-main
      // ---------------------------------------------
      
      {
        _id: 'xfnuj7MX-',
        type: 'user-page-upload-image-main',
        exp: 50,
        limitDay: 0,
        limitMonth: 0,
        limitYear: 0,
        conditionsArr: [
          {
            _id: '3h0DdsMtD',
            titles_id: 'iPgdAE8rL',
            count: 1,
            countDay: 0,
          },
        ],
      },
      
      
      // ---------------------------------------------
      //   ユーザーページのURLを変更する / user-page-change-url
      // ---------------------------------------------
      
      {
        _id: '02Z4nApTe',
        type: 'user-page-change-url',
        exp: 50,
        limitDay: 0,
        limitMonth: 0,
        limitYear: 0,
        conditionsArr: [
          {
            _id: 'p4j0lEFgZ',
            titles_id: 'iDFuNdaD5',
            count: 1,
            countDay: 0,
          },
        ],
      },
      
      
      // ---------------------------------------------
      //   プッシュ通知を許可する / web-push-permission
      // ---------------------------------------------
      
      {
        _id: 'Wz_ojWHSJ',
        type: 'web-push-permission',
        exp: 100,
        limitDay: 0,
        limitMonth: 0,
        limitYear: 0,
        conditionsArr: [
          {
            _id: 'V80pym0kP',
            titles_id: 'oU2EDF7vI',
            count: 1,
            countDay: 0,
          },
        ],
      },
      
      
    ];
    
    
    // ---------------------------------------------
    //   Upsert
    // ---------------------------------------------
    
    await SchemaAchievements.deleteMany({ reset: true });
    returnObj = await SchemaAchievements.insertMany({ saveArr });
    
    
    
    
    // --------------------------------------------------
    //   DB / Titles
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Save Object
    // ---------------------------------------------
    
    saveArr = [
      
      
      // ---------------------------------------------
      //   special
      // ---------------------------------------------
      
      {
        _id: 'MuK2dKVpn',
        urlID: 'MuK2dKVpn',
        language: 'ja',
        name: 'エデンの民',
      },
      
      
      // ---------------------------------------------
      //   level-count
      // ---------------------------------------------
      
      {
        _id: '065apjMq1',
        urlID: '065apjMq1',
        language: 'ja',
        name: 'チキン',
      },
      
      {
        _id: 'oZlexPqhS',
        urlID: 'oZlexPqhS',
        language: 'ja',
        name: '子犬',
      },
      
      {
        _id: 'GjGPfC8e1',
        urlID: 'GjGPfC8e1',
        language: 'ja',
        name: 'うさぎ',
      },
      
      {
        _id: 'MYLwdOLD1',
        urlID: 'MYLwdOLD1',
        language: 'ja',
        name: '村人',
      },
      
      {
        _id: 'XdNCO6eIe',
        urlID: 'XdNCO6eIe',
        language: 'ja',
        name: 'お調子者',
      },
      
      {
        _id: '0lmhBTKPF',
        urlID: '0lmhBTKPF',
        language: 'ja',
        name: 'キュート',
      },
      
      {
        _id: 'VN3reZuRi',
        urlID: 'VN3reZuRi',
        language: 'ja',
        name: 'スクラップ',
      },
      
      {
        _id: 'NwRla-9WG',
        urlID: 'NwRla-9WG',
        language: 'ja',
        name: '冒険者',
      },
      
      {
        _id: 'C00pgN_Xn',
        urlID: 'C00pgN_Xn',
        language: 'ja',
        name: '型落ち',
      },
      
      {
        _id: 'FM8hGmeqv',
        urlID: 'FM8hGmeqv',
        language: 'ja',
        name: 'ギャル',
      },
      
      {
        _id: 'BWqIWFilB',
        urlID: 'BWqIWFilB',
        language: 'ja',
        name: '熱血漢',
      },
      
      {
        _id: 'AW2KhpcxM',
        urlID: 'AW2KhpcxM',
        language: 'ja',
        name: 'VIP',
      },
      
      {
        _id: 'nxZrZpuiy',
        urlID: 'nxZrZpuiy',
        language: 'ja',
        name: 'メンヘラ',
      },
      
      {
        _id: 'h5b34wdsc',
        urlID: 'h5b34wdsc',
        language: 'ja',
        name: 'お尋ね者',
      },
      
      {
        _id: 'QEd4nWllx',
        urlID: 'QEd4nWllx',
        language: 'ja',
        name: 'イエスマン',
      },
      
      {
        _id: 'YC0hOO6mu',
        urlID: 'YC0hOO6mu',
        language: 'ja',
        name: '風紀委員',
      },
      
      {
        _id: 'pRR5Qc8oO',
        urlID: 'pRR5Qc8oO',
        language: 'ja',
        name: 'ラブリー',
      },
      
      {
        _id: '-VG1v7kcD',
        urlID: '-VG1v7kcD',
        language: 'ja',
        name: '逃亡者',
      },
      
      {
        _id: 'kdEKzT2du',
        urlID: 'kdEKzT2du',
        language: 'ja',
        name: 'バトルクライ',
      },
      
      {
        _id: 'nowtpqr6_',
        urlID: 'nowtpqr6_',
        language: 'ja',
        name: '秘密兵器',
      },
      
      {
        _id: 'yAGGRAkFG',
        urlID: 'yAGGRAkFG',
        language: 'ja',
        name: 'もふもふ',
      },
      
      {
        _id: 'T8yCXNXn1',
        urlID: 'T8yCXNXn1',
        language: 'ja',
        name: 'サイレント',
      },
      
      {
        _id: 'jDUBpaZs4',
        urlID: 'jDUBpaZs4',
        language: 'ja',
        name: 'ジョーカー',
      },
      
      {
        _id: '2ZvB6qs8O',
        urlID: '2ZvB6qs8O',
        language: 'ja',
        name: '天下無双',
      },
      
      {
        _id: 'gpABkVPwE',
        urlID: 'gpABkVPwE',
        language: 'ja',
        name: 'サイコパス',
      },
      
      {
        _id: 'RZmgRzPkb',
        urlID: 'RZmgRzPkb',
        language: 'ja',
        name: 'スカイハイ',
      },
      
      {
        _id: 'OQbA1CIGZ',
        urlID: 'OQbA1CIGZ',
        language: 'ja',
        name: '海賊王',
      },
      
      {
        _id: '0c00gASC1',
        urlID: '0c00gASC1',
        language: 'ja',
        name: 'エンペラー',
      },
      
      {
        _id: 'N1uUsUmpP',
        urlID: 'N1uUsUmpP',
        language: 'ja',
        name: '宇宙人',
      },
      
      {
        _id: '9V_XbaxwZ',
        urlID: '9V_XbaxwZ',
        language: 'ja',
        name: 'デンジャラスクイーン',
      },
      
      {
        _id: 'TrSEsmN7h',
        urlID: 'TrSEsmN7h',
        language: 'ja',
        name: 'レジェンド',
      },
      
      {
        _id: 'XkgxqdmPp',
        urlID: 'XkgxqdmPp',
        language: 'ja',
        name: '不死',
      },
      
      {
        _id: 'xVu0pGDtI',
        urlID: 'xVu0pGDtI',
        language: 'ja',
        name: '異界の扉',
      },
      
      {
        _id: '3hdye-b-T',
        urlID: '3hdye-b-T',
        language: 'ja',
        name: 'ファッションリーダー',
      },
      
      {
        _id: 'gmLjWaOPk',
        urlID: 'gmLjWaOPk',
        language: 'ja',
        name: '伝説のヒーロー',
      },
      
      {
        _id: '5WLv0C11_',
        urlID: '5WLv0C11_',
        language: 'ja',
        name: 'イージス',
      },
      
      {
        _id: '0I1ULpaSC',
        urlID: '0I1ULpaSC',
        language: 'ja',
        name: 'お掃除ロボ',
      },
      
      {
        _id: 'jl3skqUCw',
        urlID: 'jl3skqUCw',
        language: 'ja',
        name: 'クッキー',
      },
      
      {
        _id: 'lMahzRskP',
        urlID: 'lMahzRskP',
        language: 'ja',
        name: '冥界の王',
      },
      
      {
        _id: 'd5wM-NjJ6',
        urlID: 'd5wM-NjJ6',
        language: 'ja',
        name: '混沌の女王',
      },
      
      {
        _id: 'tWuUZX5gC',
        urlID: 'tWuUZX5gC',
        language: 'ja',
        name: 'ブルーローズ',
      },
      
      {
        _id: 'quNmsBMAv',
        urlID: 'quNmsBMAv',
        language: 'ja',
        name: 'ノブレス・オブリージュ',
      },
      
      {
        _id: 'kzPLdbzW8',
        urlID: 'kzPLdbzW8',
        language: 'ja',
        name: '魔法少女',
      },
      
      
      // ---------------------------------------------
      //   account-count-day
      // ---------------------------------------------
      
      {
        _id: 'rYAf6jFYK',
        urlID: 'rYAf6jFYK',
        language: 'ja',
        name: 'ランナー',
      },
      
      {
        _id: '8z7LyZQ_5',
        urlID: '8z7LyZQ_5',
        language: 'ja',
        name: 'ゲーマー',
      },
      
      {
        _id: 'W8sbxpWTe',
        urlID: 'W8sbxpWTe',
        language: 'ja',
        name: '鉄人',
      },
      
      {
        _id: 'QZbmznsqU',
        urlID: 'QZbmznsqU',
        language: 'ja',
        name: '古老',
      },
      
      {
        _id: 'LOUgnlj36',
        urlID: 'LOUgnlj36',
        language: 'ja',
        name: '求道者',
      },
      
      {
        _id: 'L_p3lJfig',
        urlID: 'L_p3lJfig',
        language: 'ja',
        name: 'タイムイーター',
      },
      
      {
        _id: 'CBZfxt-5L',
        urlID: 'CBZfxt-5L',
        language: 'ja',
        name: '永遠の旅人',
      },
      
      {
        _id: 'yHSTXY0Uv',
        urlID: 'yHSTXY0Uv',
        language: 'ja',
        name: '無限回廊',
      },
      
      {
        _id: 'DLV53cJSO',
        urlID: 'DLV53cJSO',
        language: 'ja',
        name: 'タイムトラベラー',
      },
      
      
      // ---------------------------------------------
      //   login-count
      // ---------------------------------------------
      
      {
        _id: 'tegNhho16',
        urlID: 'tegNhho16',
        language: 'ja',
        name: 'スライム',
      },
      
      {
        _id: 'xvY5bY9yH',
        urlID: 'xvY5bY9yH',
        language: 'ja',
        name: 'ピクシー',
      },
      
      {
        _id: 'GPoSK78Rj',
        urlID: 'GPoSK78Rj',
        language: 'ja',
        name: 'マーメイド',
      },
      
      {
        _id: 'TIucZj9SX',
        urlID: 'TIucZj9SX',
        language: 'ja',
        name: 'エルフ',
      },
      
      {
        _id: 'zqAxK8mRN',
        urlID: 'zqAxK8mRN',
        language: 'ja',
        name: 'ドワーフ',
      },
      
      {
        _id: 'KIYiKgZFQ',
        urlID: 'KIYiKgZFQ',
        language: 'ja',
        name: 'ゴースト',
      },
      
      {
        _id: 'gXzXHvnPG',
        urlID: 'gXzXHvnPG',
        language: 'ja',
        name: 'トロール',
      },
      
      {
        _id: 'CF-BqxD_-',
        urlID: 'CF-BqxD_-',
        language: 'ja',
        name: 'セイレーン',
      },
      
      {
        _id: '4CjPpkvKH',
        urlID: '4CjPpkvKH',
        language: 'ja',
        name: 'サキュバス',
      },
      
      {
        _id: 'd1Yv3ixS_',
        urlID: 'd1Yv3ixS_',
        language: 'ja',
        name: 'ヴァンパイア',
      },
      
      {
        _id: 'W71yk14CX',
        urlID: 'W71yk14CX',
        language: 'ja',
        name: 'ユニコーン',
      },
      
      {
        _id: 'v4IWCI0K9',
        urlID: 'v4IWCI0K9',
        language: 'ja',
        name: 'ケルベロス',
      },
      
      {
        _id: '-RbTjxeMB',
        urlID: '-RbTjxeMB',
        language: 'ja',
        name: 'メデューサ',
      },
      
      {
        _id: 'P81q63Gax',
        urlID: 'P81q63Gax',
        language: 'ja',
        name: 'フェニックス',
      },
      
      {
        _id: 'JQ4EdkmVY',
        urlID: 'JQ4EdkmVY',
        language: 'ja',
        name: 'ドラゴン',
      },
      
      {
        _id: 'u5khnDn8e',
        urlID: 'u5khnDn8e',
        language: 'ja',
        name: 'ゾンビ',
      },
      
      {
        _id: 'wVfpH2aLB',
        urlID: 'wVfpH2aLB',
        language: 'ja',
        name: 'アンデッド',
      },
      
      {
        _id: 'jmoIcgxpY',
        urlID: 'jmoIcgxpY',
        language: 'ja',
        name: 'デビル',
      },
      
      {
        _id: 'yfbgYncsB',
        urlID: 'yfbgYncsB',
        language: 'ja',
        name: '妖精',
      },
      
      {
        _id: 'nLvby1IsJ',
        urlID: 'nLvby1IsJ',
        language: 'ja',
        name: '精霊',
      },
      
      {
        _id: '_vXx7_K4G',
        urlID: '_vXx7_K4G',
        language: 'ja',
        name: '天使',
      },
      
      {
        _id: 'Jvf9Lijjm',
        urlID: 'Jvf9Lijjm',
        language: 'ja',
        name: '堕天使',
      },
      
      {
        _id: 'eyvU_SACO',
        urlID: 'eyvU_SACO',
        language: 'ja',
        name: '魔王',
      },
      
      {
        _id: '5upcKu5zF',
        urlID: '5upcKu5zF',
        language: 'ja',
        name: '死神',
      },
      
      {
        _id: 'YK_KSzwsG',
        urlID: 'YK_KSzwsG',
        language: 'ja',
        name: '魔神',
      },
      
      {
        _id: 'i6c5Dfu-m',
        urlID: 'i6c5Dfu-m',
        language: 'ja',
        name: '貧乏神',
      },
      
      {
        _id: 'dKBIlPEoa',
        urlID: 'dKBIlPEoa',
        language: 'ja',
        name: '福の神',
      },
      
      
      // ---------------------------------------------
      //   good-count-click
      // ---------------------------------------------
      
      {
        _id: 'OvFFDioQV',
        urlID: 'OvFFDioQV',
        language: 'ja',
        name: '剣士',
      },
      
      {
        _id: 'MBNo5yFTg',
        urlID: 'MBNo5yFTg',
        language: 'ja',
        name: 'ウォーリアー',
      },
      
      {
        _id: 'yKAZQg45T',
        urlID: 'yKAZQg45T',
        language: 'ja',
        name: 'ランサー',
      },
      
      {
        _id: 'krhg5hHmV',
        urlID: 'krhg5hHmV',
        language: 'ja',
        name: 'アーチャー',
      },
      
      {
        _id: 'YMqxD6ALt',
        urlID: 'YMqxD6ALt',
        language: 'ja',
        name: '騎士',
      },
      
      {
        _id: 'dxDtrrPc7',
        urlID: 'dxDtrrPc7',
        language: 'ja',
        name: '盗賊',
      },
      
      {
        _id: 'LBK1jIxgT',
        urlID: 'LBK1jIxgT',
        language: 'ja',
        name: '戦士',
      },
      
      {
        _id: 'wjuY6Q2lk',
        urlID: 'wjuY6Q2lk',
        language: 'ja',
        name: '武闘家',
      },
      
      {
        _id: 'ywapJh2Yi',
        urlID: 'ywapJh2Yi',
        language: 'ja',
        name: '勇者',
      },
      
      {
        _id: 'kecLQlRQi',
        urlID: 'kecLQlRQi',
        language: 'ja',
        name: '魔物使い',
      },
      
      {
        _id: 'aVcpTftl9',
        urlID: 'aVcpTftl9',
        language: 'ja',
        name: 'バーサーカー',
      },
      
      {
        _id: 'o1aIdzdBF',
        urlID: 'o1aIdzdBF',
        language: 'ja',
        name: '竜騎士',
      },
      
      {
        _id: '6kHbHpzv8',
        urlID: '6kHbHpzv8',
        language: 'ja',
        name: 'パラディン',
      },
      
      {
        _id: 'YFMuKFuQc',
        urlID: 'YFMuKFuQc',
        language: 'ja',
        name: 'アサシン',
      },
      
      {
        _id: '0w9fjuWVw',
        urlID: '0w9fjuWVw',
        language: 'ja',
        name: '侍',
      },
      
      {
        _id: 'Zu1Uq6XIE',
        urlID: 'Zu1Uq6XIE',
        language: 'ja',
        name: '忍者',
      },
      
      
      // ---------------------------------------------
      //   good-count-clicked
      // ---------------------------------------------
      
      {
        _id: '-qbom3GV8',
        urlID: '-qbom3GV8',
        language: 'ja',
        name: '商人',
      },
      
      {
        _id: 'jni4Si4Hn',
        urlID: 'jni4Si4Hn',
        language: 'ja',
        name: '鍛冶屋',
      },
      
      {
        _id: 'N46yXHfp6',
        urlID: 'N46yXHfp6',
        language: 'ja',
        name: '踊り子',
      },
      
      {
        _id: 've1zL3KLa',
        urlID: 've1zL3KLa',
        language: 'ja',
        name: '吟遊詩人',
      },
      
      {
        _id: 'O-cemW2Yj',
        urlID: 'O-cemW2Yj',
        language: 'ja',
        name: '魔法使い',
      },
      
      {
        _id: 'QNGUdMEvH',
        urlID: 'QNGUdMEvH',
        language: 'ja',
        name: '僧侶',
      },
      
      {
        _id: 'y4gno22iq',
        urlID: 'y4gno22iq',
        language: 'ja',
        name: '召喚士',
      },
      
      {
        _id: '7F-dv9721',
        urlID: '7F-dv9721',
        language: 'ja',
        name: '占い師',
      },
      
      {
        _id: 'AYZJY5Dmk',
        urlID: 'AYZJY5Dmk',
        language: 'ja',
        name: '巫女',
      },
      
      {
        _id: 'Q-VdNpq0A',
        urlID: 'Q-VdNpq0A',
        language: 'ja',
        name: '聖職者',
      },
      
      {
        _id: 'OHF_0sr4f',
        urlID: 'OHF_0sr4f',
        language: 'ja',
        name: '呪術師',
      },
      
      {
        _id: '2lp1a9nry',
        urlID: '2lp1a9nry',
        language: 'ja',
        name: '錬金術師',
      },
      
      {
        _id: 'sRZIe_DIL',
        urlID: 'sRZIe_DIL',
        language: 'ja',
        name: 'ビショップ',
      },
      
      {
        _id: 'gwn-HZQud',
        urlID: 'gwn-HZQud',
        language: 'ja',
        name: '魔法戦士',
      },
      
      {
        _id: 'BIA1DRFjt',
        urlID: 'BIA1DRFjt',
        language: 'ja',
        name: 'ネクロマンサー',
      },
      
      {
        _id: 'BNJ30I7Wu',
        urlID: 'BNJ30I7Wu',
        language: 'ja',
        name: '魔女',
      },
      
      
      // ---------------------------------------------
      //   forum-count-post
      // ---------------------------------------------
      
      {
        _id: 'nFJYEhwWB',
        urlID: 'nFJYEhwWB',
        language: 'ja',
        name: 'ポエマー',
      },
      
      {
        _id: 'k4xm8yGJD',
        urlID: 'k4xm8yGJD',
        language: 'ja',
        name: '作家',
      },
      
      {
        _id: 'ljIghwR69',
        urlID: 'ljIghwR69',
        language: 'ja',
        name: '文豪',
      },
      
      {
        _id: 'WJlkVSLub',
        urlID: 'WJlkVSLub',
        language: 'ja',
        name: '表現者',
      },
      
      {
        _id: '349Q_q5h8',
        urlID: '349Q_q5h8',
        language: 'ja',
        name: 'ネゴシエイター',
      },
      
      {
        _id: 'rIK64YljB',
        urlID: 'rIK64YljB',
        language: 'ja',
        name: '魔導書の書き手',
      },
      
      {
        _id: 'DQ9iH_r31',
        urlID: 'DQ9iH_r31',
        language: 'ja',
        name: '悪魔の筆',
      },
      
      {
        _id: 'RTMuPDYkt',
        urlID: 'RTMuPDYkt',
        language: 'ja',
        name: 'ヴォイニッチ手稿',
      },
      
      
      // ---------------------------------------------
      //   recruitment-count-post
      // ---------------------------------------------
      
      {
        _id: '7K8R91Chm',
        urlID: '7K8R91Chm',
        language: 'ja',
        name: 'ぼっち',
      },
      
      {
        _id: '0kh9wSxkK',
        urlID: '0kh9wSxkK',
        language: 'ja',
        name: '友達募集',
      },
      
      {
        _id: 'ksytsAh44',
        urlID: 'ksytsAh44',
        language: 'ja',
        name: '招き猫',
      },
      
      {
        _id: '6u1Me1S13',
        urlID: '6u1Me1S13',
        language: 'ja',
        name: 'トレーダー',
      },
      
      {
        _id: 'n-OyxEgZE',
        urlID: 'n-OyxEgZE',
        language: 'ja',
        name: 'リーダー',
      },
      
      {
        _id: 'iJhdcsAnj',
        urlID: 'iJhdcsAnj',
        language: 'ja',
        name: '指揮官',
      },
      
      {
        _id: 'VYe67sAJI',
        urlID: 'VYe67sAJI',
        language: 'ja',
        name: 'フレンドリーファイア',
      },
      
      {
        _id: 'LgqylZRLH',
        urlID: 'LgqylZRLH',
        language: 'ja',
        name: '軍師',
      },
      
      {
        _id: 'cy-FSwJ6x',
        urlID: 'cy-FSwJ6x',
        language: 'ja',
        name: 'CEO',
      },
      
      {
        _id: 'iQrrWOHai',
        urlID: 'iQrrWOHai',
        language: 'ja',
        name: '全てを統べる者',
      },
      
      
      // ---------------------------------------------
      //   レビューする / review-count
      // ---------------------------------------------
      
      {
        _id: 'NwzUOqsiC',
        urlID: 'NwzUOqsiC',
        language: 'ja',
        name: '書紀',
      },
      
      {
        _id: 'K9VWK8T0D',
        urlID: 'K9VWK8T0D',
        language: 'ja',
        name: 'スパイス',
      },
      
      {
        _id: 'peQOpIzlB',
        urlID: 'peQOpIzlB',
        language: 'ja',
        name: '評論家',
      },
      
      {
        _id: 'EmYzDKauO',
        urlID: 'EmYzDKauO',
        language: 'ja',
        name: '裁定人',
      },
      
      {
        _id: 'f2rMg6LRU',
        urlID: 'f2rMg6LRU',
        language: 'ja',
        name: 'ストーリーテラー',
      },
      
      {
        _id: 'weSo6n4qF',
        urlID: 'weSo6n4qF',
        language: 'ja',
        name: '御目付け役',
      },
      
      {
        _id: 'BT2y8MD1d',
        urlID: 'BT2y8MD1d',
        language: 'ja',
        name: 'シナリオライター',
      },
      
      {
        _id: '433U-0Jbe',
        urlID: '433U-0Jbe',
        language: 'ja',
        name: '大賢者',
      },
      
      {
        _id: '8rujWb4lb',
        urlID: '8rujWb4lb',
        language: 'ja',
        name: 'プロビデンスの目',
      },
      
      
      // ---------------------------------------------
      //   follow-count
      // ---------------------------------------------
      
      {
        _id: 'Klp5SO8K2',
        urlID: 'Klp5SO8K2',
        language: 'ja',
        name: 'ペット',
      },
      
      {
        _id: 'WuJd0ECX0',
        urlID: 'WuJd0ECX0',
        language: 'ja',
        name: 'メイド',
      },
      
      {
        _id: 'LMeLQQZft',
        urlID: 'LMeLQQZft',
        language: 'ja',
        name: '操り人形',
      },
      
      {
        _id: 'lMRySntAn',
        urlID: 'lMRySntAn',
        language: 'ja',
        name: '追跡者',
      },
      
      {
        _id: 'i_NBtroQY',
        urlID: 'i_NBtroQY',
        language: 'ja',
        name: 'サーヴァント',
      },
      
      {
        _id: 'R8XwivxCN',
        urlID: 'R8XwivxCN',
        language: 'ja',
        name: '使徒',
      },
      
      {
        _id: 'E_4zTVN8O',
        urlID: 'E_4zTVN8O',
        language: 'ja',
        name: 'みんなの友達',
      },
      
      
      // ---------------------------------------------
      //   followed-count
      // ---------------------------------------------
      
      {
        _id: '7YCic-Yds',
        urlID: '7YCic-Yds',
        language: 'ja',
        name: '遊び人',
      },
      
      {
        _id: 'p-XWgcOtK',
        urlID: 'p-XWgcOtK',
        language: 'ja',
        name: 'ピエロ',
      },
      
      {
        _id: '8Fbta4f9O',
        urlID: '8Fbta4f9O',
        language: 'ja',
        name: '人気者',
      },
      
      {
        _id: 'g65dAP992',
        urlID: 'g65dAP992',
        language: 'ja',
        name: 'アイドル',
      },
      
      {
        _id: 'Lcqo1Q7Up',
        urlID: 'Lcqo1Q7Up',
        language: 'ja',
        name: 'スーパースター',
      },
      
      {
        _id: '8Z3SDtXgN',
        urlID: '8Z3SDtXgN',
        language: 'ja',
        name: '教祖様',
      },
      
      {
        _id: 'wQ-ywcRpP',
        urlID: 'wQ-ywcRpP',
        language: 'ja',
        name: 'カリスマ',
      },
      
      {
        _id: 'DrgkgbsbH',
        urlID: 'DrgkgbsbH',
        language: 'ja',
        name: '預言者',
      },
      
      {
        _id: 'Rb-hOZVrb',
        urlID: 'Rb-hOZVrb',
        language: 'ja',
        name: '救世主',
      },
      
      
      // ---------------------------------------------
      //   title-count
      // ---------------------------------------------
      
      {
        _id: '0c0jL9cW-',
        urlID: '0c0jL9cW-',
        language: 'ja',
        name: '探検家',
      },
      
      {
        _id: 'ZDNXA6mwh',
        urlID: 'ZDNXA6mwh',
        language: 'ja',
        name: 'マニア',
      },
      
      {
        _id: 'hJgT4h1s6',
        urlID: 'hJgT4h1s6',
        language: 'ja',
        name: 'コレクター',
      },
      
      {
        _id: 'vhTNgUcb0',
        urlID: 'vhTNgUcb0',
        language: 'ja',
        name: 'トレジャーハンター',
      },
      
      {
        _id: 'PiVoTxcDG',
        urlID: 'PiVoTxcDG',
        language: 'ja',
        name: 'ヒストリア',
      },
      
      {
        _id: 'xiwWB50ug',
        urlID: 'xiwWB50ug',
        language: 'ja',
        name: '無限の宝物庫',
      },
      
      {
        _id: '7uqCc8K1z',
        urlID: '7uqCc8K1z',
        language: 'ja',
        name: 'アカシックレコード',
      },
      
      
      // ---------------------------------------------
      //   title-show
      // ---------------------------------------------
      
      {
        _id: 'RhpW8VDw4',
        urlID: 'RhpW8VDw4',
        language: 'ja',
        name: 'ひよこ',
      },
      
      
      // ---------------------------------------------
      //   card-player-edit
      // ---------------------------------------------
      
      {
        _id: '1FYXcjzEb',
        urlID: '1FYXcjzEb',
        language: 'ja',
        name: 'クリエイター',
      },
      
      
      // ---------------------------------------------
      //   card-player-upload-image-main
      // ---------------------------------------------
      
      {
        _id: 'bnOJOwQN4',
        urlID: 'bnOJOwQN4',
        language: 'ja',
        name: 'デザイナー',
      },
      
      
      // ---------------------------------------------
      //   card-player-upload-image-thumbnail
      // ---------------------------------------------
      
      {
        _id: '4e2otkg81',
        urlID: '4e2otkg81',
        language: 'ja',
        name: '絵描き',
      },
      
      
      // ---------------------------------------------
      //   user-page-upload-image-main
      // ---------------------------------------------
      
      {
        _id: 'iPgdAE8rL',
        urlID: 'iPgdAE8rL',
        language: 'ja',
        name: 'アーティスト',
      },
      
      
      // ---------------------------------------------
      //   user-page-change-url
      // ---------------------------------------------
      
      {
        _id: 'iDFuNdaD5',
        urlID: 'iDFuNdaD5',
        language: 'ja',
        name: 'ユニーク',
      },
      
      
      // ---------------------------------------------
      //   web-push-permission
      // ---------------------------------------------
      
      {
        _id: 'oU2EDF7vI',
        urlID: 'oU2EDF7vI',
        language: 'ja',
        name: 'エスパー',
      },
      
      
    ];
    
    
    // ---------------------------------------------
    //   Upsert
    // ---------------------------------------------
    
    await SchemaTitles.deleteMany({ reset: true });
    returnObj = await SchemaTitles.insertMany({ saveArr });
    
    
    
    
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
        twitterHashtagsArr: ['DeadbyDaylight', 'デッドバイデイライト'],
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
        twitterHashtagsArr: ['DeadbyDaylight'],
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
        twitterHashtagsArr: ['スマブラSP'],
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
        twitterHashtagsArr: [],
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
        twitterHashtagsArr: ['DQB2'],
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
        twitterHashtagsArr: ['Overcooked2'],
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
        urlID: 'Action',
        name: 'Action'
      },
      {
        _id: 'iWeBuc0j2',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        genreID: 'YC3gSkK67',
        urlID: 'Action',
        name: 'アクション'
      },
      
      
      {
        _id: 'ksTu6wRs0l',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'en',
        country: 'US',
        genreID: 'jpPfXudBt',
        urlID: 'Shooter',
        name: 'Shooter'
      },
      {
        _id: 'ohPaZnDHr',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        genreID: 'jpPfXudBt',
        urlID: 'Shooter',
        name: 'シューティング'
      },
      
      
      {
        _id: 'ouLGbf_KSd',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'en',
        country: 'US',
        genreID: 'aiB1RZ0f8',
        urlID: 'Adventure',
        name: 'Adventure'
      },
      {
        _id: 'XErEwHoNy',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        genreID: 'aiB1RZ0f8',
        urlID: 'Adventure',
        name: 'アドベンチャー'
      },
      
      
      {
        _id: '9iRS29w3we',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'en',
        country: 'US',
        genreID: 'sU94RUPS7',
        urlID: 'RPG',
        name: 'RPG'
      },
      {
        _id: 'acQTo-M0r',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        genreID: 'sU94RUPS7',
        urlID: 'RPG',
        name: 'RPG'
      },
      
      
      {
        _id: '0Uaz_dOxXq',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'en',
        country: 'US',
        genreID: 'lDdVW5ANX',
        urlID: 'Simulation',
        name: 'Simulation'
      },
      {
        _id: 'AmPQz8iqR',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        genreID: 'lDdVW5ANX',
        urlID: 'Simulation',
        name: 'シミュレーター'
      },
      
      
      {
        _id: 'RpptnE2zlp',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'en',
        country: 'US',
        genreID: '-HKDHuR2v',
        urlID: 'Strategy',
        name: 'Strategy'
      },
      {
        _id: 'nwCUpgBxm',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        genreID: '-HKDHuR2v',
        urlID: 'Strategy',
        name: 'シミュレーション（ストラテジー）'
      },
      
      
      {
        _id: 'b_QI2RFSEQ6',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'en',
        country: 'US',
        genreID: 'NCt2Bb7WF',
        urlID: 'Sports',
        name: 'Sports'
      },
      {
        _id: 'nbGG_uNfA',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        genreID: 'NCt2Bb7WF',
        urlID: 'Sports',
        name: 'スポーツ'
      },
      
      
      {
        _id: 'mlfWkx-ZxJL',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'en',
        country: 'US',
        genreID: 'CoIMeJDxB',
        urlID: 'Racing',
        name: 'Racing'
      },
      {
        _id: 'kQ_135dZL',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        genreID: 'CoIMeJDxB',
        urlID: 'Racing',
        name: 'レース'
      },
      
      
      {
        _id: 'deBQJJV-m8s',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'en',
        country: 'US',
        genreID: 'n2k7J_e12',
        urlID: 'Fighting',
        name: 'Fighting'
      },
      {
        _id: 'kG0O00psM',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        genreID: 'n2k7J_e12',
        urlID: 'Fighting',
        name: '格闘ゲーム'
      },
      
      
      {
        _id: 'uEUpcTb87D_',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'en',
        country: 'US',
        genreID: 'SV1mg4iuD',
        urlID: 'Puzzle',
        name: 'Puzzle'
      },
      {
        _id: 'qrIbvFXm2',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        genreID: 'SV1mg4iuD',
        urlID: 'Puzzle',
        name: 'パズル'
      },
      
      
      {
        _id: 'ejdGhTwE1Gb',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'en',
        country: 'US',
        genreID: '691Od0Wty',
        urlID: 'BoardCard',
        name: 'Board game / Card game'
      },
      {
        _id: 'lkNbIGAUE',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        genreID: '691Od0Wty',
        urlID: 'BoardCard',
        name: 'ボードゲーム / カードゲーム'
      },
      
      
      {
        _id: 'cU9z-CA3d29',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'en',
        country: 'US',
        genreID: 'rsx6C2bsy',
        urlID: 'Music',
        name: 'Music game'
      },
      {
        _id: '7Asj0C1FV',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        genreID: 'rsx6C2bsy',
        urlID: 'Music',
        name: '音ゲー'
      },
      
      
      {
        _id: 'bfxzmy3eib9',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'en',
        country: 'US',
        genreID: 'HBpRRumc3',
        urlID: 'Other',
        name: 'Other'
      },
      {
        _id: 'Nm8Nyp82f',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        genreID: 'HBpRRumc3',
        urlID: 'Other',
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
        urlID: 'Nintendo-Entertainment-System',
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
        urlID: 'Family-Computer',
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
        urlID: 'PC-Engine',
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
        urlID: 'MEGA-DRIVE',
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
        urlID: 'SUPER-Famicom',
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
        urlID: 'NEO-GEO',
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
        urlID: 'SEGA-SATURN',
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
        urlID: 'PlayStation',
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
        urlID: 'VIRTUAL-BOY',
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
        urlID: 'NINTENDO-64',
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
        urlID: 'Dreamcast',
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
        urlID: 'PlayStation-2',
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
        urlID: 'NINTENDO-GAMECUBE',
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
        urlID: 'Xbox',
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
        urlID: 'Xbox-360',
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
        urlID: 'PlayStation-3',
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
        urlID: 'Wii',
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
        urlID: 'Wii-U',
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
        urlID: 'PlayStation-4',
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
        urlID: 'Xbox-One',
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
        urlID: 'Nintendo-Switch',
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
        urlID: 'Game-Boy',
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
        urlID: 'GAME-GEAR',
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
        urlID: 'PC-Engine-GT',
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
        urlID: 'NEOGEO-POCKET',
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
        urlID: 'Wonder-Swan',
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
        urlID: 'GAMEBOY-ADVANCE',
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
        urlID: 'Nintendo-DS',
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
        urlID: 'PlayStation-Portable',
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
        urlID: 'Nintendo-3DS',
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
        urlID: 'PlayStation-Vita',
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
        urlID: 'PC',
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
        urlID: 'Android',
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
        urlID: 'iOS',
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
        _id: 'Owja1jVAp',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: 'etJp0y_Vt',
        language: 'ja',
        name: 'Administrator',
        status: 'Status',
        imagesAndVideos_id: '',
        imagesAndVideosThumbnail_id: '',
        comment: `Comment`,
        age: '',
        ageAlternativeText: '',
        sex: '',
        sexAlternativeText: '',
        address: '',
        addressAlternativeText: '',
        gamingExperience: '',
        gamingExperienceAlternativeText: '',
        hobbiesArr: [],
        specialSkillsArr: [],
        smartphoneModel: '',
        smartphoneComment: ``,
        tabletModel: '',
        tabletComment: ``,
        pcModel: '',
        pcComment: ``,
        pcSpecsObj: {
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
          keyboard: '',
        },
        hardwareActiveArr: [],
        hardwareInactiveArr: [],
        ids_idsArr: [],
        activityTimeArr: [],
        lookingForFriends: false,
        lookingForFriendsIcon: 'emoji_u1f47f',
        lookingForFriendsComment: '',
        voiceChat: false,
        voiceChatComment: '',
        linkArr: [],
        search: false,
      },
      
      
      {
        _id: 'zaoOWw89g',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: 'jun-deE4J',
        language: 'ja',
        name: 'マリオ',
        status: 'ビルダー',
        imagesAndVideos_id: '-uskdLoSC',
        imagesAndVideosThumbnail_id: '9h6n2gyyK',
        comment: `Next.js を試してみたところ、とても優秀だったので採用することに決めました。サーバーサイドレンダリングの機能や、Code Splitting をデフォルトで行ってくれるのは非常に便利です。ただすべての機能を提供してくれるわけではないので、結局、自分で Express を利用したサーバー用コードを書かないといけない部分も多くあるのですが。
  
  それと Next.js はデータベースへのアクセスをすべて API で行うことを推奨しているようです。そこそこの規模のサイトになると、そういった構成が増えてくるのかもしれないのですが、自分は小規模なサイトしか作ったことがないので、初めての経験でちょっと不安です。`,
        age: '2002-10-19T00:00:00Z',
        ageAlternativeText: '',
        sex: 'male',
        sexAlternativeText: '',
        address: '',
        addressAlternativeText: '大阪',
        gamingExperience: '2008-09-19T00:00:00Z',
        gamingExperienceAlternativeText: '',
        hobbiesArr: ['映画鑑賞', '料理', '海外旅行', 'ヴァイオリン演奏'],
        specialSkillsArr: ['英語を話せる！'],
        smartphoneModel: 'g06',
        smartphoneComment: `月額無料でスマホを利用したい！ということで買った端末です。電話としては機能してるけど、これでゲームをやるのは難しそうです。`,
        tabletModel: 'Google Nexus 9 Wi-Fiモデル 32GB',
        tabletComment: `2015年に買ったタブレットなので最近はブラウザをチェックするだけでも重い…。`,
        pcModel: '自作PC',
        pcComment: `BTOで買ったPCが壊れそうになったので、ケースや光学ドライブなを流用しながらパーツを新しくしました。HDからSSDに移行したときはその速さに驚きましたね！容量があまりないので大量にゲームをインストールできないのですが、高速なのでなんとかSSDでやりくりしていきたいです。
    
    グラボを積んでいないのですが、Ryzen 3 2200Gの機能で昔のゲームや2Dゲームなら普通に動きます。比較的最近のゲームですが、ダーケストダンジョンもいけました。`,
        pcSpecsObj: {
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
          keyboard: 'Microsoft Keyboard With Fingerprint Reader',
        },
        hardwareActiveArr: ['P0UG-LHOQ', 'n3wYKZ_ao', 'TdK3Oc-yV', 'Zd_Ia4Hwm', 'qk9DiUwN-', 'SXybALV1f', 'YNZ6nb1Ki', '8RERfeQQ9'],
        hardwareInactiveArr: ['I-iu-WmkO', 'KyOSlwcLk', 'eKmDxi8lX', 'lBSGQeGmx', '45syCFviA', '_z4DBLYNi', 'HATpnt7sl', 'M7YVRglvr'],
        ids_idsArr: ['GcymNACvc', 'mDuSVm6S7', 'n4I1BDtxH', 'L00bEpD46', '8bJV9G6MU', 'UVOFSNbXR'],
        activityTimeArr: [
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
        lookingForFriends: true,
        lookingForFriendsIcon: 'emoji_u1f61c',
        lookingForFriendsComment: 'ゲーム配信をしているので、その際に一緒に遊べる人がいればいいなと思ってます。学生から社会人の方まで、誰でもフレンド申請してもらってOKです。ただ配信外ではひとりで遊ぶのが好きなので、招待をもらっても応えられないのですが、それでもいい方はぜひフレンドになってください。',
        voiceChat: false,
        voiceChatComment: 'ボイスチャットはゲーム配信のときにどうしても必要になったら使いますが、基本的には使っていません。',
        linkArr: [
          {
            _id: 'FbbgE5PTW',
            type: 'Twitter',
            label: '',
            url: 'https://twitter.com/',
          },
          {
            _id: 'VMp_Vlk_V',
            type: 'Facebook',
            label: '',
            url: 'https://www.facebook.com/',
          },
          {
            _id: 'IqNtEQQsO',
            type: 'Instagram',
            label: '',
            url: 'https://www.instagram.com/',
          },
          {
            _id: 'yBC3AHqrP',
            type: 'YouTube',
            label: '',
            url: 'https://www.youtube.com/',
          },
          {
            _id: 'YD8DHCvb_',
            type: 'Twitch',
            label: '',
            url: 'https://www.twitch.tv/',
          },
          {
            _id: '8u2ht4NLv',
            type: 'Steam',
            label: '',
            url: 'https://store.steampowered.com/',
          },
          {
            _id: 'UxQZSjwRr',
            type: 'Discord',
            label: '',
            url: 'https://discordapp.com/',
          },
          {
            _id: 'rHLKWD-1B',
            type: 'Flickr',
            label: '',
            url: 'https://www.flickr.com/',
          },
          {
            _id: '7iq2JagxP',
            type: 'Tumblr',
            label: '',
            url: 'https://www.tumblr.com/',
          },
          {
            _id: '3tx98YDjT',
            type: 'Pinterest',
            label: '',
            url: 'https://www.pinterest.jp/',
          },
          {
            _id: 'zcPp3XyEw',
            type: 'Other',
            label: '開発サイト',
            url: 'http://dev-1.gameusers.org:8080/',
          },
        ],
        search: true,
      },
      
      
      {
        _id: 'WAMuArrBZ',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: 'P7UJMuUnx',
        language: 'ja',
        name: 'ジョナサン・ジョースター',
        status: 'オーバードライブ',
        imagesAndVideos_id: '',
        imagesAndVideosThumbnail_id: '',
        comment: `サブタイトルというのは例えば、ドラゴンクエストIII そして伝説へ… 「そして伝説へ…」の部分になります。未記入でも問題ありません。

ゲームを登録するとゲームページが同時に作成されます。登録直後はゲームページのURLは以下のようにランダムな文字列に設定され、運営が確認後、正式なURLに置き換わります。URLをブラウザのお気に入りに入れたり、ブログなどに掲載する場合は気をつけてください。`,
        age: '1868-04-04T00:00:00Z',
        ageAlternativeText: '',
        sex: 'male',
        sexAlternativeText: '',
        address: '',
        addressAlternativeText: 'イギリス',
        gamingExperience: '1878-04-04T00:00:00Z',
        gamingExperienceAlternativeText: '',
        hobbiesArr: ['サンライトイエローオーバードライブ', 'ターコイズブルーオーバードライブ', 'メタルシルバーオーバードライブ'],
        specialSkillsArr: ['英国貴族'],
        smartphoneModel: '',
        smartphoneComment: ``,
        tabletModel: '',
        tabletComment: ``,
        pcModel: '',
        pcComment: ``,
        pcSpecsObj: {
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
          keyboard: '',
        },
        hardwareActiveArr: ['P0UG-LHOQ', 'n3wYKZ_ao', 'TdK3Oc-yV', 'Zd_Ia4Hwm', 'qk9DiUwN-', 'SXybALV1f', 'YNZ6nb1Ki', '8RERfeQQ9'],
        hardwareInactiveArr: ['I-iu-WmkO', 'KyOSlwcLk', 'eKmDxi8lX', 'lBSGQeGmx', '45syCFviA', '_z4DBLYNi', 'HATpnt7sl', 'M7YVRglvr'],
        ids_idsArr: [],
        activityTimeArr: [
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
        lookingForFriends: true,
        lookingForFriendsIcon: 'emoji_u1f47f',
        lookingForFriendsComment: '',
        voiceChat: true,
        voiceChatComment: '',
        linkArr: [
          {
            _id: 'KFOJ-nwgq',
            type: 'Twitter',
            label: '',
            url: 'https://twitter.com/',
          },
        ],
        search: true,
      },
      
      
      {
        _id: 'MwsJKtJ3m',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: '6GWOpEcD3',
        language: 'ja',
        name: 'User No.3',
        status: 'ステータス',
        imagesAndVideos_id: '',
        imagesAndVideosThumbnail_id: '',
        comment: `test comment`,
        age: '2000-01-01T00:00:00Z',
        ageAlternativeText: '',
        sex: 'female',
        sexAlternativeText: '',
        address: '',
        addressAlternativeText: '天国',
        gamingExperience: '2010-01-01T00:00:00Z',
        gamingExperienceAlternativeText: '',
        hobbiesArr: ['趣味'],
        specialSkillsArr: ['特技'],
        smartphoneModel: '',
        smartphoneComment: ``,
        tabletModel: '',
        tabletComment: ``,
        pcModel: '',
        pcComment: ``,
        pcSpecsObj: {
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
          keyboard: '',
        },
        hardwareActiveArr: ['P0UG-LHOQ'],
        hardwareInactiveArr: ['I-iu-WmkO'],
        ids_idsArr: [],
        activityTimeArr: [
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
        lookingForFriends: true,
        lookingForFriendsIcon: 'emoji_u1f47f',
        lookingForFriendsComment: '',
        voiceChat: true,
        voiceChatComment: '',
        linkArr: [
          {
            _id: 'qhvbe8GRl',
            type: 'Twitter',
            label: '',
            url: 'https://twitter.com/',
          },
        ],
        search: true,
      },
      
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
      
      
      // user 1 - main
      {
        
        _id: 'wLZYxmd29v',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: '',
        type: 'ur',
        images: 1,
        videos: 0,
        arr: [
          
          {
            _id: 'tiBqEMkgbq',
            type: 'image',
            imageType: 'JPEG',
            srcSetArr: [
              {
                _id: 'uBkS3jRqH',
                w: '320w',
                width: 320,
                height: 180,
              },
              {
                _id: 'NSsnd9zcE',
                w: '480w',
                width: 480,
                height: 270,
              },
              {
                _id: 'Pxi5lfzAK',
                w: '640w',
                width: 640,
                height: 360,
              },
              {
                _id: '7Y1Ojv7HFP',
                w: '800w',
                width: 800,
                height: 450,
              },
              {
                _id: 'PUefcK6Sf',
                w: '1920w',
                width: 1920,
                height: 1080,
              }
            ]
          },
          
        ]
        
      },
      
      
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
        // main: false,
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
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
        // main: false,
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
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
        // main: false,
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
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
        // main: false,
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
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
        // main: false,
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
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
        // main: false,
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
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
        replies: 2,
        images: 0,
        videos: 0,
        // main: true,
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
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
        // main: true,
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
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
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
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
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
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
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
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
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
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
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
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
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
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
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
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
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
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
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
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
            comment: `GC / Thread: H6pB91tMq / Comment 1`,
          }
        ],
        imagesAndVideos_id: '',
        anonymity: false,
        goods: 0,
        replies: 2,
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
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
            comment: `GC / Thread: H6pB91tMq - Comment: q8KUQI6xk / Reply 1`,
          }
        ],
        imagesAndVideos_id: '',
        anonymity: false,
        goods: 0,
        replies: 0,
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      // GC 返信2
      {
        _id: 'NpPCP5DfL',
        createdDate: '2020-05-02T00:00:00Z',
        updatedDate: '2020-05-02T00:00:00Z',
        gameCommunities_id: 'Jk92aglWl',
        userCommunities_id: '',
        forumThreads_id: 'H6pB91tMq',
        forumComments_id: 'q8KUQI6xk',
        replyToForumComments_id: '',
        users_id: 'jun-deE4J',
        localesArr: [
          {
            _id: 'N2t2wbgnz',
            language: 'ja',
            name: '',
            comment: `GC / Thread: H6pB91tMq - Comment: q8KUQI6xk / Reply 2`,
          }
        ],
        imagesAndVideos_id: '',
        anonymity: false,
        goods: 0,
        replies: 0,
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
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
        createdDate: '2020-04-25T00:00:00Z',
        updatedDate: '2020-04-25T00:00:00Z',
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
        webPushAvailable: true,
        webPushes_id: 'nOVilxpSk',
        publicCommentsUsers_idsArr: [],
        publicApprovalUsers_idsArrr: [],
        comments: 2,
        replies: 4,
        images: 1,
        videos: 0,
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      {
        _id: 'jlpBu0RfB',
        createdDate: '2020-04-20T00:00:00Z',
        updatedDate: '2020-04-20T00:00:00Z',
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

賛成の旨を応へ、手紙一本書く間を待ち給へ、と二階へあがつた。窓からは、暮色の波に揺れる一���の稲田が、もう遥の山々は空との境もなく深い宵暗やみに閉ざされてゐるので――沼の観であつた。向ふ岸に一点の灯が見ゆるのだ。

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
        // close: false,
        webPushAvailable: true,
        webPushes_id: 'CLza57t8J',
        publicCommentsUsers_idsArr: [],
        publicApprovalUsers_idsArrr: [],
        comments: 2,
        replies: 2,
        images: 0,
        videos: 0,
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      {
        _id: 'JWHzs2yPs',
        createdDate: '2020-04-10T00:00:00Z',
        updatedDate: '2020-04-10T00:00:00Z',
        gameCommunities_id: 'Jk92aglWl',
        users_id: 'jun-deE4J',
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
        // close: false,
        webPushAvailable: false,
        webPushes_id: '',
        publicCommentsUsers_idsArr: [],
        publicApprovalUsers_idsArrr: [],
        comments: 0,
        replies: 0,
        images: 0,
        videos: 0,
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
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
        webPushAvailable: true,
        webPushes_id: 'nOVilxpSk',
        goods: 0,
        replies: 3,
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
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
        webPushAvailable: false,
        webPushes_id: '',
        goods: 0,
        replies: 1,
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      {
        _id: '4obJ8p4vf',
        createdDate: '2020-04-20T00:00:00Z',
        updatedDate: '2020-04-20T00:00:00Z',
        gameCommunities_id: 'Jk92aglWl',
        recruitmentThreads_id: 'jlpBu0RfB',
        users_id: '',
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
        webPushAvailable: true,
        webPushes_id: 'L4D5QB9p4',
        goods: 0,
        replies: 2,
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      {
        _id: 'Aurd8jeZo',
        createdDate: '2020-04-20T00:00:00Z',
        updatedDate: '2020-04-20T00:00:00Z',
        gameCommunities_id: 'Jk92aglWl',
        recruitmentThreads_id: 'jlpBu0RfB',
        users_id: 'P7UJMuUnx',
        localesArr: [
          {
            _id: '5KFh5AcSe',
            language: 'ja',
            name: '',
            comment: `土佐の侍で大塚と云う者があった。`,
          },
        ],
        imagesAndVideos_id: '',
        ids_idsArr: [],
        publicIDsArr: [
          {
            _id: '3FtqFd_H0',
            platform: 'Discord',
            id: 'Discord-ID-1',
          },
        ],
        publicInformationsArr: [
          {
            _id: 'AFrkLOpDi',
            title: 'レベル',
            information: '15以上',
          },
        ],
        publicSetting: 1,
        webPushAvailable: false,
        webPushes_id: '',
        goods: 0,
        replies: 0,
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
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
        createdDate: '2020-04-30T00:00:00Z',
        updatedDate: '2020-04-30T00:00:00Z',
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
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
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
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      {
        _id: 'MBLunx-i8',
        createdDate: '2020-04-28T00:00:00Z',
        updatedDate: '2020-04-28T00:00:00Z',
        gameCommunities_id: 'Jk92aglWl',
        recruitmentThreads_id: 'nEQMNMWDy',
        recruitmentComments_id: 'hSe73CMkq',
        replyToRecruitmentReplies_id: 'XHNLEQl8N',
        users_id: '',
        localesArr: [
          {
            _id: '-z0YaCcr-',
            language: 'ja',
            name: '',
            comment: `なつかしき世の園の夢を見る
かつて草花は人のごとき名を持ち
どうにも姿もふしぎで
紳士淑女よろしく振る舞ったという`,
          },
        ],
        imagesAndVideos_id: '',
        goods: 0,
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      {
        _id: 'fcMpYaofl',
        createdDate: '2020-04-30T00:00:00Z',
        updatedDate: '2020-04-30T00:00:00Z',
        gameCommunities_id: 'Jk92aglWl',
        recruitmentThreads_id: 'nEQMNMWDy',
        recruitmentComments_id: 'oMXuuwr61',
        replyToRecruitmentReplies_id: '',
        users_id: '',
        localesArr: [
          {
            _id: '7tDhHbZH3',
            language: 'ja',
            name: '',
            comment: `寿永四年五月、長門国ながとのくに壇の浦のゆうぐれ。あたりは一面の砂地にて、所々に磯馴松そなれまつの大樹あり。正面には海をへだてて文字ヶ関遠くみゆ。浪の音、水鳥の声。`,
          },
        ],
        imagesAndVideos_id: '',
        goods: 0,
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      {
        _id: '7_PH3n0CK',
        createdDate: '2020-04-21T00:00:00Z',
        updatedDate: '2020-04-21T00:00:00Z',
        gameCommunities_id: 'Jk92aglWl',
        recruitmentThreads_id: 'jlpBu0RfB',
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
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
        ip: '192.168.1.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      },
      
      
      {
        _id: 'Zc6uT0_nZ',
        createdDate: '2020-04-27T00:00:00Z',
        updatedDate: '2020-04-27T00:00:00Z',
        gameCommunities_id: 'Jk92aglWl',
        recruitmentThreads_id: 'jlpBu0RfB',
        recruitmentComments_id: '4obJ8p4vf',
        replyToRecruitmentReplies_id: '',
        users_id: '',
        localesArr: [
          {
            _id: 'gacLNlKX9',
            language: 'ja',
            name: '明暗',
            comment: `智子が、盲目の青年北田三木雄に嫁いだことは、親戚や友人たちを驚かした。
「ああいう能力に自信のある女はえて物好きなことをするものだ」
「男女の親和力というものは別ですわ。夫婦になるのは美学のためじゃあるまいし」
　批評まちまちであった。`,
          },
        ],
        imagesAndVideos_id: '',
        goods: 0,
        acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
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
    //   DB / Notifications
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Save Object
    // ---------------------------------------------
    
    saveArr = [
      
      {
        _id: '9gTlOvikG',
        createdDate: ISO8601,
        done: false,
        type: 'recruitment-comments',
        arr: [
          {
            _id: 'nEQMNMWDy',
            type: 'target',
            db: 'recruitment-threads',
          },
          {
            _id: 'hSe73CMkq',
            type: 'source',
            db: 'recruitment-comments',
          }
        ],
      },
      
      
      {
        _id: 'NU5yPlASn',
        createdDate: ISO8601,
        done: false,
        type: 'recruitment-comments',
        arr: [
          {
            _id: 'nEQMNMWDy',
            type: 'target',
            db: 'recruitment-threads',
          },
          {
            _id: 'oMXuuwr61',
            type: 'source',
            db: 'recruitment-comments',
          }
        ],
      },
      
      
      {
        _id: 'GH6kxeQcW',
        createdDate: ISO8601,
        done: false,
        type: 'recruitment-replies',
        arr: [
          {
            _id: 'nEQMNMWDy',
            type: 'target',
            db: 'recruitment-threads',
          },
          {
            _id: 'hSe73CMkq',
            type: 'target',
            db: 'recruitment-comments',
          },
          {
            _id: 'pd4s2Arht',
            type: 'source',
            db: 'recruitment-replies',
          }
        ],
      },
      
      
      {
        _id: 'lNIw3G90G',// 要チェック
        createdDate: ISO8601,
        done: false,
        type: 'recruitment-comments',
        arr: [
          {
            _id: 'jlpBu0RfB',
            type: 'target',
            db: 'recruitment-threads',
          },
          {
            _id: 'Aurd8jeZo',
            type: 'source',
            db: 'recruitment-comments',
          }
        ],
      },
      
      
      {
        _id: 'OSJX-B9Zj',
        createdDate: ISO8601,
        done: false,
        type: 'recruitment-replies',
        arr: [
          {
            _id: 'jlpBu0RfB',
            type: 'target',
            db: 'recruitment-threads',
          },
          {
            _id: '4obJ8p4vf',
            type: 'target',
            db: 'recruitment-comments',
          },
          {
            _id: '7_PH3n0CK',
            type: 'source',
            db: 'recruitment-replies',
          }
        ],
      },
      
    ];
    
    
    // ---------------------------------------------
    //   Insert
    // ---------------------------------------------
    
    await SchemaNotifications.deleteMany({ reset: true });
    returnObj = await SchemaNotifications.insertMany({ saveArr });
    
    
    
    
    // --------------------------------------------------
    //   DB / Web Push
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Save Object
    // ---------------------------------------------
    
    saveArr = [
      
      {
        _id: 'nOVilxpSk',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        sendDate: '',
        users_id: 'jun-deE4J',
        subscriptionObj: {// 2020/5/21 登録
          endpoint: 'https://fcm.googleapis.com/fcm/send/cOsJ3EXpj2E:APA91bHnycUwE37fsnmlRNYEuJYx_kf67jaq7CFmr7oFIGzIqRk8tXi8BhHmtCfL7MlMjhyYoFwhhvLMx7sfUCqh00wDXVIovAp5hamTe2UWGDF4QUd4Z8VRNkNcrQadHGUuy7k-Jqbd',
          keys: {
            p256dh: 'BCCZ55xYxmC_6JNemzKc1FzAiz-fUEz4xCA3WXqVq2MRBaSJA3SUKtlY_G_747sT2C0Xm6QJD4L7KKzunNtj-Zo',
            auth: 'EYpxeXGdImUIaTpBqVca0A'
          }
        },
        sendTotalCount: 0,
        sendTodayCount: 0,
        errorCount: 0,
      },
      
      
      {
        _id: 'L4D5QB9p4',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        sendDate: '',
        users_id: '',
        subscriptionObj: {// 無効
          endpoint: 'https://fcm.googleapis.com/fcm/send/fCVMofN4BLo:APA91bFShjo-hy02fDaVOpLDHQE_TaRRCPSG1IJIc_2qhndZuqkC67x4_RFbWp5uH4I11SKRdxpVquPQP59QNcomJw4irs0F-EWqOUu6ydVDMZ0Gau92YGmEV36SSO5a63vxUet7wEIo',
          keys: {
            p256dh: 'BLPT_K71Dk35Le_w0eyviBXXNRBsaZc-5o1-D0VKp18XW_N4wCPyzilZE-j0V-eJ4Cz5irqOZt0nePNG8zLDdaQ',
            auth: '0MuLywCY4rbTg5I2_nFEOQ'
          }
        },
        sendTotalCount: 0,
        sendTodayCount: 0,
        errorCount: 0,
      },
      
      
      {
        _id: 'CLza57t8J',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        sendDate: '',
        users_id: '',
        subscriptionObj: {// 無効
          endpoint: 'https://fcm.googleapis.com/fcm/send/e6F4KGu-As8:APA91bG1gOOMc64c2evGr5HuV5aKYEN3chUbX1e-QXeGLo0nNqY8CBAo8g_xlIJe7WdD5lTfmngVIiZ7VeM-Y3IRWmRUaC7aFmLqpJ_Izx8DUyXbQfbgIYgAjbSmpurnYqPWOHQdtWcA',
          keys: {
            p256dh: 'BA2MsGrPd4bQ691bM_GphDgxIaWyChKKTiY1OGQWYE6xtfHp0kKCVSUlmElA4sijdO6svSMMJUxYRdt5WlgUKRk',
            auth: 'YlNqB1Pq8GIaCxe4HQAJ-A'
          }
        },
        sendTotalCount: 0,
        sendTodayCount: 0,
        errorCount: 0,
      },
      
      
    ];
    
    
    // ---------------------------------------------
    //   Insert
    // ---------------------------------------------
    
    await SchemaWebPushes.deleteMany({ reset: true });
    returnObj = await SchemaWebPushes.insertMany({ saveArr });
    
    
    
    
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