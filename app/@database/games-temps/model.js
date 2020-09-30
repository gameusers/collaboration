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
const lodashSet = require('lodash/set');
const lodashHas = require('lodash/has');
const lodashCloneDeep = require('lodash/cloneDeep');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const SchemaGames = require('./schema');

const ModelDevelopersPublishers = require('../developers-publishers/model.js');


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { formatImagesAndVideosObj } = require('../images-and-videos/format');






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

    return await SchemaGames.findOne(conditionObj).exec();


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

    return await SchemaGames.find(conditionObj).exec();


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

    return await SchemaGames.countDocuments(conditionObj).exec();


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

    return await SchemaGames.findOneAndUpdate(conditionObj, saveObj, { upsert: true, new: true, setDefaultsOnInsert: true }).exec();


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

    return await SchemaGames.insertMany(saveArr);


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

    return await SchemaGames.deleteMany(conditionObj);


  } catch (err) {

    throw err;

  }

};






/**
 * 取得する / サジェスト用のデータ
 * @param {string} language - 言語
 * @param {string} country - 国
 * @param {string} keyword - 検索キーワード
 * @return {Array} 取得データ
 */
const findBySearchKeywordsArrForSuggestion = async ({ localeObj, keyword }) => {


  // --------------------------------------------------
  //   Database
  // --------------------------------------------------

  try {


    // --------------------------------------------------
    //   Property
    // --------------------------------------------------

    const pattern = new RegExp(`.*${keyword}.*`);
    const language = lodashGet(localeObj, ['language'], '');
    const country = lodashGet(localeObj, ['country'], '');




    // --------------------------------------------------
    //   Aggregation
    // --------------------------------------------------

    const resultArr = await SchemaGames.aggregate([


      {
        $match : { language, country, searchKeywordsArr: { $regex: pattern, $options: 'i' } }
      },


      // --------------------------------------------------
      //   images-and-videos / サムネイル用
      // --------------------------------------------------

      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { letImagesAndVideosThumbnail_id: '$imagesAndVideosThumbnail_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$letImagesAndVideosThumbnail_id']
                  },
                }
              },
              {
                $project: {
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


      // --------------------------------------------------
      //   $project
      // --------------------------------------------------

      {
        $project: {
          gameCommunities_id: 1,
          name: 1,
          imagesAndVideosThumbnailObj: 1,
        }
      },


    ]).exec();




    // --------------------------------------------------
    //   Loop
    // --------------------------------------------------

    // const returnArr = [];

    // for (let valueObj of resultArr.values()) {

    //   // console.log(`\n---------- valueObj ----------\n`);
    //   // console.dir(valueObj);
    //   // console.log(`\n-----------------------------------\n`);


    //   // --------------------------------------------------
    //   //   Deep Copy
    //   // --------------------------------------------------

    //   const clonedObj = lodashCloneDeep(valueObj);


    //   // --------------------------------------------------
    //   //   画像と動画の処理
    //   // --------------------------------------------------

    //   const formattedObj = formatImagesAndVideosObj({ localeObj, obj: valueObj.imagesAndVideosObj });

    //   if (formattedObj) {

    //     clonedObj.imagesAndVideosObj = formattedObj;

    //   } else {

    //     delete clonedObj.imagesAndVideosObj;

    //   }

    //   // console.log(`\n---------- clonedObj ----------\n`);
    //   // console.dir(clonedObj);
    //   // console.log(`\n-----------------------------------\n`);

    //   // --------------------------------------------------
    //   //   Push
    //   // --------------------------------------------------

    //   returnArr.push(clonedObj);


    // }


    // console.log(`
    //   ----- resultArr -----\n
    //   ${util.inspect(resultArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- returnArr -----\n
    //   ${util.inspect(returnArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);


    // --------------------------------------------------
    //   Return
    // --------------------------------------------------

    return resultArr;


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

  findBySearchKeywordsArrForSuggestion,

};
