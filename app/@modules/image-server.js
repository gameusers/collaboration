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

const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const shortid = require('shortid');
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
 * @param {Array} newArr - 新しい画像情報の入った配列
 * @param {Array} oldArr - 古い（データベースから取得した）画像情報の入った配列
 * @param {string} directoryPath - 保存先のディレクトリーのパス
 * @param {number} minSize - 画像の最小サイズ指定
 * @param {boolean} square - 正方形にする場合 true
 * @return {Array} 画像情報の入った配列
 */
const imageSave = async ({ newArr, oldArr = [], directoryPath, minSize, square }) => {
  
  
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
  //   minSize: {green ${minSize}}
  //   square: {green ${square}}
  // `);
  
  
  // ---------------------------------------------
  //   配列が空の場合は処理停止
  // ---------------------------------------------
  
  if (newArr.length === 0 && oldArr.length === 0) {
    return [];
  }
  
  
  // ---------------------------------------------
  //   画像を保存、削除できるディレクトリーを制限する
  //   関係のないパスが送られた場合は処理停止
  // ---------------------------------------------
  
  if (!directoryPath.startsWith('static/img/')) {
    throw new Error('imageSave 1');
  }
  
  
  
  
  // ---------------------------------------------
  //   Property
  // ---------------------------------------------
  
  let returnArr = [];
  let _idsArr = [];
  
  
  // ---------------------------------------------
  //   画像を保存する
  // ---------------------------------------------
  
  for (let valueObj of newArr.values()) {
    
    
    // console.log(`
    //   ----- valueObj -----\n
    //   ${util.inspect(valueObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    if (valueObj.type !== 'image') {
      // console.log('continue');
      returnArr.push(valueObj);
      continue;
    }
    
    
    // ---------------------------------------------
    //   Return Object
    // ---------------------------------------------
    
    let returnObj = valueObj;
    
    
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
      
      
      // ---------------------------------------------
      //   ディレクトリ作成
      // ---------------------------------------------
      
      const dirPath = `${directoryPath}${_id}/`;
      
      mkdirp.sync(dirPath, (err) => {
        if (err) {
          throw new Error('mkdir');
        }
      });
      
      
      // ---------------------------------------------
      //   srcset用の配列を作成
      // ---------------------------------------------
      
      let srcSetArr = [];
      
      
      let longSideArr = [320, 480, 640, 800];
      
      if (width < 480) {
        longSideArr = [320];
      } else if (width < 640) {
        longSideArr = [320, 480];
      } else if (width < 800) {
        longSideArr = [320, 480, 640];
      }
      
      
      for (let longSide of longSideArr.values()) {
        
        
        // ---------------------------------------------
        //   横幅・高さを計算する
        // ---------------------------------------------
        
        const calculatedObj = imageCalculateSize({ width, height, minSize, maxSize: longSide, square });
        
        // console.log(`
        //   ----- calculatedObj -----\n
        //   ${util.inspect(calculatedObj, { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
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
        
        
        // ---------------------------------------------
        //   ファイル保存
        // ---------------------------------------------
        
        const srcSetSrc = `${dirPath}${longSide}w.${extension}`;
        fs.writeFileSync(srcSetSrc, optimizedBuffer);
        
        
        // ---------------------------------------------
        //   srcSetArr 作成
        // ---------------------------------------------
        
        srcSetArr.push({
          _id: shortid.generate(),
          src: `/${srcSetSrc}`,
          w: `${longSide}w`,
          width: calculatedObj.width,
          height: calculatedObj.height,
        });
        
        
      }
      
      
      // ---------------------------------------------
      //   srcSetArr 置き換え
      // ---------------------------------------------
      
      returnObj.srcSetArr = srcSetArr;
      
      
    }
    
    
    // ---------------------------------------------
    //   削除用　_idの入った配列作成
    // ---------------------------------------------
    
    _idsArr.push(_id);
    
    
    // ---------------------------------------------
    //   結果オブジェクト作成
    // ---------------------------------------------
    
    returnArr.push(returnObj);
    
    
  }
  
  
  // ---------------------------------------------
  //   画像を削除する
  // ---------------------------------------------
  
  // console.log(`
  //   ----- _idsArr -----\n
  //   ${util.inspect(_idsArr, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  for (let valueObj of oldArr.values()) {
    
    // console.log(`
    //   ----- valueObj -----\n
    //   ${util.inspect(valueObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    if (_idsArr.includes(valueObj._id) === false) {
      
      const dirPath = `${directoryPath}${valueObj._id}/`;
      // const dirPath = `static/img/card/players/test/glbzJb34t/`;
      
      
      rimraf(dirPath, (err) => {
        if (err) {
          console.log(err);
        }
      });
      
      // console.log(chalk`
      //   valueObj._id: {green ${valueObj._id}}
      //   dirPath: {green ${dirPath}}
      // `);
      
      // console.log(`\n---------- fs.statSync(dirPath) ----------\n`);
      // console.dir(fs.statSync(dirPath));
      // console.log(`\n-----------------------------------\n`);
      
    }
    
    
  }
  
  
  
  
  // ---------------------------------------------
  //   Return
  // ---------------------------------------------
  
  return returnArr;
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  imageSave
};