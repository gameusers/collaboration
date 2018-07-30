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
  //   ID
  // ---------------------------------------------
  
  id = storeLayout.historyStateArr[0].id;
  
  
  
  // ---------------------------------------------
  //   Menu Buttons
  // ---------------------------------------------
  
  @action.bound
  handleMenuButtonThreadList(event) {
    event.stopPropagation();
  };
  
  @action.bound
  handleMenuButtonNew(event) {
    event.stopPropagation();
  };
  
  @action.bound
  handleMenuButtonImage(event) {
    event.stopPropagation();
  };
  
  @action.bound
  handleMenuButtonVideo(event) {
    event.stopPropagation();
  };
  
  
  
  // ---------------------------------------------
  //   Change Tab
  // ---------------------------------------------
  
  @observable openedTabNoObj = {};
  
  @action.bound
  handleOpenedTabNo(event, value) {
    this.openedTabNoObj[this.id] = value;
  };
  
  insertOpenedTabNo(initialData) {
    this.openedTabNoObj = Object.assign({}, initialData.openedTabNoObj, this.openedTabNoObj);
  };
  
  
  
  // ---------------------------------------------
  //   スレッド一覧
  // ---------------------------------------------
  
  @observable threadListOrderByObj = {};
  @observable threadListOrderObj = {};
  @observable threadListCountObj = {};
  @observable threadListRowsPerPageObj = {};
  @observable threadListPageObj = {};
  @observable threadListObj = {};
  
  @action.bound
  handleThreadListSort(orderBy) {
    
    if (this.threadListOrderByObj[this.id] !== orderBy || this.threadListOrderObj[this.id] === 'asc') {
      this.threadListOrderObj[this.id] = 'desc';
    } else {
      this.threadListOrderObj[this.id] = 'asc';
    }
    
    this.threadListOrderByObj[this.id] = orderBy;
    
  };
  
  @action.bound
  handleThreadListRowsPerPage(event) {
    this.threadListRowsPerPageObj[this.id] = event.target.value;
  };
  
  @action.bound
  handleThreadListPage(event, value) {
    this.threadListPageObj[this.id] = value;
  };
  
  insertThreadList(initialData) {
    
    if (initialData.id in this.threadListOrderByObj === false) {
      this.threadListOrderByObj[initialData.id] = 'updatedDate';
    }
    
    if (initialData.id in this.threadListOrderObj === false) {
      this.threadListOrderObj[initialData.id] = 'desc';
    }
    
    if (initialData.id in this.threadListCountObj === false) {
      this.threadListCountObj[initialData.id] = 30;
    }
    
    if (initialData.id in this.threadListRowsPerPageObj === false) {
      this.threadListRowsPerPageObj[initialData.id] = 5;
    }
    
    if (initialData.id in this.threadListPageObj === false) {
      this.threadListPageObj[initialData.id] = 0;
    }
    
    this.threadListObj = Object.assign({}, initialData.threadListObj, this.threadListObj);
    
  };
  
  
  
  // ---------------------------------------------
  //   BBS 検索
  // ---------------------------------------------
  
  @observable searchKeywordObj = {};
  @observable searchDateTimeStartObj = {};
  @observable searchDateTimeEndObj = {};
  @observable searchThreadCheckedObj = {};
  @observable searchCommentCheckedObj = {};
  @observable searchReplyCheckedObj = {};
  @observable searchImageCheckedObj = {};
  @observable searchVideoCheckedObj = {};
  @observable searchMineCheckedObj = {};
  
  @action.bound
  handleSearchKeyword(event) {
    this.searchKeywordObj[this.id] = event.target.value;
  };
  
  @action.bound
  handleSearchDateTimeStart(event) {
    this.searchDateTimeStartObj[this.id] = event.target.value;
  };
  
  @action.bound
  handleSearchDateTimeEnd(event) {
    this.searchDateTimeEndObj[this.id] = event.target.value;
  };
  
  @action.bound
  handleSearchThreadChecked(event) {
    this.searchThreadCheckedObj[this.id] = !this.searchThreadCheckedObj[this.id];
  };
  
  @action.bound
  handleSearchCommentChecked() {
    this.searchCommentCheckedObj[this.id] = !this.searchCommentCheckedObj[this.id];
  };
  
  @action.bound
  handleSearchReplyChecked() {
    this.searchReplyCheckedObj[this.id] = !this.searchReplyCheckedObj[this.id];
  };
  
  @action.bound
  handleSearchImageChecked() {
    this.searchImageCheckedObj[this.id] = !this.searchImageCheckedObj[this.id];
  };
  
  @action.bound
  handleSearchVideoChecked() {
    this.searchVideoCheckedObj[this.id] = !this.searchVideoCheckedObj[this.id];
  };
  
  @action.bound
  handleSearchMineChecked() {
    this.searchMineCheckedObj[this.id] = !this.searchMineCheckedObj[this.id];
  };
  
  insertSearch(initialData) {
    
    if (initialData.id in this.searchKeywordObj === false) {
      this.searchKeywordObj[initialData.id] = '';
    }
    
    if (initialData.id in this.searchDateTimeStartObj === false) {
      this.searchDateTimeStartObj[initialData.id] = '';
    }
    
    if (initialData.id in this.searchDateTimeEndObj === false) {
      this.searchDateTimeEndObj[initialData.id] = '';
    }
    
    if (initialData.id in this.searchThreadCheckedObj === false) {
      this.searchThreadCheckedObj[initialData.id] = true;
    }
    
    if (initialData.id in this.searchCommentCheckedObj === false) {
      this.searchCommentCheckedObj[initialData.id] = true;
    }
    
    if (initialData.id in this.searchReplyCheckedObj === false) {
      this.searchReplyCheckedObj[initialData.id] = true;
    }
    
    if (initialData.id in this.searchImageCheckedObj === false) {
      this.searchImageCheckedObj[initialData.id] = false;
    }
    
    if (initialData.id in this.searchVideoCheckedObj === false) {
      this.searchVideoCheckedObj[initialData.id] = false;
    }
    
    if (initialData.id in this.searchMineCheckedObj === false) {
      this.searchMineCheckedObj[initialData.id] = false;
    }
    
  };
  
  
  
  // --------------------------------------------------
  //   Initialize Data
  // --------------------------------------------------
  
  constructor(initialData) {
    
    if (initialData) {
     
      this.insertOpenedTabNo(initialData);
      this.insertThreadList(initialData);
      this.insertSearch(initialData);
      
    }
    
  }
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreBbsNavigation(isServer, storeInstanceObj, initialData) {
  
  if (storeLayout === null && 'layout' in storeInstanceObj) {
    storeLayout = storeInstanceObj.layout;
  }
  
  if (isServer) {
    
    return new Store(initialData);
    
  } else {
    
    if (storeIndex === null) {
      storeIndex = new Store(initialData);
    }
    
    return storeIndex;
    
  }
  
}