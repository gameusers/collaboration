// --------------------------------------------------
//   File ID: 3bPnmJsoD
// --------------------------------------------------

// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
// const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'public/' });
const shortid = require('shortid');
const moment = require('moment');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../@modules/csrf');
const { errorCodeIntoErrorObj } = require('../../@modules/error/error-obj');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationIDs_idServer } = require('./validations/_id-server');
const { validationIDsPlatform } = require('./validations/platform');
const { validationIDsLabel } = require('./validations/label');
const { validationIDsID } = require('./validations/id');
const { validationIDsPublicSetting } = require('./validations/public-setting');

const { validationGamesGameCommunities_idServer } = require('../games/validations/game-id-server');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelIDs = require('./model');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

// const { addLocaleData } = require('react-intl');
// const en = require('react-intl/locale-data/en');
// const ja = require('react-intl/locale-data/ja');
// addLocaleData([...en, ...ja]);

const { locale } = require('../../@locales/locale');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();




// --------------------------------------------------
//   Status Code & Error Arguments Object
// --------------------------------------------------

let statusCode = 400;

let errorArgumentsObj = {
  fileID: '3bPnmJsoD',
  functionID: '',
  errorCodeArr: [],
  errorObj: {},
  loginUsers_id: ''
};




// --------------------------------------------------
//   IDデータをユーザーIDから取得 / endpointID: XwchAk4yT
// --------------------------------------------------

router.post('/find-by-users-id-for-form', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: req.headers['accept-language']
  });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  errorArgumentsObj.functionID = 'XwchAk4yT';
  
  let returnObj = {};
  
  
  try {
    
    
    // --------------------------------------------------
    //   CSRF
    // --------------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    
    
    // --------------------------------------------------
    //   Login Check
    // --------------------------------------------------
    
    if (!req.isAuthenticated()) {
      statusCode = 401;
      errorArgumentsObj.errorCodeArr = ['xLLNIpo6a'];
      throw new Error();
    }
    
    const loginUsers_id = req.user._id;
    errorArgumentsObj.loginUsers_id = loginUsers_id;
    
    
    
    
    // --------------------------------------------------
    //   データ取得 / IDs
    //   ログインしているユーザーの登録IDデータ
    // --------------------------------------------------
    
    const resultIDsObj = await ModelIDs.findBy_Users_idForForm({
      language: localeObj.language,
      country: localeObj.country,
      loginUsers_id
    });
    
    returnObj = resultIDsObj;
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    // `);
    
    // console.log(`
    //   ----- localeObj -----\n
    //   ${util.inspect(localeObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(returnObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // ---------------------------------------------
    //   Return Json Object / Success
    // ---------------------------------------------
    
    return res.status(200).json(returnObj);
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   Error Object
    // ---------------------------------------------
    
    errorArgumentsObj.errorObj = errorObj;
    const resultErrorObj = errorCodeIntoErrorObj({ localeObj, ...errorArgumentsObj });
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
});




// --------------------------------------------------
//   更新 / endpointID: YTP9v6kk_
// --------------------------------------------------

