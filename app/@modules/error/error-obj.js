// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

const moment = require('moment');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { IntlProvider } = require('react-intl');


// ---------------------------------------------
//   Logger
// ---------------------------------------------

const logger = require('../logger');




// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * Error 情報の入ったオブジェクトを返す
 * @param {Object} localeObj - ロケール
 * @param {string} fileID - ファイル固有のID
 * @param {string} functionID - 関数固有のID
 * @param {Array} errorCodeArr - エラーコードが入っている配列
 * @param {Object} errorObj - catchで取得したエラーオブジェクト
 * @return {Object} エラーオブジェクト
 */
const errorCodeIntoErrorObj = ({ localeObj, fileID, functionID, errorCodeArr, errorObj }) => {
  
  
  // ---------------------------------------------
  //   I18n
  // ---------------------------------------------
  
  const intlProvider = new IntlProvider({
     locale: localeObj.languageArr[0],
     messages: localeObj.dataObj
  }, {});
  
  const { intl } = intlProvider.getChildContext();
  
  
  // ---------------------------------------------
  //   Property
  // ---------------------------------------------
  
  let errorsArr = [];
  let logArr = [];
  
  
  // ---------------------------------------------
  //   Errors Arr & Log Array
  // ---------------------------------------------
  
  for (let value of errorCodeArr) {
    
    let tempObj = {
      code: `${fileID}@${functionID}@${value}`,
      message: intl.formatMessage({ id: value }),
    };
    
    errorsArr.push(tempObj);
    
    logArr.push(`${moment().toISOString()}\nCode: ${tempObj.code}\nMessage: ${tempObj.message}\n`);
    
  }
  
  
  // ---------------------------------------------
  //   Log
  // ---------------------------------------------
  
  logger.log('error', `${logArr.join(' / ')}`);
  
  
  // ---------------------------------------------
  //   Return
  // ---------------------------------------------
  
  return {
    errorsArr
  };
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  errorCodeIntoErrorObj
};