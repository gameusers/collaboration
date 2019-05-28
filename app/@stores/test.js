// --------------------------------------------------
//   Import
// --------------------------------------------------

import { action, observable } from 'mobx';
// import lodashGet from 'lodash/get';




// --------------------------------------------------
//   Store
// --------------------------------------------------

// let store = null;




// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  @observable count = 0;
  
  
  @action.bound
  increment() {
    ++this.count;
    console.log(this.count);
  }
  
  
}

export default new Store();

// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

// export default function initStoreData(argumentsObj) {
  
//   const isServer = argumentsObj.isServer;
  
  
//   if (isServer) {
//     // console.log('initStoreData / isServer');
//     return new Store(argumentsObj);
    
//   } else {
    
//     // console.log('initStoreData / client');
//     if (storeData === null) {
//       // console.log('initStoreData / client / storeData === null');
//       storeData = new Store(argumentsObj);
//     }
    
//     return storeData;
    
//   }
  
// }