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

const ModelGoods = require('../../../../../app/@database/goods/model');
const ModelForumThreads = require('../../../../../app/@database/forum-threads/model');
const ModelForumComments = require('../../../../../app/@database/forum-comments/model');


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


// ---------------------------------------------
//   Locales
// ---------------------------------------------

// const { locale } = require('../../../../../app/@locales/locale');




// --------------------------------------------------
//   endpointID: URZ9Cq9nJ
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
  
  
  // --------------------------------------------------
  //   IP & User Agent
  // --------------------------------------------------
  
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = lodashGet(req, ['headers', 'user-agent'], '');
  
  
  
  
  try {
    
    
    // --------------------------------------------------
    //   POST Data
    // --------------------------------------------------
    
    const bodyObj = JSON.parse(req.body);
    
    const { 
      
      type,
      target_id,
      
    } = bodyObj;
    
    
    lodashSet(requestParametersObj, ['type'], type);
    lodashSet(requestParametersObj, ['target_id'], target_id);
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    await validationIP({ throwError: true, value: ip });
    
    
    
    
    // --------------------------------------------------
    //   
    // --------------------------------------------------
    
    let docObj = {};
    let targetUsers_id = '';
    
    
    // --------------------------------------------------
    //   Forum Comment
    // --------------------------------------------------
    
    if (type === 'forumComment') {
      
      docObj = await ModelForumComments.findOne({
        
        conditionObj: {
          _id: target_id
        }
        
      });
      
      targetUsers_id = lodashGet(docObj, ['users_id'], '');
      
      
    // --------------------------------------------------
    //   
    // --------------------------------------------------
      
    } else {
      
      
      
      
    }
    
    
    
    
    // --------------------------------------------------
    //   自分を評価しようとした場合
    // --------------------------------------------------
    
    // if (targetUsers_id === loginUsers_id || targetIP === ip) {
    //   statusCode = 403;
    //   throw new CustomError({ level: 'info', errorsArr: [{ code: 'MX3nsHgs6', messageID: 'x-g8kaDr7' }] });
    // }
    
    
    
    
    // --------------------------------------------------
    //   すでに Good ボタンを押しているかチェックする
    // --------------------------------------------------
    
    let docGoodsObj = {};
    
    docGoodsObj = await ModelGoods.findOne({
      
      conditionObj: {
        $and: [
          { target_id },
          { $or: [
            { users_id: loginUsers_id },
            { ip }
          ] }
        ]
      }
      
    });
    
    const goods_id = lodashGet(docGoodsObj, ['_id'], '');
    const users_id = lodashGet(docGoodsObj, ['users_id'], '');
    
    
    
    
    // --------------------------------------------------
    //   Datetime
    // --------------------------------------------------
    
    const ISO8601 = moment().utc().toISOString();
    
    
    
    
    // --------------------------------------------------
    //   DB
    // --------------------------------------------------
    
    let goodsConditionObj = {};
    let goodsSaveObj = {};
    let forumCommentsConditionObj = {};
    let forumCommentsSaveObj = {};
    let usersConditionObj = {};
    let usersSaveObj = {};
    
    returnObj.result = true;
    
    
    // --------------------------------------------------
    //   減算 - delete
    // --------------------------------------------------
    
    if (docGoodsObj) {
      
      
      // ---------------------------------------------
      //   - goods
      // ---------------------------------------------
      
      goodsConditionObj = {
        _id: goods_id,
      };
      
      
      // ---------------------------------------------
      //   - forum-comments
      // ---------------------------------------------
      
      if (type === 'forumComment') {
        
        forumCommentsConditionObj = {
          _id: target_id,
        };
        
        forumCommentsSaveObj = {
          $inc: { goods: - 1 }
        };
        
      }
      
      
      // ---------------------------------------------
      //   - users
      // ---------------------------------------------
      
      if (targetUsers_id) {
        
        usersConditionObj = {
          _id: targetUsers_id,
        };
        
        usersSaveObj = {
          $inc: { exp: - parseInt((users_id ? process.env.EXP_GOOD_BUTTON_LOGIN_USER : process.env.EXP_GOOD_BUTTON), 10) }
        };
        
      }
      
      
      // ---------------------------------------------
      //   - result = false
      // ---------------------------------------------
      
      returnObj.result = false;
      
      
    // --------------------------------------------------
    //   加算 - insert
    // --------------------------------------------------
      
    } else {
      
      
      // ---------------------------------------------
      //   - goods
      // ---------------------------------------------
      
      goodsConditionObj = {
        _id: shortid.generate(),
      };
      
      goodsSaveObj = {
        
        createdDate: ISO8601,
        target_id,
        targetUsers_id,
        users_id: loginUsers_id,
        ip,
        userAgent,
        
      };
      
      
      // ---------------------------------------------
      //   - forum-comments
      // ---------------------------------------------
      
      if (type === 'forumComment') {
        
        forumCommentsConditionObj = {
          _id: target_id,
        };
        
        forumCommentsSaveObj = {
          $inc: { goods: + 1 }
        };
        
      }
      
      
      // ---------------------------------------------
      //   - users
      // ---------------------------------------------
      
      if (targetUsers_id) {
        
        usersConditionObj = {
          _id: targetUsers_id,
        };
        
        usersSaveObj = {
          $inc: { exp: + parseInt((loginUsers_id ? process.env.EXP_GOOD_BUTTON_LOGIN_USER : process.env.EXP_GOOD_BUTTON), 10) }
        };
        
      }
      
      
    }
    
    
    // --------------------------------------------------
    //   transaction
    // --------------------------------------------------
    
    await ModelGoods.transaction({
      
      goodsConditionObj,
      goodsSaveObj,
      forumCommentsConditionObj,
      forumCommentsSaveObj,
      usersConditionObj,
      usersSaveObj,
      
    });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    console.log(`
      ----------------------------------------\n
      /pages/api/v2/db/goods/upsert.js
    `);
    
    // console.log(`
    //   ----- docObj -----\n
    //   ${util.inspect(docObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    console.log(`
      ----- docGoodsObj -----\n
      ${util.inspect(docGoodsObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    console.log(chalk`
      loginUsers_id: {green ${loginUsers_id}}
      type: {green ${type}}
      target_id: {green ${target_id}}
      targetUsers_id: {green ${targetUsers_id}}
      goods_id: {green ${goods_id}}
    `);
    
    // console.log(`
    //   ----- resultObj -----\n
    //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
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
      endpointID: 'URZ9Cq9nJ',
      users_id: loginUsers_id,
      ip,
      userAgent,
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