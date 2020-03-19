// --------------------------------------------------
//   Import
// --------------------------------------------------

import { action, observable } from 'mobx';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeUcIndex = null;
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
  
  
  // ---------------------------------------------
  //   表示情報選択ダイアログ / 表示・非表示
  // ---------------------------------------------
  
  @observable dialogOpen = false;
  
  
  @action.bound
  dialogOpenFunction() {
    this.dialogOpen = true;
  };
  
  @action.bound
  dialogCloseFunction() {
    this.dialogOpen = false;
  };
  
  
  
  // ---------------------------------------------
  //   表示情報選択項目
  // ---------------------------------------------
  
  @observable descriptionShow = true;
  @observable membersShow = true;
  @observable updatedDateShow = true;
  @observable createdDateShow = true;
  @observable typeShow = true;
  @observable gameShow = true;
  @observable tagShow = true;
  
  
  @action.bound
  descriptionChangeFunction() {
    if (this.descriptionShow) {
      this.descriptionShow = false;
    } else {
      this.descriptionShow = true;
    }
  };
  
  @action.bound
  membersChangeFunction() {
    if (this.membersShow) {
      this.membersShow = false;
    } else {
      this.membersShow = true;
    }
  };
  
  @action.bound
  updatedDateChangeFunction() {
    if (this.updatedDateShow) {
      this.updatedDateShow = false;
    } else {
      this.updatedDateShow = true;
    }
  };
  
  @action.bound
  createdDateChangeFunction() {
    if (this.createdDateShow) {
      this.createdDateShow = false;
    } else {
      this.createdDateShow = true;
    }
  };
  
  @action.bound
  typeChangeFunction() {
    if (this.typeShow) {
      this.typeShow = false;
    } else {
      this.typeShow = true;
    }
  };
  
  @action.bound
  gameChangeFunction() {
    if (this.gameShow) {
      this.gameShow = false;
    } else {
      this.gameShow = true;
    }
  };
  
  @action.bound
  tagChangeFunction() {
    if (this.tagShow) {
      this.tagShow = false;
    } else {
      this.tagShow = true;
    }
  };
  
  
  
  // ---------------------------------------------
  //   Pagination
  // ---------------------------------------------
  
  @observable paginationCurrent = 1;
  @observable paginationTotal = 100;
  @observable paginationPageSize = 10;
  
  
  @action.bound
  pageChangeFunction(page) {
    this.paginationCurrent = page;
  };
  
  
  
  // ---------------------------------------------
  //   ユーザーコミュニティ情報
  // ---------------------------------------------
  
  @observable gamesArr = [
    {
      name: 'あづみ配信コミュニティ',
      description: 'ピアキャスト、YouTube Gamingで、ゲームの配信を中心に雑談なども行っています。気軽にコミュニティに参加してや！',
      members: '1 人',
      updatedDate: '2018/6/12',
      createdDate: '2012/3/14',
      type: '参加：誰でも',
      game: 'BEYOND: Two Souls',
      thumbnail: 'https://gameusers.org/assets/img/community/1/thumbnail.jpg',
      link: '/uc/az1979',
      tagArr: [
        'サッカー',
        '青年実業家'
      ]
    },
    {
      name: 'Piroshiのコミュニティ',
      description: 'Piroshiのゲーム配信用コミュニティーです。',
      members: '20 人',
      updatedDate: '2018/5/1',
      createdDate: '2014/1/1',
      type: '参加：誰でも',
      game: 'オーバーウォッチ',
      thumbnail: 'https://gameusers.org/assets/img/community/13/thumbnail.jpg',
      link: '/uc/piroshi',
      tagArr: []
    },
    {
      name: '安西爆弾の活動記・日記など',
      description: 'トラブル防止の為、メンバー限定コミュです。',
      members: '300 人',
      updatedDate: '2017/3/31',
      createdDate: '2015/12/25',
      type: '参加：要承認',
      game: 'RPGツクールMV',
      thumbnail: 'https://gameusers.org/assets/img/community/16/thumbnail.jpg',
      link: '/uc/anzaib',
      tagArr: ['RPGツクール']
    },
    {
      name: 'Game Users 公式コミュニティ',
      description: 'Game Usersへの質問・疑問、要望などがありましたら、ぜひこちらに書き込んでください。新しい機能を追加した際も、当コミュニティにてお知らせしています。',
      members: '4000 人',
      updatedDate: '2016/7/8',
      createdDate: '2010/5/15',
      type: '参加：要承認',
      game: 'スーパーマリオブラザーズ',
      thumbnail: 'https://gameusers.org/assets/img/community/8/thumbnail.jpg',
      link: '/uc/official',
      tagArr: ['Official']
    }
  ];
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreUcIndex(isServer, storeLayoutInstance) {
  
  if (storeLayout === null && storeLayoutInstance) {
    storeLayout = storeLayoutInstance;
  }
  
  if (isServer) {
    
    return new Store();
    
  } else {
    
    if (storeUcIndex === null) {
      storeUcIndex = new Store();
    }
    
    return storeUcIndex;
    
  }
  
}