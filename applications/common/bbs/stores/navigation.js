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
  
  
  
  @observable bbsMenuOpenedTabNo = 0;
  
  
  
  
  @action.bound
  handleBbsMenuOpenedTabNo(event, value) {
    this.bbsMenuOpenedTabNo = value;
  };
  
  
  // ---------------------------------------------
  //   ID
  // ---------------------------------------------
  
  id = storeLayout.historyStateArr[0].id;
  
  
  
  
  // ---------------------------------------------
  //   スレッド一覧
  // ---------------------------------------------
  
  @observable threadListOrderByObj = {};
  @observable threadListOrderObj = {};
  @observable threadListCountObj = {};
  @observable threadListRowsPerPageObj = {};
  @observable threadListPageObj = {};
  @observable threadListObj = {};
  
  
  insertThreadList(initialData) {
    this.threadListOrderByObj[initialData.id] = 'updatedDate';
    this.threadListOrderObj[initialData.id] = 'desc';
    this.threadListCountObj[initialData.id] = 30;
    this.threadListRowsPerPageObj[initialData.id] = 5;
    this.threadListPageObj[initialData.id] = 0;
    
    this.threadListObj = initialData.threadListObj;
  };
  
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
    // console.dir(id);
    // console.log(`value = ${value}`);
    // console.log(`test = ${test}`);
    this.threadListPageObj[this.id] = value;
  };
  
  
  
  
  
  
  // ---------------------------------------------
  //   検索
  // ---------------------------------------------
  
  @observable bbsSearchKeyword = '';
  @observable bbsSearchDateTimeStart = '2017-05-24T10:30';
  @observable bbsSearchDateTimeEnd = '2018-06-26T17:00';
  @observable checkedBbsSearchThread = true;
  @observable checkedBbsSearchComment = true;
  @observable checkedBbsSearchReply = true;
  @observable checkedBbsSearchImage = false;
  @observable checkedBbsSearchVideo = false;
  @observable checkedBbsSearchMine = false;
  
  
  @action.bound
  handleBbsSearchKeyword(event) {
    this.bbsSearchKeyword = event.target.value;
  };
  
  @action.bound
  handleBbsSearchDateTimeStart(event) {
    this.bbsSearchDateTimeStart = event.target.value;
  };
  
  @action.bound
  handleBbsSearchDateTimeEnd(event) {
    this.bbsSearchDateTimeEnd = event.target.value;
  };
  
  @action.bound
  handleCheckedBbsSearchThread(event) {
    if (event.target.checked) {
      this.checkedBbsSearchThread = true;
    } else {
      this.checkedBbsSearchThread = false;
    }
  };
  
  @action.bound
  handleCheckedBbsSearchComment(event) {
    if (event.target.checked) {
      this.checkedBbsSearchComment = true;
    } else {
      this.checkedBbsSearchComment = false;
    }
  };
  
  @action.bound
  handleCheckedBbsSearchReply(event) {
    if (event.target.checked) {
      this.checkedBbsSearchReply = true;
    } else {
      this.checkedBbsSearchReply = false;
    }
  };
  
  @action.bound
  handleCheckedBbsSearchImage(event) {
    if (event.target.checked) {
      this.checkedBbsSearchImage = true;
    } else {
      this.checkedBbsSearchImage = false;
    }
  };
  
  @action.bound
  handleCheckedBbsSearchVideo(event) {
    if (event.target.checked) {
      this.checkedBbsSearchVideo = true;
    } else {
      this.checkedBbsSearchVideo = false;
    }
  };
  
  @action.bound
  handleCheckedBbsSearchMine(event) {
    if (event.target.checked) {
      this.checkedBbsSearchMine = true;
    } else {
      this.checkedBbsSearchMine = false;
    }
  };
  
  
  
  // --------------------------------------------------
  //   Initialize Data
  // --------------------------------------------------
  
  constructor(initialData) {
    
    if (initialData) {
      this.insertThreadList(initialData);
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