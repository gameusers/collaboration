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
 * Boolean
 * @param {boolean} required - Required
 * @param {boolean} value
 */
const validationBoolean = ({ required, value }) => {
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const data = String(value);
  
  let resultObj = {
    value,
    error: false,
    errorCodeArr: []
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
      resultObj.errorCodeArr.push('xQjF_ZOgn');
    }
    
    // Booleanチェック
    if (!validator.isBoolean(data)) {
      resultObj.errorCodeArr.push('g4oAVWC1X');
    }
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   その他のエラー
    // ---------------------------------------------
    
    resultObj.errorCodeArr.push('G2whS9Xow');
    
    
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
  validationBoolean
};