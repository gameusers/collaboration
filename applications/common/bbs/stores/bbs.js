// --------------------------------------------------
//   Import
// --------------------------------------------------

import { action, observable } from 'mobx';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeIndex = null;
let storeLayout = null;


// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  // ---------------------------------------------
  //   Title
  // ---------------------------------------------
  
  @observable threadDescriptionOpenObj = {};
  
  
  @action.bound
  handleThreadDescriptionOpenObj(id) {
    this.threadDescriptionOpenObj[id] = !this.threadDescriptionOpenObj[id];
  };
  
  
  
  // ---------------------------------------------
  //   Thread Edit Form
  // ---------------------------------------------
  
  @observable threadEditFormOpenObj = {};
  
  
  // ----------------------------------------
  //   - Return
  // ----------------------------------------
  
  // @action.bound
  // returnThreadEditFormOpen(id) {
  //   const returnValue = id ? this.threadEditFormOpenObj[id] : false;
  //   return returnValue;
  // };
  
  
  // ----------------------------------------
  //   - Handle
  // ----------------------------------------
  
  @action.bound
  handleThreadEditFormOpenObj(id) {
    console.log(`handleThreadEditFormOpenObj`);
    console.log(`this.threadEditFormOpenObj[id] = ${this.threadEditFormOpenObj[id]}`);
    this.threadEditFormOpenObj[id] = !this.threadEditFormOpenObj[id];
  };
  
  
  // // ----------------------------------------
  // //   - Initialize
  // // ----------------------------------------
  
  // @action.bound
  // initializeBbs(dataArr) {
    
  //   console.log(`initializeThreadEditFormOpen`);
    
  //   for (const value of dataArr.values()) {
      
  //     if (value.id in this.threadEditFormOpenObj === false) {
  //       this.threadEditFormOpenObj[value.id] = false;
  //     }
      
  //     // console.log(index, value);
  //   }
    
  // }
  
  
  
  // ---------------------------------------------
  //   Update Thread
  // ---------------------------------------------
  
  @observable updateThreadNameObj = {};
  @observable updateThreadDescriptionObj = {};
  
  
  // ----------------------------------------
  //   - Return
  // ----------------------------------------
  
  // @action.bound
  // returnUpdateThreadName(id) {
  //   const returnValue = id ? this.updateThreadNameObj[id] : '';
  //   return returnValue;
  // };
  
  // @action.bound
  // returnUpdateThreadDescription(id) {
  //   const returnValue = id ? this.updateThreadDescriptionObj[id] : '';
  //   return returnValue;
  // };
  
  
  // ----------------------------------------
  //   - Handle
  // ----------------------------------------
  
  @action.bound
  handleUpdateThreadNameObj(event, id) {
    this.updateThreadNameObj[id] = event.target.value;
    // console.log(`id = ${id}`);
    // console.log(`this.updateThreadNameObj[id] = ${this.updateThreadNameObj[id]}`);
  };
  
  @action.bound
  handleUpdateThreadDescriptionObj(event, id) {
    this.updateThreadDescriptionObj[id] = event.target.value;
  };
  
  @action.bound
  handleUpdateThread(id) {
    console.log(`handleUpdateThread`);
    console.log(`updateThreadNameObj[id] = ${this.updateThreadNameObj[id]}`);
    console.log(`updateThreadDescriptionObj[id] = ${this.updateThreadDescriptionObj[id]}`);
  };
  
  
  // ----------------------------------------
  //   - Initialize
  // ----------------------------------------
  
  // @action.bound
  // initializeUpdateThread(dataArr) {
    
  //   // console.log(`initializeUpdateThread`);
    
  //   for (const value of dataArr.values()) {
      
  //     // console.log(`value.name = ${value.name}`);
  //     // console.log(`value.description = ${value.description}`);
      
  //     this.updateThreadNameObj[value.id] = value.name;
  //     this.updateThreadDescriptionObj[value.id] = value.description;
  //   }
    
  // }
  
  
  
  
  // ---------------------------------------------
  //   BBS データ
  // ---------------------------------------------
  
  @observable dataObj = {};
  
  insertData(dataObj) {
    this.dataObj = Object.assign({}, dataObj, this.dataObj);
    // console.dir(this.dataObj);
  };
  
  
  
  
  
  // ----------------------------------------
  //   Initialize BBS
  // ----------------------------------------
  
  @action.bound
  initializeBbs(dataArr) {
    
    console.log(`initializeBbs`);
    
    for (const value of dataArr.values()) {
      
      if (value.id in this.threadEditFormOpenObj === false) {
        
        
        // Thread Description Open
        if (value.id in this.threadDescriptionOpenObj === false) {
          this.threadDescriptionOpenObj[value.id] = false;
        }
        
        // Thread Edit Form Open
        if (value.id in this.threadEditFormOpenObj === false) {
          this.threadEditFormOpenObj[value.id] = false;
        }
        // this.threadEditFormOpenObj[value.id] = false;
        
        // Update Thread
        this.updateThreadNameObj[value.id] = value.name;
        this.updateThreadDescriptionObj[value.id] = value.description;
        
      }
      
      // console.log(index, value);
    }
    
  }
  
  
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreBbs(argumentsObj) {
  
  const isServer = argumentsObj.isServer;
  const storeInstanceObj = argumentsObj.storeInstanceObj;
  
  
  if (storeLayout === null && 'layout' in storeInstanceObj) {
    storeLayout = storeInstanceObj.layout;
  }
  
  if (isServer) {
    
    return new Store();
    
  } else {
    
    if (storeIndex === null) {
      storeIndex = new Store();
    }
    
    return storeIndex;
    
  }
  
}