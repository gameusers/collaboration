// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import { action, observable } from 'mobx';




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
  //   Header
  // ---------------------------------------------
  
  /**
   * ページ情報を入れる配列
   * @type {Array}
   */
  @observable pagesArr = [];
  
  
  /**
   * ページ情報を置き換える
   * @param {Array} arr - 置き換える配列
   */
  @action.bound
  replacePagesArr(arr) {
    this.pagesArr = arr;
  };
  
  
}




// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStorePlPlayer(argumentsObj, storeInstanceObj) {
  
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