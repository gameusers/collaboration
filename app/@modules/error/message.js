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

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import CustomError from './custom';




// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * Error Message を返す
 * @param {Object} intl - intl.formatMessage 用
 * @param {Object} localeObj - Locale Object
 * @param {Object} errorObj - Error Object
 * @return {string} Error Message
 */
const returnErrorMessage = ({ intl, localeObj, errorObj }) => {
  
  
  // ---------------------------------------------
  //   Loop
  // ---------------------------------------------
  
  let message = '';
      
  if (errorObj instanceof CustomError) {
    
    // console.log('Custom Error');
    
    // console.log(`\n---------- errorObj.errorsArr ----------\n`);
    // console.dir(errorObj.errorsArr);
    // console.log(`\n-----------------------------------\n`);
    
    // console.log(chalk`
    //   lodashGet(errorObj, ['errorsArr', 0, 'messageCode'], 'Error'): {green ${lodashGet(errorObj, ['errorsArr', 0, 'messageCode'], 'Error')}}
    // `);
    
    let id = lodashGet(errorObj, ['errorsArr', 0, 'messageCode'], 'Error');
    let code = lodashGet(errorObj, ['errorsArr', 0, 'code'], '');
    
    if (!id) {
      id = 'Error';
    }
    
    if (!code) {
      code = 'Error';
    }
    
    message = intl.formatMessage(
      { id },
      { code },
    );
    
    // message = intl.formatMessage(
    //   { id: lodashGet(errorObj, ['errorsArr', 0, 'messageCode'], 'Error') },
    //   { code: lodashGet(errorObj, ['errorsArr', 0, 'code'], '') },
    // );
    
    
  } else {
    
    // console.log('Default Error');
    
    message = errorObj.message;
    
  }
  
  
  // ---------------------------------------------
  //   Return
  // ---------------------------------------------
  
  return message;
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  returnErrorMessage
};