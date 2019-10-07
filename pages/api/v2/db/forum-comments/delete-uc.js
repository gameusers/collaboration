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

const ModelUserCommunities = require('../../../../../app/@database/user-communities/model');
const ModelForumThreads = require('../../../../../app/@database/forum-threads/model');
const ModelForumComments = require('../../../../../app/@database/forum-comments/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../../../../app/@modules/csrf');
const { returnErrorsArr } = require('../../../../../app/@modules/log/log');
// const { CustomError } = require('../../../../../app/@modules/error/custom');
// const { formatAndSave } = require('../../../../../app/@modules/image/save');
// const { setAuthority } = require('../../../../../app/@modules/authority');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationIP } = require('../../../../../app/@validations/ip');
const { validationUserCommunities_idServer } = require('../../../../../app/@database/user-communities/validations/_id-server');
const { validationForumThreads_idServerUC } = require('../../../../../app/@database/forum-threads/validations/_id-server');
// const { validationForumComments_idServerUC } = require('../../../../../app/@database/forum-comments/validations/_id-server');
const { validationForumThreadsListLimit, validationForumThreadsLimit } = require('../../../../../app/@database/forum-threads/validations/limit');
const { validationForumCommentsLimit, validationForumRepliesLimit } = require('../../../../../app/@database/forum-comments/validations/limit');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { locale } = require('../../../../../app/@locales/locale');




// --------------------------------------------------
//   endpointID: diXcNSat_
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
  
  
  
  
  try {
    
    
    // --------------------------------------------------
    //   POST Data
    // --------------------------------------------------
    
    const bodyObj = JSON.parse(req.body);
    
    const {
      
      userCommunities_id,
      forumThreads_id,
      forumComments_id,
      forumReplies_id,
      threadListLimit,
      threadLimit,
      commentLimit,
      replyLimit,
      
    } = bodyObj;
    
    
    lodashSet(requestParametersObj, ['userCommunities_id'], userCommunities_id);
    lodashSet(requestParametersObj, ['forumThreads_id'], forumThreads_id);
    lodashSet(requestParametersObj, ['forumComments_id'], forumComments_id);
    lodashSet(requestParametersObj, ['forumReplies_id'], forumReplies_id);
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
    
    await validationUserCommunities_idServer({ value: userCommunities_id });
    
    await validationForumThreads_idServerUC({ forumThreads_id, userCommunities_id });
    // await validationForumComments_idServerUC({ forumComments_id, forumThreads_id, userCommunities_id });
    
    await validationForumThreadsListLimit({ throwError: true, required: true, value: threadListLimit });
    await validationForumThreadsLimit({ throwError: true, required: true, value: threadLimit });
    await validationForumCommentsLimit({ throwError: true, required: true, value: commentLimit });
    await validationForumRepliesLimit({ throwError: true, required: true, value: replyLimit });
    
    await validationIP({ throwError: true, value: req.ip });
    
    
    
    
    // --------------------------------------------------
    //   データ取得
    //   データが存在しない、編集権限がない場合はエラーが投げられる
    // --------------------------------------------------
    
    const forumCommentsObj = await ModelForumComments.findForEdit({
      req,
      localeObj,
      loginUsers_id,
      forumComments_id: forumReplies_id,
    });
    
    console.log(`
      ----- forumCommentsObj -----\n
      ${util.inspect(JSON.parse(JSON.stringify(forumCommentsObj)), { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    
    // --------------------------------------------------
    //   編集権限がない場合は処理停止
    // --------------------------------------------------
    
    // const editable = verifyAuthority({
    //   req,
    //   users_id: lodashGet(resultArr, [0, 'users_id'], ''),
    //   loginUsers_id,
    //   ISO8601: lodashGet(resultArr, [0, 'createdDate'], ''),
    //   _id: lodashGet(resultArr, [0, '_id'], '')
    // });
    
    // if (!editable) {
    //   throw new CustomError({ level: 'error', errorsArr: [{ code: '-2ENyEiaJ', messageID: 'DSRlEoL29' }] });
    // }
    
    
    
    
    
    // --------------------------------------------------
    //   Datetime
    // --------------------------------------------------
    
    // const ISO8601 = moment().toISOString();
    
    
    
    
    // // --------------------------------------------------
    // //   Insert
    // // --------------------------------------------------
    
    // // ---------------------------------------------
    // //   - forum-comments / 返信
    // // ---------------------------------------------
    
    // const forumRepliesConditionObj = {
    //   _id: forumReplies_id,
    // };
    
    
    // // ---------------------------------------------
    // //   - forum-threads / 更新日時の変更 & 返信数 - 1 & 画像数と動画数の変更
    // // ---------------------------------------------
    
    // const forumThreadsConditionObj = {
    //   _id: forumThreads_id,
    // };
    
    
    // let forumThreadsSaveObj = {
    //   updatedDate: ISO8601,
    //   $inc: { replies: -1, images, videos }
    // };
    
    
    // // ---------------------------------------------
    // //   - forum-comments / 更新日時の変更 & 返信数 - 1
    // // ---------------------------------------------
    
    // const forumCommentsConditionObj = {
    //   _id: forumComments_id,
    // };
    
    
    // let forumCommentsSaveObj = {
    //   updatedDate: ISO8601,
    //   $inc: { replies: -1 }
    // };
    
    
    // // ---------------------------------------------
    // //   - user-communities / 更新日時の変更
    // // ---------------------------------------------
    
    // const userCommunitiesConditionObj = {
    //   _id: userCommunities_id,
    // };
    
    
    // const userCommunitiesSaveObj = {
    //   updatedDate: ISO8601,
    //   'updatedDateObj.forum': ISO8601,
    // };
    
    
    
    
    
    
    
    
    // --------------------------------------------------
    //   DB insert Transaction
    // --------------------------------------------------
    
    // await ModelForumComments.transactionForUpsert({
      
    //   forumRepliesConditionObj,
    //   forumRepliesSaveObj,
    //   forumCommentsConditionObj,
    //   forumCommentsSaveObj,
    //   forumThreadsConditionObj,
    //   forumThreadsSaveObj,
    //   imagesAndVideosConditionObj,
    //   imagesAndVideosSaveObj,
    //   userCommunitiesConditionObj,
    //   userCommunitiesSaveObj,
      
    // });
    
    
    
    
    // --------------------------------------------------
    //   DB find / Forum Threads List
    // --------------------------------------------------
    
    returnObj.forumThreadsForListObj = await ModelForumThreads.findForThreadsList({
      
      localeObj,
      loginUsers_id,
      userCommunities_id,
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
      userCommunities_id,
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
    //   forumComments_id: {green ${forumComments_id}}
    //   name: {green ${name} / ${typeof name}}
    //   comment: {green ${comment} / ${typeof comment}}
    //   anonymity: {green ${anonymity} / ${typeof anonymity}}
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
      endpointID: 'diXcNSat_',
      users_id: loginUsers_id,
      ip: req.ip,
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