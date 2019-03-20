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

const lodashGet = require('lodash/get');
const Jimp = require('jimp');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');



// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * 画像を保存して、配列を変更する
 * @param {Object} argumentsObj - 引数の入ったオブジェクト
 * @return {Object} 取得したデータまたはエラーオブジェクト
 */
const imageSave = ({ newArr, oldArr, directoryPath }) => {
  
  
  console.log(`
    ----- newArr -----\n
    ${util.inspect(newArr, { colors: true, depth: null })}\n
    --------------------\n
  `);
  
  console.log(`
    ----- oldArr -----\n
    ${util.inspect(oldArr, { colors: true, depth: null })}\n
    --------------------\n
  `);
  
  console.log(chalk`
    directoryPath: {green ${directoryPath}}
  `);
  
  
  // ---------------------------------------------
  //   Property
  // ---------------------------------------------
  
  let resultArr = [];
  
  
  // ---------------------------------------------
  //   Fetch
  // ---------------------------------------------
  
  const _id = lodashGet(newArr, [0, '_id'], '');
  const src = lodashGet(newArr, [0, 'srcSetArr', 0, 'src'], '');
  const w = lodashGet(newArr, [0, 'srcSetArr', 0, 'w'], '');
  const width = lodashGet(newArr, [0, 'srcSetArr', 0, 'width'], '');
  const height = lodashGet(newArr, [0, 'srcSetArr', 0, 'height'], '');
  const extension = src.slice(src.indexOf('/') + 1, src.indexOf(';'));
  
  console.log(chalk`
    _id: {green ${_id}}
    src: {green ${src}}
    w: {green ${w}}
    width: {green ${width}}
    height: {green ${height}}
    extension: {green ${extension}}
  `);
  
  
  
  if (w === 'upload' && src.indexOf('base64') !== -1) {
    
    const buff = Buffer.from(src.slice(src.indexOf('base64') + 7), 'base64');
    
    Jimp.read(buff, (err, lenna) => {
      
      console.log(err);
      console.log(lenna);
      
      if (err) throw err;
      lenna
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(`${directoryPath}${_id}/sample.jpg`); // save
        
    });
    
  }
  
  
  
  // for (let valueArr of newArr.values()) {
    
  //   const src = lodashGet(valueArr, ['srcSetArr', 0, 'src'], '');
    
  //   // console.log(`
  //   //   ----- valueArr / ${ISO8601} -----\n
  //   //   ${util.inspect(valueArr, { colors: true, depth: null })}\n
  //   //   --------------------\n
  //   // `);
    
  
    
  //   // if (src.indexOf('base64') !== -1) {
      
  //   //   // const buff = Buffer.from(src.replace(/^data:image\/png;base64,/, ""), 'base64');
  //   //   const buff = Buffer.from(src.slice(src.indexOf('base64') + 7), 'base64');
  //   //   // const buff = Buffer.from(src, 'base64');
      
  //   //   Jimp.read(buff, (err, lenna) => {
        
  //   //     console.log(err);
  //   //     console.log(lenna);
        
  //   //     if (err) throw err;
  //   //     lenna
  //   //       .resize(256, 256) // resize
  //   //       .quality(60) // set JPEG quality
  //   //       .greyscale() // set greyscale
  //   //       .write('lena-small-bw.jpg'); // save
  //   //   });
      
  //   // }
    
    
  // }
  
  
  
  
};



// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  imageSave
};