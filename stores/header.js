// --------------------------------------------------
//   Import
// --------------------------------------------------

import { action, observable } from 'mobx';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let store = null;


// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  
  // ---------------------------------------------
  //   マウススクロールでトップメニューを動かす
  // ---------------------------------------------
  
  @observable topMenuOpen = true;
  
  
  @action.bound
  topMenuOpenFunction() {
    // console.log('Open');
    if (this.topMenuOpen) {
      this.topMenuOpen = false;
    } else {
      this.topMenuOpen = true;
    }
    
  };
  
  
  // ---------------------------------------------
  //   通知ダイアログ
  // ---------------------------------------------
  
  @observable notificationDialogOpen = false;
  
  
  @action.bound
  notificationDialogOpenFunction() {
    this.notificationDialogOpen = true;
  };
  
  @action.bound
  notificationDialogCloseFunction() {
    this.notificationDialogOpen = false;
  };
  
  
  
  // ---------------------------------------------
  //   ログインメニュー
  // ---------------------------------------------
  
  @observable loginMenuAnchorEl = null;
  @observable loginMenuOpen = false;
  
  
  @action.bound
  loginMenuOpenFunction(event) {
    // console.log(event.currentTarget);
    // console.log('Open');
    this.loginMenuAnchorEl = event.currentTarget;
    this.loginMenuOpen = true;
  };
  
  @action.bound
  loginMenuCloseFunction() {
    // console.log('Close');
    this.loginMenuAnchorEl = null;
    this.loginMenuOpen = false;
  };
  
  
  // ---------------------------------------------
  //   ヒーローイメージ
  // ---------------------------------------------
  
  @observable gameNo = 1;
  @observable heroImageArr = [1];
  // @observable heroImageArr = null;
  @observable thumbnail = false;
  @observable dataTitle = 'Dead by Daylight';
  @observable dataHardware = 'PC, PS4, Xbox One';
  @observable dataGenre = 'アクション';
  @observable dataPlayersMax = '1-5人';
  @observable dataReleaseDate = '2016/6/14';
  @observable dataDeveloper = 'Behaviour Interactive';
  @observable dataLinkArr = [
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
  //   ヘッダー下部メニュー
  // ---------------------------------------------
  
  menuObj = {
    
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
      },
      {
        name: 'テスト1',
        pathname: '/test'
      },
      {
        name: 'テスト2',
        pathname: '/test'
      },
      {
        name: 'テスト3',
        pathname: '/test'
      },
      {
        name: 'テスト4',
        pathname: '/test'
      },
      {
        name: 'テスト5',
        pathname: '/test'
      },
      {
        name: 'テスト6',
        pathname: '/test'
      }
    ],
    
    gc: [
      {
        name: 'フィード◆',
        pathname: '/'
      },
      {
        name: 'ゲーム◆',
        pathname: '/gc'
      },
      {
        name: 'ユーザー◆',
        pathname: '/uc'
      }
    ],
    
    uc: [
      {
        name: 'フィード★',
        pathname: '/'
      },
      {
        name: 'ゲーム★',
        pathname: '/gc'
      },
      {
        name: 'ユーザー★',
        pathname: '/uc'
      }
    ]
    
  };
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreHeader(isServer) {
  
  if (isServer) {
    
    return new Store();
    
  } else {
    
    if (store === null) {
      store = new Store();
    }
    
    return store;
    
  }
  
}