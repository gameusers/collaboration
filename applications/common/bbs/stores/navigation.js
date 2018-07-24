// --------------------------------------------------
//   Import
// --------------------------------------------------

import { action, computed, observable } from 'mobx';


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
  //   BBS Menu
  // ---------------------------------------------
  
  @observable panelExpandedObj = {};
  @observable panelExpandedId = '';
  
  @action.bound
  handlePanelExpanded(id) {
    console.log(`handlePanelExpanded`);
    
    if (this.panelExpandedId in this.panelExpandedObj) {
      
    }
    
    this.panelExpandedObj[id] = !this.panelExpandedObj[id];
    this.panelExpandedId = id;
  };
  
  
  panelExpanded(id) {
    
    if (id in this.panelExpandedObj) {
      console.log(`this.panelExpandedObj[id] = ${this.panelExpandedObj[id]}`);
      return this.panelExpandedObj[id];
    } else {
      // this.panelExpandedObj[id] = true;
    }
    
    return true;
    
  }
  
  // @computed get panelExpanded() {
    
  //   console.log(`this.panelExpandedId = ${this.panelExpandedId}`);
    
  //   if (this.panelExpandedId in this.panelExpandedObj) {
  //     console.log(`this.panelExpandedObj[this.panelExpandedId] = ${this.panelExpandedObj[this.panelExpandedId]}`);
  //     return this.panelExpandedObj[this.panelExpandedId];
  //   }
    
  //   return true;
    
  // }
  
  
  
  @observable bbsMenuOpenedTabNo = 0;
  
  
  
  
  @action.bound
  handleBbsMenuOpenedTabNo(event, value) {
    this.bbsMenuOpenedTabNo = value;
  };
  
  
  
  
  
  
  
  // ---------------------------------------------
  //   スレッド一覧
  // ---------------------------------------------
  
  @observable threadListOrderBy = 'updatedDate';
  @observable threadListOrder = 'desc';
  @observable threadListCount = 30;
  @observable threadListRowsPerPage = 5;
  @observable threadListPage = 1;
  
  
  // constructor (model) {
  //   this.model = model
  //   this.name = model.name
  //   this.email = model.email
  // }
  
  
  @action.bound
  handleThreadListSort(orderBy) {
    
    if (this.threadListOrderBy !== orderBy || this.threadListOrder === 'asc') {
      this.threadListOrder = 'desc';
    } else {
      this.threadListOrder = 'asc';
    }
    
    this.threadListOrderBy = orderBy;
    
  };
  
  @action.bound
  handleThreadListRowsPerPage(event) {
    this.threadListRowsPerPage = event.target.value;
  };
  
  @action.bound
  handleThreadListPage(event, value) {
    this.threadListPage = value;
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
  
  
  
  // ---------------------------------------------
  //   スレッド一覧
  // ---------------------------------------------
  
  @observable threadListArr = [
    {
      name: '雑談スレッド',
      about: 'ピアキャスト、YouTube Gamingで、ゲームの配信を中心に雑談なども行っています。気軽にコミュニティに参加してや！',
      updatedDate: '2018/5/1',
      comment: 613,
      reply: 780,
      image: 108,
      video: 50
    },
    {
      name: '配信後に俺が感想を書くスレ',
      about: 'ピアキャスト、YouTube Gamingで、ゲームの配信を中心に雑談なども行っています。気軽にコミュニティに参加してや！',
      updatedDate: '2017/3/14',
      comment: 102,
      reply: 91,
      image: 15,
      video: 20
    },
    {
      name: '配信でプレイして欲しいゲームを書き込みましょう！',
      about: 'ピアキャスト、YouTube Gamingで、ゲームの配信を中心に雑談なども行っています。気軽にコミュニティに参加してや！',
      updatedDate: '2017/11/20',
      comment: 478,
      reply: 370,
      image: 60,
      video: 39
    },
  ];
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreBbsNavigation(isServer, storeInstanceObj) {
  
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