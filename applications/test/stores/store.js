// --------------------------------------------------
//   Import
// --------------------------------------------------

import { action, observable } from 'mobx';
import fetch from 'isomorphic-unfetch';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeLoginIndex = null;
let storeLayout = null;
let storeData = null;



// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  // ---------------------------------------------
  //   Constructor
  // ---------------------------------------------
  
  constructor() {
    
  }
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStorePlayerPlayer(argumentsObj, storeInstanceObj) {
  
  const isServer = argumentsObj.isServer;
  
  
  if ('layout' in storeInstanceObj) {
    storeLayout = storeInstanceObj.layout;
  }
  
  if ('data' in storeInstanceObj) {
    storeData = storeInstanceObj.data;
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