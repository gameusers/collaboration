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
 * gameID
 * @param {string} value - 値
 */
const validationGamesGameIDServer = async ({ value, language, country }) => {
  
  
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
    
    // 空の場合、バリデーションスルー
    if (validator.isEmpty(data)) {
      return resultObj;
    }
    
    // 文字数チェック
    if (!validator.isLength(data, { min: minLength, max: maxLength })) {
      resultObj.errorCodeArr.push('7m7YndDi5');
    }
    
    // 英数と -_ のみ
    if (data.match(/^[\w\-]+$/) === null) {
      resultObj.errorCodeArr.push('OE9r_zJNY');
    }
    
    // データベースに存在しているか＆編集権限チェック
    const count = await Model.count({
      conditionObj: {
        language,
        country,
        gameID: value,
      }
    });
    
    if (count !== 1) {
      resultObj.errorCodeArr.push('zcfXAgyYT');
    }
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   その他のエラー
    // ---------------------------------------------
    
    resultObj.errorCodeArr.push('atnrDDdeK');
    
    
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
  validationGamesGameIDServer
};