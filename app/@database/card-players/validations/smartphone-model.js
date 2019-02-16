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
 * スマートフォン（モデル）
 * @param {boolean} required - Required
 * @param {string} value - 値
 */
const validationCardPlayersSmartphoneModel = ({ required, value }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 1;
  const maxLength = 50;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const data = String(value);
  const numberOfCharacters = data ? data.length : 0;
  const messageCodeArr = [];
  
  let resultObj = {
    value: data,
    numberOfCharacters,
    messageCode: 'KGJvD0Fj3',
    error: false,
    errorCodeArr: []
  };
  
  
  try {
    
    
    // ---------------------------------------------
    //   Validation
    // ---------------------------------------------
    
    // Required で入力値が空の場合、エラー
    if (required && validator.isEmpty(data)) {
      
      messageCodeArr.unshift('cFbXmuFVh');
      resultObj.errorCodeArr.push('1go6TVZRP');
      
    // Not Required で入力値が空の場合、処理停止
    } else if (!required && validator.isEmpty(data)) {
      
      return resultObj;
      
    }
    
    // 文字数チェック
    if (!validator.isLength(data, { min: minLength, max: maxLength })) {
      messageCodeArr.unshift('yhgyXHqZu');
      resultObj.errorCodeArr.push('e3hndxsf-');
    }
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   その他のエラー
    // ---------------------------------------------
    
    messageCodeArr.unshift('qnWsuPcrJ');
    resultObj.errorCodeArr.push('NNGG1u7k2');
    
    
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

module.exports = validationCardPlayersSmartphoneModel;