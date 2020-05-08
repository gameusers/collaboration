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


// ---------------------------------------------
//   Model
// ---------------------------------------------

import ModelGameCommunities from '../../../../../app/@database/game-communities/model.js';
import ModelRecruitmentThreads from '../../../../../app/@database/recruitment-threads/model.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { verifyCsrfToken } from '../../../../../app/@modules/csrf.js';
import { returnErrorsArr } from '../../../../../app/@modules/log/log.js';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

// import { validationInteger } from '../../../../../app/@validations/integer.js';
import { validationKeyword } from '../../../../../app/@validations/keyword.js';

import { validationGameCommunities_idServer } from '../../../../../app/@database/game-communities/validations/_id-server.js';
import { validationHardwareIDsArrServer } from '../../../../../app/@database/hardwares/validations/id-server.js';

import { validationRecruitmentThreadsCategoriesArr } from '../../../../../app/@database/recruitment-threads/validations/category.js';
import { validationRecruitmentThreadsLimit } from '../../../../../app/@database/recruitment-threads/validations/limit.js';
import { validationRecruitmentCommentsLimit } from '../../../../../app/@database/recruitment-comments/validations/limit.js';
import { validationRecruitmentRepliesLimit } from '../../../../../app/@database/recruitment-replies/validations/limit.js';


// ---------------------------------------------
//   Locales
// ---------------------------------------------

import { locale } from '../../../../../app/@locales/locale.js';




// --------------------------------------------------
//   endpointID: YewAAV82g
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
      hardwareIDsArr,
      categoriesArr,
      keyword,
      threadLimit,
      commentLimit,
      replyLimit,
      
    } = bodyObj;
    
    
    lodashSet(requestParametersObj, ['gameCommunities_id'], gameCommunities_id);
    lodashSet(requestParametersObj, ['hardwareIDsArr'], hardwareIDsArr);
    lodashSet(requestParametersObj, ['categoriesArr'], categoriesArr);
    lodashSet(requestParametersObj, ['keyword'], keyword);
    lodashSet(requestParametersObj, ['threadLimit'], threadLimit);
    lodashSet(requestParametersObj, ['commentLimit'], commentLimit);
    lodashSet(requestParametersObj, ['replyLimit'], replyLimit);
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    
    
    // --------------------------------------------------
    //   Validations
    // --------------------------------------------------
    
    await validationGameCommunities_idServer({ value: gameCommunities_id });
    await validationHardwareIDsArrServer({ throwError: true, arr: hardwareIDsArr });
    await validationRecruitmentThreadsCategoriesArr({ throwError: true, arr: categoriesArr });
    await validationKeyword({ throwError: true, value: keyword });
    
    // Thread Limit
    await validationRecruitmentThreadsLimit({ throwError: true, required: true, value: threadLimit });
    
    // Comment Limit
    await validationRecruitmentCommentsLimit({ throwError: true, required: true, value: commentLimit });
    
    // Reply Limit
    await validationRecruitmentRepliesLimit({ throwError: true, required: true, value: replyLimit });
    
    
    
    
    // --------------------------------------------------
    //   DB find / Recruitments For Search
    // --------------------------------------------------
    
    const recruitmentObj = await ModelRecruitmentThreads.findRecruitmentsForSearch({
      
      req,
      localeObj,
      loginUsers_id,
      gameCommunities_id,
      hardwareIDsArr,
      categoriesArr,
      keyword,
      threadPage: 1,
      threadLimit,
      commentPage: 1,
      commentLimit,
      replyPage: 1,
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
    
    console.log(`
      ----------------------------------------\n
      /pages/api/v2/db/recruitment-threads/search.js
    `);
    
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
      endpointID: 'YewAAV82g',
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