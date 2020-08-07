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
 * 計算する
 * 何度もデータベースにアクセスするので処理が重くなる
 */
const experienceCalculate = async ({ req, res, loginUsers_id }) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   ログインチェック
    // --------------------------------------------------
    
    if (!req.isAuthenticated()) {
      throw new Error();
    }
    
    
    // ['account-ancient', 'level-count', 'account-count-day', 'login-count', 'good-count-click', 'good-count-clicked', 'forum-count-post', 'recruitment-count-post', 'follow-count', 'followed-count', 'title-count', 'title-show', 'card-player-edit', 'card-player-upload-image-main', 'card-player-upload-image-thumbnail', 'user-page-upload-image-main', 'user-page-change-url', 'web-push-permission']
    
    // ['title-count', 'title-show', 'card-player-edit', 'card-player-upload-image-main', 'card-player-upload-image-thumbnail', 'user-page-upload-image-main', 'user-page-change-url', 'web-push-permission'], required: true },
    
    
    // ---------------------------------------------
    //   Property
    // ---------------------------------------------
    
    let achievementsObj = {};
    let exp = 0;
    let tempObj = {};
    const ISO8601 = moment().utc().toISOString();
    
    
    
    
    // ---------------------------------------------
    //   DB find / experiences
    // ---------------------------------------------
    
    const docExperiencesObj = await ModelExperiences.findOne({
      
      conditionObj: {
        users_id: loginUsers_id
      }
      
    });
    
    const historiesArr = lodashGet(docExperiencesObj , ['historiesArr'], []);
    
    
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
    
    const createdDate = lodashGet(docUsersObj , ['createdDate'], '');
    
    
    // ---------------------------------------------
    //   DB find / forum-comments
    // ---------------------------------------------
    
    const forumCommentsCount = await ModelForumComments.count({
      
      conditionObj: {
        users_id: loginUsers_id
      }
      
    });
    
    
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
    
    const followCount = lodashGet(docFollowsObj , ['followCount'], 0);
    const followedCount = lodashGet(docFollowsObj , ['followedCount'], 0);
    
    
    
    
    
    
    // ---------------------------------------------
    //   account-ancient
    // ---------------------------------------------
    
    let accountAncientObj = historiesArr.find((valueObj) => {
      return valueObj.type === 'account-ancient';
    });
    
    if (!accountAncientObj) {
      
      const datetimeCreated = moment(createdDate).utc();
      const datetimeVer1 = moment('2020-01-01T00:00:00.000Z').utc();// Ver.2の開始日時を入れる。それ以前にアカウントを作成している場合、account-ancientを追加する。
      
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
    
    
    // ['', 'level-count', '', 'login-count', 'good-count-click', 'good-count-clicked', 'forum-count-post', 'recruitment-count-post', 'follow-count', 'followed-count', 'title-count', 'title-show', 'card-player-edit', 'card-player-upload-image-main', 'card-player-upload-image-thumbnail', 'user-page-upload-image-main', 'user-page-change-url', 'web-push-permission']
    
    
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
    
    
    // const docAchievementsObj = await ModelAchievements.findOne({
      
    //   conditionObj: {
    //     type: 'account-count-day'
    //   }
      
    // });
    
    // const conditionsArr = lodashGet(docAchievementsObj , ['conditionsArr'], []);
    
    
    
    
    console.log(chalk`
      days: {green ${days}}
    `);
    
    
    // achievementsObj = await ModelAchievements.findOne({
      
    //   conditionObj: {
    //     type: 'account-count-day'
    //   }
      
    // });
    
    // exp += lodashGet(accountCountDayObj , ['exp'], 0) * lodashGet(accountAncientObj , ['countValid'], 0);
    
    // const deadlineDateAddOneDay = moment(threadDeadlineDate).utc().add(1, 'day');
    
    
    
    
    
    // ---------------------------------------------
    //   title-show
    // ---------------------------------------------
    
    tempObj = historiesArr.find((valueObj) => {
      return valueObj.type === 'title-show';
    });
    
    if (!tempObj) {
      
      tempObj = {
        
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
    
    
    const selectedTitles_idsArr = lodashGet(docExperiencesObj , ['selectedTitles_idsArr'], []);
    
    if (selectedTitles_idsArr.length > 0) {
      
      tempObj.updatedDate = ISO8601;
      tempObj.countValid = 1;
      tempObj.countTotal = 1;
      
    }
    
    // saveHistoriesArr.push(tempObj);
    
    
    
    
    
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
    
    if (accountCountDayObj) {
      newHistoriesArr.push(accountCountDayObj);
    }
    
    
    const saveObj = {
      
      $set: {
        
        updatedDate: ISO8601,
        historiesArr: newHistoriesArr,
        
      }
      
    };
    
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    console.log(`
      ----------------------------------------\n
      /app/@modules/experience.js - calculate
    `);
    
    console.log(chalk`
      forumCommentsCount: {green ${forumCommentsCount}}
      recruitmentThreadsCount: {green ${recruitmentThreadsCount}}
      recruitmentCommentsCount: {green ${recruitmentCommentsCount}}
      recruitmentRepliesCount: {green ${recruitmentRepliesCount}}
      followCount: {green ${followCount}}
      followedCount: {green ${followedCount}}
      exp: {green ${exp}}
    `);
    
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