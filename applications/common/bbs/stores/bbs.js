// --------------------------------------------------
//   Import
// --------------------------------------------------

import { action, observable } from 'mobx';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeIndex = null;
let storeLayout = null;
let storeFormPost = null;


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
  //   Thread Update Form
  // ---------------------------------------------
  
  @observable threadUpdateFormOpenObj = {};
  @observable threadUpdateFormNameObj = {};
  @observable threadUpdateFormDescriptionObj = {};
  
  
  // ----------------------------------------
  //   - Handle
  // ----------------------------------------
  
  @action.bound
  handleThreadUpdateFormOpen(id) {
    this.threadUpdateFormOpenObj[id] = !this.threadUpdateFormOpenObj[id];
  };
  
  @action.bound
  handleThreadUpdateFormName(event, id) {
    this.threadUpdateFormNameObj[id] = event.target.value;
  };
  
  @action.bound
  handleThreadUpdateFormDescription(event, id) {
    this.threadUpdateFormDescriptionObj[id] = event.target.value;
  };
  
  @action.bound
  handleThreadUpdate(id) {
    console.log(`handleThreadUpdate`);
    console.log(`threadUpdateFormNameObj[id] = ${this.threadUpdateFormNameObj[id]}`);
    console.log(`threadUpdateFormDescriptionObj[id] = ${this.threadUpdateFormDescriptionObj[id]}`);
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
  
  @observable replyInsertFormOpenObj = {};
  
  
  // ----------------------------------------
  //   - Handle
  // ----------------------------------------
  
  @action.bound
  handleReplyInsertFormOpen(id) {
    // console.log(`handleReplyInsertFormOpen`);
    // console.log(`id = ${id}`);
    this.replyInsertFormOpenObj[id] = !this.replyInsertFormOpenObj[id];
  };
  
  @action.bound
  handleReplyInsert(id) {
    console.log(`\n\n`);
    console.log(`--- handleReplyInsert ---`);
    console.log(`id = ${id}`);
    console.log(`storeFormPost.nameObj[id] = ${storeFormPost.nameObj[id]}`);
    console.log(`storeFormPost.textObj[id] = ${storeFormPost.textObj[id]}`);
    console.log(`\n\n`);
  };
  
  
  
  
  
  // ---------------------------------------------
  //   Comment Insert Form
  // ---------------------------------------------
  
  // @observable commentInsertFormObj = {};
  
  
  // ----------------------------------------
  //   - Handle
  // ----------------------------------------
  
  @action.bound
  handleCommentInsert(id) {
    console.log(`\n\n`);
    console.log(`--- handleCommentInsert ---`);
    console.log(`id = ${id}`);
    console.log(`storeFormPost.nameObj[id] = ${storeFormPost.nameObj[id]}`);
    console.log(`storeFormPost.textObj[id] = ${storeFormPost.textObj[id]}`);
    console.log(`\n\n`);
  };
  
  
  
  
  // ---------------------------------------------
  //   Comment Update Form
  // ---------------------------------------------
  
  @observable commentUpdateFormOpenObj = {};
  
  
  // ----------------------------------------
  //   - Handle
  // ----------------------------------------
  
  @action.bound
  handleCommentUpdateFormOpen(id) {
    console.log(`handleCommentUpdateFormOpen`);
    console.log(`id = ${id}`);
    this.commentUpdateFormOpenObj[id] = !this.commentUpdateFormOpenObj[id];
  };
  
  @action.bound
  handleCommentUpdate(id) {
    console.log(`\n\n`);
    console.log(`--- handleCommentUpdate ---`);
    console.log(`id = ${id}`);
    console.log(`storeFormPost.nameObj[id] = ${storeFormPost.nameObj[id]}`);
    console.log(`storeFormPost.textObj[id] = ${storeFormPost.textObj[id]}`);
    console.log(`\n\n`);
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
      
      if (value.id in this.threadUpdateFormOpenObj === false) {
        
        
        // Thread Description Open
        if (value.id in this.threadDescriptionOpenObj === false) {
          this.threadDescriptionOpenObj[value.id] = false;
        }
        
        // Thread Edit Form Open
        if (value.id in this.threadUpdateFormOpenObj === false) {
          this.threadUpdateFormOpenObj[value.id] = false;
        }
        // this.threadUpdateFormOpenObj[value.id] = false;
        
        // Update Thread
        this.threadUpdateFormNameObj[value.id] = value.name;
        this.threadUpdateFormDescriptionObj[value.id] = value.description;
        
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
  
  if (storeFormPost === null && 'formPost' in storeInstanceObj) {
    storeFormPost = storeInstanceObj.formPost;
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