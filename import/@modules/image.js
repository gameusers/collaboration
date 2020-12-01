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
const fs = require('fs');
const Jimp = require('jimp');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

const lodashGet = require('lodash/get');






// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * 画像を保存する
 */
const saveImageAndVideo = async ({

  pass,
  type,
  id1,
  id2,
  users_id,
  ISO8601,
  heroImage = false,
  imagesAndVideosObj,

}) => {


  // ---------------------------------------------
  //   Property
  // ---------------------------------------------

  const returnArr = [];




  // ---------------------------------------------
  //   console.log
  // ---------------------------------------------

  // console.log(`
  //   ----- newObj -----\n
  //   ${util.inspect(newObj, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);

  // console.log(chalk`
  //   users_id: {green ${users_id}}
  //   id1: {green ${id1}}
  //   id2: {green ${id2}}
  //   ISO8601: {green ${ISO8601}}
  //   minSize: {green ${minSize}}
  //   heroImage: {green ${heroImage}}
  // `);

  // return;


  // ---------------------------------------------
  //   基本的な設定
  // ---------------------------------------------

  let imageType = 'JPEG';
  let extension = 'jpg';
  let mimeType = 'image/jpeg';
  let maxWidth = 1920;
  let maxHeight = 1080;
  let width = 0;
  let height = 0;
  let w = '320w';


  // ---------------------------------------------
  //   ur
  // ---------------------------------------------

  if (type === 'ur') {

    imageType = 'PNG';
    extension = 'png';
    mimeType = 'image/jpeg';
    maxWidth = 320;
    maxHeight = 320;


  // ---------------------------------------------
  //   uc
  // ---------------------------------------------

  } else if (type === 'uc') {

    imageType = 'PNG';
    extension = 'png';
    mimeType = 'image/jpeg';
    maxWidth = 320;
    maxHeight = 320;


  // ---------------------------------------------
  //   gc
  // ---------------------------------------------

  } else if (type === 'gc' && !heroImage) {

    imageType = 'PNG';
    extension = 'png';
    mimeType = 'image/jpeg';
    maxWidth = 320;
    maxHeight = 320;


  // ---------------------------------------------
  //   gc / heroImage
  // ---------------------------------------------

  } else if (type === 'gc' && heroImage) {

    w = '1920w';

  }




  try {


    // ---------------------------------------------
    //   Jimp
    // ---------------------------------------------

    const image = await Jimp.read(pass);
    let buff = await image.getBufferAsync(mimeType);


    // ---------------------------------------------
    //   sourceWidth & sourceheight
    // ---------------------------------------------

    const sourceWidth = image.bitmap.width;
    const sourceheight = image.bitmap.height;

    // console.log(chalk`
    //   sourceWidth: {green ${sourceWidth}}
    //   sourceheight: {green ${sourceheight}}
    // `);


    // ---------------------------------------------
    //   リサイズする
    // ---------------------------------------------

    if (type === 'forum' || type === 'recruitment') {

      width = sourceWidth;
      height = sourceheight;

      if (width < 480) {

        w = '320w';

      } else if (width < 640) {

        w = '480w';

      } else if (width < 800) {

        w = '640w';

      } else {

        w = '800w';

      }

    // 画像が指定のサイズより大きい場合、リサイズする
    } else if (!heroImage || sourceWidth > maxWidth || sourceheight > maxHeight) {

      image.resize(maxWidth, maxHeight);
      buff = await image.getBufferAsync(mimeType);

      width = maxWidth;
      height = maxHeight;

    } else {

      width = sourceWidth;
      height = sourceheight;

    }


    // ---------------------------------------------
    //   圧縮する
    // ---------------------------------------------

    const optimizedBuffer = await imagemin.buffer(buff, {

      plugins: [
        imageminMozjpeg({ quality: 80 }),
        imageminPngquant({ quality: [0.5, 0.7] }),
        imageminGifsicle(),
        imageminSvgo()
      ]

    });


    // ---------------------------------------------
    //   ディレクトリ作成　【チェック時は要コメントアウト】
    // ---------------------------------------------

    const dirPath = `import/img-new/${type}/${id1}/${id2}`;
    mkdirp.sync(dirPath);


    // ---------------------------------------------
    //   ファイル保存　【チェック時は要コメントアウト】
    // ---------------------------------------------

    const srcSetSrc = `import/img-new/${type}/${id1}/${id2}/${w}.${extension}`;
    fs.writeFileSync(srcSetSrc, optimizedBuffer);


    // ---------------------------------------------
    //   Return
    // ---------------------------------------------

    let returnObj = {};

    if (imagesAndVideosObj) {

      const arr = lodashGet(imagesAndVideosObj, ['arr'], []);

      arr.push({

        _id: id2,
        type: 'image',
        imageType,
        srcSetArr: [
          {
            _id: shortid.generate(),
            w,
            width,
            height,
          }
        ]

      });

      returnObj = {

        _id: id1,
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id,
        type,
        images: arr.length,
        videos: 0,
        arr,

      };

    } else {

      returnObj = {

        _id: id1,
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id,
        type,
        images: 1,
        videos: 0,
        arr: [
          {
            _id: id2,
            type: 'image',
            imageType,
            srcSetArr: [
              {
                _id: shortid.generate(),
                w,
                width,
                height,
              }
            ]
          }
        ],

      };

    }

    return returnObj;


  } catch (errorObj) {

    console.log(errorObj);
    return {};

  }


};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {

  saveImageAndVideo,

};
