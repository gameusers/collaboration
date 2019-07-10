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
const upload = multer({
  dest: 'static/',
  limits: { fieldSize: 5 * 1024 * 1024 },
});

const shortid = require('shortid');
const moment = require('moment');
const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../@modules/csrf');
const { returnErrorsArr } = require('../../@modules/log/log');
const { CustomError } = require('../../@modules/error/custom');
const { imageSave } = require('../../@modules/image-server');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationInteger } = require('../../@validations/integer');
const { validationIP } = require('../../@validations/ip');

const { validationUserCommunities_idServer } = require('../user-communities/validations/_id-server');

const { validationForumThreads_idServer } = require('./validations/_id-server');
const { validationForumThreadsLimit } = require('./validations/limit');
const { validationForumThreadsName } = require('./validations/name');
const { validationForumThreadsDescription } = require('./validations/description');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelForumThreads = require('./model');
const ModelUserCommunities = require('../../@database/user-communities/model');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { addLocaleData } = require('react-intl');
const en = require('react-intl/locale-data/en');
const ja = require('react-intl/locale-data/ja');
addLocaleData([...en, ...ja]);

const { locale } = require('../../@locales/locale');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();




// --------------------------------------------------
//   Status Code & Error Arguments Object
// --------------------------------------------------

let statusCode = 400;




// --------------------------------------------------
//   スレッド一覧 読み込み / ユーザーコミュニティ用 / endpointID: WM1-TR3MY
// --------------------------------------------------

router.post('/list-uc', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: req.headers['accept-language']
  });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const returnObj = {};
  const requestParametersObj = {};
  const loginUsers_id = lodashGet(req, ['user', '_id'], '');
  
  
  try {
    
    
    // --------------------------------------------------
    //   POST Data
    // --------------------------------------------------
    
    const { userCommunities_id, page, limit } = req.body;
    
    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    
    lodashSet(requestParametersObj, ['userCommunities_id'], userCommunities_id);
    lodashSet(requestParametersObj, ['page'], pageInt);
    lodashSet(requestParametersObj, ['limit'], limitInt);
    
    // console.log(chalk`
    //   userCommunities_id: {green ${userCommunities_id}}
    //   page: {green ${pageInt} / ${typeof pageInt}}
    //   limit: {green ${limitInt} / ${typeof limitInt}}
    // `);
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    await validationUserCommunities_idServer({ value: userCommunities_id });
    await validationInteger({ throwError: true, required: true, value: pageInt });
    await validationForumThreadsLimit({ throwError: true, required: true, value: limitInt });
    
    
    // --------------------------------------------------
    //   DB find / Forum Threads
    // --------------------------------------------------
    
    returnObj.forumThreadsObj = await ModelForumThreads.findForForumThreads({
      localeObj,
      loginUsers_id,
      userCommunities_id,
      page: pageInt,
      limit: limitInt,
    });
    
    
    // --------------------------------------------------
    //   DB find / User Communities
    // --------------------------------------------------
    
    const userCommunityArr = await ModelUserCommunities.find({
      conditionObj: {
        _id: userCommunities_id
      }
    });
    
    returnObj.updatedDateObj = lodashGet(userCommunityArr, [0, 'updatedDateObj'], {});
    
    
    // ---------------------------------------------
    //   Success
    // ---------------------------------------------
    
    return res.status(200).json(returnObj);
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   Log
    // ---------------------------------------------
    
    const resultErrorObj = returnErrorsArr({
      errorObj,
      endpointID: 'WM1-TR3MY',
      users_id: loginUsers_id,
      ip: req.ip,
      requestParametersObj,
    });
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
  
});




// --------------------------------------------------
//   スレッド作成 / endpointID: XfDc_r3br
// --------------------------------------------------

