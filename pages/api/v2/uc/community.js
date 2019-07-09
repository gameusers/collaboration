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

const ModelGames = require('../../../../app/@database/games/model');
const ModelUserCommunities = require('../../../../app/@database/user-communities/model');
const ModelForumThreads = require('../../../../app/@database/forum-threads/model');
const ModelForumComments = require('../../../../app/@database/forum-comments/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { returnErrorsArr } = require('../../../../app/@modules/log/log');
const { CustomError } = require('../../../../app/@modules/error/custom');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { addLocaleData } = require('react-intl');
const en = require('react-intl/locale-data/en');
const ja = require('react-intl/locale-data/ja');
addLocaleData([...en, ...ja]);

const { locale } = require('../../../../app/@locales/locale');




// --------------------------------------------------
//   Status Code & Error Arguments Object
// --------------------------------------------------

let statusCode = 400;




// --------------------------------------------------
//   endpointID: hc7YMP_C8
// --------------------------------------------------

export default async (req, res) => {
  
  
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
    // console.log(chalk`
    //   userCommunityID: {green ${userCommunityID}}
    // `);
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
    //   Login Check / Login User Data
    // --------------------------------------------------
    
    if (req.isAuthenticated() && req.user) {
      returnObj.loginUsersObj = req.user;
      returnObj.login = true;
    }
    
    
    // --------------------------------------------------
    //   DB find / Games / Header Hero Image
    // --------------------------------------------------
    
    returnObj.headerObj = await ModelGames.findForHeroImage({
      language: localeObj.language,
      country: localeObj.country,
    });
    
    
    // --------------------------------------------------
    //   DB find / Forum Threads
    // --------------------------------------------------
    
    returnObj.forumThreadsObj = await ModelForumThreads.findForForumThreads({
      localeObj,
      loginUsers_id,
      userCommunities_id,
      page: 1,
      limit: 1,
    });
    
    
    // --------------------------------------------------
    //   DB find / Forum Comments & Replies
    // --------------------------------------------------
    
    returnObj.forumCommentsAndRepliesArr = await ModelForumComments.findForForumCommentsAndReplies({
      localeObj,
      loginUsers_id,
      forumThreads_idArr: ['qNiOLKdRt'],
      commentsPage: 1,
      repliesPage: 1,
    });
    
    
    // ---------------------------------------------
    //   Success
    // ---------------------------------------------
    
    res.status(200).json(returnObj);
    
    
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
    
    res.status(statusCode).json(resultErrorObj);
    
    
  }
  
  
};