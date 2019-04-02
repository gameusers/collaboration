// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Validation
// ---------------------------------------------

const validator = require('validator');




/**
 * Player ID
 * @param {string} value - 値
 */
const validationUsersPlayerID = ({ value }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 3;
  const maxLength = 32;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const data = String(value);
  const numberOfCharacters = data ? data.length : 0;
  const messageCodeArr = [];
  
  let resultObj = {
    value: data,
    numberOfCharacters,
    messageCode: 'Error',
    error: false,
    errorCodeArr: []
  };
  
  
  try {
    
    
    // ---------------------------------------------
    //   Validation
    // ---------------------------------------------
    
    // 文字数チェック
    if (!validator.isLength(data, { min: minLength, max: maxLength })) {
      messageCodeArr.unshift('ilE2NcYjI');
      resultObj.errorCodeArr.push('CWOOoA9F1');
    }
    
    // 英数と -_ のみ
    if (data.match(/^[\w\-]+$/) === null) {
      messageCodeArr.unshift('JBkjlGQMh');
      resultObj.errorCodeArr.push('gSft1rXje');
    }
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   その他のエラー
    // ---------------------------------------------
    
    messageCodeArr.unshift('qnWsuPcrJ');
    resultObj.errorCodeArr.push('3YA6nKRU4');
    
    
  } finally {
    
    
    // ---------------------------------------------
    //   Message Code
    // ---------------------------------------------
    
    if (messageCodeArr.length > 0) {
      resultObj.messageCode = messageCodeArr[0];
    }
    
    
    // ---------------------------------------------
    //  Error
    // ---------------------------------------------
    
    if (resultObj.errorCodeArr.length > 0) {
      resultObj.error = true;
    }
    
    
    return resultObj;
    
    
  }
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  validationUsersPlayerID,
};