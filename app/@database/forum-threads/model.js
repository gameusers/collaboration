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

const SchemaForumThreads = require('./schema');
const SchemaImagesAndVideos = require('../images-and-videos/schema');
const SchemaUserCommunities = require('../user-communities/schema');

const ModelForumComments = require('../forum-comments/model');
const ModelUserCommunities = require('../user-communities/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { formatImagesAndVideosObj } = require('../../@modules/image/format');
const { CustomError } = require('../../@modules/error/custom');
const { verifyAuthority } = require('../../@modules/authority');


// ---------------------------------------------
//   Format
// ---------------------------------------------

// const { formatImagesAndVideosArr } = require('../../@format/image');




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
    //   FindOne
    // --------------------------------------------------
    
    return await SchemaForumThreads.findOne(conditionObj).exec();
    
    
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
    //   Find
    // --------------------------------------------------
    
    return await SchemaForumThreads.find(conditionObj).exec();
    
    
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
    //   Find
    // --------------------------------------------------
    
    return await SchemaForumThreads.countDocuments(conditionObj).exec();
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 挿入 / 更新する
 * @param {Object} argumentsObj - 引数
 * @return {Array} 
 */
const upsert = async ({ conditionObj, saveObj }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Upsert
    // --------------------------------------------------
    
    return await SchemaForumThreads.findOneAndUpdate(conditionObj, saveObj, { upsert: true, new: true, setDefaultsOnInsert: true }).exec();
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 挿入する
 * @param {Object} argumentsObj - 引数
 * @return {Array} 
 */
const insertMany = async ({ saveArr }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   insertMany
    // --------------------------------------------------
    
    return await SchemaForumThreads.insertMany(saveArr);
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 削除する
 * @param {Object} conditionObj - 検索条件
 * @return {Array} 
 */
const deleteMany = async ({ conditionObj }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Delete
    // --------------------------------------------------
    
    return await SchemaForumThreads.deleteMany(conditionObj);
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};






// --------------------------------------------------
//   スレッド一覧
// --------------------------------------------------

/**
 * スレッド一覧を取得する
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
 * @param {number} page - ページ
 * @param {number} limit - 1ページに表示する件数
 * @return {Array} 取得データ
 */
const findForThreadsList = async ({
  
  localeObj,
  loginUsers_id,
  userCommunities_id,
  page = 1,
  limit = process.env.FORUM_THREAD_LIST_LIMIT
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Condition
    // --------------------------------------------------
    
    const conditionObj = {
      userCommunities_id,
    };
    
    
    // --------------------------------------------------
    //   Find
    // --------------------------------------------------
    
    const intLimit = parseInt(limit, 10);
    
    const resultArr = await SchemaForumThreads.find(conditionObj).sort({ updatedDate: -1 }).skip((page - 1) * limit).limit(intLimit).exec();
    
    
    
    
    // --------------------------------------------------
    //   Format
    // --------------------------------------------------
    
    const dataObj = {};
    const arr = [];
    
    
    for (let valueObj of resultArr.values()) {
      
      
      // --------------------------------------------------
      //   Deep Copy
      // --------------------------------------------------
      
      let clonedObj = lodashCloneDeep(valueObj.toJSON());
      
      
      // --------------------------------------------------
      //   Datetime
      // --------------------------------------------------
      
      clonedObj.updatedDate = moment(valueObj.updatedDate).format('YYYY/MM/DD hh:mm');
      
      
      // --------------------------------------------------
      //   Locale
      // --------------------------------------------------
      
      const filteredArr = valueObj.localesArr.filter((filterObj) => {
        return filterObj.language === localeObj.language;
      });
      
      
      if (lodashHas(filteredArr, [0])) {
        
        clonedObj.name = lodashGet(filteredArr, [0, 'name'], '');
        
      } else {
        
        clonedObj.name = lodashGet(valueObj, ['localesArr', 0, 'name'], '');
        
      }
      
      
      // --------------------------------------------------
      //   不要な項目を削除する
      // --------------------------------------------------
      
      delete clonedObj.createdDate;
      delete clonedObj.users_id;
      delete clonedObj.localesArr;
      delete clonedObj.imagesAndVideos_id;
      delete clonedObj.ip;
      delete clonedObj.userAgent;
      delete clonedObj.__v;
      
      // console.log(`\n---------- clonedObj ----------\n`);
      // console.dir(clonedObj);
      // console.log(`\n-----------------------------------\n`);
      
      
      // --------------------------------------------------
      //   push
      // --------------------------------------------------
      
      dataObj[valueObj._id] = clonedObj;
      arr.push(valueObj._id);
      
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Get Count
    // --------------------------------------------------
    
    const userCommunityArr = await ModelUserCommunities.find({
      conditionObj: {
        _id: userCommunities_id
      }
    });
    
    
    // --------------------------------------------------
    //   Return Object
    // --------------------------------------------------
    
    const ISO8601 = moment().toISOString();
    
    const returnObj = {
      count: lodashGet(userCommunityArr, [0, 'forumObj', 'threadCount'], 0),
      page,
      limit: intLimit,
    };
    
    lodashSet(returnObj, ['dataObj'], dataObj);
    
    lodashSet(returnObj, [`page${page}Obj`, 'loadedDate'], ISO8601);
    lodashSet(returnObj, [`page${page}Obj`, 'arr'], arr);
    
    // lodashSet(returnObj, ['dataObj', `page${page}Obj`, 'loadedDate'], ISO8601);
    // lodashSet(returnObj, ['dataObj', `page${page}Obj`, 'arr'], arr);
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   /app/@database/forum-threads/model.js - findForThreadsList
      
    //   loginUsers_id: {green ${loginUsers_id}}
    //   userCommunities_id: {green ${userCommunities_id}}
    //   page: {green ${page}}
    //   limit: {green ${limit}}
    // `);
    
    // console.log(`
    //   ----- resultArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(resultArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- dataObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(dataObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- arr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(returnObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return returnObj;
    
    
  } catch (err) {
    
    throw err;
    
  }
  
  
};






// --------------------------------------------------
//   スレッド
// --------------------------------------------------

/**
 * スレッドを取得する - userCommunities_id で検索
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティID
 * @param {number} threadPage - スレッドのページ
 * @param {number} threadLimit - スレッドのリミット
 * @param {number} commentPage - コメントのページ
 * @param {number} commentLimit - コメントのリミット
 * @param {number} replyPage - 返信のページ
 * @param {number} replyLimit - 返信のリミット
 * @return {Array} 取得データ
 */
const findForForum = async ({
  
  req,
  localeObj,
  loginUsers_id,
  userCommunities_id,
  forumThreads_idArr = [],
  threadPage = 1,
  threadLimit = process.env.FORUM_THREAD_LIMIT,
  commentPage = 1,
  commentLimit = process.env.FORUM_COMMENT_LIMIT,
  replyPage = 1,
  replyLimit = process.env.FORUM_REPLY_LIMIT,
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Parse
    // --------------------------------------------------
    
    const intThreadLimit = parseInt(threadLimit, 10);
    const intCommentLimit = parseInt(commentLimit, 10);
    const intReplyLimit = parseInt(replyLimit, 10);
    
    
    // --------------------------------------------------
    //   Match Condition Array
    // --------------------------------------------------
    
    let matchConditionArr = [
      {
        $match : { userCommunities_id }
      },
    ];
    
    if (forumThreads_idArr.length > 0) {
      
      matchConditionArr = [
        {
          $match: {
            $and: [
              { _id: { $in: forumThreads_idArr } },
              { userCommunities_id },
            ]
          },
        }
      ];
      
    }
    
    // console.log(`
    //   ----- matchConditionArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(matchConditionArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   Aggregation
    // --------------------------------------------------
    
    const resultArr = await SchemaForumThreads.aggregate([
      
      ...matchConditionArr,
      
      
      // 画像と動画を取得
      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { forumThreadsImagesAndVideos_id: '$imagesAndVideos_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$forumThreadsImagesAndVideos_id'] },
                }
              },
              { $project:
                {
                  createdDate: 0,
                  updatedDate: 0,
                  users_id: 0,
                  __v: 0,
                }
              }
            ],
            as: 'imagesAndVideosObj'
          }
      },
      
      {
        $unwind: {
          path: '$imagesAndVideosObj',
          preserveNullAndEmptyArrays: true,
        }
      },
      
      
      { $project:
        {
          imagesAndVideos_id: 0,
          __v: 0,
        }
      },
      
      
      { '$sort': { 'updatedDate': -1 } },
      { $skip: (threadPage - 1) * intThreadLimit },
      { $limit: intThreadLimit },
      
      
    ]).exec();
    
    
    
    
    // --------------------------------------------------
    //   コミュニティデータ取得 - コミュニティのスレッド数取得用
    // --------------------------------------------------
    
    const userCommunityArr = await ModelUserCommunities.find({
      conditionObj: {
        _id: userCommunities_id
      }
    });
    
    
    // --------------------------------------------------
    //   Format
    // --------------------------------------------------
    
    const threadCount = lodashGet(userCommunityArr, [0, 'forumObj', 'threadCount'], 0);
    
    const formattedThreadsObj = formatVer2({
      req,
      localeObj,
      loginUsers_id,
      arr: resultArr,
      threadPage,
      threadLimit: intThreadLimit,
      threadCount,
    });
    
    const forumThreadsObj = lodashGet(formattedThreadsObj, ['forumThreadsObj'], {});
    const forumThreads_idsForCommentArr = lodashGet(formattedThreadsObj, ['forumThreads_idsForCommentArr'], []);
    
    
    
    
    // --------------------------------------------------
    //   DB find / Forum Comments & Replies
    // --------------------------------------------------
    
    const forumCommentsAndRepliesObj = await ModelForumComments.findCommentsAndRepliesByForumThreads_idsArr({
      req,
      localeObj,
      loginUsers_id,
      forumThreads_idsArr: forumThreads_idsForCommentArr,
      forumThreadsObj,
      commentPage,
      commentLimit: intCommentLimit,
      replyPage,
      replyLimit: intReplyLimit,
    });
    
    const forumCommentsObj = lodashGet(forumCommentsAndRepliesObj, ['forumCommentsObj'], {});
    const forumRepliesObj = lodashGet(forumCommentsAndRepliesObj, ['forumRepliesObj'], {});
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   userCommunities_id: {green ${userCommunities_id}}
    //   page: {green ${page}}
    //   limit: {green ${limit}}
    // `);
    
    // console.log(`
    //   ----- resultArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(resultArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- formattedThreadsObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(formattedThreadsObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumCommentsAndRepliesObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(forumCommentsAndRepliesObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumThreadsObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(forumThreadsObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumCommentsObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(forumCommentsObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumRepliesObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(forumRepliesObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return {
      forumThreadsObj,
      forumCommentsObj,
      forumRepliesObj,
    };
    
    
  } catch (err) {
    
    throw err;
    
  }
  
  
};




