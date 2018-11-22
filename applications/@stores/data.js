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
  
  constructor(argumentsObj) {
    
    this.environment = argumentsObj.environment;
    this.urlBase = argumentsObj.urlBase;
    this.urlApi = argumentsObj.urlApi;
    
  }
  
  
  // ---------------------------------------------
  //   Environment
  // ---------------------------------------------
  
  // environment = 'development';
  // urlApi = '';
  
  
  
  // ---------------------------------------------
  //   Login Users
  // ---------------------------------------------
  
  /**
   * ログインユーザー情報を入れるオブジェクト
   * @type {Object}
   */
  @observable usersloginObj = {};
  
  /**
   * ログインユーザー情報オブジェクトを更新する
   * @param {Object} obj - 更新するオブジェクト
   */
  updateUsersLoginObj(obj) {
    this.usersloginObj = obj;
    // console.dir(this.dataObj);
  };
  
  
  
  // ---------------------------------------------
  //   Users Data
  // ---------------------------------------------
  
  /**
   * ユーザー情報を入れるオブジェクト
   * @type {Object}
   */
  @observable usersObj = {};
  
  insertUsersObj(obj) {
    this.usersObj = Object.assign({}, obj, this.usersObj);
  };
  
  /**
   * ユーザー情報オブジェクトを更新する
   * @param {Object} obj - 更新するオブジェクト
   */
  updateUsersObj(obj) {
    this.usersObj = Object.assign({}, this.usersObj, obj);
  };
  
  /**
   * ユーザー情報オブジェクトを置き換える
   * @param {Object} obj - 置き換えるオブジェクト
   */
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
  updateCardPlayersObj(obj) {
    this.cardPlayersObj = obj;
  };
  
  
  
  // ---------------------------------------------
  //   User Community
  // ---------------------------------------------
  
  @observable userCommunityObj = {};
  
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
    
    return new Store(argumentsObj);
    
  } else {
    
    if (storeData === null) {
      storeData = new Store(argumentsObj);
    }
    
    return storeData;
    
  }
  
}