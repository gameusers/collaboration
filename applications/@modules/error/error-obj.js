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


// ---------------------------------------------
//   Logger
// ---------------------------------------------

const logger = require('../logger');




// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * Error 情報の入ったオブジェクトを返す
 * @param {Object} error - エラー
 * @param {number} errorCode - エラーコード
 * @return {Object} エラーオブジェクト
 */
const errorCodeIntoErrorObj = (errorObj, errorCodeArr, logPath) => {
  
  
  // ---------------------------------------------
  //   Property
  // ---------------------------------------------
  
  let errorsArr = [];
  let logArr = [];
  
  
  // ---------------------------------------------
  //   Message
  // ---------------------------------------------
  
  for (let value of errorCodeArr.values()) {
    
    let tempObj = {
      code: value,
      message: ''
    };
    
    if (value === 100) {
      
      tempObj.message = 'ログインする必要があります。';
      
    } else if (value === 101) {
      
      tempObj.message = 'Validation';
      
    } else if (process.env.NODE_ENV !== 'production') {
      
      tempObj.message = errorObj.message;
      
    }
    
    errorsArr.push(tempObj);
    logArr.push(`Code: ${tempObj.code}\nMessage: ${tempObj.message}\n`);
    
  }
  
  
  // ---------------------------------------------
  //   Log
  // ---------------------------------------------
  
  logger.log('error', `${logPath}\n${logArr.join(' / ')}`);
  
  
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