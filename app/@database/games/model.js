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
//   Model
// ---------------------------------------------

const SchemaGames = require('./schema');
const SchemaImagesAndVideos = require('../images-and-videos/schema.js');
const SchemaGameCommunities = require('../game-communities/schema.js');
const SchemaForumThreads = require('../forum-threads/schema.js');

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




/**
 * 編集用データを取得する / gc/register
 * @param {Object} localeObj - ロケール
 * @param {string} keyword - 検索キーワード
 * @param {number} page - ページ
 * @param {number} limit - リミット
 * @return {Object} 取得データ
 */
const findEditData = async ({

  localeObj,
  games_id,

}) => {


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
    //   Aggregation - games
    // --------------------------------------------------

    const docArr = await SchemaGames.aggregate([


      // --------------------------------------------------
      //   $match
      // --------------------------------------------------

      {
        $match: {
          _id: games_id,
        }
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
      //   images-and-videos / サムネイル画像
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
      //   hardwares
      // --------------------------------------------------

      {
        $lookup:
          {
            from: 'hardwares',
            let: {
              letHardwareID: '$hardwareArr.hardwareID',
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$language', language] },
                      { $eq: ['$country', country] },
                      { $in: ['$hardwareID', '$$letHardwareID'] }
                    ]
                  }
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


    ]).exec();




    // --------------------------------------------------
    //   returnObj
    // --------------------------------------------------

    const returnObj = lodashGet(docArr, [0], {});




    // --------------------------------------------------
    //   Hardware & Developers Publishers
    // --------------------------------------------------

    const hardwareArr = lodashGet(returnObj, ['hardwareArr'], []);


    // ---------------------------------------------
    //   *** Developers Publishers
    // ---------------------------------------------

    let developerPublisherIDsArr = [];


    // ----------------------------------------
    //   - Loop
    // ----------------------------------------

    for (let valueObj of hardwareArr.values()) {

      const publisherIDsArr = lodashGet(valueObj, ['publisherIDsArr'], []);
      const developerIDsArr = lodashGet(valueObj, ['developerIDsArr'], []);

      developerPublisherIDsArr = developerPublisherIDsArr.concat(publisherIDsArr, developerIDsArr);

    }


    // ----------------------------------------
    //   - 配列の重複している値を削除
    // ----------------------------------------

    developerPublisherIDsArr = Array.from(new Set(developerPublisherIDsArr));


    // ----------------------------------------
    //   - find
    // ----------------------------------------

    const docDevelopersPublishersArr = await ModelDevelopersPublishers.find({

      conditionObj: {
        language,
        country,
        developerPublisherID: { $in: developerPublisherIDsArr },
      }

    });


    // ---------------------------------------------
    //   *** Hardware
    // ---------------------------------------------

    const newHardwareArr = [];
    const hardwaresArr = lodashGet(returnObj, ['hardwaresArr'], []);

    for (let value1Obj of hardwareArr) {


      // ----------------------------------------
      //   - Hardware
      // ----------------------------------------

      const find1Obj = hardwaresArr.find((valueOb2j) => {
        return value1Obj.hardwareID === valueOb2j.hardwareID;
      });


      // ----------------------------------------
      //   - Developers Publishers
      // ----------------------------------------

      const publishersArr = [];
      const developersArr = [];

      const publisherIDsArr = lodashGet(value1Obj, ['publisherIDsArr'], []);
      const developerIDsArr = lodashGet(value1Obj, ['developerIDsArr'], []);

      for (let publisherID of publisherIDsArr.values()) {

        const find2Obj = docDevelopersPublishersArr.find((value2Obj) => {
          return value2Obj.developerPublisherID === publisherID;
        });

        publishersArr.push({
          developerPublisherID: find2Obj.developerPublisherID,
          name: find2Obj.name,
        });

      }

      for (let developerID of developerIDsArr.values()) {

        const find2Obj = docDevelopersPublishersArr.find((value2Obj) => {
          return value2Obj.developerPublisherID === developerID;
        });

        developersArr.push({
          developerPublisherID: find2Obj.developerPublisherID,
          name: find2Obj.name,
        });

      }


      // console.log(`
      //   ----- value1Obj -----\n
      //   ${util.inspect(value1Obj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);

      // console.log(`
      //   ----- publishersArr -----\n
      //   ${util.inspect(publishersArr, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);


      // ----------------------------------------
      //   - Release Date
      // ----------------------------------------

      const releaseDate = lodashGet(value1Obj, ['releaseDate'], '');
      const formattedDate = releaseDate ? moment(releaseDate).format('YYYY-MM-DD') : '';

      if (find1Obj && 'name' in find1Obj) {

        newHardwareArr.push({

          _id: value1Obj._id,
          hardwaresArr: [{
            hardwareID: find1Obj.hardwareID,
            name: find1Obj.name
          }],
          releaseDate: formattedDate,
          playersMin: value1Obj.playersMin,
          playersMax: value1Obj.playersMax,
          publishersArr,
          developersArr,

        });

      }


    }


    if (newHardwareArr.length > 0) {
      returnObj.hardwareArr = newHardwareArr;
    }




    // console.log(`
    //   ----- newHardwareArr -----\n
    //   ${util.inspect(newHardwareArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- developerPublisherIDsArr -----\n
    //   ${util.inspect(developerPublisherIDsArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- docDevelopersPublishersArr -----\n
    //   ${util.inspect(docDevelopersPublishersArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- developersPublishersArr -----\n
    //   ${util.inspect(developersPublishersArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);




    // --------------------------------------------------
    //   Delete
    // --------------------------------------------------

    delete returnObj.hardwaresArr;




    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------

    // console.log(`
    //   ----------------------------------------\n
    //   app/@database/games/model.js - findEditData
    // `);

    // console.log(chalk`
    //   gamesTemps_id: {green ${gamesTemps_id}}
    // `);

    // console.log(`
    //   ----- docArr -----\n
    //   ${util.inspect(docArr, { colors: true, depth: null })}\n
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
 *
 * @param {Object} gamesConditionObj - DB games 検索条件
 * @param {Object} gamesSaveObj - DB games 保存データ
 * @param {Object} gameCommunitiesConditionObj - DB game-communities 検索条件
 * @param {Object} gameCommunitiesSaveObj - DB game-communities 保存データ
 * @param {Object} forumThreadsConditionObj - DB forum-threads 検索条件
 * @param {Object} forumThreadsSaveObj - DB forum-threads 保存データ
 * @param {Object} imagesAndVideosConditionObj - DB images-and-videos 検索条件
 * @param {Object} imagesAndVideosSaveObj - DB images-and-videos 保存データ
 * @param {Object} imagesAndVideosThumbnailConditionObj - DB images-and-videos 検索条件
 * @param {Object} imagesAndVideosThumbnailSaveObj - DB images-and-videos 保存データ
 * @return {Object}
 */
const transactionForUpsert = async ({

  gamesConditionObj = {},
  gamesSaveObj = {},
  gameCommunitiesConditionObj = {},
  gameCommunitiesSaveObj = {},
  forumThreadsConditionObj = {},
  forumThreadsSaveObj = {},
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

  const session = await SchemaGames.startSession();




  // --------------------------------------------------
  //   Database
  // --------------------------------------------------

  try {


    // --------------------------------------------------
    //   Transaction / Start
    // --------------------------------------------------

    await session.startTransaction();




    // ---------------------------------------------
    //   - games
    // ---------------------------------------------

    await SchemaGames.updateOne(gamesConditionObj, gamesSaveObj, { session, upsert: true });


    // ---------------------------------------------
    //   - game-communities
    // ---------------------------------------------

    if (Object.keys(gameCommunitiesConditionObj).length !== 0 && Object.keys(gameCommunitiesSaveObj).length !== 0) {

      await SchemaGameCommunities.updateOne(gameCommunitiesConditionObj, gameCommunitiesSaveObj, { session, upsert: true });

    }


    // ---------------------------------------------
    //   - forum-threads
    // ---------------------------------------------

    if (Object.keys(forumThreadsConditionObj).length !== 0 && Object.keys(forumThreadsSaveObj).length !== 0) {

      await SchemaForumThreads.updateOne(forumThreadsConditionObj, forumThreadsSaveObj, { session, upsert: true });

    }


    // ---------------------------------------------
    //   - images-and-videos - メイン画像
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


    // --------------------------------------------------
    //   Images And Videos - サムネイル画像
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
    //   ----------------------------------------\n
    //   app/@database/games/model.js - transactionForUpsert
    // `);

    // console.log(`
    //   ----- gamesConditionObj -----\n
    //   ${util.inspect(gamesConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- gamesSaveObj -----\n
    //   ${util.inspect(gamesSaveObj, { colors: true, depth: null })}\n
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
    //   ----- forumThreadsConditionObj -----\n
    //   ${util.inspect(forumThreadsConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- forumThreadsSaveObj -----\n
    //   ${util.inspect(forumThreadsSaveObj, { colors: true, depth: null })}\n
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

  findForHeroImage,
  findBySearchKeywordsArrForSuggestion,
  findEditData,

  transactionForUpsert,

};
