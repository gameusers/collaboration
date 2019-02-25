// --------------------------------------------------
//   File ID: QOVB4jVBQ
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
const moment = require('moment');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../@modules/csrf');
const { errorCodeIntoErrorObj } = require('../../@modules/error/error-obj');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const validation_id = require('../../@validations/_id');
const { validationCardPlayers_idServer } = require('./validations/_id-server');
const { validationCardPlayersName } = require('./validations/name');
const { validationCardPlayersStatus } = require('./validations/status');
const { validationCardPlayersComment } = require('./validations/comment');
const { validationCardPlayersAge, validationCardPlayersAgeAlternativeText } = require('./validations/age');



// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelCardPlayers = require('./model');


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
  fileID: 'QOVB4jVBQ',
  functionID: '',
  errorCodeArr: [],
  errorObj: {},
};




// --------------------------------------------------
//   プレイヤーカードのデータを1件取得 / Function ID: A8rggT8XW
// --------------------------------------------------

router.post('/find-one-by-id', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: req.headers['accept-language']
  });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  errorArgumentsObj.functionID = 'A8rggT8XW';
  
  let returnObj = {};
  
  
  try {
    
    
    // --------------------------------------------------
    //   CSRF
    // --------------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   POST 取得 & Validation
    // --------------------------------------------------
    
    const { _id } = req.body;
    const validationObj = validation_id({ required: true, value: _id });
    
    if (validationObj.errorCodeArr.length > 0) {
      errorArgumentsObj.errorCodeArr = validationObj.errorCodeArr;
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   ログインしているユーザー情報
    // --------------------------------------------------
    
    let usersLogin_id = '';
    
    if (req.user) {
      usersLogin_id = req.user._id;
    }
    
    
    // --------------------------------------------------
    //   データ取得 / Card Players
    //   アクセスしたページ所有者のプレイヤーカード情報
    // --------------------------------------------------
    
    const cardPlayersObj = await ModelCardPlayers.findOneBy_id({
      _id,
      language: localeObj.language,
      country: localeObj.country,
      usersLogin_id
    });
    
    returnObj = cardPlayersObj;
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    // `);
    
    // console.log(`
    //   ----- validationObj -----\n
    //   ${util.inspect(validationObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- localeObj -----\n
    //   ${util.inspect(localeObj, { colors: true, depth: null })}\n
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
//   プレイヤーカードのデータを1件取得 / Function ID: 34KBpPcqT
// --------------------------------------------------

router.post('/find-one-by-id-for-edit-form', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: req.headers['accept-language']
  });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  errorArgumentsObj.functionID = '34KBpPcqT';
  
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
    
    const usersLogin_id = req.user._id;
    
    
    // --------------------------------------------------
    //   POST 取得 & Validation
    // --------------------------------------------------
    
    const { _id } = req.body;
    const validationObj = validation_id({ required: true, value: _id });
    
    if (validationObj.errorCodeArr.length > 0) {
      errorArgumentsObj.errorCodeArr = validationObj.errorCodeArr;
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   データ取得 / Card Players
    //   アクセスしたページ所有者のプレイヤーカード情報
    // --------------------------------------------------
    
    const cardPlayersObj = await ModelCardPlayers.findOneBy_idForEditForm({
      _id,
      language: localeObj.language,
      country: localeObj.country,
      usersLogin_id
    });
    
    returnObj = cardPlayersObj;
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    // `);
    
    // console.log(`
    //   ----- validationObj -----\n
    //   ${util.inspect(validationObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- localeObj -----\n
    //   ${util.inspect(localeObj, { colors: true, depth: null })}\n
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
//   更新 / Function ID: PKbgf0qOq
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
  
  errorArgumentsObj.functionID = 'PKbgf0qOq';
  
  
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
    
    const { obj } = req.body;
    
    
    // --------------------------------------------------
    //   Save Object
    // --------------------------------------------------
    
    let saveObj = JSON.parse(obj);
    
    
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    let validationObj = {};
    
    const val = (func, argumentsObj) => {
      
      const validationObj = func(argumentsObj);
      
      console.log(`
        ----- validationObj -----\n
        ${util.inspect(validationObj, { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      if (validationObj.error) {
        errorArgumentsObj.errorCodeArr = validationObj.errorCodeArr;
        throw new Error();
      }
      
    };
    
    
    // --------------------------------------------------
    //   ハンドルネーム
    // --------------------------------------------------
    
    val(validationCardPlayersName, { value: saveObj.nameObj.value });
    
    
    // --------------------------------------------------
    //   ステータス
    // --------------------------------------------------
    
    val(validationCardPlayersStatus, { value: saveObj.statusObj.value });
    
    
    // --------------------------------------------------
    //   コメント
    // --------------------------------------------------
    
    val(validationCardPlayersComment, { value: saveObj.commentObj.value });
    
    
    // --------------------------------------------------
    //   年齢
    // --------------------------------------------------
    
    val(validationCardPlayersAge, { value: saveObj.ageObj.value });
    val(validationCardPlayersAgeAlternativeText, { value: saveObj.ageObj.alternativeText });
    
    
    
    
    // --------------------------------------------------
    //   _id
    // --------------------------------------------------
    
    validationObj = await validationCardPlayers_idServer({
      value: saveObj._id,
      conditionObj: {
        _id: saveObj._id,
        users_id: usersLogin_id,
      }
    });
    
    if (validationObj.error) {
      errorArgumentsObj.errorCodeArr = validationObj.errorCodeArr;
      throw new Error();
    }
    
    
    
    
    // validationObj = validationCardPlayersComment({ value: saveObj.commentObj.value });
    
    // if (validationObj.error) {
    //   errorArgumentsObj.errorCodeArr = validationObj.errorCodeArr;
    //   throw new Error();
    // }
    
    
    // --------------------------------------------------
    //   Set Date & Delete Property
    // --------------------------------------------------
    
    const date = moment().utcOffset(0);
    saveObj.updatedDate = date;
    
    delete saveObj.createdDate;
    delete saveObj.users_id;
    delete saveObj.imageArr;
    delete saveObj.hardwareActiveArr;
    delete saveObj.hardwareInactiveArr;
    
    
    
    
    console.log(`
      ----- saveObj -----\n
      ${util.inspect(saveObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    
    
    
    return;
    
    
    // // --------------------------------------------------
    // //   Validation - platform
    // // --------------------------------------------------
    
    // const validationIDsPlatformObj = validationIDsPlatform({ required: true, platform });
    
    // if (validationIDsPlatformObj.errorCodeArr.length > 0) {
    //   errorArgumentsObj.errorCodeArr = validationIDsPlatformObj.errorCodeArr;
    //   throw new Error();
    // }
    
    // saveObj.platform = validationIDsPlatformObj.value;
    
    
    // // --------------------------------------------------
    // //   Validation - Game ID
    // // --------------------------------------------------
    
    // const noGameIDPlatformArr = ['PlayStation', 'Xbox', 'Nintendo', 'Steam'];
    
    // if (gameID && noGameIDPlatformArr.indexOf(platform) === -1) {
      
    //   const validationGamesGameIDServerObj = await validationGamesGameIDServer({
    //     required: true,
    //     gameID,
    //     conditionObj: {
    //       language: localeObj.language,
    //       country: localeObj.country,
    //       gameID,
    //     }
    //   });
      
    //   if (validationGamesGameIDServerObj.errorCodeArr.length > 0) {
    //     errorArgumentsObj.errorCodeArr = validationGamesGameIDServerObj.errorCodeArr;
    //     throw new Error();
    //   }
      
    //   saveObj.gameID = validationGamesGameIDServerObj.value;
      
    // }
    
    
    // // --------------------------------------------------
    // //   Validation - label
    // // --------------------------------------------------
    
    // const validationIDsLabelObj = validationIDsLabel({ required: false, label });
    
    // if (validationIDsLabelObj.errorCodeArr.length > 0) {
    //   errorArgumentsObj.errorCodeArr = validationIDsLabelObj.errorCodeArr;
    //   throw new Error();
    // }
    
    // saveObj.label = validationIDsLabelObj.value;
    
    
    // // --------------------------------------------------
    // //   Validation - id
    // // --------------------------------------------------
    
    // const validationIDsIDObj = validationIDsID({ required: true, id });
    
    // if (validationIDsIDObj.errorCodeArr.length > 0) {
    //   errorArgumentsObj.errorCodeArr = validationIDsIDObj.errorCodeArr;
    //   throw new Error();
    // }
    
    // saveObj.id = validationIDsIDObj.value;
    
    
    // // --------------------------------------------------
    // //   Validation - publicSetting
    // // --------------------------------------------------
    
    // const validationIDsPublicSettingObj = validationIDsPublicSetting({ required: true, publicSetting });
    
    // if (validationIDsPublicSettingObj.errorCodeArr.length > 0) {
    //   errorArgumentsObj.errorCodeArr = validationIDsPublicSettingObj.errorCodeArr;
    //   throw new Error();
    // }
    
    // saveObj.publicSetting = validationIDsPublicSettingObj.value;
    
    
    
    
    // // ---------------------------------------------
    // //   保存可能件数のチェック
    // //   オーバーしている場合は処理停止
    // // ---------------------------------------------
    
    // const count = await ModelIDs.count({
    //   conditionObj: {
    //     users_id: usersLogin_id,
    //   },
    // });
    
    // if (count > process.env.ID_INSERT_LIMIT) {
    //   errorArgumentsObj.errorCodeArr = ['NRO3Y1hnC'];
    //   throw new Error();
    // }
    
    
    
    
    // // --------------------------------------------------
    // //   データ更新
    // // --------------------------------------------------
    
    // let conditionObj = {};
    
    
    // // ---------------------------------------------
    // //   Update
    // // ---------------------------------------------
    
    // if (_id) {
      
    //   conditionObj = {
    //     _id
    //   };
      
    //   delete saveObj.createdDate;
    //   delete saveObj.users_id;
      
    //   saveObj = {
    //     $set: saveObj
    //   }
      
      
    // // ---------------------------------------------
    // //   Insert
    // // ---------------------------------------------
      
    // } else {
      
    //   conditionObj = {
    //     _id: shortid.generate()
    //   };
      
    // }
    
    // await ModelIDs.upsert({
    //   conditionObj,
    //   saveObj,
    // });
    
    
    
    
    // // --------------------------------------------------
    // //   データ取得 / IDs
    // //   ログインしているユーザーの登録IDデータ
    // // --------------------------------------------------
    
    // const returnObj = await ModelIDs.findBy_Users_idForForm({
    //   language: localeObj.language,
    //   country: localeObj.country,
    //   usersLogin_id
    // });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    //   platform: {green ${platform}}
    //   gameID: {green ${gameID}}
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
    
    // return res.status(200).json(returnObj);
    
    
  } catch (errorObj) {
    
    console.log(chalk`
      errorObj.message: {green ${errorObj.message}}
    `);
    
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