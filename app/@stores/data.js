// --------------------------------------------------
//   Import
// --------------------------------------------------

import { action, observable } from 'mobx';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeData = null;
// let storeLayout = null;


// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  // ---------------------------------------------
  //   Constructor
  // ---------------------------------------------
  
  // constructor(argumentsObj) {
  //   console.log('constructor');
  //   this.pathname = argumentsObj.pathname;
  // }
  
  
  
  
  // ---------------------------------------------
  //   Locale
  // ---------------------------------------------
  
  /**
   * Locale情報を入れるオブジェクト
   * @type {Object}
   */
  @observable localeObj = {};
  
  
  /**
   * Localeオブジェクトを更新する
   * @param {Object} obj - 更新するオブジェクト
   */
  @action.bound
  replaceLocaleObj(obj) {
    this.localeObj = obj;
  };
  
  
  
  
  // ---------------------------------------------
  //   Header
  // ---------------------------------------------
  
  /**
   * ヘッダー情報を入れるオブジェクト
   * @type {Object}
   */
  @observable headerObj = {};
  
  
  /**
   *ヘッダー情報オブジェクトを置き換える
   * @param {Object} obj - 置き換えるオブジェクト
   */
  @action.bound
  replaceHeaderObj(obj) {
    this.headerObj = obj;
  };
  
  
  
  
  // ---------------------------------------------
  //   Login Users
  // ---------------------------------------------
  
  /**
   * ログインユーザー情報を入れるオブジェクト
   * @type {Object}
   */
  @observable usersLoginObj = {};
  
  
  /**
   * ログインユーザー情報オブジェクトを置き換える
   * @param {Object} obj - 置き換えるオブジェクト
   */
  @action.bound
  replaceUsersLoginObj(obj) {
    this.usersLoginObj = obj;
  };
  
  
  
  
  // ---------------------------------------------
  //   Users Data
  // ---------------------------------------------
  
  /**
   * ユーザー情報を入れるオブジェクト
   * @type {Object}
   */
  @observable usersObj = {};
  
  
  /**
   * ユーザー情報オブジェクトを更新する
   * @param {Object} obj - 更新するオブジェクト
   */
  @action.bound
  updateUsersObj(obj) {
    this.usersObj = Object.assign({}, this.usersObj, obj);
  };
  
  
  /**
   * ユーザー情報オブジェクトを置き換える
   * @param {Object} obj - 置き換えるオブジェクト
   */
  @action.bound
  replaceUsersObj(obj) {
    this.usersObj = obj;
  };
  
  
  
  
  // ---------------------------------------------
  //   Card / Players
  // ---------------------------------------------
  
  /**
   * プレイヤーカードの情報を入れるオブジェクト
   * @type {Object}
   */
  @observable cardPlayersObj = {};
  
  /**
   * プレイヤーカードのオブジェクトを更新する
   * @param {Object} obj - 更新するオブジェクト
   */
  @action.bound
  updateCardPlayersObj(obj) {
    this.cardPlayersObj = Object.assign({}, this.cardPlayersObj, obj);
  };
  
  /**
   * プレイヤーカードのオブジェクトを置き換える
   * @param {Object} obj - 置き換えるオブジェクト
   */
  @action.bound
  replaceCardPlayersObj(obj) {
    this.cardPlayersObj = obj;
  };
  
  
  
  
  // ---------------------------------------------
  //   Card / Games
  // ---------------------------------------------
  
  /**
   * ゲームカードの情報を入れるオブジェクト
   * @type {Object}
   */
  @observable cardGamesObj = {};
  
  /**
   * ゲームカードのオブジェクトを更新する
   * @param {Object} obj - 更新するオブジェクト
   */
  @action.bound
  updateCardGamesObj(obj) {
    this.cardGamesObj = Object.assign({}, this.cardGamesObj, obj);
  };
  
  /**
   * ゲームカードのオブジェクトを置き換える
   * @param {Object} obj - 置き換えるオブジェクト
   */
  @action.bound
  replaceCardGamesObj(obj) {
    this.cardGamesObj = obj;
  };
  
  
  
  
  // ---------------------------------------------
  //   User Community
  // ---------------------------------------------
  
  @observable userCommunityObj = {};
  
  @action.bound
  insertUserCommunityObj(dataObj) {
    this.userCommunityObj = Object.assign({}, dataObj, this.userCommunityObj);
    // console.log(`User Community insertData`);
    // console.dir(this.dataObj);
  };
  
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreData(argumentsObj) {
  
  const isServer = argumentsObj.isServer;
  
  
  if (isServer) {
    // console.log('initStoreData / isServer');
    return new Store(argumentsObj);
    
  } else {
    
    // console.log('initStoreData / client');
    if (storeData === null) {
      // console.log('initStoreData / client / storeData === null');
      storeData = new Store(argumentsObj);
    }
    
    return storeData;
    
  }
  
}