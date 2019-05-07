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

const ModelIDs = require('../../ids/model');


// ---------------------------------------------
//   Validation
// ---------------------------------------------

const validator = require('validator');




/**
 * ID Array
 * @param {string} valueArr - 検証する配列
 * @param {string} loginUsers_id - DB users _id ログインしているユーザーの_id
 */
const validationCardPlayersIDArrServer = async ({ valueArr, loginUsers_id }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 7;
  const maxLength = 14;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  let idArr = [];
  
  let resultObj = {
    valueArr: [],
    error: false,
    errorCodeArr: []
  };
  
  
  try {
    
    
    // ---------------------------------------------
    //   Validation
    // ---------------------------------------------
    
    for (let dataObj of valueArr.values()) {
      
      const error = false;
      const _id = dataObj._id;
      
      // 文字数チェック
      if (!validator.isLength(_id, { min: minLength, max: maxLength })) {
        resultObj.errorCodeArr.push('uLEZ8clC3');
        error = true;
      }
      
      // 英数と -_ のみ
      if (_id.match(/^[\w\-]+$/) === null) {
        resultObj.errorCodeArr.push('JtatkxSDj');
        error = true;
      }
      
      if (!error) {
        idArr.push(_id);
      }
      
    }
    
    
    // データベースを検索
    if (idArr.length > 0) {
      
      const docArr = await ModelIDs.find({
        conditionObj: {
          $and: [
            { _id: { $in: idArr } },
            { users_id: loginUsers_id },
          ]
        }
      });
      
      // ループしてデータベースに存在している _id のみ resultObj.valueArr に追加する
      for (let value of idArr.values()) {
        
        const tempObj = docArr.find((valueObj) => {
          return valueObj._id === value;
        });
        
        if (tempObj) {
          resultObj.valueArr.push(tempObj._id);
        }
        
      }
      
      
    }
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   その他のエラー
    // ---------------------------------------------
    
    resultObj.errorCodeArr.push('Su7PND-R8');
    
    
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
  validationCardPlayersIDArrServer,
};