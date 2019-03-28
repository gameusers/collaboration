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
const upload = multer({
  dest: 'static/img',
  limits: { fieldSize: 25 * 1024 * 1024 } // アップロードできるファイルサイズ、25MBまで
});
const moment = require('moment');
const lodashGet = require('lodash/get');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../@modules/csrf');
const { errorCodeIntoErrorObj } = require('../../@modules/error/error-obj');
const { imageSave } = require('../../@modules/image-server');


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
  usersLogin_id: ''
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
    errorArgumentsObj.usersLogin_id = usersLogin_id;
    
    
    
    
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
    const _id = saveObj._id;
    
    
    
    
    // --------------------------------------------------
    //   Set Date & Delete Property
    // --------------------------------------------------
    
    const ISO8601 = moment().toISOString();
    saveObj.updatedDate = ISO8601;
    
    delete saveObj._id;
    delete saveObj.createdDate;
    delete saveObj.users_id;
    delete saveObj.imageArr;
    delete saveObj.hardwareActiveArr;
    delete saveObj.hardwareInactiveArr;
    
    
    
    
    // --------------------------------------------------
    //   データ取得 / Card Players
    //   現在の画像情報を取得する
    // --------------------------------------------------
    
    const returnArr = await ModelCardPlayers.find({
      conditionObj: {
        _id
      }
    });
    
    const oldImagesAndVideosObj = lodashGet(returnArr, [0, 'imagesAndVideosObj'], {});
    
    const newImagesAndVideosObj = lodashGet(saveObj, ['imagesAndVideosObj'], {});
    
    
    
    // --------------------------------------------------
    //   画像を保存＆削除する
    // --------------------------------------------------
    
    // const newArr = [ { _id: 'akFbZfUMno',
    // type: 'image',
    // caption: '',
    // srcSetArr:
    // [ { _id: 'WRkKrBEGh',
    //     src:
    //       'data:image/png;base64,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',
    //     w: 'upload',
    //     width: 512,
    //     height: 512 } ] } ];
    
    // const imageArr = await imageSave({
    //   // newObj: newImagesAndVideosObj,
    //   // oldObj: oldImagesAndVideosObj,
    //   newArr,
    //   oldArr: oldImagesAndVideosObj.thumbnailArr,
    //   directoryPath: `static/img/card/players/test/thumbnail/`
    // });
    
    
    // const imageArr = await imageSave({
    //   newArr: newImagesAndVideosObj.thumbnailArr,
    //   oldArr: oldImagesAndVideosObj.thumbnailArr,
    //   directoryPath: `static/img/card/players/${saveObj._id}/`
    // });
    
    const thumbnailArr = await imageSave({
      newArr: newImagesAndVideosObj.thumbnailArr,
      oldArr: oldImagesAndVideosObj.thumbnailArr,
      directoryPath: `static/img/card/players/test/thumbnail/`,
      minSize: 128,
      square: true
    });
    
    // const imageArr = await imageSave({
    //   newArr: newImagesAndVideosObj.thumbnailArr,
    //   oldArr: oldImagesAndVideosObj.thumbnailArr,
    //   directoryPath: `static/img/card/players/${saveObj._id}/`,
    //   minSize: 128,
    //   square: true
    // });
    
    saveObj.imagesAndVideosObj.thumbnailArr = thumbnailArr;
    
    
    
    
    const mainArr = await imageSave({
      newArr: newImagesAndVideosObj.mainArr,
      oldArr: oldImagesAndVideosObj.mainArr,
      directoryPath: `static/img/card/players/test/main/`,
    });
    
    saveObj.imagesAndVideosObj.mainArr = mainArr;
    
    
    
    
    // --------------------------------------------------
    //   データ更新
    // --------------------------------------------------
    
    const conditionObj = { _id, users_id: usersLogin_id, };
    
    const setSaveObj = {
      $set: saveObj
    };
    
    await ModelCardPlayers.upsert({
      conditionObj,
      saveObj: setSaveObj
    });
    
    
    
    
    // --------------------------------------------------
    //   Return Object
    // --------------------------------------------------
    
    const returnObj = {};
    
    
    // --------------------------------------------------
    //   データ取得 / Card Players
    //   プレイヤーカード情報
    // --------------------------------------------------
    
    const cardPlayersObj = await ModelCardPlayers.findForCardPlayer({
      users_id: usersLogin_id,
      language: localeObj.language,
      country: localeObj.country,
      usersLogin_id
    });
    
    returnObj.cardPlayersObj = cardPlayersObj;
    
    
    // --------------------------------------------------
    //   データ取得 / Card Players
    //   プレイヤーカード情報 / 編集フォーム用
    // --------------------------------------------------
    
    const cardPlayersForEditFormObj = await ModelCardPlayers.findOneBy_idForEditForm({
      _id,
      language: localeObj.language,
      country: localeObj.country,
      usersLogin_id
    });
    
    returnObj.cardPlayersForEditFormObj = cardPlayersForEditFormObj;
    
    
    
    
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
    
     // console.log(chalk`
    //   ISO8601: {green ${ISO8601}}
    // `);
    
    // console.log(`
    //   ----- saveObj / ${ISO8601} -----\n
    //   ${util.inspect(saveObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- resultUpsertObj / ${ISO8601} -----\n
    //   ${util.inspect(resultUpsertObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- cardPlayersObj / ${ISO8601} -----\n
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
    
    console.log(chalk`
      errorObj.message: {green ${errorObj.message}}
    `);
    
    console.log(`
      ----- errorObj -----\n
      ${util.inspect(errorObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
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