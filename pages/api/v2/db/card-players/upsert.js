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

const shortid = require('shortid');
const moment = require('moment');
const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelCardPlayers = require('../../../../../app/@database/card-players/model');
const ModelImagesAndVideos = require('../../../../../app/@database/images-and-videos/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../../../../app/@modules/csrf');
const { returnErrorsArr } = require('../../../../../app/@modules/log/log');
const { CustomError } = require('../../../../../app/@modules/error/custom');
const { formatAndSave } = require('../../../../../app/@modules/image/save');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationIP } = require('../../../../../app/@validations/ip');
const { validationBoolean } = require('../../../../../app/@validations/boolean');

const { validationCardPlayers_idServer } = require('../../../../../app/@database/card-players/validations/_id-server');
const { validationCardPlayersName } = require('../../../../../app/@database/card-players/validations/name');
const { validationCardPlayersStatus } = require('../../../../../app/@database/card-players/validations/status');
const { validationCardPlayersComment } = require('../../../../../app/@database/card-players/validations/comment');
const { validationCardPlayersAge, validationCardPlayersAgeAlternativeText } = require('../../../../../app/@database/card-players/validations/age');
const { validationCardPlayersSex, validationCardPlayersSexAlternativeText } = require('../../../../../app/@database/card-players/validations/sex');
const { validationCardPlayersAddressAlternativeText } = require('../../../../../app/@database/card-players/validations/address');
const { validationCardPlayersGamingExperience, validationCardPlayersGamingExperienceAlternativeText } = require('../../../../../app/@database/card-players/validations/gaming-experience');
const { validationCardPlayersHobby } = require('../../../../../app/@database/card-players/validations/hobby');
const { validationCardPlayersSpecialSkill } = require('../../../../../app/@database/card-players/validations/special-skill');
const { validationCardPlayersSmartphoneModel, validationCardPlayersSmartphoneComment } = require('../../../../../app/@database/card-players/validations/smartphone');
const { validationCardPlayersTabletModel, validationCardPlayersTabletComment } = require('../../../../../app/@database/card-players/validations/tablet');
const { validationCardPlayersPCModel, validationCardPlayersPCComment, validationCardPlayersPCSpec } = require('../../../../../app/@database/card-players/validations/pc');
const { validationCardPlayersHardwareActiveArrServer, validationCardPlayersHardwareInactiveArrServer } = require('../../../../../app/@database/card-players/validations/hardware-server');
// const { validationCardPlayersIDArrServer } = require('../../../../../app/@database/card-players/validations/id-server');
const { validationCardPlayersActivityTimeObjValueArr } = require('../../../../../app/@database/card-players/validations/activity-time');
const { validationCardPlayersLookingForFriendsValue, validationCardPlayersLookingForFriendsComment, validationCardPlayersLookingForFriendsIcon } = require('../../../../../app/@database/card-players/validations/looking-for-friends');
const { validationCardPlayersVoiceChatValue, validationCardPlayersVoiceChatComment } = require('../../../../../app/@database/card-players/validations/voice-chat');
const { validationCardPlayersLinkArr } = require('../../../../../app/@database/card-players/validations/link');

const { validationIDs_idArrServer } = require('../../../../../app/@database/ids/validations/_id-server');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { locale } = require('../../../../../app/@locales/locale');




