// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelHardwares = require('../../hardwares/model');


// ---------------------------------------------
//   Validation
// ---------------------------------------------

const validator = require('validator');




/**
 * 所有ハードウェア
 * @param {string} valueArr - 検証する配列
 */
const validationCardPlayersHardwareActiveArrServer = async ({ valueArr }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 7;
  const maxLength = 14;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  let hardwareIDArr = [];
  
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
      const hardwareID = dataObj.hardwareID;
      
      // 文字数チェック
      if (!validator.isLength(hardwareID, { min: minLength, max: maxLength })) {
        resultObj.errorCodeArr.push('tFlEEjxSS');
        error = true;
      }
      
      // 英数と -_ のみ
      if (hardwareID.match(/^[\w\-]+$/) === null) {
        resultObj.errorCodeArr.push('IFiJBqjtV');
        error = true;
      }
      
      if (!error) {
        hardwareIDArr.push(hardwareID);
      }
      
    }
    
    
    // データベースを検索
    if (hardwareIDArr.length > 0) {
      
      const docArr = await ModelHardwares.find({
        conditionObj: {
          hardwareID: { $in: hardwareIDArr }
        }
      });
      
      // ループしてデータベースに存在している hardwareID のみ resultObj.valueArr に追加する
      for (let value of hardwareIDArr.values()) {
        
        const tempObj = docArr.find((valueObj) => {
          return valueObj.hardwareID === value;
        });
        
        if (tempObj) {
          resultObj.valueArr.push(tempObj.hardwareID);
        }
        
      }
      
    }
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   その他のエラー
    // ---------------------------------------------
    
    resultObj.errorCodeArr.push('xXG98ZiUb');
    
    
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




/**
 * 昔、所有していたハードウェア
 * @param {string} valueArr - 検証する配列
 */
const validationCardPlayersHardwareInactiveArrServer = async ({ valueArr }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 7;
  const maxLength = 14;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  let hardwareIDArr = [];
  
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
      const hardwareID = dataObj.hardwareID;
      
      // 文字数チェック
      if (!validator.isLength(hardwareID, { min: minLength, max: maxLength })) {
        resultObj.errorCodeArr.push('hJBw3xw77');
        error = true;
      }
      
      // 英数と -_ のみ
      if (hardwareID.match(/^[\w\-]+$/) === null) {
        resultObj.errorCodeArr.push('bBg-IbHg0');
        error = true;
      }
      
      if (!error) {
        hardwareIDArr.push(hardwareID);
      }
      
    }
    
    
    // データベースを検索
    if (hardwareIDArr.length > 0) {
      
      const docArr = await ModelHardwares.find({
        conditionObj: {
          hardwareID: { $in: hardwareIDArr }
        }
      });
      
      // ループしてデータベースに存在している hardwareID のみ resultObj.valueArr に追加する
      for (let value of hardwareIDArr.values()) {
        
        const tempObj = docArr.find((valueObj) => {
          return valueObj.hardwareID === value;
        });
        
        if (tempObj) {
          resultObj.valueArr.push(tempObj.hardwareID);
        }
        
      }
      
    }
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   その他のエラー
    // ---------------------------------------------
    
    resultObj.errorCodeArr.push('TL7SiUXLa');
    
    
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
  validationCardPlayersHardwareActiveArrServer,
  validationCardPlayersHardwareInactiveArrServer
};