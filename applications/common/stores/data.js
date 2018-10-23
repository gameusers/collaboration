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
    this.apiUrl = argumentsObj.apiUrl;
    
  }
  
  
  // ---------------------------------------------
  //   Environment
  // ---------------------------------------------
  
  environment = 'development';
  apiUrl = '';
  
  
  
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
  
  @observable userObj = {};
  
  insertUserObj(dataObj) {
    this.userObj = Object.assign({}, dataObj, this.userObj);
    // console.log(`User Community insertData`);
    // console.dir(this.dataObj);
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
   * プレイヤーカードのオブジェクト更新
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
  // this.apiUrl = argumentsObj.apiUrl;
  
  
  if (isServer) {
    
    return new Store(argumentsObj);
    
  } else {
    
    if (storeData === null) {
      storeData = new Store(argumentsObj);
    }
    
    return storeData;
    
  }
  
}