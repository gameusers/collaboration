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
  // const storeInstanceObj = argumentsObj.storeInstanceObj;
  
  
  // if (storeLayout === null && 'layout' in storeInstanceObj) {
  //   storeLayout = storeInstanceObj.layout;
  // }
  
  if (isServer) {
    
    return new Store();
    
  } else {
    
    if (storeData === null) {
      storeData = new Store();
    }
    
    return storeData;
    
  }
  
}