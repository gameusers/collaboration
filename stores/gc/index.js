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
  
  // @observable modalImageSrc = null;
  @observable dialogOpen = false;
  @observable modalVideoChannel = null;
  @observable modalVideoId = null;
  @observable modalVideoOpen = false;
  
  
  @action.bound
  dialogOpenFunction(src) {
    this.dialogOpen = true;
  };
  
  @action.bound
  dialogCloseFunction() {
    this.dialogOpen = false;
  };
  
  // @action.bound
  // modalVideoOpenFunction(channel, id) {
  //   this.modalVideoChannel = channel;
  //   this.modalVideoId = id;
  //   this.modalVideoOpen = true;
  // };
  
  // @action.bound
  // modalVideoCloseFunction() {
  //   this.modalVideoOpen = false;
  // };
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreGcIndex(isServer) {
  
  if (isServer) {
    
    return new Store();
    
  } else {
    
    if (store === null) {
      store = new Store();
    }
    
    return store;
    
  }
  
}