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
* @param {number} threadPage - スレッドのページ数
* @param {number} threadCount - スレッドの総数
* @return {Array} フォーマット後のデータ
*/
const formatRecruitmentThreadsArr = ({
  
  req,
  localeObj,
  loginUsers_id,
  arr,
  threadPage,
  threadCount,
  
}) => {
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  const recruitmentThreadsObj = {
    
    page: threadPage,
    count: threadCount,
    dataObj: {},
    
  };
  
  const dataObj = {};
  const recruitmentThreads_idsForCommentArr = [];
  const ISO8601 = moment().utc().toISOString();
  
  
  
  
  // --------------------------------------------------
  //   Loop
  // --------------------------------------------------
  
  for (let valueObj of arr.values()) {
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- valueObj -----\n
    //   ${util.inspect(valueObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const imagesAndVideosObj = lodashGet(valueObj, ['imagesAndVideosObj'], {});
    
    const publicSetting = lodashGet(valueObj, ['publicSetting'], 1);
    const publicCommentsUsers_idsArr = lodashGet(valueObj, ['publicCommentsUsers_idsArr'], []);
    const publicApprovalUsers_idsArrr = lodashGet(valueObj, ['publicApprovalUsers_idsArrr'], []);
    const idsArr = lodashGet(valueObj, ['idsArr'], []);
    const publicIDsArr = lodashGet(valueObj, ['publicIDsArr'], []);
    const publicInformationsArr = lodashGet(valueObj, ['publicInformationsArr'], []);
    
    const hardwareIDsArr = lodashGet(valueObj, ['hardwareIDsArr'], []);
    const hardwaresArr = lodashGet(valueObj, ['hardwaresArr'], []);
    const imagesAndVideosThumbnailObj = lodashGet(valueObj, ['cardPlayersObj', 'imagesAndVideosThumbnailObj'], {});
    
    
    // --------------------------------------------------
    //   Deep Copy
    // --------------------------------------------------
    
    const clonedObj = lodashCloneDeep(valueObj);
    
    
    // --------------------------------------------------
    //   Datetime
    // --------------------------------------------------
    
    // clonedObj.updatedDate = moment(valueObj.updatedDate).utc().format('YYYY/MM/DD hh:mm');
    
    
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
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/ids/format.js - formatIDsArrForRecruitment
    // `);
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   publicSetting: {green ${publicSetting}}
    // `);
    
    // console.log(`
    //   ----- publicCommentsUsers_idsArr -----\n
    //   ${util.inspect(publicCommentsUsers_idsArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- publicApprovalUsers_idsArrr -----\n
    //   ${util.inspect(publicApprovalUsers_idsArrr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- returnArr -----\n
    //   ${util.inspect(returnArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
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
    //   hardwaresArr - 元の配列の順番通りに並べなおす
    // --------------------------------------------------
    
    const sortedHardwaresArr = [];
    
    for (let hardwareID of hardwareIDsArr) {
      
      const index = hardwaresArr.findIndex((value2Obj) => {
        return value2Obj.hardwareID === hardwareID;
      });
      
      if (index !== -1) {
        sortedHardwaresArr.push(hardwaresArr[index]);
      }
      
    }
    
    clonedObj.hardwaresArr = sortedHardwaresArr;
    
    
    
    
    // --------------------------------------------------
    //   不要な項目を削除する
    // --------------------------------------------------
    
    delete clonedObj._id;
    delete clonedObj.createdDate;
    delete clonedObj.users_id;
    delete clonedObj.anonymity;
    delete clonedObj.hardwareIDsArr;
    delete clonedObj.ids_idsArr;
    delete clonedObj.localesArr;
    delete clonedObj.close;
    delete clonedObj.webPushSubscriptionObj;
    delete clonedObj.ip;
    delete clonedObj.userAgent;
    delete clonedObj.__v;
    
    
    
    
    // --------------------------------------------------
    //   コメント取得用の _id の入った配列に push
    // --------------------------------------------------
    
    dataObj[valueObj._id] = clonedObj;
    
    if (valueObj.comments > 0) {
      recruitmentThreads_idsForCommentArr.push(valueObj._id);
    }
    
    
    // --------------------------------------------------
    //   forumThreadsObj を作成する
    // --------------------------------------------------
    
    const recruitmentThreadsPageArr = lodashGet(recruitmentThreadsObj, [`page${threadPage}Obj`, 'arr'], []);
    
    recruitmentThreadsPageArr.push(valueObj._id);
    
    recruitmentThreadsObj[`page${threadPage}Obj`] = {
      
      loadedDate: ISO8601,
      arr: recruitmentThreadsPageArr,
      
    };
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   dataObj
  // --------------------------------------------------
  
  recruitmentThreadsObj.dataObj = dataObj;
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return {
    
    recruitmentThreadsObj,
    recruitmentThreads_idsForCommentArr,
    
  };
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  
  formatRecruitmentThreadsArr,
  
};