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
 * Login ID
 * @param {string} value - 値
 * @param {string} usersLogin_id - DB users _id / ログイン中のユーザーID
 * @return {Object} バリデーション結果
 */
const validationUsersLoginIDServer = async ({ value, usersLogin_id }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 6;
  const maxLength = 32;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const data = String(value);
  const messageCodeArr = [];
  
  let resultObj = {
    value: data,
    messageCode: '',
    error: false,
    errorCodeArr: []
  };
  
  
  try {
    
    
    // ---------------------------------------------
    //   Validation
    // ---------------------------------------------
    
    // 文字数チェック
    if (!validator.isLength(data, { min: minLength, max: maxLength })) {
      messageCodeArr.unshift('yKjojKAxy');
      resultObj.errorCodeArr.push('e4g-rZvGD');
    }
    
    // 英数と -_ のみ
    if (data.match(/^[\w\-]+$/) === null) {
      messageCodeArr.unshift('JBkjlGQMh');
      resultObj.errorCodeArr.push('6po2zu3If');
    }
    
    
    // ---------------------------------------------
    //   データベースに存在しているかチェック
    // ---------------------------------------------
    
    // 編集の場合
    if (usersLogin_id) {
      
      const count = await Model.count({
        conditionObj: {
          _id: { '$ne': usersLogin_id },
          loginID: value,
        }
      });
      
      if (count === 1) {
        messageCodeArr.unshift('Y1J-vK0hW');
        resultObj.errorCodeArr.push('2R5M5lNLA');
      }
      
    // 新規の場合
    } else {
      
      const count = await Model.count({
        conditionObj: {
          loginID: value,
        }
      });
      
      if (count === 1) {
        messageCodeArr.unshift('Y1J-vK0hW');
        resultObj.errorCodeArr.push('fi1EoNmKH');
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
  validationUsersLoginIDServer
};