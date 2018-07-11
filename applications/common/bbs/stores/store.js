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
  
  
  // ---------------------------------------------
  //   Header Menu
  // ---------------------------------------------
  
  @observable headerMenuArr = [
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
  ]
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreIndex(isServer, storeLayoutInstance) {
  
  if (storeLayout === null && storeLayoutInstance) {
    storeLayout = storeLayoutInstance;
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