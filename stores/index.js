// --------------------------------------------------
//   Import
// --------------------------------------------------

import { action, observable } from 'mobx';


// --------------------------------------------------
//   Class
// --------------------------------------------------

export default class StoreIndex {
  
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
    }
  ];
  
}