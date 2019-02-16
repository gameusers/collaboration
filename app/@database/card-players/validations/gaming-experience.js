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
 * ゲーム歴（始めた日）
 * @param {boolean} required - Required
 * @param {string} value - 値
 */
const validationCardPlayersGamingExperience = ({ required, value }) => {
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const data = String(value);
  const numberOfCharacters = data ? data.length : 0;
  const messageCodeArr = [];
  
  let resultObj = {
    value: data,
    numberOfCharacters,
    messageCode: 'fCsp5ULCG',
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
      resultObj.errorCodeArr.push('fhtaaM05Y');
      
    // Not Required で入力値が空の場合、処理停止
    } else if (!required && validator.isEmpty(data)) {
      
      return resultObj;
      
    }
    
    // 日付チェック
    if (!validator.isISO8601(data)) {
      messageCodeArr.unshift('bT9TGtVck');
      resultObj.errorCodeArr.push('G9SFt8JX5');
    }
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   その他のエラー
    // ---------------------------------------------
    
    messageCodeArr.unshift('qnWsuPcrJ');
    resultObj.errorCodeArr.push('Wv9Z7Fc6M');
    
    
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

module.exports = validationCardPlayersGamingExperience;