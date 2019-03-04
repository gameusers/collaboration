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
 * Image & Video 情報の入った配列をフォーマットする 
 * @param {Array} imageVideoArr - 
 * @return {Object} フォーマットされたデータ
 */
const formatImageVideoArr = ({ imageVideoArr }) => {
  
  console.log(`\n---------- imageVideoArr ----------\n`);
  console.dir(JSON.parse(JSON.stringify(imageVideoArr)));
  console.log(`\n-----------------------------------\n`);
  
  
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnArr = [];
  
  
  // --------------------------------------------------
  //   データ処理
  // --------------------------------------------------
  
  if (imageVideoArr.length > 0) {
    
    // const imagesArr = [];
    
    
    for (const [index, valueObj] of imageVideoArr.entries()) {
      
      if (valueObj.type === 'image') {
        
        const srcSetArr = [];
        
        // console.log(`\n---------- valueObj ----------\n`);
        // console.dir(JSON.parse(JSON.stringify(valueObj)));
        // console.log(`\n-----------------------------------\n`);
        // --------------------------------------------------
        //   Lightbox のライブラリで使用できるフォーマットにする
        //   https://github.com/jossmac/react-images
        // --------------------------------------------------
        
        returnArr[index] = {
          src: '',
          caption: valueObj.caption,
          srcSet: '',
        };
        
        
        for (let value2Obj of valueObj.srcSetArr.values()) {
          
          // 画像をアップロードするときに、base64形式でプレビューを表示する
          // その際、とりあえず srcset の値を 320w ということにして表示する
          if (value2Obj.w === 'upload') {
            
            returnArr[index].src = value2Obj.src;
            
            srcSetArr.push(
              `${value2Obj.src} 320w`
            );
            
          } else if (value2Obj.w !== 'source') {
            
            returnArr[index].src = value2Obj.src;
            
            srcSetArr.push(
              `${value2Obj.src} ${value2Obj.w}`
            );
            
          }
          
        }
        
        
        if (srcSetArr.length > 0) {
          returnArr[index].srcSet = srcSetArr.join(', ');
        }
        
        
      }
      
    }
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return returnArr;
  
  
};




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
  
  
  // --------------------------------------------------
  //   データ処理
  // --------------------------------------------------
  
  if (imageVideoArr.length > 0) {
    
    for (let valueObj of imageVideoArr) {
      
      if (valueObj.type === 'image') {
        
        const tempArr = [];
        let extension = '';
        let imageSrc = '';
        
        if (valueObj.fileFormat === 'JPEG') {
          extension = '.jpg';
        } else if (valueObj.fileFormat === 'PNG') {
          extension = '.png';
        } else if (valueObj.fileFormat === 'GIF') {
          extension = '.gif';
        }
        
        
        // for (let value2 of value.srcSetArr.values()) {
        for (let value2 of valueObj.srcSetArr) {
          
          if (value2.w !== 'source') {
            // const src = `${basePath}${value._id}/${value2.w}${extension} ${value2.w}`;
            tempArr.push(`${basePath}${valueObj._id}/${value2.w}${extension} ${value2.w}`);
            imageSrc = `${basePath}${valueObj._id}/${value2.w}${extension}`;
          }
          
        }
        
        returnArr.push({
          imageSrcSet: tempArr.join(', '),
          imageSrc: imageSrc,
          imageAlt: valueObj.caption
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
  formatImageVideoArr,
  srcset
};