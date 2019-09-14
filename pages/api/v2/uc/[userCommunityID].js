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

// const moment = require('moment');
const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelUserCommunities = require('../../../../app/@database/user-communities/model');
const ModelForumThreads = require('../../../../app/@database/forum-threads/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { returnErrorsArr } = require('../../../../app/@modules/log/log');
const { CustomError } = require('../../../../app/@modules/error/custom');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { locale } = require('../../../../app/@locales/locale');




// --------------------------------------------------
//   Status Code & Error Arguments Object
// --------------------------------------------------

let statusCode = 400;




// --------------------------------------------------
//   endpointID: hc7YMP_C8
// --------------------------------------------------

export default async (req, res) => {
  
  console.log('initial-props');
  
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
    //   GET Data
    // --------------------------------------------------
    
    const userCommunityID = req.query.userCommunityID;
    
    lodashSet(requestParametersObj, ['userCommunityID'], userCommunityID);
    
    
    
    
    // --------------------------------------------------
    //   DB find / User Community
    // --------------------------------------------------
    
    const userCommunityArr = await ModelUserCommunities.findForUserCommunity({
      localeObj,
      loginUsers_id,
      userCommunityID,
    });
    
    // console.log(`
    //   ----- userCommunityArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(userCommunityArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    if (userCommunityArr.length === 0) {
      statusCode = 404;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'retRq6eFo', messageID: 'Error' }] });
    }
    
    const userCommunities_id = lodashGet(userCommunityArr, [0, '_id'], '');
    returnObj.userCommunityObj = userCommunityArr[0];
    
    
    
    
    // --------------------------------------------------
    //   DB find / Forum Threads For List
    // --------------------------------------------------
    
    returnObj.forumThreadsForListObj = await ModelForumThreads.findForThreadsList({
      localeObj,
      loginUsers_id,
      userCommunities_id,
    });
    
    // console.log(`
    //   ----- forumThreads_idArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(forumThreads_idArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   DB find / Forum
    // --------------------------------------------------
    
    const forumObj = await ModelForumThreads.findByUserCommunities_id({
      req,
      localeObj,
      loginUsers_id,
      userCommunities_id,
    });
    
    returnObj.forumThreadsObj = forumObj.forumThreadsObj;
    returnObj.forumCommentsObj = forumObj.forumCommentsObj;
    returnObj.forumRepliesObj = forumObj.forumRepliesObj;
    
    
    
    
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
      endpointID: 'hc7YMP_C8',
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