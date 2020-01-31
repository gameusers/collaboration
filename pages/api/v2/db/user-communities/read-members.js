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
const { validationMemberLimit } = require('../../../../../app/@validations/limit');
const { validationUserCommunities_idServer } = require('../../../../../app/@database/user-communities/validations/_id-server');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { locale } = require('../../../../../app/@locales/locale');




// --------------------------------------------------
//   endpointID: 0uSnfUVkb
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
      
      userCommunities_id,
      page,
      limit,
      
    } = bodyObj;
    
    
    lodashSet(requestParametersObj, ['userCommunities_id'], userCommunities_id);
    lodashSet(requestParametersObj, ['page'], page);
    lodashSet(requestParametersObj, ['limit'], limit);
    
    
    
    
    // ---------------------------------------------
    //   console.log
    // ---------------------------------------------
    
    // console.log(chalk`
    //   /pages/api/v2/db/user-communities/read-members.js
      
    //   loginUsers_id: {green ${loginUsers_id}}
      
    //   userCommunities_id: {green ${userCommunities_id}}
    //   page: {green ${page} / ${typeof page}}
    //   limit: {green ${limit} / ${typeof limit}}
    // `);
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    await validationUserCommunities_idServer({ value: userCommunities_id });
    await validationInteger({ throwError: true, required: true, value: page });
    await validationMemberLimit({ throwError: true, required: true, value: limit });
    
    
    
    
    // --------------------------------------------------
    //   DB find / User Community
    // --------------------------------------------------
    
    const userCommunityObj = await ModelUserCommunities.findOne({
      
      conditionObj: {
        _id: userCommunities_id
      },
      
    });
    
    
    // console.log(`
    //   ----- userCommunityObj -----\n
    //   ${util.inspect(userCommunityObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // ---------------------------------------------
    //   - コミュニティのデータがない場合はエラー
    // ---------------------------------------------
    
    if (Object.keys(userCommunityObj).length === 0) {
      statusCode = 404;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'em2LtJ-S1', messageID: 'Error' }] });
    }
    
    
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
    //   DB find / Follows
    // --------------------------------------------------
    
    const followsObj = await ModelFollows.findOne({
      
      conditionObj: {
        userCommunities_id
      },
      
    });
    
    const membersArr = lodashGet(followsObj, ['membersArr'], []);
    const membersCount = lodashGet(followsObj, ['membersCount'], 1);
    
    
    
    
    // --------------------------------------------------
    //    DB find / Card Players
    // --------------------------------------------------
    
    if (!page) {
      page = 1;
    }
    
    const conditionObj = {
      
      localeObj,
      loginUsers_id,
      users_idsArr: membersArr,
      page,
      
    };
    
    if (limit) {
      conditionObj.limit = limit;
    }
    
    const resultMemberObj = await ModelCardPlayers.findForMember(conditionObj);
    
    returnObj.cardPlayersObj = resultMemberObj.cardPlayersObj;
    
    
    
    
    // --------------------------------------------------
    //    membersObj
    // --------------------------------------------------
    
    const membersObj = {
      page,
      count: membersCount,
    };
    
    lodashSet(membersObj, [`page${page}Obj`, 'loadedDate'], moment().toISOString());
    lodashSet(membersObj, [`page${page}Obj`, 'arr'], resultMemberObj.cardPlayersForOrderArr);
    
    returnObj.membersObj = membersObj;
    
    
    
    
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
      endpointID: '0uSnfUVkb',
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