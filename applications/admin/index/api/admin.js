// --------------------------------------------------
//   File ID: SInn-saE6
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

const { verifyCsrfToken } = require('../../../@modules/csrf');
const { errorCodeIntoErrorObj } = require('../../../@modules/error/error-obj');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

// const validation_id = require('../../../@validations/_id');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelGames = require('../../../@database/games/model');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();





// --------------------------------------------------
//   Initial Props / Function ID: zenm51Io4
// --------------------------------------------------

router.post('/insert', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  let returnObj = {};
  let statusCode = 400;
  
  let errorArgumentsObj = {
    fileId: 'SInn-saE6',
    functionId: 'zenm51Io4',
    errorCodeArr: [500000],
    errorObj: {},
  };
  
  
  try {
    
    
    // --------------------------------------------------
    //   CSRF
    // --------------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Login Check
    // --------------------------------------------------
    
    // if (!req.isAuthenticated()) {
    //   statusCode = 401;
    //   errorArgumentsObj.errorCodeArr = [101001];
    //   throw new Error();
    // }
    
    
    // --------------------------------------------------
    //   POST 取得 & Property
    // --------------------------------------------------
    
    // const { users_id } = req.body;
    
    
    // --------------------------------------------------
    //   Condition Object
    // --------------------------------------------------
    
    const conditionObj = { _id: 'w_zkqpr3R' || shortid.generate() };
    
    
    // --------------------------------------------------
    //   Save Object
    // --------------------------------------------------
    
    const date = moment().utcOffset(0);
    
    const saveObj = {
      createdDate: date,
      updatedDate: date,
      gameId: 'dead-by-daylight',
      thumbnail: false,
      imageVideoArr: [],
      dataArr: [
        {
          _id: 'VjSSBUYlJ',
          country: 'Japan',
          name: 'Dead by Daylight',
          subtitle: '',
          similarityArr: [
            'DbD'
          ],
          forSort: 'デッドバイデイライト',
          twitterHashtag: 'DeadbyDaylight',
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
              type: 'twitter',
              label: '',
              url: 'https://twitter.com/',
            },
            {
              _id: 'YPIzVEYuA',
              type: 'facebook',
              label: '',
              url: 'https://ja-jp.facebook.com/',
            },
            {
              _id: 'j14biyEhD',
              type: 'youtube',
              label: '',
              url: 'https://www.youtube.com/',
            },
            {
              _id: 'RAI0yDihN',
              type: 'steam',
              label: '',
              url: 'https://steamcommunity.com/',
            },
            {
              _id: 'BtePeoi0i',
              type: 'other',
              label: '開発サイト',
              url: 'http://35.203.143.160:8080/',
            },
          ]
        },
      ],
    };
    
    
    // --------------------------------------------------
    //   Model / Users / Follow
    // --------------------------------------------------
    
    returnObj = await ModelGames.upsert(conditionObj, saveObj);
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    console.log('AAA');
    
    // console.log(chalk`
    //   users_id: {green ${users_id}}
    // `);
    
    // console.log(`
    //   req.user: \n${util.inspect(req.user, { colors: true, depth: null })}
    //   req.query: \n${util.inspect(req.query, { colors: true, depth: null })}
    // `);
    
    // console.log(`
    //   ----- validation_idObj -----\n
    //   ${util.inspect(validation_idObj, { colors: true, depth: null })}\n
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