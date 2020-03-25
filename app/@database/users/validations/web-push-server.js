// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

const validator = require('validator');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { CustomError } = require('../../../@modules/error/custom');




/**
 * webPushSubscriptionObj endpoint
 * @param {string} value - 値
 * @return {Object} バリデーション結果
 */
const validationUsersWebPushSubscriptionObjEndpointServer = async ({ value }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 1;
  const maxLength = 500;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const data = value ? String(value) : '';
  const numberOfCharacters = data ? data.length : 0;
  
  const resultObj = {
    value: data,
    numberOfCharacters,
  };
  
  
  // ---------------------------------------------
  //   空の場合、処理停止
  // ---------------------------------------------
  
  if (validator.isEmpty(data)) {
    throw new CustomError({ level: 'warn', errorsArr: [{ code: 'ipoMJpdN8', messageID: 'cFbXmuFVh' }] });
  }
  
  
  // ---------------------------------------------
  //   文字数チェック
  // ---------------------------------------------
  
  if (!validator.isLength(data, { min: minLength, max: maxLength })) {
    throw new CustomError({ level: 'warn', errorsArr: [{ code: 'jczXzQGfq', messageID: 'eASl8OdnD' }] });
  }
  
  
  // ---------------------------------------------
  //   Return
  // ---------------------------------------------
  
  return resultObj;
  
  
};




/**
 * webPushSubscriptionObj keys p256dh
 * @param {string} value - 値
 * @return {Object} バリデーション結果
 */
const validationUsersWebPushSubscriptionObjKeysP256dhServer = async ({ value }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 1;
  const maxLength = 500;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const data = value ? String(value) : '';
  const numberOfCharacters = data ? data.length : 0;
  
  const resultObj = {
    value: data,
    numberOfCharacters,
  };
  
  
  // ---------------------------------------------
  //   空の場合、処理停止
  // ---------------------------------------------
  
  if (validator.isEmpty(data)) {
    throw new CustomError({ level: 'warn', errorsArr: [{ code: 'oAu72u7Jp', messageID: 'cFbXmuFVh' }] });
  }
  
  
  // ---------------------------------------------
  //   文字数チェック
  // ---------------------------------------------
  
  if (!validator.isLength(data, { min: minLength, max: maxLength })) {
    throw new CustomError({ level: 'warn', errorsArr: [{ code: 'CjidekRnT', messageID: 'eASl8OdnD' }] });
  }
  
  
  // ---------------------------------------------
  //   Return
  // ---------------------------------------------
  
  return resultObj;
  
  
};




/**
 * webPushSubscriptionObj keys auth
 * @param {string} value - 値
 * @return {Object} バリデーション結果
 */
const validationUsersWebPushSubscriptionObjKeysAuthServer = async ({ value }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 1;
  const maxLength = 500;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const data = value ? String(value) : '';
  const numberOfCharacters = data ? data.length : 0;
  
  const resultObj = {
    value: data,
    numberOfCharacters,
  };
  
  
  // ---------------------------------------------
  //   空の場合、処理停止
  // ---------------------------------------------
  
  if (validator.isEmpty(data)) {
    throw new CustomError({ level: 'warn', errorsArr: [{ code: '9N58M3W6B', messageID: 'cFbXmuFVh' }] });
  }
  
  
  // ---------------------------------------------
  //   文字数チェック
  // ---------------------------------------------
  
  if (!validator.isLength(data, { min: minLength, max: maxLength })) {
    throw new CustomError({ level: 'warn', errorsArr: [{ code: 'bOOgrRoh8', messageID: 'eASl8OdnD' }] });
  }
  
  
  // ---------------------------------------------
  //   Return
  // ---------------------------------------------
  
  return resultObj;
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  
  validationUsersWebPushSubscriptionObjEndpointServer,
  validationUsersWebPushSubscriptionObjKeysP256dhServer,
  validationUsersWebPushSubscriptionObjKeysAuthServer,
  
};