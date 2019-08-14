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
  limits: { fieldSize: 25 * 1024 * 1024 },// 25MB
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
const { formatAndSave } = require('../../@modules/image/save');


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
    
    returnObj.forumThreadsForListObj = await ModelForumThreads.findForList({
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

router.post('/upsert-uc', upload.none(), async (req, res, next) => {
  
  
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
    //   DB find / Forum Threads / スレッドが存在するかチェック
    // --------------------------------------------------
    
    let oldObj = {};
    
    if (forumThreads_id) {
      
      const tempOldObj = await ModelForumThreads.findForEdit({
        localeObj,
        loginUsers_id,
        forumThreads_id,
      });
      
      // console.log(`
      //   ----- tempOldObj -----\n
      //   ${util.inspect(tempOldObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      oldObj = lodashGet(tempOldObj, ['imagesAndVideosObj'], {});
      
      if (Object.keys(tempOldObj).length === 0) {
        throw new CustomError({ level: 'error', errorsArr: [{ code: 'ERb2Rej4K', messageID: 'cvS0qSAlE' }] });
      }
      
      
    // --------------------------------------------------
    //   DB find / Forum Threads / 同じ名前のスレッドが存在するかチェック
    // --------------------------------------------------
      
    } else {
      
      const count = await ModelForumThreads.count({
        conditionObj: {
          userCommunities_id,
          'localesArr.name': name,
        }
      });
      
      // console.log(chalk`
      //   count: {green ${count}}
      // `);
      
      if (count > 0) {
        throw new CustomError({ level: 'warn', errorsArr: [{ code: 'SLheO9BQf', messageID: '8ObqNYJ85' }] });
      }
      
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Datetime
    // --------------------------------------------------
    
    const ISO8601 = moment().toISOString();
    
    
    // --------------------------------------------------
    //   画像を保存する
    // --------------------------------------------------
    
    let imagesAndVideosConditionObj = {};
    let imagesAndVideosSaveObj = {};
    let imagesAndVideos_id = '';
    
    if (imagesAndVideosObj) {
      
      const parsedImagesAndVideosObj = JSON.parse(imagesAndVideosObj);
      
      // console.log(`
      //   ----- parsedImagesAndVideosObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(parsedImagesAndVideosObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      imagesAndVideosSaveObj = await formatAndSave({
        newObj: parsedImagesAndVideosObj,
        oldObj,
        loginUsers_id,
        ISO8601,
      });
      
      
      imagesAndVideos_id = lodashGet(imagesAndVideosSaveObj, ['_id'], '');
      
      imagesAndVideosConditionObj = {
        _id: imagesAndVideos_id,
      };
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Insert
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   - forum-threads
    // ---------------------------------------------
    
    const forumThreadsConditionObj = {
      _id: shortid.generate(),
    };
    
    
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
      imagesAndVideos_id,
      comments: 0,
      images: 0,
      videos: 0,
      ip: req.ip,
      userAgent: lodashGet(req, ['headers', 'user-agent'], '')
    };
    
    
    // ---------------------------------------------
    //   - user-communities / 更新日時の変更＆スレッド数 + 1
    // ---------------------------------------------
    
    const userCommunitiesConditionObj = {
      _id: userCommunities_id,
    };
    
    
    const userCommunitiesSaveObj = {
      updatedDate: ISO8601,
      'updatedDateObj.forum': ISO8601,
      $inc: { 'forumObj.threadCount': 1 }
    };
    
    
    
    // --------------------------------------------------
    //   Update
    // --------------------------------------------------
    
    if (forumThreads_id) {
      
      
      // ---------------------------------------------
      //   - forum-threads
      // ---------------------------------------------
      
      forumThreadsConditionObj._id = forumThreads_id;
      
      delete forumThreadsSaveObj.createdDate;
      delete forumThreadsSaveObj.userCommunities_id;
      delete forumThreadsSaveObj.users_id;
      delete forumThreadsSaveObj.comments;
      delete forumThreadsSaveObj.images;
      delete forumThreadsSaveObj.videos;
      
      
      
      // ---------------------------------------------
      //   - user-communities / 更新日時の変更
      // ---------------------------------------------
      
      delete userCommunitiesSaveObj.$inc;
      
      
      // const userCommunitiesSaveObj = {
      //   updatedDate: ISO8601,
      //   'updatedDateObj.forum': ISO8601,
      //   $inc: { 'forumObj.threadCount': 1 }
      // };
      
    }
    
    
    
    
    // --------------------------------------------------
    //   DB insert Transaction / Forum Threads & Images And Videos & User Communities
    // --------------------------------------------------
    
    await ModelForumThreads.transactionForUpsertThread({
      forumThreadsConditionObj,
      forumThreadsSaveObj,
      imagesAndVideosConditionObj,
      imagesAndVideosSaveObj,
      userCommunitiesConditionObj,
      userCommunitiesSaveObj,
    });
    
    
    
    
    // --------------------------------------------------
    //   DB find / User Communities / 最新の更新日時情報を取得する
    // --------------------------------------------------
    
    const userCommunityArr = await ModelUserCommunities.find({
      conditionObj: {
        _id: userCommunities_id
      }
    });
    
    returnObj.updatedDateObj = lodashGet(userCommunityArr, [0, 'updatedDateObj'], {});
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   userCommunities_id: {green ${userCommunities_id}}
    //   forumThreads_id: {green ${forumThreads_id}}
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




// --------------------------------------------------
//   スレッド編集用データ取得 / endpointID: SzZdM6eQ6
// --------------------------------------------------

router.post('/get-edit-data', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: req.headers['accept-language']
  });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const requestParametersObj = {};
  const loginUsers_id = lodashGet(req, ['user', '_id'], '');
  
  
  try {
    
    
    // --------------------------------------------------
    //   POST Data
    // --------------------------------------------------
    
    const { forumThreads_id } = req.body;
    
    lodashSet(requestParametersObj, ['forumThreads_id'], forumThreads_id);
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    
    
    // --------------------------------------------------
    //   DB find / Forum Threads
    // --------------------------------------------------
    
    const returnObj = await ModelForumThreads.findForEdit({
      localeObj,
      loginUsers_id,
      forumThreads_id,
    });
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   forumThreads_id: {green ${forumThreads_id}}
    // `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(returnObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
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
      endpointID: 'SzZdM6eQ6',
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