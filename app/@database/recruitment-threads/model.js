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

const SchemaRecruitmentThreads = require('./schema.js');
const SchemaRecruitmentComments = require('../recruitment-comments/schema.js');
const SchemaRecruitmentReplies = require('../recruitment-replies/schema.js');
const SchemaImagesAndVideos = require('../images-and-videos/schema.js');
const SchemaGameCommunities = require('../game-communities/schema.js');
const SchemaUsers = require('../users/schema.js');

const ModelRecruitmentComments = require('../recruitment-comments/model.js');
const ModelRecruitmentReplies = require('../recruitment-replies/model.js');
// const ModelRecruitmentComments = require('app/@database/recruitment-comments/model.js');
// const ModelRecruitmentReplies = require('app/@database/recruitment-replies/model.js');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { CustomError } = require('../../@modules/error/custom');
const { verifyAuthority } = require('../../@modules/authority');


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { formatRecruitmentThreadsArr } = require('./format');






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
    
    return await SchemaRecruitmentThreads.findOne(conditionObj).exec();
    
    
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
    
    return await SchemaRecruitmentThreads.find(conditionObj).exec();
    
    
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
    
    return await SchemaRecruitmentThreads.countDocuments(conditionObj).exec();
    
    
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
    
    return await SchemaRecruitmentThreads.findOneAndUpdate(conditionObj, saveObj, { upsert: true, new: true, setDefaultsOnInsert: true }).exec();
    
    
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
    
    return await SchemaRecruitmentThreads.insertMany(saveArr);
    
    
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
    
    return await SchemaRecruitmentThreads.deleteMany(conditionObj);
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};






// --------------------------------------------------
//   find
// --------------------------------------------------

/**
 * 募集（コメント＆返信を含む全てのデータ）を取得する
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティID
 * @param {Array} threads_idsArr - DB recruitment-threads _id / スレッドID（threads_idsArr という名前に変更しているのは、下の方に recruitmentThreads_idsArr が存在しているから）
 * @param {number} threadPage - スレッドのページ
 * @param {number} threadLimit - スレッドのリミット
 * @param {number} commentPage - コメントのページ
 * @param {number} commentLimit - コメントのリミット
 * @param {number} replyPage - 返信のページ
 * @param {number} replyLimit - 返信のリミット
 * @return {Array} 取得データ
 */
