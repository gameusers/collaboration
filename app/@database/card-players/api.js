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

const { validation_id } = require('../../@validations/_id');
const { validationBoolean } = require('../../@validations/boolean');

const { validationCardPlayers_idServer } = require('./validations/_id-server');
const { validationCardPlayersName } = require('./validations/name');
const { validationCardPlayersStatus } = require('./validations/status');
const { validationCardPlayersComment } = require('./validations/comment');
const { validationCardPlayersAge, validationCardPlayersAgeAlternativeText } = require('./validations/age');
const { validationCardPlayersSex, validationCardPlayersSexAlternativeText } = require('./validations/sex');
const { validationCardPlayersAddressAlternativeText } = require('./validations/address');
const { validationCardPlayersGamingExperience, validationCardPlayersGamingExperienceAlternativeText } = require('./validations/gaming-experience');
const { validationCardPlayersHobby } = require('./validations/hobby');
const { validationCardPlayersSpecialSkill } = require('./validations/special-skill');
const { validationCardPlayersSmartphoneModel, validationCardPlayersSmartphoneComment } = require('./validations/smartphone');
const { validationCardPlayersTabletModel, validationCardPlayersTabletComment } = require('./validations/tablet');
const { validationCardPlayersPCModel, validationCardPlayersPCComment, validationCardPlayersPCSpec } = require('./validations/pc');
const { validationCardPlayersHardwareActiveArrServer, validationCardPlayersHardwareInactiveArrServer } = require('./validations/hardware-server');
const { validationCardPlayersIDArrServer } = require('./validations/id-server');
const { validationCardPlayersActivityTimeObjValueArr } = require('./validations/activity-time');
const { validationCardPlayersLookingForFriendsValue, validationCardPlayersLookingForFriendsComment, validationCardPlayersLookingForFriendsIcon } = require('./validations/looking-for-friends');
const { validationCardPlayersVoiceChatValue, validationCardPlayersVoiceChatComment } = require('./validations/voice-chat');
const { validationCardPlayersLinkArr } = require('./validations/link');




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

