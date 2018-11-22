// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------






// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * 取得する
 * @param {array} userIdArr - User IDの入った配列 [8OM0dhDak, Wk_nHYW0q, oXiNOYRax]
 * @return {object} 取得されたデータ
 */
const toKeyObject = (object) => {
  
  // console.log(`
  //   imageVideoArr: \n${util.inspect(imageVideoArr, { colors: true, depth: null })}
  // `);
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnArr = [];
  
  
  // --------------------------------------------------
  //   Find
  // --------------------------------------------------
  for (const [key, value] of Object.entries(object)) {
    console.log(key, value);
  }
  
  
  // console.log(`
  //   returnArr: \n${util.inspect(returnArr, { colors: true, depth: null })}
  // `);
  
  // console.log(chalk`
  //   imageSrcSet: {green ${imageSrcSet}}
  //   imageSrc: {green ${imageSrc}}
  //   imageAlt: {green ${imageAlt}}
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
  srcset
};