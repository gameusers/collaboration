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
 * フォーラム書き込み / forum-count-post
 * @param {string} calculation - [addition（加算）, subtraction（減算）, recalculation（再計算）]
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {Array} historiesArr - 現在の達成状況を計算するためのデータが入っている配列
 * @param {Object} historyObj - 現在の達成状況を計算するためのデータが入っているオブジェクト
 * @param {string} ISO8601 - 日時
 */
const calculateForumCountPost = async ({
  
  calculation,
  loginUsers_id,
  // historiesArr,
  historyObj,
  ISO8601,
  
}) => {
  
  
  try {
    
    
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
    
    // const achievementsExp = lodashGet(docAchievementsObj, ['exp'], 0);
    const conditionsArr = lodashGet(docAchievementsObj, ['conditionsArr'], []);
    
    
    // obj.countDay = 5;
    // obj.updatedDate = '2020-08-01T00:00:00.000Z';
    
    
    
    // ---------------------------------------------
    //   history
    // ---------------------------------------------
    
    // let obj = historiesArr.find((valueObj) => {
    //   return valueObj.type === 'forum-count-post';
    // });
    
    
    // ---------------------------------------------
    //   - Update
    // ---------------------------------------------
    
    let newHistoryObj = {};
    
    if (historyObj) {
      
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
    
    // console.log(`
    //   ----- historyObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(historyObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- newHistoryObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(newHistoryObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- currentObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(obj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
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
      
      const count = await ModelForumComments.count({
        
        conditionObj: {
          users_id: loginUsers_id
        }
        
      });
      
      newHistoryObj.countValid = count;
      
    }
    
    
    
    
    // ---------------------------------------------
    //   exp & acquiredTitles_idsArr
    // ---------------------------------------------
    
    const acquiredTitles_idsArr = [];
    
    for (let valueObj of conditionsArr.values()) {
      
      if (valueObj.count <= newHistoryObj.countValid) {
        acquiredTitles_idsArr.push(valueObj.titles_id);
      }
      
    }
    
    // const exp = achievementsExp * lodashGet(obj, ['countValid'], 0);
    
    
    
    
    // ---------------------------------------------
    //   console.log
    // ---------------------------------------------
    
    console.log(`
      ----------------------------------------\n
      /app/@modules/experience.js - forumCountPost
    `);
    
    console.log(`
      ----- newHistoryObj -----\n
      ${util.inspect(JSON.parse(JSON.stringify(newHistoryObj)), { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    console.log(`
      ----- acquiredTitles_idsArr -----\n
      ${util.inspect(JSON.parse(JSON.stringify(acquiredTitles_idsArr)), { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    // console.log(chalk`
    //   exp: {green ${exp}}
    // `);
    
    
    
    
    // ---------------------------------------------
    //   Return
    // ---------------------------------------------
    
    return {
      
      historyObj: newHistoryObj,
      acquiredTitles_idsArr,
      
    };
    
    
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
    
    let docAchievementsObj = {};
    // const acquiredTitles_idsArr = [];
    let exp = 0;
    // let tempObj = {};
    const ISO8601 = moment().utc().toISOString();
    
    
    
    
    // ---------------------------------------------
    //   DB find / experiences
    // ---------------------------------------------
    
    const docExperiencesObj = await ModelExperiences.findOne({
      
      conditionObj: {
        users_id: loginUsers_id
      }
      
    });
    
    const historiesArr = lodashGet(docExperiencesObj, ['historiesArr'], []);
    const acquiredTitles_idsArr = lodashGet(docExperiencesObj, ['acquiredTitles_idsArr'], []);
    
    // console.log(`
    //   ----- acquiredTitles_idsArr -----\n
    //   ${util.inspect(acquiredTitles_idsArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // ---------------------------------------------
    //   DB find / achievements
    // ---------------------------------------------
    
    // const docAchievementsObj = await ModelAchievements.findOne({
      
    //   conditionObj: {
    //     type: 'account-count-day'
    //   }
      
    // });
    
    
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
    //   DB find / forum-comments
    // ---------------------------------------------
    
    // const forumCommentsCount = await ModelForumComments.count({
      
    //   conditionObj: {
    //     users_id: loginUsers_id
    //   }
      
    // });
    
    
    // ---------------------------------------------
    //   DB find / recruitment-threads
    // ---------------------------------------------
    
    const recruitmentThreadsCount = await ModelRecruitmentThreads.count({
      
      conditionObj: {
        users_id: loginUsers_id
      }
      
    });
    
    
    // ---------------------------------------------
    //   DB find / recruitment-comments
    // ---------------------------------------------
    
    const recruitmentCommentsCount = await ModelRecruitmentComments.count({
      
      conditionObj: {
        users_id: loginUsers_id
      }
      
    });
    
    
    // ---------------------------------------------
    //   DB find / recruitment-replies
    // ---------------------------------------------
    
    const recruitmentRepliesCount = await ModelRecruitmentReplies.count({
      
      conditionObj: {
        users_id: loginUsers_id
      }
      
    });
    
    
    // ---------------------------------------------
    //   DB find / follows
    // ---------------------------------------------
    
    const docFollowsObj = await ModelFollows.findOne({
      
      conditionObj: {
        users_id: loginUsers_id
      }
      
    });
    
    const followCount = lodashGet(docFollowsObj, ['followCount'], 0);
    const followedCount = lodashGet(docFollowsObj, ['followedCount'], 0);
    
    
    
    
    
    
    // ---------------------------------------------
    //   account-ancient
    // ---------------------------------------------
    
    let accountAncientObj = historiesArr.find((valueObj) => {
      return valueObj.type === 'account-ancient';
    });
    
    if (!accountAncientObj) {
      
      const datetimeCreated = moment(createdDate).utc();
      const datetimeVer1 = moment(process.env.VER2_START_DATETIME).utc();// Ver.2の開始日時を入れる。それ以前にアカウントを作成している場合、account-ancientを追加する。
      
      // console.log(chalk`
      //   datetimeCreated: {green ${datetimeCreated}}
      //   datetimeVer1: {green ${datetimeVer1}}
      // `);
      
      if (datetimeCreated.isBefore(datetimeVer1)) {
        
        // console.log('isBefore');
        // saveHistoriesArr.push(accountAncientObj);
        
        accountAncientObj = {
          
          _id: shortid.generate(),
          createdDate: ISO8601,
          updatedDate: ISO8601,
          type: 'account-ancient',
          countDay: 0,
          countMonth: 0,
          countYear: 0,
          countValid: 1,
          countTotal: 1,
          
        };
        
      }
      
    }
    
    
    
    // ---------------------------------------------
    //   account-count-day
    // ---------------------------------------------
    
    let accountCountDayObj = historiesArr.find((valueObj) => {
      return valueObj.type === 'account-count-day';
    });
    
    if (!accountCountDayObj) {
      
      accountCountDayObj = {
        
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
    
    const datetimeCreated = moment(createdDate).utc();
    const datetimeCurrent = moment().utc();
    const days = datetimeCurrent.diff(datetimeCreated, 'days');
    
    accountCountDayObj.updatedDate = ISO8601;
    accountCountDayObj.countValid = days;
    accountCountDayObj.countTotal = days;
    
    
    // ---------------------------------------------
    //   - achievements & exp
    // ---------------------------------------------
    
    docAchievementsObj = await ModelAchievements.findOne({
      
      conditionObj: {
        type: 'account-count-day'
      }
      
    });
    
    const conditionsArr = lodashGet(docAchievementsObj, ['conditionsArr'], []);
    
    for (let valueObj of conditionsArr.values()) {
      
      if (valueObj.count <= accountCountDayObj.countValid) {
        acquiredTitles_idsArr.push(valueObj.titles_id);
      }
      
    }
    
    // exp += lodashGet(docAchievementsObj, ['exp'], 0) * lodashGet(accountCountDayObj, ['countValid'], 0);
    
    
    
    // console.log(chalk`
    //   days: {green ${days}}
    // `);
    
    
    // achievementsObj = await ModelAchievements.findOne({
      
    //   conditionObj: {
    //     type: 'account-count-day'
    //   }
      
    // });
    
    // exp += lodashGet(accountCountDayObj, ['exp'], 0) * lodashGet(accountAncientObj, ['countValid'], 0);
    
    // const deadlineDateAddOneDay = moment(threadDeadlineDate).utc().add(1, 'day');
    
    
    
    
    // ---------------------------------------------
    //   forum-count-post
    // ---------------------------------------------
    
    let forumCountPostHistoryObj = historiesArr.find((valueObj) => {
      return valueObj.type === 'forum-count-post';
    });
    
    if (type === 'forum-count-post' || calculation === 'recalculation') {
      
      const tempObj = await calculateForumCountPost({
        
        calculation,
        loginUsers_id,
        historyObj: forumCountPostHistoryObj,
        ISO8601,
        
      });
      
      forumCountPostHistoryObj = tempObj.historyObj;
      acquiredTitles_idsArr.concat(tempObj.acquiredTitles_idsArr);
      
    }
    
    
    
    
    // ---------------------------------------------
    //   recruitment-count-post
    // ---------------------------------------------
    
    let recruitmentCountPostObj = historiesArr.find((valueObj) => {
      return valueObj.type === 'recruitment-count-post';
    });
    
    const recruitmentCount = recruitmentThreadsCount + recruitmentCommentsCount + recruitmentRepliesCount;
    
    if (!recruitmentCountPostObj) {
      
      recruitmentCountPostObj = {
        
        _id: shortid.generate(),
        createdDate: ISO8601,
        updatedDate: ISO8601,
        type: 'recruitment-count-post',
        countDay: 0,
        countMonth: 0,
        countYear: 0,
        countValid: recruitmentCount,
        countTotal: recruitmentCount,
        
      };
      
    }
    
    recruitmentCountPostObj.updatedDate = ISO8601;
    recruitmentCountPostObj.countValid = recruitmentCount;
    
    
    // ['', 'level-count', '', '', '', '', '', '', '', '', 'title-count', 'title-show', 'card-player-edit', 'card-player-upload-image-main', 'card-player-upload-image-thumbnail', 'user-page-upload-image-main', 'user-page-change-url', 'web-push-permission']
    
    
    // ---------------------------------------------
    //   follow-count
    // ---------------------------------------------
    
    let followCountObj = historiesArr.find((valueObj) => {
      return valueObj.type === 'follow-count';
    });
    
    if (!followCountObj) {
      
      followCountObj = {
        
        _id: shortid.generate(),
        createdDate: ISO8601,
        updatedDate: ISO8601,
        type: 'follow-count',
        countDay: 0,
        countMonth: 0,
        countYear: 0,
        countValid: followCount,
        countTotal: followCount,
        
      };
      
    }
    
    followCountObj.updatedDate = ISO8601;
    followCountObj.countValid = followCount;
    
    
    
    
    // ---------------------------------------------
    //   followed-count
    // ---------------------------------------------
    
    let followedCountObj = historiesArr.find((valueObj) => {
      return valueObj.type === 'followed-count';
    });
    
    if (!followedCountObj) {
      
      followedCountObj = {
        
        _id: shortid.generate(),
        createdDate: ISO8601,
        updatedDate: ISO8601,
        type: 'followed-count',
        countDay: 0,
        countMonth: 0,
        countYear: 0,
        countValid: followedCount,
        countTotal: followedCount,
        
      };
      
    }
    
    followedCountObj.updatedDate = ISO8601;
    followedCountObj.countValid = followedCount;
    
    
    
    
    // ---------------------------------------------
    //   title-show
    // ---------------------------------------------
    
    let titleShowObj = historiesArr.find((valueObj) => {
      return valueObj.type === 'title-show';
    });
    
    if (!titleShowObj) {
      
      titleShowObj = {
        
        _id: shortid.generate(),
        createdDate: ISO8601,
        updatedDate: ISO8601,
        type: 'title-show',
        countDay: 0,
        countMonth: 0,
        countYear: 0,
        countValid: 0,
        countTotal: 0,
        
      };
      
    }
    
    
    const selectedTitles_idsArr = lodashGet(docExperiencesObj, ['selectedTitles_idsArr'], []);
    
    if (selectedTitles_idsArr.length > 0) {
      
      titleShowObj.updatedDate = ISO8601;
      titleShowObj.countValid = 1;
      titleShowObj.countTotal = 1;
      
    }
    
    // // saveHistoriesArr.push(tempObj);
    
    
    // ---------------------------------------------
    //   login-count
    // ---------------------------------------------
    
    const loginCountObj = historiesArr.find((valueObj) => {
      return valueObj.type === 'login-count';
    });
    
    
    // ---------------------------------------------
    //   good-count-click
    // ---------------------------------------------
    
    const goodCountClickObj = historiesArr.find((valueObj) => {
      return valueObj.type === 'good-count-click';
    });
    
    
    // ---------------------------------------------
    //   good-count-clicked
    // ---------------------------------------------
    
    const goodCountClickedObj = historiesArr.find((valueObj) => {
      return valueObj.type === 'good-count-clicked';
    });
    
    
    
    
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
    
    if (accountAncientObj) {
      newHistoriesArr.push(accountAncientObj);
    }
    
    if (loginCountObj) {
      newHistoriesArr.push(loginCountObj);
    }
    
    if (accountCountDayObj) {
      newHistoriesArr.push(accountCountDayObj);
    }
    
    if (goodCountClickObj) {
      newHistoriesArr.push(goodCountClickObj);
    }
    
    if (goodCountClickedObj) {
      newHistoriesArr.push(goodCountClickedObj);
    }
    
    // if (forumCountPostObj) {
    //   newHistoriesArr.push(forumCountPostObj);
    // }
    
    if (recruitmentCountPostObj) {
      newHistoriesArr.push(recruitmentCountPostObj);
    }
    
    if (followCountObj) {
      newHistoriesArr.push(followCountObj);
    }
    
    if (followedCountObj) {
      newHistoriesArr.push(followedCountObj);
    }
    
    if (titleShowObj) {
      newHistoriesArr.push(titleShowObj);
    }
    
    
    const saveObj = {
      
      $set: {
        
        updatedDate: ISO8601,
        exp,
        historiesArr: newHistoriesArr,
        acquiredTitles_idsArr,
        
      }
      
    };
    
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@modules/experience.js - calculate
    // `);
    
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
    
    
    
    // console.log(`
    //   ----- saveObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(saveObj)), { colors: true, depth: null })}\n
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
  
  experienceCalculate,
  
};