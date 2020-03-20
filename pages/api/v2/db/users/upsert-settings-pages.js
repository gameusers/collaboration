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
const { validationUsersUserIDServer } = require('../../../../../app/@database/users/validations/user-id-server');
const { validationUsersPagesType, validationUsersPagesName, validationUsersPagesLanguage } = require('../../../../../app/@database/users/validations/pages');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

// const { locale } = require('../../../../../app/@locales/locale');




// --------------------------------------------------
//   endpointID: 0qiGkIA99
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
      
      imagesAndVideosObj,
      userID,
      pagesArr,
      approval,
      
    } = bodyObj;
    
    
    // --------------------------------------------------
    //   Log Data
    // --------------------------------------------------
    
    lodashSet(requestParametersObj, ['loginUsers_id'], loginUsers_id);
    lodashSet(requestParametersObj, ['imagesAndVideosObj'], {});
    lodashSet(requestParametersObj, ['userID'], userID);
    lodashSet(requestParametersObj, ['pagesArr'], pagesArr);
    lodashSet(requestParametersObj, ['approval'], approval);
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Login Check
    // --------------------------------------------------
    
    if (!req.isAuthenticated()) {
      statusCode = 403;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'V5Ww_uLNM', messageID: 'xLLNIpo6a' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    await validationIP({ throwError: true, value: req.ip });
    await validationUsersUserIDServer({ throwError: true, value: userID, loginUsers_id });
    await validationBoolean({ throwError: true, value: approval });
    
    
    // --------------------------------------------------
    //   Validation / Pages
    // --------------------------------------------------
    
    const newPagesArr = [];
    
    for (let valueObj of pagesArr.values()) {
      
      await validationUsersPagesType({ throwError: true, value: valueObj.type });
      await validationUsersPagesName({ throwError: true, value: valueObj.name });
      await validationUsersPagesLanguage({ throwError: true, value: valueObj.language });
      
      newPagesArr.push({
        
        _id: shortid.generate(),
        type: valueObj.type,
        name: valueObj.name,
        language: valueObj.language,
        
      });
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Find One - userID が変更された場合はページを再読み込みする
    // --------------------------------------------------
    
    const docUsersObj = await ModelUsers.findOne({
      
      conditionObj: {
        _id: loginUsers_id
      }
      
    });
    
    if (docUsersObj.userID !== userID) {
      returnObj.pageTransition = true;
    }
    
    // console.log(`
    //   ----- docUsersObj -----\n
    //   ${util.inspect(docUsersObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Datetime
    // --------------------------------------------------
    
    const ISO8601 = moment().utc().toISOString();
    
    
    
    
    // --------------------------------------------------
    //   メイン画像を保存する
    // --------------------------------------------------
    
    let imagesAndVideosConditionObj = {};
    let imagesAndVideosSaveObj = {};
    let imagesAndVideos_id = lodashGet(docUsersObj, ['pagesObj', 'imagesAndVideos_id'], '');
    
    if (imagesAndVideosObj) {
      
      // console.log('aaa');
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
        heroImage: true,
        
      });
      
      imagesAndVideosSaveObj = lodashGet(formatAndSaveObj, ['imagesAndVideosObj'], {});
      
      
      // --------------------------------------------------
      //   画像＆動画がすべて削除されている場合は、newImagesAndVideos_id を空にする
      // --------------------------------------------------
      
      const arr = lodashGet(imagesAndVideosSaveObj, ['arr'], []);
      
      if (arr.length === 0) {
        imagesAndVideos_id = '';
      } else {
        imagesAndVideos_id = lodashGet(imagesAndVideosSaveObj, ['_id'], '');
      }
      
      
      // --------------------------------------------------
      //   imagesAndVideosConditionObj
      // --------------------------------------------------
      
      imagesAndVideosConditionObj = {
        _id: lodashGet(imagesAndVideosSaveObj, ['_id'], ''),
      };
      
      
      // --------------------------------------------------
      //   ページを再読み込みする
      // --------------------------------------------------
      
      returnObj.pageTransition = true;
      
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Users
    // --------------------------------------------------
    
    const usersConditionObj = {
      
      _id: loginUsers_id
      
    };
    
    const usersSaveObj = {
      
      $set: {
        updatedDate: ISO8601,
        userID,
        pagesObj: {
          imagesAndVideos_id,
          arr: newPagesArr,
        }
      }
      
    };
    
    
    // --------------------------------------------------
    //   Follows
    // --------------------------------------------------
    
    const followsConditionObj = {
      
      users_id: loginUsers_id
      
    };
    
    const followsSaveObj = {
      
      $set: {
        approval
      }
      
    };
    
    
    // --------------------------------------------------
    //   Update
    // --------------------------------------------------
    
    await ModelUsers.transactionForUpsert({
      
      usersConditionObj,
      usersSaveObj,
      followsConditionObj,
      followsSaveObj,
      imagesAndVideosConditionObj,
      imagesAndVideosSaveObj,
      
    });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /pages/api/v2/db/users/upsert-settings-pages
    // `);
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   userID: {green ${userID}}
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosObj -----\n
    //   ${util.inspect(imagesAndVideosObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- pagesArr -----\n
    //   ${util.inspect(pagesArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- usersConditionObj -----\n
    //   ${util.inspect(usersConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- usersSaveObj -----\n
    //   ${util.inspect(usersSaveObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosConditionObj -----\n
    //   ${util.inspect(imagesAndVideosConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosSaveObj -----\n
    //   ${util.inspect(imagesAndVideosSaveObj, { colors: true, depth: null })}\n
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
      endpointID: '0qiGkIA99',
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