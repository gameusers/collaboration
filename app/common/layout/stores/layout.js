// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

import chalk from 'chalk';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import { action, observable } from 'mobx';
import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeLayout = null;


// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  // ---------------------------------------------
  //   Current Contents Id
  // ---------------------------------------------
  
  @observable currentContentsId = '';
  
  
  
  // ---------------------------------------------
  //   アクセスしたページ
  // ---------------------------------------------
  
  // historyStateArr = [];
  
  historyStateArr = [
    {
      path: 'uc/az1979',
      param1: 'uc',
      param2: 'az1979',
      param3: 'test',
      param4: '',
      param5: '',
      file: 'uc/community.js',
      id: 'p0V_RsaT1l8',
      dateTime: '2017-07-24T20:45:20'
    }
  ]
  
  insertHistoryState(obj) {
    
    // console.dir(obj);
    
    this.historyStateArr.unshift(obj);
    
    // 履歴を保存する数を指定する
    this.historyStateArr.splice(30, 1);
    
    console.log(`insertHistoryState`);
    console.dir(this.historyStateArr);
    
  };
  
  
  
  
  
  
  
  
  // ---------------------------------------------
  //   ヘッダー - ナビゲーション / メイン
  // ---------------------------------------------
  
  headerNavMainObj = {
    
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
  
  @observable headerNotificationDialogOpen = false;
  
  
  @action.bound
  handleHeaderNotificationDialogOpen() {
    this.headerNotificationDialogOpen = true;
  };
  
  @action.bound
  handleHeaderNotificationDialogClose() {
    this.headerNotificationDialogOpen = false;
  };
  
  
  // ---------------------------------------------
  //   ヘッダー - ログインメニュー
  // ---------------------------------------------
  
  @observable headerLoginMenuAnchorEl = null;
  @observable headerLoginMenuOpen = false;
  
  
  @action.bound
  handleHeaderLoginMenuOpen(event) {
    this.headerLoginMenuAnchorEl = event.currentTarget;
    this.headerLoginMenuOpen = true;
  };
  
  @action.bound
  handleHeaderLoginMenuClose() {
    this.headerLoginMenuAnchorEl = null;
    this.headerLoginMenuOpen = false;
  };
  
  
  // ---------------------------------------------
  //   ヘッダー - データ
  // ---------------------------------------------
  
  @observable headerDataBoxOpen = false;
  
  @action.bound
  handleHeaderDataBoxOpen() {
    this.headerDataBoxOpen = true;
  };
  
  @action.bound
  handleHeaderDataBoxClose() {
    this.headerDataBoxOpen = false;
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
  
  
  
  // ----------------------------------------
  //   Header - Navigation Sub
  // ----------------------------------------
  
  @observable headerNavSubDialogOpenObj = {};
  
  @action.bound
  handleHeaderNavSubDialogOpen(id) {
    this.headerNavSubDialogOpenObj[id] = true;
  };
  
  @action.bound
  handleHeaderNavSubDialogClose(id) {
    this.headerNavSubDialogOpenObj[id] = false;
  };
  
  
  
  
  // ---------------------------------------------
  //   Lightbox - 画像表示
  // ---------------------------------------------
  
  /**
   * Lightboxのデータを入れるオブジェクト
   * @type {Object}
   */
  @observable lightboxObj = {};
  
  
  /**
   * Lightboxを開く
   * @param {string} _id - ID
   * @param {number} currentNo - 表示する画像番号
   */
  @action.bound
  handleLightboxOpen({ _id, currentNo }) {
    lodashSet(this.lightboxObj, [_id, 'currentNo'], currentNo);
    lodashSet(this.lightboxObj, [_id, 'open'], true);
  };
  
  
  /**
   * Lightboxを閉じる
   * @param {string} _id - ID
   */
  @action.bound
  handleLightboxClose({ _id }) {
    lodashSet(this.lightboxObj, [_id, 'open'], false);
  };
  
  
  /**
   * 前の画像を表示する
   * @param {string} _id - ID
   */
  @action.bound
  handleLightboxPrevious({ _id }) {
    const currentNo = lodashGet(this.lightboxObj, [_id, 'currentNo'], 0);
    lodashSet(this.lightboxObj, [_id, 'currentNo'], currentNo - 1);
  };
  
  
  /**
   * 次の画像を表示する
   * @param {string} _id - ID
   */
  @action.bound
  handleLightboxNext({ _id }) {
    const currentNo = lodashGet(this.lightboxObj, [_id, 'currentNo'], 0);
    lodashSet(this.lightboxObj, [_id, 'currentNo'], currentNo + 1);
  };
  
  
  
  
  // ---------------------------------------------
  //   Modal - 動画表示
  //   https://github.com/appleple/react-modal-video
  // ---------------------------------------------
  
  @observable modalVideoChannel = null;
  @observable modalVideoId = null;
  @observable modalVideoOpen = false;
  
  @action.bound
  handleModalVideoOpen(videoChannel, videoId) {
    this.modalVideoChannel = videoChannel;
    this.modalVideoId = videoId;
    this.modalVideoOpen = true;
  };
  
  @action.bound
  handleModalVideoClose() {
    this.modalVideoOpen = false;
  };
  
  
  
  
  
  // ---------------------------------------------
  //   Snackbar （通知用のバー）
  // ---------------------------------------------
  
  @observable snackbarOpen = false;
  @observable snackbarVertical = 'bottom';
  @observable snackbarHorizontal = 'left';
  @observable snackbarAutoHideDuration= 5000;
  @observable snackbarVariant = '';
  @observable snackbarMessage = '';
  @observable snackbarKey = 'snackbarKey';
  
  snackbarQueueArr = [];
  
  
  @action.bound
  handleSnackbarOpen(variant, message) {
    
    this.snackbarQueueArr.push({
      variant,
      message,
      key: new Date().getTime(),
    });
    
    if (this.snackbarOpen) {
      // immediately begin dismissing current message
      // to start showing new one
      this.snackbarOpen = false;
    } else {
      // console.log('layout/stores/scommon - handleSnackbarOpen');
      this.processQueue();
    }
    
    // this.snackbarOpen = true;
  };
  
  processQueue = () => {
    
    if (this.snackbarQueueArr.length > 0) {
      // console.log('layout/stores/scommon - processQueue');
      // console.log(`layout/stores/scommon - snackbarMessage = ${this.snackbarMessage}`);
      const tempArr = this.snackbarQueueArr.shift();
      this.snackbarVariant = tempArr.variant;
      this.snackbarMessage = tempArr.message;
      this.snackbarKey = tempArr.key;
      
      this.snackbarOpen = true;
    }
    
  };
  
  @action.bound
  handleSnackbarClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    
    this.snackbarOpen = false;
  };
  
  @action.bound
  handleSnackbarExited() {
    this.processQueue();
  };
  
  
  
  
  
  
  // ---------------------------------------------
  //   Panel
  // ---------------------------------------------
  
  @observable panelExpandedObj = {};
  
  
  @action.bound
  handlePanelExpanded(id) {
    // console.log(`handlePanelExpanded`);
    // console.dir(this.panelExpandedObj);
    
    // console.log(`id = ${id}`);
    // console.log(`this.historyStateArr[0].id = ${this.historyStateArr[0].id}`);
    
    if (id in this.panelExpandedObj) {
      this.panelExpandedObj[id] = !this.panelExpandedObj[id];
    } else {
      this.panelExpandedObj[id] = false;
    }
    
  };
  
  returnPanelExpanded(id) {
    // console.dir(this.panelExpandedObj);
    return this.panelExpandedObj[id];
  }
  
  insertPanelExpanded(dataObj) {
    this.panelExpandedObj = Object.assign({}, dataObj, this.panelExpandedObj);
  };
  
  
  
  // ---------------------------------------------
  //   On Load
  // ---------------------------------------------
  
  /**
   * ページの読み込み判定
   * @type {boolean}
   */
  @observable onload = false;
  
  /**
   * ページの読み込み判定を更新する
   * @param {boolean} value - 読み込み済み true / 読み込み前 false
   */
  handleOnload(value) {
    this.onload = value;
  };
  
  
  
  // ---------------------------------------------
  //   Button Disable
  // ---------------------------------------------
  
  /**
   * ボタンの利用禁止判定
   * @type {boolean}
   */
  @observable buttonDisabledObj = {};
  
  /**
   * ボタンの利用禁止判定を更新する
   * @param {string} _id - ID
   * @param {boolean} value - 利用禁止 true / 利用可能 false
   */
  handleButtonDisabledObj(_id, value) {
    this.buttonDisabledObj[_id] = value;
  };
  // handleButtonDisabledObj(_id) {
  //   if (_id in this.buttonDisabledObj) {
  //     this.buttonDisabledObj[_id] = !this.buttonDisabledObj[_id];
  //   } else {
  //     this.buttonDisabledObj[_id] = false;
  //   }
  // };
  
  
  
  
  
  
  // ---------------------------------------------
  //   Terms of Service（利用規約）
  // ---------------------------------------------
  
  /**
   * 利用規約のダイアログを表示するかどうか
   * 表示する true / 表示しない false
   * @type {boolean}
   */
  @observable termsOfServiceDialogOpen = false;
  
  
  /**
   * 利用規約のダイアログを表示する
   */
  @action.bound
  handleTermsOfServiceDialogOpen() {
    this.termsOfServiceDialogOpen = true;
  };
  
  /**
   * 利用規約のダイアログを非表示にする
   */
  @action.bound
  handleTermsOfServiceDialogClose() {
    this.termsOfServiceDialogOpen = false;
  };
  
  
  
  
  
  // ---------------------------------------------
  //   ID生成
  // ---------------------------------------------
  
  // 参考：https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  // createUuidV4() {
  //   return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
  //     (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  //   );
  // }
  
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreLayout(argumentsObj) {
  
  const isServer = argumentsObj.isServer;
  
  
  if (isServer) {
    
    return new Store();
    
  } else {
    
    if (storeLayout === null) {
      storeLayout = new Store();
    }
    
    return storeLayout;
    
  }
  
}