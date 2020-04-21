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
// const lodashSet = require('lodash/set');
const lodashHas = require('lodash/has');
const lodashCloneDeep = require('lodash/cloneDeep');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

// const { CustomError } = require('../../@modules/error/custom');
const { verifyAuthority } = require('../../@modules/authority');


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { formatImagesAndVideosObj } = require('../images-and-videos/format');
const { formatRecruitmentRepliesArr } = require('../recruitment-replies/format');




// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * DB から取得したデータをフォーマットする
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {Array} arr - 配列
 * @param {Object} recruitmentThreadsObj - スレッドのデータ / コメントの総数と締切日を取得するために利用
 * @param {number} commentPage - コメントのページ
 * @param {number} replyPage - 返信のページ
 * @return {Array} フォーマット後のデータ
 */
const formatRecruitmentCommentsAndRepliesArr = ({
  
  req,
  localeObj,
  loginUsers_id,
  arr,
  recruitmentThreadsObj,
  commentPage,
  replyPage,
  
}) => {
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  const recruitmentCommentsObj = {
    dataObj: {},
  };
  
  // const recruitmentRepliesObj = {
  //   dataObj: {},
  // };
  
  
  
  
  // --------------------------------------------------
  //   コメントと返信に分離
  // --------------------------------------------------
  
  const commentsArr = [];
  let repliesArr = [];
  
  
  for (let valueObj of arr.values()) {
   
    if (lodashHas(valueObj, ['recruitmentRepliesArr'])) {
      
      const tempArr = lodashGet(valueObj, ['recruitmentRepliesArr'], []);
      repliesArr = repliesArr.concat(tempArr);
      
    }
    
    delete valueObj.recruitmentRepliesArr;
    
    commentsArr.push(valueObj);
    
  }
  
  
  
  
  // --------------------------------------------------
  //   Datetime
  // --------------------------------------------------
  
  const ISO8601 = moment().utc().toISOString();
  
  
  
  
  // --------------------------------------------------
  //   Loop - Comment
  // --------------------------------------------------
  
  for (let valueObj of commentsArr.values()) {
    
    
    // --------------------------------------------------
    //   Property Comment
    // --------------------------------------------------
    
    const recruitmentThreads_id = lodashGet(valueObj, ['recruitmentThreads_id'], '');
    
    const imagesAndVideosObj = lodashGet(valueObj, ['imagesAndVideosObj'], {});
    
    const publicSetting = lodashGet(valueObj, ['publicSetting'], 1);
    const idsArr = lodashGet(valueObj, ['idsArr'], []);
    const publicIDsArr = lodashGet(valueObj, ['publicIDsArr'], []);
    const publicInformationsArr = lodashGet(valueObj, ['publicInformationsArr'], []);
    
    const imagesAndVideosThumbnailObj = lodashGet(valueObj, ['cardPlayersObj', 'imagesAndVideosThumbnailObj'], {});
    
    const users_id = lodashGet(valueObj, ['users_id'], '');
    const webPush = lodashGet(valueObj, ['webPush'], false);
    const webPushEndpoint = lodashGet(valueObj, ['webPushSubscriptionObj', 'endpoint'], '');
    const webPushUsersEndpoint = lodashGet(valueObj, ['usersObj', 'webPushSubscriptionObj', 'endpoint'], '');
    
    
    // --------------------------------------------------
    //   Property Thread
    // --------------------------------------------------
    
    const threadUsers_id = lodashGet(recruitmentThreadsObj, ['dataObj', recruitmentThreads_id, 'users_id'], '');
    const threadDeadlineDate = lodashGet(recruitmentThreadsObj, ['dataObj', recruitmentThreads_id, 'deadlineDate'], 0);
    const threadPublicSetting = lodashGet(recruitmentThreadsObj, ['dataObj', recruitmentThreads_id, 'publicSetting'], 1);
    const threadPublicCommentsUsers_idsArr = lodashGet(recruitmentThreadsObj, ['dataObj', recruitmentThreads_id, 'publicCommentsUsers_idsArr'], []);
    const threadPublicApprovalUsers_idsArrr = lodashGet(recruitmentThreadsObj, ['dataObj', recruitmentThreads_id, 'publicApprovalUsers_idsArrr'], []);
    
    
    
    
    // --------------------------------------------------
    //   Deep Copy
    // --------------------------------------------------
    
    const clonedObj = lodashCloneDeep(valueObj);
    
    
    
    
    // --------------------------------------------------
    //   Format - 画像
    // --------------------------------------------------
    
    const formattedObj = formatImagesAndVideosObj({ localeObj, obj: imagesAndVideosObj });
    
    if (formattedObj) {
      
      clonedObj.imagesAndVideosObj = formattedObj;
      
    } else {
      
      delete clonedObj.imagesAndVideosObj;
      
    }
    
    
    // --------------------------------------------------
    //   Format - cardPlayersObj サムネイル画像
    // --------------------------------------------------
    
    const formattedThumbnailObj = formatImagesAndVideosObj({ localeObj, obj: imagesAndVideosThumbnailObj });
    
    if (formattedThumbnailObj) {
      
      clonedObj.cardPlayersObj.imagesAndVideosThumbnailObj = formattedThumbnailObj;
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- recruitmentThreadsObj -----\n
    //   ${util.inspect(recruitmentThreadsObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   threadUsers_id: {green ${threadUsers_id}}
    //   threadDeadlineDate: {green ${threadDeadlineDate}}
    //   threadPublicSetting: {green ${threadPublicSetting}}
    // `);
    
    // console.log(`
    //   ----- threadPublicCommentsUsers_idsArr -----\n
    //   ${util.inspect(threadPublicCommentsUsers_idsArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- threadPublicApprovalUsers_idsArrr -----\n
    //   ${util.inspect(threadPublicApprovalUsers_idsArrr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Format - IDと情報を公開する場合 true
    //   
    //   1. 誰にでも公開
    //   2. 募集者だけに公開
    //   3. 募集者が自分に公開した場合
    // --------------------------------------------------
    
    let publicIDsAndInformations = false;
    
    if (
      
      publicSetting === 1 ||
      (publicSetting === 2 && loginUsers_id === threadUsers_id) ||
      (publicSetting === 3 && threadPublicApprovalUsers_idsArrr.includes(users_id))
      
    ) {
      
      publicIDsAndInformations = true;
      
    }
    
    
    
    
    // --------------------------------------------------
    //   締め切りの場合、IDと情報を伏せ字にする
    // --------------------------------------------------
    
    if (threadDeadlineDate) {
      
      // 指定日時の翌日に締め切られるように、1日追加する。これを追加しないと当日になった瞬間 0:00 に締め切られてしまうため。
      const deadlineDateAddOneDay = moment(threadDeadlineDate).utc().add(1, 'day');
      
      // 現在の日時と締切日時の差をミリ秒で取得
      const diff = deadlineDateAddOneDay.diff(moment());
      
      // duration オブジェクトを生成
      const duration = moment.duration(diff);
      
      // 締め切りまでの日数を取得（小数点切り捨て）
      const days = Math.floor(duration.asDays());
      
      if (days < 0) {
        
        publicIDsAndInformations = false;
        
      }
      
      // console.log(chalk`
      //   days: {green ${days}}
      // `);
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Format - IDs
    // --------------------------------------------------
    
    clonedObj.idsArr = [];
    
    
    for (let value2Obj of idsArr.values()) {
      
      
      const tempObj = {
        
        _id: value2Obj._id,
        platform: value2Obj.platform,
        label: value2Obj.label,
        id: value2Obj.id
        
      };
      
      
      // --------------------------------------------------
      //   ゲーム情報がある場合
      // --------------------------------------------------
      
      if ('gamesObj' in value2Obj) {
        
        tempObj.gamesObj = value2Obj.gamesObj;
        
        
        // --------------------------------------------------
        //   Format - サムネイル画像
        // --------------------------------------------------
        
        const imagesAndVideosThumbnailObj = formatImagesAndVideosObj({ localeObj, obj: value2Obj.gamesObj.imagesAndVideosThumbnailObj });
        
        if (imagesAndVideosThumbnailObj) {
          tempObj.gamesObj.imagesAndVideosThumbnailObj = imagesAndVideosThumbnailObj;
        }
        
      }
      
      
      // --------------------------------------------------
      //   伏せ字にする
      // --------------------------------------------------
      
      if (!publicIDsAndInformations) {
        tempObj.id = '*****';
      }
      
      
      // --------------------------------------------------
      //   array.push
      // --------------------------------------------------
      
      clonedObj.idsArr.push(tempObj);
      
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Format - publicIDsArr
    // --------------------------------------------------
    
    clonedObj.publicIDsArr = [];
    
    
    for (let value2Obj of publicIDsArr.values()) {
      
      
      // --------------------------------------------------
      //   伏せ字にする
      // --------------------------------------------------
      
      if (!publicIDsAndInformations) {
        value2Obj.id = '*****';
      }
      
      
      // --------------------------------------------------
      //   array.push
      // --------------------------------------------------
      
      clonedObj.publicIDsArr.push(value2Obj);
      
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Format - publicInformationsArr
    // --------------------------------------------------
    
    clonedObj.publicInformationsArr = [];
    
    
    for (let value2Obj of publicInformationsArr.values()) {
      
      
      // --------------------------------------------------
      //   伏せ字にする
      // --------------------------------------------------
      
      if (!publicIDsAndInformations) {
        value2Obj.information = '*****';
      }
      
      
      // --------------------------------------------------
      //   array.push
      // --------------------------------------------------
      
      clonedObj.publicInformationsArr.push(value2Obj);
      
      
    }
    
    
    
    
    // --------------------------------------------------
    //   編集権限
    // --------------------------------------------------
    
    clonedObj.editable = verifyAuthority({
      
      req,
      users_id: valueObj.users_id,
      loginUsers_id,
      ISO8601: valueObj.createdDate,
      _id: valueObj._id,
      
    });
    
    
    
    
    // --------------------------------------------------
    //   Name & Description
    // --------------------------------------------------
    
    const filteredArr = valueObj.localesArr.filter((filterObj) => {
      return filterObj.language === localeObj.language;
    });
    
    
    if (lodashHas(filteredArr, [0])) {
      
      clonedObj.name = lodashGet(filteredArr, [0, 'name'], '');
      clonedObj.comment = lodashGet(filteredArr, [0, 'comment'], '');
      
    } else {
      
      clonedObj.name = lodashGet(valueObj, ['localesArr', 0, 'name'], '');
      clonedObj.comment = lodashGet(valueObj, ['localesArr', 0, 'comment'], '');
      
    }
    
    
    
    
    // --------------------------------------------------
    //   通知
    // --------------------------------------------------
    
    if ((webPush && webPushEndpoint) || (webPush && users_id && webPushUsersEndpoint)) {
      
      clonedObj.notification = 'webpush';
      
    }
    
    
    
    
    // --------------------------------------------------
    //   不要な項目を削除する
    // --------------------------------------------------
    
    delete clonedObj._id;
    delete clonedObj.createdDate;
    delete clonedObj.users_id;
    delete clonedObj.ids_idsArr;
    delete clonedObj.localesArr;
    delete clonedObj.webPushSubscriptionObj;
    delete clonedObj.ip;
    delete clonedObj.userAgent;
    delete clonedObj.__v;
    
    if (lodashHas(clonedObj, ['usersObj', 'webPushSubscriptionObj'])) {
      delete clonedObj.usersObj.webPushSubscriptionObj;
    }
    
    
    
    
    // --------------------------------------------------
    //   オブジェクトに追加 - dataObj
    // --------------------------------------------------
    
    recruitmentCommentsObj.dataObj[valueObj._id] = clonedObj;
    
    
    
    
    // --------------------------------------------------
    //   recruitmentCommentsObj 作成
    // --------------------------------------------------
    
    const comments = lodashGet(recruitmentThreadsObj, ['dataObj', recruitmentThreads_id, 'comments'], 0);
    
    const recruitmentCommentsPageArr = lodashGet(recruitmentCommentsObj, [recruitmentThreads_id, `page${commentPage}Obj`, 'arr'], []);
    recruitmentCommentsPageArr.push(valueObj._id);
    
    recruitmentCommentsObj[recruitmentThreads_id] = {
      
      page: commentPage,
      count : comments,
      
    };
    
    recruitmentCommentsObj[recruitmentThreads_id][`page${commentPage}Obj`] = {
      
      loadedDate: ISO8601,
      arr: recruitmentCommentsPageArr,
      
    };
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/recruitment-comments/format.js - formatRecruitmentCommentsAndRepliesArr
    // `);
    
    // console.log(`
    //   ----- valueObj -----\n
    //   ${util.inspect(valueObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- clonedObj -----\n
    //   ${util.inspect(clonedObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   users_id: {green ${users_id}}
    //   webPush: {green ${webPush}}
    //   webPushEndpoint: {green ${webPushEndpoint}}
    //   webPushUsersEndpoint: {green ${webPushUsersEndpoint}}
    // `);
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   publicSetting: {green ${publicSetting}}
    // `);
    
    // console.log(`
    //   ----- returnArr -----\n
    //   ${util.inspect(returnArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   Format - Reply
  // --------------------------------------------------
  
  const recruitmentRepliesObj = formatRecruitmentRepliesArr({
    
    req,
    localeObj,
    loginUsers_id,
    recruitmentCommentsObj,
    arr: repliesArr,
    replyPage,
    ISO8601,
    
  });
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/@database/recruitment-comments/format.js - formatRecruitmentCommentsAndRepliesArr
  // `);
  
  // console.log(`
  //   ----- commentsArr -----\n
  //   ${util.inspect(commentsArr, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(`
  //   ----- repliesArr -----\n
  //   ${util.inspect(repliesArr, { colors: true, depth: null })}\n
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
  
  return {
    
    recruitmentCommentsObj,
    recruitmentRepliesObj,
    
  };
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  
  formatRecruitmentCommentsAndRepliesArr,
  
};