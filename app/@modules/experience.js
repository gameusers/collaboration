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
import shortid from 'shortid';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';


// ---------------------------------------------
//   Model
// ---------------------------------------------

import ModelExperiences from 'app/@database/experiences/model.js';
import ModelAchievements from 'app/@database/achievements/model.js';
import ModelUsers from 'app/@database/users/model.js';
import ModelForumComments from 'app/@database/forum-comments/model.js';
import ModelRecruitmentThreads from 'app/@database/recruitment-threads/model.js';
import ModelRecruitmentComments from 'app/@database/recruitment-comments/model.js';
import ModelRecruitmentReplies from 'app/@database/recruitment-replies/model.js';
import ModelFollows from 'app/@database/follows/model.js';






// --------------------------------------------------
//   function
// --------------------------------------------------

/**
 * 古のアカウント / account-ancient
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {Array} historiesArr - 現在の達成状況を計算するためのデータが入っている配列
 * @param {Array} acquiredTitles_idsArr - 獲得した称号の _id が入っている配列
 * @param {string} ISO8601 - 日時
 */
const calculateAccountAncient = async ({
  
  loginUsers_id,
  historiesArr,
  acquiredTitles_idsArr,
  ISO8601,
  
}) => {
  
  
  try {
    
    
    // ---------------------------------------------
    //   index
    // ---------------------------------------------
    
    const index = historiesArr.findIndex((valueObj) => {
      return valueObj.type === 'account-ancient';
    });
    
    
    
    
    // ---------------------------------------------
    //   DB find / users
    // ---------------------------------------------
    
    const docUsersObj = await ModelUsers.findOne({
      
      conditionObj: {
        _id: loginUsers_id
      }
      
    });
    
    const createdDate = lodashGet(docUsersObj, ['createdDate'], '');
    
    
    
    
    // ---------------------------------------------
    //   DB achievements
    // ---------------------------------------------
    
    const docAchievementsObj = await ModelAchievements.findOne({
      
      conditionObj: {
        type: 'account-ancient'
      }
      
    });
    
    const conditionsArr = lodashGet(docAchievementsObj, ['conditionsArr'], []);
    
    
    
    
    // ---------------------------------------------
    //   newHistoryObj
    // ---------------------------------------------
    
    let newHistoryObj = {
      
      _id: shortid.generate(),
      createdDate: ISO8601,
      updatedDate: ISO8601,
      type: 'account-ancient',
      countDay: 0,
      countMonth: 0,
      countYear: 0,
      countValid: 0,
      countTotal: 0,
      
    };
    
    
    
    
    // ---------------------------------------------
    //   Calculate
    // ---------------------------------------------
    
    const datetimeCreated = moment(createdDate).utc();
    const datetimeVer2 = moment(process.env.VER2_START_DATETIME).utc();// Ver.2の開始日時を入れる。それ以前にアカウントを作成している場合、実績達成。
    
    if (datetimeCreated.isBefore(datetimeVer2)) {
      
      // console.log('isBefore');
      
      newHistoryObj.countValid = 1;
      newHistoryObj.countTotal = 1;
      
    }
    
    
    
    
    // ---------------------------------------------
    //   acquiredTitles_idsArr
    // ---------------------------------------------
    
    const allTitles_idsArr = [];
    const newAcquiredTitles_idsArr = [];
    
    for (let valueObj of conditionsArr.values()) {
      
      // 獲得できるすべての titles_id を取得する
      allTitles_idsArr.push(valueObj.titles_id);
      
      // 獲得した titles_id を取得する
      if (valueObj.count <= newHistoryObj.countValid) {
        newAcquiredTitles_idsArr.push(valueObj.titles_id);
      }
      
    }
    
    // 一度、配列から獲得できるすべての titles_id を削除する
    const filteredArr = acquiredTitles_idsArr.filter((titles_id) => {
      return allTitles_idsArr.includes(titles_id) === false;
    });
    
    // 獲得した titles_id を追加（結合）する
    const updatedTitles_idsArr = filteredArr.concat(newAcquiredTitles_idsArr);
    
    
    
    
    // ---------------------------------------------
    //   Return Object
    // ---------------------------------------------
    
    const newHistoriesArr = historiesArr;
    
    if (index === -1 && newHistoryObj.countValid === 1) {
      
      newHistoriesArr.push(newHistoryObj);
      
    }
    
    const returnObj = {
      
      historiesArr: newHistoriesArr,
      acquiredTitles_idsArr: updatedTitles_idsArr,
      
    };
    
    
    
    
    // ---------------------------------------------
    //   console.log
    // ---------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@modules/experience.js - calculateAccountAncient
    // `);
    
    // console.log(`
    //   ----- acquiredTitles_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(acquiredTitles_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- allTitles_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(allTitles_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- newAcquiredTitles_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(newAcquiredTitles_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- filteredArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(filteredArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- updatedTitles_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(updatedTitles_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- newHistoryObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(newHistoryObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- historiesArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(historiesArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- newHistoryObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(newHistoryObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(returnObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // ---------------------------------------------
    //   Return
    // ---------------------------------------------
    
    return returnObj;
    
    
  } catch (errorObj) {
    
    throw errorObj;
    
  }
  
  
};




/**
 * アカウント作成後の経過日数 / account-count-day
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {Array} historiesArr - 現在の達成状況を計算するためのデータが入っている配列
 * @param {Array} acquiredTitles_idsArr - 獲得した称号の _id が入っている配列
 * @param {string} ISO8601 - 日時
 */
