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

const mkdirp = require('mkdirp');
const lodashGet = require('lodash/get');
const fs = require('fs');
const Jimp = require('jimp');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { imageCalculateSize } = require('./image');




// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * 画像を保存して、配列を変更する
 * @param {Object} argumentsObj - 引数の入ったオブジェクト
 * @return {Object} 取得したデータまたはエラーオブジェクト
 */
const imageSave = async ({ newArr, oldArr, directoryPath }) => {
  
  
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
  //   Property
  // ---------------------------------------------
  
  let resultArr = [];
  
  
  
  for (let valueObj of newArr.values()) {
    
    
    // console.log(`
    //   ----- valueObj -----\n
    //   ${util.inspect(valueObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // ---------------------------------------------
    //   画像データ取得
    // ---------------------------------------------
    
    const _id = lodashGet(valueObj, ['_id'], '');
    const src = lodashGet(valueObj, ['srcSetArr', 0, 'src'], '');
    const w = lodashGet(valueObj, ['srcSetArr', 0, 'w'], '');
    const width = lodashGet(valueObj, ['srcSetArr', 0, 'width'], '');
    const height = lodashGet(valueObj, ['srcSetArr', 0, 'height'], '');
    let extension = src.slice(src.indexOf('/') + 1, src.indexOf(';'));
    let mimeType = 'image/jpeg';
    
    if (extension === 'jpeg') {
      extension = 'jpg';
    } else if (extension === 'svg+xml') {
      extension = 'svg';
    } else if (extension === 'gif' || extension === 'png') {
      extension = 'png';
      mimeType = 'image/png';
    }
    
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    //   src: {green ${src}}
    //   w: {green ${w}}
    //   width: {green ${width}}
    //   height: {green ${height}}
    //   extension: {green ${extension}}
    // `);
    
    
    
    
    // ---------------------------------------------
    //   base64でuploadされた画像を処理する
    // ---------------------------------------------
    
    if (w === 'upload' && src.indexOf('base64') !== -1) {
      
      let longSideArr = [800, 640, 480, 320];
      
      if (width < 480) {
        longSideArr = [320];
      } else if (width < 640) {
        longSideArr = [480, 320];
      } else if (width < 800) {
        longSideArr = [640, 480, 320];
      }
      
      // console.log(`
      //   ----- longSideArr -----\n
      //   ${util.inspect(longSideArr, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   ディレクトリ作成
      // ---------------------------------------------
      
      // const dirPath = `${directoryPath}${_id}/test/`;
      const dirPath = `${directoryPath}test/`;
      
      mkdirp.sync(dirPath, (err) => {
        if (err) {
          throw new Error('mkdir');
        }
      });
      
      
      for (let longSide of longSideArr.values()) {
        
        
        // ---------------------------------------------
        //   横幅・高さを計算する
        // ---------------------------------------------
        
        const calculatedObj = imageCalculateSize({ width, height, maxSize: longSide });
        
        // console.log(`
        //   ----- calculatedObj -----\n
        //   ${util.inspect(calculatedObj, { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
        
        // let resizedWidth = 0;
        // let resizedHeight = 0;
        
        // if (width > height) {
        //   resizedWidth = longSide;
        //   resizedHeight = Math.round(longSide * ratio);
        // } else {
        //   resizedWidth = Math.round(longSide * ratio);
        //   resizedHeight = longSide;
        // }
        
        // console.log(chalk`
        //   ratio: {green ${ratio}}
        //   resizedWidth: {green ${resizedWidth}}
        //   resizedHeight: {green ${resizedHeight}}
        // `);
        
        
        // ---------------------------------------------
        //   画像をリサイズ＆圧縮する
        // ---------------------------------------------
        
        let buff = Buffer.from(src.slice(src.indexOf('base64') + 7), 'base64');
        
        // 画像がSVGでない場合、リサイズする
        if (extension !== 'svg') {
          const image = await Jimp.read(buff);
          image.resize(calculatedObj.width, calculatedObj.height);
          buff = await image.getBufferAsync(mimeType);
        }
        
        const optimizedBuffer = await imagemin.buffer(buff, {
          plugins: [
            imageminMozjpeg({ quality: 80 }),
            imageminPngquant({ quality: [0.5, 0.7] }),
            imageminGifsicle(),
            imageminSvgo()
          ]
        });
        
        // console.log(chalk`
        //   optimizedBuffer: {green ${optimizedBuffer}}
        // `);
        
        
        // ---------------------------------------------
        //   ファイル保存
        // ---------------------------------------------
        
        const fileName = `${longSide}w.${extension}`;
        
        fs.writeFileSync(`${dirPath}${fileName}`, optimizedBuffer);
        
        
      }
      
      
    }
    
    
  }
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  imageSave
};