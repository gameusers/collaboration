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
 * 趣味
 * @param {boolean} required - Required
 * @param {string} value - 値
 */
const validationCardPlayersHobby = ({ required, valueArr }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 1;
  const maxLength = 20;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  // const data = String(value);
  // const numberOfCharacters = data ? data.length : 0;
  
  let resultObj = {
    valueArr,
    // numberOfCharacters,
    messageCode: 'v9pQT-vPd',
    error: false,
    errorCodeArr: []
  };
  
  
  try {
    
    
    // ---------------------------------------------
    //   Validation
    // ---------------------------------------------
    
    console.log(chalk`
      Array.isArray(valueArr): {green ${Array.isArray(valueArr)}}
      valueArr.length: {green ${valueArr.length}}
    `);
    
    
    // console.log(b);
    
    // 配列かどうか
    if (!Array.isArray(valueArr)) {
      resultObj.errorCodeArr.push('JQ0e-7nz7');
    }
    
    // Not Required で配列が空の場合、処理停止
    if (!required && valueArr.length === 0) {
      return resultObj;
    }
    
    
    for (let value of valueArr.values()) {
      
      // 文字数チェック
      if (!validator.isLength(value, { min: minLength, max: maxLength })) {
        resultObj.errorCodeArr.push('dnYZ0ZPsZ');
      }
      
      console.log(value);
    }
    
    
    
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   Snackbar: Error
    // ---------------------------------------------
    
    // if (type === 'follow') {
    //   storeLayout.handleSnackbarOpen('error', `フォローできませんでした。${error.message}`);
    // } else {
    //   storeLayout.handleSnackbarOpen('error', `フォローの解除ができませんでした。。${error.message}`);
    // }
    
    console.log(errorObj.message);
    
    console.log(`
      ----- errorObj -----\n
      ${util.inspect(JSON.parse(JSON.stringify(errorObj)), { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    
  } finally {
    
    
    // ---------------------------------------------
    //   Message Code & Error
    // ---------------------------------------------
    
    if (resultObj.errorCodeArr.length > 0) {
      resultObj.messageCode = resultObj.errorCodeArr[0];
      resultObj.error = true;
    }
    
    
    // ---------------------------------------------
    //   console.log
    // ---------------------------------------------
    
    // console.log(chalk`
    //   id: {green ${id}}
    // `);
    
    // console.log(`
    //   ----- resultObj -----\n
    //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    return resultObj;
    
    
  }
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = validationCardPlayersHobby;