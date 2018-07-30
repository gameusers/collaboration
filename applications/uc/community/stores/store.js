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
  
  // @observable snackbarOpen = false;
  // @observable snackbarVariant = 'warning';
  // @observable snackbarMessage = 'warning message';
  
  // @action.bound
  // handleIncrementCount() {
  //   // console.log(`uc/community/store - initStoreLayout = ${initStoreLayout()}`);
  //   // console.log(initStoreLayout());
  //   // const testStore = initStoreLayout();
  //   // console.log(`uc/community/store - testStore.count = ${testStore.count}`);
    
  //   // console.log(`uc/community/store - storeLayout.count = ${storeLayout.count}`);
  //   // storeLayout.increment();
  //   // storeLayout.snackbarVariant = 'warning';
  //   // storeLayout.snackbarMessage = 'warning message';
  //   storeLayout.handleSnackbarOpen('warning', 'warning message');
  // };
  
  
  
  // ---------------------------------------------
  //   BBS Menu
  // ---------------------------------------------
  
  // @observable bbsMenuExpanded = true;
  // @observable bbsMenuOpenedTabNo = 0;
  
  
  // @action.bound
  // handleBbsMenuExpanded() {
  //   this.bbsMenuExpanded = !this.bbsMenuExpanded;
  // };
  
  // @action.bound
  // handleBbsMenuOpenedTabNo(event, value) {
  //   this.bbsMenuOpenedTabNo = value;
  // };
  
  
  
  
  
  
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
  //   BBS
  // ---------------------------------------------
  
  @observable bbsExpanded = true;
  
  @action.bound
  handleBbsExpanded() {
    this.bbsExpanded = !this.bbsExpanded;
  };
  
  
  // ---------------------------------------------
  //   BBS Form
  // ---------------------------------------------
  
  // @observable bbsFormAnonymityChecked = false;
  // @observable bbsFormImageOpen = false;
  // @observable bbsFormVideoOpen = false;
  
  
  // @action.bound
  // handleBbsFormAnonymityChecked() {
  //   this.bbsFormAnonymityChecked = !this.bbsFormAnonymityChecked;
  // };
  
  // @action.bound
  // handleBbsFormImageOpen() {
  //   this.bbsFormImageOpen = !this.bbsFormImageOpen;
  //   this.bbsFormVideoOpen = false;
  // };
  
  // @action.bound
  // handleBbsFormVideoOpen() {
  //   this.bbsFormVideoOpen = !this.bbsFormVideoOpen;
  //   this.bbsFormImageOpen = false;
  // };
  
  // @action.bound
  // handleBbsFormAddImages(event) {
  //   // console.log(`file = ${event.target.files[0]}`);
    
  //   const imageSizeUpperLimit = 500000;
    
  //   const file = event.target.files[0];
  //   const fileReader = new FileReader();
    
    
  //   // ---------------------------------------------
  //   //   Error
  //   // ---------------------------------------------
    
  //   if (!file) {
  //     return;
  //   }
    
  //   if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
  //     storeLayout.handleSnackbarOpen('error', '最新のブラウザを利用してください。');
  //     return;
  //   }
    
  //   if (!file.type.match(/^image\/(gif|jpeg|png|svg\+xml)$/)) {
  //     storeLayout.handleSnackbarOpen('error', 'アップロードできるのは PNG, GIF, JPEG, SVG の画像ファイルです。');
  //     return;
  //   }
    
  //   if (file.size > imageSizeUpperLimit) {
  //     storeLayout.handleSnackbarOpen('error', '画像のサイズが大きすぎます。');
  //     return;
  //   }
    
    
  //   // ---------------------------------------------
  //   //   画像のデータ取得
  //   // ---------------------------------------------
    
  //   fileReader.onload = () => {

  //     const img = new Image();
  //     img.src = fileReader.result;

  //     img.onload = () => {

  //       const { width } = img;
  //       const { height } = img;

  //       let extension = null;

  //       if (file.type === 'image/gif') {
  //         extension = 'gif';
  //       } else if (file.type === 'image/jpeg') {
  //         extension = 'jpg';
  //       } else if (file.type === 'image/png') {
  //         extension = 'png';
  //       } else {
  //         extension = 'svg';
  //       }
        
  //       console.log(`width = ${width}`);
  //       console.log(`height = ${height}`);
  //       console.log(`extension = ${extension}`);
  //       console.log(`fileReader.result = ${fileReader.result}`);

  //       // dispatch(actions.funcShareImage(file, fileReader.result, width, height, extension));

  //     };

  //   };

  //   fileReader.readAsDataURL(file);
    
  // };
  
  
  
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

export default function initStoreUserCommunity(isServer, storeInstanceObj) {
  
  if (storeLayout === null && 'layout' in storeInstanceObj) {
    storeLayout = storeInstanceObj.layout;
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