// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashHas from 'lodash/has';


// ---------------------------------------------
//   Model
// ---------------------------------------------

import ModelUsers from 'app/@database/users/model.js';
import ModelCardPlayers from 'app/@database/card-players/model.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { returnErrorsArr } from 'app/@modules/log/log.js';
import { CustomError } from 'app/@modules/error/custom.js';
import { updateAccessDate } from 'app/@modules/access-date.js';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationInteger } from 'app/@validations/integer.js';
import { validationFollowLimit } from 'app/@database/follows/validations/follow-limit.js';


// ---------------------------------------------
//   Locales
// ---------------------------------------------

import { locale } from 'app/@locales/locale.js';


// ---------------------------------------------
//   API
// ---------------------------------------------

import { initialProps } from 'app/@api/v2/common.js';






// --------------------------------------------------
//   endpointID: ir73GK2D_
// --------------------------------------------------

export default async (req, res) => {
  
  
  // --------------------------------------------------
  //   Status Code
  // --------------------------------------------------
  
  let statusCode = 400;
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const returnObj = {};
  const requestParametersObj = {};
  const loginUsers_id = lodashGet(req, ['user', '_id'], '');
  
  
  // --------------------------------------------------
  //   Language & IP & User Agent
  // --------------------------------------------------
  
  const acceptLanguage = lodashGet(req, ['headers', 'accept-language'], '');
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = lodashGet(req, ['headers', 'user-agent'], '');
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage
  });
  
  
  
  
  try {
    
    
    // --------------------------------------------------
    //   GET Data
    // --------------------------------------------------
    
    const userID = lodashGet(req, ['query', 'userID'], '');
    const page = parseInt(lodashGet(req, ['query', 'page'], 1), 10);
    const limit = parseInt(lodashGet(req, ['query', 'limit'], '') || process.env.NEXT_PUBLIC_FOLLOWERS_LIMIT, 10);
    
    lodashSet(requestParametersObj, ['userID'], userID);
    lodashSet(requestParametersObj, ['page'], page);
    lodashSet(requestParametersObj, ['limit'], limit);
    
    
    
    
    // --------------------------------------------------
    //   Common Initial Props
    // --------------------------------------------------
    
    const commonInitialPropsObj = await initialProps({ req, res, localeObj });
    
    returnObj.login = lodashGet(commonInitialPropsObj, ['login'], false);
    returnObj.loginUsersObj = lodashGet(commonInitialPropsObj, ['loginUsersObj'], {});
    const accessDate = lodashGet(commonInitialPropsObj, ['loginUsersObj', 'accessDate'], '');
    
    const gamesImagesAndVideosObj = lodashGet(commonInitialPropsObj, ['headerObj', 'imagesAndVideosObj'], {});
    
    
    
    
    // --------------------------------------------------
    //   Update Access Date & Login Count
    // --------------------------------------------------
    
    const resultUpdatedAccessDateObj = await updateAccessDate({
      
      req,
      localeObj,
      loginUsers_id,
      accessDate,
      
    });
    
    returnObj.experienceObj = lodashGet(resultUpdatedAccessDateObj, ['experienceObj'], {});
    const updatedAccessDate = lodashGet(resultUpdatedAccessDateObj, ['updatedAccessDate'], '');
    
    if (updatedAccessDate) {
      lodashSet(returnObj, ['loginUsersObj', 'accessDate'], updatedAccessDate);
    }
    
    
    
    
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
    
    const argumentsObj = {
      
      localeObj,
      loginUsers_id,
      adminUsers_id: users_id,
      users_id,
      controlType: 'follow',
      
    };
    
    
    if (await validationInteger({ throwError: false, required: true, value: page }).error === false) {
      argumentsObj.page = page;
    }
    
    if (await validationFollowLimit({ throwError: false, required: true, value: limit }).error === false) {
      argumentsObj.limit = limit;
    }
    
    
    const resultFollowersObj = await ModelCardPlayers.findForFollowers(argumentsObj);
    
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
    //   - 自分自身
    // ---------------------------------------------
    
    if (users_id === loginUsers_id) {
      returnObj.accessLevel = 50;
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /pages/api/v2/ur/[userID]/followers.js
    // `);
    
    // console.log(chalk`
    //   userID: {green ${userID}}
    //   page: {green ${page} / ${typeof page}}
    //   limit: {green ${limit} / ${typeof limit}}
    // `);
    
    // console.log(`
    //   ----- resultFollowersObj -----\n
    //   ${util.inspect(resultFollowersObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(returnObj, { colors: true, depth: null })}\n
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
      endpointID: 'ir73GK2D_',
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