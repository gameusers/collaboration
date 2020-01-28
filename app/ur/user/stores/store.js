// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import { action, observable } from 'mobx';
import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashHas from 'lodash/has';




// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeUrUser = null;




// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
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

export default function initStoreUrUser({ propsObj }) {
  
  
  // --------------------------------------------------
  //   Store
  // --------------------------------------------------
  
  if (storeUrUser === null) {
    storeUrUser = new Store();
  }
  
  
  // --------------------------------------------------
  //   Props
  // --------------------------------------------------
  
  if (propsObj) {
    
    
    // --------------------------------------------------
    //   pagesArr
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['pagesArr'])) {
      storeUrUser.pagesArr = propsObj.pagesArr;
    }
    
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storeUrUser;
  
  
}