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
  
  @observable modalWindowSrc = null;
  @observable modalWindowOpen = false;
 
  
  @action.bound
  modalWindowOpenFunction(src) {
    // console.log(`src = ${src}`);
    console.dir(src);
    this.modalWindowSrc = src;
    this.modalWindowOpen = true;
  };
  
  @action.bound
  modalWindowCloseFunction() {
    this.modalWindowOpen = false;
  };
  
  // @action.bound
  // setModalWindowSrc(src) {
  //   console.log(`src = ${src}`);
  //   this.modalWindowSrc = src;
  // };
  
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