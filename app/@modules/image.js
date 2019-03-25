// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');




// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * 画像のサイズを計算する、リサイズする場合などに利用
 * @param {number} width - 横幅
 * @param {number} height - 高さ
 * @param {number} maxSize - リサイズする横幅、または高さ
 * @return {Object} 横幅、高さの入ったオブジェクト
 */
const imageCalculateSize = ({ width, height, specifiedWidth, specifiedHeight, minSize, maxSize, square }) => {
  
  
  // ---------------------------------------------
  //   比率を計算する
  // ---------------------------------------------
  
  let ratio = height / width;
  
  if (width < height) {
    ratio = width / height;
  }
  
  
  // ---------------------------------------------
  //   横幅・高さを計算する
  // ---------------------------------------------
  
  let resizedWidth = 0;
  let resizedHeight = 0;
  
  
  // ---------------------------------------------
  //   正方形＆最大サイズ指定
  // ---------------------------------------------
  
  if (square && minSize && maxSize) {
    
    
    if (width < minSize || height < minSize) {
      
      resizedWidth = minSize;
      resizedHeight = minSize;
      
    } else if (width < maxSize && height < maxSize) {
      
      if (width > height) {
        
        resizedWidth = width;
        resizedHeight = width;
        
      } else {
        
        resizedWidth = height;
        resizedHeight = height;
        
      }
      
    } else if (width < maxSize && height > maxSize) {
      
      resizedWidth = width;
      resizedHeight = width;
      
    } else if (width > maxSize && height < maxSize) {
      
      resizedWidth = height;
      resizedHeight = height;
      
    } else {
      
      resizedWidth = maxSize;
      resizedHeight = maxSize;
      
    }
    
    
  // ---------------------------------------------
  //   最大サイズ指定
  // ---------------------------------------------
    
  } else if (maxSize) {
    
    if (width < maxSize && height < maxSize) {
      
      resizedWidth = width;
      resizedHeight = height;
      
    } else if (width > height) {
      
      resizedWidth = maxSize;
      resizedHeight = Math.round(maxSize * ratio);
      
    } else {
      
      resizedWidth = Math.round(maxSize * ratio);
      resizedHeight = maxSize;
      
    }
    
    
  // ---------------------------------------------
  //   横幅指定
  // ---------------------------------------------
    
  } else if (specifiedWidth) {
    
    resizedWidth = specifiedWidth;
    resizedHeight = Math.round(specifiedWidth * ratio);
  
  
  // ---------------------------------------------
  //   縦幅指定
  // ---------------------------------------------
    
  } else if (specifiedHeight) {
    
    resizedWidth = Math.round(specifiedHeight * ratio);
    resizedHeight = specifiedHeight;
    
  }
  
  
  // // ---------------------------------------------
  // //   横長画像
  // // ---------------------------------------------
  
  // if (width > height) {
    
  //   if (maxSize) {
      
  //     resizedWidth = maxSize;
  //     resizedHeight = Math.round(maxSize * ratio);
      
  //   } else if (maxWidth) {
      
  //     resizedWidth = maxWidth;
  //     resizedHeight = Math.round(maxWidth * ratio);
      
  //   } else if (maxHeight) {
      
  //     resizedWidth = Math.round(maxHeight * ratio);
  //     resizedHeight = maxHeight;
      
  //   }
    
    
  // // ---------------------------------------------
  // //   縦長画像
  // // ---------------------------------------------
    
  // } else {
    
    
    
  // }
  
  
  
  // if (maxSize) {
    
  //   if (width > height) {
  //     resizedWidth = maxSize;
  //     resizedHeight = Math.round(maxSize * ratio);
  //   } else {
  //     resizedWidth = Math.round(maxSize * ratio);
  //     resizedHeight = maxSize;
  //   }
    
  // } else if (maxWidth) {
    
  //   resizedWidth = maxWidth;
  //   resizedHeight = Math.round(maxWidth * ratio);
    
  // } else if (maxHeight) {
    
  //   resizedWidth = Math.round(maxHeight * ratio);
  //   resizedHeight = maxHeight;
    
  // }
  
  
  
  
  // ---------------------------------------------
  //   console.log
  // ---------------------------------------------
  
  // console.log(`
  //   ----- newArr -----\n
  //   ${util.inspect(newArr, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(`
  //   ----- oldArr -----\n
  //   ${util.inspect(oldArr, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(chalk`
  //   directoryPath: {green ${directoryPath}}
  // `);
  
  
  // ---------------------------------------------
  //   Return
  // ---------------------------------------------
  
  return { width: resizedWidth, height: resizedHeight };
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  imageCalculateSize
};