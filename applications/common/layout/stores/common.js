// --------------------------------------------------
//   Import
// --------------------------------------------------

import { action, observable } from 'mobx';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let store = null;


// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  // ---------------------------------------------
  //   画像・動画モーダルウィンドウ
  // ---------------------------------------------
  
  @observable srcModalImage = null;
  @observable openModalImage = false;
  
  @action.bound
  handleOpenModalImage(src) {
    this.srcModalImage = src;
    this.openModalImage = true;
  };
  
  @action.bound
  handleCloseModalImage() {
    this.openModalImage = false;
  };
  
  
  @observable channelModalVideo = null;
  @observable idModalVideo = null;
  @observable openModalVideo = false;
  
  @action.bound
  handleOpenModalVideo(channel, id) {
    this.channelModalVideo = channel;
    this.idModalVideo = id;
    this.openModalVideo = true;
  };
  
  @action.bound
  handleCloseModalVideo() {
    this.openModalVideo = false;
  };
  
  
  
  // ---------------------------------------------
  //   Snackbar （通知用のバー）
  // ---------------------------------------------
  
  @observable messageSnackbar = 'init';
  @observable keySnackbar = 'key';
  @observable openSnackbar = false;
  queueSnackbarArr = [];
  
  
  @action.bound
  handleOpenSnackbar() {
    
    this.queueSnackbarArr.push({
      message: 'AAA',
      key: new Date().getTime(),
    });
    
    if (this.openSnackbar) {
      // immediately begin dismissing current message
      // to start showing new one
      this.openSnackbar = false;
    } else {
      console.log('handleOpenSnackbar');
      this.processQueue();
    }
    
    // this.openSnackbar = true;
  };
  
  processQueue = () => {
    
    if (this.queueSnackbarArr.length > 0) {
      console.log('processQueue');
      console.log(`messageSnackbar = ${this.messageSnackbar}`);
      const tempArr = this.queueSnackbarArr.shift();
      this.messageSnackbar = tempArr.message;
      this.keySnackbar = tempArr.key;
      
      this.openSnackbar = true;
    }
    
  };
  
  @action.bound
  handleCloseSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    
    this.openSnackbar = false;
  };
  
  @action.bound
  handleExitedSnackbar() {
    this.processQueue();
  };
  
  
  
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreCommon(isServer) {
  
  if (isServer) {
    
    return new Store();
    
  } else {
    
    if (store === null) {
      console.log('store = null');
      store = new Store();
    }
    
    return store;
    
  }
  
}