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
const lodashHas = require('lodash/has');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelUsers = require('../../../../../app/@database/users/model');
// const ModelCardPlayers = require('../../../../../app/@database/card-players/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../../../../app/@modules/csrf');
const { returnErrorsArr } = require('../../../../../app/@modules/log/log');
const { CustomError } = require('../../../../../app/@modules/error/custom');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { locale } = require('../../../../../app/@locales/locale');


// ---------------------------------------------
//   API
// ---------------------------------------------

const { initialProps } = require('../../../../../app/@api/v2/common');




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
    
    
    
    
    // --------------------------------------------------
    //   Common Initial Props
    // --------------------------------------------------
    
    const commonInitialPropsObj = await initialProps({ req, res, localeObj });
    
    returnObj.login = lodashGet(commonInitialPropsObj, ['login'], false);
    returnObj.loginUsersObj = lodashGet(commonInitialPropsObj, ['loginUsersObj'], {});
    returnObj.headerObj = lodashGet(commonInitialPropsObj, ['headerObj'], {});
    
    
    
    
    // ---------------------------------------------
    //   headerObj
    // ---------------------------------------------
    
    if (lodashHas(usersObj, ['headerObj', 'imagesAndVideosObj'])) {
      returnObj.headerObj = usersObj.headerObj;
    }
    
    // delete usersObj.headerObj;
    
    
    
    
    // --------------------------------------------------
    //   pagesObj
    // --------------------------------------------------
    
    returnObj.pagesObj = lodashGet(usersObj, ['pagesObj'], {});
    
    
    
    
    
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /pages/api/v2/ur/[userID]/settings.js
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
      ip: req.ip,
      requestParametersObj,
    });
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
  
};