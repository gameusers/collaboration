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
// const en = require('react-intl/locale-data/en');
// const ja = require('react-intl/locale-data/ja');
// addLocaleData([...en, ...ja]);

// const { locale } = require('../../@locales/locale');

// const intlProvider = new IntlProvider({ locale, localeObj.dataObj }, {});
// const { intl } = intlProvider.getChildContext();


// ---------------------------------------------
//   Logger
// ---------------------------------------------

const logger = require('../logger');




// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * Error 情報の入ったオブジェクトを返す
 * ユーザーに通知するエラー（100000～499999）
 * 通知しないエラー（500000～）
 * @param {Object} error - エラー
 * @param {number} errorCode - エラーコード
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
  
  // const code = `${fileID}@${functionID}@${errorCodeArr.join('/')}`;
  
  
  for (let value of errorCodeArr) {
    
    let tempObj = {
      code: `${fileID}@${functionID}@${value}`,
      message: intl.formatMessage({ id: value }),
    };
    
    // console.log(intl.formatMessage({ id: value }));
    
    
    errorsArr.push(tempObj);
    
    logArr.push(`${moment().utcOffset(0)}\nCode: ${tempObj.code}\nMessage: ${tempObj.message}\n`);
    
  }
  
  
  // ---------------------------------------------
  //   Log
  // ---------------------------------------------
  
  // const log = `${moment().utcOffset(0)}\nCode: ${code}\n`;
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