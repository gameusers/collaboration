// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import Lightbox from 'react-images';
import lodashGet from 'lodash/get';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('storeImageAndVideo')
@observer
export default class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    super(props);
  }
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { storeImageAndVideo, pathArr = [], imagesArr = [] } = this.props;
    
    const {
      
      lightboxObj,
      handleLightboxClose,
      handleLightboxPrevious,
      handleLightboxNext,
      
    } = storeImageAndVideo;
    
    const currentNo = lodashGet(lightboxObj, [...pathArr, 'currentNo'], 0);
    const open = lodashGet(lightboxObj, [...pathArr, 'open'], false);
    
    
    // --------------------------------------------------
    //   配列が空の場合は処理停止
    // --------------------------------------------------
    
    if (imagesArr.length === 0) {
      return null;
    }
    
    
    // --------------------------------------------------
    //   Format
    // --------------------------------------------------
    
    // const imagesArr = formatImagesAndVideosArr({ arr: imagesAndVideosArr });
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    //   open: {green ${open}}
    //   currentNo: {green ${currentNo}}
      
    // `);
    
    // console.log(`\n---------- imagesArr ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(imagesArr)));
    // console.log(`\n-----------------------------------\n`);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Lightbox
        images={imagesArr}
        currentImage={currentNo}
        isOpen={open}
        onClickPrev={() => handleLightboxPrevious({ pathArr })}
        onClickNext={() => handleLightboxNext({ pathArr })}
        onClose={() => handleLightboxClose({ pathArr })}
        backdropClosesModal
      />
    );
    
  }
  
};