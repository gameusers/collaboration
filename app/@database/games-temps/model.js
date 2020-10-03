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

const SchemaGamesTemps = require('./schema');

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

    return await SchemaGamesTemps.findOne(conditionObj).exec();


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

    return await SchemaGamesTemps.find(conditionObj).exec();


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

    return await SchemaGamesTemps.countDocuments(conditionObj).exec();


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

    return await SchemaGamesTemps.findOneAndUpdate(conditionObj, saveObj, { upsert: true, new: true, setDefaultsOnInsert: true }).exec();


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

    return await SchemaGamesTemps.insertMany(saveArr);


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

    return await SchemaGamesTemps.deleteMany(conditionObj);


  } catch (err) {

    throw err;

  }

};






/**
 * 仮登録ゲーム一覧データを取得する / gc/register
 * @param {Object} localeObj - ロケール
 * @param {string} keyword - 検索キーワード
 * @param {number} page - ページ
 * @param {number} limit - リミット
 * @return {Object} 取得データ
 */
const findGamesTempsList = async ({

  localeObj,
  page = 1,
  limit = process.env.NEXT_PUBLIC_COMMUNITY_LIST_LIMIT,
  hardwareIDsArr = [],
  keyword,

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
    //   parseInt
    // --------------------------------------------------

    const intLimit = parseInt(limit, 10);




    // ---------------------------------------------
    //   $match（ドキュメントの検索用） & count（総数の検索用）の条件作成
    // ---------------------------------------------

    const conditionObj = {

      language,
      country,

    };


    // ---------------------------------------------
    //   - 検索条件
    // ---------------------------------------------

    if (hardwareIDsArr.length > 0) {

      lodashSet(conditionObj, ['hardwareArr'],
        {
          $elemMatch: {
            hardwareID: {
              $in: hardwareIDsArr
            }
          }
        }
      );

    }

    const pattern = new RegExp(`.*${keyword}.*`);

    if (keyword) {
      lodashSet(conditionObj, ['searchKeywordsArr'], { $regex: pattern, $options: 'i' });
    }




    // --------------------------------------------------
    //   Aggregation - games
    // --------------------------------------------------

    const docArr = await SchemaGamesTemps.aggregate([


      // --------------------------------------------------
      //   Match Condition Array
      // --------------------------------------------------

      {
        $match: conditionObj
      },


      // --------------------------------------------------
      //   $project
      // --------------------------------------------------

      {
        $project: {
          // _id: 0,
          createdDate: 1,
          gameCommunities_id: 1,
          // urlID: 1,
          name: 1,
          subtitle: 1,
          hardwareArr: 1,
        }
      },


      // --------------------------------------------------
      //   $sort / $skip / $limit
      // --------------------------------------------------

      { $sort: { createdDate: -1 } },
      { $skip: (page - 1) * intLimit },
      { $limit: intLimit },


    ]).exec();




    // --------------------------------------------------
    //   フォーマット
    // --------------------------------------------------

    const listCount = await count({

      conditionObj

    });


    // ---------------------------------------------
    //   - Return Value
    // ---------------------------------------------

    const returnObj = {

      page,
      limit: intLimit,
      count: listCount,
      dataObj: {},

    };

    const ISO8601 = moment().utc().toISOString();


    // ---------------------------------------------
    //   - Loop
    // ---------------------------------------------

    for (let valueObj of docArr.values()) {


      // console.log(`
      //   ----- valueObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(valueObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);


      // --------------------------------------------------
      //   Deep Copy
      // --------------------------------------------------

      const obj = {};


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const _id = lodashGet(valueObj, ['_id'], '');

      obj._id = _id;
      obj.createdDate = lodashGet(valueObj, ['createdDate'], '');
      obj.name = lodashGet(valueObj, ['name'], '');
      obj.subtitle = lodashGet(valueObj, ['subtitle'], '');


      // --------------------------------------------------
      //   Developers Publishers
      // --------------------------------------------------

      // const hardwareArr = lodashGet(valueObj, ['hardwareArr'], []);
      // let developerPublisherIDsArr = [];


      // // ---------------------------------------------
      // //   - Loop
      // // ---------------------------------------------

      // for (let value2Obj of hardwareArr.values()) {

      //   const publisherIDsArr = lodashGet(value2Obj, ['publisherIDsArr'], []);
      //   const developerIDsArr = lodashGet(value2Obj, ['developerIDsArr'], []);

      //   developerPublisherIDsArr = developerPublisherIDsArr.concat(publisherIDsArr, developerIDsArr);

      // }


      // // ---------------------------------------------
      // //   - 配列の重複している値を削除
      // // ---------------------------------------------

      // developerPublisherIDsArr = Array.from(new Set(developerPublisherIDsArr));


      // // ---------------------------------------------
      // //   - find
      // // ---------------------------------------------

      // const docDevelopersPublishersArr = await ModelDevelopersPublishers.find({

      //   conditionObj: {
      //     language,
      //     country,
      //     developerPublisherID: { $in: developerPublisherIDsArr },
      //   }

      // });


      // // ---------------------------------------------
      // //   - 名前だけ配列に入れる
      // // ---------------------------------------------

      // const developersPublishersArr = [];

      // for (let value2Obj of docDevelopersPublishersArr.values()) {
      //   developersPublishersArr.push(value2Obj.name);
      // }

      // obj.developersPublishers = developersPublishersArr.join(', ');

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
      //   Set Data
      // --------------------------------------------------

      lodashSet(returnObj, ['dataObj', _id], obj);


      // --------------------------------------------------
      //   Pages Array
      // --------------------------------------------------

      const pagesArr = lodashGet(returnObj, [`page${page}Obj`, 'arr'], []);
      pagesArr.push(_id);

      returnObj[`page${page}Obj`] = {

        loadedDate: ISO8601,
        arr: pagesArr,

      };


    }




    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------

    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/game-communities/model.js - findGameList
    // `);

    // console.log(chalk`
    // page: {green ${page}}
    // limit: {green ${limit}}
    // keyword: {green ${keyword}}
    // `);

    // console.log(`
    //   ----- hardwareIDsArr -----\n
    //   ${util.inspect(hardwareIDsArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- conditionObj -----\n
    //   ${util.inspect(conditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
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
  gamesTemps_id,

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
    //   Aggregation - games-temps
    // --------------------------------------------------

    const docArr = await SchemaGamesTemps.aggregate([


      // --------------------------------------------------
      //   $match
      // --------------------------------------------------

      {
        $match: {
          _id: gamesTemps_id,
        }
      },


      // --------------------------------------------------
      //   games
      // --------------------------------------------------

      {
        $lookup:
          {
            from: 'games',
            let: { letGames_id: '$games_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$letGames_id']
                  },
                }
              },


              // --------------------------------------------------
              //   games / images-and-videos / メイン画像
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
              //   games / images-and-videos / サムネイル画像
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

              {
                $project: {
                  _id: 0,
                  urlID: 1,
                  name: 1,
                  imagesAndVideosObj: 1,
                  imagesAndVideosThumbnailObj: 1,
                }
              }
            ],
            as: 'gamesObj'
          }
      },

      {
        $unwind: {
          path: '$gamesObj',
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
    //   hardwareArr
    // --------------------------------------------------

    const hardwareArr = lodashGet(returnObj, ['hardwareArr'], []);
    const hardwaresArr = lodashGet(returnObj, ['hardwaresArr'], []);

    const newHardwareArr = [];

    for (let value1Obj of hardwareArr) {

      const obj = hardwaresArr.find((valueOb2j) => {
        return value1Obj.hardwareID === valueOb2j.hardwareID;
      });

      if (obj && 'name' in obj) {

        newHardwareArr.push({

          _id: value1Obj._id,
          hardwaresArr: [{
            hardwareID: obj.hardwareID,
            name: obj.name
          }],
          releaseDate: value1Obj.releaseDate,
          playersMin: value1Obj.playersMin,
          playersMax: value1Obj.playersMax,
          publisherIDsArr: value1Obj.publisherIDsArr,
          developerIDsArr: value1Obj.developerIDsArr,

        });

      }

    }

    returnObj.hardwareArr = newHardwareArr;



    // console.log(`
    //   ----- newHardwareArr -----\n
    //   ${util.inspect(newHardwareArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);




    // --------------------------------------------------
    //   Developers Publishers
    // --------------------------------------------------

    // const hardwareArr = lodashGet(valueObj, ['hardwareArr'], []);
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


    // console.log(`
    //   ----- developerPublisherIDsArr -----\n
    //   ${util.inspect(developerPublisherIDsArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    console.log(`
      ----- docDevelopersPublishersArr -----\n
      ${util.inspect(docDevelopersPublishersArr, { colors: true, depth: null })}\n
      --------------------\n
    `);


    // ---------------------------------------------
    //   -
    // ---------------------------------------------

    const developersPublishersArr = [];

    for (let value1Obj of hardwareArr.values()) {

      const publisherIDsArr = lodashGet(value1Obj, ['publisherIDsArr'], []);
      const developerIDsArr = lodashGet(value1Obj, ['developerIDsArr'], []);

      const obj = docDevelopersPublishersArr.find((value) => {
        return value1Obj.developerPublisherID === value;
      });

      console.log(`
        ----- value1Obj -----\n
        ${util.inspect(value1Obj, { colors: true, depth: null })}\n
        --------------------\n
      `);

      console.log(`
        ----- obj -----\n
        ${util.inspect(obj, { colors: true, depth: null })}\n
        --------------------\n
      `);

      // developersPublishersArr.push({
      //   developerPublisherID: value1Obj.developerPublisherID,
      //   name: value1Obj.name,
      // });
      // developersPublishersArr.push({
      //   developerPublisherID: value2Obj.developerPublisherID,
      //   name: value2Obj.name
      // });

    }

    // obj.developersPublishers = developersPublishersArr.join(', ');


    // console.log(`
    //   ----- developersPublishersArr -----\n
    //   ${util.inspect(developersPublishersArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);


    //   // console.log(`
    //   //   ----- developerPublisherIDsArr -----\n
    //   //   ${util.inspect(JSON.parse(JSON.stringify(developerPublisherIDsArr)), { colors: true, depth: null })}\n
    //   //   --------------------\n
    //   // `);

    //   // console.log(`
    //   //   ----- docDevelopersPublishersArr -----\n
    //   //   ${util.inspect(JSON.parse(JSON.stringify(docDevelopersPublishersArr)), { colors: true, depth: null })}\n
    //   //   --------------------\n
    //   // `);

    //   // console.log(`
    //   //   ----- developersPublishersArr -----\n
    //   //   ${util.inspect(JSON.parse(JSON.stringify(developersPublishersArr)), { colors: true, depth: null })}\n
    //   //   --------------------\n
    //   // `);


    // }



    // --------------------------------------------------
    //   Delete
    // --------------------------------------------------

    delete returnObj.hardwaresArr;




    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------

    // console.log(`
    //   ----------------------------------------\n
    //   app/@database/games-temps/model.js - findEditData
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
//   Export
// --------------------------------------------------

module.exports = {

  findOne,
  find,
  count,
  upsert,
  insertMany,
  deleteMany,

  findGamesTempsList,
  findEditData,

};