const calculateAccountCountDay = async ({
  
  loginUsers_id,
  historiesArr,
  acquiredTitles_idsArr,
  ISO8601,
  
}) => {
  
  
  try {
    
    
    // ---------------------------------------------
    //   historyObj
    // ---------------------------------------------
    
    let historyObj = {};
    
    const index = historiesArr.findIndex((valueObj) => {
      return valueObj.type === 'account-count-day';
    });
    
    if (index !== -1) {
      historyObj = historiesArr[index];
    }
    
    
    // console.log(chalk`
    //   index: {green ${index}}
    // `);
    
    // console.log(`
    //   ----- historyObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(historyObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // ---------------------------------------------
    //   DB find / users
    // ---------------------------------------------
    
    const docUsersObj = await ModelUsers.findOne({
      
      conditionObj: {
        _id: loginUsers_id
      }
      
    });
    
    const createdDate = lodashGet(docUsersObj, ['createdDate'], '');
    
    
    
    
    // ---------------------------------------------
    //   DB achievements
    // ---------------------------------------------
    
    const docAchievementsObj = await ModelAchievements.findOne({
      
      conditionObj: {
        type: 'account-count-day'
      }
      
    });
    
    const limitDay = lodashGet(docAchievementsObj, ['limitDay'], 0);
    const limitMonth = lodashGet(docAchievementsObj, ['limitMonth'], 0);
    const limitYear = lodashGet(docAchievementsObj, ['limitYear'], 0);
    
    const conditionsArr = lodashGet(docAchievementsObj, ['conditionsArr'], []);
    
    
    
    
    // ---------------------------------------------
    //   - Update
    // ---------------------------------------------
    
    let newHistoryObj = {};
    
    if (Object.keys(historyObj).length !== 0) {
      
      newHistoryObj = historyObj;
      
      const datetimeCurrent = moment(ISO8601).utc();
      const datetimeUpdated = moment(newHistoryObj.updatedDate).utc();
      
      
      // ---------------------------------------------
      //   前回の更新から日、月、年が変わっている場合はカウントを0にする
      // ---------------------------------------------
      
      if (limitDay && datetimeCurrent.isSame(datetimeUpdated, 'day') === false) {
        
        newHistoryObj.countDay = 0;
        
      } else if (limitMonth && datetimeCurrent.isSame(datetimeUpdated, 'month') === false) {
        
        newHistoryObj.countMonth = 0;
        
      } else if (limitYear && datetimeCurrent.isSame(datetimeUpdated, 'year') === false) {
        
        newHistoryObj.countYear = 0;
        
      }
      
      newHistoryObj.updatedDate = ISO8601;
      
      
    // ---------------------------------------------
    //   - Insert
    // ---------------------------------------------
      
    } else {
      
      newHistoryObj = {
        
        _id: shortid.generate(),
        createdDate: ISO8601,
        updatedDate: ISO8601,
        type: 'account-count-day',
        countDay: 0,
        countMonth: 0,
        countYear: 0,
        countValid: 0,
        countTotal: 0,
        
      };
      
    }
    
    
    
    
    // ---------------------------------------------
    //   Calculate
    // ---------------------------------------------
    
    const datetimeCreated = moment(createdDate).utc();
    const datetimeCurrent = moment().utc();
    const days = datetimeCurrent.diff(datetimeCreated, 'days');
    
    newHistoryObj.updatedDate = ISO8601;
    newHistoryObj.countValid = days;
    newHistoryObj.countTotal = days;
    
    
    
    
    // ---------------------------------------------
    //   acquiredTitles_idsArr
    // ---------------------------------------------
    
    const allTitles_idsArr = [];
    const newAcquiredTitles_idsArr = [];
    
    for (let valueObj of conditionsArr.values()) {
      
      // 獲得できるすべての titles_id を取得する
      allTitles_idsArr.push(valueObj.titles_id);
      
      // 獲得した titles_id を取得する
      if (valueObj.count <= newHistoryObj.countValid) {
        newAcquiredTitles_idsArr.push(valueObj.titles_id);
      }
      
    }
    
    // 一度、配列から獲得できるすべての titles_id を削除する
    const filteredArr = acquiredTitles_idsArr.filter((titles_id) => {
      return allTitles_idsArr.includes(titles_id) === false;
    });
    
    // 獲得した titles_id を追加（結合）する
    const updatedTitles_idsArr = filteredArr.concat(newAcquiredTitles_idsArr);
    
    
    
    
    // ---------------------------------------------
    //   Return Object
    // ---------------------------------------------
    
    const newHistoriesArr = historiesArr;
    
    if (index === -1) {
      
      newHistoriesArr.push(newHistoryObj);
      
    } else {
      
      newHistoriesArr[index] = newHistoryObj;
      
    }
    
    const returnObj = {
      
      historiesArr: newHistoriesArr,
      acquiredTitles_idsArr: updatedTitles_idsArr,
      
    };
    
    
    
    
    // ---------------------------------------------
    //   console.log
    // ---------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@modules/experience.js - calculateAccountCountDay
    // `);
    
    // console.log(`
    //   ----- acquiredTitles_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(acquiredTitles_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- allTitles_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(allTitles_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- newAcquiredTitles_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(newAcquiredTitles_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- filteredArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(filteredArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- updatedTitles_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(updatedTitles_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- newHistoryObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(newHistoryObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- historiesArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(historiesArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- newHistoryObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(newHistoryObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(returnObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // ---------------------------------------------
    //   Return
    // ---------------------------------------------
    
    return returnObj;
    
    
  } catch (errorObj) {
    
    throw errorObj;
    
  }
  
  
};




/**
 * フォーラム書き込み / forum-count-post
 * @param {string} calculation - [addition（加算）, subtraction（減算）, recalculation（再計算）]
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {Array} historiesArr - 現在の達成状況を計算するためのデータが入っている配列
 * @param {Array} acquiredTitles_idsArr - 獲得した称号の _id が入っている配列
 * @param {string} ISO8601 - 日時
 */
