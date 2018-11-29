// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

// const chalk = require('chalk');
// const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

const moment = require('moment');


// ---------------------------------------------
//   Logger
// ---------------------------------------------

const logger = require('../logger');




// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * Error 情報の入ったオブジェクトを返す
 * ユーザーに通知するエラー（100000～499999）
 * 通知しないエラー（500000～）
 * @param {Object} error - エラー
 * @param {number} errorCode - エラーコード
 * @return {Object} エラーオブジェクト
 */
// const errorCodeIntoErrorObj = (errorObj, errorCodeArr, logPath) => {
const errorCodeIntoErrorObj = (errorArgumentsObj) => {
  
  
  // ---------------------------------------------
  //   Property
  // ---------------------------------------------
  
  const fileId = errorArgumentsObj.fileId;
  const functionId = errorArgumentsObj.functionId;
  const errorCodeArr = errorArgumentsObj.errorCodeArr;
  const errorObj = errorArgumentsObj.errorObj;
  
  let errorsArr = [];
  let logArr = [];
  
  
  // ---------------------------------------------
  //   Message
  // ---------------------------------------------
  
  for (let value of errorCodeArr.values()) {
    
    let tempObj = {
      code: `${fileId}@${functionId}@${value}`,
      message: ''
    };
    
    if (value === 101001) {
      
      tempObj.message = 'ログインする必要があります。';
      
    } else if (process.env.NODE_ENV === 'production') {
      
      tempObj.message = 'Error';
      
    } else if (value === 502001) {
      
      tempObj.message = 'Validation / users / users_id';
      
    } else if (value === 502002) {
      
      tempObj.message = 'Validation / users / Player ID';
      
    } else if (502000 <= value && value <= 502999) {
      
      tempObj.message = 'Validation';
      
    } else if (value === 503001) {
      
      tempObj.message = 'DB / users / usersObj が空です。';
      
    } else if (503000 <= value && value <= 503999) {
      
      tempObj.message = 'Database';
      
    } else {
      
      tempObj.message = errorObj.message;
      
    }
    
    errorsArr.push(tempObj);
    logArr.push(`${moment().utcOffset(0)}\nCode: ${tempObj.code}\nMessage: ${tempObj.message}\n`);
    
  }
  
  
  // ---------------------------------------------
  //   Log
  // ---------------------------------------------
  
  logger.log('error', `${logArr.join(' / ')}`);
  
  
  // ---------------------------------------------
  //   Return
  // ---------------------------------------------
  
  return {
    errorsArr
  };
  
};



// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  errorCodeIntoErrorObj
};