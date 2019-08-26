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

const shortid = require('shortid');
const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');
const lodashHas = require('lodash/has');
const lodashCloneDeep = require('lodash/cloneDeep');




// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * Image & Video 情報の入った配列をフォーマットする
 * src / srcset / caption / width /height
 * そしてLightbox のライブラリでも使用できるようにする
 * https://github.com/jossmac/react-images
 * 
 * @param {Object} localeObj - ロケール
 * @param {Object} obj - imagesAndVideosObj
 * @return {Array} フォーマットされたオブジェクト
 */
const formatImagesAndVideosObj = ({ localeObj, obj }) => {
  
  
  // --------------------------------------------------
  //   Data
  // --------------------------------------------------
  
  const _id = lodashGet(obj, ['_id'], '');
  const type = lodashGet(obj, ['type'], '');
  const arr = lodashGet(obj, ['arr'], []);
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  const returnArr = [];
  const returnObj = {
    _id,
    type,
  };
  
  
  // console.log(chalk`
  //   _id: {green ${_id}}
  //   type: {green ${type}}
  // `);
  
  // console.log(`
  //   ----- obj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(obj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  // return null;
  
  
  
  // --------------------------------------------------
  //   必要なデータがない場合は処理停止
  // --------------------------------------------------
  
  if (!type || arr.length === 0) {
    return null;
  }
  
  
  // --------------------------------------------------
  //   データ処理
  // --------------------------------------------------
  
  for (const valueObj of arr.values()) {
    
    
    const _id2 = lodashGet(valueObj, ['_id'], '');
    const type2 = lodashGet(valueObj, ['type'], '');
    const imageType = lodashGet(valueObj, ['imageType'], '');
    
    // console.log(chalk`
    //   _id2: {green ${_id2}}
    //   type2: {green ${type2}}
    // `);
    
    
    // --------------------------------------------------
    //   画像の場合
    // --------------------------------------------------
    
    if (type2 === 'image') {
      
      
      // --------------------------------------------------
      //   Data
      // --------------------------------------------------
      
      const localesArr = lodashGet(valueObj, ['localesArr'], []);
      const srcSetArr = lodashGet(valueObj, ['srcSetArr'], []);
      
      // console.log(`\n---------- localesArr ----------\n`);
      // console.dir(JSON.parse(JSON.stringify(localesArr)));
      // console.log(`\n-----------------------------------\n`);
      
      // console.log(`\n---------- srcSetArr ----------\n`);
      // console.dir(JSON.parse(JSON.stringify(srcSetArr)));
      // console.log(`\n-----------------------------------\n`);
      
      
      // --------------------------------------------------
      //   Temp Object
      // --------------------------------------------------
      
      const tempObj = {
        type: 'image'
      };
      
      
      // --------------------------------------------------
      //   Caption 表示する言語のデータを取得
      // --------------------------------------------------
      
      const filteredArr = localesArr.filter((filterObj) => {
        return filterObj.language === localeObj.language;
      });
      
      
      // --------------------------------------------------
      //   Caption 表示する言語のデータが存在する場合はそれを表示
      //   存在しない場合は、最初のデータを表示
      // --------------------------------------------------
      
      let caption = lodashGet(valueObj, ['localesArr', 0, 'caption'], '');
      
      if (lodashHas(filteredArr, [0])) {
        caption = lodashGet(filteredArr, [0, 'caption'], '');
      }
      
      if (caption) {
        tempObj.caption = caption;
      }
      
      
      // --------------------------------------------------
      //   srcset
      // --------------------------------------------------
      
      const srcSet2Arr = [];
      
      for (let value2Obj of srcSetArr.values()) {
//         console.log(`
//   ----- value2Obj -----\n
//   ${util.inspect(JSON.parse(JSON.stringify(value2Obj)), { colors: true, depth: null })}\n
//   --------------------\n
// `);
        
        // --------------------------------------------------
        //   Upload 画像の場合
        // --------------------------------------------------
        
        if (value2Obj.src) {
          
          tempObj.src = value2Obj.src;
          
          
        // --------------------------------------------------
        //   通常の画像の場合
        // --------------------------------------------------
          
        } else {
          
          
          // --------------------------------------------------
          //   extension
          // --------------------------------------------------
          
          let extension = '.jpg';
          
          if (imageType === 'PNG') {
            
            extension = '.png';
            
          } else if (imageType === 'SVG') {
            
            extension = '.svg';
            
          }
          
          
          // --------------------------------------------------
          //   src
          // --------------------------------------------------
          
          tempObj.src = `/static/img/${type}/${_id}/${_id2}/${value2Obj.w}${extension}`;
          
          
        }
        
        
        // --------------------------------------------------
        //   width & height
        // --------------------------------------------------
        
        tempObj.width = value2Obj.width;
        tempObj.height = value2Obj.height;
        
        
        // --------------------------------------------------
        //   srcset
        // --------------------------------------------------
        
        srcSet2Arr.push(
          `${tempObj.src} ${value2Obj.w}`
        );
        
        
      }
      
      
      // --------------------------------------------------
      //   srcsetの配列をCSV形式の文字列に変換
      // --------------------------------------------------
      
      if (srcSet2Arr.length > 0) {
        tempObj.srcSet = srcSet2Arr.join(', ');
      }
      
      
      returnArr.push(tempObj);
      
      
    // --------------------------------------------------
    //   動画の場合
    // --------------------------------------------------
      
    } else if (type2 === 'video') {
      
      returnArr.push({
        type: valueObj.type,
        videoChannel: valueObj.videoChannel,
        videoID: valueObj.videoID,
      });
      
    }
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  returnObj.arr = returnArr;
  
  
  // console.log(`\n---------- returnObj ----------\n`);
  // console.dir(JSON.parse(JSON.stringify(returnObj)));
  // console.log(`\n-----------------------------------\n`);
  
  
  return returnObj;
  
  
};




/**
 * 新しい Image & Video オブジェクトを作成して返す
 * @return {Object} 作成されたオブジェクト
 */
const returnNewObj = ({  }) => {
  
  
  // --------------------------------------------------
  //   Data
  // --------------------------------------------------
  
  const returnObj = {
    _id: shortid.generate(),
    createdDate: '',
    updatedDate: '',
    users_id: '',
    type: '',
    arr: [],
  };
  
  
  return returnObj;
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  formatImagesAndVideosObj,
  returnNewObj,
};