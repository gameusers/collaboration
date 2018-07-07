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
  
  @observable openHeaderNotificationDialog = false;
  
  
  @action.bound
  handleOpenHeaderNotificationDialog() {
    this.openHeaderNotificationDialog = true;
  };
  
  @action.bound
  handleCloseHeaderNotificationDialog() {
    this.openHeaderNotificationDialog = false;
  };
  
  
  // ---------------------------------------------
  //   ヘッダー - ログインメニュー
  // ---------------------------------------------
  
  @observable AnchorElHeaderLoginMenu = null;
  @observable openHeaderLoginMenu = false;
  
  
  @action.bound
  handleOpenHeaderLoginMenu(event) {
    this.AnchorElHeaderLoginMenu = event.currentTarget;
    this.openHeaderLoginMenu = true;
  };
  
  @action.bound
  handleCloseHeaderLoginMenu() {
    this.AnchorElHeaderLoginMenu = null;
    this.openHeaderLoginMenu = false;
  };
  
  
  // ---------------------------------------------
  //   ヘッダー - データ
  // ---------------------------------------------
  
  @observable openHeaderDataBox = false;
  
  @action.bound
  handleOpenHeaderDataBox() {
    this.openHeaderDataBox = true;
  };
  
  @action.bound
  handleCloseHeaderDataBox() {
    this.openHeaderDataBox = false;
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
  //   画像・動画モーダルウィンドウ
  // ---------------------------------------------
  
  @observable srcModalImage = null;
  @observable openModalImage = false;
  
  @action.bound
  handleOpenModalImage(src) {
    this.srcModalImage = src;
    this.openModalImage = true;
  };
  
  @action.bound
  handleCloseModalImage() {
    this.openModalImage = false;
  };
  
  
  @observable channelModalVideo = null;
  @observable idModalVideo = null;
  @observable openModalVideo = false;
  
  @action.bound
  handleOpenModalVideo(channel, id) {
    this.channelModalVideo = channel;
    this.idModalVideo = id;
    this.openModalVideo = true;
  };
  
  @action.bound
  handleCloseModalVideo() {
    this.openModalVideo = false;
  };
  
  
  
  // ---------------------------------------------
  //   Snackbar （通知用のバー）
  // ---------------------------------------------
  
  @observable openSnackbar = false;
  @observable verticalSnackbar = 'bottom';
  @observable horizontalSnackbar = 'left';
  @observable autoHideDurationSnackbar= 5000;
  @observable variantSnackbar = '';
  @observable messageSnackbar = '';
  @observable keySnackbar = 'keySnackbar';
  queueSnackbarArr = [];
  
  
  @action.bound
  handleOpenSnackbar(variant, message) {
    
    this.queueSnackbarArr.push({
      variant,
      message,
      key: new Date().getTime(),
    });
    
    if (this.openSnackbar) {
      // immediately begin dismissing current message
      // to start showing new one
      this.openSnackbar = false;
    } else {
      console.log('layout/stores/scommon - handleOpenSnackbar');
      this.processQueue();
    }
    
    // this.openSnackbar = true;
  };
  
  processQueue = () => {
    
    if (this.queueSnackbarArr.length > 0) {
      console.log('layout/stores/scommon - processQueue');
      console.log(`layout/stores/scommon - messageSnackbar = ${this.messageSnackbar}`);
      const tempArr = this.queueSnackbarArr.shift();
      this.variantSnackbar = tempArr.variant;
      this.messageSnackbar = tempArr.message;
      this.keySnackbar = tempArr.key;
      
      this.openSnackbar = true;
    }
    
  };
  
  @action.bound
  handleCloseSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    
    this.openSnackbar = false;
  };
  
  @action.bound
  handleExitedSnackbar() {
    this.processQueue();
  };
  
  
  
  
  @observable count = 0;

  @action.bound
  increment() {
    ++this.count;
  }
  
  
  
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