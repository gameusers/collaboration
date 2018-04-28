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
  //   通知ダイアログ
  // ---------------------------------------------
  
  // @observable loginMenuAnchorEl = null;
  @observable notificationDialogOpen = false;
  // @observable test = 'AAA';
  
  
  @action.bound
  notificationDialogOpenFunction(event) {
    // console.log(event.currentTarget);
    // console.log('Open');
    this.notificationDialogOpen = true;
  };
  
  @action.bound
  notificationDialogCloseFunction() {
    // console.log('Close');
    this.notificationDialogOpen = false;
  };
  
  
  
  // ---------------------------------------------
  //   ログインメニュー
  // ---------------------------------------------
  
  @observable loginMenuAnchorEl = null;
  @observable loginMenuOpen = false;
  // @observable test = 'AAA';
  
  
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
  
  
  // @observable notificationsOpen = false;
  
  // @action.bound
  // notificationsOpenFunction = () => {
  //   this.notificationsOpen = false;
  // };
  
  // @action.bound
  // notificationsCloseFunction = () => {
  //   this.notificationsOpen = false;
  // };
  
  
  
  // ---------------------------------------------
  //   ヘッダー下部メニュー
  // ---------------------------------------------
  
  @observable menuObj = {
    
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
    
    gc: [
      {
        name: 'フィード',
        pathname: '/'
      },
      {
        name: 'ゲーム◆',
        pathname: '/gc'
      },
      {
        name: 'ユーザー',
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