router.post('/create-uc', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: req.headers['accept-language']
  });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const returnObj = {};
  const requestParametersObj = {};
  const loginUsers_id = lodashGet(req, ['user', '_id'], '');
  
  
  try {
    
    
    // --------------------------------------------------
    //   POST Data
    // --------------------------------------------------
    
    const { userCommunities_id, forumThreads_id, name, description, imagesAndVideosObj } = req.body;
    
    lodashSet(requestParametersObj, ['userCommunities_id'], userCommunities_id);
    lodashSet(requestParametersObj, ['forumThreads_id'], forumThreads_id);
    lodashSet(requestParametersObj, ['name'], name);
    lodashSet(requestParametersObj, ['description'], description);
    lodashSet(requestParametersObj, ['imagesAndVideosObj'], {});
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    if (userCommunities_id) {
      await validationUserCommunities_idServer({ value: userCommunities_id });
    } else {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'WNajTF52g', messageID: '1YJnibkmh' }] });
    }
    
    await validationForumThreadsName({ throwError: true, value: name });
    await validationForumThreadsDescription({ throwError: true, value: description });
    await validationIP({ throwError: true, value: req.ip });
    
    
    // --------------------------------------------------
    //   DB find / Forum Threads / スレッドがすでに存在するかチェック
    // --------------------------------------------------
    
    const count = await ModelForumThreads.count({
      conditionObj: {
        userCommunities_id,
        'localesArr.name': name,
        'localesArr.description': description,
      }
    });
    
    // console.log(chalk`
    //   count: {green ${count}}
    // `);
    
    if (count > 0) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'SLheO9BQf', messageID: '8ObqNYJ85' }] });
    }
    
    
    
    
    
    
    
    
    
    // --------------------------------------------------
    //   forum-threads
    // --------------------------------------------------
    
    const forumThreadsConditionObj = {
      _id: shortid.generate(),
    };
    
    
    const parsedImagesAndVideosObj = JSON.parse(imagesAndVideosObj);
    
    const ISO8601 = moment().toISOString();
    
    const forumThreadsSaveObj = {
      createdDate: ISO8601,
      updatedDate: ISO8601,
      userCommunities_id,
      users_id: loginUsers_id,
      localesArr: [
        {
          _id: shortid.generate(),
          language: localeObj.language,
          name,
          description,
        }
      ],
      imagesAndVideosObj: parsedImagesAndVideosObj,
      comments: 0,
      images: 0,
      videos: 0,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    };
    
    
    // --------------------------------------------------
    //   画像を保存する
    // --------------------------------------------------
    
    
    
    // console.log(`
    //   ----- imagesAndVideosObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`\n---------- imagesAndVideosObj ----------\n`);
    // console.dir(imagesAndVideosObj);
    // console.log(`\n-----------------------------------\n`);
    
    
    console.log(`\n---------- parsedImagesAndVideosObj ----------\n`);
    console.dir(parsedImagesAndVideosObj);
    console.log(`\n-----------------------------------\n`);
    
    // console.log('画像を保存する');
    
    // console.log(chalk`
    //   forumThreadsConditionObj._id: {green ${forumThreadsConditionObj._id}}
    // `);
    
    if (parsedImagesAndVideosObj.mainArr) {
      
      // console.log('処理開始');
      
      const mainArr = await imageSave({
        newArr: parsedImagesAndVideosObj.mainArr,
        directoryPath: `static/img/forum/${forumThreadsConditionObj._id}/main/`,
      });
      
      // console.log(`
      //   ----- mainArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(mainArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // if (mainArr.length > 0) {
        forumThreadsSaveObj.imagesAndVideosObj = {
          mainArr,
        };
      // }
      
    }
    
    
    // console.log(`
    //   ----- forumThreadsSaveObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(forumThreadsSaveObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    // --------------------------------------------------
    //   user-communities
    // --------------------------------------------------
    
    const userCommunitiesConditionObj = {
      _id: userCommunities_id,
    };
    
    
    const userCommunitiesSaveObj = {
      updatedDate: ISO8601,
      'updatedDateObj.thread': ISO8601,
      $inc: { 'forumObj.threadCount': 1 }
    };
    
    
    // console.log(chalk`
    //   userCommunities_id: {green ${userCommunities_id}}
    //   name: {green ${name} / ${typeof name}}
    //   description: {green ${description} / ${typeof description}}
    //   IP: {green ${req.ip}}
    //   User Agent: {green ${req.headers['user-agent']}}
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumThreadsSaveObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(forumThreadsSaveObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- localeObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(localeObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // 
    
    
    // --------------------------------------------------
    //   DB find / Forum Threads
    // --------------------------------------------------
    
    await ModelForumThreads.transactionForThread({
      forumThreadsConditionObj,
      forumThreadsSaveObj,
      userCommunitiesConditionObj,
      userCommunitiesSaveObj,
    });
    
    
    
    
    
    
    
    // --------------------------------------------------
    //   DB find / Forum Threads
    // --------------------------------------------------
    
    // returnObj.forumThreadsObj = await ModelForumThreads.findForForumThreads({
    //   localeObj,
    //   loginUsers_id,
    //   userCommunities_id,
    //   page: 1,
    //   limit: parseInt(limit, 10),
    // });
    
    
    // --------------------------------------------------
    //   DB find / User Communities
    // --------------------------------------------------
    
    const userCommunityArr = await ModelUserCommunities.find({
      conditionObj: {
        _id: userCommunities_id
      }
    });
    
    returnObj.updatedDateObj = lodashGet(userCommunityArr, [0, 'updatedDateObj'], {});
    
    
    
    
    // ---------------------------------------------
    //   Success
    // ---------------------------------------------
    
    return res.status(200).json(returnObj);
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   Log
    // ---------------------------------------------
    
    const resultErrorObj = returnErrorsArr({
      errorObj,
      endpointID: 'XfDc_r3br',
      users_id: loginUsers_id,
      ip: req.ip,
      requestParametersObj,
    });
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
  
});




module.exports = router;