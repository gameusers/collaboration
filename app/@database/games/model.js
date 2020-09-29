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
 * 取得する / ヒーローイメージ用データ
 * @param {Object} localeObj - ロケール
 * @return {Array} 取得データ
 */
const findForHeroImage = async ({ localeObj }) => {


  // --------------------------------------------------
  //   Database
  // --------------------------------------------------

  try {


    // --------------------------------------------------
    //   Language & Country
    // --------------------------------------------------

    const language = lodashGet(localeObj, ['language'], '');
    const country = lodashGet(localeObj, ['country'], '');




    // --------------------------------------------------
    //   Find
    // --------------------------------------------------

    let resultArr = await SchemaGames.aggregate([


      // --------------------------------------------------
      //   画像＆動画が登録されているゲームを取得する
      // --------------------------------------------------

      {
        $match : { 'imagesAndVideos_id': { $exists: true, $ne: '' } }
      },


      // --------------------------------------------------
      //   ランダムに1件データを取得する
      // --------------------------------------------------

      {
        $sample: { size: 1 }
      },


      // --------------------------------------------------
      //   images-and-videos / メイン画像
      // --------------------------------------------------

      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { letImagesAndVideos_id: '$imagesAndVideos_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$letImagesAndVideos_id']
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
            let: { letHardwareID: '$hardwareArr.hardwareID' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$language', language] },
                      { $eq: ['$country', country] },
                      { $in: ['$hardwareID', '$$letHardwareID'] }
                    ]
                  },
                }
              },
              {
                $project: {
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
      //   game-genres
      // --------------------------------------------------

      {
        $lookup:
          {
            from: 'game-genres',
            let: { letGenreArr: '$genreArr' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$language', language] },
                      { $eq: ['$country', country] },
                      { $in: ['$genreID', '$$letGenreArr'] }
                    ]
                  },
                }
              },
              {
                $project: {
                  _id: 0,
                  genreID: 1,
                  name: 1,
                }
              }
            ],
            as: 'gameGenresArr'
          }
      },


      // --------------------------------------------------
      //   developers-publishers / 開発＆パブリッシャー
      // --------------------------------------------------

      // {
      //   $unwind: '$hardwareArr'
      // },

      // {
      //   $group: {
      //     _id: '$hardwareArr.publisherIDsArr',
      //     publisherIDsArr: '$hardwareArr.publisherIDsArr'
      //   }
      // },

      // {
      //   $project: {
      //     publisherIDsArr: '$hardwareArr.publisherIDsArr',
      //     // developerPublisherID: 1,
      //     // name: 1,
      //     // letPublisherIDsArr: 1,
      //   }
      // },

      // {
      //   $lookup:
      //     {
      //       from: 'developers-publishers',
      //       let: {
      //         // letPublisherIDsArr: '$hardwareArr.publisherIDsArr',
      //         // letPublisherIDsArr: ['YtKRcK3Ar'],
      //         // letHardwareArr: '$hardwareArr',
      //         letPublisherIDsArr: '$hardwareArr.publisherIDsArr',
      //         // letPublisherIDsArr: '$publisherIDsArr',
      //         // letDeveloperIDsArr: '$hardwareArr.developerIDsArr',
      //       },
      //       pipeline: [
      //         // {
      //         //   $unwind: '$letHardwareArr'
      //         // },
      //         // {
      //         //   $unwind: '$letHardwareArr.publisherIDsArr'
      //         // },

      //         {
      //           $match: {
      //             $expr: {
      //               $or: [
      //                 {
      //                   $and: [
      //                     { $eq: ['$language', language] },
      //                     { $eq: ['$country', country] },
      //                     // { $in: ['$developerPublisherID', '$$letPublisherIDsArr'] }
      //                     // { $in: ['$developerPublisherID', ['YtKRcK3Ar']] }
      //                     // { $eq: ['$developerPublisherID', '$$letPublisherIDsArr'] }
      //                     // { $in: ['$developerPublisherID', '$letHardwareArr.publisherIDsArr'] }
      //                     // { $in: ['$developerPublisherID', '$hardwareArr.publisherIDsArr'] }
      //                     // { $in: ['$developerPublisherID', '$$letHardwareArr.publisherIDsArr'] }
      //                     // { $in: ['$developerPublisherID', '$$letPublisherIDsArr'] }
      //                   ]
      //                 },
      //                 // {
      //                 //   $and: [
      //                 //     { $eq: ['$language', language] },
      //                 //     { $eq: ['$country', country] },
      //                 //     // { $in: ['$developerPublisherID', '$$letDeveloperIDsArr'] }
      //                 //     { $in: ['$developerPublisherID', ['zXOweU_0y']] }
      //                 //   ]
      //                 // }
      //               ]
      //             },
      //           }
      //         },
      //         {
      //           $project: {
      //             _id: 0,
      //             developerPublisherID: 1,
      //             name: 1,
      //             letPublisherIDsArr: '$$letPublisherIDsArr',
      //             // letPublisherIDsArr: 1,
      //           }
      //         }
      //       ],
      //       as: 'developersPublishersArr'
      //     }
      // },


      // --------------------------------------------------
      //   $project
      // --------------------------------------------------

      {
        $project: {
          gameCommunities_id: 1,
          urlID: 1,
          imagesAndVideosObj: 1,
          name: 1,
          subtitle: 1,
          hardwareArr: 1,
          genreArr: 1,
          linkArr: 1,
          hardwaresArr: 1,
          gameGenresArr: 1,
          // developersPublishersArr: 1,

          // publisherIDsArr: 1,
        }
      },


    ]).exec();




    // --------------------------------------------------
    //   ヒーローイメージがランダムに表示されるように並び替える
    // --------------------------------------------------

    let returnObj = lodashGet(resultArr, [0], {});

    if (Object.keys(returnObj).length !== 0) {

      const arr = lodashGet(returnObj, ['imagesAndVideosObj', 'arr'], []);

      // 並び替え
      for (let i = arr.length - 1; i > 0; i--){
        const r = Math.floor(Math.random() * (i + 1));
        const tmp = arr[i];
        arr[i] = arr[r];
        arr[r] = tmp;
      }

      lodashSet(returnObj, ['imagesAndVideosObj', 'arr'], arr);

    }




    // --------------------------------------------------
    //   画像をフォーマットする
    // --------------------------------------------------

    const formattedObj = formatImagesAndVideosObj({ localeObj, obj: returnObj.imagesAndVideosObj });

    if (Object.keys(formattedObj).length !== 0) {

      returnObj.imagesAndVideosObj = formattedObj;

    } else {

      delete returnObj.imagesAndVideosObj;

    }




    // --------------------------------------------------
    //   Developers Publishers
    // --------------------------------------------------

    const hardwareArr = lodashGet(returnObj, ['hardwareArr'], []);
    let developerPublisherIDsArr = [];


    // ---------------------------------------------
    //   - Loop
    // ---------------------------------------------

    for (let valueObj of hardwareArr.values()) {

      const publisherIDsArr = lodashGet(valueObj, ['publisherIDsArr'], []);
      const developerIDsArr = lodashGet(valueObj, ['developerIDsArr'], []);

      developerPublisherIDsArr = developerPublisherIDsArr.concat(publisherIDsArr, developerIDsArr);

    }


    // ---------------------------------------------
    //   - 配列の重複している値を削除
    // ---------------------------------------------

    developerPublisherIDsArr = Array.from(new Set(developerPublisherIDsArr));


    // ---------------------------------------------
    //   - find
    // ---------------------------------------------

    const docDevelopersPublishersArr = await ModelDevelopersPublishers.find({

      conditionObj: {
        language,
        country,
        developerPublisherID: { $in: developerPublisherIDsArr },
      }

    });


    // ---------------------------------------------
    //   - 名前だけ配列に入れる
    // ---------------------------------------------

    const developersPublishersArr = [];

    for (let valueObj of docDevelopersPublishersArr.values()) {
      developersPublishersArr.push(valueObj.name);
    }

    returnObj.developersPublishersArr = developersPublishersArr;

    // console.log(`
    //   ----- developerPublisherIDsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(developerPublisherIDsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- docDevelopersPublishersArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(docDevelopersPublishersArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- developersPublishersArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(developersPublishersArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);




    // --------------------------------------------------
    //   Type
    // --------------------------------------------------

    returnObj.type = 'gc';




    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------

    // console.log(`
    //   ----------------------------------------\n
    //   app/@database/games/model.js
    // `);

    // console.log(`
    //   ----- resultArr -----\n
    //   ${util.inspect(resultArr, { colors: true, depth: null })}\n
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

  findForHeroImage,
  findBySearchKeywordsArrForSuggestion,

};
