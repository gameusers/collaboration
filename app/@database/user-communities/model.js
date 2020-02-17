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
const SchemaImagesAndVideos = require('../images-and-videos/schema');
const SchemaFollows = require('../follows/schema');


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
 * @param {string} userCommunities_id - DB user-communities _id
 * @param {string} userCommunityID - DB user-communities userCommunityID / コミュニティID
 * @return {Array}取得データ
 */
const findForUserCommunity = async ({ localeObj, loginUsers_id, userCommunities_id, userCommunityID }) => {
  
  
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
    //   Match Condition Array
    // --------------------------------------------------
    
    let matchConditionArr = [
      {
        $match : { _id: userCommunities_id }
      },
    ];
    
    if (userCommunityID) {
      
      matchConditionArr = [
        {
          $match : { userCommunityID }
        },
      ];
      
    }
    
    
    // --------------------------------------------------
    //   Aggregation
    // --------------------------------------------------
    
    const resultArr = await Schema.aggregate([
      
      
      ...matchConditionArr,
      
      
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
                  urlID: 1,
                  name: 1,
                  imagesAndVideosObj: 1,
                }
              },
            ],
            as: 'gamesArr'
          }
      },
      
      
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
                  followedArr: 1,
                  approvalArr: 1,
                  blockArr: 1,
                  followedCount: 1,
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
          users_id: 1,
          createdDate: 1,
          localesArr: 1,
          communityType: 1,
          anonymity: 1,
          imagesAndVideosObj: 1,
          gamesArr: 1,
          followsObj: 1,
        }
      },
      
      
    ]).exec();
    
    
    // console.log(`
    //   ----- resultArr -----\n
    //   ${util.inspect(resultArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Format
    // --------------------------------------------------
    
    const returnObj = lodashGet(resultArr, [0], {});
    const headerObj = {};
    
    
    // --------------------------------------------------
    //   画像の処理
    // --------------------------------------------------
    
    if (returnObj.imagesAndVideosObj) {
      headerObj.imagesAndVideosObj = formatImagesAndVideosObj({ obj: returnObj.imagesAndVideosObj });
    }
    
    
    // --------------------------------------------------
    //   画像の処理 - 関連するゲーム
    // --------------------------------------------------
    
    if (returnObj.gamesArr) {
      headerObj.gamesArr = formatImagesAndVideosArr({ arr: returnObj.gamesArr });
    }
    
    
    // --------------------------------------------------
    //   Locale / name & description
    // --------------------------------------------------
    
    const localesArr = lodashGet(returnObj, ['localesArr'], []);
    
    const filteredArr = localesArr.filter((filterObj) => {
      return filterObj.language === localeObj.language;
    });
    
    
    if (lodashHas(filteredArr, [0])) {
      
      returnObj.name = lodashGet(filteredArr, [0, 'name'], '');;
      returnObj.description = lodashGet(filteredArr, [0, 'description'], '');
      
    } else {
      
      returnObj.name = lodashGet(localesArr, [0, 'name'], '');
      returnObj.description = lodashGet(localesArr, [0, 'description'], '');
      
    }
    
    
    // --------------------------------------------------
    //   member
    // --------------------------------------------------
    
    headerObj.author = false;
    headerObj.member = false;
    headerObj.memberApproval = false;
    headerObj.memberBlocked = false;
    
    if (loginUsers_id) {
      
      const users_id = lodashGet(returnObj, ['users_id'], '');
      const followedArr = lodashGet(returnObj, ['followsObj', 'followedArr'], []);
      const approvalArr = lodashGet(returnObj, ['followsObj', 'approvalArr'], []);
      const blockArr = lodashGet(returnObj, ['followsObj', 'blockArr'], []);
      
      if (users_id === loginUsers_id) {
        headerObj.author = true;
      }
      
      if (followedArr.includes(loginUsers_id)) {
        headerObj.member = true;
      }
      
      if (approvalArr.includes(loginUsers_id)) {
        headerObj.memberApproval = true;
      }
      
      if (blockArr.includes(loginUsers_id)) {
        headerObj.memberBlocked = true;
      }
      
    }
    
    
    
    
    // --------------------------------------------------
    //   headerObj
    // --------------------------------------------------
    
    headerObj.userCommunities_id = returnObj._id;
    headerObj.type = 'uc';
    headerObj.createdDate = returnObj.createdDate;
    headerObj.name = returnObj.name;
    headerObj.approval = lodashGet(returnObj, ['followsObj', 'approval'], false);
    headerObj.followedCount = lodashGet(returnObj, ['followsObj', 'followedCount'], 0);
    
    returnObj.headerObj = headerObj;
    
    
    // --------------------------------------------------
    //   followedCount
    // --------------------------------------------------
    
    // returnObj.followedCount = lodashGet(returnObj, ['followsObj', 'followedCount'], 0);
    
    
    // console.log(`
    //   ----- filteredArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(filteredArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   不要な項目を削除する
    // --------------------------------------------------
    
    delete returnObj.createdDate;
    delete returnObj.localesArr;
    delete returnObj.gamesArr;
    delete returnObj.imagesAndVideosObj;
    delete returnObj.followsObj;
    
    
    // const formattedArr = format({
      
    //   localeObj,
    //   loginUsers_id,
    //   arr: resultArr,
      
    // });
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   userCommunityID: {green ${userCommunityID}}
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




