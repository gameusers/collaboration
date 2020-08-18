// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashHas from 'lodash/has';


// ---------------------------------------------
//   Model
// ---------------------------------------------

import ModelUsers from 'app/@database/users/model.js';
import ModelWebPushes from 'app/@database/web-pushes/model.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { verifyCsrfToken } from 'app/@modules/csrf.js';
import { decrypt }  from 'app/@modules/crypto.js';
import { returnErrorsArr } from 'app/@modules/log/log.js';
import { CustomError } from 'app/@modules/error/custom.js';
import { updateAccessDate } from 'app/@modules/access-date.js';


// ---------------------------------------------
//   Locales
// ---------------------------------------------

import { locale } from 'app/@locales/locale.js';


// ---------------------------------------------
//   API
// ---------------------------------------------

import { initialProps } from 'app/@api/v2/common.js';






// --------------------------------------------------
//   endpointID: Rounc2BcR
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
  
  
  // --------------------------------------------------
  //   Language & IP & User Agent
  // --------------------------------------------------
  
  const acceptLanguage = lodashGet(req, ['headers', 'accept-language'], '');
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = lodashGet(req, ['headers', 'user-agent'], '');
  
  
  
  
  try {
    
    
    // --------------------------------------------------
    //   POST Data
    // --------------------------------------------------
    
    const bodyObj = JSON.parse(req.body);
    
    const {
      
      userID
      
    } = bodyObj;
    
    lodashSet(requestParametersObj, ['userID'], userID);
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Login Check
    // --------------------------------------------------
    
    if (!req.isAuthenticated()) {
      
      statusCode = 403;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: '-A7OeA6CQ', messageID: 'xLLNIpo6a' }] });
      
    }
    
    
    
    
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
    
    const users_id = lodashGet(usersObj, ['_id'], '');
    
    
    // --------------------------------------------------
    //   ユーザー情報が存在しない場合はエラー
    // --------------------------------------------------
    
    if (!users_id) {
      
      statusCode = 404;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'WILn3VVWP', messageID: 'Error' }] });
      
    }
    
    
    // --------------------------------------------------
    //   他のユーザーの設定ページにアクセスした場合はエラー
    // --------------------------------------------------
    
    if (users_id !== loginUsers_id) {
      
      statusCode = 401;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'RZuemJfef', messageID: 'Error' }] });
      
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
    //   pagesObj
    // --------------------------------------------------
    
    returnObj.pagesObj = lodashGet(usersObj, ['pagesObj'], {});
    
    
    // --------------------------------------------------
    //   approval
    // --------------------------------------------------
    
    returnObj.approval = lodashGet(usersObj, ['followsObj', 'approval'], false);
    
    
    
    
    // --------------------------------------------------
    //   データ取得 / Users
    //   設定情報を取得するために、2回目のデータ取得を行っている
    //   あまりいい書き方ではないと思う
    // --------------------------------------------------
    
    const docUsersObj = await ModelUsers.findOne({
      
      conditionObj: {
        _id: users_id
      }
      
    });
    
    
    // --------------------------------------------------
    //   Login ID
    // --------------------------------------------------
    
    returnObj.loginID = lodashGet(docUsersObj, ['loginID'], '');
    
    
    // --------------------------------------------------
    //   E-Mail
    // --------------------------------------------------
    
    const emailValue = lodashGet(docUsersObj, ['emailObj', 'value'], '');
    returnObj.email = emailValue ? decrypt(emailValue) : '';
    returnObj.emailConfirmation = lodashGet(docUsersObj, ['emailObj', 'confirmation'], false);
    
    
    // --------------------------------------------------
    //   Web Push
    // --------------------------------------------------
    
    returnObj.webPushAvailable = false;
    
    const webPushes_id = lodashGet(docUsersObj, ['webPushes_id'], '');
    
    if (webPushes_id) {
      
      const docWebPushesObj = await ModelWebPushes.findOne({
        
        conditionObj: {
          _id: webPushes_id
        }
        
      });
      
      
      const subscriptionObj = lodashGet(docWebPushesObj, ['subscriptionObj'], {});
      const errorCount = lodashGet(docWebPushesObj, ['errorCount'], 0);
      
      if (subscriptionObj.endpoint && errorCount < 5) {
        
        returnObj.webPushAvailable = true;
        
      }
      
      // console.log(`
      //   ----- docWebPushesObj -----\n
      //   ${util.inspect(docWebPushesObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
    }
    
    
    
    
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
    
    // console.log(`
    //   ----------------------------------------\n
    //   /pages/api/v2/ur/[userID]/setting.js
    // `);
    
    // console.log(chalk`
    //   {green ur/player/api/player / initial-props}
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
    //   ----- docUsersObj -----\n
    //   ${util.inspect(docUsersObj, { colors: true, depth: null })}\n
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
      endpointID: 'Rounc2BcR',
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