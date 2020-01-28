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

const ModelUserCommunities = require('../../../../../app/@database/user-communities/model');


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
const { validationUserCommunities_idServer } = require('../../../../../app/@database/user-communities/validations/_id-server');
const { validationUserCommunitiesName } = require('../../../../../app/@database/user-communities/validations/name');
const { validationUserCommunitiesDescription } = require('../../../../../app/@database/user-communities/validations/description');
const { validationUserCommunitiesDescriptionShort } = require('../../../../../app/@database/user-communities/validations/description-short');
const { validationUserCommunitiesUserCommunityIDServer } = require('../../../../../app/@database/user-communities/validations/user-community-id-server');
const { validationUserCommunitiesCommunityType } = require('../../../../../app/@database/user-communities/validations/community-type');
const { validationGameCommunities_idsArrServer } = require('../../../../../app/@database/game-communities/validations/_id-server');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { locale } = require('../../../../../app/@locales/locale');




// --------------------------------------------------
//   endpointID: _3Qu8jodI
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
      
      userCommunities_id,
      name,
      description,
      descriptionShort,
      userCommunityID,
      communityType,
      approval,
      anonymity,
      imagesAndVideosObj,
      imagesAndVideosThumbnailObj,
      gameCommunities_idsArr,
      
    } = bodyObj;
    
    
    // --------------------------------------------------
    //   Log Data
    // --------------------------------------------------
    
    lodashSet(requestParametersObj, ['loginUsers_id'], loginUsers_id);
    lodashSet(requestParametersObj, ['userCommunities_id'], userCommunities_id);
    lodashSet(requestParametersObj, ['name'], name);
    lodashSet(requestParametersObj, ['description'], description);
    lodashSet(requestParametersObj, ['descriptionShort'], descriptionShort);
    lodashSet(requestParametersObj, ['userCommunityID'], userCommunityID);
    lodashSet(requestParametersObj, ['communityType'], communityType);
    lodashSet(requestParametersObj, ['approval'], approval);
    lodashSet(requestParametersObj, ['anonymity'], anonymity);
    lodashSet(requestParametersObj, ['gameCommunities_idsArr'], gameCommunities_idsArr);
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Login Check
    // --------------------------------------------------
    
    if (!req.isAuthenticated()) {
      statusCode = 403;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'fG0jzFl5Y', messageID: 'xLLNIpo6a' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    await validationIP({ throwError: true, value: req.ip });
    await validationUserCommunities_idServer({ throwError: true, value: userCommunities_id });
    await validationUserCommunitiesName({ throwError: true, value: name });
    await validationUserCommunitiesDescription({ throwError: true, value: description });
    await validationUserCommunitiesDescriptionShort({ throwError: true, value: descriptionShort });
    await validationUserCommunitiesUserCommunityIDServer({ throwError: true, value: userCommunityID, loginUsers_id });
    await validationUserCommunitiesCommunityType({ throwError: true, value: communityType });
    await validationBoolean({ throwError: true, value: approval });
    await validationBoolean({ throwError: true, value: anonymity });
    await validationGameCommunities_idsArrServer({ throwError: true, arr: gameCommunities_idsArr });
    
    
    
    
    // --------------------------------------------------
    //   データ取得
    // --------------------------------------------------
    
    const userCommunityObj = await ModelUserCommunities.findForUserCommunitySettings({ localeObj, loginUsers_id, userCommunities_id });
    
    const oldImagesAndVideosObj = lodashGet(userCommunityObj, ['imagesAndVideosObj'], {});
    const oldImagesAndVideosThumbnailObj = lodashGet(userCommunityObj, ['imagesAndVideosThumbnailObj'], {});
    
    
    // --------------------------------------------------
    //   Page Transition
    // --------------------------------------------------
    
    if (userCommunityObj.userCommunityID !== userCommunityID) {
      returnObj.pageTransition = true;
    }
    
    
    
    
    // --------------------------------------------------
    //   Datetime
    // --------------------------------------------------
    
    const ISO8601 = moment().toISOString();
    
    
    
    
    // --------------------------------------------------
    //   画像を保存する - Top 画像
    // --------------------------------------------------
    
    let imagesAndVideosConditionObj = {};
    let imagesAndVideosSaveObj = {};
    let imagesAndVideos_id = '';
    
    if (imagesAndVideosObj) {
      
      const formatAndSaveObj = await formatAndSave({
        
        newObj: imagesAndVideosObj,
        oldObj: oldImagesAndVideosObj,
        loginUsers_id,
        ISO8601,
        
      });
      
      imagesAndVideosSaveObj = lodashGet(formatAndSaveObj, ['imagesAndVideosObj'], {});
      
      
      // 画像＆動画がすべて削除されている場合は、imagesAndVideos_idを空にする
      const arr = lodashGet(imagesAndVideosSaveObj, ['arr'], []);
      
      if (arr.length === 0) {
        imagesAndVideos_id = '';
      } else {
        imagesAndVideos_id = lodashGet(imagesAndVideosSaveObj, ['_id'], '');
      }
      
      imagesAndVideosConditionObj = {
        _id: lodashGet(imagesAndVideosSaveObj, ['_id'], ''),
      };
      
      
    }
    
    
    // --------------------------------------------------
    //   画像を保存する - サムネイル画像
    // --------------------------------------------------
    
    let imagesAndVideosThumbnailConditionObj = {};
    let imagesAndVideosThumbnailSaveObj = {};
    let imagesAndVideosThumbnail_id = '';
    
    if (imagesAndVideosThumbnailObj) {
      
      const formatAndSaveObj = await formatAndSave({
        
        newObj: imagesAndVideosThumbnailObj,
        oldObj: oldImagesAndVideosThumbnailObj,
        loginUsers_id,
        ISO8601,
        
      });
      
      imagesAndVideosThumbnailSaveObj = lodashGet(formatAndSaveObj, ['imagesAndVideosObj'], {});
      
      
      // 画像＆動画がすべて削除されている場合は、imagesAndVideos_idを空にする
      const arr = lodashGet(imagesAndVideosThumbnailSaveObj, ['arr'], []);
      
      if (arr.length === 0) {
        imagesAndVideosThumbnail_id = '';
      } else {
        imagesAndVideosThumbnail_id = lodashGet(imagesAndVideosThumbnailSaveObj, ['_id'], '');
      }
      
      imagesAndVideosThumbnailConditionObj = {
        _id: lodashGet(imagesAndVideosThumbnailSaveObj, ['_id'], ''),
      };
      
      
    }
    
    
    
    
    // --------------------------------------------------
    //   User Communities
    // --------------------------------------------------
    
    const userCommunitiesConditionObj = {
      
      _id: userCommunities_id,
      
    };
    
    const userCommunitiesSaveObj = {
      
      $set: {
        
        userCommunityID,
        localesArr: [
          {
            _id: shortid.generate(),
            language: 'ja',
            name,
            description,
            descriptionShort,
          },
        ],
        imagesAndVideos_id,
        imagesAndVideosThumbnail_id,
        gameCommunities_idsArr,
        communityType,
        anonymity,
        
      }
      
    };
    
    
    
    
    // --------------------------------------------------
    //   Follows
    // --------------------------------------------------
    
    const followsConditionObj = {
      
      userCommunities_id,
      
    };
    
    const followsSaveObj = {
      
      $set: {
        
        approval,
        
      }
      
    };
    
    
    
    
    // --------------------------------------------------
    //   Update
    // --------------------------------------------------
    
    await ModelUserCommunities.transactionForUpsertSettings({
      
      userCommunitiesConditionObj,
      userCommunitiesSaveObj,
      followsConditionObj,
      followsSaveObj,
      imagesAndVideosConditionObj,
      imagesAndVideosSaveObj,
      imagesAndVideosThumbnailConditionObj,
      imagesAndVideosThumbnailSaveObj,
      
    });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   /pages/api/v2/db/user-communities/upsert-settings.js
    //   loginUsers_id: {green ${loginUsers_id}}
    //   userCommunities_id: {green ${userCommunities_id}}
    //   name: {green ${name}}
    //   description: {green ${description}}
    //   descriptionShort: {green ${descriptionShort}}
    //   userCommunityID: {green ${userCommunityID}}
    //   communityType: {green ${communityType}}
    //   approval: {green ${approval}} / {green ${typeof approval}}
    //   anonymity: {green ${anonymity}} / {green ${typeof anonymity}}
    // `);
    
    // console.log(`
    //   ----- gameCommunities_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(gameCommunities_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosThumbnailObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosThumbnailObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- userCommunityObj -----\n
    //   ${util.inspect(userCommunityObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- oldImagesAndVideosObj -----\n
    //   ${util.inspect(oldImagesAndVideosObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- oldImagesAndVideosThumbnailObj -----\n
    //   ${util.inspect(oldImagesAndVideosThumbnailObj, { colors: true, depth: null })}\n
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
      endpointID: '_3Qu8jodI',
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