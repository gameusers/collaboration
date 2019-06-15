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

const lodashGet = require('lodash/get');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const SchemaForumThreads = require('./schema');


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { formatImagesAndVideosArr } = require('../../@format/image');




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









/**
 * 検索してデータを取得する / User 用（サムネイル・ハンドルネーム・ステータス）
 * @param {Object} localeObj - ロケール
 * @param {Object} conditionObj - 検索条件
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @return {Object} 取得データ
 */
const findForThreadsAndComments = async ({ localeObj, conditionObj }) => {
  
  console.log('findForThreadsAndComments');
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   データ取得
    // --------------------------------------------------
    
    let resultArr = await SchemaForumThreads.aggregate([
      
      {
        $match : conditionObj
      },
      
      
      {
        $lookup:
          {
            from: 'forum-comments',
            let: { forumThreads_id: '$_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$forumThreads_id', '$$forumThreads_id'] }
                    ]
                  },
                }
              },
              { '$sort': { 'updatedDate': -1 }},
              { $skip: 0 },
              { $limit: 10 },
              // { $project:
              //   {
              //     createdDate: 0,
              //     // nameObj: 1,
              //     // statusObj: 1,
              //     // imagesAndVideosObj: 1,
              //   }
              // }
            ],
            as: 'forumCommentsArr'
          }
      },
      
      
      // {
      //   $lookup:
      //     {
      //       from: 'forum-comments',
      //       let: { forumComments_id: 'forumCommentsArr.forumComments_id' },
      //       pipeline: [
      //         { $match:
      //           { $expr:
      //             { $and:
      //               [
      //                 { $eq: ['$forumComments_id', '$$forumComments_id'] }
      //               ]
      //             },
      //           }
      //         },
      //         // { '$sort': { 'updatedDate': -1 }},
      //         // { $skip: 1 },
      //         // { $limit: 1 },
      //         // { $project:
      //         //   {
      //         //     _id: 0,
      //         //     nameObj: 1,
      //         //     statusObj: 1,
      //         //     imagesAndVideosObj: 1,
      //         //   }
      //         // }
      //       ],
      //       as: 'forumComments2Arr'
      //     }
      // },
      
      
      // {
      //   $project: {
      //     __v: 0,
      //     createdDate: 0,
      //     updatedDate: 0,
      //     loginID: 0,
      //     loginPassword: 0,
      //     emailObj: 0,
      //     country: 0,
      //   }
      // },
      
    ]).exec();
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- localeObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(localeObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    console.log(`
      ----- conditionObj -----\n
      ${util.inspect(JSON.parse(JSON.stringify(conditionObj)), { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    // `);
    
    console.log(`
      ----- resultArr -----\n
      ${util.inspect(JSON.parse(JSON.stringify(resultArr)), { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(returnObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    const returnObj = {};
    return returnObj;
    
    
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
  findForThreadsAndComments,
};