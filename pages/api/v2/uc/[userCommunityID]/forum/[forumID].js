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

const ModelUserCommunities = require('../../../../../../app/@database/user-communities/model');
const ModelForumThreads = require('../../../../../../app/@database/forum-threads/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { returnErrorsArr } = require('../../../../../../app/@modules/log/log');
const { CustomError } = require('../../../../../../app/@modules/error/custom');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { locale } = require('../../../../../../app/@locales/locale');




// --------------------------------------------------
//   endpointID: w4Dpv8Rf1
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
    //   GET Data
    // --------------------------------------------------
    
    const userCommunityID = req.query.userCommunityID;
    const forumID = req.query.forumID;
    
    lodashSet(requestParametersObj, ['userCommunityID'], userCommunityID);
    lodashSet(requestParametersObj, ['forumID'], forumID);
    
    console.log(chalk`
      userCommunityID: {green ${userCommunityID}}
      forumID: {green ${forumID}}
    `);
    
    
    // --------------------------------------------------
    //   DB find / User Community
    // --------------------------------------------------
    
    const userCommunityArr = await ModelUserCommunities.findForUserCommunity({
      localeObj,
      loginUsers_id,
      userCommunityID,
    });
    
    if (userCommunityArr.length === 0) {
      statusCode = 404;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'AULmon_4K', messageID: 'Error' }] });
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
    
    
    // --------------------------------------------------
    //   DB find / Forum
    // --------------------------------------------------
    
    const forumObj = await ModelForumThreads.findForForumBy_forumID({
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
      endpointID: 'w4Dpv8Rf1',
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