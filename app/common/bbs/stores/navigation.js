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
  
  // id = storeLayout.historyStateArr[0].id;
  // id = storeLayout.currentContentsId;
  
  
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
  handleOpenedTabNo(event, value, id) {
    this.openedTabNoObj[id] = value;
  };
  
  
  insertOpenedTabNo(dataObj) {
    this.openedTabNoObj = Object.assign({}, dataObj, this.openedTabNoObj);
  };
  
  
  
  // ---------------------------------------------
  //   Thread List
  // ---------------------------------------------
  
  @observable threadListOrderByObj = {};
  @observable threadListOrderObj = {};
  @observable threadListCountObj = {};
  @observable threadListRowsPerPageObj = {};
  @observable threadListPageObj = {};
  @observable threadListObj = {};
  
  
  @action.bound
  handleReadThread(id) {
    console.log(`handleReadThread`);
    console.log(`id = ${id}`);
  };
  
  @action.bound
  handleThreadListSort(id, orderBy) {
    
    if (this.threadListOrderByObj[id] !== orderBy || this.threadListOrderObj[id] === 'asc') {
      this.threadListOrderObj[id] = 'desc';
    } else {
      this.threadListOrderObj[id] = 'asc';
    }
    
    this.threadListOrderByObj[id] = orderBy;
    
  };
  
  @action.bound
  handleThreadListRowsPerPage(event, id) {
    this.threadListRowsPerPageObj[id] = event.target.value;
  };
  
  @action.bound
  handleThreadListPage(event, value, id) {
    this.threadListPageObj[id] = value;
  };
  
  
  insertThreadList(id, dataObj) {
    
    if (id in this.threadListOrderByObj === false) {
      this.threadListOrderByObj[id] = 'updatedDate';
    }
    
    if (id in this.threadListOrderObj === false) {
      this.threadListOrderObj[id] = 'desc';
    }
    
    if (id in this.threadListCountObj === false) {
      this.threadListCountObj[id] = 30;
    }
    
    if (id in this.threadListRowsPerPageObj === false) {
      this.threadListRowsPerPageObj[id] = 5;
    }
    
    if (id in this.threadListPageObj === false) {
      this.threadListPageObj[id] = 0;
    }
    
    this.threadListObj = Object.assign({}, dataObj, this.threadListObj);
    
  };
  
  
  
  // ---------------------------------------------
  //   Create Thread
  // ---------------------------------------------
  
  @observable createThreadNameObj = {};
  @observable createThreadRuleObj = {};
  
  @action.bound
  handleCreateThreadNameObj(event, id) {
    this.createThreadNameObj[id] = event.target.value;
  };
  
  @action.bound
  handleCreateThreadRuleObj(event, id) {
    this.createThreadRuleObj[id] = event.target.value;
  };
  
  @action.bound
  handleCreateThread(id) {
    console.log(`handleCreateThread`);
    console.log(`createThreadNameObj[id] = ${this.createThreadNameObj[id]}`);
    console.log(`createThreadRuleObj[id] = ${this.createThreadRuleObj[id]}`);
  };
  
  insertCreateThread(id) {
    
    if (id in this.createThreadNameObj === false) {
      this.createThreadNameObj[id] = '';
    }
    
    if (id in this.createThreadRuleObj === false) {
      this.createThreadRuleObj[id] = '';
    }
    
  }
  
  
  
  // ---------------------------------------------
  //   Search
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
  handleSearchKeyword(event, id) {
    this.searchKeywordObj[id] = event.target.value;
  };
  
  @action.bound
  handleSearchDateTimeStart(event, id) {
    this.searchDateTimeStartObj[id] = event.target.value;
  };
  
  @action.bound
  handleSearchDateTimeEnd(event, id) {
    this.searchDateTimeEndObj[id] = event.target.value;
  };
  
  @action.bound
  handleSearchThreadChecked(id) {
    this.searchThreadCheckedObj[id] = !this.searchThreadCheckedObj[id];
  };
  
  @action.bound
  handleSearchCommentChecked(id) {
    this.searchCommentCheckedObj[id] = !this.searchCommentCheckedObj[id];
  };
  
  @action.bound
  handleSearchReplyChecked(id) {
    this.searchReplyCheckedObj[id] = !this.searchReplyCheckedObj[id];
  };
  
  @action.bound
  handleSearchImageChecked(id) {
    this.searchImageCheckedObj[id] = !this.searchImageCheckedObj[id];
  };
  
  @action.bound
  handleSearchVideoChecked(id) {
    this.searchVideoCheckedObj[id] = !this.searchVideoCheckedObj[id];
  };
  
  @action.bound
  handleSearchMineChecked(id) {
    this.searchMineCheckedObj[id] = !this.searchMineCheckedObj[id];
  };
  
  
  insertSearch(id) {
    
    if (id in this.searchKeywordObj === false) {
      this.searchKeywordObj[id] = '';
    }
    
    if (id in this.searchDateTimeStartObj === false) {
      this.searchDateTimeStartObj[id] = '';
    }
    
    if (id in this.searchDateTimeEndObj === false) {
      this.searchDateTimeEndObj[id] = '';
    }
    
    if (id in this.searchThreadCheckedObj === false) {
      this.searchThreadCheckedObj[id] = true;
    }
    
    if (id in this.searchCommentCheckedObj === false) {
      this.searchCommentCheckedObj[id] = true;
    }
    
    if (id in this.searchReplyCheckedObj === false) {
      this.searchReplyCheckedObj[id] = true;
    }
    
    if (id in this.searchImageCheckedObj === false) {
      this.searchImageCheckedObj[id] = false;
    }
    
    if (id in this.searchVideoCheckedObj === false) {
      this.searchVideoCheckedObj[id] = false;
    }
    
    if (id in this.searchMineCheckedObj === false) {
      this.searchMineCheckedObj[id] = false;
    }
    
  };
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreBbsNavigation(argumentsObj) {
  
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