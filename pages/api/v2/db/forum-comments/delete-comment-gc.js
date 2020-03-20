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

const moment = require('moment');
const rimraf = require('rimraf');
const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelGameCommunities = require('../../../../../app/@database/game-communities/model');
const ModelForumThreads = require('../../../../../app/@database/forum-threads/model');
const ModelForumComments = require('../../../../../app/@database/forum-comments/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../../../../app/@modules/csrf');
const { returnErrorsArr } = require('../../../../../app/@modules/log/log');
const { CustomError } = require('../../../../../app/@modules/error/custom');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationIP } = require('../../../../../app/@validations/ip');
const { validationGameCommunities_idServer } = require('../../../../../app/@database/game-communities/validations/_id-server');
const { validationForumThreads_idServerGC } = require('../../../../../app/@database/forum-threads/validations/_id-server');
const { validationForumThreadsListLimit, validationForumThreadsLimit } = require('../../../../../app/@database/forum-threads/validations/limit');
const { validationForumCommentsLimit, validationForumRepliesLimit } = require('../../../../../app/@database/forum-comments/validations/limit');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { locale } = require('../../../../../app/@locales/locale');




// --------------------------------------------------
//   endpointID: IB5ETD3kZ
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
  
  let returnObj = {};
  const requestParametersObj = {};
  const loginUsers_id = lodashGet(req, ['user', '_id'], '');
  
  
  // --------------------------------------------------
  //   IP: Remote Client Address
  // --------------------------------------------------
  
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  
  
  
  try {
    
    
    // --------------------------------------------------
    //   POST Data
    // --------------------------------------------------
    
    const bodyObj = JSON.parse(req.body);
    
    const {
      
      gameCommunities_id,
      forumThreads_id,
      forumComments_id,
      threadListLimit,
      threadLimit,
      commentLimit,
      replyLimit,
      
    } = bodyObj;
    
    
    lodashSet(requestParametersObj, ['gameCommunities_id'], gameCommunities_id);
    lodashSet(requestParametersObj, ['forumThreads_id'], forumThreads_id);
    lodashSet(requestParametersObj, ['forumComments_id'], forumComments_id);
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
    await validationForumThreads_idServerGC({ forumThreads_id, gameCommunities_id });
    await validationForumThreadsListLimit({ throwError: true, required: true, value: threadListLimit });
    await validationForumThreadsLimit({ throwError: true, required: true, value: threadLimit });
    await validationForumCommentsLimit({ throwError: true, required: true, value: commentLimit });
    await validationForumRepliesLimit({ throwError: true, required: true, value: replyLimit });
    
    
    
    
    // --------------------------------------------------
    //   データ取得
    //   データが存在しない、編集権限がない場合はエラーが投げられる
    // --------------------------------------------------
    
    const docForumCommentsObj = await ModelForumComments.findForDeleteComment({
      
      req,
      localeObj,
      loginUsers_id,
      forumComments_id,
      
    });
    
    const replies = lodashGet(docForumCommentsObj, ['replies'], 0);
    const imagesAndVideos_idsArr = lodashGet(docForumCommentsObj, ['imagesAndVideos_idsArr'], []);
    const images = lodashGet(docForumCommentsObj, ['images'], 0);
    const videos = lodashGet(docForumCommentsObj, ['videos'], 0);
    
    
    
    
    // --------------------------------------------------
    //   Datetime
    // --------------------------------------------------
    
    const ISO8601 = moment().utc().toISOString();
    
    
    
    
    // --------------------------------------------------
    //   Delete
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   - forum-comments / 返信削除
    // ---------------------------------------------
    
    const forumRepliesConditionObj = {
      forumComments_id,
    };
    
    
    // ---------------------------------------------
    //   - forum-comments / コメント削除
    // ---------------------------------------------
    
    const forumCommentsConditionObj = {
      _id: forumComments_id,
    };
    
    
    // ---------------------------------------------
    //   - images-and-videos 削除
    // ---------------------------------------------
    
    let imagesAndVideosConditionObj = {};
    
    if (imagesAndVideos_idsArr.length > 0) {
      imagesAndVideosConditionObj = {
        _id: { $in: imagesAndVideos_idsArr }
      };
    }
    
    
    // ---------------------------------------------
    //   - forum-threads / 更新日時の変更 & コメント数 - 1 & 返信数 - ○○ & 画像数と動画数の変更
    // ---------------------------------------------
    
    const forumThreadsConditionObj = {
      _id: forumThreads_id,
    };
    
    
    let forumThreadsSaveObj = {
      updatedDate: ISO8601,
      $inc: { comments: -1, replies, images, videos }
    };
    
    
    // ---------------------------------------------
    //   - game-communities / 更新日時の変更
    // ---------------------------------------------
    
    const gameCommunitiesConditionObj = {
      _id: gameCommunities_id,
    };
    
    
    const gameCommunitiesSaveObj = {
      updatedDate: ISO8601,
      'updatedDateObj.forum': ISO8601,
    };
    
    
    
    
    // --------------------------------------------------
    //   DB insert Transaction
    // --------------------------------------------------
    
    await ModelForumComments.transactionForDeleteComment({
      
      forumThreadsConditionObj,
      forumThreadsSaveObj,
      forumCommentsConditionObj,
      forumRepliesConditionObj,
      imagesAndVideosConditionObj,
      gameCommunitiesConditionObj,
      gameCommunitiesSaveObj,
      
    });
    
    
    
    
    // ---------------------------------------------
    //   画像を削除する
    // ---------------------------------------------
    
    for (let value of imagesAndVideos_idsArr.values()) {
      
      const dirPath = `public/img/forum/${value}`;
      // console.log(dirPath);
      
      rimraf(dirPath, (err) => {
        if (err) {
          throw new CustomError({ level: 'error', errorsArr: [{ code: 'av6kp9HZf', messageID: 'Error' }] });
        }
      });
      
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
    //   DB find / User Communities / 最新の更新日時情報を取得する
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
    
    // console.log(chalk`
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   forumThreads_id: {green ${forumThreads_id}}
    //   forumComments_id: {green ${forumComments_id}}
    //   anonymity: {green ${anonymity} / ${typeof anonymity}}
    //   IP: {green ${ip}}
    //   User Agent: {green ${req.headers['user-agent']}}
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
      endpointID: 'IB5ETD3kZ',
      users_id: loginUsers_id,
      ip: ip,
      requestParametersObj,
    });
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
  
};