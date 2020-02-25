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
const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelUserCommunities = require('../../../../../app/@database/user-communities/model');
const ModelUsers = require('../../../../../app/@database/users/model');
const ModelCardPlayers = require('../../../../../app/@database/card-players/model');
const ModelFollows = require('../../../../../app/@database/follows/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../../../../app/@modules/csrf');
const { returnErrorsArr } = require('../../../../../app/@modules/log/log');
const { CustomError } = require('../../../../../app/@modules/error/custom');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationInteger } = require('../../../../../app/@validations/integer');
const { validationUsers_idServer } = require('../../../../../app/@database/users/validations/_id-server');
const { validationUserCommunities_idServer } = require('../../../../../app/@database/user-communities/validations/_id-server');
const { validationFollowLimit } = require('../../../../../app/@database/follows/validations/follow-limit');
const { validationFollowType } = require('../../../../../app/@database/follows/validations/follow-type');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { locale } = require('../../../../../app/@locales/locale');




// --------------------------------------------------
//   endpointID: X_pq2A_of
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
      
      users_id,
      gameCommunities_id,
      userCommunities_id,
      type,
      page,
      limit,
      
    } = bodyObj;
    
    
    lodashSet(requestParametersObj, ['users_id'], users_id);
    lodashSet(requestParametersObj, ['gameCommunities_id'], gameCommunities_id);
    lodashSet(requestParametersObj, ['userCommunities_id'], userCommunities_id);
    lodashSet(requestParametersObj, ['type'], type);
    lodashSet(requestParametersObj, ['page'], page);
    lodashSet(requestParametersObj, ['limit'], limit);
    
    
    
    
    // ---------------------------------------------
    //   console.log
    // ---------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /pages/api/v2/db/follows/read-followers.js
    // `);
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
      
    //   users_id: {green ${users_id}}
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   userCommunities_id: {green ${userCommunities_id}}
    //   type: {green ${type} / ${typeof type}}
    //   page: {green ${page} / ${typeof page}}
    //   limit: {green ${limit} / ${typeof limit}}
    // `);
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    
    
    // --------------------------------------------------
    //   Validations
    // --------------------------------------------------
    
    if (gameCommunities_id) {
      
      
      
    } else if (userCommunities_id) {
      
      await validationUserCommunities_idServer({ value: userCommunities_id });
      
    } else {
      
      await validationUsers_idServer({ value: users_id });
      
      
      // --------------------------------------------------
      //   権限がないのに approval や block を表示しようとした場合はエラー
      // --------------------------------------------------
      
      if ((type === 'approval' || type === 'block') && users_id !== loginUsers_id) {
        statusCode = 401;
        throw new CustomError({ level: 'warn', errorsArr: [{ code: 'AvTRjcmIi', messageID: 'DSRlEoL29' }] });
      }
      
      
    }
    
    
    await validationInteger({ throwError: true, required: true, value: page });
    await validationFollowType({ throwError: true, required: true, value: type });
    await validationFollowLimit({ throwError: true, required: true, value: limit });
    
    
    
    
    // --------------------------------------------------
    //   User Community
    // --------------------------------------------------
    
    if (gameCommunities_id) {
    
    
    
    // --------------------------------------------------
    //   User Community
    // --------------------------------------------------
    
    } else if (userCommunities_id) {
      
      
      // --------------------------------------------------
      //   DB find / User Community
      // --------------------------------------------------
      
      const userCommunityObj = await ModelUserCommunities.findForUserCommunity({
        
        localeObj,
        loginUsers_id,
        userCommunities_id,
        
      });
      
      
      // console.log(`
      //   ----- userCommunityObj -----\n
      //   ${util.inspect(userCommunityObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   - コンテンツを表示するかどうか
      // ---------------------------------------------
      
      // const communityType = lodashGet(userCommunityObj, ['communityType'], 'open');
      // const member = lodashGet(userCommunityObj, ['member'], false);
      
      // if (communityType === 'closed' && !member) {
      //   statusCode = 403;
      //   throw new CustomError({ level: 'warn', errorsArr: [{ code: 'MN_BH-td8', messageID: 'Error' }] });
      // }
      
      
    } else {
      
      
      // --------------------------------------------------
      //   DB find / Card Players
      // --------------------------------------------------
      
      const resultFollowersObj = await ModelCardPlayers.findForFollowers({
        
        localeObj,
        loginUsers_id,
        adminUsers_id: users_id,
        users_id,
        type,
        page,
        limit,
        
      });
      
      returnObj.cardPlayersObj = resultFollowersObj.cardPlayersObj;
      returnObj.followMembersObj = resultFollowersObj.followMembersObj;
      
      
      console.log(`
        ----- resultFollowersObj -----\n
        ${util.inspect(resultFollowersObj, { colors: true, depth: null })}\n
        --------------------\n
      `);
      
    }
    
    
    
    
    
    
    
    // // --------------------------------------------------
    // //   DB find / Follows
    // // --------------------------------------------------
    
    // const author = lodashGet(userCommunityObj, ['headerObj', 'author'], false);
    
    // const followsObj = await ModelFollows.findOne({
      
    //   conditionObj: {
    //     userCommunities_id
    //   },
      
    // });
    
    // const followedArr = lodashGet(followsObj, ['followedArr'], []);
    // returnObj.followedCount = lodashGet(followsObj, ['followedCount'], 1);
    
    // let users_idsArr = followedArr;
    // let count = returnObj.followedCount;
    
    // if (author) {
      
    //   returnObj.approvalCount = lodashGet(followsObj, ['approvalCount'], 0);
    //   returnObj.blockCount = lodashGet(followsObj, ['blockCount'], 0);
      
    //   if (type === 'approval') {
        
    //     users_idsArr = lodashGet(followsObj, ['approvalArr'], []);
    //     count = returnObj.approvalCount;
        
    //   } else if (type === 'block') {
        
    //     users_idsArr = lodashGet(followsObj, ['blockArr'], []);
    //     count = returnObj.blockCount;
        
    //   }
      
    // }
    
    
    
    
    // // --------------------------------------------------
    // //    DB find / Card Players
    // // --------------------------------------------------
    
    // if (!page) {
    //   page = 1;
    // }
    
    // const conditionObj = {
      
    //   localeObj,
    //   loginUsers_id,
    //   users_idsArr,
    //   page,
      
    // };
    
    // if (limit) {
    //   conditionObj.limit = limit;
    // }
    
    // const resultMemberObj = await ModelCardPlayers.findForMember(conditionObj);
    
    // returnObj.cardPlayersObj = resultMemberObj.cardPlayersObj;
    
    
    
    
    // // --------------------------------------------------
    // //   membersObj
    // // --------------------------------------------------
    
    // const membersObj = {
    //   page,
    //   count,
    // };
    
    // lodashSet(membersObj, [`page${page}Obj`, 'loadedDate'], moment().toISOString());
    // lodashSet(membersObj, [`page${page}Obj`, 'arr'], resultMemberObj.cardPlayersForOrderArr);
    
    // returnObj.membersObj = membersObj;
    
    
    
    
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
      endpointID: 'X_pq2A_of',
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