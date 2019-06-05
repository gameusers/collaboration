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
 * 特技
 * @param {boolean} throwError - エラーを投げる true / resultObjを返す false
 * @param {boolean} required - 必須 true / 必須でない false
 * @param {Array} valueArr - 配列
 * @return {Object} バリデーション結果
 */
const validationCardPlayersSpecialSkill = ({ throwError = false, required = false, valueArr }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 1;
  const maxLength = 20;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  let resultObj = {
    valueArr: [],
    messageID: 'Error',
    error: false,
  };
  
  
  try {
    
    
    // ---------------------------------------------
    //   配列チェック
    // ---------------------------------------------
    
    if (!Array.isArray(valueArr)) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'CKcwLzBNV', messageID: 'qnWsuPcrJ' }] });
    }
    
    
    // ---------------------------------------------
    //   空の場合、処理停止
    // ---------------------------------------------
    
    if (valueArr.length === 0) {
      
      if (required) {
        throw new CustomError({ level: 'warn', errorsArr: [{ code: 'RaRh5kZ90', messageID: 'cFbXmuFVh' }] });
      }
      
      return resultObj;
      
    }
    
    
    // ---------------------------------------------
    //   Loop
    // ---------------------------------------------
    
    for (let value of valueArr.values()) {
      
      
      // ---------------------------------------------
      //   空でない
      // ---------------------------------------------
      
      if (!validator.isEmpty(value)) {
        
        
        // ---------------------------------------------
        //   文字数チェック
        // ---------------------------------------------
        
        if (!validator.isLength(value, { min: minLength, max: maxLength })) {
          throw new CustomError({ level: 'warn', errorsArr: [{ code: 'B3ufjdjBk', messageID: 'xdAU7SgoO' }] });
        } else {
          resultObj.valueArr.push(value);
        }
        
        
      }
      
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
  validationCardPlayersSpecialSkill,
};