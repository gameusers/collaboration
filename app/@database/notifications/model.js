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

const moment = require('moment');

const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');
const lodashHas = require('lodash/has');
const lodashCloneDeep = require('lodash/cloneDeep');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const SchemaNotifications = require('./schema');
// const SchemaUsers = require('../users/schema');

const ModelRecruitmentThreads = require('../recruitment-threads/model.js');
const ModelRecruitmentComments = require('../recruitment-comments/model.js');
const ModelRecruitmentReplies = require('../recruitment-replies/model.js');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { sendNotifications }  = require('../../@modules/web-push');






// --------------------------------------------------
//   Function
// --------------------------------------------------


/**
 * 検索してデータを取得する / 1件だけ
 * @param {Object} conditionObj - 検索条件
 * @return {Object} 取得データ
 */
const findOne = async ({ conditionObj }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Error
    // --------------------------------------------------
    
    if (!conditionObj || !Object.keys(conditionObj).length) {
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   FindOne
    // --------------------------------------------------
    
    return await SchemaNotifications.findOne(conditionObj).exec();
    
    
  } catch (err) {
    
    throw err;
    
  }
  
  
};




/**
 * 取得する
 * @param {Object} conditionObj - 検索条件
 * @return {Array} 取得データ
 */
const find = async ({ conditionObj }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Error
    // --------------------------------------------------
    
    if (!conditionObj || !Object.keys(conditionObj).length) {
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   Find
    // --------------------------------------------------
    
    return await SchemaNotifications.find(conditionObj).exec();
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * カウントを取得する
 * @param {Object} conditionObj - 検索条件
 * @return {number} カウント数
 */
const count = async ({ conditionObj }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Error
    // --------------------------------------------------
    
    if (!conditionObj || !Object.keys(conditionObj).length) {
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   Find
    // --------------------------------------------------
    
    return await SchemaNotifications.countDocuments(conditionObj).exec();
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 挿入 / 更新する
 * @param {Object} conditionObj - 検索条件
 * @param {Object} saveObj - 保存するデータ
 * @return {Array}
 */
const upsert = async ({ conditionObj, saveObj }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Error
    // --------------------------------------------------
    
    if (!conditionObj || !Object.keys(conditionObj).length) {
      throw new Error();
    }
    
    if (!saveObj || !Object.keys(saveObj).length) {
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   Upsert
    // --------------------------------------------------
    
    return await SchemaNotifications.findOneAndUpdate(conditionObj, saveObj, { upsert: true, new: true, setDefaultsOnInsert: true }).exec();
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 大量に挿入する
 * @param {Array} saveArr - 保存するデータ
 * @return {Array}
 */
const insertMany = async ({ saveArr }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Error
    // --------------------------------------------------
    
    if (!saveArr || !saveArr.length) {
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   insertMany
    // --------------------------------------------------
    
    return await SchemaNotifications.insertMany(saveArr);
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 削除する
 * @param {Object} conditionObj - 検索条件
 * @param {boolean} reset - trueでデータをすべて削除する
 * @return {Array} 
 */
const deleteMany = async ({ conditionObj, reset = false }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Error
    // --------------------------------------------------
    
    if (!reset && (!conditionObj || !Object.keys(conditionObj).length)) {
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   Delete
    // --------------------------------------------------
    
    return await SchemaNotifications.deleteMany(conditionObj);
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};






// --------------------------------------------------
//   find
// --------------------------------------------------

/**
 * 通知を送信する
 * @return {Array} 取得データ
 */
const send = async ({}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const notificationsArr = [];
    
    
    // --------------------------------------------------
    //   notificationsObj
    // --------------------------------------------------
    
    const notificationsObj = await findOne({
      
      conditionObj: {
        done: false,
      }
      
    });
    
    const arr = lodashGet(notificationsObj, ['arr'], []);
    const type = lodashGet(notificationsObj, ['type'], '');
    
    
    
    
    // --------------------------------------------------
    //   Recruitment
    // --------------------------------------------------
    
    if (type === 'recruitment-comments' || type === 'recruitment-replies') {
      
      
      let recruitmentThreadsObj = {};
      let recruitmentCommentsObj = {};
      let recruitmentRepliesObj = {};
      
      
      for (let valueObj of arr.values()) {
        
        
        // --------------------------------------------------
        //   recruitment-threads
        // --------------------------------------------------
        
        if (valueObj.db === 'recruitment-threads') {
          
          recruitmentThreadsObj = await ModelRecruitmentThreads.findForNotification({
            
            _id: valueObj._id
            
          });
          
          
        // --------------------------------------------------
        //   recruitment-comments
        // --------------------------------------------------
          
        } else if (valueObj.db === 'recruitment-comments') {
          
          recruitmentCommentsObj = await ModelRecruitmentComments.findForNotification({
            
            _id: valueObj._id
            
          });
          
          
        // --------------------------------------------------
        //   recruitment-replies
        // --------------------------------------------------
          
        } else if (valueObj.db === 'recruitment-replies') {
          
          recruitmentRepliesObj = await ModelRecruitmentReplies.findForNotification({
            
            _id: valueObj._id
            
          });
          
        }
        
        
      }
      
      
      
      console.log(`
        ----- recruitmentThreadsObj -----\n
        ${util.inspect(recruitmentThreadsObj, { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      console.log(`
        ----- recruitmentCommentsObj -----\n
        ${util.inspect(recruitmentCommentsObj, { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      console.log(`
        ----- recruitmentRepliesObj -----\n
        ${util.inspect(recruitmentRepliesObj, { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      
      
      
      // --------------------------------------------------
      //   body
      // --------------------------------------------------
      
      let body = recruitmentCommentsObj.comment;
      
      if (recruitmentRepliesObj.comment) {
        body = recruitmentRepliesObj.comment;
      }
      
      
      // --------------------------------------------------
      //   tag
      // --------------------------------------------------
      
      let tag = recruitmentCommentsObj._id;
      
      if (recruitmentRepliesObj._id) {
        tag = recruitmentRepliesObj._id;
      }
      
      
      // --------------------------------------------------
      //   url
      // --------------------------------------------------
      
      let url = `${process.env.NEXT_PUBLIC_URL_BASE}gc/${recruitmentThreadsObj.urlID}/rec/${recruitmentCommentsObj._id}`;
      
      if (recruitmentRepliesObj._id) {
        url = `${process.env.NEXT_PUBLIC_URL_BASE}gc/${recruitmentThreadsObj.urlID}/rec/${recruitmentRepliesObj._id}`;
      }
      
      
      // --------------------------------------------------
      //   notificationsArr
      // --------------------------------------------------
      
      notificationsArr.push({
        
        subscriptionObj: {
          endpoint: 'https://fcm.googleapis.com/fcm/send/fCVMofN4BLo:APA91bFShjo-hy02fDaVOpLDHQE_TaRRCPSG1IJIc_2qhndZuqkC67x4_RFbWp5uH4I11SKRdxpVquPQP59QNcomJw4irs0F-EWqOUu6ydVDMZ0Gau92YGmEV36SSO5a63vxUet7wEIo',
          keys: {
            p256dh: 'BLPT_K71Dk35Le_w0eyviBXXNRBsaZc-5o1-D0VKp18XW_N4wCPyzilZE-j0V-eJ4Cz5irqOZt0nePNG8zLDdaQ',
            auth: '0MuLywCY4rbTg5I2_nFEOQ'
          }
        },
        
        // subscriptionObj: {
        //   endpoint: 'https://fcm.googleapis.com/fcm/send/fStle9C5HJk:APA91bFMuBrN4DaT6QOVLhkXbaDJCTEM3q0hE8gM_FPqMqE7SgN6fkxylrFLfve3C8QA7O03Q-UWMXI2LQINSpCCveDrMV3FOpTfPfRhjabMbM43dsBVcKHJy4QcasADEW9KqA40Ea5y',
        //   keys: {
        //     p256dh: 'BCleeWTRP95hSeOXd3lTmcGInU2AFR4xEfy6W_kgzwd7IT_GMXzbhriEerFEFZDEXOQJNTGUFObhkol2P7qTMWw',
        //     auth: 'siDbUa9DCbg-n9AMsvWA1w'
        //   }
        // },
        
        // subscriptionObj: recruitmentThreadsObj.webPushSubscriptionObj,
        
        title: recruitmentThreadsObj.title,
        body,
        icon: recruitmentThreadsObj.icon,
        tag,
        url,
        TTL: 120,
        
      });
      
      // notificationsArr.push({
        
      //   subscriptionObj: recruitmentThreadsObj.webPushSubscriptionObj,
      //   title: recruitmentThreadsObj.title,
      //   body,
      //   icon: recruitmentThreadsObj.icon,
      //   tag,
      //   url,
      //   TTL: 120,
        
      // });
      
      
    }
    
    
    
    
    
    
    
    // --------------------------------------------------
    //   通知送信
    // --------------------------------------------------
    
    // const arr = [{
      
    //   subscriptionObj: webPushSubscriptionObj,
    //   title: 'Game Users',
    //   body: '通知を許可しました',
    //   icon: '/img/common/icons/icon-128x128.png',
    //   tag: 'web-push-subscription',
    //   url: '',
    //   TTL: 120,
      
    // }];
    
    notificationsArr.unshift({
      
      subscriptionObj: {
        endpoint: 'https://fcm.googleapis.com/fcm/send/fStle9C5HJk:APA91bFMuBrN4DaT6QOVLhkXbaDJCTEM3q0hE8gM_FPqMqE7SgN6fkxylrFLfve3C8QA7O03Q-UWMXI2LQINSpCCveDrMV3FOpTfPfRhjabMbM43dsBVcKHJy4QcasADEW9KqA40Ea5y',
        keys: {
          p256dh: 'BCleeWTRP95hSeOXd3lTmcGInU2AFR4xEfy6W_kgzwd7IT_GMXzbhriEerFEFZDEXOQJNTGUFObhkol2P7qTMWw',
          auth: 'siDbUa9DCbg-n9AMsvWA1w'
        }
      },
      title: 'Game Users',
      body: 'Test',
      icon: '/img/common/icons/icon-128x128.png',
      tag: 'web-push-subscription',
      url: '',
      TTL: 120,
      
    });
    
    sendNotifications({ arr: notificationsArr });
    
    
    console.log(`
      ----- notificationsObj -----\n
      ${util.inspect(notificationsObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    console.log(`
      ----- notificationsArr -----\n
      ${util.inspect(notificationsArr, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    
    
    // --------------------------------------------------
    //   Match Condition Array
    // --------------------------------------------------
    
    // let matchConditionArr = [];
    
    // matchConditionArr = [
    //   {
    //     $match: { gameCommunities_id }
    //   },
    // ];
    
    
    // // ---------------------------------------------
    // //   - コメント更新時
    // // ---------------------------------------------
    
    // if (recruitmentThreads_idsArr.length > 0) {
      
    //   matchConditionArr = [
    //     {
    //       $match: {
    //         $and:
    //           [
    //             { gameCommunities_id },
    //             { _id: { $in: recruitmentThreads_idsArr } }
    //           ]
    //       }
    //     },
    //   ];
      
    // }
    
    
    
    
    // // --------------------------------------------------
    // //   Aggregate
    // // --------------------------------------------------
    
    // const docArr = await aggregate({
      
    //   req,
    //   localeObj,
    //   loginUsers_id,
    //   matchConditionArr,
    //   threadPage,
    //   threadLimit,
      
    // });
    
    
    
    
    // // --------------------------------------------------
    // //   Format
    // // --------------------------------------------------
    
    // const formattedThreadsObj = formatRecruitmentThreadsArr({
      
    //   req,
    //   localeObj,
    //   loginUsers_id,
    //   arr: docArr,
    //   threadPage,
    //   // threadCount,
      
    // });
    
    // const recruitmentThreadsObj = lodashGet(formattedThreadsObj, ['recruitmentThreadsObj'], {});
    // // const recruitmentThreads_idsArr = lodashGet(formattedThreadsObj, ['recruitmentThreads_idsArr'], []);
    
    
    
    
    // // --------------------------------------------------
    // //   DB find / Comments & Replies
    // // --------------------------------------------------
    
    // const formattedCommentsAndRepliesObj = await ModelRecruitmentComments.findCommentsAndReplies({
      
    //   req,
    //   localeObj,
    //   loginUsers_id,
    //   recruitmentThreads_idsArr: lodashGet(formattedThreadsObj, ['recruitmentThreads_idsArr'], []),
    //   recruitmentThreadsObj,
    //   commentPage,
    //   commentLimit: intCommentLimit,
    //   replyPage,
    //   replyLimit: intReplyLimit,
      
    // });
    
    // const recruitmentCommentsObj = lodashGet(formattedCommentsAndRepliesObj, ['recruitmentCommentsObj'], {});
    // const recruitmentRepliesObj = lodashGet(formattedCommentsAndRepliesObj, ['recruitmentRepliesObj'], {});
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/recruitment-threads/model.js - findRecruitments
    // `);
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   threadPage: {green ${threadPage}}
    //   threadLimit: {green ${threadLimit}}
    //   commentPage: {green ${commentPage}}
    //   commentLimit: {green ${commentLimit}}
    //   replyPage: {green ${replyPage}}
    //   replyLimit: {green ${replyLimit}}
    // `);
    
    // console.log(`
    //   ----- docArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(docArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- recruitmentThreadsObj -----\n
    //   ${util.inspect(recruitmentThreadsObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- recruitmentCommentsObj -----\n
    //   ${util.inspect(recruitmentCommentsObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- recruitmentRepliesObj -----\n
    //   ${util.inspect(recruitmentRepliesObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    // return {
      
    //   recruitmentThreadsObj,
    //   recruitmentCommentsObj,
    //   recruitmentRepliesObj,
      
    // };
    
    
  } catch (err) {
    
    throw err;
    
  }
  
  
};






// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  
  findOne,
  find,
  count,
  upsert,
  insertMany,
  deleteMany,
  
  send,
  
};