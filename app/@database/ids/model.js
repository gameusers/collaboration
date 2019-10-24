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

const Model = require('./schema');




// --------------------------------------------------
//   Function
// --------------------------------------------------

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




/**
 * _id が入った配列を利用して、まとめてデータを取得し
 * 利用しやすくフォーマットされたオブジェクトを返す
 * @param {Object} argumentsObj - 引数
 * @return {Object} 取得データ
 */
const findForCardPlayer = async ({ localeObj, loginUsers_id, ids_idArr }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   ID データを取得
    // --------------------------------------------------
    
    const resultIDsArr = await findBy_idsArr({
      localeObj,
      ids_idArr,
    });
    
    
    // --------------------------------------------------
    //   フォーマット
    // --------------------------------------------------
    
    const returnObj = formatToObject({
      arr: resultIDsArr,
      loginUsers_id
    });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    // `);
    
    // console.log(`
    //   ----- ids_idArr -----\n
    //   ${util.inspect(ids_idArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- resultIDsArr -----\n
    //   ${util.inspect(resultIDsArr, { colors: true, depth: null })}\n
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
 * users_id を利用して、まとめてデータを取得し
 * 利用しやすくフォーマットされたオブジェクトを返す
 * @param {Object} argumentsObj - 引数
 * @return {Object} 取得データ
 */
const findBy_Users_idForForm = async (argumentsObj) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const {
    
    language,
    country,
    loginUsers_id
    
  } = argumentsObj;
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   ID データを取得
    // --------------------------------------------------
    
    let resultIDsArr = await Model.aggregate([
      
      {
        $match : { users_id: loginUsers_id }
      },
      
      
      // {
      //   $lookup:
      //     {
      //       from: 'users',
      //       let: { idsUsers_id: '$users_id' },
      //       pipeline: [
      //         { $match:
      //           { $expr:
      //             { $eq: ['$_id', '$$idsUsers_id'] },
      //           }
      //         },
      //         { $project:
      //           {
      //             _id: 0,
      //             accessDate: 1,
      //             exp: 1,
      //             userID: 1,
      //             followArr: 1,
      //             followedArr: 1,
      //             followedCount: 1,
      //           }
      //         }
      //       ],
      //       as: 'usersObj'
      //     }
      // },
      // {
      //   $unwind: '$usersObj'
      // },
      
      
      {
        $lookup:
          {
            from: 'games',
            let: { idsGameID: '$gameID' },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$language', language] },
                      { $eq: ['$country', country] },
                      { $eq: ['$gameID', '$$idsGameID'] }
                    ]
                  },
                }
              },
              { $project:
                {
                  _id: 1,
                  gameID: 1,
                  imagesAndVideosObj: 1,
                  // thumbnail: 1,
                  name: 1,
                }
              }
            ],
            as: 'gamesObj'
          }
      },
      {
        $unwind:
          {
            path: '$gamesObj',
            preserveNullAndEmptyArrays: true
          }
      },
      
    ]).exec();
    
    
    
    
    // --------------------------------------------------
    //   フォーマット
    // --------------------------------------------------
    
    let formattedArr = [];
    
    for (let valueObj of resultIDsArr) {
      
      let tempObj = {
        _id: valueObj._id,
        platform: valueObj.platform,
        label: valueObj.label,
        id: valueObj.id,
        publicSetting: valueObj.publicSetting,
        search: valueObj.search
      };
      
      if ('gamesObj' in valueObj) {
        tempObj.games_id = valueObj.gamesObj._id;
        tempObj.gamesGameID = valueObj.gamesObj.gameID;
        tempObj.gamesImagesAndVideosObj = valueObj.gamesObj.imagesAndVideosObj;
        // tempObj.gamesThumbnail = valueObj.gamesObj.thumbnail;
        tempObj.gamesName = valueObj.gamesObj.name;
      }
      
      formattedArr.push(tempObj);
      
    }
    
    // const returnObj = formatToObject({
    //   arr: resultIDsArr,
    //   loginUsers_id
    // });
    
    
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(chalk`
    //   language: {green ${language}}
    //   country: {green ${country}}
    //   loginUsers_id: {green ${loginUsers_id}}
    // `);
    
    // console.log(`
    //   ----- resultIDsArr -----\n
    //   ${util.inspect(resultIDsArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- formattedArr -----\n
    //   ${util.inspect(formattedArr, { colors: true, depth: null })}\n
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
    
    return formattedArr;
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * DBから取得した情報をオブジェクトにフォーマットする
 * @param {Object} argumentsObj - 引数
 * @return {Object} フォーマット後のデータ
 */
