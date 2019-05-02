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

const moment = require('moment');
const shortid = require('shortid');
const lodashGet = require('lodash/get');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { CustomError } = require('./custom');


// ---------------------------------------------
//   Logger
// ---------------------------------------------

const logger = require('../logger');




// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * Error 情報の入ったオブジェクトを返してログを記録する
 * @param {Object} errorObj - catchで取得したエラーオブジェクト
 * @param {string} loginUsers_id - ログインしていユーザーの DB users _id
 * @return {Object} エラーオブジェクト
 */
const logFromErrorsArr = ({ errorObj, loginUsers_id }) => {
  
  
  // ---------------------------------------------
  //   Property
  // ---------------------------------------------
  
  let logArr = [];
  let errorsArr = [];
  let codeArr = [];
  const logID = shortid.generate();
  const message = lodashGet(errorObj, ['message'], '');
  
  
  // ---------------------------------------------
  //   Custom Error
  // ---------------------------------------------
  
  if (errorObj instanceof CustomError) {
    
    errorsArr = lodashGet(errorObj, ['errorsArr'], []);
    
    
    // ---------------------------------------------
    //   Loop
    // ---------------------------------------------
    
    for (let valueObj of errorsArr) {
      codeArr.push(valueObj.code);
    }
    
    
  // ---------------------------------------------
  //   Default Error
  // ---------------------------------------------
  
  } else {
    
    errorsArr = [{ code: 'Error', messageID: 'Error' }];
    
  }
  
  
  // ---------------------------------------------
  //   Log Array
  // ---------------------------------------------
  
  logArr.push(`
Log ID: ${logID}
Date: ${moment().toISOString()}
Code: ${codeArr.join('@')}
Login Users ID: ${loginUsers_id}
Message: ${message}
  `);
  
  
  // ---------------------------------------------
  //   Log
  // ---------------------------------------------
  
  logger.log('error', `${logArr.join(' / ')}`);
  
  
  // ---------------------------------------------
  //   Return
  // ---------------------------------------------
  
  return {
    logID,
    errorsArr,
  };
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  logFromErrorsArr
};