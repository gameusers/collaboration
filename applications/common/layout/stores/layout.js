// --------------------------------------------------
//   Import
// --------------------------------------------------

import { action, computed, observable } from 'mobx';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeLayout = null;


// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  // ---------------------------------------------
  //   ヘッダー下部メニュー
  // ---------------------------------------------
  
  headerMenuObj = {
    
    // index: [
    //   {
    //     name: 'フィード',
    //     pathname: '/'
    //   },
    //   {
    //     name: 'ゲーム',
    //     pathname: '/gc'
    //   },
    //   {
    //     name: 'ユーザー',
    //     pathname: '/uc'
    //   },
    //   {
    //     name: 'テスト1',
    //     pathname: '/test'
    //   },
    //   {
    //     name: 'テスト2',
    //     pathname: '/test'
    //   },
    //   {
    //     name: 'テスト3',
    //     pathname: '/test'
    //   },
    //   {
    //     name: 'テスト4',
    //     pathname: '/test'
    //   },
    //   {
    //     name: 'テスト5',
    //     pathname: '/test'
    //   },
    //   {
    //     name: 'テスト6',
    //     pathname: '/test'
    //   }
    // ],
    
    index: [
      {
        name: 'フィード',
        pathname: '/'
      },
      {
        name: 'ゲーム',
        pathname: '/gc'
      },
      {
        name: 'ユーザー',
        pathname: '/uc'
      }
    ],
    
    uc: [
      {
        name: 'トップ',
        pathname: '/uc/community'
      },
      {
        name: 'メンバー',
        pathname: '/uc/community/member'
      },
      {
        name: 'データ',
        pathname: '/uc/community/data'
      }
    ],
    
    gc: [
      {
        name: 'BBS',
        pathname: '/gc/community'
      },
      {
        name: '募集',
        pathname: '/uc/community/rec'
      },
      {
        name: '設定',
        pathname: '/uc/community/config'
      }
    ],
    
    login: [
      {
        name: 'ID & パスワード',
        pathname: '/login'
      },
      {
        name: 'ソーシャル',
        pathname: '/login/social'
      }
    ],
    
    logout: [
      {
        name: 'ログアウト',
        pathname: '/logout'
      }
    ],
    
  };
  
  
  // ---------------------------------------------
  //   ヘッダー - 通知ダイアログ
  // ---------------------------------------------
  
  @observable headerNotificationDialogOpen = false;
  
  
  @action.bound
  handleHeaderNotificationDialogOpen() {
    this.headerNotificationDialogOpen = true;
  };
  
  @action.bound
  handleHeaderNotificationDialogClose() {
    this.headerNotificationDialogOpen = false;
  };
  
  
  // ---------------------------------------------
  //   ヘッダー - ログインメニュー
  // ---------------------------------------------
  
  @observable headerLoginMenuAnchorEl = null;
  @observable headerLoginMenuOpen = false;
  
  
  @action.bound
  handleHeaderLoginMenuOpen(event) {
    this.headerLoginMenuAnchorEl = event.currentTarget;
    this.headerLoginMenuOpen = true;
  };
  
  @action.bound
  handleHeaderLoginMenuClose() {
    this.headerLoginMenuAnchorEl = null;
    this.headerLoginMenuOpen = false;
  };
  
  
  // ---------------------------------------------
  //   ヘッダー - データ
  // ---------------------------------------------
  
  @observable headerDataBoxOpen = false;
  
  @action.bound
  handleHeaderDataBoxOpen() {
    this.headerDataBoxOpen = true;
  };
  
  @action.bound
  handleHeaderDataBoxClose() {
    this.headerDataBoxOpen = false;
  };
  
  
  // ---------------------------------------------
  //   ヘッダー - ヒーローイメージ
  // ---------------------------------------------
  
  @observable headerGameNo = 1;
  @observable headerHeroImageArr = [1];
  // @observable headerHeroImageArr = null;
  @observable headerThumbnail = false;
  @observable headerDataTitle = 'Dead by Daylight';
  @observable headerDataHardware = 'PC, PS4, Xbox One';
  @observable headerDataGenre = 'アクション';
  @observable headerDataPlayersMax = '1-5人';
  @observable headerDataReleaseDate = '2016/6/14';
  @observable headerDataDeveloper = 'Behaviour Interactive';
  @observable headerDataLinkArr = [
    {
      type: 'Official',
      name: null,
      url: 'http://www.deadbydaylight.com/'
    },
    {
      type: 'Twitter',
      name: null,
      url: 'https://twitter.com/deadByBHVR'
    },
    {
      type: 'Facebook',
      name: null,
      url: 'https://www.facebook.com/DeadByDaylight/'
    },
    {
      type: 'YouTube',
      name: null,
      url: 'https://www.youtube.com/channel/UCaSgsFdGbwjfdawl3rOXiwQ'
    },
    {
      type: 'Steam',
      name: null,
      url: 'https://store.steampowered.com/app/381210/'
    }
  ];
  
  
  
  // ---------------------------------------------
  //   Panel
  // ---------------------------------------------
  
  // @observable panelExpanded = null;
  // @observable modalImageOpen = false;
  
  
  // @action.bound
  // handleReturnPanelExpanded(category, id) {
  //   return true;
  // };
  
  // @action.bound
  // handlePanelExpanded(category, id) {
  //   this.modalImageOpen = true;
  // };
  
  
  
  // ---------------------------------------------
  //   画像・動画モーダルウィンドウ
  // ---------------------------------------------
  
  @observable lightboxCurrentNo = 0;
  @observable lightboxSrcArr = [];
  @observable lightboxOpen = false;
  @observable lightboxImagesId = 'init';
  
  @action.bound
  handleLightboxOpen(id, currentNo) {
    this.lightboxImagesId = id;
    this.lightboxCurrentNo = currentNo;
    this.lightboxOpen = true;
  };
  
  @action.bound
  handleLightboxClose() {
    this.lightboxOpen = false;
  };
  
  @action.bound
  handleLightboxPreviousCurrentNo() {
    this.lightboxCurrentNo = this.lightboxCurrentNo - 1;
  };
  
  @action.bound
  handleLightboxNextCurrentNo() {
    this.lightboxCurrentNo = this.lightboxCurrentNo + 1;
  };
  
  
  
  
  @observable lightboxImagesObj = {
    init: [
      {
        src: '/static/img/common/logo.png',
        caption: 'Logo',
        srcSet: [
          '/static/img/common/logo.png 320w',
          '/static/img/common/logo.png 640w',
        ],
      },
      {
        src: '/static/img/common/logo.png',
        caption: 'Logo',
        srcSet: [
          '/static/img/common/logo.png 320w',
          '/static/img/common/logo.png 640w',
        ],
      },
      {
        src: '/static/img/common/logo.png',
        caption: 'Logo',
        srcSet: [
          '/static/img/common/logo.png 320w',
          '/static/img/common/logo.png 640w',
        ],
      },
      {
        src: '/static/img/common/logo.png',
        caption: 'Logo',
        srcSet: [
          '/static/img/common/logo.png 320w',
          '/static/img/common/logo.png 640w',
        ],
      },
      {
        src: '/static/img/common/logo.png',
        caption: 'Logo',
        srcSet: [
          '/static/img/common/logo.png 320w',
          '/static/img/common/logo.png 640w',
        ],
      },
      {
        src: '/static/img/common/logo.png',
        caption: 'Logo',
        srcSet: [
          '/static/img/common/logo.png 320w',
          '/static/img/common/logo.png 640w',
        ],
      },
      {
        src: '/static/img/common/logo.png',
        caption: 'Logo',
        srcSet: [
          '/static/img/common/logo.png 320w',
          '/static/img/common/logo.png 640w',
        ],
      },
      {
        src: '/static/img/common/logo.png',
        caption: 'Logo',
        srcSet: [
          '/static/img/common/logo.png 320w',
          '/static/img/common/logo.png 640w',
        ],
      },
      {
        src: '/static/img/common/logo.png',
        caption: 'Logo',
        srcSet: [
          '/static/img/common/logo.png 320w',
          '/static/img/common/logo.png 640w',
        ],
      },
      {
        src: '/static/img/common/logo.png',
        caption: 'Logo',
        srcSet: [
          '/static/img/common/logo.png 320w',
          '/static/img/common/logo.png 640w',
        ],
      }
    ],
    Um_cUEd7vl0: [
      {
        src: 'https://gameusers.org/assets/img/bbs_uc/reply/1089/image_1.jpg',
        caption: 'Caption 1 AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        srcSet: [
          'https://gameusers.org/assets/img/bbs_uc/reply/1089/image_1.jpg 320w',
          'https://gameusers.org/assets/img/bbs_uc/reply/1089/image_1.jpg 640w',
        ],
      },
      {
        src: 'https://gameusers.org/assets/img/bbs_uc/comment/1209/image_1.jpg',
        caption: 'Caption 2 AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        srcSet: [
          'https://gameusers.org/assets/img/bbs_uc/comment/1209/image_1.jpg 320w',
          'https://gameusers.org/assets/img/bbs_uc/comment/1209/image_1.jpg 640w',
        ],
      },
      {
        src: 'https://gameusers.org/assets/img/bbs_uc/reply/1775/image_1.jpg',
        caption: 'Caption 3',
        srcSet: [
          'https://gameusers.org/assets/img/bbs_uc/reply/1775/image_1.jpg 320w',
          'https://gameusers.org/assets/img/bbs_uc/reply/1775/image_1.jpg 640w',
        ],
      },
      {
        src: 'https://gameusers.org/assets/img/bbs_uc/comment/1168/image_1.jpg.jpg',
        caption: 'Caption 4',
        srcSet: [
          'https://gameusers.org/assets/img/bbs_uc/comment/1168/image_1.jpg 320w',
          'https://gameusers.org/assets/img/bbs_uc/comment/1168/image_1.jpg 640w',
        ],
      },
      {
        src: 'https://gameusers.org/assets/img/bbs_uc/comment/1167/image_1.jpg',
        caption: 'Caption 5',
        srcSet: [
          'https://gameusers.org/assets/img/bbs_uc/comment/1167/image_1.jpg 320w',
          'https://gameusers.org/assets/img/bbs_uc/comment/1167/image_1.jpg 640w',
        ],
      }
    ],
    GMi2JFwJ868: [
      {
        src: 'https://gameusers.org/assets/img/bbs_uc/comment/1070/image_1.jpg',
        caption: 'Caption 1',
        srcSet: [
          'https://gameusers.org/assets/img/bbs_uc/comment/1070/image_1.jpg 320w',
          'https://gameusers.org/assets/img/bbs_uc/comment/1070/image_1.jpg 640w',
        ],
      },
      {
        src: 'https://gameusers.org/assets/img/bbs_uc/reply/1592/image_1.jpg',
        caption: 'Caption 2',
        srcSet: [
          'https://gameusers.org/assets/img/bbs_uc/reply/1592/image_1.jpg 320w',
          'https://gameusers.org/assets/img/bbs_uc/reply/1592/image_1.jpg 640w',
        ],
      },
      {
        src: 'https://gameusers.org/assets/img/bbs_uc/comment/1065/image_1.jpg',
        caption: 'Caption 3',
        srcSet: [
          'https://gameusers.org/assets/img/bbs_uc/comment/1065/image_1.jpg 320w',
          'https://gameusers.org/assets/img/bbs_uc/comment/1065/image_1.jpg 640w',
        ],
      }
    ],
    
  };
  
  
  
  // images={[
  //           {
  //             src: 'https://gameusers.org/assets/img/bbs_uc/reply/1089/image_1.jpg',
  //             caption: 'Caption 1',
  //             srcSet: [
  //               'https://gameusers.org/assets/img/bbs_uc/reply/1089/image_1.jpg 320w',
  //               'https://gameusers.org/assets/img/bbs_uc/reply/1089/image_1.jpg 640w',
  //             ],
  //           },
  //           {
  //             src: 'https://gameusers.org/assets/img/bbs_uc/comment/1209/image_1.jpg',
  //             caption: 'Caption 2',
  //             srcSet: [
  //               'https://gameusers.org/assets/img/bbs_uc/comment/1209/image_1.jpg 320w',
  //               'https://gameusers.org/assets/img/bbs_uc/comment/1209/image_1.jpg 640w',
  //             ],
  //           }
  //         ]}
  
  
  
  
  // @action.bound
  // lightboxCurrentNo(id) {
  //   return this.lightboxCurrentNoObj[id];
  // }
  
  // @computed get lightboxCurrentNo() {
  //   return 0;
  // }
  
  // @computed get lightboxOpen() {
  //   return false;
  // }
  
  // @observable lightboxCurrentNoObj = {};
  // // @observable modalImageSrcArr = [];
  // @observable lightboxOpenObj = {};
  
  // @action.bound
  // handleLightboxOpen(id, currentNo) {
  //   this.lightboxCurrentNoObj[id] = currentNo;
  //   this.lightboxOpenObj[id] = true;
  //   console.log(`this.lightboxCurrentNoObj[id] = ${this.lightboxCurrentNoObj[id]}`);
  //   // this.lightboxCurrentNo = currentNo;
  //   // this.modalImageSrcArr = srcArr;
  //   // this.lightboxOpen = true;
  // };
  
  // @action.bound
  // handleLightboxClose(id) {
  //   this.lightboxOpenObj[id] = false;
  // };
  
  // @action.bound
  // lightboxCurrentNo(id) {
  //   return this.lightboxCurrentNoObj[id];
  // }
  
  // @computed get lightboxCurrentNo() {
  //   return 0;
  // }
  
  // @computed get lightboxOpen() {
  //   return false;
  // }
  
  
  // @computed get lightboxCurrentNo(id) {
  //   return this.lightboxCurrentNoObj[id];
  // }
  
  
  
  @observable modalImageSrc = null;
  @observable modalImageOpen = false;
  
  @action.bound
  handleModalImageOpen(src) {
    this.modalImageSrc = src;
    this.modalImageOpen = true;
  };
  
  @action.bound
  handleModalImageClose() {
    this.modalImageOpen = false;
  };
  
  
  @observable modalVideoChannel = null;
  @observable modalVideoId = null;
  @observable modalVideoOpen = false;
  
  @action.bound
  handleModalVideoOpen(channel, id) {
    this.modalVideoChannel = channel;
    this.modalVideoId = id;
    this.modalVideoOpen = true;
  };
  
  @action.bound
  handleModalVideoClose() {
    this.modalVideoOpen = false;
  };
  
  
  
  // ---------------------------------------------
  //   Snackbar （通知用のバー）
  // ---------------------------------------------
  
  @observable snackbarOpen = false;
  @observable snackbarVertical = 'bottom';
  @observable snackbarHorizontal = 'left';
  @observable snackbarAutoHideDuration= 5000;
  @observable snackbarVariant = '';
  @observable snackbarMessage = '';
  @observable snackbarKey = 'snackbarKey';
  
  snackbarQueueArr = [];
  
  
  @action.bound
  handleSnackbarOpen(variant, message) {
    
    this.snackbarQueueArr.push({
      variant,
      message,
      key: new Date().getTime(),
    });
    
    if (this.snackbarOpen) {
      // immediately begin dismissing current message
      // to start showing new one
      this.snackbarOpen = false;
    } else {
      // console.log('layout/stores/scommon - handleSnackbarOpen');
      this.processQueue();
    }
    
    // this.snackbarOpen = true;
  };
  
  processQueue = () => {
    
    if (this.snackbarQueueArr.length > 0) {
      // console.log('layout/stores/scommon - processQueue');
      // console.log(`layout/stores/scommon - snackbarMessage = ${this.snackbarMessage}`);
      const tempArr = this.snackbarQueueArr.shift();
      this.snackbarVariant = tempArr.variant;
      this.snackbarMessage = tempArr.message;
      this.snackbarKey = tempArr.key;
      
      this.snackbarOpen = true;
    }
    
  };
  
  @action.bound
  handleSnackbarClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    
    this.snackbarOpen = false;
  };
  
  @action.bound
  handleSnackbarExited() {
    this.processQueue();
  };
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreLayout(isServer) {
  
  if (isServer) {
    // console.log('Initialize Store / Sever');
    return new Store();
    
  } else {
    
    if (storeLayout === null) {
      // console.log('Initialize Store / Client / store === null');
      storeLayout = new Store();
    }
    // console.log('Initialize Store / Client');
    // console.log(store);
    
    return storeLayout;
    
  }
  
}