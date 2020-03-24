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

const shortid = require('shortid');
const moment = require('moment');
const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelGameCommunities = require('../../../../../app/@database/game-communities/model');
const ModelUserCommunities = require('../../../../../app/@database/user-communities/model');
const ModelForumThreads = require('../../../../../app/@database/forum-threads/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../../../../app/@modules/csrf');
const { returnErrorsArr } = require('../../../../../app/@modules/log/log');
const { CustomError } = require('../../../../../app/@modules/error/custom');
const { formatAndSave } = require('../../../../../app/@modules/image/save');
const { setAuthority } = require('../../../../../app/@modules/authority');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationIP } = require('../../../../../app/@validations/ip');
const { validationGameCommunities_idServer } = require('../../../../../app/@database/game-communities/validations/_id-server');
const { validationForumThreadsName } = require('../../../../../app/@database/forum-threads/validations/name');
const { validationForumThreadsComment } = require('../../../../../app/@database/forum-threads/validations/comment');
const { validationForumThreadsListLimit, validationForumThreadsLimit } = require('../../../../../app/@database/forum-threads/validations/limit');
const { validationForumCommentsLimit, validationForumRepliesLimit } = require('../../../../../app/@database/forum-comments/validations/limit');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { locale } = require('../../../../../app/@locales/locale');




// --------------------------------------------------
//   endpointID: bC5tO1dDN
// --------------------------------------------------

