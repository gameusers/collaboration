// --------------------------------------------------
//   Import
// --------------------------------------------------

import { action, observable } from 'mobx';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeLoginIndex = null;
let storeLayout = null;


// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  // ---------------------------------------------
  //   ID & Password
  // ---------------------------------------------
  
  @observable id = '';
  @observable password = '';
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

export default function initStoreLoginIndex(isServer, storeLayoutInstance) {
  
  if (storeLayout === null && storeLayoutInstance) {
    storeLayout = storeLayoutInstance;
  }
  
  if (isServer) {
    
    return new Store();
    
  } else {
    
    if (storeLoginIndex === null) {
      storeLoginIndex = new Store();
    }
    
    return storeLoginIndex;
    
  }
  
}