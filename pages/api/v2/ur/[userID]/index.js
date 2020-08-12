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


import { experienceCalculate } from 'app/@modules/experience.js';


// ---------------------------------------------
//   Locales
// ---------------------------------------------

import { locale } from 'app/@locales/locale.js';


// ---------------------------------------------
//   API
// ---------------------------------------------

import { initialProps } from 'app/@api/v2/common.js';






// --------------------------------------------------
//   endpointID: CuUwo1avA
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
  
  const language = lodashGet(req, ['headers', 'accept-language'], '');
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = lodashGet(req, ['headers', 'user-agent'], '');
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: language
  });
  
  
  
  
  try {
    
    
    // --------------------------------------------------
    //   GET Data
    // --------------------------------------------------
    
    const userID = lodashGet(req, ['query', 'userID'], '');
    
    lodashSet(requestParametersObj, ['userID'], userID);
    
    
    
    
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
    
    
    // ---------------------------------------------
    //   headerObj
    // ---------------------------------------------
    
    returnObj.headerObj = usersObj.headerObj;
    
    // ユーザーがトップ画像をアップロードしていない場合は、ランダム取得のゲーム画像を代わりに利用する
    if (!lodashHas(usersObj, ['headerObj', 'imagesAndVideosObj'])) {
      lodashSet(returnObj, ['headerObj', 'imagesAndVideosObj'], gamesImagesAndVideosObj);
    }
    
    
    // --------------------------------------------------
    //   pagesObj - ユーザー各自が設定したページのタイトル
    // --------------------------------------------------
    
    returnObj.pagesObj = lodashGet(usersObj, ['pagesObj'], []);
    
    
    
    
    // --------------------------------------------------
    //   データ取得 / Card Players
    //   アクセスしたページ所有者のプレイヤーカード情報
    // --------------------------------------------------
    
    const resultCardPlayersObj = await ModelCardPlayers.findForCardPlayers({
      
      localeObj,
      users_id,
      loginUsers_id,
      
    });
    
    // returnObj.cardPlayersObj = resultCardPlayersObj.cardPlayersObj;
    returnObj.cardPlayersArr = resultCardPlayersObj.cardPlayersArr;
    
    
    
    
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
    
    
    
    
    // experienceCalculate({ 
      
    //   req,
    //   loginUsers_id,
    //   // type: 'title-count',
    //   // calculation: 'addition',
    //   // calculation: 'subtraction',
    //   calculation: 'recalculation',
      
    // });
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /pages/api/v2/ur/[userID]/index.js
    // `);
    
    // console.log(chalk`
    //   userID: {green ${userID}}
    //   users_id：{green ${users_id}}
    // `);
    
    // console.log(`
    //   ----- localeObj -----\n
    //   ${util.inspect(localeObj, { colors: true, depth: null })}\n
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
      endpointID: 'CuUwo1avA',
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