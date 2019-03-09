// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
// const util = require('util');


// ---------------------------------------------
//   Validation
// ---------------------------------------------

const validator = require('validator');




/**
 * Platform
 * @param {string} value - 値
 */
const validationIDsPlatform = ({ value }) => {
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const data = String(value);
  const numberOfCharacters = data ? data.length : 0;
  const messageCodeArr = [];
  
  let resultObj = {
    value: data,
    numberOfCharacters,
    messageCode: 'Error',
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
    
    // 適切な値が選択されているかチェック
    if (!validator.isIn(value, ['PlayStation', 'Xbox', 'Nintendo', 'PC', 'Android', 'iOS', 'Steam', 'Origin', 'Discord', 'Skype', 'ICQ', 'Line', 'Other'])) {
      messageCodeArr.unshift('PH8jcw-VF');
      resultObj.errorCodeArr.push('C56k2p_lB');
    }
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   その他のエラー
    // ---------------------------------------------
    
    messageCodeArr.unshift('qnWsuPcrJ');
    resultObj.errorCodeArr.push('K0nUpNG-6');
    
    
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
  
  
  
  
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  // const value = String(platform);
  // const numberOfCharacters = value ? value.length : 0;
  
  // let resultObj = {
  //   value,
  //   numberOfCharacters,
  //   errorCodeArr: []
  // };
  
  
  // // ---------------------------------------------
  // //   Validation
  // // ---------------------------------------------
  
  // // Not Required で入力値が空の場合、処理停止
  // if (!required && validator.isEmpty(value)) {
  //   return resultObj;
  // }
  
  // // 存在チェック
  // if (validator.isEmpty(value)) {
  //   resultObj.errorCodeArr.push('dJzAwAva3');
  // }
  
  // // 文字数チェック
  // if (!validator.isLength(value, { min: minLength, max: maxLength })) {
  //   resultObj.errorCodeArr.push('k6cF97QOd');
  // }
  
  // // 適切な値が選択されているかチェック
  // if (!validator.isIn(value, ['PlayStation', 'Xbox', 'Nintendo', 'PC', 'Android', 'iOS', 'Steam', 'Origin', 'Discord', 'Skype', 'ICQ', 'Line', 'Other'])) {
  //   resultObj.errorCodeArr.push('kopWIEmo4');
  // }
  
  
  // ---------------------------------------------
  //   console.log
  // ---------------------------------------------
  
  // console.log(chalk`
  //   platform: {green ${platform}}
  // `);
  
  // console.log(`
  //   ----- resultObj -----\n
  //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  return resultObj;
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = validationIDsPlatform;