router.post('/upsert', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: req.headers['accept-language']
  });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  errorArgumentsObj.functionID = 'YTP9v6kk_';
  
  
  try {
    
    
    // --------------------------------------------------
    //   CSRF
    // --------------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    
    
    // --------------------------------------------------
    //   Login Check
    // --------------------------------------------------
    
    if (!req.isAuthenticated()) {
      statusCode = 401;
      errorArgumentsObj.errorCodeArr = ['xLLNIpo6a'];
      throw new Error();
    }
    
    const loginUsers_id = req.user._id;
    errorArgumentsObj.loginUsers_id = loginUsers_id;
    
    
    
    
    // --------------------------------------------------
    //   POST 取得
    // --------------------------------------------------
    
    const { _id, platform, gameCommunities_id, label, id, publicSetting, search } = req.body;
    
    
    // --------------------------------------------------
    //   Save Object
    // --------------------------------------------------
    
    const ISO8601 = moment().toISOString();
    
    let saveObj = {
      createdDate: ISO8601,
      updatedDate: ISO8601,
      users_id: loginUsers_id,
      platform,
      gameCommunities_id: gameCommunities_id ? gameCommunities_id : '',
      label: label ? label : '',
      id,
      publicSetting,
      search: search ? true : false
    };
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    //   platform: {green ${platform}}
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   label: {green ${label}}
    //   id: {green ${id}}
    //   publicSetting: {green ${publicSetting}}
    //   search: {green ${search}}
    // `);
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    const val = async (func, argumentsObj, name) => {
      
      const validationObj = await func(argumentsObj);
      
      
      // const title = name ? `${name} / ` : '';
      // console.log(`\n---------- ${title}validationObj ----------\n`);
      // console.dir(validationObj);
      // console.log(`\n-----------------------------------\n`);
      
      
      if (validationObj.error) {
        errorArgumentsObj.errorCodeArr = validationObj.errorCodeArr;
        throw new Error();
      }
      
      return validationObj;
      
    };
    
    
    // --------------------------------------------------
    //   _id
    // --------------------------------------------------
    
    if (_id) {
      await val(validationIDs_idServer, { value: _id, loginUsers_id }, '_id');
    }
    
    
    // --------------------------------------------------
    //   Platform
    // --------------------------------------------------
    
    await val(validationIDsPlatform, { value: platform }, 'Platform');
    
    
    // --------------------------------------------------
    //   Game ID
    // --------------------------------------------------
    
    // プラットフォームが以下の配列に含まれていない場合、バリデーションを実行
    if (['PlayStation', 'Xbox', 'Nintendo', 'Steam', 'Origin', 'Discord', 'Skype', 'ICQ', 'Line'].indexOf(platform) === -1) {
      await val(validationGamesGameCommunities_idServer, { value: gameCommunities_id, language: localeObj.language, country: localeObj.country, }, 'Game ID');
    // 配列に含まれている場合は、gameCommunities_idは不要なので削除する
    } else {
      saveObj.gameCommunities_id = '';
    }
    
    
    // --------------------------------------------------
    //   Label
    // --------------------------------------------------
    
    await val(validationIDsLabel, { value: label }, 'Label');
    
    
    // --------------------------------------------------
    //   ID
    // --------------------------------------------------
    
    await val(validationIDsID, { value: id }, 'ID');
    
    
    // --------------------------------------------------
    //   Public Setting
    // --------------------------------------------------
    
    await val(validationIDsPublicSetting, { value: publicSetting }, 'Public Setting');
    
    
    
    
    // --------------------------------------------------
    //   保存可能件数のチェック
    //   オーバーしている場合は処理停止
    // --------------------------------------------------
    
    const count = await ModelIDs.count({
      conditionObj: {
        users_id: loginUsers_id,
      },
    });
    
    if (count > process.env.ID_INSERT_LIMIT) {
      errorArgumentsObj.errorCodeArr = ['NRO3Y1hnC'];
      throw new Error();
    }
    
    
    
    
    // --------------------------------------------------
    //   データ更新
    // --------------------------------------------------
    
    let conditionObj = {};
    
    
    // ---------------------------------------------
    //   Update
    // ---------------------------------------------
    
    if (_id) {
      
      conditionObj = {
        _id
      };
      
      delete saveObj.createdDate;
      delete saveObj.users_id;
      
      saveObj = {
        $set: saveObj
      }
      
      
    // ---------------------------------------------
    //   Insert
    // ---------------------------------------------
      
    } else {
      
      conditionObj = {
        _id: shortid.generate()
      };
      
    }
    
    await ModelIDs.upsert({
      conditionObj,
      saveObj,
    });
    
    
    
    
    // --------------------------------------------------
    //   データ取得 / IDs
    //   ログインしているユーザーの登録IDデータ
    // --------------------------------------------------
    
    const returnObj = await ModelIDs.findBy_Users_idForForm({
      language: localeObj.language,
      country: localeObj.country,
      loginUsers_id
    });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    //   platform: {green ${platform}}
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   label: {green ${label}}
    //   id: {green ${id}}
    //   publicSetting: {green ${publicSetting}}
    //   search: {green ${search}}
    //   count: {green ${count}}
    //   process.env.ID_INSERT_LIMIT: {green ${process.env.ID_INSERT_LIMIT}}
    // `);
    
    // console.log(`\n---------- saveObj ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(saveObj)));
    // console.log(`\n-----------------------------------\n`);
    
    // console.log(`\n---------- returnObj ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(returnObj)));
    // console.log(`\n-----------------------------------\n`);
    
    
    // ---------------------------------------------
    //   Return Json Object / Success
    // ---------------------------------------------
    
    return res.status(200).json(returnObj);
    
    
  } catch (errorObj) {
    
    // console.log(`
    //   ----- errorArgumentsObj -----\n
    //   ${util.inspect(errorArgumentsObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    // ---------------------------------------------
    //   Error Object
    // ---------------------------------------------
    
    errorArgumentsObj.errorObj = errorObj;
    const resultErrorObj = errorCodeIntoErrorObj({ localeObj, ...errorArgumentsObj });
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
});




