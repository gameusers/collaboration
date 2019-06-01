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

export default function initStorePlPlayer({}) {
  
  if (storePlPlayer === null) {
    storePlPlayer = new Store();
  }
  
  return storePlPlayer;
  
}