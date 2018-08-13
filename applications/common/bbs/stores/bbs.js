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
  //   - Handle
  // ----------------------------------------
  
  @action.bound
  handleThreadEditFormOpenObj(id) {
    console.log(`handleThreadEditFormOpenObj`);
    console.log(`this.threadEditFormOpenObj[id] = ${this.threadEditFormOpenObj[id]}`);
    this.threadEditFormOpenObj[id] = !this.threadEditFormOpenObj[id];
  };
  
  
  
  
  
  // ---------------------------------------------
  //   Update Thread
  // ---------------------------------------------
  
  @observable updateThreadNameObj = {};
  @observable updateThreadDescriptionObj = {};
  
  
  // ----------------------------------------
  //   - Handle
  // ----------------------------------------
  
  @action.bound
  handleUpdateThreadNameObj(event, id) {
    this.updateThreadNameObj[id] = event.target.value;
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
  
  
  
  
  
  // ---------------------------------------------
  //   Good
  // ---------------------------------------------
  
  // @observable goodObj = {};
  
  
  // ----------------------------------------
  //   - Handle
  // ----------------------------------------
  
  @action.bound
  handleCommentGood(communityId, threadId, commentId) {
    
    // console.log(`this.dataObj[communityId] = ${this.dataObj[communityId]}`);
    
    const threadIndex = this.dataObj[communityId].findIndex((value) => {
      return value.id === threadId;
    });
    
    // console.log(`threadIndex = ${threadIndex}`);
    
    if (threadIndex !== 'undefined') {
      
      const commentArr = this.dataObj[communityId][threadIndex].commentArr;
      
      const commentIndex = commentArr.findIndex((value) => {
        return value.id === commentId;
      });
      
      // console.log(`commentIndex = ${commentIndex}`);
      
      
      if (commentIndex !== 'undefined') {
        this.dataObj[communityId][threadIndex].commentArr[commentIndex].good += 1; 
      }
      
    }
    
    // console.log(`communityId = ${communityId}`);
    // console.log(`threadId = ${threadId}`);
    // console.log(`commentId = ${commentId}`);
    // this.goodObj[id] = this.goodObj[id] + 1;
  };
  
  
  
  
  // ---------------------------------------------
  //   Reply Form
  // ---------------------------------------------
  
  @observable replyFormOpenObj = {};
  
  
  // ----------------------------------------
  //   - Handle
  // ----------------------------------------
  
  @action.bound
  handleReplyFormOpenObj(id) {
    console.log(`id = ${id}`);
    console.log(`handleReplyFormOpenObj`);
    this.replyFormOpenObj[id] = !this.replyFormOpenObj[id];
  };
  
  
  // ---------------------------------------------
  //   Reply Form
  // ---------------------------------------------
  
  @observable commentEditFormOpenObj = {};
  
  
  // ----------------------------------------
  //   - Handle
  // ----------------------------------------
  
  @action.bound
  handleCommentEditFormOpenObj(id) {
    console.log(`id = ${id}`);
    console.log(`handleCommentEditFormOpenObj`);
    this.commentEditFormOpenObj[id] = !this.commentEditFormOpenObj[id];
  };
  
  
  
  
  
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
    
    // console.log(`initializeBbs`);
    
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