// --------------------------------------------------
//   削除 / endpointID: xE5KudSUz
// --------------------------------------------------

router.post('/delete', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: req.headers['accept-language']
  });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  errorArgumentsObj.functionID = 'xE5KudSUz';
  
  
  try {
    
    
    // --------------------------------------------------
    //   CSRF
    // --------------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    
    
    // --------------------------------------------------
    //   Login Check
    // --------------------------------------------------
    
    if (!req.isAuthenticated()) {
      statusCode = 401;
      errorArgumentsObj.errorCodeArr = ['xLLNIpo6a'];
      throw new Error();
    }
    
    const loginUsers_id = req.user._id;
    errorArgumentsObj.loginUsers_id = loginUsers_id;
    
    
    
    
    // --------------------------------------------------
    //   POST 取得
    // --------------------------------------------------
    
    const { _id } = req.body;
    
    
    // --------------------------------------------------
    //   Validation - _id
    // --------------------------------------------------
    
    const validationObj = await validationIDs_idServer({
      value: _id,
      loginUsers_id
    });
    
    // console.log(`\n---------- validationObj ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(validationObj)));
    // console.log(`\n-----------------------------------\n`);
    
    if (validationObj.error) {
      errorArgumentsObj.errorCodeArr = validationObj.errorCodeArr;
      throw new Error();
    }
    
    
    
    
    // --------------------------------------------------
    //   データ削除
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Condition Object
    // ---------------------------------------------
    
    const conditionObj = {
      _id,
      users_id: loginUsers_id
    };
    
    
    // --------------------------------------------------
    //   Delete
    // --------------------------------------------------
    
    await ModelIDs.deleteMany({
      conditionObj,
    });
    
    
    
    
    // --------------------------------------------------
    //   データ取得 / IDs
    //   ログインしているユーザーの登録IDデータ
    // --------------------------------------------------
    
    const returnObj = await ModelIDs.findBy_Users_idForForm({
      language: localeObj.language,
      country: localeObj.country,
      loginUsers_id
    });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    // `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(returnObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // ---------------------------------------------
    //   Return Json Object / Success
    // ---------------------------------------------
    
    return res.status(200).json(returnObj);
    
    
  } catch (errorObj) {
    
    // console.log(`
    //   ----- errorArgumentsObj -----\n
    //   ${util.inspect(errorArgumentsObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    // ---------------------------------------------
    //   Error Object
    // ---------------------------------------------
    
    errorArgumentsObj.errorObj = errorObj;
    const resultErrorObj = errorCodeIntoErrorObj({ localeObj, ...errorArgumentsObj });
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
});




module.exports = router;