// --------------------------------------------------
//   endpointID: DKo69_LP9
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
  
  let returnObj = {};
  const requestParametersObj = {};
  const loginUsers_id = lodashGet(req, ['user', '_id'], '');
  
  
  
  
  try {
    
    
    // --------------------------------------------------
    //   POST Data
    // --------------------------------------------------
    
    const bodyObj = JSON.parse(req.body);
    
    const {
      
      _id,
      nameObj,
      statusObj,
      commentObj,
      ageObj,
      sexObj,
      addressObj,
      gamingExperienceObj,
      hobbiesObj,
      specialSkillsObj,
      smartphoneObj,
      tabletObj,
      pcObj,
      hardwareActiveObj,
      hardwareInactiveObj,
      ids_idArr,
      activityTimeObj,
      lookingForFriendsObj,
      voiceChatObj,
      linkArr,
      imagesAndVideos_id,
      imagesAndVideosObj,
      imagesAndVideosThumbnail_id,
      imagesAndVideosThumbnailObj,
      
    } = bodyObj;
    
    // console.log(`
    //   ----- ageObj -----\n
    //   ${util.inspect(ageObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    lodashSet(requestParametersObj, ['_id'], _id);
    lodashSet(requestParametersObj, ['nameObj'], nameObj);
    lodashSet(requestParametersObj, ['statusObj'], statusObj);
    lodashSet(requestParametersObj, ['commentObj'], commentObj);
    lodashSet(requestParametersObj, ['ageObj'], ageObj);
    lodashSet(requestParametersObj, ['sexObj'], sexObj);
    lodashSet(requestParametersObj, ['addressObj'], addressObj);
    lodashSet(requestParametersObj, ['gamingExperienceObj'], gamingExperienceObj);
    lodashSet(requestParametersObj, ['hobbiesObj'], hobbiesObj);
    lodashSet(requestParametersObj, ['specialSkillsObj'], specialSkillsObj);
    lodashSet(requestParametersObj, ['smartphoneObj'], smartphoneObj);
    lodashSet(requestParametersObj, ['tabletObj'], tabletObj);
    lodashSet(requestParametersObj, ['pcObj'], pcObj);
    lodashSet(requestParametersObj, ['hardwareActiveObj'], hardwareActiveObj);
    lodashSet(requestParametersObj, ['hardwareInactiveObj'], hardwareInactiveObj);
    lodashSet(requestParametersObj, ['ids_idArr'], []);
    lodashSet(requestParametersObj, ['activityTimeObj'], activityTimeObj);
    lodashSet(requestParametersObj, ['lookingForFriendsObj'], lookingForFriendsObj);
    lodashSet(requestParametersObj, ['voiceChatObj'], voiceChatObj);
    lodashSet(requestParametersObj, ['linkArr'], linkArr);
    lodashSet(requestParametersObj, ['imagesAndVideos_id'], imagesAndVideos_id);
    lodashSet(requestParametersObj, ['imagesAndVideosObj'], {});
    lodashSet(requestParametersObj, ['imagesAndVideosThumbnail_id'], imagesAndVideosThumbnail_id);
    lodashSet(requestParametersObj, ['imagesAndVideosThumbnailObj'], {});
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Login Check
    // --------------------------------------------------
    
    if (!req.isAuthenticated()) {
      statusCode = 403;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: '8XcKQ7hce', messageID: 'xLLNIpo6a' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    await validationIP({ throwError: true, value: req.ip });
    
    
    // ---------------------------------------------
    //   - _id
    // ---------------------------------------------
    
    await validationCardPlayers_idServer({ throwError: true, value: _id, loginUsers_id });
    
    
    // ---------------------------------------------
    //   - ハンドルネーム
    // ---------------------------------------------
    
    await validationCardPlayersName({ throwError: true, value: nameObj.value });
    await validationBoolean({ throwError: true, value: nameObj.search });
    
    if (Object.keys(nameObj).length !== 2) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'NiN1I-nNK', messageID: '3mDvfqZHV' }] });
    }
    
    
    // ---------------------------------------------
    //   - ステータス
    // ---------------------------------------------
    
    await validationCardPlayersStatus({ throwError: true, value: statusObj.value });
    await validationBoolean({ throwError: true, value: statusObj.search });
    
    if (Object.keys(statusObj).length !== 2) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'YQbotVBZ9', messageID: '3mDvfqZHV' }] });
    }
    
    
    // ---------------------------------------------
    //   - コメント
    // ---------------------------------------------
    
    await validationCardPlayersComment({ throwError: true, value: commentObj.value });
    await validationBoolean({ throwError: true, value: commentObj.search });
    
    if (Object.keys(commentObj).length !== 2) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'Zb8nAXY5y', messageID: '3mDvfqZHV' }] });
    }
    
    
    // ---------------------------------------------
    //   - 年齢
    // ---------------------------------------------
    
    await validationCardPlayersAge({ throwError: true, value: ageObj.value });
    await validationCardPlayersAgeAlternativeText({ throwError: true, value: ageObj.alternativeText });
    await validationBoolean({ throwError: true, value: ageObj.search });
    
    if (Object.keys(ageObj).length !== 3) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'bMm1hCGGg', messageID: '3mDvfqZHV' }] });
    }
    
    
    // ---------------------------------------------
    //   - 性別
    // ---------------------------------------------
    
    await validationCardPlayersSex({ throwError: true, value: sexObj.value });
    await validationCardPlayersSexAlternativeText({ throwError: true, value: sexObj.alternativeText });
    await validationBoolean({ throwError: true, value: sexObj.search });
    
    if (Object.keys(sexObj).length !== 3) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'JN81mRt-_', messageID: '3mDvfqZHV' }] });
    }
    
    
    // ---------------------------------------------
    //   - 住所
    // ---------------------------------------------
    
    await validationCardPlayersAddressAlternativeText({ throwError: true, value: addressObj.value });
    await validationBoolean({ throwError: true, value: addressObj.search });
    
    if (Object.keys(addressObj).length !== 3) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'bV7lefvKr', messageID: '3mDvfqZHV' }] });
    }
    
    
    // ---------------------------------------------
    //   - ゲーム歴
    // ---------------------------------------------
    
    await validationCardPlayersGamingExperience({ throwError: true, value: gamingExperienceObj.value });
    await validationCardPlayersGamingExperienceAlternativeText({ throwError: true, value: gamingExperienceObj.alternativeText });
    await validationBoolean({ throwError: true, value: gamingExperienceObj.search });
    
    if (Object.keys(gamingExperienceObj).length !== 3) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'JN81mRt-_', messageID: '3mDvfqZHV' }] });
    }
    
    
    // ---------------------------------------------
    //   - 趣味
    // ---------------------------------------------
    
    await validationCardPlayersHobby({ throwError: true, valueArr: hobbiesObj.valueArr });
    await validationBoolean({ throwError: true, value: hobbiesObj.search });
    
    if (Object.keys(hobbiesObj).length !== 2) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: '6d0Cofy9_', messageID: '3mDvfqZHV' }] });
    }
    
    
    // ---------------------------------------------
    //   - 特技
    // ---------------------------------------------
    
    await validationCardPlayersSpecialSkill({ throwError: true, valueArr: specialSkillsObj.valueArr });
    await validationBoolean({ throwError: true, value: specialSkillsObj.search });
    
    if (Object.keys(specialSkillsObj).length !== 2) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'Iu5UbfKL9', messageID: '3mDvfqZHV' }] });
    }
    
    
    // ---------------------------------------------
    //   - スマートフォン
    // ---------------------------------------------
    
    await validationCardPlayersSmartphoneModel({ throwError: true, value: smartphoneObj.model });
    await validationCardPlayersSmartphoneComment({ throwError: true, value: smartphoneObj.comment });
    await validationBoolean({ throwError: true, value: smartphoneObj.search });
    
    if (Object.keys(smartphoneObj).length !== 3) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'PTUirZHOa', messageID: '3mDvfqZHV' }] });
    }
    
    
    // ---------------------------------------------
    //   - タブレット
    // ---------------------------------------------
    
    await validationCardPlayersTabletModel({ throwError: true, value: tabletObj.model });
    await validationCardPlayersTabletComment({ throwError: true, value: tabletObj.comment });
    await validationBoolean({ throwError: true, value: tabletObj.search });
    
    if (Object.keys(tabletObj).length !== 3) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'fYRjLAmsS', messageID: '3mDvfqZHV' }] });
    }
    
    
    // ---------------------------------------------
    //   - PC
    // ---------------------------------------------
    
    await validationCardPlayersPCModel({ throwError: true, value: pcObj.model });
    await validationCardPlayersPCComment({ throwError: true, value: pcObj.comment });
    await validationCardPlayersPCSpec({ throwError: true, valueObj: pcObj.specsObj });
    await validationBoolean({ throwError: true, value: pcObj.search });
    
    if (Object.keys(pcObj).length !== 4) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: '9tP9T_0Uc', messageID: '3mDvfqZHV' }] });
    }
    
    
    // ---------------------------------------------
    //   - 所有ハードウェア
    // ---------------------------------------------
    
    const validatedHardwareActiveObj = await validationCardPlayersHardwareActiveArrServer({ throwError: true, valueArr: hardwareActiveObj.valueArr });
    await validationBoolean({ throwError: true, value: hardwareActiveObj.search });
    
    if (Object.keys(hardwareActiveObj).length !== 2) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: '4i7mp4lw8', messageID: '3mDvfqZHV' }] });
    }
    
    
    // ---------------------------------------------
    //   - 昔、所有していたハードウェア
    // ---------------------------------------------
    
    const validatedHardwareInactiveObj = await validationCardPlayersHardwareInactiveArrServer({ throwError: true, valueArr: hardwareInactiveObj.valueArr });
    await validationBoolean({ throwError: true, value: hardwareInactiveObj.search });
    
    if (Object.keys(hardwareInactiveObj).length !== 2) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'D1H6NUQ2x', messageID: '3mDvfqZHV' }] });
    }
    
    
    // ---------------------------------------------
    //   - ID
    // ---------------------------------------------
    
    const validatedIDs_idArrObj = await validationIDs_idArrServer({ valueArr: ids_idArr, loginUsers_id });
    
    
    // ---------------------------------------------
    //   - 活動時間
    // ---------------------------------------------
    
    await validationCardPlayersActivityTimeObjValueArr({ throwError: true, valueArr: activityTimeObj.valueArr });
    await validationBoolean({ throwError: true, value: activityTimeObj.search });
    
    if (Object.keys(activityTimeObj).length !== 2) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'FEhzo-7WZ', messageID: '3mDvfqZHV' }] });
    }
    
    
    // ---------------------------------------------
    //   - フレンド募集
    // ---------------------------------------------
    
    await validationCardPlayersLookingForFriendsValue({ throwError: true, value: lookingForFriendsObj.value });
    await validationCardPlayersLookingForFriendsComment({ throwError: true, value: lookingForFriendsObj.comment });
    await validationCardPlayersLookingForFriendsIcon({ throwError: true, value: lookingForFriendsObj.icon });
    await validationBoolean({ throwError: true, value: lookingForFriendsObj.search });
    
    if (Object.keys(lookingForFriendsObj).length !== 4) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'O69WGDAX7', messageID: '3mDvfqZHV' }] });
    }
    
    
    // ---------------------------------------------
    //   - ボイスチャット
    // ---------------------------------------------
    
    await validationCardPlayersVoiceChatValue({ throwError: true, value: voiceChatObj.value });
    await validationCardPlayersVoiceChatComment({ throwError: true, value: voiceChatObj.comment });
    await validationBoolean({ throwError: true, value: voiceChatObj.search });
    
    if (Object.keys(voiceChatObj).length !== 3) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: '5vBi76LZw', messageID: '3mDvfqZHV' }] });
    }
    
    
    // ---------------------------------------------
    //   - リンク
    // ---------------------------------------------
    
    await validationCardPlayersLinkArr({ throwError: true, valueArr: linkArr });
    
    
    
    
    // --------------------------------------------------
    //   Datetime
    // --------------------------------------------------
    
    const ISO8601 = moment().toISOString();
    
    
    
    
    // --------------------------------------------------
    //   メイン画像を保存する
    // --------------------------------------------------
    
    let imagesAndVideosConditionObj = {};
    let imagesAndVideosSaveObj = {};
    let newImagesAndVideos_id = imagesAndVideos_id;
    
    if (imagesAndVideosObj) {
      
      
      // --------------------------------------------------
      //   現在の画像データを取得する
      // --------------------------------------------------
      
      const oldImagesAndVideosObj = await ModelImagesAndVideos.findOne({
        
        conditionObj: {
          _id: imagesAndVideos_id,
          users_id: loginUsers_id,
        }
        
      });
      
      
      // --------------------------------------------------
      //   保存する
      // --------------------------------------------------
      
      const formatAndSaveObj = await formatAndSave({
        
        newObj: imagesAndVideosObj,
        oldObj: oldImagesAndVideosObj,
        loginUsers_id,
        ISO8601,
        
      });
      
      imagesAndVideosSaveObj = lodashGet(formatAndSaveObj, ['imagesAndVideosObj'], {});
      
      
      // --------------------------------------------------
      //   画像＆動画がすべて削除されている場合は、newImagesAndVideos_id を空にする
      // --------------------------------------------------
      
      const arr = lodashGet(imagesAndVideosSaveObj, ['arr'], []);
      
      if (arr.length === 0) {
        newImagesAndVideos_id = '';
      } else {
        newImagesAndVideos_id = lodashGet(imagesAndVideosSaveObj, ['_id'], '');
      }
      
      
      // --------------------------------------------------
      //   imagesAndVideosConditionObj
      // --------------------------------------------------
      
      imagesAndVideosConditionObj = {
        _id: lodashGet(imagesAndVideosSaveObj, ['_id'], ''),
      };
      
      
    }
    
    
    
    
    // --------------------------------------------------
    //   サムネイル画像を保存する
    // --------------------------------------------------
    
    let imagesAndVideosThumbnailConditionObj = {};
    let imagesAndVideosThumbnailSaveObj = {};
    let newImagesAndVideosThumbnail_id = imagesAndVideosThumbnail_id;
    
    if (imagesAndVideosThumbnailObj) {
      
      
      // --------------------------------------------------
      //   現在の画像データを取得する
      // --------------------------------------------------
      
      const oldImagesAndVideosThumbnailObj = await ModelImagesAndVideos.findOne({
        
        conditionObj: {
          _id: imagesAndVideosThumbnail_id,
          users_id: loginUsers_id,
        }
        
      });
      
      
      // --------------------------------------------------
      //   保存する
      // --------------------------------------------------
      
      const formatAndSaveObj = await formatAndSave({
        
        newObj: imagesAndVideosThumbnailObj,
        oldObj: oldImagesAndVideosThumbnailObj,
        loginUsers_id,
        ISO8601,
        
      });
      
      imagesAndVideosThumbnailSaveObj = lodashGet(formatAndSaveObj, ['imagesAndVideosObj'], {});
      
      
      // --------------------------------------------------
      //   画像＆動画がすべて削除されている場合は、newImagesAndVideosThumbnail_id を空にする
      // --------------------------------------------------
      
      const arr = lodashGet(imagesAndVideosThumbnailSaveObj, ['arr'], []);
      
      if (arr.length === 0) {
        newImagesAndVideosThumbnail_id = '';
      } else {
        newImagesAndVideosThumbnail_id = lodashGet(imagesAndVideosThumbnailSaveObj, ['_id'], '');
      }
      
      
      // --------------------------------------------------
      //   imagesAndVideosConditionObj
      // --------------------------------------------------
      
      imagesAndVideosThumbnailConditionObj = {
        _id: lodashGet(imagesAndVideosThumbnailSaveObj, ['_id'], ''),
      };
      
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Card Players Save Object
    // --------------------------------------------------
    
    let cardPlayersSaveObj = {
      
      _id: shortid.generate(),
      createdDate: ISO8601,
      updatedDate: ISO8601,
      users_id: loginUsers_id,
      language: 'ja',
      nameObj,
      statusObj,
      imagesAndVideos_id: newImagesAndVideos_id,
      imagesAndVideosThumbnail_id: newImagesAndVideosThumbnail_id,
      commentObj,
      ageObj,
      sexObj,
      addressObj,
      gamingExperienceObj,
      hobbiesObj,
      specialSkillsObj,
      smartphoneObj,
      tabletObj,
      pcObj,
      hardwareActiveObj: {
        valueArr: validatedHardwareActiveObj.valueArr,
        search: hardwareActiveObj.search,
      },
      hardwareInactiveObj: {
        valueArr: validatedHardwareInactiveObj.valueArr,
        search: hardwareInactiveObj.search,
      },
      ids_idArr: validatedIDs_idArrObj.valueArr,
      activityTimeObj,
      lookingForFriendsObj,
      voiceChatObj,
      linkArr,
      
    };
    
    
    
    
    // --------------------------------------------------
    //   データベースに保存
    // --------------------------------------------------
    
    let cardPlayersConditionObj = {};
    
    
    // ---------------------------------------------
    //   - Update
    // ---------------------------------------------
    
    if (_id) {
      
      
      // --------------------------------------------------
      //   Card Players Condition Object
      // --------------------------------------------------
      
      cardPlayersConditionObj = {
        
        _id,
        users_id: loginUsers_id,
        
      };
      
      
      // --------------------------------------------------
      //   Card Players Save Object
      // --------------------------------------------------
      
      delete cardPlayersSaveObj._id;
      delete cardPlayersSaveObj.createdDate;
      delete cardPlayersSaveObj.users_id;
      
      cardPlayersSaveObj = {
        $set: cardPlayersSaveObj
      };
      
      
      // --------------------------------------------------
      //   現在、プレイヤーカードを新規追加する機能はないので、更新だけ行う
      // --------------------------------------------------
      
      await ModelCardPlayers.transactionForUpsert({
        
        cardPlayersConditionObj,
        cardPlayersSaveObj,
        imagesAndVideosConditionObj,
        imagesAndVideosSaveObj,
        imagesAndVideosThumbnailConditionObj,
        imagesAndVideosThumbnailSaveObj,
        
      });
      
      
    // ---------------------------------------------
    //   - Insert
    // ---------------------------------------------
      
    } else {
      
      cardPlayersConditionObj = {
        _id: shortid.generate()
      };
      
    }
    
    
    
    
    // --------------------------------------------------
    //   データ取得 / Card Players
    //   アクセスしたページ所有者のプレイヤーカード情報
    // --------------------------------------------------
    
    returnObj.cardPlayersObj = await ModelCardPlayers.findForCardPlayer({
      
      localeObj,
      users_id: loginUsers_id,
      loginUsers_id,
      
    });
    
    
    // --------------------------------------------------
    //   データ取得 / Card Players
    //   プレイヤーカード情報 / 編集フォーム用
    // --------------------------------------------------
    
    returnObj.cardPlayersForEditFormObj = await ModelCardPlayers.findOneBy_idForEditForm({
      
      _id,
      localeObj,
      loginUsers_id,
      
    });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    console.log(`
      ----------------------------------------\n
      /pages/api/v2/db/card-players/upsert.js
    `);
    
    // console.log(`
    //   ----- bodyObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(bodyObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- validatedHardwareActiveObj -----\n
    //   ${util.inspect(validatedHardwareActiveObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- validatedHardwareInactiveObj -----\n
    //   ${util.inspect(validatedHardwareInactiveObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- validatedIDs_idArrObj -----\n
    //   ${util.inspect(validatedIDs_idArrObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    
    // console.log(chalk`
    //   Object.keys(nameObj).length: {green ${Object.keys(nameObj).length}}
    // `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(returnObj)), { colors: true, depth: null })}\n
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
      endpointID: 'DKo69_LP9',
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




export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb',
    },
  },
};