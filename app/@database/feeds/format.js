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


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');
const lodashHas = require('lodash/has');
const lodashCloneDeep = require('lodash/cloneDeep');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyAuthority } = require('../../@modules/authority.js');


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { formatImagesAndVideosObj } = require('../images-and-videos/format.js');
const { formatRecruitmentRepliesArr } = require('../recruitment-replies/format.js');






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
const formatFeedsArr = ({
  
  // req,
  localeObj,
  // loginUsers_id,
  arr,
  // obj,
  page,
  limit,
  
}) => {
  

  // --------------------------------------------------
  //   Language & Country & Parse
  // --------------------------------------------------

  const language = lodashGet(localeObj, ['language'], '');
  const country = lodashGet(localeObj, ['country'], '');
  const intLimit = parseInt(limit, 10);


  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  const obj = {
    
    page,
    limit: intLimit,
    count: arr.length,
    dataObj: {},
    
  };
  
  const ISO8601 = moment().utc().toISOString();
  


  // --------------------------------------------------
  //   必要なデータを抽出するための番号
  // --------------------------------------------------

  const start = (page - 1) * intLimit;
  const end = start + intLimit;
  // const start = (2 - 1) * 2;
  // const end = start + 2;

  // console.log(chalk`
  //   start: {green ${start}}
  //   end: {green ${end}}
  // `);



  // ---------------------------------------------
  //   - Loop
  // ---------------------------------------------

  for (const [index, valueObj] of arr.entries()) {
  // for (let valueObj of forumsGcArr.values()) {
  
  
    // console.log(`
    //   ----- valueObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(valueObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // --------------------------------------------------
    //   実質的な page, limit の処理　必要のないデータは処理しない
    // --------------------------------------------------
    
    if (index < start) {

      // console.log('除外', index);
      continue;

    } else if (index >= end) {

      // console.log('最後', index);
      break;

    }

    // console.log('採用', index);
    

    
    // --------------------------------------------------
    //   Deep Copy
    // --------------------------------------------------
    
    const clonedObj = lodashCloneDeep(valueObj);


    // --------------------------------------------------
    //   Type
    // --------------------------------------------------
    
    // clonedObj.type = 'forumThreadGc';
    
    
    // --------------------------------------------------
    //   Datetime
    // --------------------------------------------------
    
    let datetimeCurrent = ISO8601;
    const datetimeUpdated = moment(valueObj.createdDate);
    
    if (datetimeUpdated.isAfter(datetimeCurrent)) {
      datetimeCurrent = datetimeUpdated;
    }
    
    clonedObj.datetimeFrom = datetimeUpdated.from(datetimeCurrent);
    
    
    // --------------------------------------------------
    //   画像と動画の処理 - メイン画像
    // --------------------------------------------------
    
    const formattedObj = formatImagesAndVideosObj({ localeObj, obj: valueObj.imagesAndVideosObj, maxWidth: 800 });
    
    if (formattedObj) {
      
      clonedObj.imagesAndVideosObj = formattedObj;
      
    } else {
      
      delete clonedObj.imagesAndVideosObj;
      
    }


    // --------------------------------------------------
    //   画像と動画の処理 - ゲーム / メイン画像
    // --------------------------------------------------
    
    const gamesImagesAndVideosObj = formatImagesAndVideosObj({ localeObj, obj: lodashGet(valueObj, ['gamesObj', 'imagesAndVideosObj'], {}), maxWidth: 800 });

    if (gamesImagesAndVideosObj) {

      // 画像をランダムに抽出
      const gamesImagesAndVideosArr = lodashGet(gamesImagesAndVideosObj, ['arr'], []);
      gamesImagesAndVideosObj.arr = [gamesImagesAndVideosArr[Math.floor(Math.random() * gamesImagesAndVideosArr.length)]];

      // console.log(`
      //   ----- gamesImagesAndVideosObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(gamesImagesAndVideosObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);

      lodashSet(clonedObj, ['gamesObj', 'imagesAndVideosObj'], gamesImagesAndVideosObj);
      
    } else {
      
      delete clonedObj.gamesObj.imagesAndVideosObj;
      
    }


    // --------------------------------------------------
    //   画像と動画の処理 - ゲーム / サムネイル画像
    // --------------------------------------------------
    
    const gamesImagesAndVideosThumbnailObj = formatImagesAndVideosObj({ localeObj, obj: lodashGet(valueObj, ['gamesObj', 'imagesAndVideosThumbnailObj'], {}) });

    if (gamesImagesAndVideosThumbnailObj) {
      
      lodashSet(clonedObj, ['gamesObj', 'imagesAndVideosThumbnailObj'], gamesImagesAndVideosThumbnailObj);
      
    } else {
      
      delete clonedObj.gamesObj.imagesAndVideosThumbnailObj;
      
    }
    
    

    
    // --------------------------------------------------
    //   Name & Description
    // --------------------------------------------------
    
    let localesArr = lodashGet(valueObj, ['localesArr'], []);

    let filteredArr = localesArr.filter((filterObj) => {
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
    //   Comments & Replies
    // --------------------------------------------------

    let comments = lodashGet(valueObj, ['comments'], 0);
    let replies = lodashGet(valueObj, ['replies'], 0);

    clonedObj.commentsAndReplies = comments + replies;
    



    

    // let threadsObj = lodashGet(valueObj, ['forumThreadsObj'], {});

    // if (lodashHas(valueObj, ['recruitmentThreadsObj'])) {
    //   threadsObj = lodashGet(valueObj, ['recruitmentThreadsObj'], {});
    // }


    // --------------------------------------------------
    //   フォーラム / コメント、返信の場合
    // --------------------------------------------------

    if (lodashHas(valueObj, ['forumThreadsObj', 'localesArr'])) {
      

      // --------------------------------------------------
      //   name にスレッドの名前を入れる
      // --------------------------------------------------

      localesArr = lodashGet(valueObj, ['forumThreadsObj', 'localesArr'], []);

      filteredArr = localesArr.filter((filterObj) => {
        return filterObj.language === localeObj.language;
      });

      if (lodashHas(filteredArr, [0])) {
      
        clonedObj.name = lodashGet(filteredArr, [0, 'name'], '');
        
      } else {
        
        clonedObj.name = lodashGet(localesArr, [0, 'name'], '');
        
      }


      // --------------------------------------------------
      //   Comments & Replies
      // --------------------------------------------------
      
      comments = lodashGet(valueObj, ['forumThreadsObj', 'comments'], 0);
      replies = lodashGet(valueObj, ['forumThreadsObj', 'replies'], 0);

      clonedObj.commentsAndReplies = comments + replies;


    }




    // --------------------------------------------------
    //   募集 / コメント、返信の場合
    // --------------------------------------------------

    if (lodashHas(valueObj, ['recruitmentThreadsObj', 'localesArr'])) {
      

      // --------------------------------------------------
      //   name にスレッドの名前を入れる
      // --------------------------------------------------

      localesArr = lodashGet(valueObj, ['recruitmentThreadsObj', 'localesArr'], []);

      filteredArr = localesArr.filter((filterObj) => {
        return filterObj.language === localeObj.language;
      });

      if (lodashHas(filteredArr, [0])) {
      
        clonedObj.name = lodashGet(filteredArr, [0, 'title'], '');
        
      } else {
        
        clonedObj.name = lodashGet(localesArr, [0, 'title'], '');
        
      }


      // --------------------------------------------------
      //   Comments & Replies
      // --------------------------------------------------
      
      comments = lodashGet(valueObj, ['recruitmentThreadsObj', 'comments'], 0);
      replies = lodashGet(valueObj, ['recruitmentThreadsObj', 'replies'], 0);

      clonedObj.commentsAndReplies = comments + replies;


    }




    // --------------------------------------------------
    //   改行コードを削除
    // --------------------------------------------------

    clonedObj.comment = clonedObj.comment.replace(/\r?\n/g, '');


    // --------------------------------------------------
    //   余分な文字をカット
    // --------------------------------------------------

    if (clonedObj.comment.length > 120) {
      clonedObj.comment = clonedObj.comment.substr(0, 119) + '…';
    }


    
    
    // --------------------------------------------------
    //   不要な項目を削除する
    // --------------------------------------------------
    
    // delete clonedObj._id;
    delete clonedObj.createdDate;
    delete clonedObj.localesArr;
    delete clonedObj.comments;
    delete clonedObj.replies;
    delete clonedObj.forumThreadsObj;
    
    


    // --------------------------------------------------
    //   Data Push
    // --------------------------------------------------
    
    lodashSet(obj, ['dataObj', valueObj._id], clonedObj);
    
    
    // --------------------------------------------------
    //   Pages Array
    // --------------------------------------------------
    
    const pagesArr = lodashGet(obj, [`page${page}Obj`, 'arr'], []);
    pagesArr.push(valueObj._id);
    
    obj[`page${page}Obj`] = {
      
      loadedDate: ISO8601,
      arr: pagesArr,
      
    };
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   app/@database/feeds/format.js - formatFeedsArr
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
  
  return obj;
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  
  formatFeedsArr,
  
};