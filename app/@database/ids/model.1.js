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
 * 取得する
 * @param {Object} argumentsObj - 引数
 * @return {Object} 取得データ
 */
const findBy_id = async (argumentsObj) => {
  
  
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
    
    let resultIDsArr = await Model.aggregate([
      
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
                  _id: 0,
                  thumbnail: 1,
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
    
    const returnObj = format({
      ids_idArr: arr,
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
    //   ----- removedDuplicatesArr -----\n
    //   ${util.inspect(removedDuplicatesArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- resultIDsArr -----\n
    //   ${util.inspect(resultIDsArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    console.log(`
      ----- returnObj -----\n
      ${util.inspect(returnObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    
    
    
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
 * @param {Object} argumentsObj - 引数
 * @return {Array} フォーマット後のデータ
 */
const format = (argumentsObj) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const {
    
    ids_idArr,
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
    // --------------------------------------------------
    
    if (
      copiedObj.users_id === usersLogin_id ||
      valueObj.showType === 1 ||
      valueObj.showType === 2 && copiedObj.usersObj.followed ||
      valueObj.showType === 3 && copiedObj.usersObj.follow ||
      valueObj.showType === 4 && copiedObj.usersObj.follow && copiedObj.usersObj.followed
      // valueObj.showType === 5 && copiedObj.users_id === usersLogin_id
    ) {
      
      let tempObj = {
        type: valueObj.type,
        label: valueObj.label,
        value: valueObj.value
      };
      
      if ('gamesObj' in valueObj) {
        tempObj.gameThumbnail = valueObj.gamesObj.thumbnail;
        tempObj.gameName = valueObj.gamesObj.name;
      }
      
      formattedObj[valueObj._id] = tempObj;
      
    }
    
    
  }
  
  
  
  console.log(`
    ----- formattedObj -----\n
    ${util.inspect(formattedObj, { colors: true, depth: null })}\n
    --------------------\n
  `);
  
  
  
  // --------------------------------------------------
  //   元の配列の順番通りに並べなおす
  // --------------------------------------------------
  
  let returnArr = [];
  
  for (let value of ids_idArr) {
    if (value in formattedObj) {
      returnArr.push(formattedObj[value]);
    }
  }
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return returnArr;
  
  
};





/**
 * 取得する
 * @param {Object} argumentsObj - 引数
 * @return {Object} 取得データ
 */
const find = async (argumentsObj) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const {
    
    conditionObj
    
  } = argumentsObj;
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Find
    // --------------------------------------------------
    
    const docArr = await Model.find(conditionObj).exec();
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return docArr;
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 挿入 / 更新する
 * @param {Object} argumentsObj - 引数
 * @return {Object} 
 */
const upsert = async (argumentsObj) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const {
    
    conditionObj,
    saveObj
    
  } = argumentsObj;
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Upsert
    // --------------------------------------------------
    
    const docArr = await Model.findOneAndUpdate(conditionObj, saveObj, { upsert: true, new: false, setDefaultsOnInsert: true }).exec();
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return returnObj;
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 挿入する
 * @param {Object} argumentsObj - 引数
 * @return {Array} 
 */
const insertMany = async (argumentsObj) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const {
    
    saveArr
    
  } = argumentsObj;
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   insertMany
    // --------------------------------------------------
    
    const docArr = await Model.insertMany(saveArr);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return docArr;
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 削除する
 * @param {Object} argumentsObj - 引数
 * @return {Array} 
 */
const deleteMany = async (argumentsObj) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const {
    
    conditionObj
    
  } = argumentsObj;
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Remove
    // --------------------------------------------------
    
    const docArr = await Model.deleteMany(conditionObj);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return docArr;
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  findBy_id,
  find,
  upsert,
  insertMany,
  deleteMany
};