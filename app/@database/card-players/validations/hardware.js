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
 * @param {string} valueArr - 検証する配列
 */
const validationCardPlayersHardwareActiveArr = ({ valueArr }) => {
  
  
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
        resultObj.errorCodeArr.push('tFlEEjxSS');
        error = true;
      }
      
      // 英数と -_ のみ
      if (hardwareID.match(/^[\w\-]+$/) === null) {
        messageCodeArr.unshift('JBkjlGQMh');
        resultObj.errorCodeArr.push('IFiJBqjtV');
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
    resultObj.errorCodeArr.push('xXG98ZiUb');
    
    
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
 * @param {string} valueArr - 検証する配列
 */
const validationCardPlayersHardwareInactiveArr = ({ valueArr }) => {
  
  
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
        resultObj.errorCodeArr.push('hJBw3xw77');
        error = true;
      }
      
      // 英数と -_ のみ
      if (hardwareID.match(/^[\w\-]+$/) === null) {
        messageCodeArr.unshift('JBkjlGQMh');
        resultObj.errorCodeArr.push('bBg-IbHg0');
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
    resultObj.errorCodeArr.push('TL7SiUXLa');
    
    
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