const calculateForumCountPost = async ({
  
  calculation,
  loginUsers_id,
  historiesArr,
  acquiredTitles_idsArr,
  ISO8601,
  
}) => {
  
  
  try {
    
    
    // ---------------------------------------------
    //   historyObj
    // ---------------------------------------------
    
    let historyObj = {};
    
    const index = historiesArr.findIndex((valueObj) => {
      return valueObj.type === 'forum-count-post';
    });
    
    if (index !== -1) {
      historyObj = historiesArr[index];
    }
    
    
    // console.log(chalk`
    //   index: {green ${index}}
    // `);
    
    // console.log(`
    //   ----- historyObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(historyObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // ---------------------------------------------
    //   DB achievements
    // ---------------------------------------------
    
    const docAchievementsObj = await ModelAchievements.findOne({
      
      conditionObj: {
        type: 'forum-count-post'
      }
      
    });
    
    const limitDay = lodashGet(docAchievementsObj, ['limitDay'], 0);
    const limitMonth = lodashGet(docAchievementsObj, ['limitMonth'], 0);
    const limitYear = lodashGet(docAchievementsObj, ['limitYear'], 0);
    
    const conditionsArr = lodashGet(docAchievementsObj, ['conditionsArr'], []);
    
    
    // obj.countDay = 5;
    // obj.updatedDate = '2020-08-01T00:00:00.000Z';
    
    
    
    
    // ---------------------------------------------
    //   - Update
    // ---------------------------------------------
    
    let newHistoryObj = {};
    
    if (Object.keys(historyObj).length !== 0) {
      
      newHistoryObj = historyObj;
      
      const datetimeCurrent = moment(ISO8601).utc();
      const datetimeUpdated = moment(newHistoryObj.updatedDate).utc();
      // const datetimeCurrent = moment('2020-08-07T23:55:05.898Z').utc();
      // const datetimeUpdated = moment('2020-08-07T00:00:00.000Z').utc();
      
      
      // datetimeCurrent.isSame(datetimeUpdated, 'day'): {green ${moment(ISO8601).isSame(obj.updatedDate, 'day')}
      
      // console.log(chalk`
      //   ISO8601: {green ${ISO8601}}
      //   obj.updatedDate: {green ${obj.updatedDate}}
      //   moment(ISO8601).isSame(obj.updatedDate, 'day'): {green ${moment(ISO8601).isSame(obj.updatedDate, 'day')}}
        
      //   datetimeCurrent: {green ${datetimeCurrent}}
      //   datetimeUpdated: {green ${datetimeUpdated}}
      //   datetimeCurrent.isSame(datetimeUpdated, 'day'): {green ${datetimeCurrent.isSame(datetimeUpdated, 'day')}}
      // `);
      
      
      // ---------------------------------------------
      //   前回の更新から日、月、年が変わっている場合はカウントを0にする
      // ---------------------------------------------
      
      if (limitDay && datetimeCurrent.isSame(datetimeUpdated, 'day') === false) {
        
        newHistoryObj.countDay = 0;
        
      } else if (limitMonth && datetimeCurrent.isSame(datetimeUpdated, 'month') === false) {
        
        newHistoryObj.countMonth = 0;
        
      } else if (limitYear && datetimeCurrent.isSame(datetimeUpdated, 'year') === false) {
        
        newHistoryObj.countYear = 0;
        
      }
      
      newHistoryObj.updatedDate = ISO8601;
      
      
    // ---------------------------------------------
    //   - Insert
    // ---------------------------------------------
      
    } else {
      
      newHistoryObj = {
        
        _id: shortid.generate(),
        createdDate: ISO8601,
        updatedDate: ISO8601,
        type: 'forum-count-post',
        countDay: 0,
        countMonth: 0,
        countYear: 0,
        countValid: 0,
        countTotal: 0,
        
      };
      
    }
    
    
    
    
    // ---------------------------------------------
    //   count
    // ---------------------------------------------
    
    if (calculation === 'addition') {
      
      if (limitDay && limitDay >= newHistoryObj.countDay + 1) {
        
        newHistoryObj.countDay += 1;
        newHistoryObj.countValid += 1;
        
      }
      
      newHistoryObj.countTotal += 1;
      
    } else if (calculation === 'subtraction') {
      
      newHistoryObj.countValid -= 1;
      newHistoryObj.countTotal -= 1;
      
    } else {
      
      
      // ---------------------------------------------
      //   DB find / forum-comments
      // ---------------------------------------------
      
      const count = await ModelForumComments.count({
        
        conditionObj: {
          users_id: loginUsers_id
        }
        
      });
      
      newHistoryObj.countValid = count;
      
      if (newHistoryObj.countTotal < newHistoryObj.countValid) {
        newHistoryObj.countTotal = newHistoryObj.countValid;
      }
      
      
    }
    
    
    
    // newHistoryObj.countValid = 10;
    
    
    // ---------------------------------------------
    //   acquiredTitles_idsArr
    // ---------------------------------------------
    
    const allTitles_idsArr = [];
    const newAcquiredTitles_idsArr = [];
    
    for (let valueObj of conditionsArr.values()) {
      
      // 獲得できるすべての titles_id を取得する
      allTitles_idsArr.push(valueObj.titles_id);
      
      // 獲得した titles_id を取得する
      if (valueObj.count <= newHistoryObj.countValid) {
        newAcquiredTitles_idsArr.push(valueObj.titles_id);
      }
      
    }
    
    // 一度、配列から獲得できるすべての titles_id を削除する
    const filteredArr = acquiredTitles_idsArr.filter((titles_id) => {
      return allTitles_idsArr.includes(titles_id) === false;
    });
    
    // 獲得した titles_id を追加（結合）する
    const updatedTitles_idsArr = filteredArr.concat(newAcquiredTitles_idsArr);
    
    
    // const exp = achievementsExp * lodashGet(obj, ['countValid'], 0);
    
    
    
    // ---------------------------------------------
    //   Return Object
    // ---------------------------------------------
    
    const newHistoriesArr = historiesArr;
    
    if (index === -1) {
      
      newHistoriesArr.push(newHistoryObj);
      
    } else {
      
      newHistoriesArr[index] = newHistoryObj;
      
    }
    
    const returnObj = {
      
      historiesArr: newHistoriesArr,
      acquiredTitles_idsArr: updatedTitles_idsArr,
      
    };
    
    
    
    
    // ---------------------------------------------
    //   console.log
    // ---------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@modules/experience.js - forumCountPost
    // `);
    
    // console.log(`
    //   ----- acquiredTitles_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(acquiredTitles_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- allTitles_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(allTitles_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- newAcquiredTitles_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(newAcquiredTitles_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- filteredArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(filteredArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- updatedTitles_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(updatedTitles_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- newHistoryObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(newHistoryObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- historiesArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(historiesArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- newHistoryObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(newHistoryObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(returnObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // ---------------------------------------------
    //   Return
    // ---------------------------------------------
    
    return returnObj;
    
    
  } catch (errorObj) {
    
    throw errorObj;
    
  }
  
  
};