/**
* DBから取得した情報をフォーマットする
* @param {Object} req - リクエスト
* @param {Object} localeObj - ロケール
* @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
* @param {Array} arr - 配列
* @return {Array} フォーマット後のデータ
*/
const formatVer2 = ({ req, localeObj, loginUsers_id, arr, threadPage, threadLimit, threadCount }) => {
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  const forumThreadsObj = {
    page: threadPage,
    limit: threadLimit,
    count: threadCount,
    dataObj: {},
  };
  
  const ISO8601 = moment().toISOString();
  
  const dataObj = {};
  const forumThreads_idsForCommentArr = [];
  
  
  
  // --------------------------------------------------
  //   Loop
  // --------------------------------------------------
  
  for (let valueObj of arr.values()) {
    
    // console.log(`\n---------- valueObj ----------\n`);
    // console.dir(valueObj);
    // console.log(`\n-----------------------------------\n`);
    
    
    // --------------------------------------------------
    //   Deep Copy
    // --------------------------------------------------
    
    const clonedObj = lodashCloneDeep(valueObj);
    
    
    // --------------------------------------------------
    //   Datetime
    // --------------------------------------------------
    
    clonedObj.updatedDate = moment(valueObj.updatedDate).format('YYYY/MM/DD hh:mm');
    
    
    // --------------------------------------------------
    //   画像と動画の処理
    // --------------------------------------------------
    
    const formattedObj = formatImagesAndVideosObj({ localeObj, obj: valueObj.imagesAndVideosObj });
    
    if (formattedObj) {
      
      clonedObj.imagesAndVideosObj = formattedObj;
      
    } else {
      
      delete clonedObj.imagesAndVideosObj;
      
    }
    
    
    // --------------------------------------------------
    //   編集権限
    // --------------------------------------------------
    
    clonedObj.editable = verifyAuthority({
      req,
      users_id: valueObj.users_id,
      loginUsers_id,
      ISO8601: valueObj.createdDate,
      _id: valueObj._id
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
    
    // console.log(chalk`
    //   valueObj._id: {green ${valueObj._id}}
    //   clonedObj.name: {green ${clonedObj.name}}
    //   authority: {green ${authority}}
    // `);
    
    
    
    // console.log(`
    //   ----- filteredArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(filteredArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // --------------------------------------------------
    //   不要な項目を削除する
    // --------------------------------------------------
    
    delete clonedObj._id;
    delete clonedObj.createdDate;
    delete clonedObj.users_id;
    delete clonedObj.localesArr;
    delete clonedObj.ip;
    delete clonedObj.userAgent;
    delete clonedObj.__v;
    
    // console.log(`\n---------- clonedObj ----------\n`);
    // console.dir(clonedObj);
    // console.log(`\n-----------------------------------\n`);
    
    
    // --------------------------------------------------
    //   push
    // --------------------------------------------------
    
    dataObj[valueObj._id] = clonedObj;
    
    // forumThreads_idsArr.push(valueObj._id);
    
    if (valueObj.comments > 0) {
      forumThreads_idsForCommentArr.push(valueObj._id);
    }
    
    
    // --------------------------------------------------
    //   
    // --------------------------------------------------
    
    const forumThreadsPageArr = lodashGet(forumThreadsObj, [`page${threadPage}Obj`, 'arr'], []);
    forumThreadsPageArr.push(valueObj._id);
    
    forumThreadsObj[`page${threadPage}Obj`] = {
      
      loadedDate: ISO8601,
      arr: forumThreadsPageArr,
      
    };
    
    
  }
  
  
  
  
  forumThreadsObj.dataObj = dataObj;
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return {
    forumThreadsObj,
    forumThreads_idsForCommentArr,
  };
  
  
};




/**
 * スレッドを取得する　編集用
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} forumThreads_id - DB forum-threads _id / スレッドID
 * @return {Array} 取得データ
 */
const findForEdit = async ({
  
  req,
  localeObj,
  loginUsers_id,
  forumThreads_id,
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Find
    // --------------------------------------------------
    
    const resultArr = await SchemaForumThreads.aggregate([
      
      
      // スレッドを取得
      {
        $match : { _id: forumThreads_id }
      },
      
      
      // 画像と動画を取得
      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { forumThreadsImagesAndVideos_id: '$imagesAndVideos_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$forumThreadsImagesAndVideos_id'] },
                }
              },
              { $project:
                {
                  createdDate: 0,
                  updatedDate: 0,
                  users_id: 0,
                  __v: 0,
                }
              }
            ],
            as: 'imagesAndVideosObj'
          }
      },
      
      {
        $unwind: {
          path: '$imagesAndVideosObj',
          preserveNullAndEmptyArrays: true,
        }
      },
      
      
      { $project:
        {
          createdDate: 0,
          imagesAndVideos_id: 0,
          __v: 0,
        }
      },
      
      
    ]).exec();
    
    
    
    
    // --------------------------------------------------
    //   配列が空の場合は処理停止
    // --------------------------------------------------
    
    if (resultArr.length === 0) {
      throw new CustomError({ level: 'error', errorsArr: [{ code: 'V2oFFcQIl', messageID: 'cvS0qSAlE' }] });
    }
    
    
    // --------------------------------------------------
    //   編集権限がない場合は処理停止
    // --------------------------------------------------
    
    const editable = verifyAuthority({
      req,
      users_id: lodashGet(resultArr, [0, 'users_id'], ''),
      loginUsers_id,
      ISO8601: lodashGet(resultArr, [0, 'createdDate'], ''),
      _id: lodashGet(resultArr, [0, '_id'], '')
    });
    
    if (!editable) {
      throw new CustomError({ level: 'error', errorsArr: [{ code: '-2ENyEiaJ', messageID: 'DSRlEoL29' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   Format
    // --------------------------------------------------
    
    const _id = lodashGet(resultArr, [0, '_id'], '');
    const imagesAndVideosObj = lodashGet(resultArr, [0, 'imagesAndVideosObj'], {});
    let name = '';
    let comment = '';
    
    
    // --------------------------------------------------
    //   Name & Description
    // --------------------------------------------------
    
    const filteredArr = resultArr.filter((filterObj) => {
      return filterObj.language === localeObj.language;
    });
    
    
    if (lodashHas(filteredArr, [0])) {
      
      name = lodashGet(filteredArr, [0, 'name'], '');
      comment = lodashGet(filteredArr, [0, 'comment'], '');
      
    } else {
      
      name = lodashGet(resultArr, [0, 'localesArr', 0, 'name'], '');
      comment = lodashGet(resultArr, [0, 'localesArr', 0, 'comment'], '');
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   forumThreads_id: {green ${forumThreads_id}}
    // `);
    
    // console.log(`
    //   ----- resultArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(resultArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(returnObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return {
      _id,
      name,
      comment,
      imagesAndVideosObj,
    };
    
    
  } catch (err) {
    
    throw err;
    
  }
  
  
};





/**
 * Transaction 挿入 / 更新する
 * スレッド、画像＆動画、ユーザーコミュニティを同時に更新する
 * 
 * @param {Object} forumThreadsConditionObj - DB forum-threads 検索条件
 * @param {Object} forumThreadsSaveObj - DB forum-threads 保存データ
 * @param {Object} imagesAndVideosConditionObj - DB images-and-videos 検索条件
 * @param {Object} imagesAndVideosSaveObj - DB images-and-videos 保存データ
 * @param {Object} userCommunitiesConditionObj - DB user-communities 検索条件
 * @param {Object} userCommunitiesSaveObj - DB user-communities 保存データ
 * @return {Object} 
 */
const transactionForUpsertThread = async ({
  
  forumThreadsConditionObj,
  forumThreadsSaveObj,
  imagesAndVideosConditionObj = {},
  imagesAndVideosSaveObj = {},
  userCommunitiesConditionObj,
  userCommunitiesSaveObj,
  
}) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Transaction / Session
  // --------------------------------------------------
  
  const session = await SchemaForumThreads.startSession();
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Transaction / Start
    // --------------------------------------------------
    
    await session.startTransaction();
    
    
    // --------------------------------------------------
    //   DB updateOne
    // --------------------------------------------------
    
    await SchemaForumThreads.updateOne(forumThreadsConditionObj, forumThreadsSaveObj, { session, upsert: true });
    
    
    if (Object.keys(imagesAndVideosConditionObj).length !== 0 && Object.keys(imagesAndVideosSaveObj).length !== 0) {
      
      
      // --------------------------------------------------
      //   画像＆動画を削除する
      // --------------------------------------------------
      
      const arr = lodashGet(imagesAndVideosSaveObj, ['arr'], []);
      
      if (arr.length === 0) {
        
        await SchemaImagesAndVideos.deleteOne(imagesAndVideosConditionObj);
        
        
      // --------------------------------------------------
      //   画像＆動画を保存
      // --------------------------------------------------
        
      } else {
        
        await SchemaImagesAndVideos.updateOne(imagesAndVideosConditionObj, imagesAndVideosSaveObj, { session, upsert: true });
        
      }
      
    }
    
    
    // throw new Error();
    await SchemaUserCommunities.updateOne(userCommunitiesConditionObj, userCommunitiesSaveObj, { session });
    
    
    // --------------------------------------------------
    //   Transaction / Commit
    // --------------------------------------------------
    
    await session.commitTransaction();
    // console.log('--------コミット-----------');
    
    session.endSession();
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- forumThreadsConditionObj -----\n
    //   ${util.inspect(forumThreadsConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumThreadsSaveObj -----\n
    //   ${util.inspect(forumThreadsSaveObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    console.log(`
      ----- imagesAndVideosConditionObj -----\n
      ${util.inspect(imagesAndVideosConditionObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    console.log(`
      ----- imagesAndVideosSaveObj -----\n
      ${util.inspect(imagesAndVideosSaveObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    // console.log(`
    //   ----- userCommunitiesConditionObj -----\n
    //   ${util.inspect(userCommunitiesConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- userCommunitiesSaveObj -----\n
    //   ${util.inspect(userCommunitiesSaveObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(returnObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return returnObj;
    
    
  } catch (errorObj) {
    
    // console.log(`
    //   ----- errorObj -----\n
    //   ${util.inspect(errorObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   Transaction / Rollback
    // --------------------------------------------------
    
    await session.abortTransaction();
    // console.log('--------ロールバック-----------');
    
    session.endSession();
    
    
    throw errorObj;
    
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
  
  findForThreadsList,
  findForForum,
  // findThreadsByForumThreads_idArr,
  // findForThreads,
  findForEdit,
  transactionForUpsertThread,
  
};