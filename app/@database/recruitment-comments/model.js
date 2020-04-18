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

const Schema = require('./schema');
const SchemaRecruitmentThreads = require('../recruitment-threads/schema');
// const SchemaForumComments = require('../forum-comments/schema');
const SchemaImagesAndVideos = require('../images-and-videos/schema');
const SchemaGameCommunities = require('../game-communities/schema');
const SchemaUsers = require('../users/schema');

// const ModelForumComments = require('../forum-comments/model');
// const ModelGameCommunities = require('../game-communities/model');
// const ModelUserCommunities = require('../user-communities/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

// const { CustomError } = require('../../@modules/error/custom');
// const { verifyAuthority } = require('../../@modules/authority');


// ---------------------------------------------
//   Format
// ---------------------------------------------

// const { formatRecruitmentThreadsArr } = require('./format');




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
    
    return await Schema.findOne(conditionObj).exec();
    
    
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
    
    return await Schema.find(conditionObj).exec();
    
    
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
    
    return await Schema.countDocuments(conditionObj).exec();
    
    
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
    
    return await Schema.findOneAndUpdate(conditionObj, saveObj, { upsert: true, new: true, setDefaultsOnInsert: true }).exec();
    
    
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
    
    return await Schema.insertMany(saveArr);
    
    
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
    
    return await Schema.deleteMany(conditionObj);
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};






// --------------------------------------------------
//   募集
// --------------------------------------------------





/**
* Transaction 挿入 / 更新する
* スレッド、画像＆動画、ユーザーコミュニティを同時に更新する
* 
* @param {Object} recruitmentThreadsConditionObj - DB recruitment-threads 検索条件
* @param {Object} recruitmentThreadsSaveObj - DB recruitment-threads 保存データ
* @param {Object} recruitmentCommentsConditionObj - DB recruitment-comments 検索条件
* @param {Object} recruitmentCommentsSaveObj - DB recruitment-comments 保存データ
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
  recruitmentCommentsConditionObj,
  recruitmentCommentsSaveObj,
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
  
  const session = await Schema.startSession();
  
  
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Transaction / Start
    // --------------------------------------------------
    
    await session.startTransaction();
    
    
    
    // ---------------------------------------------
    //   - recruitment-comments
    // ---------------------------------------------
    
    await Schema.updateOne(recruitmentCommentsConditionObj, recruitmentCommentsSaveObj, { session, upsert: true });
    
    
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
    
    console.log(`
      ----------------------------------------\n
      /app/@database/recruitment-comments/model.js - transactionForUpsert
    `);
    
    console.log(`
      ----- recruitmentThreadsConditionObj -----\n
      ${util.inspect(recruitmentThreadsConditionObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    console.log(`
      ----- recruitmentThreadsSaveObj -----\n
      ${util.inspect(recruitmentThreadsSaveObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    console.log(`
      ----- recruitmentCommentsConditionObj -----\n
      ${util.inspect(recruitmentCommentsConditionObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    console.log(`
      ----- recruitmentCommentsSaveObj -----\n
      ${util.inspect(recruitmentCommentsSaveObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
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
    
    console.log(`
      ----- gameCommunitiesConditionObj -----\n
      ${util.inspect(gameCommunitiesConditionObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    console.log(`
      ----- gameCommunitiesSaveObj -----\n
      ${util.inspect(gameCommunitiesSaveObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    console.log(`
      ----- usersConditionObj -----\n
      ${util.inspect(usersConditionObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    console.log(`
      ----- usersSaveObj -----\n
      ${util.inspect(usersSaveObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
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
  
  // findForRecruitment,
  // findOneForEdit,
  // findForDeleteThread,
  transactionForUpsert,
  // transactionForDeleteThread,
  
};