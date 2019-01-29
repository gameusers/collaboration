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
const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'static/' });
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

const validation_id = require('./validations/_id');
const validationPlatform = require('./validations/platform');
const validationLabel = require('./validations/label');
const validationID = require('./validations/id');
const validationPublicSetting = require('./validations/public-setting');
const validationGameID = require('../games/validations/game-id');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelIDs = require('./model');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { addLocaleData } = require('react-intl');
const en = require('react-intl/locale-data/en');
const ja = require('react-intl/locale-data/ja');
addLocaleData([...en, ...ja]);

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
};




// --------------------------------------------------
//   IDデータをユーザーIDから取得 / Function ID: XwchAk4yT
// --------------------------------------------------

router.post('/find-by-users-id-for-form', upload.none(), async (req, res, next) => {
  
  
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
    
    
    // --------------------------------------------------
    //   Locale
    // --------------------------------------------------
    
    const localeObj = locale({
      acceptLanguage: req.headers['accept-language']
    });
    
    
    // --------------------------------------------------
    //   POST 取得 & Validation
    // --------------------------------------------------
    
    // const { users_id } = req.body;
    // const validationObj = validation_id(users_id);
    
    // if (validationObj.error) {
    //   statusCode = 400;
    //   errorArgumentsObj.errorCodeArr = ['xXQ6zimji'];
    //   throw new Error();
    // }
    
    
    // --------------------------------------------------
    //   ログインしているユーザー情報
    // --------------------------------------------------
    
    const usersLogin_id = req.user._id;
    
    
    // --------------------------------------------------
    //   データ取得 / IDs
    //   ログインしているユーザーの登録IDデータ
    // --------------------------------------------------
    
    const resultIDsObj = await ModelIDs.findBy_Users_idForForm({
      language: localeObj.language,
      country: localeObj.country,
      usersLogin_id
    });
    
    returnObj = resultIDsObj;
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(chalk`
    //   usersLogin_id: {green ${usersLogin_id}}
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
    const resultErrorObj = errorCodeIntoErrorObj(errorArgumentsObj);
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
});




// --------------------------------------------------
//   更新 / Function ID: YTP9v6kk_
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
    
    const usersLogin_id = req.user._id;
    
    
    
    
    // --------------------------------------------------
    //   POST 取得
    // --------------------------------------------------
    
    const { _id, platform, gameID, label, id, publicSetting, search } = req.body;
    
    
    
    
    // --------------------------------------------------
    //   Save Object
    // --------------------------------------------------
    
    const date = moment().utcOffset(0);
    
    let saveObj = {
      createdDate: date,
      updatedDate: date,
      users_id: usersLogin_id,
      platform: 'Other',
      gameID: '',
      label: '',
      id: '',
      publicSetting: 5,
      search: search ? true : false
    };
    
    
    
    
    // --------------------------------------------------
    //   Validation - _id
    // --------------------------------------------------
    
    if (_id) {
      
      const validation_idObj = await validation_id({ usersLogin_id, _id });
      
      if (validation_idObj.errorCodeArr.length > 0) {
        errorArgumentsObj.errorCodeArr = validation_idObj.errorCodeArr;
        throw new Error();
      }
      
    }
    
    
    // --------------------------------------------------
    //   Validation - platform
    // --------------------------------------------------
    
    const validationPlatformObj = validationPlatform({ platform });
    
    if (validationPlatformObj.errorCodeArr.length > 0) {
      errorArgumentsObj.errorCodeArr = validationPlatformObj.errorCodeArr;
      throw new Error();
    }
    
    saveObj.platform = validationPlatformObj.afterValue;
    
    
    // --------------------------------------------------
    //   Validation - Game ID
    // --------------------------------------------------
    
    const noGameIDPlatformArr = ['PlayStation', 'Xbox', 'Nintendo', 'Steam'];
    
    if (gameID && noGameIDPlatformArr.indexOf(platform) === -1) {
      
      const validationGameIDObj = await validationGameID({
        language: localeObj.language,
        country: localeObj.country,
        gameID
      });
      
      if (validationGameIDObj.errorCodeArr.length > 0) {
        errorArgumentsObj.errorCodeArr = validationGameIDObj.errorCodeArr;
        throw new Error();
      }
      
      saveObj.gameID = validationGameIDObj.afterValue;
      
    }
    
    
    // --------------------------------------------------
    //   Validation - label
    // --------------------------------------------------
    
    const validationLabelObj = validationLabel({ label });
    
    if (validationLabelObj.errorCodeArr.length > 0) {
      errorArgumentsObj.errorCodeArr = validationLabelObj.errorCodeArr;
      throw new Error();
    }
    
    saveObj.label = validationLabelObj.afterValue;
    
    
    // --------------------------------------------------
    //   Validation - id
    // --------------------------------------------------
    
    const validationIDObj = validationID({ id });
    
    if (validationIDObj.errorCodeArr.length > 0) {
      errorArgumentsObj.errorCodeArr = validationIDObj.errorCodeArr;
      throw new Error();
    }
    
    saveObj.id = validationIDObj.afterValue;
    
    
    // --------------------------------------------------
    //   Validation - publicSetting
    // --------------------------------------------------
    
    const validationPublicSettingObj = validationPublicSetting({ publicSetting });
    
    if (validationPublicSettingObj.errorCodeArr.length > 0) {
      errorArgumentsObj.errorCodeArr = validationPublicSettingObj.errorCodeArr;
      throw new Error();
    }
    
    saveObj.publicSetting = validationPublicSettingObj.afterValue;
    
    
    
    
    // ---------------------------------------------
    //   保存可能件数のチェック
    //   オーバーしている場合は処理停止
    // ---------------------------------------------
    
    const count = await ModelIDs.count({
      conditionObj: {
        users_id: usersLogin_id,
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
      usersLogin_id
    });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    //   platform: {green ${platform}}
    //   label: {green ${label}}
    //   id: {green ${id}}
    //   publicSetting: {green ${publicSetting}}
    //   search: {green ${search}}
    //   count: {green ${count}}
    //   process.env.ID_INSERT_LIMIT: {green ${process.env.ID_INSERT_LIMIT}}
    // `);
    
    // console.log(`
    //   ----- saveObj -----\n
    //   ${util.inspect(saveObj, { colors: true, depth: null })}\n
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
//   削除 / Function ID: xE5KudSUz
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
    
    const usersLogin_id = req.user._id;
    
    
    // --------------------------------------------------
    //   POST 取得
    // --------------------------------------------------
    
    const { _id } = req.body;
    
    
    // --------------------------------------------------
    //   Validation - _id
    // --------------------------------------------------
    
    const validation_idObj = await validation_id({ usersLogin_id, _id });
    
    if (validation_idObj.errorCodeArr.length > 0) {
      errorArgumentsObj.errorCodeArr = validation_idObj.errorCodeArr;
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
      users_id: usersLogin_id
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
      usersLogin_id
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