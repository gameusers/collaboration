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
    this.urlApi = argumentsObj.urlApi;
    
  }
  
  
  // ---------------------------------------------
  //   Environment
  // ---------------------------------------------
  
  environment = 'development';
  urlApi = '';
  
  
  
  // ---------------------------------------------
  //   Login Users
  // ---------------------------------------------
  
  @observable loginUserObj = {};
  
  updateLoginUserObj(dataObj) {
    this.loginUserObj = dataObj;
    // console.dir(this.dataObj);
  };
  
  
  // ---------------------------------------------
  //   User Data
  // ---------------------------------------------
  
  /**
   * ユーザー情報を入れるオブジェクト
   * @type {Object}
   */
  @observable userObj = {};
  
  insertUserObj(dataObj) {
    this.userObj = Object.assign({}, dataObj, this.userObj);
    // console.log(`User Community insertData`);
    // console.dir(this.dataObj);
  };
  
  /**
   * ユーザー情報オブジェクトを更新する
   * @param {Object} obj - 更新するオブジェクト
   */
  updateUserObj(obj) {
    this.userObj = obj;
  };
  
  
  
  // ---------------------------------------------
  //   Card / Player
  // ---------------------------------------------
  
  /**
   * プレイヤーカードの情報を入れるオブジェクト
   * @type {Object}
   */
  @observable cardPlayerObj = {};
  
  
  /**
   * プレイヤーカードのオブジェクトを更新する
   * @param {Object} obj - 更新するオブジェクト
   */
  updateCardPlayerObj(obj) {
    this.cardPlayerObj = obj;
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
  
  // console.dir(argumentsObj);
  // console.log(`argumentsObj.environment = ${argumentsObj.environment}`);
  // this.environment = argumentsObj.environment;
  // this.urlApi = argumentsObj.urlApi;
  
  
  if (isServer) {
    
    return new Store(argumentsObj);
    
  } else {
    
    if (storeData === null) {
      storeData = new Store(argumentsObj);
    }
    
    return storeData;
    
  }
  
}