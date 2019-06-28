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
  //   User Community
  // ---------------------------------------------
  
  @observable dataObj = {};
  
  // @observable dataObj = {
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
  //     members: 67890
  //   },
  // };
  
  
  insertData(dataObj) {
    this.dataObj = Object.assign({}, dataObj, this.dataObj);
    // console.log(`User Community insertData`);
    // console.dir(this.dataObj);
  };
  
  
  
  // --------------------------------------------------
  //   Initialize Data
  // --------------------------------------------------
  
  // constructor(initialData) {
    
  //   if (initialData) {
     
  //     // this.insertOpenedTabNo(initialData);
  //     // this.insertThreadList(initialData);
  //     // this.insertSearch(initialData);
      
  //   }
    
  // }
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreUserCommunity(argumentsObj) {
  
  const isServer = argumentsObj.isServer;
  const storeInstanceObj = argumentsObj.storeInstanceObj;
  
  
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