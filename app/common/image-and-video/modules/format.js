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
  
  // console.log(`\n---------- arr ----------\n`);
  // console.dir(JSON.parse(JSON.stringify(arr)));
  // console.log(`\n-----------------------------------\n`);
  // console.log('formatImagesAndVideosArr');
  
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
  
  // console.log(`\n---------- arr ----------\n`);
  // console.dir(JSON.parse(JSON.stringify(arr)));
  // console.log(`\n-----------------------------------\n`);
  // return null;
  
  
  
  // --------------------------------------------------
  //   必要なデータがない場合は処理停止
  // --------------------------------------------------
  
  if (!_id || !type || arr.length === 0) {
    return null;
  }
  
  
  // --------------------------------------------------
  //   データ処理
  // --------------------------------------------------
  
  for (const valueObj of arr.values()) {
    
    
    const _id2 = lodashGet(valueObj, ['_id'], '');
    const type2 = lodashGet(valueObj, ['type'], '');
    
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
      
      
      //   returnArr[index] = {
      //     type: valueObj.type,
      //     src: '',
      //     caption,
      //     srcSet: '',
      //   };
      
      
      // --------------------------------------------------
      //   srcset
      // --------------------------------------------------
      
      const srcSet2Arr = [];
      
      for (let value2Obj of srcSetArr.values()) {
        
        
        // --------------------------------------------------
        //   w
        // --------------------------------------------------
        
        let w = value2Obj.w;
        
        // 画像をアップロードするときに、base64形式でプレビューを表示する
        // その際、とりあえず srcset の値を 320w ということにして表示する
        if (value2Obj.w === 'upload') {
          w = '320w';
        }
        
        
        // --------------------------------------------------
        //   extension
        // --------------------------------------------------
        
        let extension = '.jpg';
        
        if (value2Obj.imageType === 'PNG') {
          
          extension = '.png';
          
        } else if (value2Obj.imageType === 'SVG') {
          
          extension = '.svg';
          
        }
        
        
        // --------------------------------------------------
        //   src
        // --------------------------------------------------
        
        tempObj.src = `/static/img/${type}/${_id}/${_id2}/${w}${extension}`;
        
        
        // --------------------------------------------------
        //   width & height
        // --------------------------------------------------
        
        tempObj.width = value2Obj.width;
        tempObj.height = value2Obj.height;
        
        
        // --------------------------------------------------
        //   srcset
        // --------------------------------------------------
        
        srcSet2Arr.push(
          `${tempObj.src} ${w}`
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