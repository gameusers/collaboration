// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import { action, observable } from 'mobx';

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';


// --------------------------------------------------
//   Stores
// --------------------------------------------------

import initStoreLayout from '../../../common/layout/stores/layout';

let storeImageAndVideo = null;
let storeLayout = initStoreLayout({});




// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
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
   * @param {Array} pathArr - データを保存する場所を配列で指定する
   */
  @action.bound
  handleLightboxOpen({ pathArr = [] }) {
    
    // console.log(chalk`
    //   handleLightboxOpen
    //   storeLayout.hideNavForLightbox: {green ${storeLayout.hideNavForLightbox}}
    // `);
    
    
    // lodashSet(this.lightboxObj, [...pathArr, 'currentNo'], currentNo);
    lodashSet(this.lightboxObj, [...pathArr, 'open'], true);
    
    storeLayout.hideNavForLightbox = true;
    
    // openLightbox(0);
    
  };
  
  
  /**
   * Lightboxを閉じる
   * @param {Array} pathArr - データを保存する場所を配列で指定する
   */
  @action.bound
  handleLightboxClose({ pathArr = [] }) {
    
    // console.log(chalk`
    //   handleLightboxClose
    //   storeLayout.hideNavForLightbox: {green ${storeLayout.hideNavForLightbox}}
    // `);
    
    lodashSet(this.lightboxObj, [...pathArr, 'open'], false);
    
    storeLayout.hideNavForLightbox = false;
    
  };
  
  
  /**
   * 前の画像を表示する
   * @param {Array} pathArr - データを保存する場所を配列で指定する
   */
  // @action.bound
  // handleLightboxPrevious({ pathArr = [] }) {
  //   const currentNo = lodashGet(this.lightboxObj, [...pathArr, 'currentNo'], 0);
  //   lodashSet(this.lightboxObj, [...pathArr, 'currentNo'], currentNo - 1);
  // };
  
  
  /**
   * 次の画像を表示する
   * @param {Array} pathArr - データを保存する場所を配列で指定する
   */
  // @action.bound
  // handleLightboxNext({ pathArr = [] }) {
  //   const currentNo = lodashGet(this.lightboxObj, [...pathArr, 'currentNo'], 0);
  //   lodashSet(this.lightboxObj, [...pathArr, 'currentNo'], currentNo + 1);
  // };
  
  
  
  
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

export default function initStoreImageAndVideo({}) {
  
  
  // --------------------------------------------------
  //   Store
  // --------------------------------------------------
  
  if (storeImageAndVideo === null) {
    storeImageAndVideo = new Store();
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storeImageAndVideo;
  
  
}