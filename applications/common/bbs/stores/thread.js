// --------------------------------------------------
//   Import
// --------------------------------------------------

import { action, observable } from 'mobx';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeIndex = null;
let storeLayout = null;


// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  // ---------------------------------------------
  //   Title
  // ---------------------------------------------
  
  @observable titleDescriptionOpenObj = {};
  
  
  @action.bound
  handleTitleDescriptionOpen(id) {
    this.titleDescriptionOpenObj[id] = !this.titleDescriptionOpenObj[id];
  };
  
  
  // @observable anonymityCheckedObj = {};
  
  // @action.bound
  // handleAnonymityChecked(id) {
  //   this.anonymityCheckedObj[id] = !this.anonymityCheckedObj[id];
    
  //   // console.log(`id = ${id}`);
  //   // console.log(`this.anonymityCheckedObj[id] = ${this.anonymityCheckedObj[id]}`);
  //   // console.dir(`this.anonymityCheckedObj = ${this.anonymityCheckedObj}`);
  // };
  
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreBbsThread(isServer, storeInstanceObj) {
  
  if (storeLayout === null && 'layout' in storeInstanceObj) {
    storeLayout = storeInstanceObj.layout;
  }
  
  if (isServer) {
    
    return new Store();
    
  } else {
    
    if (storeIndex === null) {
      storeIndex = new Store();
    }
    
    return storeIndex;
    
  }
  
}