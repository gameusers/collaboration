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
 * @param {string} value - 値
 */
const validationCardPlayersGamingExperience = ({ value }) => {
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const data = value ? String(value) : '';
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
    
    // 空の場合、バリデーションスルー
    if (validator.isEmpty(data)) {
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




/**
 * ゲーム歴（固定値）
 * @param {string} value - 値
 */
const validationCardPlayersGamingExperienceAlternativeText = ({ value }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 1;
  const maxLength = 20;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const data = String(value);
  const numberOfCharacters = data ? data.length : 0;
  const messageCodeArr = [];
  
  let resultObj = {
    value: data,
    numberOfCharacters,
    messageCode: 'wfVpYnnq-',
    error: false,
    errorCodeArr: []
  };
  
  
  try {
    
    
    // ---------------------------------------------
    //   Validation
    // ---------------------------------------------
    
    // 空の場合、バリデーションスルー
    if (validator.isEmpty(data)) {
      return resultObj;
    }
    
    // 文字数チェック
    if (!validator.isLength(data, { min: minLength, max: maxLength })) {
      messageCodeArr.unshift('xdAU7SgoO');
      resultObj.errorCodeArr.push('kM2-GNQQF');
    }
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   その他のエラー
    // ---------------------------------------------
    
    messageCodeArr.unshift('qnWsuPcrJ');
    resultObj.errorCodeArr.push('wVMrRMwXg');
    
    
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
  validationCardPlayersGamingExperience,
  validationCardPlayersGamingExperienceAlternativeText
};