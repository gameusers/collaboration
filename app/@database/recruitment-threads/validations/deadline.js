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
 * 募集の締め切り日
 * @param {boolean} throwError - エラーを投げる true / resultObjを返す false
 * @param {boolean} required - 必須 true / 必須でない false
 * @param {string} value - 値
 * @return {Object} バリデーション結果
 */
const validationRecruitmentThreadsDeadlineDate = ({ throwError = false, required = false, value }) => {
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const data = value ? String(value) : '';
  const numberOfCharacters = data ? data.length : 0;
  
  let resultObj = {
    value: data,
    numberOfCharacters,
    messageID: 'SFC7guhlr',
    error: false,
  };
  
  
  try {
    
    
    // ---------------------------------------------
    //   空の場合、処理停止
    // ---------------------------------------------
    
    if (validator.isEmpty(data)) {
      
      if (required) {
        throw new CustomError({ level: 'warn', errorsArr: [{ code: 'tQGCaPEVr', messageID: 'cFbXmuFVh' }] });
      }
      
      return resultObj;
      
    }
    
    
    // ---------------------------------------------
    //   日付チェック
    // ---------------------------------------------
    
    if (!validator.isISO8601(data)) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'N-xewnatz', messageID: 'bT9TGtVck' }] });
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
  
  validationRecruitmentThreadsDeadlineDate
  
};