const findRecruitments = async ({
  
  req,
  localeObj,
  loginUsers_id,
  gameCommunities_id,
  recruitmentThreads_idsArr = [],
  threadPage = 1,
  threadLimit = process.env.NEXT_PUBLIC_RECRUITMENT_THREAD_LIMIT,
  commentPage = 1,
  commentLimit = process.env.NEXT_PUBLIC_RECRUITMENT_COMMENT_LIMIT,
  replyPage = 1,
  replyLimit = process.env.NEXT_PUBLIC_RECRUITMENT_REPLY_LIMIT,
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Language & Country
    // --------------------------------------------------
    
    // const language = lodashGet(localeObj, ['language'], '');
    // const country = lodashGet(localeObj, ['country'], '');
    
    
    // --------------------------------------------------
    //   Parse
    // --------------------------------------------------
    
    // const intThreadLimit = parseInt(threadLimit, 10);
    const intCommentLimit = parseInt(commentLimit, 10);
    const intReplyLimit = parseInt(replyLimit, 10);
    
    
    
    
    // --------------------------------------------------
    //   Match Condition Array
    // --------------------------------------------------
    
    let matchConditionArr = [];
    
    matchConditionArr = [
      {
        $match: { gameCommunities_id }
      },
    ];
    
    
    // ---------------------------------------------
    //   - コメント更新時
    // ---------------------------------------------
    
    if (recruitmentThreads_idsArr.length > 0) {
      
      matchConditionArr = [
        {
          $match: {
            $and:
              [
                { gameCommunities_id },
                { _id: { $in: recruitmentThreads_idsArr } }
              ]
          }
        },
      ];
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Aggregate
    // --------------------------------------------------
    
    const docArr = await aggregate({
      
      req,
      localeObj,
      loginUsers_id,
      matchConditionArr,
      threadPage,
      threadLimit,
      
    });
    
    
    
    
    // --------------------------------------------------
    //   Format
    // --------------------------------------------------
    
    const formattedThreadsObj = formatRecruitmentThreadsArr({
      
      req,
      localeObj,
      loginUsers_id,
      arr: docArr,
      threadPage,
      // threadCount,
      
    });
    
    const recruitmentThreadsObj = lodashGet(formattedThreadsObj, ['recruitmentThreadsObj'], {});
    // const recruitmentThreads_idsArr = lodashGet(formattedThreadsObj, ['recruitmentThreads_idsArr'], []);
    
    
    
    
    // --------------------------------------------------
    //   DB find / Comments & Replies
    // --------------------------------------------------
    
    const formattedCommentsAndRepliesObj = await ModelRecruitmentComments.findCommentsAndReplies({
      
      req,
      localeObj,
      loginUsers_id,
      recruitmentThreads_idsArr: lodashGet(formattedThreadsObj, ['recruitmentThreads_idsArr'], []),
      recruitmentThreadsObj,
      commentPage,
      commentLimit: intCommentLimit,
      replyPage,
      replyLimit: intReplyLimit,
      
    });
    
    const recruitmentCommentsObj = lodashGet(formattedCommentsAndRepliesObj, ['recruitmentCommentsObj'], {});
    const recruitmentRepliesObj = lodashGet(formattedCommentsAndRepliesObj, ['recruitmentRepliesObj'], {});
    
    
    
    
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
    
    return {
      
      recruitmentThreadsObj,
      recruitmentCommentsObj,
      recruitmentRepliesObj,
      
    };
    
    
  } catch (err) {
    
    throw err;
    
  }
  
  
};




/**
 * 募集（コメント＆返信を含む全てのデータ）を取得する / スレッドID、コメントID、返信IDのどれかで検索する
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティID
 * @param {string} recruitmentID - スレッドID / コメントID / 返信ID
 * @param {number} threadPage - スレッドのページ
 * @param {number} threadLimit - スレッドのリミット
 * @param {number} commentPage - コメントのページ
 * @param {number} commentLimit - コメントのリミット
 * @param {number} replyPage - 返信のページ
 * @param {number} replyLimit - 返信のリミット
 * @return {Array} 取得データ
 */
const findRecruitmentByRecruitmentID = async ({
  
  req,
  localeObj,
  loginUsers_id,
  gameCommunities_id,
  recruitmentID,
  threadPage = 1,
  threadLimit = process.env.NEXT_PUBLIC_RECRUITMENT_THREAD_LIMIT,
  commentPage = 1,
  commentLimit = process.env.NEXT_PUBLIC_RECRUITMENT_COMMENT_LIMIT,
  replyPage = 1,
  replyLimit = process.env.NEXT_PUBLIC_RECRUITMENT_REPLY_LIMIT,
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Parse
    // --------------------------------------------------
    
    // const intThreadLimit = parseInt(threadLimit, 10);
    const intCommentLimit = parseInt(commentLimit, 10);
    const intReplyLimit = parseInt(replyLimit, 10);
    
    
    
    
    // --------------------------------------------------
    //   DB find / スレッドIDを取得する
    // --------------------------------------------------
    
    let type = 'thread';
    
    let recruitmentThreads_id = '';
    let recruitmentComments_id = '';
    let recruitmentReplies_id = '';
    
    
    const threadsObj = await findOne({
      
      conditionObj: {
        
        _id: recruitmentID,
        gameCommunities_id,
        
      }
      
    });
    
    recruitmentThreads_id = lodashGet(threadsObj, ['_id'], '');
    
    
    // --------------------------------------------------
    //   DB find / コメントからスレッドIDを取得する
    // --------------------------------------------------
    
    if (!recruitmentThreads_id) {
      
      const commentsObj = await ModelRecruitmentComments.findOne({
        
        conditionObj: {
          
          _id: recruitmentID,
          gameCommunities_id,
          
        }
        
      });
      
      recruitmentThreads_id = lodashGet(commentsObj, ['recruitmentThreads_id'], '');
      recruitmentComments_id = lodashGet(commentsObj, ['_id'], '');
      
      type = 'comment';
      
    }
    
    
    // --------------------------------------------------
    //   DB find / 返信からスレッドIDを取得する
    // --------------------------------------------------
    
    if (!recruitmentThreads_id) {
      
      const repliesObj = await ModelRecruitmentReplies.findOne({
        
        conditionObj: {
          
          _id: recruitmentID,
          gameCommunities_id,
          
        }
        
      });
      
      recruitmentThreads_id = lodashGet(repliesObj, ['recruitmentThreads_id'], '');
      recruitmentComments_id = lodashGet(repliesObj, ['recruitmentComments_id'], '');
      recruitmentReplies_id = lodashGet(repliesObj, ['_id'], '');
      
      type = 'reply';
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Match Condition Array
    // --------------------------------------------------
    
    let matchConditionArr = [];
    
    matchConditionArr = [
      {
        $match: {
          _id: recruitmentThreads_id,
        }
      },
    ];
    
    
    
    
    // --------------------------------------------------
    //   Aggregate
    // --------------------------------------------------
    
    const docArr = await aggregate({
      
      req,
      localeObj,
      loginUsers_id,
      matchConditionArr,
      threadPage: 1,
      threadLimit: 1,
      
    });
    
    
    
    
    // --------------------------------------------------
    //   Format
    // --------------------------------------------------
    
    const formattedThreadsObj = formatRecruitmentThreadsArr({
      
      req,
      localeObj,
      loginUsers_id,
      arr: docArr,
      threadPage: 1,
      
    });
    
    const recruitmentThreadsObj = lodashGet(formattedThreadsObj, ['recruitmentThreadsObj'], {});
    recruitmentThreadsObj.count = 0;
    
    
    
    
    // ------------------------------------------------------------
    //   コメント＆返信を取得する
    // ------------------------------------------------------------
    
    let recruitmentCommentsObj = {};
    let recruitmentRepliesObj = {};
    let formattedCommentsAndRepliesObj = {};
    
    
    // --------------------------------------------------
    //   recruitmentID がスレッドの場合
    // --------------------------------------------------
    
    if (type === 'thread') {
      
      
      // --------------------------------------------------
      //   DB find / Forum Comments & Replies
      // --------------------------------------------------
      
      formattedCommentsAndRepliesObj = await ModelRecruitmentComments.findCommentsAndReplies({
        
        req,
        localeObj,
        loginUsers_id,
        recruitmentThreads_idsArr: lodashGet(formattedThreadsObj, ['recruitmentThreads_idsArr'], []),
        recruitmentThreadsObj,
        commentPage,
        commentLimit: intCommentLimit,
        replyPage,
        replyLimit: intReplyLimit,
        
      });
      
      
    // --------------------------------------------------
    //   recruitmentID がコメントの場合
    // --------------------------------------------------
    
    } else if (type === 'comment') {
      
      
      // --------------------------------------------------
      //   DB / コメントのページ番号を取得する
      // --------------------------------------------------
      
      const pageObj = await ModelRecruitmentComments.getPage({
        
        recruitmentThreads_id,
        recruitmentComments_id,
        commentLimit,
        
      });
      
      
      // --------------------------------------------------
      //   DB find / Forum Comments & Replies
      // --------------------------------------------------
      
      formattedCommentsAndRepliesObj = await ModelRecruitmentComments.findCommentsAndReplies({
        
        req,
        localeObj,
        loginUsers_id,
        recruitmentThreads_idsArr: lodashGet(formattedThreadsObj, ['recruitmentThreads_idsArr'], []),
        recruitmentThreadsObj,
        commentPage: lodashGet(pageObj, ['commentPage'], 1),
        commentLimit: intCommentLimit,
        replyPage: 1,
        replyLimit: intReplyLimit,
        
      });
      
      
    // --------------------------------------------------
    //   recruitmentID が返信の場合
    // --------------------------------------------------
    
    } else if (type === 'reply') {
      
      
      // --------------------------------------------------
      //   DB / コメントと返信のページ番号を取得する
      // --------------------------------------------------
      
      const pageObj = await ModelRecruitmentReplies.getPage({
        
        recruitmentThreads_id,
        recruitmentComments_id,
        recruitmentReplies_id,
        commentLimit,
        replyLimit,
        
      });
      
      
      // --------------------------------------------------
      //   DB find / Forum Comments & Replies
      // --------------------------------------------------
      
      formattedCommentsAndRepliesObj = await ModelRecruitmentComments.findCommentsAndReplies({
        
        req,
        localeObj,
        loginUsers_id,
        recruitmentThreads_idsArr: lodashGet(formattedThreadsObj, ['recruitmentThreads_idsArr'], []),
        recruitmentThreadsObj,
        commentPage: lodashGet(pageObj, ['commentPage'], 1),
        commentLimit: intCommentLimit,
        replyPage: lodashGet(pageObj, ['replyPage'], 1),
        replyLimit: intReplyLimit,
        
      });
      
      
    }
    
    
    recruitmentCommentsObj = lodashGet(formattedCommentsAndRepliesObj, ['recruitmentCommentsObj'], {});
    recruitmentRepliesObj = lodashGet(formattedCommentsAndRepliesObj, ['recruitmentRepliesObj'], {});
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/recruitment-threads/model.js - findRecruitmentByRecruitmentID
    // `);
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   recruitmentID: {green ${recruitmentID}}
    //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
    //   recruitmentComments_id: {green ${recruitmentComments_id}}
    //   recruitmentReplies_id: {green ${recruitmentReplies_id}}
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
    //   ${util.inspect(docArr, { colors: true, depth: null })}\n
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
      
      recruitmentThreadsObj,
      recruitmentCommentsObj,
      recruitmentRepliesObj,
      
    };
    
    
  } catch (err) {
    
    throw err;
    
  }
  
  
};




/**
 * 募集の検索データを取得する
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティID
 * @param {Array} hardwareIDsArr - DB hardwares _id / ハードウェアIDの入った配列
 * @param {Array} categoriesArr - カテゴリーNoの入った配列
 * @param {number} threadPage - スレッドのページ
 * @param {number} threadLimit - スレッドのリミット
 * @param {number} commentPage - コメントのページ
 * @param {number} commentLimit - コメントのリミット
 * @param {number} replyPage - 返信のページ
 * @param {number} replyLimit - 返信のリミット
 * @return {Array} 取得データ
 */
const findRecruitmentsForSearch = async ({
  
  req,
  localeObj,
  loginUsers_id,
  gameCommunities_id,
  hardwareIDsArr = [],
  categoriesArr = [],
  keyword,
  threadPage = 1,
  threadLimit = process.env.NEXT_PUBLIC_RECRUITMENT_THREAD_LIMIT,
  commentPage = 1,
  commentLimit = process.env.NEXT_PUBLIC_RECRUITMENT_COMMENT_LIMIT,
  replyPage = 1,
  replyLimit = process.env.NEXT_PUBLIC_RECRUITMENT_REPLY_LIMIT,
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Parse
    // --------------------------------------------------
    
    const intCommentLimit = parseInt(commentLimit, 10);
    const intReplyLimit = parseInt(replyLimit, 10);
    
    
    
    
    // --------------------------------------------------
    //   Match Condition Array
    // --------------------------------------------------
    
    let matchConditionArr = [];
    
    
    // ---------------------------------------------
    //   - andArr（ドキュメントの検索用） & threadCountConditionObj（総数の検索用）
    // ---------------------------------------------
    
    const andArr = [{
      gameCommunities_id
    }];
    
    const threadCountConditionObj = {
      gameCommunities_id
    };
    
    
    // ---------------------------------------------
    //   - 検索条件
    // ---------------------------------------------
    
    if (hardwareIDsArr.length > 0) {
      
      andArr.push({
        hardwareIDsArr: { $in: hardwareIDsArr }
      });
      
      threadCountConditionObj.hardwareIDsArr = { $in: hardwareIDsArr };
      
    }
    
    
    if (categoriesArr.length > 0) {
      
      andArr.push({
        category: { $in: categoriesArr }
      });
      
      threadCountConditionObj.category = { $in: categoriesArr };
      
    }
    
    
    if (keyword) {
      
      andArr.push({
        $or: [
          { 'localesArr.title': { $regex: keyword } },
          { 'localesArr.comment': { $regex: keyword } },
        ]
      });
      
      threadCountConditionObj.$or = [
        { 'localesArr.title': { $regex: keyword } },
        { 'localesArr.comment': { $regex: keyword } },
      ];
      
    }
    
    
    // ---------------------------------------------
    //   - 検索条件設定
    // ---------------------------------------------
    
    matchConditionArr = [
      {
        $match: {
          $and: andArr
        }
      }
    ];
    
    
    // console.log(`
    //   ----- andArr -----\n
    //   ${util.inspect(andArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- matchConditionArr -----\n
    //   ${util.inspect(matchConditionArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- threadCountConditionObj -----\n
    //   ${util.inspect(threadCountConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Aggregate
    // --------------------------------------------------
    
    const docArr = await aggregate({
      
      req,
      localeObj,
      loginUsers_id,
      matchConditionArr,
      threadPage,
      threadLimit,
      
    });
    
    
    
    
    // --------------------------------------------------
    //   スレッドのフォーマット & コメント＆返信データ取得
    // --------------------------------------------------
    
    let recruitmentThreadsObj = {};
    let recruitmentCommentsObj = {};
    let recruitmentRepliesObj = {};
    
    
    if (docArr.length > 0) {
      
      
      // --------------------------------------------------
      //   threadCount（スレッドの総数） 取得
      // --------------------------------------------------
      
      const threadCount = await count({
        
        conditionObj: threadCountConditionObj
        
      });
      
      // console.log(chalk`
      //   threadCount: {green ${threadCount}}
      // `);
      
      
      // --------------------------------------------------
      //   threadCount を置き換える（フォーマットでは配列の最初に出てくる総数だけを利用する）
      // --------------------------------------------------
      
      lodashSet(docArr, [0, 'gameCommunitiesObj', 'recruitmentObj', 'threadCount'], threadCount);
      
      
      
      
      // --------------------------------------------------
      //   Format
      // --------------------------------------------------
      
      const formattedThreadsObj = formatRecruitmentThreadsArr({
        
        req,
        localeObj,
        loginUsers_id,
        arr: docArr,
        threadPage,
        
      });
      
      recruitmentThreadsObj = lodashGet(formattedThreadsObj, ['recruitmentThreadsObj'], {});
      
      
      
      
      // --------------------------------------------------
      //   DB find / Comments & Replies
      // --------------------------------------------------
      
      const formattedCommentsAndRepliesObj = await ModelRecruitmentComments.findCommentsAndReplies({
        
        req,
        localeObj,
        loginUsers_id,
        recruitmentThreads_idsArr: lodashGet(formattedThreadsObj, ['recruitmentThreads_idsArr'], []),
        recruitmentThreadsObj,
        commentPage,
        commentLimit: intCommentLimit,
        replyPage,
        replyLimit: intReplyLimit,
        
      });
      
      recruitmentCommentsObj = lodashGet(formattedCommentsAndRepliesObj, ['recruitmentCommentsObj'], {});
      recruitmentRepliesObj = lodashGet(formattedCommentsAndRepliesObj, ['recruitmentRepliesObj'], {});
      
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/recruitment-threads/model.js - findRecruitmentsForSearch
    // `);
    
    // console.log(chalk`
    //   findRecruitmentsForSearch
      
    //   gameCommunities_id: {green ${gameCommunities_id} / ${typeof gameCommunities_id}}
    //   keyword: {green ${keyword} / ${typeof keyword}}
    //   threadPage: {green ${threadPage} / ${typeof threadPage}}
    //   threadLimit: {green ${threadLimit} / ${typeof threadLimit}}
    //   commentPage: {green ${commentPage} / ${typeof commentPage}}
    //   commentLimit: {green ${commentLimit} / ${typeof commentLimit}}
    //   replyPage: {green ${replyPage} / ${typeof replyPage}}
    //   replyLimit: {green ${replyLimit} / ${typeof replyLimit}}
    // `);
    
    // console.log(`
    //   ----- hardwareIDsArr -----\n
    //   ${util.inspect(hardwareIDsArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- categoriesArr -----\n
    //   ${util.inspect(categoriesArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- docArr -----\n
    //   ${util.inspect(docArr, { colors: true, depth: null })}\n
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
      
      recruitmentThreadsObj,
      recruitmentCommentsObj,
      recruitmentRepliesObj,
      
    };
    
    
  } catch (err) {
    
    throw err;
    
  }
  
  
};




/**
 * aggregate / スレッドを取得する部分
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {Array} matchConditionArr - 検索条件
 * @param {number} threadPage - スレッドのページ
 * @param {number} threadLimit - スレッドのリミット
 * @return {Array} 取得データ
 */
const aggregate = async ({
  
  req,
  localeObj,
  loginUsers_id,
  matchConditionArr = [],
  threadPage = 1,
  threadLimit = process.env.NEXT_PUBLIC_RECRUITMENT_THREAD_LIMIT,
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Language & Country
    // --------------------------------------------------
    
    const language = lodashGet(localeObj, ['language'], '');
    const country = lodashGet(localeObj, ['country'], '');
    
    
    // --------------------------------------------------
    //   parseInt
    // --------------------------------------------------
    
    const intThreadLimit = parseInt((threadLimit || process.env.NEXT_PUBLIC_RECRUITMENT_THREAD_LIMIT), 10);
    
    
    // console.log(chalk`
    //   aggregate
    //   threadLimit: {green ${threadLimit} / ${typeof threadLimit}}
    //   process.env.NEXT_PUBLIC_RECRUITMENT_THREAD_LIMIT: {green ${process.env.NEXT_PUBLIC_RECRUITMENT_THREAD_LIMIT} / ${typeof process.env.NEXT_PUBLIC_RECRUITMENT_THREAD_LIMIT}}
    //   intThreadLimit: {green ${intThreadLimit}}
    // `);
    
    
    // --------------------------------------------------
    //   Aggregation
    // --------------------------------------------------
    
    const docArr = await SchemaRecruitmentThreads.aggregate([
      
      
      // --------------------------------------------------
      //   Match Condition Array
      // --------------------------------------------------
      
      ...matchConditionArr,
      
      
      // --------------------------------------------------
      //   game-communities / threadCount 取得用
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'game-communities',
            let: { letGameCommunities_id: '$gameCommunities_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$letGameCommunities_id'] },
                }
              },
              { $project:
                {
                  _id: 0,
                  recruitmentObj: 1,
                }
              }
            ],
            as: 'gameCommunitiesObj'
          }
      },
      
      {
        $unwind: {
          path: '$gameCommunitiesObj',
          preserveNullAndEmptyArrays: true,
        }
      },
      
      
      // --------------------------------------------------
      //   card-players / プレイヤーカードを取得（名前＆ステータス＆サムネイル用）
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'card-players',
            let: { letUsers_id: '$users_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$language', language] },
                      { $eq: ['$users_id', '$$letUsers_id'] },
                    ]
                  },
                }
              },
              
              
              // --------------------------------------------------
              //   card-players / images-and-videos / サムネイルを取得
              // --------------------------------------------------
              
              {
                $lookup:
                  {
                    from: 'images-and-videos',
                    let: { letImagesAndVideosThumbnail_id: '$imagesAndVideosThumbnail_id' },
                    pipeline: [
                      { $match:
                        { $expr:
                          { $eq: ['$_id', '$$letImagesAndVideosThumbnail_id'] },
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
                    as: 'imagesAndVideosThumbnailObj'
                  }
              },
              
              {
                $unwind: {
                  path: '$imagesAndVideosThumbnailObj',
                  preserveNullAndEmptyArrays: true,
                }
              },
              
              
              { $project:
                {
                  name: '$nameObj.value',
                  status: '$statusObj.value',
                  imagesAndVideosThumbnailObj: 1,
                }
              }
            ],
            as: 'cardPlayersObj'
          }
      },
      
      {
        $unwind: {
          path: '$cardPlayersObj',
          preserveNullAndEmptyArrays: true,
        }
      },
      
      
      // --------------------------------------------------
      //   users / ユーザーを取得（アクセス日時＆経験値＆プレイヤーID用）
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'users',
            let: { letUsers_id: '$users_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$letUsers_id'] },
                }
              },
              { $project:
                {
                  _id: 0,
                  accessDate: 1,
                  exp: 1,
                  userID: 1,
                  webPushSubscriptionObj: 1,
                }
              }
            ],
            as: 'usersObj'
          }
      },
      
      {
        $unwind: {
          path: '$usersObj',
          preserveNullAndEmptyArrays: true,
        }
      },
      
      
      // --------------------------------------------------
      //   images-and-videos
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { letImagesAndVideos_id: '$imagesAndVideos_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$letImagesAndVideos_id'] },
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
      
      
      // --------------------------------------------------
      //   hardwares
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'hardwares',
            let: { letHardwareIDsArr: '$hardwareIDsArr' },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$language', language] },
                      { $eq: ['$country', country] },
                      { $in: ['$hardwareID', '$$letHardwareIDsArr'] }
                    ]
                  },
                }
              },
              { $project:
                {
                  _id: 0,
                  hardwareID: 1,
                  name: 1,
                }
              }
            ],
            as: 'hardwaresArr'
          }
      },
      
      
      // --------------------------------------------------
      //   ids
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'ids',
            let: {
              letIDs_idArr: '$ids_idsArr',
              letUsers_id: '$users_id',
            },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$users_id', '$$letUsers_id'] },
                      { $in: ['$_id', '$$letIDs_idArr'] }
                    ]
                  },
                }
              },
              
              
              // --------------------------------------------------
              //   ids / games
              // --------------------------------------------------
              
              {
                $lookup:
                  {
                    from: 'games',
                    let: { letGameCommunities_id: '$gameCommunities_id' },
                    pipeline: [
                      { $match:
                        { $expr:
                          { $and:
                            [
                              { $eq: ['$language', language] },
                              { $eq: ['$country', country] },
                              { $eq: ['$gameCommunities_id', '$$letGameCommunities_id'] }
                            ]
                          },
                        }
                      },
                      
                      
                      // --------------------------------------------------
                      //   ids / games / images-and-videos / サムネイル用
                      // --------------------------------------------------
                      
                      {
                        $lookup:
                          {
                            from: 'images-and-videos',
                            let: { letImagesAndVideosThumbnail_id: '$imagesAndVideosThumbnail_id' },
                            pipeline: [
                              { $match:
                                { $expr:
                                  { $eq: ['$_id', '$$letImagesAndVideosThumbnail_id'] },
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
                            as: 'imagesAndVideosThumbnailObj'
                          }
                      },
                      
                      {
                        $unwind: {
                          path: '$imagesAndVideosThumbnailObj',
                          preserveNullAndEmptyArrays: true,
                        }
                      },
                      
                      
                      { $project:
                        {
                          _id: 1,
                          gameCommunities_id: 1,
                          name: 1,
                          imagesAndVideosThumbnailObj: 1,
                        }
                      }
                    ],
                    as: 'gamesObj'
                  }
              },
              
              {
                $unwind:
                  {
                    path: '$gamesObj',
                    preserveNullAndEmptyArrays: true
                  }
              },
              
              
              { $project:
                {
                  createdDate: 0,
                  updatedDate: 0,
                  users_id: 0,
                  search: 0,
                  __v: 0,
                }
              }
            ],
            as: 'idsArr'
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
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return docArr;
    
    
  } catch (err) {
    
    throw err;
    
  }
  
  
};






