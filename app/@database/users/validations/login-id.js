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
 * Login ID
 * @param {boolean} required - 必須かどうか
 * @param {string} value - 値
 * @return {Object} バリデーション結果
 */
const validationUsersLoginID = ({ required = false, value }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 6;
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
    messageCode: 'Xrf-TLIEN',
    error: false,
    errorCodeArr: []
  };
  
  
  try {
    
    
    // ---------------------------------------------
    //   Validation
    // ---------------------------------------------
    
    // 空の場合、処理停止
    if (validator.isEmpty(data)) {
      
      if (required) {
        resultObj.errorCodeArr.push('SHAUeHKbh');
      }
      
      return resultObj;
      
    }
    
    // 文字数チェック
    if (!validator.isLength(data, { min: minLength, max: maxLength })) {
      messageCodeArr.unshift('yKjojKAxy');
      resultObj.errorCodeArr.push('M4fBF4b4P');
    }
    
    // 英数と -_ のみ
    if (data.match(/^[\w\-]+$/) === null) {
      messageCodeArr.unshift('JBkjlGQMh');
      resultObj.errorCodeArr.push('rRvP75Hnw');
    }
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   その他のエラー
    // ---------------------------------------------
    
    messageCodeArr.unshift('qnWsuPcrJ');
    resultObj.errorCodeArr.push('IL3i80Cpp');
    
    
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
  validationUsersLoginID
};