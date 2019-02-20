// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Validation
// ---------------------------------------------

const validator = require('validator');




/**
 * ID Array
 * @param {boolean} required - Required
 * @param {string} valueArr - 検証する配列
 */
const validationCardPlayersIDArr = ({ required, valueArr }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 7;
  const maxLength = 14;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const messageCodeArr = [];
  
  let resultObj = {
    valueArr: [],
    messageCode: 'C5lyqOFQz',
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
        messageCodeArr.unshift('Uh3rnK7Dk');
        resultObj.errorCodeArr.push('GVaeKN4HI');
        error = true;
      }
      
      // 英数と -_ のみ
      if (_id.match(/^[\w\-]+$/) === null) {
        messageCodeArr.unshift('JBkjlGQMh');
        resultObj.errorCodeArr.push('n381nXqty');
        error = true;
      }
      
      if (!error) {
        resultObj.valueArr.push(_id);
      }
      
    }
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   その他のエラー
    // ---------------------------------------------
    
    messageCodeArr.unshift('qnWsuPcrJ');
    resultObj.errorCodeArr.push('kiWVCUNgA');
    
    
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
  validationCardPlayersIDArr,
};