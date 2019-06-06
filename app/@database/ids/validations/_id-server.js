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
//   Model
// ---------------------------------------------

const Model = require('../model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { CustomError } = require('../../../@modules/error/custom');




/**
 * _id
 * @param {boolean} required - 必須 true / 必須でない false
 * @param {string} value - 値
 * @param {string} loginUsers_id - DB users _id ログインしているユーザーの_id
 */
const validationIDs_idServer = async ({ required = false, value, loginUsers_id }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 7;
  const maxLength = 14;
  
  
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
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'kkIt7RKmd', messageID: 'Pp_CFyt_3' }] });
    }
    
    
    // ---------------------------------------------
    //   英数と -_ のみ
    // ---------------------------------------------
    
    if (data.match(/^[\w\-]+$/) === null) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'tCoDgW1Go', messageID: 'JBkjlGQMh' }] });
    }
    
    
    // ---------------------------------------------
    //   データベースに存在しているか＆編集権限チェック
    // ---------------------------------------------
    
    const count = await Model.count({
      conditionObj: {
        _id: value,
        users_id: loginUsers_id,
      }
    });
    
    if (count !== 1) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'sWZRJ_WyL', messageID: 'cvS0qSAlE' }] });
    }
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   Throw Error
    // ---------------------------------------------
    
    throw errorObj;
    
    
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
  validationIDs_idServer
};