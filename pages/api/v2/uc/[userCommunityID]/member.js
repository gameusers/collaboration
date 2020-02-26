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

const moment = require('moment');
const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');
const lodashHas = require('lodash/has');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelUserCommunities = require('../../../../../app/@database/user-communities/model');
const ModelFollows = require('../../../../../app/@database/follows/model');
const ModelCardPlayers = require('../../../../../app/@database/card-players/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { returnErrorsArr } = require('../../../../../app/@modules/log/log');
const { CustomError } = require('../../../../../app/@modules/error/custom');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationInteger } = require('../../../../../app/@validations/integer');
const { validationFollowLimit } = require('../../../../../app/@database/follows/validations/follow-limit');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { locale } = require('../../../../../app/@locales/locale');


// ---------------------------------------------
//   API
// ---------------------------------------------

const { initialProps } = require('../../../../../app/@api/v2/common');




// --------------------------------------------------
//   endpointID: K3yzgjQpD
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
    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);
    
    lodashSet(requestParametersObj, ['userCommunityID'], userCommunityID);
    lodashSet(requestParametersObj, ['page'], page);
    lodashSet(requestParametersObj, ['limit'], limit);
    
    
    
    
    // --------------------------------------------------
    //   Validations
    // --------------------------------------------------
    
    await validationInteger({ throwError: true, value: page });
    await validationFollowLimit({ throwError: true, value: limit });
    
    
    
    
    // --------------------------------------------------
    //   Common Initial Props
    // --------------------------------------------------
    
    const commonInitialPropsObj = await initialProps({ req, res, localeObj });
    
    returnObj.login = lodashGet(commonInitialPropsObj, ['login'], false);
    returnObj.loginUsersObj = lodashGet(commonInitialPropsObj, ['loginUsersObj'], {});
    returnObj.headerObj = lodashGet(commonInitialPropsObj, ['headerObj'], {});
    
    
    
    
    // --------------------------------------------------
    //   DB find / User Community
    // --------------------------------------------------
    
    const userCommunityObj = await ModelUserCommunities.findForUserCommunity({
      
      localeObj,
      loginUsers_id,
      userCommunityID,
      
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
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'X0Y2qe9V8', messageID: 'Error' }] });
    }
    
    
    // ---------------------------------------------
    //   - userCommunities_id & author
    // ---------------------------------------------
    
    const userCommunities_id = lodashGet(userCommunityObj, ['_id'], '');
    const adminUsers_id = lodashGet(userCommunityObj, ['users_id'], '');
    
    
    // ---------------------------------------------
    //   - headerObj
    // ---------------------------------------------
    
    if (lodashHas(userCommunityObj, ['headerObj', 'imagesAndVideosObj'])) {
      returnObj.headerObj = userCommunityObj.headerObj;
    }
    
    delete userCommunityObj.headerObj;
    
    
    // ---------------------------------------------
    //   - userCommunityObj
    // ---------------------------------------------
    
    returnObj.userCommunityObj = userCommunityObj;
    
    
    // ---------------------------------------------
    //   - コンテンツを表示するかどうか
    // ---------------------------------------------
    
    const communityType = lodashGet(userCommunityObj, ['communityType'], 'open');
    const member = lodashGet(userCommunityObj, ['member'], false);
    
    if (communityType === 'closed' && !member) {
      statusCode = 403;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'zoqcOuILt', messageID: 'Error' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //    DB find / Card Players
    // --------------------------------------------------
    
    const resultFollowersObj = await ModelCardPlayers.findForFollowers({
      
      localeObj,
      loginUsers_id,
      adminUsers_id,
      userCommunities_id,
      controlType: 'followed',
      page,
      limit,
      
    });
    
    returnObj.cardPlayersObj = resultFollowersObj.cardPlayersObj;
    returnObj.followMembersObj = resultFollowersObj.followMembersObj;
    
    
    
    
    // --------------------------------------------------
    //   権限
    //   0: ブロックしているユーザー
    //   1: 非ログインユーザー
    //   2: ログインユーザー（以下ログイン済みユーザー）
    //   3: 自分のことをフォローしているユーザー
    //   4: 自分がフォローしているユーザー
    //   5: 相互フォロー状態のユーザー
    //   50: 自分自身（コミュニティの管理者）
    //   100: サイト管理者
    // --------------------------------------------------
    
    returnObj.accessLevel = 1;
    
    
    // ---------------------------------------------
    //   - コミュニティの管理者
    // ---------------------------------------------
    
    if (adminUsers_id === loginUsers_id) {
      returnObj.accessLevel = 50;
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /pages/api/v2/uc/[userCommunityID]/member.js
    // `);
    
    // console.log(chalk`
    //   userCommunityID: {green ${userCommunityID}}
    //   userCommunities_id: {green ${userCommunities_id}}
    //   communityType: {green ${communityType}}
    //   member: {green ${member}}
    // `);
    
    // console.log(`
    //   ----- userCommunityObj -----\n
    //   ${util.inspect(userCommunityObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(returnObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----------------------------------------
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
      endpointID: 'K3yzgjQpD',
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