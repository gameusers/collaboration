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

const ModelUsers = require('../../../../../app/@database/users/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../../../../app/@modules/csrf');
const { returnErrorsArr } = require('../../../../../app/@modules/log/log');
const { CustomError } = require('../../../../../app/@modules/error/custom');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationIP } = require('../../../../../app/@validations/ip');
const { validationBoolean } = require('../../../../../app/@validations/boolean');
const { validationUserCommunitiesName } = require('../../../../../app/@database/user-communities/validations/name');
const { validationUserCommunitiesDescription } = require('../../../../../app/@database/user-communities/validations/description');
const { validationUserCommunitiesDescriptionShort } = require('../../../../../app/@database/user-communities/validations/description-short');
const { validationUserCommunitiesUserCommunityIDServer } = require('../../../../../app/@database/user-communities/validations/user-community-id-server');
const { validationUserCommunitiesCommunityType } = require('../../../../../app/@database/user-communities/validations/community-type');
const { validationGameCommunities_idsArrServer } = require('../../../../../app/@database/game-communities/validations/_id-server');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

// const { locale } = require('../../../../../app/@locales/locale');




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
  
  // const localeObj = locale({
  //   acceptLanguage: req.headers['accept-language']
  // });
  
  
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
    lodashSet(requestParametersObj, ['name'], name);
    lodashSet(requestParametersObj, ['description'], description);
    lodashSet(requestParametersObj, ['descriptionShort'], descriptionShort);
    lodashSet(requestParametersObj, ['userCommunityID'], userCommunityID);
    lodashSet(requestParametersObj, ['communityType'], communityType);
    lodashSet(requestParametersObj, ['approval'], approval);
    lodashSet(requestParametersObj, ['anonymity'], anonymity);
    lodashSet(requestParametersObj, ['gameCommunities_idsArr'], gameCommunities_idsArr);
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    console.log(chalk`
      /pages/api/v2/db/user-communities/upsert-settings.js
      loginUsers_id: {green ${loginUsers_id}}
      name: {green ${name}}
      description: {green ${description}}
      descriptionShort: {green ${descriptionShort}}
      userCommunityID: {green ${userCommunityID}}
      communityType: {green ${communityType}}
      approval: {green ${approval}} / {green ${typeof approval}}
      anonymity: {green ${anonymity}} / {green ${typeof anonymity}}
    `);
    
    console.log(`
      ----- gameCommunities_idsArr -----\n
      ${util.inspect(JSON.parse(JSON.stringify(gameCommunities_idsArr)), { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    console.log(`
      ----- imagesAndVideosObj -----\n
      ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosObj)), { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    console.log(`
      ----- imagesAndVideosThumbnailObj -----\n
      ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosThumbnailObj)), { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Login Check
    // --------------------------------------------------
    
    if (!req.isAuthenticated()) {
      statusCode = 401;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'fG0jzFl5Y', messageID: 'xLLNIpo6a' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    await validationIP({ throwError: true, value: req.ip });
    await validationUserCommunitiesName({ throwError: true, value: name });
    await validationUserCommunitiesDescription({ throwError: true, value: description });
    await validationUserCommunitiesDescriptionShort({ throwError: true, value: descriptionShort });
    await validationUserCommunitiesUserCommunityIDServer({ throwError: true, value: userCommunityID, loginUsers_id });
    await validationUserCommunitiesCommunityType({ throwError: true, value: communityType });
    await validationBoolean({ throwError: true, value: approval });
    await validationBoolean({ throwError: true, value: anonymity });
    await validationGameCommunities_idsArrServer({ throwError: true, arr: gameCommunities_idsArr });
    
    
    
    // // --------------------------------------------------
    // //   Validation / Pages
    // // --------------------------------------------------
    
    // const newPagesArr = [];
    
    // for (let valueObj of pagesArr.values()) {
      
    //   await validationUsersPagesType({ throwError: true, value: valueObj.type });
    //   await validationUsersPagesName({ throwError: true, value: valueObj.name });
    //   await validationUsersPagesLanguage({ throwError: true, value: valueObj.language });
      
    //   newPagesArr.push({
    //     _id: shortid.generate(),
    //     type: valueObj.type,
    //     name: valueObj.name,
    //     language: valueObj.language,
    //   });
      
    // }
    
    
    // // --------------------------------------------------
    // //   Find One - Page Transition
    // // --------------------------------------------------
    
    // let conditionObj = {
    //   _id: loginUsers_id
    // };
    
    // let docObj = await ModelUsers.findOne({ conditionObj });
    
    // if (docObj.userID !== userID) {
    //   returnObj.pageTransition = true;
    // }
    
    // console.log(`
    //   ----- docObj -----\n
    //   ${util.inspect(docObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // // --------------------------------------------------
    // //   Update
    // // --------------------------------------------------
    
    // const ISO8601 = moment().toISOString();
    
    // conditionObj = {
    //   _id: loginUsers_id
    // };
    
    // const saveObj = {
    //   $set: {
    //     updatedDate: ISO8601,
    //     userID,
    //     pagesArr: newPagesArr,
    //   }
    // };
    
    // await ModelUsers.upsert({ conditionObj, saveObj });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   userCommunities_id: {green ${userCommunities_id}}
    //   forumThreads_id: {green ${forumThreads_id}}
    //   name: {green ${name} / ${typeof name}}
    //   comment: {green ${comment} / ${typeof comment}}
    //   IP: {green ${req.ip}}
    //   User Agent: {green ${req.headers['user-agent']}}
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosObj)), { colors: true, depth: null })}\n
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