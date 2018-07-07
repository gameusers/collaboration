// --------------------------------------------------
//   Import
// --------------------------------------------------

import { action, observable } from 'mobx';
// import { Store as StoreCommon } from '../../../common/layout/stores/common';
// import initStoreLayout from '../../../common/layout/stores/layout';
// import { store as storeCommon } from '../../../common/layout/stores/common';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeUcCommunity = null;
let storeLayout = null;


// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  // ---------------------------------------------
  //   Header Menu
  // ---------------------------------------------
  
  // @observable headerMenuArr = [
  //   {
  //     name: 'トップ',
  //     pathname: '/uc/community'
  //   },
  //   {
  //     name: 'メンバー',
  //     pathname: '/uc/community/member'
  //   }
  // ]
  
  
  // ---------------------------------------------
  //   Snackbar
  // ---------------------------------------------
  
  // @observable openSnackbar = false;
  // @observable variantSnackbar = 'warning';
  // @observable messageSnackbar = 'warning message';
  
  // @action.bound
  // handleIncrementCount() {
  //   // console.log(`uc/community/store - initStoreLayout = ${initStoreLayout()}`);
  //   // console.log(initStoreLayout());
  //   // const testStore = initStoreLayout();
  //   // console.log(`uc/community/store - testStore.count = ${testStore.count}`);
    
  //   // console.log(`uc/community/store - storeLayout.count = ${storeLayout.count}`);
  //   // storeLayout.increment();
  //   // storeLayout.variantSnackbar = 'warning';
  //   // storeLayout.messageSnackbar = 'warning message';
  //   storeLayout.handleOpenSnackbar('warning', 'warning message');
  // };
  
  
  
  // ---------------------------------------------
  //   BBS Menu
  // ---------------------------------------------
  
  @observable openBbsMenuTabNo = 0;
  
  
  @action.bound
  handleChangeOpenBbsMenuTabNo(event, value) {
    this.openBbsMenuTabNo = value;
  };
  
  @action.bound
  handleClickBbsMenuButtonThreadList(event) {
    event.stopPropagation();
    // console.log(`handleClickShortcutBbsThread`);
  };
  
  @action.bound
  handleClickBbsMenuButtonNew(event) {
    event.stopPropagation();
  };
  
  @action.bound
  handleClickBbsMenuButtonImage(event) {
    event.stopPropagation();
  };
  
  @action.bound
  handleClickBbsMenuButtonVideo(event) {
    event.stopPropagation();
  };
  
  
  
  
  // ---------------------------------------------
  //   BBS スレッド一覧
  // ---------------------------------------------
  
  @observable bbsThreadListOrderBy = 'updatedDate';
  @observable bbsThreadListOrder = 'desc';
  @observable bbsThreadListCount = 30;
  @observable bbsThreadListRowsPerPage = 5;
  @observable bbsThreadListPage = 1;
  
  
  @action.bound
  sortBbsThreadList(orderBy) {
    
    if (this.bbsThreadListOrderBy !== orderBy || this.bbsThreadListOrder === 'asc') {
      this.bbsThreadListOrder = 'desc';
    } else {
      this.bbsThreadListOrder = 'asc';
    }
    
    this.bbsThreadListOrderBy = orderBy;
    
  };
  
  @action.bound
  handleChangeBbsThreadListRowsPerPage(event) {
    // console.log(`RowsPerPage = ${event.target.value}`);
    this.bbsThreadListRowsPerPage = event.target.value;
  };
  
  @action.bound
  handleChangeBbsThreadListPage(event, value) {
    // console.log(`page = ${value}`);
    this.bbsThreadListPage = value;
  };
  
  
  
  // ---------------------------------------------
  //   BBS 検索
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
  //   BBS Form
  // ---------------------------------------------
  
  @observable checkedBbsFormAnonymity = false;
  @observable showBbsFormImage = false;
  @observable showBbsFormVideo = false;
  
  
  @action.bound
  handleCheckedBbsFormAnonymity() {
    this.checkedBbsFormAnonymity = !this.checkedBbsFormAnonymity;
  };
  
  @action.bound
  handleClickShowBbsFormImage() {
    this.showBbsFormImage = !this.showBbsFormImage;
    this.showBbsFormVideo = false;
  };
  
  @action.bound
  handleClickShowBbsFormVideo() {
    this.showBbsFormVideo = !this.showBbsFormVideo;
    this.showBbsFormImage = false;
  };
  
  @action.bound
  handleChangeBbsFormAddImage(event) {
    // console.log(`file = ${event.target.files[0]}`);
    
    const file = event.target.files[0];
    
    // return;
    
    console.dir(`file = ${file}`);
    
    if (file) {
      // console.log(`uc/community/store - StoreCommon = ${StoreCommon}`);
      // console.log(`uc/community/store - messageSnackbar = ${StoreCommon.messageSnackbar}`);
      // const store = new StoreCommon();
      
      // console.log(`uc/community/store - messageSnackbar = ${store.messageSnackbar}`);
      // const store = initStoreLayout();
      
      // console.log(`uc/community/store - storeCommon = ${storeCommon}`);
      
      
      // store.handleOpenSnackbar();
    }
    
    if (!file) {
      return;
    }
    
    
    
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
      // iziToast.error({
      //   title: 'Error',
      //   message: '最新のブラウザを利用してください。'
      // });
      return;
    }
    
  };
  
  
  
  // ---------------------------------------------
  //   スレッドデータ
  // ---------------------------------------------
  
  @observable bbsThreadArr = [
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
  
  
  
  // ---------------------------------------------
  //   Pagination
  // ---------------------------------------------
  
  @observable paginationCurrent = 1;
  @observable paginationTotal = 100;
  @observable paginationPageSize = 10;
  
  
  @action.bound
  pageChangeFunction(page) {
    this.paginationCurrent = page;
  };
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreUcCommunity(isServer, storeLayoutInstance) {
  
  if (storeLayout === null && storeLayoutInstance) {
    storeLayout = storeLayoutInstance;
  }
  
  if (isServer) {
    
    return new Store();
    
  } else {
    
    if (storeUcCommunity === null) {
      storeUcCommunity = new Store();
    }
    
    return storeUcCommunity;
    
  }
  
}