/**
 * 募集投稿 / recruitment-count-post
 * @param {string} calculation - [addition（加算）, subtraction（減算）, recalculation（再計算）]
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {Array} historiesArr - 現在の達成状況を計算するためのデータが入っている配列
 * @param {Array} acquiredTitles_idsArr - 獲得した称号の _id が入っている配列
 * @param {string} ISO8601 - 日時
 */
const calculateRecruitmentCountPost = async ({
  
  calculation,
  loginUsers_id,
  historiesArr,
  acquiredTitles_idsArr,
  ISO8601,
  
}) => {
  
  
  try {
    
    
    // ---------------------------------------------
    //   historyObj
    // ---------------------------------------------
    
    let historyObj = {};
    
    const index = historiesArr.findIndex((valueObj) => {
      return valueObj.type === 'recruitment-count-post';
    });
    
    if (index !== -1) {
      historyObj = historiesArr[index];
    }
    
    
    
    
    // ---------------------------------------------
    //   DB achievements
    // ---------------------------------------------
    
    const docAchievementsObj = await ModelAchievements.findOne({
      
      conditionObj: {
        type: 'recruitment-count-post'
      }
      
    });
    
    const limitDay = lodashGet(docAchievementsObj, ['limitDay'], 0);
    const limitMonth = lodashGet(docAchievementsObj, ['limitMonth'], 0);
    const limitYear = lodashGet(docAchievementsObj, ['limitYear'], 0);
    
    const conditionsArr = lodashGet(docAchievementsObj, ['conditionsArr'], []);
    
    
    
    
    // ---------------------------------------------
    //   - Update
    // ---------------------------------------------
    
    let newHistoryObj = {};
    
    if (Object.keys(historyObj).length !== 0) {
      
      newHistoryObj = historyObj;
      
      const datetimeCurrent = moment(ISO8601).utc();
      const datetimeUpdated = moment(newHistoryObj.updatedDate).utc();
      
      
      // ---------------------------------------------
      //   前回の更新から日、月、年が変わっている場合はカウントを0にする
      // ---------------------------------------------
      
      if (limitDay && datetimeCurrent.isSame(datetimeUpdated, 'day') === false) {
        
        newHistoryObj.countDay = 0;
        
      } else if (limitMonth && datetimeCurrent.isSame(datetimeUpdated, 'month') === false) {
        
        newHistoryObj.countMonth = 0;
        
      } else if (limitYear && datetimeCurrent.isSame(datetimeUpdated, 'year') === false) {
        
        newHistoryObj.countYear = 0;
        
      }
      
      newHistoryObj.updatedDate = ISO8601;
      
      
    // ---------------------------------------------
    //   - Insert
    // ---------------------------------------------
      
    } else {
      
      newHistoryObj = {
        
        _id: shortid.generate(),
        createdDate: ISO8601,
        updatedDate: ISO8601,
        type: 'recruitment-count-post',
        countDay: 0,
        countMonth: 0,
        countYear: 0,
        countValid: 0,
        countTotal: 0,
        
      };
      
    }
    
    
    
    
    // ---------------------------------------------
    //   count
    // ---------------------------------------------
    
    if (calculation === 'addition') {
      
      if (limitDay && limitDay >= newHistoryObj.countDay + 1) {
        
        newHistoryObj.countDay += 1;
        newHistoryObj.countValid += 1;
        
      }
      
      newHistoryObj.countTotal += 1;
      
    } else if (calculation === 'subtraction') {
      
      newHistoryObj.countValid -= 1;
      newHistoryObj.countTotal -= 1;
      
    } else {
      
      
      // ---------------------------------------------
      //   DB find / recruitment-threads
      // ---------------------------------------------
      
      const threadsCount = await ModelRecruitmentThreads.count({
        
        conditionObj: {
          users_id: loginUsers_id
        }
        
      });
      
      
      // ---------------------------------------------
      //   DB find / recruitment-comments
      // ---------------------------------------------
      
      const commentsCount = await ModelRecruitmentComments.count({
        
        conditionObj: {
          users_id: loginUsers_id
        }
        
      });
      
      
      // ---------------------------------------------
      //   DB find / recruitment-replies
      // ---------------------------------------------
      
      const repliesCount = await ModelRecruitmentReplies.count({
        
        conditionObj: {
          users_id: loginUsers_id
        }
        
      });
      
      
      newHistoryObj.countValid = threadsCount + commentsCount + repliesCount;
      
      if (newHistoryObj.countTotal < newHistoryObj.countValid) {
        newHistoryObj.countTotal = newHistoryObj.countValid;
      }
      
      
    }
    
    
    
    // newHistoryObj.countValid = 10;
    
    
    // ---------------------------------------------
    //   acquiredTitles_idsArr
    // ---------------------------------------------
    
    const allTitles_idsArr = [];
    const newAcquiredTitles_idsArr = [];
    
    for (let valueObj of conditionsArr.values()) {
      
      // 獲得できるすべての titles_id を取得する
      allTitles_idsArr.push(valueObj.titles_id);
      
      // 獲得した titles_id を取得する
      if (valueObj.count <= newHistoryObj.countValid) {
        newAcquiredTitles_idsArr.push(valueObj.titles_id);
      }
      
    }
    
    // 一度、配列から獲得できるすべての titles_id を削除する
    const filteredArr = acquiredTitles_idsArr.filter((titles_id) => {
      return allTitles_idsArr.includes(titles_id) === false;
    });
    
    // 獲得した titles_id を追加（結合）する
    const updatedTitles_idsArr = filteredArr.concat(newAcquiredTitles_idsArr);
    
    
    
    
    // ---------------------------------------------
    //   Return Object
    // ---------------------------------------------
    
    const newHistoriesArr = historiesArr;
    
    if (index === -1) {
      
      newHistoriesArr.push(newHistoryObj);
      
    } else {
      
      newHistoriesArr[index] = newHistoryObj;
      
    }
    
    const returnObj = {
      
      historiesArr: newHistoriesArr,
      acquiredTitles_idsArr: updatedTitles_idsArr,
      
    };
    
    
    
    
    // ---------------------------------------------
    //   console.log
    // ---------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@modules/experience.js - calculateRecruitmentCountPost
    // `);
    
    // console.log(`
    //   ----- acquiredTitles_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(acquiredTitles_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- allTitles_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(allTitles_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- newAcquiredTitles_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(newAcquiredTitles_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- filteredArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(filteredArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- updatedTitles_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(updatedTitles_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- historiesArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(historiesArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- newHistoryObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(newHistoryObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(returnObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // ---------------------------------------------
    //   Return
    // ---------------------------------------------
    
    return returnObj;
    
    
  } catch (errorObj) {
    
    throw errorObj;
    
  }
  
  
};