export default async (req, res) => {
  
  
  // --------------------------------------------------
  //   Status Code
  // --------------------------------------------------
  
  let statusCode = 400;
  
  
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
  
  
  // --------------------------------------------------
  //   IP & User Agent
  // --------------------------------------------------
  
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = lodashGet(req, ['headers', 'user-agent'], '');
  
  
  
  
  try {
    
    
    // --------------------------------------------------
    //   POST Data
    // --------------------------------------------------
    
    const bodyObj = JSON.parse(req.body);
    
    const { 
      
      gameCommunities_id,
      forumThreads_id,
      name,
      comment,
      imagesAndVideosObj,
      threadListLimit,
      threadLimit,
      commentLimit,
      replyLimit,
      
    } = bodyObj;
    
    
    lodashSet(requestParametersObj, ['gameCommunities_id'], gameCommunities_id);
    lodashSet(requestParametersObj, ['forumThreads_id'], forumThreads_id);
    lodashSet(requestParametersObj, ['name'], name);
    lodashSet(requestParametersObj, ['comment'], comment);
    lodashSet(requestParametersObj, ['imagesAndVideosObj'], {});
    lodashSet(requestParametersObj, ['threadListLimit'], threadListLimit);
    lodashSet(requestParametersObj, ['threadLimit'], threadLimit);
    lodashSet(requestParametersObj, ['commentLimit'], commentLimit);
    lodashSet(requestParametersObj, ['replyLimit'], replyLimit);
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    await validationIP({ throwError: true, value: ip });
    
    await validationGameCommunities_idServer({ value: gameCommunities_id });
    await validationForumThreadsName({ throwError: true, value: name });
    await validationForumThreadsComment({ throwError: true, value: comment });
    await validationForumThreadsListLimit({ throwError: true, required: true, value: threadListLimit });
    await validationForumThreadsLimit({ throwError: true, required: true, value: threadLimit });
    await validationForumCommentsLimit({ throwError: true, required: true, value: commentLimit });
    await validationForumRepliesLimit({ throwError: true, required: true, value: replyLimit });
    
    
    
    
    // --------------------------------------------------
    //   スレッドが存在するかチェック
    // --------------------------------------------------
    
    let oldImagesAndVideosObj = {};
    
    
    // --------------------------------------------------
    //   編集の場合
    // --------------------------------------------------
    
    if (forumThreads_id) {
      
      
      // --------------------------------------------------
      //   データが存在しない、編集権限がない場合はエラーが投げられる
      // --------------------------------------------------
      
      const tempOldObj = await ModelForumThreads.findForEdit({
        
        req,
        localeObj,
        loginUsers_id,
        forumThreads_id,
        
      });
      
      // console.log(`
      //   ----- tempOldObj -----\n
      //   ${util.inspect(tempOldObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      oldImagesAndVideosObj = lodashGet(tempOldObj, ['imagesAndVideosObj'], {});
      
      
    // --------------------------------------------------
    //   新規の場合
    // --------------------------------------------------
      
    } else {
      
      
      // --------------------------------------------------
      //   同じ名前のスレッドが存在するかチェック
      //   count が 0 の場合は、同じ名前のスレッドは存在しない
      // --------------------------------------------------
      
      const count = await ModelForumThreads.count({
        
        conditionObj: {
          gameCommunities_id,
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
    
    const ISO8601 = moment().utc().toISOString();
    
    
    
    
    // --------------------------------------------------
    //   画像と動画の処理
    // --------------------------------------------------
    
    let imagesAndVideosConditionObj = {};
    let imagesAndVideosSaveObj = {};
    let imagesAndVideos_id = '';
    let images = 0;
    let videos = 0;
    
    if (imagesAndVideosObj) {
      
      
      // --------------------------------------------------
      //   画像を保存する
      // --------------------------------------------------
      
      const formatAndSaveObj = await formatAndSave({
        
        newObj: imagesAndVideosObj,
        oldObj: oldImagesAndVideosObj,
        loginUsers_id,
        ISO8601,
        
      });
      
      
      // --------------------------------------------------
      //   imagesAndVideosSaveObj
      // --------------------------------------------------
      
      imagesAndVideosSaveObj = lodashGet(formatAndSaveObj, ['imagesAndVideosObj'], {});
      
      
      // --------------------------------------------------
      //   画像数＆動画数
      // --------------------------------------------------
      
      images = lodashGet(formatAndSaveObj, ['images'], 0);
      videos = lodashGet(formatAndSaveObj, ['videos'], 0);
      
      
      // --------------------------------------------------
      //   画像＆動画がすべて削除されている場合は、imagesAndVideos_idを空にする
      // --------------------------------------------------
      
      const arr = lodashGet(imagesAndVideosSaveObj, ['arr'], []);
      
      if (arr.length === 0) {
        imagesAndVideos_id = '';
      } else {
        imagesAndVideos_id = lodashGet(imagesAndVideosSaveObj, ['_id'], '');
      }
      
      
      // --------------------------------------------------
      //   imagesAndVideosConditionObj
      // --------------------------------------------------
      
      imagesAndVideosConditionObj = {
        _id: lodashGet(imagesAndVideosSaveObj, ['_id'], ''),
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
      gameCommunities_id,
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
      replies: 0,
      images,
      videos,
      ip,
      userAgent: lodashGet(req, ['headers', 'user-agent'], '')
    };
    
    
    // ---------------------------------------------
    //   - game-communities / 更新日時の変更＆スレッド数 + 1
    // ---------------------------------------------
    
    const gameCommunitiesConditionObj = {
      _id: gameCommunities_id,
    };
    
    
    const gameCommunitiesSaveObj = {
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
      delete forumThreadsSaveObj.gameCommunities_id;
      delete forumThreadsSaveObj.users_id;
      delete forumThreadsSaveObj.comments;
      delete forumThreadsSaveObj.images;
      delete forumThreadsSaveObj.videos;
      
      forumThreadsSaveObj.$inc = { images, videos };
      
      
      // ---------------------------------------------
      //   - game-communities / 更新日時の変更
      // ---------------------------------------------
      
      delete gameCommunitiesSaveObj.$inc;
      
      
    }
    
    
    
    
    // --------------------------------------------------
    //   DB upsert Transaction / Forum Threads & Images And Videos & User Communities
    // --------------------------------------------------
    
    await ModelForumThreads.transactionForUpsertThread({
      
      forumThreadsConditionObj,
      forumThreadsSaveObj,
      imagesAndVideosConditionObj,
      imagesAndVideosSaveObj,
      gameCommunitiesConditionObj,
      gameCommunitiesSaveObj,
      
    });
    
    
    
    
    // --------------------------------------------------
    //   Set Authority / 非ログインユーザーに時間制限のある編集権限を与える
    // --------------------------------------------------
    
    if (!loginUsers_id) {
      setAuthority({ req, _id: forumThreadsConditionObj._id });
    }
    
    
    
    
    // --------------------------------------------------
    //   DB find / Forum Threads List
    // --------------------------------------------------
    
    returnObj.forumThreadsForListObj = await ModelForumThreads.findForThreadsList({
      
      localeObj,
      loginUsers_id,
      gameCommunities_id,
      page: 1,
      limit: threadListLimit,
      
    });
    
    
    // --------------------------------------------------
    //   DB find / Forum Threads
    // --------------------------------------------------
    
    const forumObj = await ModelForumThreads.findForForum({
      
      req,
      localeObj,
      loginUsers_id,
      gameCommunities_id,
      threadPage: 1,
      threadLimit,
      commentPage: 1,
      commentLimit,
      replyPage: 1,
      replyLimit,
      
    });
    
    returnObj.forumThreadsObj = forumObj.forumThreadsObj;
    returnObj.forumCommentsObj = forumObj.forumCommentsObj;
    returnObj.forumRepliesObj = forumObj.forumRepliesObj;
    
    
    // --------------------------------------------------
    //   DB find / Game Communities / 最新の更新日時情報を取得する
    // --------------------------------------------------
    
    const gameCommunityArr = await ModelGameCommunities.find({
      conditionObj: {
        _id: gameCommunities_id
      }
    });
    
    returnObj.updatedDateObj = lodashGet(gameCommunityArr, [0, 'updatedDateObj'], {});
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /pages/api/v2/db/forum-threads/upsert-gc.js
    // `);
    
    // console.log(chalk`
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   forumThreads_id: {green ${forumThreads_id}}
    //   name: {green ${name} / ${typeof name}}
    //   comment: {green ${comment} / ${typeof comment}}
    //   threadListLimit: {green ${threadListLimit} / ${typeof threadListLimit}}
    //   threadLimit: {green ${threadLimit} / ${typeof threadLimit}}
    //   commentLimit: {green ${commentLimit} / ${typeof commentLimit}}
    //   replyLimit: {green ${replyLimit} / ${typeof replyLimit}}
    //   IP: {green ${ip}}
    //   req.headers['x-forwarded-for']: {green ${req.headers['x-forwarded-for']}}
    //   req.connection.remoteAddress: {green ${req.connection.remoteAddress}}
    //   User Agent: {green ${req.headers['user-agent']}}
    // `);
    
    // console.log(`
    //   ----- req -----\n
    //   ${util.inspect(req, { colors: true, depth: null })}\n
    //   --------------------\n
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
      endpointID: 'bC5tO1dDN',
      users_id: loginUsers_id,
      ip,
      userAgent,
      requestParametersObj,
    });
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
  
};




export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb',
    },
  },
};