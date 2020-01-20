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


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { formatImagesAndVideosArr, formatImagesAndVideosObj } = require('../images-and-videos/format');




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







/**
 * 検索してデータを取得する / For User Community
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} userCommunityID - DB user-communities userCommunityID / コミュニティID
 * @return {Array}取得データ
 */
const findForUserCommunity = async ({ localeObj, loginUsers_id, userCommunityID }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Condition
    // --------------------------------------------------
    
    const conditionObj = {
      userCommunityID,
    };
    
    
    // --------------------------------------------------
    //   Find
    // --------------------------------------------------
    
    const resultArr = await Schema.find(conditionObj).exec();
    
    
    // --------------------------------------------------
    //   Format
    // --------------------------------------------------
    
    const formattedArr = format({
      localeObj,
      loginUsers_id,
      arr: resultArr,
    });
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   userCommunityID: {green ${userCommunityID}}
    // `);
    
    // console.log(`
    //   ----- Threads -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(resultArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return formattedArr;
    
    
  } catch (err) {
    
    throw err;
    
  }
  
  
};




/**
* DBから取得した情報をフォーマットする
* @param {Object} localeObj - ロケール
* @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
* @param {Array} arr - 配列
* @return {Array}フォーマット後のデータ
*/
const format = ({ localeObj, loginUsers_id, arr }) => {
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----- localeObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(localeObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(chalk`
  //   loginUsers_id: {green ${loginUsers_id}}
  // `);
  
  // console.log(`
  //   ----- arr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnArr = [];
  
  
  // --------------------------------------------------
  //   Loop
  // --------------------------------------------------
  
  for (let obj of arr.values()) {
    
    
    // --------------------------------------------------
    //   toJSON
    // --------------------------------------------------
    
    let valueObj = obj.toJSON();
    
    
    // --------------------------------------------------
    //   Datetime
    // --------------------------------------------------
    
    // cloneObj.updatedDate = moment(valueObj.updatedDate).format('YYYY/MM/DD hh:mm');
    
    
    // --------------------------------------------------
    //   画像の処理
    // --------------------------------------------------
    // とりあえず画像の処理はしない
    // valueObj.imagesAndVideosObj.thumbnailArr = formatImagesAndVideosArr({ arr: valueObj.imagesAndVideosObj.thumbnailArr });
    // valueObj.imagesAndVideosObj.mainArr = formatImagesAndVideosArr({ arr: valueObj.imagesAndVideosObj.mainArr });
    
    
    // --------------------------------------------------
    //   Locale
    // --------------------------------------------------
    
    const filteredArr = valueObj.localesArr.filter((filterObj) => {
      return filterObj.language === localeObj.language;
    });
    
    
    if (lodashHas(filteredArr, [0])) {
      
      valueObj.name = lodashGet(filteredArr, [0, 'name'], '');;
      valueObj.description = lodashGet(filteredArr, [0, 'description'], '');
      
    } else {
      
      valueObj.name = lodashGet(valueObj, ['localesArr', 0, 'name'], '');
      valueObj.description = lodashGet(valueObj, ['localesArr', 0, 'description'], '');
      
    }
    
    
    // console.log(`
    //   ----- filteredArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(filteredArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   不要な項目を削除する
    // --------------------------------------------------
    
    delete valueObj.localesArr;
    delete valueObj.__v;
    
    // console.log(`\n---------- valueObj ----------\n`);
    // console.dir(valueObj);
    // console.log(`\n-----------------------------------\n`);
    
    
    // --------------------------------------------------
    //   push
    // --------------------------------------------------
    
    returnArr.push(valueObj);
    
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return returnArr;
  
  
};




/**
 * ユーザーコミュニティ設定用のデータを取得する
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} userCommunityID - DB user-communities userCommunityID / コミュニティID
 * @return {Array}取得データ
 */
const findForUserCommunitySettings = async ({ localeObj, loginUsers_id, userCommunityID }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const language = lodashGet(localeObj, ['language'], '');
    const country = lodashGet(localeObj, ['country'], '');
    
    
    // --------------------------------------------------
    //   Aggregation
    // --------------------------------------------------
    
    const resultArr = await Schema.aggregate([
      
      
      {
        $match : { userCommunityID }
      },
      
      
      // 関連するゲーム
      {
        $lookup:
          {
            from: 'games',
            let: { gameCommunities_idsArr: '$gameCommunities_idsArr' },
            pipeline: [
              
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$language', language] },
                      { $eq: ['$country', country] },
                      { $in: ['$gameCommunities_id', '$$gameCommunities_idsArr'] },
                    ]
                  },
                }
              },
              
              
              // 画像と動画を取得
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
                  gameCommunities_id: 1,
                  name: 1,
                  imagesAndVideosObj: 1,
                }
              },
            ],
            as: 'gamesArr'
          }
      },
      
      // {
      //   $unwind: {
      //     path: '$gamesArr',
      //     preserveNullAndEmptyArrays: true,
      //   }
      // },
      
      
      // 画像と動画を取得 - トップ画像
      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { imagesAndVideos_id: '$imagesAndVideos_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$imagesAndVideos_id'] },
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
      
      
      // 画像と動画を取得 - サムネイル画像
      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { imagesAndVideosThumbnail_id: '$imagesAndVideosThumbnail_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$imagesAndVideosThumbnail_id'] },
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
      
      
      // Follows
      {
        $lookup:
          {
            from: 'follows',
            let: { uc_id: '$_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$userCommunities_id', '$$uc_id'] },
                }
              },
              { $project:
                {
                  _id: 0,
                  approval: 1,
                }
              }
            ],
            as: 'followsObj'
          }
      },
      
      {
        $unwind: {
          path: '$followsObj',
          preserveNullAndEmptyArrays: true,
        }
      },
      
      
      { $project:
        {
          userCommunityID: 1,
          users_id: 1,
          localesArr: 1,
          communityType: 1,
          anonymity: 1,
          imagesAndVideosObj: 1,
          imagesAndVideosThumbnailObj: 1,
          gamesArr: 1,
          followsObj: 1,
        }
      },
      
      
    ]).exec();
    
    
    // --------------------------------------------------
    //   Format
    // --------------------------------------------------
    
    const returnObj = lodashGet(resultArr, [0], {});
    
    // const ucObj = lodashGet(resultArr, [0], {});
    
    // const formattedUcArr = formatImagesAndVideosArr({ localeObj, arr: resultArr });
    // const formattedUcObj = lodashGet(formattedUcArr, [0], {});
    
    // const gamesArr = lodashGet(ucObj, ['gamesArr'], []);
    // const formattedGamesArr = formatImagesAndVideosArr({ localeObj, arr: gamesArr });
    
    // const returnObj = formattedUcObj;
    // returnObj.gamesArr = formattedGamesArr;
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   userCommunityID: {green ${userCommunityID}}
    // `);
    
    // console.log(`
    //   ----- resultArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(resultArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- formattedUcArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(formattedUcArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- formattedGamesArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(formattedGamesArr)), { colors: true, depth: null })}\n
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
//   Export
// --------------------------------------------------

module.exports = {
  
  findOne,
  find,
  count,
  upsert,
  insertMany,
  deleteMany,
  
  findForUserCommunity,
  findForUserCommunitySettings,
  
};