// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

// import moment from 'moment';
// import shortid from 'shortid';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { CustomError } from 'app/@modules/error/custom.js';


// ---------------------------------------------
//   Model
// ---------------------------------------------

// import SchemaAchievements from 'app/@database/achievements/schema.js';

// import ModelExperiences from 'app/@database/experiences/model.js';
// import ModelAchievements from 'app/@database/achievements/model.js';
// import ModelUsers from 'app/@database/users/model.js';
// import ModelForumComments from 'app/@database/forum-comments/model.js';
// import ModelRecruitmentThreads from 'app/@database/recruitment-threads/model.js';
// import ModelRecruitmentComments from 'app/@database/recruitment-comments/model.js';
// import ModelRecruitmentReplies from 'app/@database/recruitment-replies/model.js';
// import ModelFollows from 'app/@database/follows/model.js';
// import ModelCardPlayers from 'app/@database/card-players/model.js';
// import ModelWebPushes from 'app/@database/web-pushes/model.js';






// --------------------------------------------------
//   function
// --------------------------------------------------

/**
 * Snackbar を表示する
 * @param {string} message - 表示するメッセージ
 * @param {string} variant - [success, error, warning, info]
 * @param {Object} anchorOrigin - 例）vertical: 'bottom', horizontal: 'left',
 * @param {number} autoHideDuration - 消える時間をミリ秒で指定する
 */
const showSnackbar = async ({
  
  enqueueSnackbar,
  intl,
  arr,
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Loop
    // --------------------------------------------------
    
    for (const [index, valueObj] of arr.entries()) {
      
      
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
    
    
    
    
    // ---------------------------------------------
    //   Return
    // ---------------------------------------------
    
    // return returnObj;
    
    
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