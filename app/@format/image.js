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
  formatSrcSetArr,
  formatLocalesArr,
};