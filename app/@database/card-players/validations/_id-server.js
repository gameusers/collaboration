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
 * _id
 * @param {string} value - 値
 * @param {string} loginUsers_id - DB users _id ログインしているユーザーの_id
 */
const validationCardPlayers_idServer = async ({ value, loginUsers_id }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 7;
  const maxLength = 14;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const data = String(value);
  
  let resultObj = {
    value: data,
    error: false,
    errorCodeArr: []
  };
  
  
  try {
    
    
    // ---------------------------------------------
    //   Validation
    // ---------------------------------------------
    
    // 文字数チェック
    if (!validator.isLength(data, { min: minLength, max: maxLength })) {
      resultObj.errorCodeArr.push('jy8hab7SJ');
    }
    
    // 英数と -_ のみ
    if (data.match(/^[\w\-]+$/) === null) {
      resultObj.errorCodeArr.push('bxW_wFEsC');
    }
    
    // データベースに存在しているか＆編集権限チェック
    const count = await Model.count({
      conditionObj: {
        _id: value,
        users_id: loginUsers_id,
      }
    });
    
    if (count !== 1) {
      resultObj.errorCodeArr.push('4x07Owt6c');
    }
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   その他のエラー
    // ---------------------------------------------
    
    resultObj.errorCodeArr.push('SzEAAA2RG');
    
    
  } finally {
    
    
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
  validationCardPlayers_idServer
};