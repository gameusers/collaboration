// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

const zxcvbn = require('zxcvbn');


// ---------------------------------------------
//   Validation
// ---------------------------------------------

const validator = require('validator');




/**
 * Login Password
 * @param {boolean} required - 必須かどうか
 * @param {string} value - 値
 * @param {string} loginID - Login ID
 */
const validationUsersLoginPassword = ({ required = false, value, loginID }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 8;
  const maxLength = 32;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const data = String(value);
  const numberOfCharacters = data ? data.length : 0;
  const messageCodeArr = [];
  const strengthScore = zxcvbn(data).score;
  
  let resultObj = {
    value: data,
    numberOfCharacters,
    messageCode: 'gJz51M8Pf',
    error: false,
    errorCodeArr: [],
    strengthScore
  };
  
  
  try {
    
    
    // ---------------------------------------------
    //   Validation
    // ---------------------------------------------
    
    // 空の場合、バリデーションスルー
    if (validator.isEmpty(data)) {
      
      if (required) {
        resultObj.errorCodeArr.push('LJGO1br5z');
      }
      
      return resultObj;
      
    }
    
    // 文字数チェック
    if (!validator.isLength(data, { min: minLength, max: maxLength })) {
      messageCodeArr.unshift('_BnyJl8Xz');
      resultObj.errorCodeArr.push('amAKxmNis');
    }
    
    // 英数と -_ のみ
    if (data.match(/^[\w\-]+$/) === null) {
      messageCodeArr.unshift('JBkjlGQMh');
      resultObj.errorCodeArr.push('jSqs5J_a8');
    }
    
    // パスワードの強度
    if (strengthScore < 2) {
      messageCodeArr.unshift('tmEi1Es0v');
      resultObj.errorCodeArr.push('6PM5lQzCA');
    }
    
    // IDとパスワードを同じ文字列にできない
    if (data === loginID) {
      messageCodeArr.unshift('NHTq1_JhE');
      resultObj.errorCodeArr.push('Pt74iKMWF');
    }
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   その他のエラー
    // ---------------------------------------------
    
    messageCodeArr.unshift('qnWsuPcrJ');
    resultObj.errorCodeArr.push('Lbg6Sqyyu');
    
    
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
 * Login Password Confirmation
 * @param {boolean} required - 必須かどうか
 * @param {string} value - 値
 * @param {string} confirmation - パスワード確認
 */
const validationUsersLoginPasswordConfirmation = ({ required = false, value, loginPassword }) => {
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const data = String(value);
  const numberOfCharacters = data ? data.length : 0;
  const messageCodeArr = [];
  const strengthScore = zxcvbn(data).score;
  
  let resultObj = {
    value: data,
    numberOfCharacters,
    messageCode: 'KBFOZp6kv',
    error: false,
    errorCodeArr: [],
    strengthScore
  };
  
  
  try {
    
    
    // ---------------------------------------------
    //   Validation
    // ---------------------------------------------
    
    // 空の場合、バリデーションスルー
    if (validator.isEmpty(data)) {
      
      if (required) {
        resultObj.errorCodeArr.push('JVjz5HxhU');
      }
      
      return resultObj;
      
    }
    
    // パスワードとパスワード確認が同じ文字列でない
    if (data !== loginPassword) {
      messageCodeArr.unshift('9jFs2LU6e');
      resultObj.errorCodeArr.push('sNtN2doNl');
    }
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   その他のエラー
    // ---------------------------------------------
    
    messageCodeArr.unshift('qnWsuPcrJ');
    resultObj.errorCodeArr.push('Bl3nDkgLO');
    
    
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
  validationUsersLoginPassword,
  validationUsersLoginPasswordConfirmation,
};