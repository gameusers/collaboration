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
 * 趣味
 * @param {boolean} required - Required
 * @param {string} valueArr - 配列
 */
const validationCardPlayersHobby = ({ required, valueArr }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 1;
  const maxLength = 20;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const messageCodeArr = [];
  
  let resultObj = {
    valueArr: [],
    messageCode: 'C5lyqOFQz',
    error: false,
    errorCodeArr: []
  };
  
  
  try {
    
    
    // ---------------------------------------------
    //   Validation
    // ---------------------------------------------
    
    // 配列ではない
    if (!Array.isArray(valueArr)) {
      messageCodeArr.unshift('c9T-0LONy');
      resultObj.errorCodeArr.push('MXX4J47D8');
    }
    
    // Not Required で配列が空の場合、処理停止
    if (!required && valueArr.length === 0) {
      return resultObj;
    }
    
    
    for (let value of valueArr.values()) {
      
      // 空でない
      if (!validator.isEmpty(value)) {
        
        // 文字数エラー
        if (!validator.isLength(value, { min: minLength, max: maxLength })) {
          messageCodeArr.unshift('xdAU7SgoO');
          resultObj.errorCodeArr.push('gPixdTZkL');
        } else {
          resultObj.valueArr.push(value);
        }
        
      }
      
    }
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   その他のエラー
    // ---------------------------------------------
    
    messageCodeArr.unshift('qnWsuPcrJ');
    resultObj.errorCodeArr.push('k5noDLE5H');
    
    
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

module.exports = validationCardPlayersHobby;