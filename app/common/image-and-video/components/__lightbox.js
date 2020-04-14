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
import Carousel, { Modal, ModalGateway } from 'react-images';

import lodashGet from 'lodash/get';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('storeImageAndVideo')
@observer
export default class Lightbox extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  // constructor(props) {
  //   super(props);
  // }
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const {
      
      storeImageAndVideo,
      pathArr = [],
      imagesArr = [],
      
    } = this.props;
    
    
    const {
      
      lightboxObj,
      handleLightboxClose,
      handleLightboxPrevious,
      handleLightboxNext,
      
    } = storeImageAndVideo;
    
    
    
    
    // --------------------------------------------------
    //   配列が空の場合は処理停止
    // --------------------------------------------------
    
    if (imagesArr.length === 0) {
      return null;
    }
    
    
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const currentNo = lodashGet(lightboxObj, [...pathArr, 'currentNo'], 0);
    const open = lodashGet(lightboxObj, [...pathArr, 'open'], false);
    
    
    
    // --------------------------------------------------
    //   Loop
    // --------------------------------------------------
    
    const viewsArr = [];
    
    for (const [index, valueObj] of imagesArr.entries()) {
      
      viewsArr.push({
        source: valueObj.src
      });
      
    }
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    console.log(`
      ----------------------------------------\n
      /app/common/image-and-video/components/lightbox-srl.js
    `);
    
    console.log(`
      ----- imagesArr -----\n
      ${util.inspect(JSON.parse(JSON.stringify(imagesArr)), { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    console.log(`
      ----- viewsArr -----\n
      ${util.inspect(JSON.parse(JSON.stringify(viewsArr)), { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    // <Lightbox
    //     images={imagesArr}
    //     currentImage={currentNo}
    //     isOpen={open}
    //     onClickPrev={() => handleLightboxPrevious({ pathArr })}
    //     onClickNext={() => handleLightboxNext({ pathArr })}
    //     onClose={() => handleLightboxClose({ pathArr })}
    //     backdropClosesModal
    //   />
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <ModalGateway>
        
        {open ? (
        
          <Modal
            onClose={() => handleLightboxClose({ pathArr })}
          >
            <Carousel
              views={viewsArr}
              styles={{
                // footer: base => ({
                //   ...base,
                //   background: 'none !important',
                //   color: '#666',
                //   padding: 0,
                //   paddingTop: 20,
                //   position: 'static',

                //   '& a': {
                //     color: 'black',
                //   },
                // }),
                // header: base => ({
                //   ...base,
                //   background: 'none !important',
                //   padding: 0,
                //   paddingBottom: 10,
                //   position: 'static',
                // }),
                // headerClose: base => ({
                //   ...base,
                //   color: '#666',

                //   ':hover': { color: '#DE350B' },
                // }),
                view: base => ({
                  // ...base,
                  height: 800,
                  width: 600,
                  // maxHeight: 480,
                  // overflow: 'hidden',
                }),
              }}
            />
          </Modal>
          
        ) : null}
        
      </ModalGateway>
    );
    
  }
  
};