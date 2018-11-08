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
const srcset = (imagePath, imageVideoArr) => {
  
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
  
  if (imageVideoArr.length > 0) {
    
    for (let value of imageVideoArr.values()) {
      
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
        
        
        for (let value2 of value.srcSetArr.values()) {
          
          if (value2.w !== 'source') {
            // const src = `${imagePath}${value._id}/${value2.w}${extension} ${value2.w}`;
            tempArr.push(`${imagePath}${value._id}/${value2.w}${extension} ${value2.w}`);
            imageSrc = `${imagePath}${value._id}/${value2.w}${extension}`;
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