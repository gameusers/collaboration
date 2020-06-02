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


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';


// --------------------------------------------------
//   Stores
// --------------------------------------------------

import initStoreLayout from 'app/common/layout/stores/layout.js';

let storeImageAndVideo = null;
const storeLayout = initStoreLayout({});






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
  // @observable imagesArr = [];
  
  // @observable imagesArr = [{
    
  //   src: 'https://dev-1.gameusers.org/img/recruitment/X9243NyQr/aaD-LQqCRT/800w.jpg',
  //   thumbnail: 'https://dev-1.gameusers.org/img/recruitment/X9243NyQr/aaD-LQqCRT/800w.jpg',
  //   caption: 'caption',
  //   width: 800,
  //   height: 'auto'
    
  // }];
  
  // @observable imagesArr = [{
    
  //   src: 'https://dev-1.gameusers.org/img/common/advertisement/300x250.jpg',
  //   thumbnail: 'https://dev-1.gameusers.org/img/common/advertisement/300x250.jpg',
  //   caption: 'caption',
  //   width: 300,
  //   height: 'auto'
    
  // }];
  
  
  
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
  handleLightboxOpen({ object = {}, pathArr = [] }) {
    
    
    // lodashSet(this.lightboxObj, [...pathArr, 'currentNo'], currentNo);
    // lodashSet(this.lightboxObj, [...pathArr, 'open'], true);
    
    storeLayout.hideNavForLightbox = true;
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/common/image-and-video/stores/image-and-video.js - handleLightboxOpen
    // `);
    
    // console.log(`
    //   ----- object -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(object)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- this.lightboxObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(this.lightboxObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
  };
  
  
  /**
   * Lightboxを閉じる
   * @param {Array} pathArr - データを保存する場所を配列で指定する
   */
  @action.bound
  handleLightboxClose({ object = {} }) {
    
    // console.log(chalk`
    //   handleLightboxClose
    //   storeLayout.hideNavForLightbox: {green ${storeLayout.hideNavForLightbox}}
    // `);
    
    // lodashSet(this.lightboxObj, [...pathArr, 'open'], false);
    
    storeLayout.hideNavForLightbox = false;
    
  };
  
  
  
  
  /**
   * Lightboxを開く
   * @param {Array} pathArr - データを保存する場所を配列で指定する
   */
  // @action.bound
  // handleLightboxOpen({  }) {
    
    
  //   // lodashSet(this.lightboxObj, [...pathArr, 'currentNo'], currentNo);
  //   // lodashSet(this.lightboxObj, [...pathArr, 'open'], true);
    
  //   storeLayout.hideNavForLightbox = true;
    
    
  //   this.imagesArr.push({
      
  //     src: 'https://dev-1.gameusers.org/img/recruitment/X9243NyQr/aaD-LQqCRT/800w.jpg',
  //     thumbnail: 'https://dev-1.gameusers.org/img/recruitment/X9243NyQr/aaD-LQqCRT/800w.jpg',
  //     caption: 'caption',
  //     width: 800,
  //     height: 'auto'
      
  //   });
    
  //   // this.imagesArr = [{
      
  //   //   src: 'https://dev-1.gameusers.org/img/recruitment/X9243NyQr/aaD-LQqCRT/800w.jpg',
  //   //   thumbnail: 'https://dev-1.gameusers.org/img/recruitment/X9243NyQr/aaD-LQqCRT/800w.jpg',
  //   //   caption: 'caption',
  //   //   width: 800,
  //   //   height: 'auto'
      
  //   // }];
    
  //   // openLightbox(0);
    
    
  //   // --------------------------------------------------
  //   //   console.log
  //   // --------------------------------------------------
    
  //   console.log(`
  //     ----------------------------------------\n
  //     /app/common/image-and-video/stores/image-and-video.js - handleLightboxOpen
  //   `);
    
  //   // console.log(`
  //   //   ----- object -----\n
  //   //   ${util.inspect(JSON.parse(JSON.stringify(object)), { colors: true, depth: null })}\n
  //   //   --------------------\n
  //   // `);
    
  //   console.log(`
  //     ----- this.imagesArr -----\n
  //     ${util.inspect(JSON.parse(JSON.stringify(this.imagesArr)), { colors: true, depth: null })}\n
  //     --------------------\n
  //   `);
    
  // };
  
  
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