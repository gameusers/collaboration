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
const { setAuthority, verifyAuthority } = require('../../@modules/authority');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationInteger } = require('../../@validations/integer');
const { validationIP } = require('../../@validations/ip');

const { validationUserCommunities_idServer } = require('../user-communities/validations/_id-server');

const { validationForumThreads_idServer } = require('./validations/_id-server');
const { validationForumThreadsForListLimit, validationForumThreadsLimit } = require('./validations/limit');
const { validationForumThreadsName } = require('./validations/name');
const { validationForumThreadsComment } = require('./validations/comment');


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
//   スレッド作成・編集 / endpointID: XfDc_r3br
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
    
    const { userCommunities_id, forumThreads_id, name, comment, imagesAndVideosObj } = req.body;
    
    lodashSet(requestParametersObj, ['userCommunities_id'], userCommunities_id);
    lodashSet(requestParametersObj, ['forumThreads_id'], forumThreads_id);
    lodashSet(requestParametersObj, ['name'], name);
    lodashSet(requestParametersObj, ['comment'], comment);
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
    await validationForumThreadsComment({ throwError: true, value: comment });
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
      
      
      // 画像＆動画がすべて削除されている場合は、imagesAndVideos_idを空にする
      const arr = lodashGet(imagesAndVideosSaveObj, ['arr'], []);
      
      if (arr.length === 0) {
        imagesAndVideos_id = '';
      } else {
        imagesAndVideos_id = lodashGet(imagesAndVideosSaveObj, ['_id'], '');
      }
      
      
      imagesAndVideosConditionObj = {
        _id: lodashGet(imagesAndVideosSaveObj, ['_id'], ''),
      };
      
      
      // console.log(`
      //   ----- imagesAndVideosSaveObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosSaveObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
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
          comment,
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
    
    
    
    // const authority1 = verifyAuthority({ req, _id: forumThreads_id });
    
    // console.log(chalk`
    //   authority1: {green ${authority1}}
    // `);
    
    
    // --------------------------------------------------
    //   Set Authority
    // --------------------------------------------------
    
    if (!forumThreads_id) {
      setAuthority({ req, _id: forumThreadsConditionObj._id });
    }
    
    // const authority2 = verifyAuthority({ req, _id: forumThreads_id });
    
    // console.log(chalk`
    //   authority2: {green ${authority2}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   userCommunities_id: {green ${userCommunities_id}}
    //   forumThreads_id: {green ${forumThreads_id}}
    //   name: {green ${name} / ${typeof name}}
    //   comment: {green ${comment} / ${typeof comment}}
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




module.exports = router;