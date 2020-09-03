// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Validation
// ---------------------------------------------

const validator = require('validator');




/**
 * _id
 * @param {boolean} required - Required
 * @param {string} value
 */
const validation_id = ({ required, value }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 7;
  const maxLength = 14;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const data = value ? String(value) : '';
  const numberOfCharacters = data ? data.length : 0;
  
  const resultObj = {

    value: data,
    numberOfCharacters,
    error: false,
    errorCodeArr: [],

  };
  
  
  try {
    
    
    // ---------------------------------------------
    //   Validation
    // ---------------------------------------------
    
    // Not Required で入力値が空の場合、処理停止
    if (!required && validator.isEmpty(data)) {
      return resultObj;
    }
    
    // 存在チェック
    if (validator.isEmpty(data)) {
      resultObj.errorCodeArr.push('pE9jBkXXP');
    }
    
    // 英数と -_ のみ
    if (data.match(/^[\w\-]+$/) === null) {
      resultObj.errorCodeArr.push('8oyLhJOlh');
    }
    
    // 文字数チェック
    if (!validator.isLength(data, { min: minLength, max: maxLength })) {
      resultObj.errorCodeArr.push('N48T3XvnC');
    }
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   その他のエラー
    // ---------------------------------------------
    
    resultObj.errorCodeArr.push('76W7KuPNM');
    
    
  } finally {
    
    
    // ---------------------------------------------
    //  Error
    // ---------------------------------------------
    
    if (resultObj.errorCodeArr.length > 0) {
      resultObj.error = true;
    }
    
    
    return resultObj;
    
    
  }
  
  
  return resultObj;
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {

  validation_id
  
};