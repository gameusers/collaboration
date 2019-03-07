// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const Model = require('./schema');




// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * _id が入った配列を利用して、まとめてデータを取得し
 * 利用しやすくフォーマットされたオブジェクトを返す
 * @param {Object} argumentsObj - 引数
 * @return {Object} 取得データ
 */
const findForCardPlayer = async (argumentsObj) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const {
    
    language,
    country,
    usersLogin_id,
    arr,
    
  } = argumentsObj;
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   ID データを取得
    // --------------------------------------------------
    
    const resultIDsArr = await findBy_idsArr({
      language,
      country,
      arr,
    });
    
    
    // --------------------------------------------------
    //   フォーマット
    // --------------------------------------------------
    
    const returnObj = formatToObject({
      arr: resultIDsArr,
      usersLogin_id
    });
    
    
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(chalk`
    //   language: {green ${language}}
    //   country: {green ${country}}
    //   usersLogin_id: {green ${usersLogin_id}}
    // `);
    
    // console.log(`
    //   ----- arr -----\n
    //   ${util.inspect(arr, { colors: true, depth: null })}\n
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
    usersLogin_id
    
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
        $match : { users_id: usersLogin_id }
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
      //             level: 1,
      //             playerID: 1,
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
    //   usersLogin_id
    // });
    
    
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(chalk`
    //   language: {green ${language}}
    //   country: {green ${country}}
    //   usersLogin_id: {green ${usersLogin_id}}
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
const formatToObject = (argumentsObj) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const {
    
    // ids_idsArr,
    arr,
    usersLogin_id
    
  } = argumentsObj;
  
  
  
  
  // --------------------------------------------------
  //   Format
  // --------------------------------------------------
  
  let formattedObj = {};
  
  for (let valueObj of arr) {
    
    
    // --------------------------------------------------
    //   コピー
    // --------------------------------------------------
    
    const copiedObj = JSON.parse(JSON.stringify(valueObj));
    
    
    // --------------------------------------------------
    //   Follow の処理
    //   follow 自分が相手をフォローしている場合、true
    //   followed 自分が相手にフォローされている場合、true
    // --------------------------------------------------
    
    copiedObj.usersObj.follow = false;
    copiedObj.usersObj.followed = false;
    
    if (usersLogin_id) {
      
      if (copiedObj.users_id !== usersLogin_id) {
        
        if (copiedObj.usersObj.followArr.includes(usersLogin_id)) {
          copiedObj.usersObj.follow = true;
        }
        
        if (copiedObj.usersObj.followedArr.includes(usersLogin_id)) {
          copiedObj.usersObj.followed = true;
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
      copiedObj.users_id === usersLogin_id ||
      valueObj.publicSetting === 1 ||
      valueObj.publicSetting === 2 && copiedObj.usersObj.followed ||
      valueObj.publicSetting === 3 && copiedObj.usersObj.follow ||
      valueObj.publicSetting === 4 && copiedObj.usersObj.follow && copiedObj.usersObj.followed
      // valueObj.publicSetting === 5 && copiedObj.users_id === usersLogin_id
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
 * @param {Object} argumentsObj - 引数
 * @return {Array} 取得データ
 */
const findBy_idsArr = async (argumentsObj) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const {
    
    language,
    country,
    arr,
    
  } = argumentsObj;
  
  
  // --------------------------------------------------
  //   配列の重複している値を削除
  // --------------------------------------------------
  
  const removedDuplicatesArr = Array.from(new Set(arr));
  
  
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
                  level: 1,
                  playerID: 1,
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
  findForCardPlayer,
  findBy_Users_idForForm,
  find,
  count,
  upsert,
  insertMany,
  deleteMany
};