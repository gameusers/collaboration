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
 * 所有ハードウェア
 * @param {boolean} required - Required
 * @param {string} valueArr - 検証する配列
 */
const validationCardPlayersHardwareActiveArr = ({ required, valueArr }) => {
  
  
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
      const hardwareID = dataObj.hardwareID;
      
      // 文字数チェック
      if (!validator.isLength(hardwareID, { min: minLength, max: maxLength })) {
        messageCodeArr.unshift('Uh3rnK7Dk');
        resultObj.errorCodeArr.push('D6pDITDvs');
        error = true;
      }
      
      // 英数と -_ のみ
      if (hardwareID.match(/^[\w\-]+$/) === null) {
        messageCodeArr.unshift('JBkjlGQMh');
        resultObj.errorCodeArr.push('rnJRVq95i');
        error = true;
      }
      
      if (!error) {
        resultObj.valueArr.push(hardwareID);
      }
      
    }
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   その他のエラー
    // ---------------------------------------------
    
    messageCodeArr.unshift('qnWsuPcrJ');
    resultObj.errorCodeArr.push('IMRQFXD19');
    
    
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




/**
 * 昔、所有していたハードウェア
 * @param {boolean} required - Required
 * @param {string} valueArr - 検証する配列
 */
const validationCardPlayersHardwareInactiveArr = ({ required, valueArr }) => {
  
  
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
      const hardwareID = dataObj.hardwareID;
      
      // 文字数チェック
      if (!validator.isLength(hardwareID, { min: minLength, max: maxLength })) {
        messageCodeArr.unshift('Uh3rnK7Dk');
        resultObj.errorCodeArr.push('U1qfyyBN8');
        error = true;
      }
      
      // 英数と -_ のみ
      if (hardwareID.match(/^[\w\-]+$/) === null) {
        messageCodeArr.unshift('JBkjlGQMh');
        resultObj.errorCodeArr.push('OgJ9R-xRe');
        error = true;
      }
      
      if (!error) {
        resultObj.valueArr.push(hardwareID);
      }
      
    }
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   その他のエラー
    // ---------------------------------------------
    
    messageCodeArr.unshift('qnWsuPcrJ');
    resultObj.errorCodeArr.push('2Wd7mKHP6');
    
    
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
  validationCardPlayersHardwareActiveArr,
  validationCardPlayersHardwareInactiveArr
};