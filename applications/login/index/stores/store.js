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
  //   表示情報選択ダイアログ / 表示・非表示
  // ---------------------------------------------
  
  // @observable dialogOpen = false;
  
  
  // @action.bound
  // dialogOpenFunction() {
  //   this.dialogOpen = true;
  // };
  
  // @action.bound
  // dialogCloseFunction() {
  //   this.dialogOpen = false;
  // };
  
  
  
  // ---------------------------------------------
  //   ID & Password
  // ---------------------------------------------
  
  @observable id = null;
  @observable password = null;
  @observable showPassword = false;

  
  @action.bound
  handleChangePassword(event) {
    this.password = event.target.value;
  };
  
  @action.bound
  handleClickShowPassword() {
    if (this.showPassword) {
      this.showPassword = false;
    } else {
      this.showPassword = true;
    }
  };
  
  @action.bound
  handleMouseDownPassword(event) {
    event.preventDefault();
  };
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreLoginIndex(isServer) {
  
  if (isServer) {
    
    return new Store();
    
  } else {
    
    if (store === null) {
      store = new Store();
    }
    
    return store;
    
  }
  
}