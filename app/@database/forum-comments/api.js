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

const { validationForumThreads_idServerUC } = require('../forum-threads/validations/_id-server');

const { validationForumCommentsLimit } = require('./validations/limit');
const { validationForumCommentsName } = require('./validations/name');
const { validationForumCommentsComment } = require('./validations/comment');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelForumComments = require('./model');
const ModelForumThreads = require('../forum-threads/model');
const ModelUserCommunities = require('../user-communities/model');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { locale } = require('../../@locales/locale');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();




// --------------------------------------------------
//   Status Code
// --------------------------------------------------

let statusCode = 400;




// --------------------------------------------------
//   コメント読み込み / endpointID: jbHqASXst
// --------------------------------------------------

router.post('/read-comments', upload.none(), async (req, res, next) => {
  
  
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
    
    const { gameCommunities_id, userCommunities_id, forumThreads_id, forumThreads_idArr, page, limit } = req.body;
    
    
    
    lodashSet(requestParametersObj, ['gameCommunities_id'], gameCommunities_id);
    lodashSet(requestParametersObj, ['userCommunities_id'], userCommunities_id);
    lodashSet(requestParametersObj, ['forumThreads_id'], forumThreads_id);
    lodashSet(requestParametersObj, ['forumThreads_idArr'], forumThreads_idArr);
    lodashSet(requestParametersObj, ['page'], page);
    lodashSet(requestParametersObj, ['limit'], limit);
    
    
    // console.log(chalk`
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   userCommunities_id: {green ${userCommunities_id}}
    //   forumThreads_id: {green ${forumThreads_id}}
    //   page: {green ${page} / ${typeof page}}
    //   limit: {green ${limit} / ${typeof limit}}
    // `);
    
    
    
    
    // ---------------------------------------------
    //   parse
    // ---------------------------------------------
    
    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    
    const parsedForumThreads_idArr = JSON.parse(forumThreads_idArr);
    
    // console.log(`
    //   ----- parsedForumThreads_idArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(parsedForumThreads_idArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    if (gameCommunities_id) {
      
    } else {
      
      await validationUserCommunities_idServer({ value: userCommunities_id });
      await validationForumThreads_idServerUC({ forumThreads_id, userCommunities_id });
      
    }
    
    await validationInteger({ throwError: true, required: true, value: pageInt });
    await validationForumCommentsLimit({ throwError: true, required: true, value: limitInt });
    
    
    
    // --------------------------------------------------
    //   DB find / Forum
    // --------------------------------------------------
    
    // const forumObj2 = await ModelForumThreads.findForThreads({
    //   req,
    //   localeObj,
    //   loginUsers_id,
    //   userCommunities_id,
    // });
    
    // returnObj.forumObj = forumObj.forumObj;
    // returnObj.forumThreadsObj = forumObj.forumThreadsObj;
    // returnObj.forumCommentsAndRepliesObj = forumObj.forumCommentsAndRepliesObj;
    
    
    // --------------------------------------------------
    //   DB find / Forum Threads
    // --------------------------------------------------
    
    const forumObj = await ModelForumThreads.findThreadsForChangeCommentRowsPerPage({
      req,
      localeObj,
      loginUsers_id,
      forumThreads_idArr: parsedForumThreads_idArr,
      commentPage: pageInt,
      commentLimit: limitInt,
    });
    
    returnObj.forumThreadsArr = forumObj.forumThreadsArr;
    returnObj.forumCommentsAndRepliesObj = forumObj.forumCommentsAndRepliesObj;
    
    
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
      endpointID: 'jbHqASXst',
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
//   コメント＆返信編集用データ取得 / endpointID: 8_ggnm_lH
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
    
    const { forumComments_id } = req.body;
    
    lodashSet(requestParametersObj, ['forumComments_id'], forumComments_id);
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   DB find / Forum Comments
    // --------------------------------------------------
    
    const returnObj = await ModelForumComments.findForEdit({
      req,
      localeObj,
      loginUsers_id,
      forumComments_id,
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
      endpointID: '8_ggnm_lH',
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
//   コメント作成・編集 / endpointID: ViCtroXyq
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
    
    const { userCommunities_id, forumThreads_id, forumComments_id, name, comment, anonymity, imagesAndVideosObj } = req.body;
    
    lodashSet(requestParametersObj, ['userCommunities_id'], userCommunities_id);
    lodashSet(requestParametersObj, ['forumThreads_id'], forumThreads_id);
    lodashSet(requestParametersObj, ['forumComments_id'], forumComments_id);
    lodashSet(requestParametersObj, ['name'], name);
    lodashSet(requestParametersObj, ['comment'], comment);
    lodashSet(requestParametersObj, ['anonymity'], anonymity);
    lodashSet(requestParametersObj, ['imagesAndVideosObj'], {});
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    await validationUserCommunities_idServer({ value: userCommunities_id });
    await validationForumThreads_idServerUC({ forumThreads_id, userCommunities_id });
    await validationForumCommentsName({ throwError: true, value: name });
    await validationForumCommentsComment({ throwError: true, value: comment });
    await validationIP({ throwError: true, value: req.ip });
    
    
    
    
    // --------------------------------------------------
    //   編集 - 編集するコメントが存在していない場合はエラー
    // --------------------------------------------------
    
    let oldImagesAndVideosObj = {};
    
    if (forumComments_id) {
      
      // データが存在しない、編集権限がない場合はエラーが投げられる
      const forumCommentsObj = await ModelForumComments.findForEdit({
        req,
        localeObj,
        loginUsers_id,
        forumComments_id,
      });
      
      // console.log(`
      //   ----- forumCommentsObj -----\n
      //   ${util.inspect(forumCommentsObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      oldImagesAndVideosObj = lodashGet(forumCommentsObj, ['imagesAndVideosObj'], {});
      
      // if (Object.keys(forumCommentsObj).length === 0) {
      //   throw new CustomError({ level: 'error', errorsArr: [{ code: 'XNus5UAAT', messageID: 'cvS0qSAlE' }] });
      // }
      
      
    // --------------------------------------------------
    //   新規投稿 - 同じIPで、同じコメントが10分以内に投稿されている場合はエラー
    // --------------------------------------------------
      
    } else {
      
      const dateTimeLimit = moment().utc().add(-10, 'minutes');
      
      const count = await ModelForumComments.count({
        conditionObj: {
          userCommunities_id,
          forumThreads_id,
          'localesArr.comment': comment,
          'createdDate': { '$gt': dateTimeLimit },
          ip: req.ip,
        }
      });
      
      // console.log(chalk`
      //   dateTimeLimit: {green ${dateTimeLimit}}
      //   count: {green ${count}}
      // `);
      
      if (count > 0) {
        throw new CustomError({ level: 'warn', errorsArr: [{ code: 'GhO9a3n1M', messageID: 'ffNAq3wYT' }] });
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
    let images = 0;
    let videos = 0;
    
    if (imagesAndVideosObj) {
      
      const parsedImagesAndVideosObj = JSON.parse(imagesAndVideosObj);
      
      // console.log(`
      //   ----- parsedImagesAndVideosObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(parsedImagesAndVideosObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      const formatAndSaveObj = await formatAndSave({
        newObj: parsedImagesAndVideosObj,
        oldObj: oldImagesAndVideosObj,
        loginUsers_id,
        ISO8601,
      });
      
      imagesAndVideosSaveObj = lodashGet(formatAndSaveObj, ['imagesAndVideosObj'], {});
      images = lodashGet(formatAndSaveObj, ['images'], 0);
      videos = lodashGet(formatAndSaveObj, ['videos'], 0);
      
      
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
    //   - forum-comments
    // ---------------------------------------------
    
    const forumCommentsConditionObj = {
      _id: shortid.generate(),
    };
    
    
    const forumCommentsSaveObj = {
      createdDate: ISO8601,
      updatedDate: ISO8601,
      gameCommunities_id: '',
      userCommunities_id,
      forumThreads_id,
      forumComments_id: '',
      replyToForumComments_id: '',
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
      anonymity: anonymity ? true : false,
      goods: 0,
      replies: 0,
      ip: req.ip,
      userAgent: lodashGet(req, ['headers', 'user-agent'], '')
    };
    
    
    // ---------------------------------------------
    //   - forum-threads / コメント数 + 1
    // ---------------------------------------------
    
    const forumThreadsConditionObj = {
      _id: forumThreads_id,
    };
    
    
    const forumThreadsSaveObj = {
      updatedDate: ISO8601,
      $inc: { comments: 1, images, videos }
    };
    
    
    // ---------------------------------------------
    //   - user-communities / 更新日時の変更
    // ---------------------------------------------
    
    const userCommunitiesConditionObj = {
      _id: userCommunities_id,
    };
    
    
    const userCommunitiesSaveObj = {
      updatedDate: ISO8601,
      'updatedDateObj.forum': ISO8601,
    };
    
    
    
    
    // --------------------------------------------------
    //   Update
    // --------------------------------------------------
    
    if (forumComments_id) {
      
      
      // ---------------------------------------------
      //   - forum-comments
      // ---------------------------------------------
      
      forumCommentsConditionObj._id = forumComments_id;
      
      delete forumCommentsSaveObj.createdDate;
      delete forumCommentsSaveObj.gameCommunities_id;
      delete forumCommentsSaveObj.userCommunities_id;
      delete forumCommentsSaveObj.forumThreads_id;
      delete forumCommentsSaveObj.forumComments_id;
      delete forumCommentsSaveObj.replyToForumComments_id;
      delete forumCommentsSaveObj.users_id;
      delete forumCommentsSaveObj.goods;
      delete forumCommentsSaveObj.replies;
      
      
      // ---------------------------------------------
      //   - forum-threads / 更新日時の変更
      // ---------------------------------------------
      
      // delete forumThreadsSaveObj.$inc;
      
      
    }
    
    // console.log(chalk`
    //   userCommunities_id: {green ${userCommunities_id}}
    //   forumThreads_id: {green ${forumThreads_id}}
    //   forumComments_id: {green ${forumComments_id}}
    //   name: {green ${name} / ${typeof name}}
    //   comment: {green ${comment} / ${typeof comment}}
    //   anonymity: {green ${anonymity} / ${typeof anonymity}}
    //   IP: {green ${req.ip}}
    //   User Agent: {green ${req.headers['user-agent']}}
    // `);
    
    
    // --------------------------------------------------
    //   DB insert Transaction
    // --------------------------------------------------
    
    await ModelForumComments.transactionForUpsert({
      
      forumCommentsConditionObj,
      forumCommentsSaveObj,
      forumThreadsConditionObj,
      forumThreadsSaveObj,
      imagesAndVideosConditionObj,
      imagesAndVideosSaveObj,
      userCommunitiesConditionObj,
      userCommunitiesSaveObj,
      
    });
    
    
    
    
    // --------------------------------------------------
    //   DB find / Forum
    // --------------------------------------------------
    
    const forumObj = await ModelForumThreads.findForThreads({
      req,
      localeObj,
      loginUsers_id,
      userCommunities_id,
    });
    
    returnObj.forumThreadsObj = forumObj.forumThreadsObj;
    returnObj.forumCommentsAndRepliesObj = forumObj.forumCommentsAndRepliesObj;
    
    
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
    //   Set Authority
    // --------------------------------------------------
    
    if (!forumThreads_id) {
      setAuthority({ req, _id: forumCommentsConditionObj._id });
    }
    
    
    
    
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
      endpointID: 'ViCtroXyq',
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