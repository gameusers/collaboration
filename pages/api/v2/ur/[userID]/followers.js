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
const lodashHas = require('lodash/has');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelUsers = require('../../../../../app/@database/users/model');
// const ModelFollows = require('../../../../../app/@database/follows/model');
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


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { locale } = require('../../../../../app/@locales/locale');


// ---------------------------------------------
//   API
// ---------------------------------------------

const { initialProps } = require('../../../../../app/@api/v2/common');




// --------------------------------------------------
//   endpointID: ir73GK2D_
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
    
    const userID = req.query.userID;
    let page = req.query.page;
    const limit = req.query.limit;
    
    lodashSet(requestParametersObj, ['userID'], userID);
    lodashSet(requestParametersObj, ['page'], page);
    lodashSet(requestParametersObj, ['limit'], limit);
    
    
    
    
    // --------------------------------------------------
    //   Validations
    // --------------------------------------------------
    
    await validationInteger({ throwError: true, value: page });
    await validationInteger({ throwError: true, value: limit });
    
    
    
    
    // --------------------------------------------------
    //   Common Initial Props
    // --------------------------------------------------
    
    const commonInitialPropsObj = await initialProps({ req, res, localeObj });
    
    returnObj.login = lodashGet(commonInitialPropsObj, ['login'], false);
    returnObj.loginUsersObj = lodashGet(commonInitialPropsObj, ['loginUsersObj'], {});
    const gamesImagesAndVideosObj = lodashGet(commonInitialPropsObj, ['headerObj', 'imagesAndVideosObj'], {});
    
    
    
    
    // --------------------------------------------------
    //   データ取得 / Users
    //   アクセスしたページ所有者のユーザー情報
    //   users_id を取得するために利用
    // --------------------------------------------------
    
    const usersObj = await ModelUsers.findOneForUser({
      
      localeObj,
      loginUsers_id,
      userID,
      
    });
    
    
    // --------------------------------------------------
    //   ユーザー情報が存在しない場合はエラー
    // --------------------------------------------------
    
    const users_id = lodashGet(usersObj, ['_id'], '');
    
    if (!users_id) {
      statusCode = 404;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: '1G6OYPg8p', messageID: 'Error' }] });
    }
    
    returnObj.users_id = users_id;
    
    
    // ---------------------------------------------
    //   headerObj
    // ---------------------------------------------
    
    returnObj.headerObj = usersObj.headerObj;
    
    // ユーザーがトップ画像をアップロードしていない場合は、ランダム取得のゲーム画像を代わりに利用する
    if (!lodashHas(usersObj, ['headerObj', 'imagesAndVideosObj'])) {
      lodashSet(returnObj, ['headerObj', 'imagesAndVideosObj'], gamesImagesAndVideosObj);
    }
    
    
    // --------------------------------------------------
    //   pagesObj
    // --------------------------------------------------
    
    returnObj.pagesObj = lodashGet(usersObj, ['pagesObj'], []);
    
    
    
    
    // --------------------------------------------------
    //   DB find / Card Players
    // --------------------------------------------------
    
    const resultFollowersObj = await ModelCardPlayers.findForFollowers({
      
      localeObj,
      loginUsers_id,
      adminUsers_id: users_id,
      users_id,
      type: 'follow',
      page,
      limit,
      
    });
    
    returnObj.cardPlayersObj = resultFollowersObj.cardPlayersObj;
    returnObj.followMembersObj = resultFollowersObj.followMembersObj;
    
    
    // --------------------------------------------------
    //    followersObj
    // --------------------------------------------------
    
    // const followersObj = {
    //   page,
    //   count: followedCount,
    //   approvalCount,
    //   blockCount,
    // };
    
    // lodashSet(followersObj, [`page${page}Obj`, 'loadedDate'], moment().toISOString());
    // lodashSet(followersObj, [`page${page}Obj`, 'arr'], cardPlayersArr);
    
    // returnObj.followersObj = followersObj;
    
    
    
    
    // --------------------------------------------------
    //   権限
    //   0: ブロックしているユーザー
    //   1: 非ログインユーザー
    //   2: ログインユーザー（以下ログイン済みユーザー）
    //   3: 自分のことをフォローしているユーザー
    //   4: 自分がフォローしているユーザー
    //   5: 相互フォロー状態のユーザー
    //   50: 自分自身
    //   100: サイト管理者
    // --------------------------------------------------
    
    returnObj.accessLevel = 1;
    
    
    // ---------------------------------------------
    //   - 自分自身
    // ---------------------------------------------
    
    if (users_id === loginUsers_id) {
      returnObj.accessLevel = 50;
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    console.log(`
      ----------------------------------------\n
      /pages/api/v2/ur/[userID]/followers.js
    `);
    
    // console.log(chalk`
    //   userID: {green ${userID}}
    //   page: {green ${page} / ${typeof page}}
    //   limit: {green ${limit} / ${typeof limit}}
    // `);
    
    // console.log(`
    //   ----- followsObj -----\n
    //   ${util.inspect(followsObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- docFollowersObj -----\n
    //   ${util.inspect(docFollowersObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- localeObj -----\n
    //   ${util.inspect(localeObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- gamesImagesAndVideosObj -----\n
    //   ${util.inspect(gamesImagesAndVideosObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- usersObj -----\n
    //   ${util.inspect(usersObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- cardPlayersObj -----\n
    //   ${util.inspect(cardPlayersObj, { colors: true, depth: null })}\n
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
      endpointID: 'ir73GK2D_',
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