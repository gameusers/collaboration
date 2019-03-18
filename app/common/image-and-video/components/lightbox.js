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

const { formatImagesAndVideosArr } = require('../../../@format/image');




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
    
    const { stores, _id, imagesAndVideosArr } = this.props;
    
    const {
      
      lightboxObj,
      handleLightboxClose,
      handleLightboxPrevious,
      handleLightboxNext,
      
    } = stores.imageAndVideo;
    
    const currentNo = lodashGet(lightboxObj, [_id, 'currentNo'], 0);
    const open = lodashGet(lightboxObj, [_id, 'open'], false);
    
    
    // --------------------------------------------------
    //   配列が空の場合は処理停止
    // --------------------------------------------------
    
    if (!imagesAndVideosArr || imagesAndVideosArr.length === 0) {
      return null;
    }
    
    
    // --------------------------------------------------
    //   Format
    // --------------------------------------------------
    
    const imagesArr = formatImagesAndVideosArr({ arr: imagesAndVideosArr });
    
    
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
        onClickPrev={() => handleLightboxPrevious({ _id })}
        onClickNext={() => handleLightboxNext({ _id })}
        onClose={() => handleLightboxClose({ _id })}
        backdropClosesModal
      />
    );
    
  }
  
};