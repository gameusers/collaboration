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

let store = null;
let storeLayout = null;
let storeData = null;




// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  // ---------------------------------------------
  //   Constructor
  // ---------------------------------------------
  
  constructor() {}
  
  
  
  
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
  
  /**
   * ビデオのチャンネル
   * @type {string}
   */
  @observable modalVideoChannel = '';
  
  
  /**
   * ビデオのID
   * @type {string}
   */
  @observable modalVideoID = '';
  
  
  /**
   * モーダルを開く場合 true / 閉じる場合 false
   * @type {boolean}
   */
  @observable modalVideoOpen = false;
  
  
  /**
   * モーダルを開く
   * @param {string} videoChannel - ビデオのチャンネル
   * @param {string} videoChannel - ビデオのID
   */
  @action.bound
  handleModalVideoOpen({ videoChannel, videoID }) {
    this.modalVideoChannel = videoChannel;
    this.modalVideoID = videoID;
    this.modalVideoOpen = true;
  };
  
  
  /**
   * モーダルを閉じる
   */
  @action.bound
  handleModalVideoClose() {
    this.modalVideoOpen = false;
  };
  
  
}




// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreImageAndVideo(argumentsObj, storeInstanceObj) {
  
  const isServer = argumentsObj.isServer;
  
  
  if ('layout' in storeInstanceObj) {
    storeLayout = storeInstanceObj.layout;
  }
  
  if ('data' in storeInstanceObj) {
    storeData = storeInstanceObj.data;
  }
  
  
  if (isServer) {
    
    return new Store();
    
  } else {
    
    if (store === null) {
      store = new Store();
    }
    
    return store;
    
  }
  
}