/**
 * フォローする / follow-count
 * @param {string} calculation - [addition（加算）, subtraction（減算）, recalculation（再計算）]
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {Array} historiesArr - 現在の達成状況を計算するためのデータが入っている配列
 * @param {Array} acquiredTitles_idsArr - 獲得した称号の _id が入っている配列
 * @param {string} ISO8601 - 日時
 */
const calculateFollowCount = async ({
  
  calculation,
  loginUsers_id,
  historiesArr,
  acquiredTitles_idsArr,
  ISO8601,
  
}) => {
  
  
  try {
    
    
    // ---------------------------------------------
    //   historyObj
    // ---------------------------------------------
    
    let historyObj = {};
    
    const index = historiesArr.findIndex((valueObj) => {
      return valueObj.type === 'follow-count';
    });
    
    if (index !== -1) {
      historyObj = historiesArr[index];
    }
    
    
    
    
    // ---------------------------------------------
    //   DB achievements
    // ---------------------------------------------
    
    const docAchievementsObj = await ModelAchievements.findOne({
      
      conditionObj: {
        type: 'follow-count'
      }
      
    });
    
    const limitDay = lodashGet(docAchievementsObj, ['limitDay'], 0);
    const limitMonth = lodashGet(docAchievementsObj, ['limitMonth'], 0);
    const limitYear = lodashGet(docAchievementsObj, ['limitYear'], 0);
    
    const conditionsArr = lodashGet(docAchievementsObj, ['conditionsArr'], []);
    
    
    
    
    // ---------------------------------------------
    //   - Update
    // ---------------------------------------------
    
    let newHistoryObj = {};
    
    if (Object.keys(historyObj).length !== 0) {
      
      newHistoryObj = historyObj;
      
      const datetimeCurrent = moment(ISO8601).utc();
      const datetimeUpdated = moment(newHistoryObj.updatedDate).utc();
      
      
      // ---------------------------------------------
      //   前回の更新から日、月、年が変わっている場合はカウントを0にする
      // ---------------------------------------------
      
      if (limitDay && datetimeCurrent.isSame(datetimeUpdated, 'day') === false) {
        
        newHistoryObj.countDay = 0;
        
      } else if (limitMonth && datetimeCurrent.isSame(datetimeUpdated, 'month') === false) {
        
        newHistoryObj.countMonth = 0;
        
      } else if (limitYear && datetimeCurrent.isSame(datetimeUpdated, 'year') === false) {
        
        newHistoryObj.countYear = 0;
        
      }
      
      newHistoryObj.updatedDate = ISO8601;
      
      
    // ---------------------------------------------
    //   - Insert
    // ---------------------------------------------
      
    } else {
      
      newHistoryObj = {
        
        _id: shortid.generate(),
        createdDate: ISO8601,
        updatedDate: ISO8601,
        type: 'follow-count',
        countDay: 0,
        countMonth: 0,
        countYear: 0,
        countValid: 0,
        countTotal: 0,
        
      };
      
    }
    
    
    
    
    // ---------------------------------------------
    //   count
    // ---------------------------------------------
    
    if (calculation === 'addition') {
      
      if (limitDay && limitDay >= newHistoryObj.countDay + 1) {
        
        newHistoryObj.countDay += 1;
        newHistoryObj.countValid += 1;
        
      }
      
      newHistoryObj.countTotal += 1;
      
    } else if (calculation === 'subtraction') {
      
      newHistoryObj.countValid -= 1;
      newHistoryObj.countTotal -= 1;
      
    } else {
      
      
      // ---------------------------------------------
      //   DB find / follows
      // ---------------------------------------------
      
      const docFollowsObj = await ModelFollows.findOne({
        
        conditionObj: {
          users_id: loginUsers_id
        }
        
      });
      
      const count = lodashGet(docFollowsObj, ['followCount'], 0);
      
      newHistoryObj.countValid = count;
      
      if (newHistoryObj.countTotal < newHistoryObj.countValid) {
        newHistoryObj.countTotal = newHistoryObj.countValid;
      }
      
      
    }
    
    
    
    
    // ---------------------------------------------
    //   acquiredTitles_idsArr
    // ---------------------------------------------
    
    const allTitles_idsArr = [];
    const newAcquiredTitles_idsArr = [];
    
    for (let valueObj of conditionsArr.values()) {
      
      // 獲得できるすべての titles_id を取得する
      allTitles_idsArr.push(valueObj.titles_id);
      
      // 獲得した titles_id を取得する
      if (valueObj.count <= newHistoryObj.countValid) {
        newAcquiredTitles_idsArr.push(valueObj.titles_id);
      }
      
    }
    
    // 一度、配列から獲得できるすべての titles_id を削除する
    const filteredArr = acquiredTitles_idsArr.filter((titles_id) => {
      return allTitles_idsArr.includes(titles_id) === false;
    });
    
    // 獲得した titles_id を追加（結合）する
    const updatedTitles_idsArr = filteredArr.concat(newAcquiredTitles_idsArr);
    
    
    
    
    // ---------------------------------------------
    //   Return Object
    // ---------------------------------------------
    
    const newHistoriesArr = historiesArr;
    
    if (index === -1) {
      
      newHistoriesArr.push(newHistoryObj);
      
    } else {
      
      newHistoriesArr[index] = newHistoryObj;
      
    }
    
    const returnObj = {
      
      historiesArr: newHistoriesArr,
      acquiredTitles_idsArr: updatedTitles_idsArr,
      
    };
    
    
    
    
    // ---------------------------------------------
    //   console.log
    // ---------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@modules/experience.js - calculateFollowCount
    // `);
    
    // console.log(`
    //   ----- acquiredTitles_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(acquiredTitles_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- allTitles_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(allTitles_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- newAcquiredTitles_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(newAcquiredTitles_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- filteredArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(filteredArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- updatedTitles_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(updatedTitles_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- historiesArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(historiesArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- newHistoryObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(newHistoryObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(returnObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // ---------------------------------------------
    //   Return
    // ---------------------------------------------
    
    return returnObj;
    
    
  } catch (errorObj) {
    
    throw errorObj;
    
  }
  
  
};




