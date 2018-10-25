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
  //   Constructor
  // ---------------------------------------------
  
  constructor() {}
  
  
  // ---------------------------------------------
  //   Expanded
  // ---------------------------------------------
  
  /**
   * カードの開閉用オブジェクト
   * @type {Object}
   */
  @observable cardExpandedObj = {};
  
  
  /**
   * カードを開閉する。アイコンをクリックしたときに呼び出される
   * @param {string} id - ID
   */
  @action.bound
  handleCardExpanded(id) {
    
    // console.log(`handleCardExpanded id = ${id}`);
    
    if (id in this.cardExpandedObj) {
      this.cardExpandedObj[id] = !this.cardExpandedObj[id];
    } else {
      this.cardExpandedObj[id] = false;
    }
    
  };
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreCardPlayer(argumentsObj, storeInstanceObj) {
  
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