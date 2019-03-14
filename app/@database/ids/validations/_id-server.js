// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');


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
 * @param {string} usersLogin_id - DB users _id ログインしているユーザーの_id
 */
const validationIDs_idServer = async ({ value, usersLogin_id }) => {
  
  
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
      resultObj.errorCodeArr.push('kkIt7RKmd');
    }
    
    // 英数と -_ のみ
    if (data.match(/^[\w\-]+$/) === null) {
      resultObj.errorCodeArr.push('7ozQvO1ch');
    }
    
    // データベースに存在しているか＆編集権限チェック
    const count = await Model.count({
      conditionObj: {
        _id: value,
        users_id: usersLogin_id,
      }
    });
    
    if (count !== 1) {
      resultObj.errorCodeArr.push('sWZRJ_WyL');
    }
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   その他のエラー
    // ---------------------------------------------
    
    resultObj.errorCodeArr.push('WThN4dz0C');
    
    
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
  validationIDs_idServer
};