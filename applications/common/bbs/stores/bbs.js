// --------------------------------------------------
//   Import
// --------------------------------------------------

import { action, observable } from 'mobx';
import shortid from 'shortid';
import moment from 'moment';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeIndex = null;
let storeLayout = null;
let storeData = null;
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
    console.log(`id = ${id}`);
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
  handleThreadUpdate(communityId, threadId) {
    
    const threadIndex = this.dataObj[communityId].findIndex((value) => {
      return value.id === threadId;
    });
    
    if (threadIndex !== 'undefined') {
      
      this.dataObj[communityId][threadIndex].name = this.threadUpdateFormNameObj[threadId];
      this.dataObj[communityId][threadIndex].description = this.threadUpdateFormDescriptionObj[threadId];
      
    }
    
    // フォームを閉じる
    this.threadUpdateFormOpenObj[threadId] = false;
    
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
  
  /**
   * コメント投稿フォームでコメントを投稿する
   * @param {string} id - 例）ayucwHGa7Ug-comment-insert
   */
  @action.bound
  handleCommentInsert(communityId, threadId, id) {
    
    
    // ---------------------------------------------
    //   Console 出力
    // ---------------------------------------------
    
    console.log(`\n\n`);
    console.log(`--- handleCommentInsert ---`);
    console.log(`communityId = ${communityId}`);
    console.log(`threadId = ${threadId}`);
    console.log(`id = ${id}`);
    console.log(`storeFormPost.nameObj[id] = ${storeFormPost.nameObj[id]}`);
    console.log(`storeFormPost.textObj[id] = ${storeFormPost.textObj[id]}`);
    // console.log(`storeFormPost.imageSrcObj[id] = ${storeFormPost.imageSrcObj[id]}`);
    console.log(`storeFormPost.imageVideoObj = `);
    console.dir(storeFormPost.imageVideoObj);
    console.log(`\n\n`);
    
    
    
    // ---------------------------------------------
    //   コメントがない場合は投稿しない
    // ---------------------------------------------
    
    if (!storeFormPost.textObj[id]) {
      storeLayout.handleSnackbarOpen('error', 'コメントを入力してください。');
      return;
    }
    
    
    
    // const copyNameObj = Object.assign({}, storeFormPost.nameObj);
    // const copyTextObj = Object.assign({}, storeFormPost.textObj);
    // const copyImageVideoObj = Object.assign({}, storeFormPost.imageVideoObj);
    
    
    // 参照渡しにしないためにコピーを行う
    const copyImageVideoArr = storeFormPost.imageVideoObj[id].concat();
    
    
    const threadIndex = this.dataObj[communityId].findIndex((value) => {
      return value.id === threadId;
    });
    
    // console.log(`threadIndex = ${threadIndex}`);
    
    if (threadIndex !== 'undefined') {
      
      
      // ---------------------------------------------
      //   コメントオブジェクト作成
      // ---------------------------------------------
      
      const generatedId = shortid.generate();
      const loginUserId = storeData.loginUserObj.id;
      
      let name = storeFormPost.nameObj[id];
      const status = '';
      
      if (loginUserId) {
        name = '';
      }
      
      
      const commentObj = {
        
        id: generatedId,
        userId: loginUserId,
        name,
        status,
        comment: storeFormPost.textObj[id],
        updatedDate: moment().utcOffset(0).format(),
        imageVideoArr: copyImageVideoArr,
        good: 0,
        page: 1,
        replyTotal: 0,
        replyArr: []
        
      };
      
      
      // ---------------------------------------------
      //   コメントオブジェクト挿入
      // ---------------------------------------------
      
      this.dataObj[communityId][threadIndex].commentArr.unshift(commentObj);
      
      
      
      // imageVideoArr: [
      //   {
      //     id: 'bQcCGQwpv60',
      //     type: 'image',
      //     imageSetArr: [
      //       {
      //         w: '320w',
      //         src: '/static/img/bbs/bQcCGQwpv60/96x144.jpg',
      //         width: 96,
      //         height: 144,
      //         type: 'JPEG'
      //       },
      //       {
      //         w: 'source',
      //         src: '/static/img/bbs/bQcCGQwpv60/96x144.jpg',
      //         width: 96,
      //         height: 144,
      //         type: 'JPEG'
      //       },
      //     ],
      //     caption: '小さい正方形画像',
      //   },
      // ],
      
      
      
      // ---------------------------------------------
      //   Initialize
      // ---------------------------------------------
      
      // BBS
      this.initializeBbs(this.dataObj[communityId]);
      
      // Lightbox
      storeLayout.initializeLightbox(generatedId, copyImageVideoArr);
      
    }
    
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
    
    // console.log(`\n\n`);
    // console.log(`handleCommentUpdateFormOpen`);
    // console.log(`id = ${id}`);
    // console.log(`\n\n`);
    
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
        
        // Thread Update Form Open
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
  
  if (storeData === null && 'data' in storeInstanceObj) {
    storeData = storeInstanceObj.data;
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