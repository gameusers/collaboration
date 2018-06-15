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
  
  @observable followersShow = true;
  @observable categoryShow = true;
  @observable releaseDateShow = true;
  @observable priceShow = true;
  @observable playersShow = false;
  @observable hardwareShow = true;
  @observable developerShow = false;
  @observable linkShow = false;
  @observable tagShow = false;
  
  
  @action.bound
  followersChangeFunction() {
    if (this.followersShow) {
      this.followersShow = false;
    } else {
      this.followersShow = true;
    }
  };
  
  @action.bound
  categoryChangeFunction() {
    if (this.categoryShow) {
      this.categoryShow = false;
    } else {
      this.categoryShow = true;
    }
  };
  
  @action.bound
  releaseDateChangeFunction() {
    if (this.releaseDateShow) {
      this.releaseDateShow = false;
    } else {
      this.releaseDateShow = true;
    }
  };
  
  @action.bound
  priceChangeFunction() {
    if (this.priceShow) {
      this.priceShow = false;
    } else {
      this.priceShow = true;
    }
  };
  
  @action.bound
  playersChangeFunction() {
    if (this.playersShow) {
      this.playersShow = false;
    } else {
      this.playersShow = true;
    }
  };
  
  @action.bound
  hardwareChangeFunction() {
    if (this.hardwareShow) {
      this.hardwareShow = false;
    } else {
      this.hardwareShow = true;
    }
  };
  
  @action.bound
  developerChangeFunction() {
    if (this.developerShow) {
      this.developerShow = false;
    } else {
      this.developerShow = true;
    }
  };
  
  @action.bound
  linkChangeFunction() {
    if (this.linkShow) {
      this.linkShow = false;
    } else {
      this.linkShow = true;
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
  //   ゲーム情報
  // ---------------------------------------------
  
  @observable gamesArr = [
    {
      name: 'Dead by Daylight',
      followers: '123 人',
      category: 'アクション',
      releaseDate: '2016/6/14',
      price: '3,000 円',
      players: '1-4 人',
      hardware: 'PC, PlayStation 4, Xbox One',
      developer: 'Behaviour Interactive',
      thumbnail: 'https://gameusers.org/assets/img/game/649/thumbnail.jpg',
      link: '/gc/dead-by-daylight',
      linkArr: [
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
      ],
      tagArr: [
        'キラー',
        'サバイバー'
      ]
    },
    {
      name: 'HEAVY RAIN - 心の軋むとき -',
      followers: '300 人',
      category: 'アドベンチャー',
      releaseDate: '2010/2/18',
      price: '5,690 円',
      players: '1 人',
      hardware: 'PlayStation 3, PlayStation 4',
      developer: 'Quantic Dream',
      thumbnail: 'https://gameusers.org/assets/img/game/650/thumbnail.jpg',
      link: '/gc/heavy-rain',
      linkArr: [
        {
          type: 'Official',
          name: null,
          url: 'https://www.jp.playstation.com/games/heavy-rain-ps4/'
        }
      ],
      tagArr: []
    },
    {
      name: 'Fortnite',
      followers: '30056 人',
      category: 'アクション / TPS',
      releaseDate: '2017/7/25',
      price: '-',
      players: '1-100 人',
      hardware: 'PlayStation 4, PC, Android, iOS',
      developer: 'Epic Games',
      thumbnail: 'https://gameusers.org/assets/img/game/648/thumbnail.jpg',
      link: '/gc/fortnite',
      linkArr: [
        {
          type: 'Official',
          name: null,
          url: 'https://www.epicgames.com/fortnite/ja/home'
        },
        {
          type: 'Twitter',
          name: null,
          url: 'https://twitter.com/FortniteGame'
        },
        {
          type: 'Facebook',
          name: null,
          url: 'https://www.facebook.com/FortniteGame'
        },
        {
          type: 'YouTube',
          name: null,
          url: 'https://www.youtube.com/epicfortnite'
        }
      ],
      tagArr: []
    },
    {
      name: 'モンスターハンター：ワールド',
      followers: '816 人',
      category: 'アクション',
      releaseDate: '2018/1/26',
      price: '8,890 円',
      players: '1-4 人',
      hardware: 'PlayStation 4',
      developer: 'CAPCOM',
      thumbnail: 'https://gameusers.org/assets/img/game/643/thumbnail.jpg',
      link: '/gc/mh-world',
      linkArr: [
        {
          type: 'Official',
          name: null,
          url: 'http://www.capcom.co.jp/monsterhunter/world/'
        },
        {
          type: 'Twitter',
          name: null,
          url: 'https://twitter.com/mh_official_jp'
        }
      ],
      tagArr: [
        'モンハン',
        'ハンティング',
        'イヤンクック'
      ]
    },
    {
      name: 'どうぶつの森 ポケットキャンプ',
      followers: '2000 人',
      category: 'シミュレーション',
      releaseDate: '2017/11/22',
      price: '-',
      players: '1 人',
      hardware: 'Android, iOS',
      developer: '任天堂',
      thumbnail: 'https://gameusers.org/assets/img/game/647/thumbnail.jpg',
      link: '/gc/animal-crossing-pocket-camp',
      linkArr: [
        {
          type: 'Official',
          name: null,
          url: 'https://ac-pocketcamp.com/ja-JP/site'
        },
        {
          type: 'Twitter',
          name: null,
          url: 'https://twitter.com/pokemori_jp'
        }
      ],
      tagArr: [
        'ぶつ森'
      ]
    }
  ];
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreGcIndex(isServer) {
  
  if (isServer) {
    
    return new Store();
    
  } else {
    
    if (store === null) {
      store = new Store();
    }
    
    return store;
    
  }
  
}