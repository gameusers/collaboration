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




// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * DB から取得したデータをフォーマットする
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {Array} arr - 配列
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
  
  const recruitmentRepliesObj = {
    dataObj: {},
  };
  
  // const dataObj = {};
  // // const recruitmentThreads_idsForCommentArr = [];
  const ISO8601 = moment().utc().toISOString();
  
  
  
  
  // --------------------------------------------------
  //   Loop
  // --------------------------------------------------
  
  for (let valueObj of arr.values()) {
    
    
    // --------------------------------------------------
    //   Property Comment
    // --------------------------------------------------
    
    const recruitmentThreads_id = lodashGet(valueObj, ['recruitmentThreads_id'], '');
    
    const imagesAndVideosObj = lodashGet(valueObj, ['imagesAndVideosObj'], {});
    
    const publicSetting = lodashGet(valueObj, ['publicSetting'], 1);
    const publicCommentsUsers_idsArr = lodashGet(valueObj, ['publicCommentsUsers_idsArr'], []);
    const publicApprovalUsers_idsArrr = lodashGet(valueObj, ['publicApprovalUsers_idsArrr'], []);
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
    
    const deadlineDate = lodashGet(recruitmentThreadsObj, ['dataObj', recruitmentThreads_id, 'deadlineDate'], 0);
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    console.log(chalk`
      recruitmentThreads_id: {green ${recruitmentThreads_id}}
      deadlineDate: {green ${deadlineDate}}
    `);
    
    
    
    
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
    //   Format - IDと情報を公開する場合 true
    //   
    //   1. 誰にでも公開
    //   2. 返信者に公開（全員）
    //   3. 返信者に公開（選択）
    // --------------------------------------------------
    
    let publicIDsAndInformations = false;
    
    if (
      
      publicSetting === 1 ||
      (publicSetting === 2 && publicCommentsUsers_idsArr.includes(loginUsers_id)) ||
      (publicSetting === 3 && publicApprovalUsers_idsArrr.includes(loginUsers_id))
      
    ) {
      
      publicIDsAndInformations = true;
      
    }
    
    
    
    
    // --------------------------------------------------
    //   締め切りの場合、IDと情報を伏せ字にする
    // --------------------------------------------------
    
    if (deadlineDate) {
      
      // 指定日時の翌日に締め切られるように、1日追加する。これを追加しないと当日になった瞬間 0:00 に締め切られてしまうため。
      const deadlineDateAddOneDay = moment(deadlineDate).utc().add(1, 'day');
      
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
      
      clonedObj.title = lodashGet(filteredArr, [0, 'title'], '');
      clonedObj.name = lodashGet(filteredArr, [0, 'name'], '');
      clonedObj.comment = lodashGet(filteredArr, [0, 'comment'], '');
      
    } else {
      
      clonedObj.title = lodashGet(filteredArr, [0, 'title'], '');
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
    //   オブジェクトに追加 - dataObj用
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
    //   コメント取得用の _id の入った配列に push
    // --------------------------------------------------
    
    // dataObj[valueObj._id] = clonedObj;
    
    // if (valueObj.comments > 0) {
    //   recruitmentThreads_idsForCommentArr.push(valueObj._id);
    // }
    
    
    // // --------------------------------------------------
    // //   forumThreadsObj を作成する
    // // --------------------------------------------------
    
    // const recruitmentThreadsPageArr = lodashGet(recruitmentCommentsObj, [`page${threadPage}Obj`, 'arr'], []);
    
    // recruitmentThreadsPageArr.push(valueObj._id);
    
    // recruitmentCommentsObj[`page${threadPage}Obj`] = {
      
    //   loadedDate: ISO8601,
    //   arr: recruitmentThreadsPageArr,
      
    // };
    
    
    
    
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
  //   console.log
  // --------------------------------------------------
  
  console.log(`
    ----------------------------------------\n
    /app/@database/recruitment-comments/format.js - formatRecruitmentCommentsAndRepliesArr
  `);
  
  // console.log(`
  //   ----- recruitmentThreadsObj -----\n
  //   ${util.inspect(recruitmentThreadsObj, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  console.log(`
    ----- recruitmentCommentsObj -----\n
    ${util.inspect(recruitmentCommentsObj, { colors: true, depth: null })}\n
    --------------------\n
  `);
  
  
  
  
  // --------------------------------------------------
  //   dataObj
  // --------------------------------------------------
  
  // recruitmentCommentsObj.dataObj = dataObj;
  
  
  // // --------------------------------------------------
  // //   Return
  // // --------------------------------------------------
  
  // return {
    
  //   recruitmentCommentsObj,
  //   recruitmentThreads_idsForCommentArr,
    
  // };
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  
  formatRecruitmentCommentsAndRepliesArr,
  
};