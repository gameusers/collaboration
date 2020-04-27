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


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelGameCommunities = require('../../../../../app/@database/game-communities/model');
const ModelRecruitmentThreads = require('../../../../../app/@database/recruitment-threads/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../../../../app/@modules/csrf');
const { returnErrorsArr } = require('../../../../../app/@modules/log/log');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationInteger } = require('../../../../../app/@validations/integer');
const { validationGameCommunities_idServer } = require('../../../../../app/@database/game-communities/validations/_id-server');
const { validationRecruitmentThreadsLimit } = require('../../../../../app/@database/recruitment-threads/validations/limit');
const { validationRecruitmentCommentsLimit } = require('../../../../../app/@database/recruitment-comments/validations/limit');
const { validationRecruitmentRepliesLimit } = require('../../../../../app/@database/recruitment-replies/validations/limit');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { locale } = require('../../../../../app/@locales/locale');




// --------------------------------------------------
//   endpointID: 41RpY56fl
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
      threadPage,
      threadLimit,
      commentPage, 
      commentLimit,
      replyPage,
      replyLimit,
      
    } = bodyObj;
    
    
    lodashSet(requestParametersObj, ['gameCommunities_id'], gameCommunities_id);
    lodashSet(requestParametersObj, ['threadPage'], threadPage);
    lodashSet(requestParametersObj, ['threadLimit'], threadLimit);
    lodashSet(requestParametersObj, ['commentPage'], commentPage);
    lodashSet(requestParametersObj, ['commentLimit'], commentLimit);
    lodashSet(requestParametersObj, ['replyPage'], replyPage);
    lodashSet(requestParametersObj, ['replyLimit'], replyLimit);
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    
    
    // --------------------------------------------------
    //   Validations
    // --------------------------------------------------
    
    await validationGameCommunities_idServer({ value: gameCommunities_id });
    
    // Thread Page & Limit
    await validationInteger({ throwError: true, required: true, value: threadPage });
    await validationRecruitmentThreadsLimit({ throwError: true, required: true, value: threadLimit });
    
    // Comment Page & Limit
    await validationInteger({ throwError: true, required: true, value: commentPage });
    await validationRecruitmentCommentsLimit({ throwError: true, required: true, value: commentLimit });
    
    // Reply Page & Limit
    await validationInteger({ throwError: true, required: true, value: replyPage });
    await validationRecruitmentRepliesLimit({ throwError: true, required: true, value: replyLimit });
    
    
    
    
    // --------------------------------------------------
    //   DB find / Recruitments
    // --------------------------------------------------
    
    const recruitmentObj = await ModelRecruitmentThreads.findRecruitments({
      
      req,
      localeObj,
      loginUsers_id,
      gameCommunities_id,
      threadPage,
      threadLimit,
      commentPage,
      commentLimit,
      replyPage,
      replyLimit,
      
    });
    
    returnObj.recruitmentThreadsObj = recruitmentObj.recruitmentThreadsObj;
    returnObj.recruitmentCommentsObj = recruitmentObj.recruitmentCommentsObj;
    returnObj.recruitmentRepliesObj = recruitmentObj.recruitmentRepliesObj;
    
    
    
    
    // --------------------------------------------------
    //   updatedDateObj
    // --------------------------------------------------
    
    const gameCommunityArr = await ModelGameCommunities.find({
      
      conditionObj: {
        _id: gameCommunities_id
      }
      
    });
    
    const updatedDateObj = lodashGet(gameCommunityArr, [0, 'updatedDateObj'], {});
    
    returnObj.updatedDateObj = updatedDateObj;
    
    
    
    
    // ---------------------------------------------
    //   console.log
    // ---------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /pages/api/v2/db/recruitment-threads/read-threads.js
    // `);
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   threadPage: {green ${threadPage} / ${typeof threadPage}}
    //   threadLimit: {green ${threadLimit} / ${typeof threadLimit}}
    //   commentPage: {green ${commentPage} / ${typeof commentPage}}
    //   commentLimit: {green ${commentLimit} / ${typeof commentLimit}}
    //   replyPage: {green ${replyPage} / ${typeof replyPage}}
    //   replyLimit: {green ${replyLimit} / ${typeof replyLimit}}
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
      endpointID: '41RpY56fl',
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