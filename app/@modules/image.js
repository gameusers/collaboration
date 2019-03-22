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
const imageCalculateSize = ({ width, height, maxWidth, maxHeight, maxSize }) => {
  
  
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
  
  if (maxSize) {
    
    if (width > height) {
      resizedWidth = maxSize;
      resizedHeight = Math.round(maxSize * ratio);
    } else {
      resizedWidth = Math.round(maxSize * ratio);
      resizedHeight = maxSize;
    }
    
  } else if (maxWidth) {
    
    resizedWidth = maxWidth;
    resizedHeight = Math.round(maxWidth * ratio);
    
  } else if (maxHeight) {
    
    resizedWidth = Math.round(maxHeight * ratio);
    resizedHeight = maxHeight;
    
  }
  
  
  
  
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