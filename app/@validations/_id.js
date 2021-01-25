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
//   Lodash
// ---------------------------------------------

const lodashGet = require('lodash/get');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { CustomError } = require('../@modules/error/custom.js');






/**
 * _id
 * @param {boolean} throwError - エラーを投げる true / resultObjを返す false
 * @param {boolean} required - 必須 true / 必須でない false
 * @param {string} value - 値
 * @return {Object} バリデーション結果
 */
const validation_id = ({ throwError = false, required = false, value }) => {


  // ---------------------------------------------
  //   Config
  // ---------------------------------------------

  const minLength = 7;
  const maxLength = 14;


  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------

  const data = value ? String(value) : '';
  const numberOfCharacters = data ? data.length : 0;

  const resultObj = {

    value: data,
    numberOfCharacters,
    messageID: 'cFbXmuFVh',
    error: false,

  };


  try {


    // ---------------------------------------------
    //   空の場合、処理停止
    // ---------------------------------------------

    if (validator.isEmpty(data)) {

      if (required) {
        throw new CustomError({ level: 'warn', errorsArr: [{ code: 'ffh0819jW', messageID: 'cFbXmuFVh' }] });
      }

      return resultObj;

    }


    // ---------------------------------------------
    //   英数と -_ のみ
    // ---------------------------------------------
    
    if (data.match(/^[\w\-]+$/) === null) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: '1vJnIRLgu', messageID: 'JBkjlGQMh' }] });
    }


    // ---------------------------------------------
    //   文字数チェック
    // ---------------------------------------------

    if (!validator.isLength(data, { min: minLength, max: maxLength })) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'b205O7DY6', messageID: 'pLES2ZGM2' }] });
    }


  } catch (errorObj) {


    // ---------------------------------------------
    //   Throw Error
    // ---------------------------------------------

    if (throwError) {
      throw errorObj;
    }


    // ---------------------------------------------
    //   Result Error
    // ---------------------------------------------

    resultObj.error = true;

    if (errorObj instanceof CustomError) {
      resultObj.messageID = lodashGet(errorObj, ['errorsArr', 0, 'messageID'], 'Error');
    } else {
      resultObj.messageID = 'qnWsuPcrJ';
    }


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

  validation_id
  
};