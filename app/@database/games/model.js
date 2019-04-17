// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const Model = require('./schema');



// 320 480 640 800 960 1120 1280 1440 1600 1760 1920
// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * 取得する / ヒーローイメージ用データ
 * @param {string} language - 言語
 * @param {string} country - 国
 * @return {Array} 取得データ
 */
const findForHeroImage = async ({ language, country }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Find
    // --------------------------------------------------
    
    let resultArr = await Model.aggregate([
      
      
      {
        $match : { 'imagesAndVideosObj.mainArr._id': { $exists: true, $ne: null } }
      },
      
      
      {
        $lookup:
          {
            from: 'hardwares',
            let: { gamesHardwareID: '$hardwareArr.hardwareID' },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$language', language] },
                      { $eq: ['$country', country] },
                      { $in: ['$hardwareID', '$$gamesHardwareID'] }
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
      
      
      {
        $lookup:
          {
            from: 'game-genres',
            let: { gamesGenreArr: '$genreArr' },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$language', language] },
                      { $eq: ['$country', country] },
                      { $in: ['$genreID', '$$gamesGenreArr'] }
                    ]
                  },
                }
              },
              { $project:
                {
                  _id: 0,
                  genreID: 1,
                  name: 1,
                }
              }
            ],
            as: 'gameGenresArr'
          }
      },
      
      
      {
        $lookup:
          {
            from: 'developers-publishers',
            let: {
              gamesPublisherID: '$hardwareArr.publisherID',
              gamesDeveloperID: '$hardwareArr.developerID',
            },
            pipeline: [
              { $match:
                { $expr:
                  { $or:
                    [
                      { $and:
                        [
                          { $eq: ['$language', language] },
                          { $eq: ['$country', country] },
                          { $in: ['$developerPublisherID', '$$gamesPublisherID'] }
                        ]
                      },
                      { $and:
                        [
                          { $eq: ['$language', language] },
                          { $eq: ['$country', country] },
                          { $in: ['$developerPublisherID', '$$gamesDeveloperID'] }
                        ]
                      }
                    ]
                  },
                  // { $and:
                  //   [
                  //     { $eq: ['$language', language] },
                  //     { $eq: ['$country', country] },
                  //     { $in: ['$developerPublisherID', '$$gamesPublisherID'] }
                  //   ]
                  // },
                }
              },
              { $project:
                {
                  _id: 0,
                  developerPublisherID: 1,
                  name: 1,
                }
              }
            ],
            as: 'developersPublishersArr'
          }
      },
      
      
      {
        $project: {
          // __v: 0,
          urlID: 1,
          imagesAndVideosObj: 1,
          name: 1,
          subtitle: 1,
          hardwareArr: 1,
          linkArr: 1,
          hardwaresArr: 1,
          gameGenresArr: 1,
          developersPublishersArr: 1,
        }
      },
    ]).exec();
    
    
    return resultArr;
    
    
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
const findBySearchKeywordsArrForSuggestion = async ({ language, country, keyword }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Find
    // --------------------------------------------------
    
    const pattern = new RegExp(`.*${keyword}.*`);
    
    return await Model.find(
      { language, country, searchKeywordsArr: { $regex: pattern, $options: 'i' } },
    ).select('gameID imagesAndVideosObj name').limit(10).exec();
    
    
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
    
    return await Model.find(conditionObj).exec();
    
    
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
    
    return await Model.countDocuments(conditionObj).exec();
    
    
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
    
    return await Model.findOneAndUpdate(conditionObj, saveObj, { upsert: true, new: true, setDefaultsOnInsert: true }).exec();
    
    
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
    
    return await Model.insertMany(saveArr);
    
    
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
    
    return await Model.deleteMany(conditionObj);
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  findForHeroImage,
  findBySearchKeywordsArrForSuggestion,
  find,
  count,
  upsert,
  insertMany,
  deleteMany
};