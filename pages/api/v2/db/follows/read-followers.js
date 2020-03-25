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
      controlType,
      page,
      limit,
      
    } = bodyObj;
    
    
    lodashSet(requestParametersObj, ['users_id'], users_id);
    lodashSet(requestParametersObj, ['gameCommunities_id'], gameCommunities_id);
    lodashSet(requestParametersObj, ['userCommunities_id'], userCommunities_id);
    lodashSet(requestParametersObj, ['controlType'], controlType);
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
    //   controlType: {green ${controlType} / ${typeof controlType}}
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
      
      if ((controlType === 'approval' || controlType === 'block') && users_id !== loginUsers_id) {
        statusCode = 401;
        throw new CustomError({ level: 'warn', errorsArr: [{ code: 'AvTRjcmIi', messageID: 'DSRlEoL29' }] });
      }
      
      
    }
    
    
    await validationInteger({ throwError: true, required: true, value: page });
    await validationFollowType({ throwError: true, required: true, value: controlType });
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
      
      const adminUsers_id = lodashGet(userCommunityObj, ['users_id'], '');
      
      // console.log(`
      //   ----- userCommunityObj -----\n
      //   ${util.inspect(userCommunityObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   - コンテンツを表示するかどうか
      // ---------------------------------------------
      
      const communityType = lodashGet(userCommunityObj, ['communityType'], 'open');
      const member = lodashGet(userCommunityObj, ['member'], false);
      
      if (communityType === 'closed' && !member) {
        statusCode = 403;
        throw new CustomError({ level: 'warn', errorsArr: [{ code: 'MN_BH-td8', messageID: 'Error' }] });
      }
      
      
      // --------------------------------------------------
      //    DB find / Card Players
      // --------------------------------------------------
      
      const resultFollowersObj = await ModelCardPlayers.findForFollowers({
        
        localeObj,
        loginUsers_id,
        adminUsers_id,
        userCommunities_id,
        controlType,
        page,
        limit,
        
      });
      
      returnObj.cardPlayersObj = resultFollowersObj.cardPlayersObj;
      returnObj.followMembersObj = resultFollowersObj.followMembersObj;
      
      
    } else {
      
      
      // --------------------------------------------------
      //   DB find / Card Players
      // --------------------------------------------------
      
      const resultFollowersObj = await ModelCardPlayers.findForFollowers({
        
        localeObj,
        loginUsers_id,
        adminUsers_id: users_id,
        users_id,
        controlType,
        page,
        limit,
        
      });
      
      returnObj.cardPlayersObj = resultFollowersObj.cardPlayersObj;
      returnObj.followMembersObj = resultFollowersObj.followMembersObj;
      
      
      // console.log(`
      //   ----- resultFollowersObj -----\n
      //   ${util.inspect(resultFollowersObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
    }
    
    
    
    
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