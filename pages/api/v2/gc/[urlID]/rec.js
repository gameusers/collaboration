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

const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');
const lodashHas = require('lodash/has');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelGameCommunities = require('../../../../../app/@database/game-communities/model');
const ModelGames = require('../../../../../app/@database/games/model');
const ModelRecruitmentThreads = require('../../../../../app/@database/recruitment-threads/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { returnErrorsArr } = require('../../../../../app/@modules/log/log');
const { CustomError } = require('../../../../../app/@modules/error/custom');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationInteger } = require('../../../../../app/@validations/integer');
const { validationForumThreadsListLimit, validationForumThreadsLimit } = require('../../../../../app/@database/forum-threads/validations/limit');
const { validationForumCommentsLimit, validationForumRepliesLimit } = require('../../../../../app/@database/forum-comments/validations/limit');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { locale } = require('../../../../../app/@locales/locale');


// ---------------------------------------------
//   API
// ---------------------------------------------

const { initialProps } = require('../../../../../app/@api/v2/common');




// --------------------------------------------------
//   endpointID: t22TWi-ct
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
  const loginUsersRole = lodashGet(req, ['user', 'role'], '');
  
  
  
  
  try {
    
    
    // --------------------------------------------------
    //   GET Data
    // --------------------------------------------------
    
    const urlID = req.query.urlID;
    const threadPage = parseInt(req.query.threadPage, 10);
    const threadLimit = parseInt(req.query.threadLimit, 10);
    const commentLimit = parseInt(req.query.commentLimit, 10);
    const replyLimit = parseInt(req.query.replyLimit, 10);
    
    lodashSet(requestParametersObj, ['urlID'], urlID);
    lodashSet(requestParametersObj, ['threadPage'], threadPage);
    lodashSet(requestParametersObj, ['threadLimit'], threadLimit);
    lodashSet(requestParametersObj, ['commentLimit'], commentLimit);
    lodashSet(requestParametersObj, ['replyLimit'], replyLimit);
    
    
    
    
    // --------------------------------------------------
    //   ログインしているユーザー情報＆ログインチェック
    // --------------------------------------------------
    
    returnObj.login = false;
    
    if (req.isAuthenticated() && req.user) {
      returnObj.loginUsersObj = req.user;
      returnObj.login = true;
    }
    
    
    
    
    // --------------------------------------------------
    //   DB find / Game Community
    // --------------------------------------------------
    
    const gameCommunityObj = await ModelGameCommunities.findForGameCommunity({
      
      localeObj,
      loginUsers_id,
      urlID,
      
    });
    
    
    // ---------------------------------------------
    //   - コミュニティのデータがない場合はエラー
    // ---------------------------------------------
    
    if (Object.keys(gameCommunityObj).length === 0) {
      statusCode = 404;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'cHpRTr4cy', messageID: 'Error' }] });
    }
    
    
    // ---------------------------------------------
    //   - gameCommunities_id
    // ---------------------------------------------
    
    const gameCommunities_id = lodashGet(gameCommunityObj, ['gameCommunitiesObj', '_id'], '');
    
    
    // ---------------------------------------------
    //   - headerObj
    // ---------------------------------------------
    
    returnObj.headerObj = gameCommunityObj.headerObj;
    
    
    // ---------------------------------------------
    //   - gameCommunityObj
    // ---------------------------------------------
    
    returnObj.gameCommunityObj = gameCommunityObj.gameCommunitiesObj;
    
    
    
    
    // --------------------------------------------------
    //   権限
    //   0: ブロックしているユーザー
    //   1: 非ログインユーザー
    //   2: ログインユーザー（以下ログイン済みユーザー）
    //   3: フォロワー
    //   100: サイト運営
    // --------------------------------------------------
    
    const followsFollow = lodashGet(returnObj, ['headerObj', 'followsObj', 'follow'], false);
    const followsBlocked = lodashGet(returnObj, ['headerObj', 'followsObj', 'followBlocked'], false);
    
    returnObj.accessLevel = 1;
    
    
    // ---------------------------------------------
    //   - サイト運営
    // ---------------------------------------------
    
    if (loginUsersRole === 'administrator') {
      
      returnObj.accessLevel = 100;
      
      
    // ---------------------------------------------
    //   - フォロワー
    // ---------------------------------------------
    
    } else if (followsFollow) {
      
      returnObj.accessLevel = 3;
      
      
    // ---------------------------------------------
    //   - ブロックしているユーザー
    // ---------------------------------------------
    
    } else if (followsBlocked) {
      
      returnObj.accessLevel = 0;
      
      
    // ---------------------------------------------
    //   - ログインユーザー
    // ---------------------------------------------
    
    } else if (loginUsersRole === 'user') {
      
      returnObj.accessLevel = 2;
      
    }
    
    
    
    
    // --------------------------------------------------
    //   DB find / Forum
    // --------------------------------------------------
    
    let argumentsObj = {
      
      req,
      localeObj,
      loginUsers_id,
      gameCommunities_id,
      
    };
    
    if (await validationInteger({ throwError: false, required: true, value: threadPage }).error === false) {
      argumentsObj.threadPage = threadPage;
    }
    
    if (await validationForumThreadsLimit({ throwError: false, required: true, value: threadLimit }).error === false) {
      argumentsObj.threadLimit = threadLimit;
    }
    
    if (await validationForumCommentsLimit({ throwError: false, required: true, value: commentLimit }).error === false) {
      argumentsObj.commentLimit = commentLimit;
    }
    
    if (await validationForumRepliesLimit({ throwError: false, required: true, value: replyLimit }).error === false) {
      argumentsObj.replyLimit = replyLimit;
    }
    
    const recruitmentObj = await ModelRecruitmentThreads.findForRecruitment(argumentsObj);
    
    returnObj.recruitmentThreadsObj = recruitmentObj.recruitmentThreadsObj;
    // returnObj.forumCommentsObj = forumObj.forumCommentsObj;
    // returnObj.forumRepliesObj = forumObj.forumRepliesObj;
      
      
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /pages/api/v2/gc/[urlID]/index.js
    // `);
    
    // console.log(chalk`
    //   urlID: {green ${urlID}}
    //   gameCommunities_id: {green ${gameCommunities_id}}
    // `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(returnObj, { colors: true, depth: null })}\n
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
      endpointID: 't22TWi-ct',
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