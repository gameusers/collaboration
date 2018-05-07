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
  
  @observable notificationDialogOpen = false;
  
  
  @action.bound
  notificationDialogOpenFunction(event) {
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

export default function initStoreRoot(isServer) {
  
  if (isServer) {
    
    return new Store();
    
  } else {
    
    if (store === null) {
      store = new Store();
    }
    
    return store;
    
  }
  
}