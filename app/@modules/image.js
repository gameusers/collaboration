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
// const fs = require('fs').promises;
const Jimp = require('jimp');
const imagemin = require('imagemin');
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
    
    let ratio = height / width;
    
    // if (width < height) {
    //   ratio = width / height;
    // }
    
    
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
      
      let resizedWidthArr = [800, 640, 480, 320];
      
      if (width < 480) {
        resizedWidthArr = [320];
      } else if (width < 640) {
        resizedWidthArr = [480, 320];
      } else if (width < 800) {
        resizedWidthArr = [640, 480, 320];
      }
      
      // console.log(`
      //   ----- resizedWidthArr -----\n
      //   ${util.inspect(resizedWidthArr, { colors: true, depth: null })}\n
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
      
      
      for (let resizedWidth of resizedWidthArr.values()) {
        
        
        // ---------------------------------------------
        //   高さを計算する
        // ---------------------------------------------
        
        const resizedHeight = Math.round(resizedWidth * ratio);
        
        console.log(chalk`
          ratio: {green ${ratio}}
          resizedHeight: {green ${resizedHeight}}
        `);
        
        
        // ---------------------------------------------
        //   画像をリサイズ＆圧縮する
        // ---------------------------------------------
        
        let buff = Buffer.from(src.slice(src.indexOf('base64') + 7), 'base64');
        
        // 画像がSVGでない場合、リサイズする
        if (extension !== 'svg') {
          const image = await Jimp.read(buff);
          image.resize(resizedWidth, resizedHeight);
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
        
        const fileName = `${resizedWidth}w.${extension}`;
        
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