const formatToObject = ({ arr, loginUsers_id }) => {
  
  
  // --------------------------------------------------
  //   Format
  // --------------------------------------------------
  
  let formattedObj = {};
  
  
  for (let valueObj of arr) {
    
    
    // --------------------------------------------------
    //   Deep Copy
    // --------------------------------------------------
    
    const clonedObj = lodashCloneDeep(valueObj);
    
    
    // --------------------------------------------------
    //   Follow の処理
    //   follow 自分が相手をフォローしている場合、true
    //   followed 自分が相手にフォローされている場合、true
    // --------------------------------------------------
    
    lodashSet(clonedObj, ['usersObj', 'follow'], false);
    lodashSet(clonedObj, ['usersObj', 'followed'], false);
    
    const followArr = lodashGet(clonedObj, ['usersObj', 'followArr'], []);
    const followedArr = lodashGet(clonedObj, ['usersObj', 'followedArr'], []);
    
    // copiedObj.usersObj.follow = false;
    // copiedObj.usersObj.followed = false;
    
    if (loginUsers_id) {
      
      if (clonedObj.users_id !== loginUsers_id) {
        
        if (followArr.includes(loginUsers_id)) {
          lodashSet(clonedObj, ['usersObj', 'follow'], true);
          // clonedObj.usersObj.follow = true;
        }
        
        if (followedArr.includes(loginUsers_id)) {
          lodashSet(clonedObj, ['usersObj', 'followed'], true);
          // clonedObj.usersObj.followed = true;
        }
        
      }
      
    }
    
    
    // --------------------------------------------------
    //   表示する ID を選択する
    //   publicSetting の番号で ID の表示方法を指定している
    //   
    //   1.誰にでも表示する
    //   2.自分をフォローしているユーザーに表示する
    //   3.自分がフォローしているユーザーに表示する
    //   4.相互フォローで表示する
    //   5.自分以外には表示しない
    // --------------------------------------------------
    
    if (
      clonedObj.users_id === loginUsers_id ||
      valueObj.publicSetting === 1 ||
      valueObj.publicSetting === 2 && clonedObj.usersObj.followed ||
      valueObj.publicSetting === 3 && clonedObj.usersObj.follow ||
      valueObj.publicSetting === 4 && clonedObj.usersObj.follow && clonedObj.usersObj.followed
      // valueObj.publicSetting === 5 && copiedObj.users_id === loginUsers_id
    ) {
      
      let tempObj = {
        _id: valueObj._id,
        platform: valueObj.platform,
        label: valueObj.label,
        id: valueObj.id
      };
      
      if ('gamesObj' in valueObj) {
        tempObj.games_id = valueObj.gamesObj._id;
        tempObj.gamesImagesAndVideosObj = valueObj.gamesObj.imagesAndVideosObj;
        // tempObj.gamesThumbnail = valueObj.gamesObj.thumbnail;
        tempObj.gamesName = valueObj.gamesObj.name;
      }
      
      formattedObj[valueObj._id] = tempObj;
      
    }
    
    
  }
  
  
  
  // console.log(`
  //   ----- formattedObj -----\n
  //   ${util.inspect(formattedObj, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  // --------------------------------------------------
  //   元の配列の順番通りに並べなおす
  // --------------------------------------------------
  
  // let returnArr = [];
  
  // for (let value of ids_idArr) {
  //   if (value in formattedObj) {
  //     returnArr.push(formattedObj[value]);
  //   }
  // }
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return formattedObj;
  
  
};




/**
 * 取得する
 * @param {Object} localeObj - ロケール
 * @param {Array} ids_idArr - DB ids _id の入った配列
 * @return {Array} 取得データ
 */
const findBy_idsArr = async ({ localeObj, ids_idArr }) => {
  
  
  // --------------------------------------------------
  //   配列の重複している値を削除
  // --------------------------------------------------
  
  const removedDuplicatesArr = Array.from(new Set(ids_idArr));
  
  
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Aggregate
    // --------------------------------------------------
    
    let resultArr = await Model.aggregate([
      
      
      {
        $match : { _id: { $in: removedDuplicatesArr } }
      },
      
      
      {
        $lookup:
          {
            from: 'users',
            let: { idsUsers_id: '$users_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$idsUsers_id'] },
                }
              },
              { $project:
                {
                  _id: 0,
                  accessDate: 1,
                  exp: 1,
                  userID: 1,
                  followArr: 1,
                  followedArr: 1,
                  followedCount: 1,
                }
              }
            ],
            as: 'usersObj'
          }
      },
      
      {
        $unwind: '$usersObj'
      },
      
      
      {
        $lookup:
          {
            from: 'games',
            let: { idsGameID: '$gameID' },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$language', localeObj.language] },
                      { $eq: ['$country', localeObj.country] },
                      { $eq: ['$gameID', '$$idsGameID'] }
                    ]
                  },
                }
              },
              { $project:
                {
                  _id: 1,
                  imagesAndVideosObj: 1,
                  // thumbnail: 1,
                  name: 1,
                }
              }
            ],
            as: 'gamesObj'
          }
      },
      
      {
        $unwind:
          {
            path: '$gamesObj',
            preserveNullAndEmptyArrays: true
          }
      },
      
      
    ]).exec();
    
    
    
    
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
  
  find,
  count,
  upsert,
  insertMany,
  deleteMany,
  findForCardPlayer,
  findBy_Users_idForForm,
  
};