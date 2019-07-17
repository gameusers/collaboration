// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

const chalk = require('chalk');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

const lodashGet = require('lodash/get');




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
        
        const caption = lodashGet(valueObj, ['localesArr', 0, 'caption'], '');
        
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




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  formatImagesAndVideosArr,
};