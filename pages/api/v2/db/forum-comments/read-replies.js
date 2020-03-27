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
const ModelUserCommunities = require('../../../../../app/@database/user-communities/model');
const ModelForumComments = require('../../../../../app/@database/forum-comments/model');


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
const { validationUserCommunities_idAndAuthorityServer } = require('../../../../../app/@database/user-communities/validations/_id-server');
const { validationForumCommentsLimit, validationForumRepliesLimit } = require('../../../../../app/@database/forum-comments/validations/limit');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { locale } = require('../../../../../app/@locales/locale');




// --------------------------------------------------
//   endpointID: AQOnS_hsz
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
      
      gameCommunities_id,
      userCommunities_id,
      forumComments_idArr,
      commentPage, 
      commentLimit,
      replyPage,
      replyLimit,
      
    } = bodyObj;
    
    
    lodashSet(requestParametersObj, ['gameCommunities_id'], gameCommunities_id);
    lodashSet(requestParametersObj, ['userCommunities_id'], userCommunities_id);
    lodashSet(requestParametersObj, ['forumComments_idArr'], forumComments_idArr);
    lodashSet(requestParametersObj, ['commentPage'], commentPage);
    lodashSet(requestParametersObj, ['commentLimit'], commentLimit);
    lodashSet(requestParametersObj, ['replyPage'], replyPage);
    lodashSet(requestParametersObj, ['replyLimit'], replyLimit);
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    if (gameCommunities_id) {
      
      await validationGameCommunities_idServer({ value: gameCommunities_id });
      
    } else {
      
      await validationUserCommunities_idAndAuthorityServer({ value: userCommunities_id, loginUsers_id });
      
    }
    
    // Comment Page & Limit
    await validationInteger({ throwError: true, required: true, value: commentPage });
    await validationForumCommentsLimit({ throwError: true, required: true, value: commentLimit });
    
    // Reply Page & Limit
    await validationInteger({ throwError: true, required: true, value: replyPage });
    await validationForumRepliesLimit({ throwError: true, required: true, value: replyLimit });
    
    
    
    
    // --------------------------------------------------
    //   DB find / Forum Comments - Replies
    // --------------------------------------------------
    
    returnObj.forumRepliesObj = await ModelForumComments.findRepliesByForumComments_idArr({
      
      req,
      localeObj,
      loginUsers_id,
      gameCommunities_id,
      userCommunities_id,
      forumComments_idArr,
      commentPage,
      commentLimit,
      replyPage,
      replyLimit,
      
    });
    
    
    // --------------------------------------------------
    //   DB find / User Communities
    // --------------------------------------------------
    
    // --------------------------------------------------
    //   updatedDateObj
    // --------------------------------------------------
    
    let updatedDateObj = {};
    
    if (gameCommunities_id) {
      
      const gameCommunityArr = await ModelGameCommunities.find({
        
        conditionObj: {
          _id: gameCommunities_id
        }
        
      });
      
      updatedDateObj = lodashGet(gameCommunityArr, [0, 'updatedDateObj'], {});
      
    } else {
      
      const userCommunityArr = await ModelUserCommunities.find({
        
        conditionObj: {
          _id: userCommunities_id
        }
        
      });
      
      updatedDateObj = lodashGet(userCommunityArr, [0, 'updatedDateObj'], {});
      
    }
    
    returnObj.updatedDateObj = updatedDateObj;
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   /pages/api/v2/db/forum-comments/read-replies.js
      
    //   loginUsers_id: {green ${loginUsers_id}}
      
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   userCommunities_id: {green ${userCommunities_id}}
    //   commentPage: {green ${commentPage} / ${typeof commentPage}}
    //   commentLimit: {green ${commentLimit} / ${typeof commentLimit}}
    //   replyPage: {green ${replyPage} / ${typeof replyPage}}
    //   replyLimit: {green ${replyLimit} / ${typeof replyLimit}}
    // `);
    
    // console.log(`
    //   ----- forumComments_idArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(forumComments_idArr)), { colors: true, depth: null })}\n
    //   --------------------\n
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
      endpointID: 'AQOnS_hsz',
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