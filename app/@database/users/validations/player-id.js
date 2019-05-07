// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

const validator = require('validator');
const lodashGet = require('lodash/get');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { CustomError } = require('../../../@modules/error/custom');




/**
 * Player ID
 * @param {boolean} throwError - エラーを投げる true / resultObjを返す false
 * @param {string} value - 値
 */
const validationUsersPlayerID = ({ throwError = false, value }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 3;
  const maxLength = 32;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const data = String(value);
  const numberOfCharacters = data ? data.length : 0;
  
  let resultObj = {
    value: data,
    numberOfCharacters,
    messageID: 'Error',
    error: false,
  };
  
  
  try {
    
    
    // ---------------------------------------------
    //   文字数チェック
    // ---------------------------------------------
    
    if (!validator.isLength(data, { min: minLength, max: maxLength })) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'CWOOoA9F1', messageID: 'ilE2NcYjI' }] });
    }
    
    
    // ---------------------------------------------
    //   英数と -_ のみ
    // ---------------------------------------------
    
    if (data.match(/^[\w\-]+$/) === null) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'gSft1rXje', messageID: 'JBkjlGQMh' }] });
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
  validationUsersPlayerID,
};