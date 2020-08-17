// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { CustomError } from 'app/@modules/error/custom.js';






// --------------------------------------------------
//   function
// --------------------------------------------------

/**
 * Snackbar を表示する
 * @param {} enqueueSnackbar - 
 * @param {} intl - 
 * @param {Array} arr - 表示する情報が入った配列
 * @param {Object} experienceObj - 
 */
const showSnackbar = async ({
  
  enqueueSnackbar,
  intl,
  arr = [],
  experienceObj = {},
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   experience
    // --------------------------------------------------
    
    const messageExp = lodashGet(experienceObj, ['exp'], 0);
    const messageLevel = lodashGet(experienceObj, ['level'], 0);
    const titlesArr = lodashGet(experienceObj, ['titlesArr'], []);
    
    const loopArr = arr;
    
    if (messageExp) {
      
      loopArr.push({
        messageExp
      });
      
    }
    
    if (messageLevel) {
      
      loopArr.push({
        messageLevel
      });
      
    }
    
    for (let messageTitle of titlesArr.values()) {
      
      loopArr.push({
        messageTitle
      });
      
    }
    
    // {
          //   messageExp: 50,
          // },
          // {
          //   messageLevel: 5,
          // },
          // {
          //   messageTitle: 'タイムトラベラー',
          // },
    // console.log(`
    //   ----- experienceObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(experienceObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- loopArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(loopArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   Loop
    // --------------------------------------------------
    
    for (const [index, valueObj] of loopArr.entries()) {
      
      
      // --------------------------------------------------
      //   Property
      // --------------------------------------------------
      
      const message = lodashGet(valueObj, ['message'], '');
      const messageID = lodashGet(valueObj, ['messageID'], '');
      const messageExp = lodashGet(valueObj, ['messageExp'], 0);
      const messageLevel = lodashGet(valueObj, ['messageLevel'], 0);
      const messageTitle = lodashGet(valueObj, ['messageTitle'], '');
      
      let variant = lodashGet(valueObj, ['variant'], '');
      const anchorOrigin = lodashGet(valueObj, ['anchorOrigin'], { horizontal: 'left', vertical: 'bottom' });
      const autoHideDuration = lodashGet(valueObj, ['autoHideDuration'], 5000);
      const errorObj = lodashGet(valueObj, ['errorObj'], {});
      
      
      // --------------------------------------------------
      //   Message
      // --------------------------------------------------
      
      let errorMessage = '';
      let sendMessage = '';
      
      
      if (errorObj && Object.keys(errorObj).length !== 0) {
        
        if (errorObj instanceof CustomError) {
          
          errorMessage = lodashGet(errorObj, ['errorsArr', 0, 'code'], 'Error');
          messageID = lodashGet(errorObj, ['errorsArr', 0, 'messageID'], 'Error');
          
        } else {
          
          errorMessage = errorObj.message;
          messageID = 'Error';
          
        }
        
      }
      
      
      if (messageID === 'Error') {
        
        sendMessage = `Error Message: ${errorMessage}`;
        
      } else if (messageID) {
        
        sendMessage = intl.formatMessage({ id: messageID });
        
      } else if (messageExp) {
        
        variant = 'info';
        sendMessage = intl.formatMessage({ id: 'WGCqmLUca' }, { exp: messageExp });
        
      } else if (messageLevel) {
        
        variant = 'info';
        sendMessage = intl.formatMessage({ id: 'FBVZHpPKN' }, { level: messageLevel });
        
      } else if (messageTitle) {
        
        variant = 'success';
        sendMessage = intl.formatMessage({ id: 'vbNIsVv4w' }, { title: messageTitle });
        
      } else if (message) {
        
        sendMessage = message;
        
      }
      
      
      
      
      // ---------------------------------------------
      //   一定時間後に実行するためにミリ秒を設定する
      // ---------------------------------------------
      
      const millisecond = 2000 * index;
      
      
      // console.log(chalk`
      //   message: {green ${message}}
      //   messageID: {green ${messageID}}
      //   millisecond: {green ${millisecond}}
      // `);
      
      
      // ---------------------------------------------
      //   enqueueSnackbar
      // ---------------------------------------------
      
      setTimeout(() => enqueueSnackbar(sendMessage, {
        
        variant,
        anchorOrigin,
        autoHideDuration,
        
      }), millisecond);
      
      
    }
    
    
    
    
    // ---------------------------------------------
    //   console.log
    // ---------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@modules/snackbar.js - showSnackbar
    // `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(returnObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
  } catch (errorObj) {
    
    throw errorObj;
    
  }
  
  
};






// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  
  showSnackbar,
  
};