/**
* DBから取得した情報をフォーマットする
* @param {Object} localeObj - ロケール
* @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
* @param {Array} arr - 配列
* @return {Array}フォーマット後のデータ
*/
// const format = ({ localeObj, loginUsers_id, arr }) => {
  
  
//   // --------------------------------------------------
//   //   console.log
//   // --------------------------------------------------
  
//   // console.log(`
//   //   ----- localeObj -----\n
//   //   ${util.inspect(JSON.parse(JSON.stringify(localeObj)), { colors: true, depth: null })}\n
//   //   --------------------\n
//   // `);
  
//   // console.log(chalk`
//   //   loginUsers_id: {green ${loginUsers_id}}
//   // `);
  
//   // console.log(`
//   //   ----- arr -----\n
//   //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
//   //   --------------------\n
//   // `);
  
  
//   // --------------------------------------------------
//   //   Return Value
//   // --------------------------------------------------
  
//   let returnArr = [];
  
  
//   // --------------------------------------------------
//   //   Loop
//   // --------------------------------------------------
  
//   for (let valueObj of arr.values()) {
    
    
//     // --------------------------------------------------
//     //   toJSON
//     // --------------------------------------------------
    
//     // let valueObj = obj.toJSON();
    
    
//     // --------------------------------------------------
//     //   Datetime
//     // --------------------------------------------------
    
//     // cloneObj.updatedDate = moment(valueObj.updatedDate).format('YYYY/MM/DD hh:mm');
    
    
//     // --------------------------------------------------
//     //   画像の処理
//     // --------------------------------------------------
//     // とりあえず画像の処理はしない
//     // valueObj.imagesAndVideosObj.thumbnailArr = formatImagesAndVideosArr({ arr: valueObj.imagesAndVideosObj.thumbnailArr });
//     // valueObj.imagesAndVideosObj.mainArr = formatImagesAndVideosArr({ arr: valueObj.imagesAndVideosObj.mainArr });
    
    
//     // --------------------------------------------------
//     //   Locale
//     // --------------------------------------------------
    
//     const filteredArr = valueObj.localesArr.filter((filterObj) => {
//       return filterObj.language === localeObj.language;
//     });
    
    
//     if (lodashHas(filteredArr, [0])) {
      
//       valueObj.name = lodashGet(filteredArr, [0, 'name'], '');;
//       valueObj.description = lodashGet(filteredArr, [0, 'description'], '');
      
//     } else {
      
//       valueObj.name = lodashGet(valueObj, ['localesArr', 0, 'name'], '');
//       valueObj.description = lodashGet(valueObj, ['localesArr', 0, 'description'], '');
      
//     }
    
    
//     // console.log(`
//     //   ----- filteredArr -----\n
//     //   ${util.inspect(JSON.parse(JSON.stringify(filteredArr)), { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
    
//     // --------------------------------------------------
//     //   不要な項目を削除する
//     // --------------------------------------------------
    
//     delete valueObj.localesArr;
//     delete valueObj.__v;
    
//     // console.log(`\n---------- valueObj ----------\n`);
//     // console.dir(valueObj);
//     // console.log(`\n-----------------------------------\n`);
    
    
//     // --------------------------------------------------
//     //   push
//     // --------------------------------------------------
    
//     returnArr.push(valueObj);
    
    
//   }
  
  
//   // --------------------------------------------------
//   //   Return
//   // --------------------------------------------------
  
//   return returnArr;
  
  
// };




/**
 * ユーザーコミュニティ設定用のデータを取得する
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} userCommunityID - DB user-communities userCommunityID / コミュニティID
 * @param {string} userCommunities_id - DB user-communities _id / _id
 * @return {Array}取得データ
 */
