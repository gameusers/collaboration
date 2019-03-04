// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

import chalk from 'chalk';
// import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import { action, observable } from 'mobx';
import shortid from 'shortid';
import keycode from 'keycode';
import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashHas from 'lodash/has';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

// import { fetchWrapper } from '../../../@modules/fetch';


// ---------------------------------------------
//   Format
// ---------------------------------------------

// import { errorsArrIntoErrorMessage } from '../../../../@format/error';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

// const { validationCardPlayersName } = require('../../../../@database/card-players/validations/name');
// const { validationCardPlayersStatus } = require('../../../../@database/card-players/validations/status');
// const { validationCardPlayersActivityTimeObjValueArr } = require('../../../../@database/card-players/validations/activity-time');
// const { validationCardPlayersLinkArr } = require('../../../../@database/card-players/validations/link');




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
  //   Data
  // ---------------------------------------------
  
  /**
   * フォームのデータを入れるオブジェクト
   * @type {Object}
   */
  @observable dataObj = {};
  
  
  /**
   * フォーム用のデータを変更する
   * @param {Array} pathArr - パス
   * @param {string} value - 値
   */
  @action.bound
  handleEdit({ pathArr, value }) {
    lodashSet(this.dataObj, pathArr, value);
  };
  
  
  
  
  // ---------------------------------------------
  //   Image Form
  // ---------------------------------------------
  
  /**
   * 画像を選択したときに呼び出される
   * @param {string} _id - ID
   * @param {Object} fileObj - ファイルオブジェクト
   */
  @action.bound
  handleSelectImage({ _id, fileObj }) {
    
    
    console.log(chalk`
      _id: {green ${_id}}
    `);
    
    console.log(`\n---------- fileObj ----------\n`);
    console.dir(fileObj);
    console.log(`\n-----------------------------------\n`);
    
    
    // ---------------------------------------------
    //   Config
    // ---------------------------------------------
    
    // アップロードする画像の最大サイズ、5MBまで
    const imageSizeUpperLimit = 5242880;
    
    
    // ---------------------------------------------
    //   Error
    // ---------------------------------------------
    
    if (!fileObj) {
      return;
    }
    
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
      storeLayout.handleSnackbarOpen('error', '最新のブラウザを利用してください。');
      return;
    }
    
    if (!fileObj.type.match(/^image\/(gif|jpeg|png|bmp|svg\+xml)$/)) {
      storeLayout.handleSnackbarOpen('error', 'アップロードできるのは JPEG, PNG, GIF, BMP, SVG の画像ファイルです。');
      return;
    }
    
    if (fileObj.size > imageSizeUpperLimit) {
      storeLayout.handleSnackbarOpen('error', '画像のサイズが大きすぎます。');
      return;
    }
    
    // return;
    
    
    // ---------------------------------------------
    //   画像のデータ取得
    // ---------------------------------------------
    
    const fileReader = new FileReader();
    
    fileReader.onload = () => {

      const img = new Image();
      img.src = fileReader.result;

      img.onload = () => {

        const { width, height } = img;
        
        let extension = null;

        if (fileObj.type === 'image/gif') {
          extension = 'gif';
        } else if (fileObj.type === 'image/jpeg') {
          extension = 'jpg';
        } else if (fileObj.type === 'image/png') {
          extension = 'png';
        } else if (fileObj.type === 'image/bmp') {
          extension = 'bmp';
        } else {
          extension = 'svg';
        }
        
        lodashSet(this.dataObj, [_id, 'imageObj', 'src'], fileReader.result);
        lodashSet(this.dataObj, [_id, 'imageObj', 'width'], width);
        lodashSet(this.dataObj, [_id, 'imageObj', 'height'], height);
        lodashSet(this.dataObj, [_id, 'imageObj', 'extension'], extension);
        // this.handleEdit([_id, 'imageObj', 'src'], fileReader.result);
        // this.handleEdit([_id, 'imageObj', 'width'], width);
        // this.handleEdit([_id, 'imageObj', 'height'], height);
        // this.handleEdit([_id, 'imageObj', 'extension'], extension);
        
        // this.imageSrcObj[id] = fileReader.result;
        // this.imageWidthObj[id] = width;
        // this.imageHeightObj[id] = height;
        // this.imageExtensionObj[id] = extension;
        
        // console.log(`\n---------- this.dataObj[_id] ----------\n`);
        // console.dir(this.dataObj[_id]);
        // console.log(`\n-----------------------------------\n`);
        
      };

    };

    fileReader.readAsDataURL(fileObj);
    
  };
  
  
  /**
   * 選択した画像を追加する
   * 追加すると画像のサムネイルがフォーム内に表示される（プレビューできる）
   * @param {string} _id - ID
   */
  @action.bound
  handleAddImage({ _id }) {
    
    
    // ---------------------------------------------
    //   Get Data
    // ---------------------------------------------
    
    const src = lodashGet(this.dataObj, [_id, 'imageObj', 'src'], '');
    const width = lodashGet(this.dataObj, [_id, 'imageObj', 'width'], '');
    const height = lodashGet(this.dataObj, [_id, 'imageObj', 'height'], '');
    // const extension = lodashGet(this.dataObj, [_id, 'imageObj', 'extension'], '');
    const caption = lodashGet(this.dataObj, [_id, 'imageCaption'], '');
    const imageVideoArr = lodashGet(this.dataObj, [_id, 'imageVideoArr'], []);
    
    
    // console.log(`\n---------- imageVideoArr ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(imageVideoArr)));
    // console.log(`\n-----------------------------------\n`);
    
    
    // ---------------------------------------------
    //   すでに同じ画像が追加されていないかチェックする
    // ---------------------------------------------
    
    let duplication = false;
    
    if (imageVideoArr.length > 0) {
      
      for (const valueObj of imageVideoArr.values()) {
        
        if (valueObj.type === 'image') {
          
          console.log(`value.type = ${valueObj.type}`);
          
          duplication = valueObj.srcSetArr.find((valueObj) => {
            return (valueObj.src === src);
          });
          
          if (duplication) {
            break;
          }
          
        }
        
      }
      
    }
    
    
    // ---------------------------------------------
    //   画像が選択されていない場合、処理停止
    // ---------------------------------------------
    
    if (src === '') {
      
      storeLayout.handleSnackbarOpen('error', '画像を選択してください。');
      return;
      
      
    // ---------------------------------------------
    //   同じ画像を追加しようとしている場合、処理停止
    // ---------------------------------------------  
    
    } else if (duplication) {
      
      storeLayout.handleSnackbarOpen('error', 'すでに同じ画像が追加されています。');
      return;
      
      
    // ---------------------------------------------
    //   srcset 用のデータを生成する
    // ---------------------------------------------
      
    } else {
      
      const srcSetArr = [];
      
      
      srcSetArr.push({
        _id: shortid.generate(),
        src,
        w: 'upload',
        width,
        height,
      });
      
      
      // ---------------------------------------------
      //   imageVideoArr に追加する
      // ---------------------------------------------
      
      imageVideoArr.push({
        _id: shortid.generate(),
        type: 'image',
        caption,
        srcSetArr,
      });
      
      
      // Preview 用のオブジェクトに追加する
      lodashSet(this.dataObj, [_id, 'imageVideoArr'], imageVideoArr);
      
      // Caption 入力フォームをリセット
      lodashSet(this.dataObj, [_id, 'imageCaption'], '');
      
      
    }
    
  };
  
  
  
  
  /**
   * 画像・動画のプレビュー画像を削除するときに呼び出される
   * @param {string} id - ID
   * @param {number} index - 削除するプレビュー画像のNo
   */
  @action.bound
  handleDeleteImageVideoArr({ _id, index }) {
    
    const imageVideoArr = lodashGet(this.dataObj, [_id, 'imageVideoArr'], []);
    imageVideoArr[_id].splice(index, 1);
    lodashSet(this.dataObj, [_id, 'imageVideoArr'], imageVideoArr);
    
  };
  
  
}




// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreFormImageVideo(argumentsObj, storeInstanceObj) {
  
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