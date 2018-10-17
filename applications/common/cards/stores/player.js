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
  
  constructor() {
    
    this.idMinLength = 3;
    this.idMaxLength = 32;
    this.passwordMinLength = 8;
    this.passwordMaxLength = 32;
    
  }
  
  
  // ---------------------------------------------
  //   Login - ID & Password
  // ---------------------------------------------
  
  /**
   * ログインID
   * @type {string}
   */
  @observable loginId = '';
  
  /**
   * ログインID　文字数
   * @type {number}
   */
  @observable loginIdNumberOfCharacters = 0;
  
  /**
   * ログインID　エラー（バリデーション用）
   * @type {string}
   */
  @observable loginIdError = false;
  
  /**
   * ログインID　エラーメッセージ
   * @type {string}
   */
  @observable loginIdErrorMessage = '';
  
  
  /**
   * ログインID入力フォームに文字列を入力したときに呼び出される
   * @param {Object} event - イベント
   */
  @action.bound
  handleLoginId(event) {
    
    // const resultObj = validationId(event.target.value);
    
    // this.loginId = resultObj.value;
    // this.loginIdNumberOfCharacters = resultObj.numberOfCharacters;
    // this.loginIdError = resultObj.error;
    // this.loginIdErrorMessage = resultObj.errorMessageArr[0];
    
  };
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreCardsPlayer(argumentsObj, storeInstanceObj) {
  
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