router.post('/update', upload.none(), async (req, res, next) => {
  
  
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
    
    // const val = (func, argumentsObj, name) => {
      
    //   const validationObj = func(argumentsObj);
      
      
    //   const title = name ? `${name} / ` : '';
    //   console.log(`\n---------- ${title}validationObj ----------\n`);
    //   console.dir(validationObj);
    //   console.log(`\n-----------------------------------\n`);
      
      
    //   if (validationObj.error) {
    //     errorArgumentsObj.errorCodeArr = validationObj.errorCodeArr;
    //     throw new Error();
    //   }
      
    //   return validationObj;
      
    // };
    
    
    // --------------------------------------------------
    //   ハンドルネーム
    // --------------------------------------------------
    
    await val(validationCardPlayersName, { value: saveObj.nameObj.value }, 'ハンドルネーム');
    await val(validationBoolean, { value: saveObj.nameObj.search });
    
    
    // --------------------------------------------------
    //   ステータス
    // --------------------------------------------------
    
    await val(validationCardPlayersStatus, { value: saveObj.statusObj.value }, 'ステータス');
    await val(validationBoolean, { value: saveObj.statusObj.search });
    
    
    // --------------------------------------------------
    //   コメント
    // --------------------------------------------------
    
    await val(validationCardPlayersComment, { value: saveObj.commentObj.value }, 'コメント');
    await val(validationBoolean, { value: saveObj.commentObj.search });
    
    
    // --------------------------------------------------
    //   年齢
    // --------------------------------------------------
    
    await val(validationCardPlayersAge, { value: saveObj.ageObj.value }, '年齢');
    await val(validationCardPlayersAgeAlternativeText, { value: saveObj.ageObj.alternativeText });
    await val(validationBoolean, { value: saveObj.ageObj.search });
    
    
    // --------------------------------------------------
    //   性別
    // --------------------------------------------------
    
    await val(validationCardPlayersSex, { value: saveObj.sexObj.value }, '性別');
    await val(validationCardPlayersSexAlternativeText, { value: saveObj.sexObj.alternativeText });
    await val(validationBoolean, { value: saveObj.sexObj.search });
    
    
    // --------------------------------------------------
    //   住所
    // --------------------------------------------------
    
    await val(validationCardPlayersAddressAlternativeText, { value: saveObj.addressObj.alternativeText }, '住所');
    await val(validationBoolean, { value: saveObj.addressObj.search });
    
    
    // --------------------------------------------------
    //   ゲーム歴
    // --------------------------------------------------
    
    await val(validationCardPlayersGamingExperience, { value: saveObj.gamingExperienceObj.value }, 'ゲーム歴');
    await val(validationCardPlayersGamingExperienceAlternativeText, { value: saveObj.gamingExperienceObj.alternativeText });
    await val(validationBoolean, { value: saveObj.gamingExperienceObj.search });
    
    
    // --------------------------------------------------
    //   趣味
    // --------------------------------------------------
    
    validationObj = await val(validationCardPlayersHobby, { valueArr: saveObj.hobbiesObj.valueArr }, '趣味');
    saveObj.hobbiesObj.valueArr = validationObj.valueArr;
    await val(validationBoolean, { value: saveObj.hobbiesObj.search });
    
    
    // --------------------------------------------------
    //   特技
    // --------------------------------------------------
    
    validationObj = await val(validationCardPlayersSpecialSkill, { valueArr: saveObj.specialSkillsObj.valueArr }, '特技');
    saveObj.specialSkillsObj.valueArr = validationObj.valueArr;
    await val(validationBoolean, { value: saveObj.specialSkillsObj.search });
    
    
    // --------------------------------------------------
    //   スマートフォン
    // --------------------------------------------------
    
    await val(validationCardPlayersSmartphoneModel, { value: saveObj.smartphoneObj.model }, 'スマートフォン');
    await val(validationCardPlayersSmartphoneComment, { value: saveObj.smartphoneObj.comment });
    await val(validationBoolean, { value: saveObj.smartphoneObj.search });
    
    
    // --------------------------------------------------
    //   タブレット
    // --------------------------------------------------
    
    await val(validationCardPlayersTabletModel, { value: saveObj.tabletObj.model }, 'タブレット');
    await val(validationCardPlayersTabletComment, { value: saveObj.tabletObj.comment });
    await val(validationBoolean, { value: saveObj.tabletObj.search });
    
    
    // --------------------------------------------------
    //   PC
    // --------------------------------------------------
    
    await val(validationCardPlayersPCModel, { value: saveObj.pcObj.model }, 'PC');
    await val(validationCardPlayersPCComment, { value: saveObj.pcObj.comment });
    await val(validationCardPlayersPCSpec, { valueObj: saveObj.pcObj.specsObj });
    await val(validationBoolean, { value: saveObj.pcObj.search });
    
    
    // --------------------------------------------------
    //   所有ハードウェア
    // --------------------------------------------------
    
    validationObj = await val(validationCardPlayersHardwareActiveArrServer, { valueArr: saveObj.hardwareActiveArr }, '所有ハードウェア');
    saveObj.hardwareActiveObj.valueArr = validationObj.valueArr;
    await val(validationBoolean, { value: saveObj.hardwareActiveObj.search });
    
    
    // --------------------------------------------------
    //   昔、所有していたハードウェア
    // --------------------------------------------------
    
    validationObj = await val(validationCardPlayersHardwareInactiveArrServer, { valueArr: saveObj.hardwareInactiveArr }, '昔、所有していたハードウェア');
    saveObj.hardwareInactiveObj.valueArr = validationObj.valueArr;
    await val(validationBoolean, { value: saveObj.hardwareInactiveObj.search });
    
    
    // --------------------------------------------------
    //   ID
    // --------------------------------------------------
    
    validationObj = await val(validationCardPlayersIDArrServer, { valueArr: saveObj.idArr, usersLogin_id }, 'ID');
    saveObj.idArr = validationObj.valueArr;
    
    
    // --------------------------------------------------
    //   活動時間
    // --------------------------------------------------
    
    validationObj = await val(validationCardPlayersActivityTimeObjValueArr, { valueArr: saveObj.activityTimeObj.valueArr }, '活動時間');
    saveObj.activityTimeObj.valueArr = validationObj.valueArr;
    await val(validationBoolean, { value: saveObj.activityTimeObj.search });
    
    
    // --------------------------------------------------
    //   フレンド募集
    // --------------------------------------------------
    
    await val(validationCardPlayersLookingForFriendsValue, { value: saveObj.lookingForFriendsObj.value }, 'フレンド募集');
    await val(validationCardPlayersLookingForFriendsComment, { value: saveObj.lookingForFriendsObj.comment });
    await val(validationCardPlayersLookingForFriendsIcon, { value: saveObj.lookingForFriendsObj.icon });
    await val(validationBoolean, { value: saveObj.lookingForFriendsObj.search });
    
    
    // --------------------------------------------------
    //   ボイスチャット
    // --------------------------------------------------
    
    await val(validationCardPlayersVoiceChatValue, { value: saveObj.voiceChatObj.value }, 'ボイスチャット');
    await val(validationCardPlayersVoiceChatComment, { value: saveObj.voiceChatObj.comment });
    await val(validationBoolean, { value: saveObj.voiceChatObj.search });
    
    
    // --------------------------------------------------
    //   リンク
    // --------------------------------------------------
    
    validationObj = await val(validationCardPlayersLinkArr, { valueArr: saveObj.linkArr }, 'リンク');
    saveObj.linkArr = validationObj.valueArr;
    
    
    // --------------------------------------------------
    //   _id
    // --------------------------------------------------
    
    await val(validationCardPlayers_idServer, { value: saveObj._id, usersLogin_id }, '_id');
    
    
    
    
    // --------------------------------------------------
    //   Set Date & Delete Property
    // --------------------------------------------------
    
    const ISO8601 = moment().toISOString();
    saveObj.updatedDate = ISO8601;
    
    delete saveObj.createdDate;
    delete saveObj.users_id;
    delete saveObj.imageArr;
    delete saveObj.hardwareActiveArr;
    delete saveObj.hardwareInactiveArr;
    
    
    // console.log(chalk`
    //   ISO8601: {green ${ISO8601}}
    //   moment().toISOString(true): {green ${moment().toISOString(true)}}
    //   moment().toISOString(): {green ${moment().toISOString()}}
    //   Date.prototype.toISOString: {green ${Date.prototype.toISOString}}
    // `);
    
    console.log(`\n---------- saveObj ----------\n`);
    console.dir(saveObj);
    console.log(`\n-----------------------------------\n`);
    
    
    
    
    return;
    
    
    
    
    
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