/**
 * フォローされる / followed-count
 * @param {string} calculation - [addition（加算）, subtraction（減算）, recalculation（再計算）]
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {Array} historiesArr - 現在の達成状況を計算するためのデータが入っている配列
 * @param {Array} acquiredTitles_idsArr - 獲得した称号の _id が入っている配列
 * @param {string} ISO8601 - 日時
 */
const calculateFollowedCount = async ({
  
  calculation,
  loginUsers_id,
  historiesArr,
  acquiredTitles_idsArr,
  ISO8601,
  
}) => {
  
  
  try {
    
    
    // ---------------------------------------------
    //   historyObj
    // ---------------------------------------------
    
    let historyObj = {};
    
    const index = historiesArr.findIndex((valueObj) => {
      return valueObj.type === 'followed-count';
    });
    
    if (index !== -1) {
      historyObj = historiesArr[index];
    }
    
    
    
    
    // ---------------------------------------------
    //   DB achievements
    // ---------------------------------------------
    
    const docAchievementsObj = await ModelAchievements.findOne({
      
      conditionObj: {
        type: 'followed-count'
      }
      
    });
    
    const limitDay = lodashGet(docAchievementsObj, ['limitDay'], 0);
    const limitMonth = lodashGet(docAchievementsObj, ['limitMonth'], 0);
    const limitYear = lodashGet(docAchievementsObj, ['limitYear'], 0);
    
    const conditionsArr = lodashGet(docAchievementsObj, ['conditionsArr'], []);
    
    
    
    
    // ---------------------------------------------
    //   - Update
    // ---------------------------------------------
    
    let newHistoryObj = {};
    
    if (Object.keys(historyObj).length !== 0) {
      
      newHistoryObj = historyObj;
      
      const datetimeCurrent = moment(ISO8601).utc();
      const datetimeUpdated = moment(newHistoryObj.updatedDate).utc();
      
      
      // ---------------------------------------------
      //   前回の更新から日、月、年が変わっている場合はカウントを0にする
      // ---------------------------------------------
      
      if (limitDay && datetimeCurrent.isSame(datetimeUpdated, 'day') === false) {
        
        newHistoryObj.countDay = 0;
        
      } else if (limitMonth && datetimeCurrent.isSame(datetimeUpdated, 'month') === false) {
        
        newHistoryObj.countMonth = 0;
        
      } else if (limitYear && datetimeCurrent.isSame(datetimeUpdated, 'year') === false) {
        
        newHistoryObj.countYear = 0;
        
      }
      
      newHistoryObj.updatedDate = ISO8601;
      
      
    // ---------------------------------------------
    //   - Insert
    // ---------------------------------------------
      
    } else {
      
      newHistoryObj = {
        
        _id: shortid.generate(),
        createdDate: ISO8601,
        updatedDate: ISO8601,
        type: 'followed-count',
        countDay: 0,
        countMonth: 0,
        countYear: 0,
        countValid: 0,
        countTotal: 0,
        
      };
      
    }
    
    
    
    
    // ---------------------------------------------
    //   count
    // ---------------------------------------------
    
    if (calculation === 'addition') {
      
      if (limitDay && limitDay >= newHistoryObj.countDay + 1) {
        
        newHistoryObj.countDay += 1;
        newHistoryObj.countValid += 1;
        
      }
      
      newHistoryObj.countTotal += 1;
      
    } else if (calculation === 'subtraction') {
      
      newHistoryObj.countValid -= 1;
      newHistoryObj.countTotal -= 1;
      
    } else {
      
      
      // ---------------------------------------------
      //   DB find / follows
      // ---------------------------------------------
      
      const docFollowsObj = await ModelFollows.findOne({
        
        conditionObj: {
          users_id: loginUsers_id
        }
        
      });
      
      const count = lodashGet(docFollowsObj, ['followedCount'], 0);
      
      newHistoryObj.countValid = count;
      
      if (newHistoryObj.countTotal < newHistoryObj.countValid) {
        newHistoryObj.countTotal = newHistoryObj.countValid;
      }
      
      
    }
    
    
    
    
    // ---------------------------------------------
    //   acquiredTitles_idsArr
    // ---------------------------------------------
    
    const allTitles_idsArr = [];
    const newAcquiredTitles_idsArr = [];
    
    for (let valueObj of conditionsArr.values()) {
      
      // 獲得できるすべての titles_id を取得する
      allTitles_idsArr.push(valueObj.titles_id);
      
      // 獲得した titles_id を取得する
      if (valueObj.count <= newHistoryObj.countValid) {
        newAcquiredTitles_idsArr.push(valueObj.titles_id);
      }
      
    }
    
    // 一度、配列から獲得できるすべての titles_id を削除する
    const filteredArr = acquiredTitles_idsArr.filter((titles_id) => {
      return allTitles_idsArr.includes(titles_id) === false;
    });
    
    // 獲得した titles_id を追加（結合）する
    const updatedTitles_idsArr = filteredArr.concat(newAcquiredTitles_idsArr);
    
    
    
    
    // ---------------------------------------------
    //   Return Object
    // ---------------------------------------------
    
    const newHistoriesArr = historiesArr;
    
    if (index === -1) {
      
      newHistoriesArr.push(newHistoryObj);
      
    } else {
      
      newHistoriesArr[index] = newHistoryObj;
      
    }
    
    const returnObj = {
      
      historiesArr: newHistoriesArr,
      acquiredTitles_idsArr: updatedTitles_idsArr,
      
    };
    
    
    
    
    // ---------------------------------------------
    //   console.log
    // ---------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@modules/experience.js - calculateFollowedCount
    // `);
    
    // console.log(`
    //   ----- acquiredTitles_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(acquiredTitles_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- allTitles_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(allTitles_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- newAcquiredTitles_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(newAcquiredTitles_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- filteredArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(filteredArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- updatedTitles_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(updatedTitles_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- historiesArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(historiesArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- newHistoryObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(newHistoryObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(returnObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // ---------------------------------------------
    //   Return
    // ---------------------------------------------
    
    return returnObj;
    
    
  } catch (errorObj) {
    
    throw errorObj;
    
  }
  
  
};






