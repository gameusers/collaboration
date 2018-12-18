// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

// const chalk = require('chalk');
// const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------






// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * 取得する
 * @param {string} basePath - ベースになるパス
 * @param {Array} imageVideoArr - 
 * @return {Object} 取得されたデータ
 */
const srcset = (basePath, imageVideoArr) => {
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnArr = [];
  
  // console.log(typeof imageVideoArr[Symbol.iterator]);
  
  
  // --------------------------------------------------
  //   データ処理
  // --------------------------------------------------
  
  if (imageVideoArr.length > 0) {
    
    // for (let value of imageVideoArr.values()) {
    for (let value of imageVideoArr) {
      
      if (value.type === 'image') {
        
        const tempArr = [];
        let extension = '';
        let imageSrc = '';
        
        if (value.fileFormat === 'JPEG') {
          extension = '.jpg';
        } else if (value.fileFormat === 'PNG') {
          extension = '.png';
        } else if (value.fileFormat === 'GIF') {
          extension = '.gif';
        }
        
        
        // for (let value2 of value.srcSetArr.values()) {
        for (let value2 of value.srcSetArr) {
          
          if (value2.w !== 'source') {
            // const src = `${basePath}${value._id}/${value2.w}${extension} ${value2.w}`;
            tempArr.push(`${basePath}${value._id}/${value2.w}${extension} ${value2.w}`);
            imageSrc = `${basePath}${value._id}/${value2.w}${extension}`;
          }
          
        }
        
        returnArr.push({
          imageSrcSet: tempArr.join(', '),
          imageSrc: imageSrc,
          imageAlt: value.caption
        });
        
      }
      
    }
    
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


// imageSrcSet: '/static/img/card/player/H_NXaMPKG/320w.jpg 320w, /static/img/card/player/H_NXaMPKG/480w.jpg 480w, /static/img/card/player/H_NXaMPKG/640w.jpg 640w, /static/img/card/player/H_NXaMPKG/800w.jpg 800w',
// imageSrc: '/static/img/card/player/H_NXaMPKG/800w.jpg',
// imageAlt: 'ライオン',

// imageVideoArr: [
//       {
//         id: 'H_NXaMPKG',
//         type: 'image',
//         caption: 'ライオン',
//         fileFormat: 'JPEG',
//         srcSetArr: [
//           {
//             w: '320w',
//             width: 320,
//             height: 180,
//           },
//           {
//             w: '480w',
//             width: 480,
//             height: 270,
//           },
//           {
//             w: '640w',
//             width: 640,
//             height: 360,
//           },
//           {
//             w: '800w',
//             width: 800,
//             height: 450,
//           },
//           {
//             w: 'source',
//             width: 1920,
//             height: 1080,
//           },
//         ],
//       },
//     ],



// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  srcset
};