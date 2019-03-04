// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

import chalk from 'chalk';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import Lightbox from 'react-images';
import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { formatImageVideoArr } = require('../../../@format/image');




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
@observer
export default class extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, _id, imageVideoArr } = this.props;
    
    const {
      
      lightboxObj,
      // handleEditLightbox,
      // handleLightboxOpen,
      handleLightboxClose,
      handleLightboxPrevious,
      handleLightboxNext,
      
    } = stores.layout;
    
    const currentNo = lodashGet(lightboxObj, [_id, 'currentNo'], 0);
    const open = lodashGet(lightboxObj, [_id, 'open'], false);
    
    
    // --------------------------------------------------
    //   配列が空の場合は処理停止
    // --------------------------------------------------
    
    if (!imageVideoArr || imageVideoArr.length === 0) {
      return null;
    }
    
    
    // --------------------------------------------------
    //   Format
    // --------------------------------------------------
    
    const imagesArr = formatImageVideoArr({ imageVideoArr });
    
    
    // --------------------------------------------------
    //   Images
    // --------------------------------------------------
    
    // const imagesArr = [];
    
    // for (const [index, valueObj] of imageVideoArr.entries()) {
      
    //   // {
    //   //   src: 'http://example.com/example/img1.jpg',
    //   //   caption: 'A forest'
    //   //   // As an array
    //   //   srcSet: [
    //   //     'http://example.com/example/img1_1024.jpg 1024w',
    //   //     'http://example.com/example/img1_800.jpg 800w',
    //   //     'http://example.com/example/img1_500.jpg 500w',
    //   //     'http://example.com/example/img1_320.jpg 320w',
    //   //   ],
    //   // },
      
    //   // console.log(`\n---------- valueObj ----------\n`);
    //   // console.dir(JSON.parse(JSON.stringify(valueObj)));
    //   // console.log(`\n-----------------------------------\n`);
      
    //   imagesArr[index] = {
    //     src: '',
    //     caption: valueObj.caption,
    //     srcSet: [],
    //   };
      
      
    //   for (let value2Obj of valueObj.imageSetArr.values()) {
        
    //     if (valueObj.type === 'image') {
          
    //       imagesArr[index].src = value2Obj.src;
          
    //       if (value2Obj.w === 'upload') {
            
    //         imagesArr[index].srcSet.push(
    //           `${value2Obj.src} 320w`
    //         );
            
    //       } else if (value2Obj.w !== 'source') {
            
    //         imagesArr[index].srcSet.push(
    //           `${value2Obj.src} ${value2Obj.w}`
    //         );
            
    //       }
          
    //     }
        
    //   }
      
    // }
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    //   open: {green ${open}}
    //   currentNo: {green ${currentNo}}
      
    // `);
    
    console.log(`\n---------- imagesArr ----------\n`);
    console.dir(JSON.parse(JSON.stringify(imagesArr)));
    console.log(`\n-----------------------------------\n`);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Lightbox
        images={imagesArr}
        currentImage={currentNo}
        isOpen={open}
        onClickPrev={() => handleLightboxPrevious({ _id })}
        onClickNext={() => handleLightboxNext({ _id })}
        onClose={() => handleLightboxClose({ _id })}
        backdropClosesModal
        preloadNextImage={false}
      />
    );
    
  }
  
};