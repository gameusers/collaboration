// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const Model = require('../model');


// ---------------------------------------------
//   Validation
// ---------------------------------------------

const validator = require('validator');




/**
 * E-Mail
 * @param {string} value - 値
 */
const validationUsersEmailServer = async ({ required = false, value }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 3;
  const maxLength = 100;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const data = String(value);
  const numberOfCharacters = data ? data.length : 0;
  const messageCodeArr = [];
  
  let resultObj = {
    value: data,
    numberOfCharacters,
    messageCode: 'I6k9-tUpp',
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
        resultObj.errorCodeArr.push('XIn-aRGHD');
      }
      
      return resultObj;
      
    }
    
    // 文字数チェック
    if (!validator.isLength(data, { min: minLength, max: maxLength })) {
      messageCodeArr.unshift('yKjojKAxy');
      resultObj.errorCodeArr.push('M4fBF4b4P');
    }
    
    // メールアドレスチェック
    if (!validator.isEmail(data)) {
      messageCodeArr.unshift('5O4K1an7k');
      resultObj.errorCodeArr.push('M4fBF4b4P');
    }
    
    // データベースに存在しているかチェック
    const count = await Model.count({
      conditionObj: {
        email: value,
      }
    });
    
    if (count === 1) {
      messageCodeArr.unshift('Y1J-vK0hW');
      resultObj.errorCodeArr.push('fi1EoNmKH');
    }
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   その他のエラー
    // ---------------------------------------------
    
    messageCodeArr.unshift('qnWsuPcrJ');
    resultObj.errorCodeArr.push('0aw5t0JvG');
    
    
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
  validationUsersEmailServer
};