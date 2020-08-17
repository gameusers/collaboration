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

import moment from 'moment';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';


// ---------------------------------------------
//   Model
// ---------------------------------------------

import ModelUsers from 'app/@database/users/model.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { experienceCalculate } from 'app/@modules/experience.js';






// --------------------------------------------------
//   function
// --------------------------------------------------

/**
 * アクセス日時を更新する / ログイン回数もカウントする
 * @param {Object} loginUsersObj - ログインユーザーの情報、前回のアクセス日時も入っている　accessDate: 2020-08-15T03:41:00.718Z,
 */
const updateAccessDate = async ({
  
  req,
  localeObj,
  loginUsers_id,
  accessDate,
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   returnObj
    // --------------------------------------------------
    
    const returnObj = {};
    
    
    
    
    // --------------------------------------------------
    //   experience
    // --------------------------------------------------
    
    if (loginUsers_id && accessDate) {
      
      
      // --------------------------------------------------
      //   Property
      // --------------------------------------------------
      
      const datetimeAccess = moment(accessDate).utc();
      const datetimeCurrent = moment().utc();
      const days = datetimeCurrent.diff(datetimeAccess, 'days');
      const minutes = datetimeCurrent.diff(datetimeAccess, 'minutes');
      
      const intervalMinutes = parseInt(process.env.ACCESS_DATE_UPDATE_INTERVAL_MINUTES, 10);
      
      const ISO8601 = moment().utc().toISOString();
      
      
      
      
      // --------------------------------------------------
      //   前回のアクセスから1日以上経過している場合、ログイン回数 + 1
      // --------------------------------------------------
      
      if (days >= 1) {
        
        const experienceCalculateArr = [];
        
        experienceCalculateArr.push({
          type: 'login-count',
          calculation: 'addition',
        });
        
        
        if (experienceCalculateArr.length > 0) {
          
          returnObj.experienceObj = await experienceCalculate({ 
            
            req,
            localeObj,
            loginUsers_id,
            arr: experienceCalculateArr,
            
          });
          
        }
        
        
        // console.log(`
        //   ----- experienceCalculateArr -----\n
        //   ${util.inspect(JSON.parse(JSON.stringify(experienceCalculateArr)), { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
        
      }
      
      
      
      
      // --------------------------------------------------
      //   前回のアクセスから規定の時間が経過している場合、アクセス日時を更新する
      // --------------------------------------------------
      
      if (minutes >= intervalMinutes) {
        
        const conditionObj = {
          _id: loginUsers_id
        };
        
        const saveObj = {
          $set: {
            accessDate: ISO8601,
          }
        };
        
        await ModelUsers.upsert({ conditionObj, saveObj });
        
        
        returnObj.updatedAccessDate = ISO8601;
        
        // console.log(`
        //   ----- conditionObj -----\n
        //   ${util.inspect(JSON.parse(JSON.stringify(conditionObj)), { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
        // console.log(`
        //   ----- saveObj -----\n
        //   ${util.inspect(JSON.parse(JSON.stringify(saveObj)), { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
      }
      
      
      console.log(chalk`
        days: {green ${days}}
        minutes: {green ${minutes}}
        process.env.ACCESS_DATE_UPDATE_INTERVAL_MINUTES: {green ${process.env.ACCESS_DATE_UPDATE_INTERVAL_MINUTES}}
        ISO8601: {green ${ISO8601}}
      `);
      
    }
    
    
    
    
    // ---------------------------------------------
    //   console.log
    // ---------------------------------------------
    
    console.log(`
      ----------------------------------------\n
      /app/@modules/access-date.js - updateAccessDate
    `);
    
    // console.log(chalk`
    //   accessDate: {green ${accessDate}}
    // `);
    
    console.log(`
      ----- returnObj -----\n
      ${util.inspect(JSON.parse(JSON.stringify(returnObj)), { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    
    
    
    // ---------------------------------------------
    //   Return
    // ---------------------------------------------
    
    return returnObj;
    
    
  } catch (errorObj) {
    
    throw errorObj;
    
  }
  
  
};






// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  
  updateAccessDate,
  
};