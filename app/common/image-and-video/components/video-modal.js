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
import { observer } from 'mobx-react';
import ModalVideo from 'react-modal-video';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreImageAndVideo from 'app/common/image-and-video/stores/image-and-video.js';






// --------------------------------------------------
//   Class
// --------------------------------------------------

@observer
export default class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    
    // --------------------------------------------------
    //   super
    // --------------------------------------------------
    
    super(props);
    
    
    // --------------------------------------------------
    //   Store
    // --------------------------------------------------
    
    this.storeImageAndVideo = initStoreImageAndVideo({});
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <ModalVideo
        channel={this.storeImageAndVideo.modalVideoChannel}
        isOpen={this.storeImageAndVideo.modalVideoOpen}
        videoId={this.storeImageAndVideo.modalVideoID}
        onClose={this.storeImageAndVideo.handleModalVideoClose}
      />
    );
    
  }
  
  
};