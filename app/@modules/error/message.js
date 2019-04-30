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
    
    message = intl.formatMessage(
      { id: lodashGet(errorObj, ['errorsArr', 0, 'messageCode'], '') },
      { code: lodashGet(errorObj, ['errorsArr', 0, 'code'], '') },
    );
    
    
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