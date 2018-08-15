// --------------------------------------------------
//   Import
// --------------------------------------------------

import { action, observable } from 'mobx';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeLayout = null;


// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  // ---------------------------------------------
  //   Current Contents Id
  // ---------------------------------------------
  
  @observable currentContentsId = '';
  
  
  
  // ---------------------------------------------
  //   アクセスしたページ
  // ---------------------------------------------
  
  // historyStateArr = [];
  
  historyStateArr = [
    {
      path: 'uc/az1979',
      param1: 'uc',
      param2: 'az1979',
      param3: 'test',
      param4: '',
      param5: '',
      file: 'uc/community.js',
      id: 'p0V_RsaT1l8',
      dateTime: '2017-07-24T20:45:20'
    }
  ]
  
  insertHistoryState(obj) {
    
    // console.dir(obj);
    
    this.historyStateArr.unshift(obj);
    
    // 履歴を保存する数を指定する
    this.historyStateArr.splice(30, 1);
    
    console.log(`insertHistoryState`);
    console.dir(this.historyStateArr);
    
  };
  
  
  
  
  
  
  
  
  // ---------------------------------------------
  //   ヘッダー - ナビゲーション / メイン
  // ---------------------------------------------
  
  headerNavMainObj = {
    
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
  
  
  
  // ----------------------------------------
  //   Header - Navigation Sub
  // ----------------------------------------
  
  @observable headerNavSubDialogOpenObj = {};
  
  @action.bound
  handleHeaderNavSubDialogOpen(id) {
    this.headerNavSubDialogOpenObj[id] = true;
  };
  
  @action.bound
  handleHeaderNavSubDialogClose(id) {
    this.headerNavSubDialogOpenObj[id] = false;
  };
  
  
  
  // ---------------------------------------------
  //   User Community
  // ---------------------------------------------
  
  // @observable ucObj = {
  //   'p0V_RsaT1l8': {
  //     name: 'あづみ配信コミュニティ',
  //     rule: 'ピアキャスト、YouTube Gamingで、ゲームの配信を中心に雑談なども行っています。気軽にコミュニティに参加してや！配信開始時にメールで連絡するので、コミュニティ参加者は自分のプレイヤーページで、メールアドレスを登録してくれるとありがたい。',
  //     communityId: 'az1979',
  //     members: 12345
  //   },
  //   '3YhijrrHx4e': {
  //     name: 'あづみ配信コミュニティ',
  //     rule: 'ピアキャスト、YouTube Gamingで、ゲームの配信を中心に雑談なども行っています。気軽にコミュニティに参加してや！配信開始時にメールで連絡するので、コミュニティ参加者は自分のプレイヤーページで、メールアドレスを登録してくれるとありがたい。',
  //     communityId: 'az1979',
  //     members: 12345
  //   },
  // };
  
  
  
  
  
  
  // ---------------------------------------------
  //   Lightbox・画像
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
  
  
  @action.bound
  handleLightboxAddImage(id, src, caption) {
    
    if (!this.lightboxImagesObj[id]) {
      this.lightboxImagesObj[id] = [];
    }
    
    const insertObj = {
      src,
      caption
    };
    
    this.lightboxImagesObj[id].push(insertObj);
    
  };
  
  @action.bound
  handleLightboxDeleteImage(id, index) {
    this.lightboxImagesObj[id].splice(index, 1);
  };
  
  
  
  
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
  
  
  
  
  
  // ---------------------------------------------
  //   モーダルウィンドウ・動画
  // ---------------------------------------------
  
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
  
  
  
  
  
  // ---------------------------------------------
  //   Panel
  // ---------------------------------------------
  
  @observable panelExpandedObj = {};
  
  // @observable panelExpandedObj = {
  //   'p0V_RsaT1l8': {
  //     'p0V_RsaT1l8': true, // BBS スレッド
  //     'ks8WPvlQpbg': true // BBS
  //   }
  // };
  
  @action.bound
  handlePanelExpanded(id) {
    // console.log(`handlePanelExpanded`);
    // console.dir(this.panelExpandedObj);
    
    // console.log(`id = ${id}`);
    // console.log(`this.historyStateArr[0].id = ${this.historyStateArr[0].id}`);
    
    this.panelExpandedObj[id] = !this.panelExpandedObj[id];
  };
  
  returnPanelExpanded(id) {
    // console.dir(this.panelExpandedObj);
    return this.panelExpandedObj[id];
  }
  
  insertPanelExpanded(dataObj) {
    this.panelExpandedObj = Object.assign({}, dataObj, this.panelExpandedObj);
  };
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreLayout(argumentsObj) {
  
  const isServer = argumentsObj.isServer;
  
  
  if (isServer) {
    // console.log(`@ initStoreLayout / isServer`);
    return new Store();
    
  } else {
    
    // console.log(`@ initStoreLayout / isClient`);
    
    if (storeLayout === null) {
      // console.log(`initStoreLayout / initialDataObj 挿入`);
      storeLayout = new Store();
    }
    
    // console.log(`@ initStoreLayout / return前`);
    
    return storeLayout;
    
  }
  
}