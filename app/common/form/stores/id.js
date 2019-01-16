// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import { action, observable } from 'mobx';
// import keycode from 'keycode';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

// import { fetchWrapper } from '../../../../@modules/fetch';


// ---------------------------------------------
//   Format
// ---------------------------------------------

// import { errorsArrIntoErrorMessage } from '../../../../@format/error';




// --------------------------------------------------
//   Store
// --------------------------------------------------

let store = null;
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
  //   Dialog
  // ---------------------------------------------
  
  /**
   * ダイアログを表示するかどうかを決める変数
   * @type {boolean}
   */
  @observable formIDDialogObj = {};
  
  
  /**
   * ダイアログを閉じる
   */
  @action.bound
  handleFormIDDialogClose(_id) {
    this.formIDDialogObj[_id] = false;
  };
  
  
  /**
   * ダイアログを開く
   * @param {string} _id - ID
   */
  @action.bound
  handleFormIDDialogOpen(_id) {
    
    this.formIDDialogObj[_id] = true;
    
  };
  
  
}




// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreFormID(argumentsObj, storeInstanceObj) {
  
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
    
    if (store === null) {
      store = new Store();
    }
    
    return store;
    
  }
  
}