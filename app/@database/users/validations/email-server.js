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
 * @param {boolean} required - 必須かどうか
 * @param {string} value - 値
 * @param {string} usersLogin_id - DB users _id / ログイン中のユーザーID
 * @param {string} encryptedEmail - 暗号化されたメールアドレス
 * @return {Object} バリデーション結果
 */
const validationUsersEmailServer = async ({ required = false, value, usersLogin_id, encryptedEmail }) => {
  
  
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
    messageCode: '',
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
    if (!validator.isEmail(data, { allow_utf8_local_part: false })) {
      messageCodeArr.unshift('5O4K1an7k');
      resultObj.errorCodeArr.push('M4fBF4b4P');
    }
    
    
    // ---------------------------------------------
    //   データベースに存在しているかチェック
    // ---------------------------------------------
    
    // 編集の場合
    if (usersLogin_id) {
      
      const count = await Model.count({
        conditionObj: {
          _id: { '$ne': usersLogin_id },
          email: encryptedEmail,
        }
      });
      
      if (count === 1) {
        messageCodeArr.unshift('5H8rr53kE');
        resultObj.errorCodeArr.push('BCtGVMysf');
      }
      
    // 新規の場合
    } else {
      
      const count = await Model.count({
        conditionObj: {
          email: encryptedEmail,
        }
      });
      
      if (count === 1) {
        messageCodeArr.unshift('5H8rr53kE');
        resultObj.errorCodeArr.push('B4x14ISQg');
      }
      
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