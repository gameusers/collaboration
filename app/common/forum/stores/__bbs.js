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
    console.dir(storeFormPost.textObj);
    console.log(`storeFormPost.imageSrcObj[id] = ${storeFormPost.imageSrcObj[id]}`);
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
        updatedDate: moment().toISOString(),
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
  
  /**
   * コメント編集フォームを表示するかどうかの情報を保存するオブジェクト
   * @type {Object}
   */
  @observable commentUpdateFormOpenObj = {};
  
  
  // ----------------------------------------
  //   - Handle
  // ----------------------------------------
  
  /**
   * コメント編集フォームを表示するときに呼び出される
   * @param {string} id - 例）ayucwHGa7Ug-comment-insert
   */
  @action.bound
  handleCommentUpdateFormOpen(id) {
    
    // console.log(`\n\n`);
    // console.log(`handleCommentUpdateFormOpen`);
    // console.log(`id = ${id}`);
    // console.log(`\n\n`);
    
    this.commentUpdateFormOpenObj[id] = !this.commentUpdateFormOpenObj[id];
  };
  
  /**
   * コメントを編集する
   * @param {string} id - 例）ayucwHGa7Ug-comment-insert
   */
  @action.bound
  handleCommentUpdate(communityId, threadId, commentId, formPostId) {
    
    
    // ---------------------------------------------
    //  Console 出力
    // ---------------------------------------------
    
    console.log(`\n\n`);
    console.log(`--- handleCommentUpdate ---`);
    console.log(`communityId = ${communityId}`);
    console.log(`threadId = ${threadId}`);
    console.log(`commentId = ${commentId}`);
    console.log(`formPostId = ${formPostId}`);
    console.log(`storeFormPost.nameObj[formPostId] = ${storeFormPost.nameObj[formPostId]}`);
    console.log(`storeFormPost.textObj[formPostId] = ${storeFormPost.textObj[formPostId]}`);
    console.log(`storeFormPost.imageSrcObj[formPostId] = ${storeFormPost.imageSrcObj[formPostId]}`);
    console.log(`storeFormPost.imageVideoObj = `);
    console.dir(storeFormPost.imageVideoObj);
    console.log(`\n\n`);
    
    
    
    // ---------------------------------------------
    //   Property
    // ---------------------------------------------
    
    const name = storeFormPost.nameObj[formPostId];
    const text = storeFormPost.textObj[formPostId];
    const imageVideoArr = storeFormPost.imageVideoObj[formPostId].concat()
    
    
    // ---------------------------------------------
    //   コメントがない場合は投稿しない
    // ---------------------------------------------
    
    if (!text) {
      storeLayout.handleSnackbarOpen('error', 'コメントを入力してください。');
      return;
    }
    
    
    // // 参照渡しにしないためにコピーを行う
    // const copyImageVideoArr = storeFormPost.imageVideoObj[id].concat();
    
    
    // ---------------------------------------------
    //   スレッドが存在するかチェックする
    // ---------------------------------------------
    
    const threadIndex = this.dataObj[communityId].findIndex((value) => {
      return value.id === threadId;
    });
    
    console.log(`threadIndex = ${threadIndex}`);
    
    
    // ---------------------------------------------
    //   スレッドが存在する場合は処理
    // ---------------------------------------------
    
    if (threadIndex !== 'undefined') {
      
      
      // ---------------------------------------------
      //   コメントオブジェクト作成
      // ---------------------------------------------
      
      const generatedId = shortid.generate();
      const loginUserId = storeData.loginUserObj.id;
      
      let name = storeFormPost.nameObj[formPostId];
      const status = '';
      
      if (loginUserId) {
        name = '';
      }
      
      
      const commentObj = {
        
        id: generatedId,
        userId: loginUserId,
        name,
        status,
        comment: text,
        updatedDate: moment().toISOString(),
        imageVideoArr: imageVideoArr,
        good: 0,
        page: 1,
        replyTotal: 0,
        replyArr: []
        
      };
      
      
      // ---------------------------------------------
      //   コメントオブジェクト挿入
      // ---------------------------------------------
      
      // this.dataObj[communityId][threadIndex].commentArr.unshift(commentObj);
      
      
      // // ---------------------------------------------
      // //   Initialize
      // // ---------------------------------------------
      
      // // BBS
      // this.initializeBbs(this.dataObj[communityId]);
      
      // // Lightbox
      // storeLayout.initializeLightbox(generatedId, copyImageVideoArr);
      
      
      
      
      
      
    }
    
    
    // フォームを閉じる
    this.handleCommentUpdateFormOpen(formPostId);
    
      
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
  
  
  // console.log(`\n\n`);
  // console.log(`--- initStoreBbs ---`);
  
  
  
  const isServer = argumentsObj.isServer;
  const storeInstanceObj = argumentsObj.storeInstanceObj;
  
  
  // console.log(`isServer = ${isServer}`);
  // console.log(`storeLayout = ${storeLayout}`);
  // console.log(`storeInstanceObj = `);
  // console.dir(storeInstanceObj);
  
  
  if ('layout' in storeInstanceObj) {
    // console.log(`@@@ storeLayout = storeInstanceObj.layout`);
    storeLayout = storeInstanceObj.layout;
  }
  
  if ('data' in storeInstanceObj) {
    storeData = storeInstanceObj.data;
  }
  
  if ('formPost' in storeInstanceObj) {
    storeFormPost = storeInstanceObj.formPost;
  }
  
  
  // if (storeLayout === null && 'layout' in storeInstanceObj) {
  //   console.log(`@@@ storeLayout = storeInstanceObj.layout`);
  //   storeLayout = storeInstanceObj.layout;
  // }
  
  // if (storeData === null && 'data' in storeInstanceObj) {
  //   storeData = storeInstanceObj.data;
  // }
  
  // if (storeFormPost === null && 'formPost' in storeInstanceObj) {
  //   storeFormPost = storeInstanceObj.formPost;
  // }
  
  
  if (isServer) {
    
    // console.log(`Server`);
    
    return new Store();
    
  } else {
    
    // console.log(`Client`);
    
    if (storeIndex === null) {
      storeIndex = new Store();
    }
    
    return storeIndex;
    
  }
  
  
  // console.log(`\n\n`);
  
  
}