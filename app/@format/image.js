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




// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * Image & Video 情報の入った配列をフォーマットする
 * Lightbox のライブラリで使用できる形式に
 * https://github.com/jossmac/react-images
 * 
 * @param {Array} arr - 画像と動画の情報が入った配列
 * @return {Array} フォーマットされた配列
 */
const formatImagesAndVideosArr = ({ arr }) => {
  
  // console.log(`\n---------- arr ----------\n`);
  // console.dir(JSON.parse(JSON.stringify(arr)));
  // console.log(`\n-----------------------------------\n`);
  // console.log('formatImagesAndVideosArr');
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnArr = [];
  
  
  // --------------------------------------------------
  //   データ処理
  // --------------------------------------------------
  
  if (arr.length > 0) {
    
    for (const [index, valueObj] of arr.entries()) {
      
      
      // --------------------------------------------------
      //   画像の場合
      // --------------------------------------------------
      
      // console.log(chalk`
      //   valueObj.type: {green ${valueObj.type}}
      // `);
      
      if (valueObj.type === 'image') {
        
        // 初期値
        const srcSetArr = [];
        
        const caption = lodashGet(valueObj, ['caption'], '');
        // const caption = lodashGet(valueObj, ['localesArr', 0, 'caption'], '');
        
        returnArr[index] = {
          type: valueObj.type,
          src: '',
          caption,
          srcSet: '',
        };
        
        
        // ソースセットをループ
        for (let value2Obj of valueObj.srcSetArr.values()) {
          
          // 画像をアップロードするときに、base64形式でプレビューを表示する
          // その際、とりあえず srcset の値を 320w ということにして表示する
          if (value2Obj.w === 'upload') {
            
            returnArr[index].src = value2Obj.src;
            
            srcSetArr.push(
              `${value2Obj.src} 320w`
            );
            
          // Source 画像以外を利用する
          } else if (value2Obj.w !== 'source') {
            
            returnArr[index].src = value2Obj.src;
            
            srcSetArr.push(
              `${value2Obj.src} ${value2Obj.w}`
            );
            
          }
          
        }
        
        
        // srcsetの配列をCSV形式の文字列に変換
        if (srcSetArr.length > 0) {
          returnArr[index].srcSet = srcSetArr.join(', ');
        }
        
        
      // --------------------------------------------------
      //   動画の場合
      // --------------------------------------------------
        
      } else if (valueObj.type === 'video') {
        
        returnArr[index] = {
          type: valueObj.type,
          videoChannel: valueObj.videoChannel,
          videoID: valueObj.videoID,
        };
        
      }
      
    }
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return returnArr;
  
  
};




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
        
        tempObj.src = `/img/${type}/${_id}/${_id2}/${w}${extension}`;
        
        
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
 * SrcSet 情報の入った配列をフォーマットする
 * 
 * @param {Array} arr - SrcSet情報が入った配列
 * @return {Array} フォーマットされた配列
 */
const formatSrcSetArr = ({ arr }) => {
  
  // console.log(`\n---------- arr ----------\n`);
  // console.dir(JSON.parse(JSON.stringify(arr)));
  // console.log(`\n-----------------------------------\n`);
  // console.log('formatImagesAndVideosArr');
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   データ処理
  // --------------------------------------------------
  
  if (arr.length > 0) {
    
    const srcSetArr = [];
    
    for (let valueObj of arr.values()) {
      
      // 画像をアップロードするときに、base64形式でプレビューを表示する
      // その際、とりあえず srcset の値を 320w ということにして表示する
      if (valueObj.w === 'upload') {
        
        returnObj.src = valueObj.src;
        
        valueObj.push(
          `${valueObj.src} 320w`
        );
        
      } else {
        
        returnObj.src = valueObj.src;
        
        srcSetArr.push(
          `${valueObj.src} ${valueObj.w}`
        );
        
      }
      
    }
    
    
    // srcsetの配列をCSV形式の文字列に変換
    if (srcSetArr.length > 0) {
      returnObj.srcSet = srcSetArr.join(', ');
    }
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return returnObj;
  
  
};




/**
 * imagesAndVideosObj localesArr をフォーマットする
 * captionを出力する
 * @param {Object} localeObj - ロケール
 * @param {Object} obj - imagesAndVideosObj
 * @return {Array} フォーマットされた配列
 */
const formatLocalesArr = ({ localeObj, obj }) => {
  
  
  // --------------------------------------------------
  //   Return Array
  // --------------------------------------------------
  
  const returnArr = [];
  
  
  // --------------------------------------------------
  //   データ取得
  // --------------------------------------------------
  
  const type = lodashGet(obj, ['type'], '');
  const arr = lodashGet(obj, ['arr'], []);
  
  
  // --------------------------------------------------
  //   必要なデータがない場合は処理停止
  // --------------------------------------------------
  
  if (!type || arr.length === 0) {
    return null;
  }
  
  
  // --------------------------------------------------
  //   Loop
  // --------------------------------------------------
  
  for (let valueObj of arr.values()) {
    
    
    // --------------------------------------------------
    //   Deep Copy
    // --------------------------------------------------
    
    const clonedObj = lodashCloneDeep(valueObj);
    
    
    // --------------------------------------------------
    //   Video
    // --------------------------------------------------
    
    if (valueObj.type === 'video') {
      returnArr.push(clonedObj);
      continue;
    }
    
    
    // --------------------------------------------------
    //   表示する言語のデータを取得
    // --------------------------------------------------
    
    const localesArr = lodashGet(valueObj, ['localesArr'], []);
    
    const filteredArr = localesArr.filter((filterObj) => {
      return filterObj.language === localeObj.language;
    });
    
    
    // console.log(`
    //   ----- localesArr -----\n
    //   ${util.inspect(localesArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- filteredArr -----\n
    //   ${util.inspect(filteredArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   Captionを設定
    // --------------------------------------------------
    
    if (lodashHas(filteredArr, [0])) {
      
      clonedObj.caption = lodashGet(filteredArr, [0, 'caption'], '');
      
    } else {
      
      clonedObj.caption = lodashGet(valueObj, ['localesArr', 0, 'caption'], '');
      
    }
    
    
    // --------------------------------------------------
    //   不要な項目を削除する
    // --------------------------------------------------
    
    delete clonedObj.localesArr;
    
    
    // --------------------------------------------------
    //   Push
    // --------------------------------------------------
    
    returnArr.push(clonedObj);
    
    
  }
  
  
  // --------------------------------------------------
  //   Return Object
  // --------------------------------------------------
  
  const returnObj = {
    type,
    arr: returnArr,
  };
  
  
  // console.log(`\n---------- formatLocalesArr / returnObj ----------\n`);
  // console.dir(JSON.parse(JSON.stringify(returnObj)));
  // console.log(`\n-----------------------------------\n`);
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return returnObj;
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  formatImagesAndVideosArr,
  formatImagesAndVideosObj,
  formatSrcSetArr,
  formatLocalesArr,
};