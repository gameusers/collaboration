// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashHas from 'lodash/has';


// ---------------------------------------------
//   Model
// ---------------------------------------------

import ModelGameCommunities from 'app/@database/game-communities/model.js';
import ModelHardwares from 'app/@database/hardwares/model.js';
import ModelRecruitmentThreads from 'app/@database/recruitment-threads/model.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { returnErrorsArr } from 'app/@modules/log/log.js';
import { CustomError } from 'app/@modules/error/custom.js';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationInteger } from 'app/@validations/integer.js';
import { validationKeyword } from 'app/@validations/keyword.js';

import { validationRecruitmentThreadsLimit } from 'app/@database/recruitment-threads/validations/limit.js';
import { validationRecruitmentCommentsLimit } from 'app/@database/recruitment-comments/validations/limit.js';
import { validationRecruitmentRepliesLimit } from 'app/@database/recruitment-replies/validations/limit.js';


// ---------------------------------------------
//   Locales
// ---------------------------------------------

import { locale } from 'app/@locales/locale.js';






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
  
  
  // --------------------------------------------------
  //   IP & User Agent
  // --------------------------------------------------
  
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = lodashGet(req, ['headers', 'user-agent'], '');
  
  
  
  
  try {
    
    
    // --------------------------------------------------
    //   GET Data
    // --------------------------------------------------
    
    const urlID = lodashGet(req, ['query', 'urlID'], '');
    const recruitmentID = lodashGet(req, ['query', 'recruitmentID'], '');
    const threadPage = parseInt(lodashGet(req, ['query', 'threadPage'], 1), 10);
    const threadLimit = parseInt(lodashGet(req, ['query', 'threadLimit'], ''), 10);
    const commentLimit = parseInt(lodashGet(req, ['query', 'commentLimit'], ''), 10);
    const replyLimit = parseInt(lodashGet(req, ['query', 'replyLimit'], ''), 10);
    const hardwares = lodashGet(req, ['query', 'hardwares'], '');
    const categories = lodashGet(req, ['query', 'categories'], '');
    const keyword = lodashGet(req, ['query', 'keyword'], '');
    
    
    lodashSet(requestParametersObj, ['urlID'], urlID);
    lodashSet(requestParametersObj, ['recruitmentID'], recruitmentID);
    lodashSet(requestParametersObj, ['threadPage'], threadPage);
    lodashSet(requestParametersObj, ['threadLimit'], threadLimit);
    lodashSet(requestParametersObj, ['commentLimit'], commentLimit);
    lodashSet(requestParametersObj, ['replyLimit'], replyLimit);
    lodashSet(requestParametersObj, ['hardwares'], hardwares);
    lodashSet(requestParametersObj, ['categories'], categories);
    lodashSet(requestParametersObj, ['keyword'], keyword);
    
    
    
    
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
    //   募集データ取得
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   - 引数
    // ---------------------------------------------
    
    const argumentsObj = {
      
      req,
      localeObj,
      loginUsers_id,
      gameCommunities_id,
      
    };
    
    
    // ---------------------------------------------
    //   - recruitmentID
    // ---------------------------------------------
    
    if (recruitmentID) {
      argumentsObj.recruitmentID = recruitmentID;
    }
    
    
    // ---------------------------------------------
    //   - page & limit
    // ---------------------------------------------
    
    if (await validationInteger({ throwError: false, required: true, value: threadPage }).error === false) {
      argumentsObj.threadPage = threadPage;
    }
    
    if (await validationRecruitmentThreadsLimit({ throwError: false, required: true, value: threadLimit }).error === false) {
      argumentsObj.threadLimit = threadLimit;
    }
    
    if (await validationRecruitmentCommentsLimit({ throwError: false, required: true, value: commentLimit }).error === false) {
      argumentsObj.commentLimit = commentLimit;
    }
    
    if (await validationRecruitmentRepliesLimit({ throwError: false, required: true, value: replyLimit }).error === false) {
      argumentsObj.replyLimit = replyLimit;
    }
    
    
    // ---------------------------------------------
    //   - hardwareIDsArr
    // ---------------------------------------------
    
    const hardwareIDsArr = hardwares ? hardwares.split(',') : [];
    
    if (hardwareIDsArr.length > 0) {
      argumentsObj.hardwareIDsArr = hardwareIDsArr;
    }
    
    
    // ---------------------------------------------
    //   - categoriesArr
    // ---------------------------------------------
    
    let categoriesArr = categories ? categories.split(',') : [];
    
    if (categoriesArr.length > 0) {
      
      const tempArr = [];
      
      for (let value of categoriesArr.values()) {
        tempArr.push(parseInt(value, 10));
      }
      
      argumentsObj.categoriesArr = tempArr;
      
    }
    
    
    // ---------------------------------------------
    //   - keyword
    // ---------------------------------------------
    
    if (await validationKeyword({ throwError: false, required: true, value: keyword }).error === false) {
      argumentsObj.keyword = keyword;
    }
    
    
    
    
    // --------------------------------------------------
    //   DB find / Recruitment by recruitmentID
    // --------------------------------------------------
    
    let recruitmentObj = {};
    
    
    if (recruitmentID) {
      
      recruitmentObj = await ModelRecruitmentThreads.findRecruitmentByRecruitmentID(argumentsObj);
      
      
    // --------------------------------------------------
    //   DB find / Recruitments For Search
    // --------------------------------------------------
      
    } else if (hardwares || categories || keyword) {
      
      recruitmentObj = await ModelRecruitmentThreads.findRecruitmentsForSearch(argumentsObj);
      
      
    // --------------------------------------------------
    //   DB find / Recruitment
    // --------------------------------------------------
      
    } else {
      
      recruitmentObj = await ModelRecruitmentThreads.findRecruitments(argumentsObj);
      
    }
    
    
    // --------------------------------------------------
    //   returnObj
    // --------------------------------------------------
    
    returnObj.recruitmentThreadsObj = recruitmentObj.recruitmentThreadsObj;
    returnObj.recruitmentCommentsObj = recruitmentObj.recruitmentCommentsObj;
    returnObj.recruitmentRepliesObj = recruitmentObj.recruitmentRepliesObj;
    
    
    
    
    // --------------------------------------------------
    //   ハードウェア情報 - 募集検索用
    // --------------------------------------------------
    
    returnObj.hardwaresArr = await ModelHardwares.findHardwaresArr({
      
      localeObj,
      hardwareIDsArr,
      
    });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    console.log(`
      ----------------------------------------\n
      /pages/api/v2/gc/[urlID]/rec.js
    `);
    
    // console.log(chalk`
    //   urlID: {green ${urlID}}
    //   recruitmentID: {green ${recruitmentID}}
      
    //   threadPage: {green ${threadPage}}
    //   threadLimit: {green ${threadLimit}}
    //   commentLimit: {green ${commentLimit}}
    //   replyLimit: {green ${replyLimit}}
      
    //   hardwares: {green ${hardwares}}
    //   categories: {green ${categories}}
    //   keyword: {green ${keyword}}
    // `);
    
    // console.log(`
    //   ----- hardwareIDsArr -----\n
    //   ${util.inspect(hardwareIDsArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- categoriesArr -----\n
    //   ${util.inspect(categoriesArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    console.log(`
      ----- returnObj -----\n
      ${util.inspect(returnObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    
    
    
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