/**
 * 編集用データを取得する（権限もチェック）
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} recruitmentThreads_id - DB recruitment-threads _id / スレッドID
 * @return {Array} 取得データ
 */
const findOneForEdit = async ({
  
  req,
  localeObj,
  loginUsers_id,
  recruitmentThreads_id,
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const language = lodashGet(localeObj, ['language'], '');
    const country = lodashGet(localeObj, ['country'], '');
    
    
    
    
    // --------------------------------------------------
    //   Find
    // --------------------------------------------------
    
    const docRecruitmentThreadsArr = await SchemaRecruitmentThreads.aggregate([
      
      
      // --------------------------------------------------
      //   Match
      // --------------------------------------------------
      
      {
        $match : { _id: recruitmentThreads_id }
      },
      
      
      // --------------------------------------------------
      //   images-and-videos
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { recruitmentThreadsImagesAndVideos_id: '$imagesAndVideos_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$recruitmentThreadsImagesAndVideos_id'] },
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
      
      
      // --------------------------------------------------
      //   hardwares
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'hardwares',
            let: { recruitmentThreadsHardwareIDsArr: '$hardwareIDsArr' },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$language', language] },
                      { $eq: ['$country', country] },
                      { $in: ['$hardwareID', '$$recruitmentThreadsHardwareIDsArr'] }
                    ]
                  },
                }
              },
              { $project:
                {
                  _id: 0,
                  hardwareID: 1,
                  name: 1,
                }
              }
            ],
            as: 'hardwaresArr'
          }
      },
      
      
      // --------------------------------------------------
      //   ids
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'ids',
            let: {
              recruitmentThreadsIDs_idArr: '$ids_idsArr',
              recruitmentThreadsUsers_id: '$users_id',
            },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$users_id', '$$recruitmentThreadsUsers_id'] },
                      { $in: ['$_id', '$$recruitmentThreadsIDs_idArr'] }
                    ]
                  },
                }
              },
              
              
              // --------------------------------------------------
              //   ids / games
              // --------------------------------------------------
              
              {
                $lookup:
                  {
                    from: 'games',
                    let: { idsGameCommunities_id: '$gameCommunities_id' },
                    pipeline: [
                      { $match:
                        { $expr:
                          { $and:
                            [
                              { $eq: ['$language', language] },
                              { $eq: ['$country', country] },
                              { $eq: ['$gameCommunities_id', '$$idsGameCommunities_id'] }
                            ]
                          },
                        }
                      },
                      
                      
                      // --------------------------------------------------
                      //   ids / games / images-and-videos / サムネイル用
                      // --------------------------------------------------
                      
                      {
                        $lookup:
                          {
                            from: 'images-and-videos',
                            let: { gamesImagesAndVideosThumbnail_id: '$imagesAndVideosThumbnail_id' },
                            pipeline: [
                              { $match:
                                { $expr:
                                  { $eq: ['$_id', '$$gamesImagesAndVideosThumbnail_id'] },
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
                            as: 'imagesAndVideosThumbnailObj'
                          }
                      },
                      
                      {
                        $unwind: {
                          path: '$imagesAndVideosThumbnailObj',
                          preserveNullAndEmptyArrays: true,
                        }
                      },
                      
                      
                      { $project:
                        {
                          _id: 1,
                          gameCommunities_id: 1,
                          name: 1,
                          imagesAndVideosThumbnailObj: 1,
                        }
                      }
                    ],
                    as: 'gamesObj'
                  }
              },
              
              {
                $unwind:
                  {
                    path: '$gamesObj',
                    preserveNullAndEmptyArrays: true
                  }
              },
              
              
              { $project:
                {
                  createdDate: 0,
                  updatedDate: 0,
                  users_id: 0,
                  search: 0,
                  __v: 0,
                }
              }
            ],
            as: 'idsArr'
          }
      },
      
      
      { $project:
        {
          createdDate: 0,
          imagesAndVideos_id: 0,
          hardwareIDsArr: 0,
          ids_idsArr: 0,
          publicCommentsUsers_idsArr: 0,
          publicApprovalUsers_idsArrr: 0,
          close: 0,
          webPushSubscriptionObj: 0,
          comments: 0,
          replies: 0,
          images: 0,
          videos: 0,
          ip: 0,
          userAgent: 0,
          __v: 0,
        }
      },
      
      
    ]).exec();
    
    
    
    
    // --------------------------------------------------
    //   配列が空の場合は処理停止
    // --------------------------------------------------
    
    if (docRecruitmentThreadsArr.length === 0) {
      throw new CustomError({ level: 'error', errorsArr: [{ code: 'acvBaS9ri', messageID: 'cvS0qSAlE' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   編集権限がない場合は処理停止
    // --------------------------------------------------
    
    const editable = verifyAuthority({
      
      req,
      users_id: lodashGet(docRecruitmentThreadsArr, [0, 'users_id'], ''),
      loginUsers_id,
      ISO8601: lodashGet(docRecruitmentThreadsArr, [0, 'createdDate'], ''),
      _id: lodashGet(docRecruitmentThreadsArr, [0, '_id'], '')
      
    });
    
    if (!editable) {
      throw new CustomError({ level: 'error', errorsArr: [{ code: 'ccO1brrau', messageID: 'DSRlEoL29' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   Format
    // --------------------------------------------------
    
    const formattedObj = docRecruitmentThreadsArr[0];
    
    
    // --------------------------------------------------
    //   非ログイン時のID
    // --------------------------------------------------
    
    const publicIDsArr = lodashGet(formattedObj, ['publicIDsArr'], []);
    
    for (const [index, valueObj] of publicIDsArr.entries()) {
      
      if (index === 0) {
        
        lodashSet(formattedObj, ['platform1'], valueObj.platform);
        lodashSet(formattedObj, ['id1'], valueObj.id);
        
      } else if (index === 1) {
        
        lodashSet(formattedObj, ['platform2'], valueObj.platform);
        lodashSet(formattedObj, ['id2'], valueObj.id);
        
      } else if (index === 2) {
        
        lodashSet(formattedObj, ['platform3'], valueObj.platform);
        lodashSet(formattedObj, ['id3'], valueObj.id);
        
      }
      
    }
    
    
    // --------------------------------------------------
    //   情報
    // --------------------------------------------------
    
    const publicInformationsArr = lodashGet(formattedObj, ['publicInformationsArr'], []);
    
    for (const [index, valueObj] of publicInformationsArr.entries()) {
      
      if (index === 0) {
        
        lodashSet(formattedObj, ['informationTitle1'], valueObj.title);
        lodashSet(formattedObj, ['information1'], valueObj.information);
        
      } else if (index === 1) {
        
        lodashSet(formattedObj, ['informationTitle2'], valueObj.title);
        lodashSet(formattedObj, ['information2'], valueObj.information);
        
      } else if (index === 2) {
        
        lodashSet(formattedObj, ['informationTitle3'], valueObj.title);
        lodashSet(formattedObj, ['information3'], valueObj.information);
        
      } else if (index === 3) {
        
        lodashSet(formattedObj, ['informationTitle4'], valueObj.title);
        lodashSet(formattedObj, ['information4'], valueObj.information);
        
      } else if (index === 4) {
        
        lodashSet(formattedObj, ['informationTitle5'], valueObj.title);
        lodashSet(formattedObj, ['information5'], valueObj.information);
        
      }
      
    }
    
    
    
    
    // --------------------------------------------------
    //   returnObj
    // --------------------------------------------------
    
    const returnObj = formattedObj;
    
    
    
    
    // --------------------------------------------------
    //   不要なデータを削除
    // --------------------------------------------------
    
    delete returnObj.publicIDsArr;
    delete returnObj.publicInformationsArr;
    
    // delete returnObj.hardwareIDsArr;
    // delete returnObj.ids_idsArr;
    // delete returnObj.publicCommentsUsers_idsArr;
    // delete returnObj.publicApprovalUsers_idsArrr;
    // delete returnObj.close;
    // delete returnObj.webPushSubscriptionObj;
    // delete returnObj.comments;
    // delete returnObj.replies;
    // delete returnObj.images;
    // delete returnObj.videos;
    // delete returnObj.ip;
    // delete returnObj.userAgent;
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/recruitment-threads/model.js - findOneForEdit
    // `);
    
    // console.log(chalk`
    //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
    //   editable: {green ${editable} / ${typeof editable}}
    // `);
    
    // console.log(`
    //   ----- docRecruitmentThreadsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(docRecruitmentThreadsArr)), { colors: true, depth: null })}\n
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




/**
 * 削除用データを取得する（権限もチェック）
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} recruitmentThreads_id - DB recruitment-threads _id / スレッドID
 * @return {Array} 取得データ
 */
const findForDelete = async ({
  
  req,
  localeObj,
  loginUsers_id,
  recruitmentThreads_id,
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Aggregate
    // --------------------------------------------------
    
    const docArr = await SchemaRecruitmentThreads.aggregate([
      
      
      // --------------------------------------------------
      //   Match
      // --------------------------------------------------
      
      {
        $match : { _id: recruitmentThreads_id }
      },
      
      
      // --------------------------------------------------
      //   images-and-videos
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { letImagesAndVideos_id: '$imagesAndVideos_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$letImagesAndVideos_id'] },
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
      
      
      // --------------------------------------------------
      //   コメント
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'recruitment-comments',
            let: { let_id: '$_id' },
            pipeline: [
              
              { $match:
                { $expr:
                  { $eq: ['$recruitmentThreads_id', '$$let_id'] }
                }
              },
              
              
              // --------------------------------------------------
              //   recruitment-replies / images-and-videos - メイン画像
              // --------------------------------------------------
              
              {
                $lookup:
                  {
                    from: 'images-and-videos',
                    let: { letImagesAndVideos_id: '$imagesAndVideos_id' },
                    pipeline: [
                      { $match:
                        { $expr:
                          { $eq: ['$_id', '$$letImagesAndVideos_id'] },
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
              
              
              {
                $project: {
                  imagesAndVideos_id: 1,
                  imagesAndVideosObj: 1,
                }
              },
              
            ],
            as: 'recruitmentCommentsArr'
          }
      },
      
      
      // --------------------------------------------------
      //   返信
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'recruitment-replies',
            let: { let_id: '$_id' },
            pipeline: [
              
              { $match:
                { $expr:
                  { $eq: ['$recruitmentThreads_id', '$$let_id'] }
                }
              },
              
              
              // --------------------------------------------------
              //   recruitment-replies / images-and-videos - メイン画像
              // --------------------------------------------------
              
              {
                $lookup:
                  {
                    from: 'images-and-videos',
                    let: { letImagesAndVideos_id: '$imagesAndVideos_id' },
                    pipeline: [
                      { $match:
                        { $expr:
                          { $eq: ['$_id', '$$letImagesAndVideos_id'] },
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
              
              
              {
                $project: {
                  imagesAndVideos_id: 1,
                  imagesAndVideosObj: 1,
                }
              },
              
            ],
            as: 'recruitmentRepliesArr'
          }
      },
      
      
      {
        $project: {
          _id: 1,
          createdDate: 1,
          gameCommunities_id: 1,
          recruitmentThreads_id: 1,
          users_id: 1,
          imagesAndVideos_id: 1,
          imagesAndVideosObj: 1,
          recruitmentCommentsArr: 1,
          recruitmentRepliesArr: 1,
        }
      },
      
      
    ]).exec();
    
    
    
    
    // --------------------------------------------------
    //   配列が空の場合は処理停止
    // --------------------------------------------------
    
    if (docArr.length === 0) {
      throw new CustomError({ level: 'error', errorsArr: [{ code: 'uRvA1Pc9A', messageID: 'cvS0qSAlE' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const docThreadObj = lodashGet(docArr, [0], {});
    
    const gameCommunities_id = lodashGet(docThreadObj, ['gameCommunities_id'], '');
    
    const recruitmentCommentsArr = lodashGet(docThreadObj, ['recruitmentCommentsArr'], []);
    const recruitmentRepliesArr = lodashGet(docThreadObj, ['recruitmentRepliesArr'], []);
    
    
    
    
    // --------------------------------------------------
    //   編集権限がない場合は処理停止
    // --------------------------------------------------
    
    const editable = verifyAuthority({
      
      req,
      users_id: lodashGet(docThreadObj, ['users_id'], ''),
      loginUsers_id,
      ISO8601: lodashGet(docThreadObj, ['createdDate'], ''),
      _id: lodashGet(docThreadObj, ['_id'], '')
      
    });
    
    if (!editable) {
      throw new CustomError({ level: 'error', errorsArr: [{ code: 'r94PLmRoY', messageID: 'DSRlEoL29' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   データ作成
    //   画像や動画の数をカウントしているが不要だった
    // --------------------------------------------------
    
    const comments = - recruitmentCommentsArr.length;
    const replies = - recruitmentRepliesArr.length;
    
    const imagesAndVideos_id = lodashGet(docThreadObj, ['imagesAndVideos_id'], '');
    const imagesAndVideos_idsArr = [];
    
    if (imagesAndVideos_id) {
      imagesAndVideos_idsArr.push(imagesAndVideos_id);
    }
    
    let images = - lodashGet(docThreadObj, ['imagesAndVideosObj', 'images'], 0);
    let videos = - lodashGet(docThreadObj, ['imagesAndVideosObj', 'videos'], 0);
    
    
    // ---------------------------------------------
    //   - Comments
    // ---------------------------------------------
    
    for (let valueObj of recruitmentCommentsArr.values()) {
      
      if (valueObj.imagesAndVideos_id) {
        imagesAndVideos_idsArr.push(valueObj.imagesAndVideos_id);
      }
      
      images -= lodashGet(valueObj, ['imagesAndVideosObj', 'images'], 0);
      videos -= lodashGet(valueObj, ['imagesAndVideosObj', 'videos'], 0);
      
    }
    
    
    // ---------------------------------------------
    //   - Replies
    // ---------------------------------------------
    
    for (let valueObj of recruitmentRepliesArr.values()) {
      
      if (valueObj.imagesAndVideos_id) {
        imagesAndVideos_idsArr.push(valueObj.imagesAndVideos_id);
      }
      
      images -= lodashGet(valueObj, ['imagesAndVideosObj', 'images'], 0);
      videos -= lodashGet(valueObj, ['imagesAndVideosObj', 'videos'], 0);
      
    }
    
    
    const returnObj = {
      
      gameCommunities_id,
      comments,
      replies,
      imagesAndVideos_idsArr,
      images,
      videos,
      
    };
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/recruitment-threads/model.js - findForDelete
    // `);
    
    // console.log(chalk`
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
    //   imagesAndVideos_id: {green ${imagesAndVideos_id}}
    //   editable: {green ${editable} / ${typeof editable}}
    // `);
    
    // console.log(`
    //   ----- docArr -----\n
    //   ${util.inspect(docArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- docThreadObj -----\n
    //   ${util.inspect(docThreadObj, { colors: true, depth: null })}\n
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
    
    
  } catch (err) {
    
    throw err;
    
  }
  
  
};






// --------------------------------------------------
//   transaction
// --------------------------------------------------

/**
 * Transaction 挿入 / 更新する
 * スレッド、画像＆動画、ユーザーコミュニティを同時に更新する
 * 
 * @param {Object} recruitmentThreadsConditionObj - DB recruitment-threads 検索条件
 * @param {Object} recruitmentThreadsSaveObj - DB recruitment-threads 保存データ
 * @param {Object} imagesAndVideosConditionObj - DB images-and-videos 検索条件
 * @param {Object} imagesAndVideosSaveObj - DB images-and-videos 保存データ
 * @param {Object} gameCommunitiesConditionObj - DB game-communities 検索条件
 * @param {Object} gameCommunitiesSaveObj - DB game-communities 保存データ
 * @param {Object} usersConditionObj - DB users 検索条件
 * @param {Object} usersSaveObj - DB users 保存データ
 * @return {Object} 
 */
const transactionForUpsert = async ({
  
  recruitmentThreadsConditionObj,
  recruitmentThreadsSaveObj,
  imagesAndVideosConditionObj = {},
  imagesAndVideosSaveObj = {},
  gameCommunitiesConditionObj = {},
  gameCommunitiesSaveObj = {},
  usersConditionObj = {},
  usersSaveObj = {},
  
}) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Transaction / Session
  // --------------------------------------------------
  
  const session = await SchemaRecruitmentThreads.startSession();
  
  
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Transaction / Start
    // --------------------------------------------------
    
    await session.startTransaction();
    
    
    
    
    // ---------------------------------------------
    //   - recruitment-threads
    // ---------------------------------------------
    
    await SchemaRecruitmentThreads.updateOne(recruitmentThreadsConditionObj, recruitmentThreadsSaveObj, { session, upsert: true });
    
    
    // ---------------------------------------------
    //   - images-and-videos
    // ---------------------------------------------
    
    if (Object.keys(imagesAndVideosConditionObj).length !== 0 && Object.keys(imagesAndVideosSaveObj).length !== 0) {
      
      
      // --------------------------------------------------
      //   画像＆動画を削除する
      // --------------------------------------------------
      
      const arr = lodashGet(imagesAndVideosSaveObj, ['arr'], []);
      
      if (arr.length === 0) {
        
        await SchemaImagesAndVideos.deleteOne(imagesAndVideosConditionObj, { session });
        
        
      // --------------------------------------------------
      //   画像＆動画を保存
      // --------------------------------------------------
        
      } else {
        
        await SchemaImagesAndVideos.updateOne(imagesAndVideosConditionObj, imagesAndVideosSaveObj, { session, upsert: true });
        
      }
      
    }
    
    
    // ---------------------------------------------
    //   - game-communities
    // ---------------------------------------------
    
    if (Object.keys(gameCommunitiesConditionObj).length !== 0 && Object.keys(gameCommunitiesSaveObj).length !== 0) {
      
      await SchemaGameCommunities.updateOne(gameCommunitiesConditionObj, gameCommunitiesSaveObj, { session });
      
    }
    
    
    // ---------------------------------------------
    //   - users
    // ---------------------------------------------
    
    if (Object.keys(usersConditionObj).length !== 0 && Object.keys(usersSaveObj).length !== 0) {
      
      await SchemaUsers.updateOne(usersConditionObj, usersSaveObj, { session });
      
    }
    
    
    
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
    //   ----------------------------------------\n
    //   /app/@database/recruitment-threads/model.js - transactionForUpsert
    // `);
    
    // console.log(`
    //   ----- recruitmentThreadsConditionObj -----\n
    //   ${util.inspect(recruitmentThreadsConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- recruitmentThreadsSaveObj -----\n
    //   ${util.inspect(recruitmentThreadsSaveObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosConditionObj -----\n
    //   ${util.inspect(imagesAndVideosConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosSaveObj -----\n
    //   ${util.inspect(imagesAndVideosSaveObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- gameCommunitiesConditionObj -----\n
    //   ${util.inspect(gameCommunitiesConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- gameCommunitiesSaveObj -----\n
    //   ${util.inspect(gameCommunitiesSaveObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- usersConditionObj -----\n
    //   ${util.inspect(usersConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- usersSaveObj -----\n
    //   ${util.inspect(usersSaveObj, { colors: true, depth: null })}\n
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




/**
 * Transaction スレッドを削除する
 * @param {Object} recruitmentThreadsConditionObj - DB recruitment-threads 検索条件
 * @param {Object} recruitmentCommentsConditionObj - DB recruitment-comments 検索条件
 * @param {Object} recruitmentRepliesConditionObj - DB recruitment-replies 検索条件
 * @param {Object} imagesAndVideosConditionObj - DB images-and-videos 検索条件
 * @param {Object} gameCommunitiesConditionObj - DB game-communities 検索条件
 * @param {Object} gameCommunitiesSaveObj - DB game-communities 保存データ
 * @return {Object} 
 */
const transactionForDelete = async ({
  
  recruitmentThreadsConditionObj,
  recruitmentCommentsConditionObj,
  recruitmentRepliesConditionObj,
  imagesAndVideosConditionObj = {},
  gameCommunitiesConditionObj = {},
  gameCommunitiesSaveObj = {},
  
}) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Transaction / Session
  // --------------------------------------------------
  
  const session = await SchemaRecruitmentThreads.startSession();
  
  
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Transaction / Start
    // --------------------------------------------------
    
    await session.startTransaction();
    
    
    
    
    // ---------------------------------------------
    //   - recruitment-threads / updateOne
    // ---------------------------------------------
    
    await SchemaRecruitmentThreads.deleteOne(recruitmentThreadsConditionObj, { session });
    
    
    // ---------------------------------------------
    //   - recruitment-comments / deleteMany
    // ---------------------------------------------
    
    await SchemaRecruitmentComments.deleteMany(recruitmentCommentsConditionObj, { session });
    
    
    // --------------------------------------------------
    //   - recruitment-replies / deleteMany
    // --------------------------------------------------
    
    await SchemaRecruitmentReplies.deleteMany(recruitmentRepliesConditionObj, { session });
    
    
    // ---------------------------------------------
    //   - images-and-videos / deleteMany
    // ---------------------------------------------
    
    if (Object.keys(imagesAndVideosConditionObj).length !== 0) {
      await SchemaImagesAndVideos.deleteMany(imagesAndVideosConditionObj, { session });
    }
    
    
    // ---------------------------------------------
    //   - game-communities / updateOne
    // ---------------------------------------------
    
    if (Object.keys(gameCommunitiesConditionObj).length !== 0 && Object.keys(gameCommunitiesSaveObj).length !== 0) {
      await SchemaGameCommunities.updateOne(gameCommunitiesConditionObj, gameCommunitiesSaveObj, { session });
    }
    
    
    
    
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
    //   ----------------------------------------\n
    //   /app/@database/recruitment-threads/model.js - transactionForDelete
    // `);
    
    // console.log(`
    //   ----- recruitmentThreadsConditionObj -----\n
    //   ${util.inspect(recruitmentThreadsConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- recruitmentCommentsConditionObj -----\n
    //   ${util.inspect(recruitmentCommentsConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- recruitmentRepliesConditionObj -----\n
    //   ${util.inspect(recruitmentRepliesConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosConditionObj -----\n
    //   ${util.inspect(imagesAndVideosConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- gameCommunitiesConditionObj -----\n
    //   ${util.inspect(gameCommunitiesConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- gameCommunitiesSaveObj -----\n
    //   ${util.inspect(gameCommunitiesSaveObj, { colors: true, depth: null })}\n
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
  
  findRecruitments,
  findRecruitmentByRecruitmentID,
  findRecruitmentsForSearch,
  findOneForEdit,
  findForDelete,
  
  transactionForUpsert,
  transactionForDelete,
  
};