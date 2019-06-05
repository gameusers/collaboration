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
const lodashGet = require('lodash/get');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { CustomError } = require('../../../@modules/error/custom');




/**
 * 年齢（誕生日）
 * @param {boolean} throwError - エラーを投げる true / resultObjを返す false
 * @param {boolean} required - 必須 true / 必須でない false
 * @param {string} value - 値
 * @return {Object} バリデーション結果
 */
const validationCardPlayersAge = ({ throwError = false, required = false, value }) => {
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const data = String(value);
  const numberOfCharacters = data ? data.length : 0;
  
  let resultObj = {
    value: data,
    numberOfCharacters,
    messageID: '4T_kAMjFU',
    error: false,
  };
  
  
  try {
    
    
    // ---------------------------------------------
    //   空の場合、処理停止
    // ---------------------------------------------
    
    if (validator.isEmpty(data)) {
      
      if (required) {
        throw new CustomError({ level: 'warn', errorsArr: [{ code: '8si9jEi9g', messageID: 'cFbXmuFVh' }] });
      }
      
      return resultObj;
      
    }
    
    
    // ---------------------------------------------
    //   日付チェック
    // ---------------------------------------------
    
    if (!validator.isISO8601(data)) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'ma3S_LNoY', messageID: 'bT9TGtVck' }] });
    }
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   Throw Error
    // ---------------------------------------------
    
    if (throwError) {
      throw errorObj;
    }
    
    
    // ---------------------------------------------
    //   Result Error
    // ---------------------------------------------
    
    resultObj.error = true;
    
    if (errorObj instanceof CustomError) {
      resultObj.messageID = lodashGet(errorObj, ['errorsArr', 0, 'messageID'], 'Error');
    } else {
      resultObj.messageID = 'qnWsuPcrJ';
    }
    
    
  }
  
  
  // ---------------------------------------------
  //   Return
  // ---------------------------------------------
  
  return resultObj;
  
  
};




/**
 * 年齢（固定値）
 * @param {boolean} throwError - エラーを投げる true / resultObjを返す false
 * @param {boolean} required - 必須 true / 必須でない false
 * @param {string} value - 値
 * @return {Object} バリデーション結果
 */
const validationCardPlayersAgeAlternativeText = ({ throwError = false, required = false, value }) => {
  
  
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
  
  let resultObj = {
    value: data,
    numberOfCharacters,
    messageID: 'Qo5IGidJY',
    error: false,
  };
  
  
  try {
    
    
    // ---------------------------------------------
    //   空の場合、処理停止
    // ---------------------------------------------
    
    if (validator.isEmpty(data)) {
      
      if (required) {
        throw new CustomError({ level: 'warn', errorsArr: [{ code: 'y9Gj-_F8T', messageID: 'cFbXmuFVh' }] });
      }
      
      return resultObj;
      
    }
    
    
    // ---------------------------------------------
    //   文字数チェック
    // ---------------------------------------------
    
    if (!validator.isLength(data, { min: minLength, max: maxLength })) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'zqAbLvEGe', messageID: 'xdAU7SgoO' }] });
    }
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   Throw Error
    // ---------------------------------------------
    
    if (throwError) {
      throw errorObj;
    }
    
    
    // ---------------------------------------------
    //   Result Error
    // ---------------------------------------------
    
    resultObj.error = true;
    
    if (errorObj instanceof CustomError) {
      resultObj.messageID = lodashGet(errorObj, ['errorsArr', 0, 'messageID'], 'Error');
    } else {
      resultObj.messageID = 'qnWsuPcrJ';
    }
    
    
  }
  
  
  // ---------------------------------------------
  //   Return
  // ---------------------------------------------
  
  return resultObj;
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  validationCardPlayersAge,
  validationCardPlayersAgeAlternativeText
};