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
 * メンバーページでメンバーを管理する際の type
 * @param {boolean} throwError - エラーを投げる true / resultObjを返す false
 * @param {string} value - 値
 * @return {Object} バリデーション結果
 */
const validationManageMembersType = ({ throwError = false, value }) => {
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const data = String(value);
  const numberOfCharacters = data ? data.length : 0;
  
  let resultObj = {
    value: data,
    numberOfCharacters,
    messageID: 'PH8jcw-VF',
    error: false,
  };
  
  
  try {
    
    
    // ---------------------------------------------
    //   適切な値が選択されているかチェック
    // ---------------------------------------------
    
    if (!validator.isIn(value, ['follow', 'unfollow', 'approval', 'unapproval', 'block', 'unblock'])) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'ILRLPItIs', messageID: 'PH8jcw-VF' }] });
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
  validationManageMembersType
};