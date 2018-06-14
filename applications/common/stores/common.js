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
  
  @observable modalImageSrc = null;
  @observable modalImageOpen = false;
  @observable modalVideoChannel = null;
  @observable modalVideoId = null;
  @observable modalVideoOpen = false;
  
  
  @action.bound
  modalImageOpenFunction(src) {
    this.modalImageSrc = src;
    this.modalImageOpen = true;
  };
  
  @action.bound
  modalImageCloseFunction() {
    this.modalImageOpen = false;
  };
  
  @action.bound
  modalVideoOpenFunction(channel, id) {
    this.modalVideoChannel = channel;
    this.modalVideoId = id;
    this.modalVideoOpen = true;
  };
  
  @action.bound
  modalVideoCloseFunction() {
    this.modalVideoOpen = false;
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
      store = new Store();
    }
    
    return store;
    
  }
  
}