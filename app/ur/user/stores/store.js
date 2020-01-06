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

let storePlPlayer = null;




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

export default function initStorePlPlayer({ propsObj }) {
  
  
  // --------------------------------------------------
  //   Store
  // --------------------------------------------------
  
  if (storePlPlayer === null) {
    storePlPlayer = new Store();
  }
  
  
  // --------------------------------------------------
  //   Props
  // --------------------------------------------------
  
  if (propsObj) {
    
    
    // --------------------------------------------------
    //   pagesArr
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['pagesArr'])) {
      storePlPlayer.pagesArr = propsObj.pagesArr;
    }
    
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storePlPlayer;
  
  
}