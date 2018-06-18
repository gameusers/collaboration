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
  //   表示情報選択項目
  // ---------------------------------------------
  
  @observable showPassword = false;
  @observable categoryShow = true;
  @observable releaseDateShow = true;
  @observable priceShow = true;
  @observable playersShow = false;
  @observable hardwareShow = true;
  @observable developerShow = false;
  @observable linkShow = false;
  @observable tagShow = false;
  
  
  @action.bound
  followersChangeFunction() {
    if (this.followersShow) {
      this.followersShow = false;
    } else {
      this.followersShow = true;
    }
  };
  
  @action.bound
  categoryChangeFunction() {
    if (this.categoryShow) {
      this.categoryShow = false;
    } else {
      this.categoryShow = true;
    }
  };
  
  @action.bound
  releaseDateChangeFunction() {
    if (this.releaseDateShow) {
      this.releaseDateShow = false;
    } else {
      this.releaseDateShow = true;
    }
  };
  
  @action.bound
  priceChangeFunction() {
    if (this.priceShow) {
      this.priceShow = false;
    } else {
      this.priceShow = true;
    }
  };
  
  @action.bound
  playersChangeFunction() {
    if (this.playersShow) {
      this.playersShow = false;
    } else {
      this.playersShow = true;
    }
  };
  
  @action.bound
  hardwareChangeFunction() {
    if (this.hardwareShow) {
      this.hardwareShow = false;
    } else {
      this.hardwareShow = true;
    }
  };
  
  @action.bound
  developerChangeFunction() {
    if (this.developerShow) {
      this.developerShow = false;
    } else {
      this.developerShow = true;
    }
  };
  
  @action.bound
  linkChangeFunction() {
    if (this.linkShow) {
      this.linkShow = false;
    } else {
      this.linkShow = true;
    }
  };
  
  @action.bound
  tagChangeFunction() {
    if (this.tagShow) {
      this.tagShow = false;
    } else {
      this.tagShow = true;
    }
  };
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreLoginSocial(isServer) {
  
  if (isServer) {
    
    return new Store();
    
  } else {
    
    if (store === null) {
      store = new Store();
    }
    
    return store;
    
  }
  
}