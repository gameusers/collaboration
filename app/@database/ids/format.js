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

// const shortid = require('shortid');
const lodashGet = require('lodash/get');
// const lodashSet = require('lodash/set');
// const lodashHas = require('lodash/has');
// const lodashCloneDeep = require('lodash/cloneDeep');


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { formatImagesAndVideosObj } = require('../images-and-videos/format');




// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * フォーマットする
 * @param {Object} followsObj - フォーマット済みの followsObj
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @return {Array} フォーマットされたオブジェクト
 */
const formatIDsArr = ({ localeObj, loginUsers_id, followsObj, arr }) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  // const returnObj = {};
  const returnArr = [];
  
  // const approval = lodashGet(followsObj, ['approval'], false);
  // const followCount = lodashGet(followsObj, ['followCount'], 0);
  // const followedCount = lodashGet(followsObj, ['followedCount'], 0);
  const author = lodashGet(followsObj, ['author'], false);
  const follow = lodashGet(followsObj, ['follow'], false);
  const followed = lodashGet(followsObj, ['followed'], false);
  // const followApproval = lodashGet(followsObj, ['followApproval'], false);
  // const followBlocked = lodashGet(followsObj, ['followBlocked'], false);
  
  
  // --------------------------------------------------
  //   Loop
  // --------------------------------------------------
  
  for (let valueObj of arr.values()) {
    
    
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
      
      author ||
      valueObj.publicSetting === 1 ||
      valueObj.publicSetting === 2 && followed ||
      valueObj.publicSetting === 3 && follow ||
      valueObj.publicSetting === 4 && follow && followed
      
    ) {
      
      let tempObj = {
        
        _id: valueObj._id,
        platform: valueObj.platform,
        label: valueObj.label,
        id: valueObj.id
        
      };
      
      
      if ('gamesObj' in valueObj) {
        
        tempObj.gamesObj = valueObj.gamesObj;
        
        
        // --------------------------------------------------
        //   Format - サムネイル画像
        // --------------------------------------------------
        
        const imagesAndVideosThumbnailObj = formatImagesAndVideosObj({ localeObj, obj: valueObj.gamesObj.imagesAndVideosThumbnailObj });
        
        if (imagesAndVideosThumbnailObj) {
          tempObj.gamesObj.imagesAndVideosThumbnailObj = imagesAndVideosThumbnailObj;
        }
        
        
      }
      
      // returnObj[valueObj._id] = tempObj;
      returnArr.push(tempObj);
      
    }
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/@database/ids/format.js - format
  // `);
  
  // console.log(chalk`
  //   userID: {green ${userID}}
  //   pathname: {green ${pathname}}
  // `);
  
  // console.log(`
  //   ----- followsObj -----\n
  //   ${util.inspect(followsObj, { colors: true, depth: null })}\n
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
  
  return returnArr;
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  
  formatIDsArr,
  
};