/**
 * 経験値、獲得称号を計算する / 数値の加算、減算、再計算も行う
 * （何度もデータベースにアクセスするので処理が重いかもしれない）
 * @param {Object} req - リクエスト
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} type - なにを処理するのか指定する / ['account-ancient', 'level-count', 'account-count-day', 'login-count', 'good-count-click', 'good-count-clicked', 'forum-count-post', 'recruitment-count-post', 'follow-count', 'followed-count', 'title-count', 'title-show', 'card-player-edit', 'card-player-upload-image-main', 'card-player-upload-image-thumbnail', 'user-page-upload-image-main', 'user-page-change-url', 'web-push-permission']
 * @param {string} calculation - [addition（加算）, subtraction（減算）, recalculation（再計算）]
 */
const experienceCalculate = async ({
  
  req,
  loginUsers_id,
  type,
  calculation,
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   ログインチェック
    // --------------------------------------------------
    
    if (!req.isAuthenticated()) {
      throw new Error();
    }
    
    
    // ['account-ancient', 'level-count', 'account-count-day', 'login-count', 'good-count-click', 'good-count-clicked', 'forum-count-post', 'recruitment-count-post', 'follow-count', 'followed-count', 'title-count', 'title-show', 'card-player-edit', 'card-player-upload-image-main', 'card-player-upload-image-thumbnail', 'user-page-upload-image-main', 'user-page-change-url', 'web-push-permission']
    
    
    // ---------------------------------------------
    //   Property
    // ---------------------------------------------
    
    const ISO8601 = moment().utc().toISOString();
    
    
    
    
    // ---------------------------------------------
    //   DB find / experiences
    // ---------------------------------------------
    
    const docExperiencesObj = await ModelExperiences.findOne({
      
      conditionObj: {
        users_id: loginUsers_id
      }
      
    });
    
    let historiesArr = lodashGet(docExperiencesObj, ['historiesArr'], []);
    let acquiredTitles_idsArr = lodashGet(docExperiencesObj, ['acquiredTitles_idsArr'], []);
    
    // console.log(`
    //   ----- acquiredTitles_idsArr -----\n
    //   ${util.inspect(acquiredTitles_idsArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // ---------------------------------------------
    //   DB find / users
    // ---------------------------------------------
    
    // const docUsersObj = await ModelUsers.findOne({
      
    //   conditionObj: {
    //     _id: loginUsers_id
    //   }
      
    // });
    
    // const createdDate = lodashGet(docUsersObj, ['createdDate'], '');
    
    
    
    
    // ---------------------------------------------
    //   account-ancient
    // ---------------------------------------------
    
    if (type === 'account-ancient' || calculation === 'recalculation') {
      
      const tempObj = await calculateAccountAncient({
        
        loginUsers_id,
        historiesArr,
        acquiredTitles_idsArr,
        ISO8601,
        
      });
      
      historiesArr = lodashGet(tempObj, ['historiesArr'], []);
      acquiredTitles_idsArr = lodashGet(tempObj, ['acquiredTitles_idsArr'], []);
      
    }
    
    
    
    
    // ---------------------------------------------
    //   account-count-day
    // ---------------------------------------------
    
    if (type === 'account-count-day' || calculation === 'recalculation') {
      
      const tempObj = await calculateAccountCountDay({
        
        loginUsers_id,
        historiesArr,
        acquiredTitles_idsArr,
        ISO8601,
        
      });
      
      historiesArr = lodashGet(tempObj, ['historiesArr'], []);
      acquiredTitles_idsArr = lodashGet(tempObj, ['acquiredTitles_idsArr'], []);
      
    }
    
    
    
    
    // ---------------------------------------------
    //   forum-count-post
    // ---------------------------------------------
    
    if (type === 'forum-count-post' || calculation === 'recalculation') {
      
      const tempObj = await calculateForumCountPost({
        
        calculation,
        loginUsers_id,
        historiesArr,
        acquiredTitles_idsArr,
        ISO8601,
        
      });
      
      historiesArr = lodashGet(tempObj, ['historiesArr'], []);
      acquiredTitles_idsArr = lodashGet(tempObj, ['acquiredTitles_idsArr'], []);
      
    }
    
    
    
    
    // ---------------------------------------------
    //   recruitment-count-post
    // ---------------------------------------------
    
    if (type === 'recruitment-count-post' || calculation === 'recalculation') {
      
      const tempObj = await calculateRecruitmentCountPost({
        
        calculation,
        loginUsers_id,
        historiesArr,
        acquiredTitles_idsArr,
        ISO8601,
        
      });
      
      historiesArr = lodashGet(tempObj, ['historiesArr'], []);
      acquiredTitles_idsArr = lodashGet(tempObj, ['acquiredTitles_idsArr'], []);
      
    }
    
    
    // ['', 'level-count', '', 'login-count', 'good-count-click', 'good-count-clicked', '', '', 'follow-count', 'followed-count', 'title-count', 'title-show', 'card-player-edit', 'card-player-upload-image-main', 'card-player-upload-image-thumbnail', 'user-page-upload-image-main', 'user-page-change-url', 'web-push-permission']
    
    
    // ---------------------------------------------
    //   follow-count
    // ---------------------------------------------
    
    if (type === 'follow-count' || calculation === 'recalculation') {
      
      const tempObj = await calculateFollowCount({
        
        calculation,
        loginUsers_id,
        historiesArr,
        acquiredTitles_idsArr,
        ISO8601,
        
      });
      
      historiesArr = lodashGet(tempObj, ['historiesArr'], []);
      acquiredTitles_idsArr = lodashGet(tempObj, ['acquiredTitles_idsArr'], []);
      
    }
    
    
    
    // ---------------------------------------------
    //   followed-count
    // ---------------------------------------------
    
    if (type === 'followed-count' || calculation === 'recalculation') {
      
      const tempObj = await calculateFollowedCount({
        
        calculation,
        loginUsers_id,
        historiesArr,
        acquiredTitles_idsArr,
        ISO8601,
        
      });
      
      historiesArr = lodashGet(tempObj, ['historiesArr'], []);
      acquiredTitles_idsArr = lodashGet(tempObj, ['acquiredTitles_idsArr'], []);
      
    }
    
    
    
    
    // ---------------------------------------------
    //   title-show
    // ---------------------------------------------
    
    // let titleShowObj = historiesArr.find((valueObj) => {
    //   return valueObj.type === 'title-show';
    // });
    
    // if (!titleShowObj) {
      
    //   titleShowObj = {
        
    //     _id: shortid.generate(),
    //     createdDate: ISO8601,
    //     updatedDate: ISO8601,
    //     type: 'title-show',
    //     countDay: 0,
    //     countMonth: 0,
    //     countYear: 0,
    //     countValid: 0,
    //     countTotal: 0,
        
    //   };
      
    // }
    
    
    // const selectedTitles_idsArr = lodashGet(docExperiencesObj, ['selectedTitles_idsArr'], []);
    
    // if (selectedTitles_idsArr.length > 0) {
      
    //   titleShowObj.updatedDate = ISO8601;
    //   titleShowObj.countValid = 1;
    //   titleShowObj.countTotal = 1;
      
    // }
    
    // // saveHistoriesArr.push(tempObj);
    
    
    // ---------------------------------------------
    //   login-count
    // ---------------------------------------------
    
    // const loginCountObj = historiesArr.find((valueObj) => {
    //   return valueObj.type === 'login-count';
    // });
    
    
    // // ---------------------------------------------
    // //   good-count-click
    // // ---------------------------------------------
    
    // const goodCountClickObj = historiesArr.find((valueObj) => {
    //   return valueObj.type === 'good-count-click';
    // });
    
    
    // // ---------------------------------------------
    // //   good-count-clicked
    // // ---------------------------------------------
    
    // const goodCountClickedObj = historiesArr.find((valueObj) => {
    //   return valueObj.type === 'good-count-clicked';
    // });
    
    
    
    
    let exp = 0;
    
    
    
    // --------------------------------------------------
    //   Condition Object
    // --------------------------------------------------
    
    const conditionObj = {
      
      _id: loginUsers_id
      
    };
    
    
    // --------------------------------------------------
    //   Save Object
    // --------------------------------------------------
    
    const newHistoriesArr = [];
    
    // if (accountAncientObj) {
    //   newHistoriesArr.push(accountAncientObj);
    // }
    
    // if (loginCountObj) {
    //   newHistoriesArr.push(loginCountObj);
    // }
    
    // if (accountCountDayObj) {
    //   newHistoriesArr.push(accountCountDayObj);
    // }
    
    // if (goodCountClickObj) {
    //   newHistoriesArr.push(goodCountClickObj);
    // }
    
    // if (goodCountClickedObj) {
    //   newHistoriesArr.push(goodCountClickedObj);
    // }
    
    // if (forumCountPostObj) {
    //   newHistoriesArr.push(forumCountPostObj);
    // }
    
    // if (recruitmentCountPostObj) {
    //   newHistoriesArr.push(recruitmentCountPostObj);
    // }
    
    // if (followCountObj) {
    //   newHistoriesArr.push(followCountObj);
    // }
    
    // if (followedCountObj) {
    //   newHistoriesArr.push(followedCountObj);
    // }
    
    // if (titleShowObj) {
    //   newHistoriesArr.push(titleShowObj);
    // }
    
    
    const saveObj = {
      
      $set: {
        
        updatedDate: ISO8601,
        exp,
        historiesArr,
        acquiredTitles_idsArr,
        
      }
      
    };
    
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    console.log(`
      ----------------------------------------\n
      /app/@modules/experience.js - experienceCalculate
    `);
    
    // console.log(chalk`
    //   forumCommentsCount: {green ${forumCommentsCount}}
    //   recruitmentThreadsCount: {green ${recruitmentThreadsCount}}
    //   recruitmentCommentsCount: {green ${recruitmentCommentsCount}}
    //   recruitmentRepliesCount: {green ${recruitmentRepliesCount}}
    //   followCount: {green ${followCount}}
    //   followedCount: {green ${followedCount}}
    //   exp: {green ${exp}}
    // `);
    
    // console.log(`
    //   ----- docFollowsObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(docFollowsObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- docUsersObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(docUsersObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- docExperiencesObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(docExperiencesObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    console.log(`
      ----- saveObj -----\n
      ${util.inspect(JSON.parse(JSON.stringify(saveObj)), { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    
    
  } catch (errorObj) {
    
    throw errorObj;
    
  }
  
  
};






// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  
  experienceCalculate,
  
};