const findForUserCommunitySettings = async ({ localeObj, loginUsers_id, userCommunityID, userCommunities_id }) => {
  
  
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
    //   Match Condition Array
    // --------------------------------------------------
    
    let matchConditionArr = [
      {
        $match : { userCommunityID, users_id: loginUsers_id }
      },
    ];
    
    if (userCommunities_id) {
      
      matchConditionArr = [
        {
          $match : { _id: userCommunities_id, users_id: loginUsers_id }
        },
      ];
      
    }
    
    
    // --------------------------------------------------
    //   Aggregation
    // --------------------------------------------------
    
    const resultArr = await Schema.aggregate([
      
      
      ...matchConditionArr,
      
      
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
                  gameCommunities_id: 1,
                  name: 1,
                  imagesAndVideosThumbnailObj: 1,
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
    //   
    // --------------------------------------------------
    
    const returnObj = lodashGet(resultArr, [0], {});
    
    
    // --------------------------------------------------
    //   画像の処理 - 関連するゲーム
    // --------------------------------------------------
    
    if (returnObj.gamesArr) {
      returnObj.gamesArr = formatImagesAndVideosArr({ arr: returnObj.gamesArr });
    }
    
    
    
    
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






/**
 * ユーザーコミュニティ設定用のデータを取得する
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} userCommunityID - DB user-communities userCommunityID / コミュニティID
 * @param {string} userCommunities_id - DB user-communities _id / _id
 * @return {Array}取得データ
 */
// const findForUserCommunityHeroImage = async ({ localeObj, loginUsers_id, userCommunityID }) => {
  
  
//   // --------------------------------------------------
//   //   Database
//   // --------------------------------------------------
  
//   try {
    
    
//     // --------------------------------------------------
//     //   Property
//     // --------------------------------------------------
    
//     const language = lodashGet(localeObj, ['language'], '');
//     const country = lodashGet(localeObj, ['country'], '');
    
    
//     // --------------------------------------------------
//     //   Aggregation
//     // --------------------------------------------------
    
//     const resultArr = await Schema.aggregate([
      
      
//       {
//         $match : { userCommunityID }
//       },
      
      
//       // 関連するゲーム
//       {
//         $lookup:
//           {
//             from: 'games',
//             let: { gameCommunities_idsArr: '$gameCommunities_idsArr' },
//             pipeline: [
              
//               { $match:
//                 { $expr:
//                   { $and:
//                     [
//                       { $eq: ['$language', language] },
//                       { $eq: ['$country', country] },
//                       { $in: ['$gameCommunities_id', '$$gameCommunities_idsArr'] },
//                     ]
//                   },
//                 }
//               },
              
              
//               // 画像と動画を取得
//               {
//                 $lookup:
//                   {
//                     from: 'images-and-videos',
//                     let: { gamesImagesAndVideosThumbnail_id: '$imagesAndVideosThumbnail_id' },
//                     pipeline: [
//                       { $match:
//                         { $expr:
//                           { $eq: ['$_id', '$$gamesImagesAndVideosThumbnail_id'] },
//                         }
//                       },
//                       { $project:
//                         {
//                           createdDate: 0,
//                           updatedDate: 0,
//                           users_id: 0,
//                           __v: 0,
//                         }
//                       }
//                     ],
//                     as: 'imagesAndVideosObj'
//                   }
//               },
              
//               {
//                 $unwind: {
//                   path: '$imagesAndVideosObj',
//                   preserveNullAndEmptyArrays: true,
//                 }
//               },
              
              
//               { $project:
//                 {
//                   gameCommunities_id: 1,
//                   name: 1,
//                   imagesAndVideosObj: 1,
//                 }
//               },
//             ],
//             as: 'gamesArr'
//           }
//       },
      
      
//       // 画像と動画を取得 - トップ画像
//       {
//         $lookup:
//           {
//             from: 'images-and-videos',
//             let: { imagesAndVideos_id: '$imagesAndVideos_id' },
//             pipeline: [
//               { $match:
//                 { $expr:
//                   { $eq: ['$_id', '$$imagesAndVideos_id'] },
//                 }
//               },
//               { $project:
//                 {
//                   createdDate: 0,
//                   updatedDate: 0,
//                   users_id: 0,
//                   __v: 0,
//                 }
//               }
//             ],
//             as: 'imagesAndVideosObj'
//           }
//       },
      
//       {
//         $unwind: {
//           path: '$imagesAndVideosObj',
//           preserveNullAndEmptyArrays: true,
//         }
//       },
      
      
//       // Follows
//       {
//         $lookup:
//           {
//             from: 'follows',
//             let: { uc_id: '$_id' },
//             pipeline: [
//               { $match:
//                 { $expr:
//                   { $eq: ['$userCommunities_id', '$$uc_id'] },
//                 }
//               },
//               { $project:
//                 {
//                   _id: 0,
//                   approval: 1,
//                 }
//               }
//             ],
//             as: 'followsObj'
//           }
//       },
      
//       {
//         $unwind: {
//           path: '$followsObj',
//           preserveNullAndEmptyArrays: true,
//         }
//       },
      
      
//       { $project:
//         {
//           userCommunityID: 1,
//           users_id: 1,
//           localesArr: 1,
//           communityType: 1,
//           anonymity: 1,
//           imagesAndVideosObj: 1,
//           imagesAndVideosThumbnailObj: 1,
//           gamesArr: 1,
//           followsObj: 1,
//         }
//       },
      
      
//     ]).exec();
    
    
//     // --------------------------------------------------
//     //   Format
//     // --------------------------------------------------
    
//     const returnObj = lodashGet(resultArr, [0], {});
    
    
//     // --------------------------------------------------
//     //   console.log
//     // --------------------------------------------------
    
//     // console.log(chalk`
//     //   loginUsers_id: {green ${loginUsers_id}}
//     //   userCommunityID: {green ${userCommunityID}}
//     // `);
    
//     // console.log(`
//     //   ----- resultArr -----\n
//     //   ${util.inspect(JSON.parse(JSON.stringify(resultArr)), { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     console.log(`
//       ----- returnObj -----\n
//       ${util.inspect(JSON.parse(JSON.stringify(returnObj)), { colors: true, depth: null })}\n
//       --------------------\n
//     `);
    
    
//     // --------------------------------------------------
//     //   Return
//     // --------------------------------------------------
    
//     return returnObj;
    
    
//   } catch (err) {
    
//     throw err;
    
//   }
  
  
// };






/**
 * Transaction 挿入 / 更新する
 * ユーザーコミュニティ、フォロー、画像＆動画を同時に更新する
 * 
 * @param {Object} userCommunitiesConditionObj - DB user-communities 検索条件
 * @param {Object} userCommunitiesSaveObj - DB user-communities 保存データ
 * @param {Object} followsConditionObj - DB follows 検索条件
 * @param {Object} followsSaveObj - DB follows 保存データ
 * @param {Object} imagesAndVideosConditionObj - DB images-and-videos 検索条件 / トップ画像
 * @param {Object} imagesAndVideosSaveObj - DB images-and-videos 保存データ / トップ画像
 * @param {Object} imagesAndVideosThumbnailConditionObj - DB images-and-videos 検索条件 / サムネイル画像
 * @param {Object} imagesAndVideosThumbnailSaveObj - DB images-and-videos 保存データ / サムネイル画像
 * @return {Object} 
 */
const transactionForUpsertSettings = async ({
  
  userCommunitiesConditionObj,
  userCommunitiesSaveObj,
  followsConditionObj,
  followsSaveObj,
  imagesAndVideosConditionObj = {},
  imagesAndVideosSaveObj = {},
  imagesAndVideosThumbnailConditionObj = {},
  imagesAndVideosThumbnailSaveObj = {},
  
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
    
    
    
    
    // --------------------------------------------------
    //   DB user-communities
    // --------------------------------------------------
    
    await Schema.updateOne(userCommunitiesConditionObj, userCommunitiesSaveObj, { session, upsert: true });
    
    
    // --------------------------------------------------
    //   DB follows 
    // --------------------------------------------------
    
    await SchemaFollows.updateOne(followsConditionObj, followsSaveObj, { session, upsert: true });
    
    
    
    // --------------------------------------------------
    //   DB images-and-videos / トップ画像
    // --------------------------------------------------
    
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
    
    
    // --------------------------------------------------
    //   DB images-and-videos / サムネイル画像
    // --------------------------------------------------
    
    if (Object.keys(imagesAndVideosThumbnailConditionObj).length !== 0 && Object.keys(imagesAndVideosThumbnailSaveObj).length !== 0) {
      
      
      // --------------------------------------------------
      //   画像＆動画を削除する
      // --------------------------------------------------
      
      const arr = lodashGet(imagesAndVideosThumbnailSaveObj, ['arr'], []);
      
      if (arr.length === 0) {
        
        await SchemaImagesAndVideos.deleteOne(imagesAndVideosThumbnailConditionObj, { session });
        
        
      // --------------------------------------------------
      //   画像＆動画を保存
      // --------------------------------------------------
        
      } else {
        
        await SchemaImagesAndVideos.updateOne(imagesAndVideosThumbnailConditionObj, imagesAndVideosThumbnailSaveObj, { session, upsert: true });
        
      }
      
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
    //   ----- userCommunitiesConditionObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(userCommunitiesConditionObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- userCommunitiesSaveObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(userCommunitiesSaveObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- followsConditionObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(followsConditionObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- followsSaveObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(followsSaveObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosConditionObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosConditionObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosSaveObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosSaveObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosThumbnailConditionObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosThumbnailConditionObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosThumbnailSaveObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosThumbnailSaveObj)), { colors: true, depth: null })}\n
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
  
  findForUserCommunity,
  findForUserCommunitySettings,
  // findForUserCommunityHeroImage,
  
  transactionForUpsertSettings,
  
};