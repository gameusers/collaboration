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
  //   Title
  // ---------------------------------------------
  
  @observable titleDescriptionOpenObj = {};
  
  
  @action.bound
  handleTitleDescriptionOpen(id) {
    this.titleDescriptionOpenObj[id] = !this.titleDescriptionOpenObj[id];
  };
  
  
  // @observable anonymityCheckedObj = {};
  
  // @action.bound
  // handleAnonymityChecked(id) {
  //   this.anonymityCheckedObj[id] = !this.anonymityCheckedObj[id];
    
  //   // console.log(`id = ${id}`);
  //   // console.log(`this.anonymityCheckedObj[id] = ${this.anonymityCheckedObj[id]}`);
  //   // console.dir(`this.anonymityCheckedObj = ${this.anonymityCheckedObj}`);
  // };
  
  
  
  
  // ---------------------------------------------
  //   スレッドデータ
  // ---------------------------------------------
  
  @observable dataThreadArr = [
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
  
  
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreBbsThread(isServer, storeInstanceObj) {
  
  if (storeLayout === null && 'layout' in storeInstanceObj) {
    storeLayout = storeInstanceObj.layout;
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