// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');
const lodashHas = require('lodash/has');
const lodashCloneDeep = require('lodash/cloneDeep');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const SchemaAchievements = require('./schema');

const ModelExperiences = require('../experiences/model');






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
    
    return await SchemaAchievements.findOne(conditionObj).exec();
    
    
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
    
    return await SchemaAchievements.find(conditionObj).exec();
    
    
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
    
    return await SchemaAchievements.countDocuments(conditionObj).exec();
    
    
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
    
    return await SchemaAchievements.findOneAndUpdate(conditionObj, saveObj, { upsert: true, new: true, setDefaultsOnInsert: true }).exec();
    
    
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
    
    return await SchemaAchievements.insertMany(saveArr);
    
    
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
    
    return await SchemaAchievements.deleteMany(conditionObj);
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};






/**
 * 
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {Array} matchConditionArr - 検索条件
 * @param {number} threadPage - スレッドのページ
 * @param {number} threadLimit - スレッドのリミット
 * @return {Array} 取得データ
 */
const findForEdit = async ({
  
  // req,
  localeObj,
  loginUsers_id,
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Language
    // --------------------------------------------------
    
    const language = lodashGet(localeObj, ['language'], '');
    
    
    
    
    // --------------------------------------------------
    //   DB findOne / experiences
    // --------------------------------------------------
    
    const docExperiencesObj = await ModelExperiences.findOne({
      
      conditionObj: {
        users_id: loginUsers_id
      }
      
    });
    
    
    
    
    // --------------------------------------------------
    //   Aggregation
    // --------------------------------------------------
    
    const docArr = await SchemaAchievements.aggregate([
      
      
      // --------------------------------------------------
      //   titles
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'titles',
            let: { letTitles_id: '$conditionsArr.titles_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$language', language] },
                      { $in: ['$_id', '$$letTitles_id'] },
                      // { $eq: ['$_id', '$$letTitles_id'] }
                    ]
                  },
                }
              },
              // {
              //   $group: {
              //     _id: '$_id',
              //     // name: '$name',
              //   }
              // },
              {
                $project: {
                  // _id: 0,
                  urlID: 1,
                  name: 1,
                }
              }
            ],
            as: 'titlesArr'
          }
      },
      
      // {
      //   $unwind: {
      //     path: '$titlesObj',
      //     preserveNullAndEmptyArrays: true,
      //   }
      // },
      
      
      // --------------------------------------------------
      //   $project
      // --------------------------------------------------
      
      {
        $project: {
          _id: 0,
          __v: 0,
        }
      },
      
      
    ]).exec();
    
    
    
    
    // --------------------------------------------------
    //   experiences
    // --------------------------------------------------
    
    const experiencesObj = {
      
      achievementsArr: lodashGet(docExperiencesObj, ['achievementsArr'], []),
      titlesArr: lodashGet(docExperiencesObj, ['titlesArr'], []),
      titles_idsArr: lodashGet(docExperiencesObj, ['titles_idsArr'], []),
      
    };
    
    
    // const achievementsArr = lodashGet(docExperiencesObj, ['achievementsArr'], []);
    // const titlesArr = lodashGet(docExperiencesObj, ['titlesArr'], []);
    // const titles_idsArr = lodashGet(docExperiencesObj, ['titles_idsArr'], []);
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/achievements/model.js - findForEdit
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
    //   ----- docExperiencesObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(docExperiencesObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- docArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(docArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return {
      
      experiencesObj,
      achievementsArr: docArr,
      
    };
    
    
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
  
  findForEdit,
  // findBySearchKeywordsArrForSuggestion,
  
};