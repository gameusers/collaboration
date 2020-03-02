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
  //   Form - Image
  // ---------------------------------------------
  
  /**
   * 画像を選択したときに呼び出される
   * @param {string} _id - ID
   * @param {Object} fileObj - ファイルオブジェクト
   */
  @action.bound
  handleSelectImage({ _id, fileObj, imagesAndVideosArr }) {
    
    
    // ---------------------------------------------
    //   Config
    // ---------------------------------------------
    
    // アップロードする画像の最大サイズ、5MBまで
    // const imageSizeUpperLimit = 5242880;
    // console.log(process.env.UPLOAD_IMAGE_SIZE_UPPER_LIMIT);
    
    
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
    
    if (!fileObj.type.match(/^image\/(gif|jpeg|png|svg\+xml)$/)) {
      storeLayout.handleSnackbarOpen('error', 'アップロードできるのは JPEG, PNG, GIF, SVG の画像ファイルです。');
      return;
    }
    
    if (fileObj.size > process.env.UPLOAD_IMAGE_SIZE_UPPER_LIMIT) {
      storeLayout.handleSnackbarOpen('error', '画像のサイズが大きすぎます。');
      return;
    }
    
    
    // ---------------------------------------------
    //   画像のデータ取得
    // ---------------------------------------------
    
    const fileReader = new FileReader();
    
    fileReader.onload = () => {

      const img = new Image();
      img.src = fileReader.result;

      img.onload = () => {

        const { width, height } = img;
        
        lodashSet(this.dataObj, [_id, 'imageObj', 'src'], fileReader.result);
        lodashSet(this.dataObj, [_id, 'imageObj', 'width'], width);
        lodashSet(this.dataObj, [_id, 'imageObj', 'height'], height);
        
        
        // this.handleAddImage({ _id, imagesAndVideosArr });
        
      };
      
    };

    fileReader.readAsDataURL(fileObj);
    
  };
  
  
  /**
   * 選択した画像を追加する
   * 追加すると画像のサムネイルがフォーム内に表示される（プレビューできる）
   * @param {string} _id - ID
   * @param {Array} imagesAndVideosArr - 画像と動画の情報が入った配列
   * @param {number} limit - 画像を追加できる上限
   */
  @action.bound
  handleAddImage({ _id, imagesAndVideosArr, limit }) {
    
    // console.log(chalk`
    //   limit: {green ${limit}}
    // `);
    // ---------------------------------------------
    //   Get Data
    // ---------------------------------------------
    
    const src = lodashGet(this.dataObj, [_id, 'imageObj', 'src'], '');
    const width = lodashGet(this.dataObj, [_id, 'imageObj', 'width'], '');
    const height = lodashGet(this.dataObj, [_id, 'imageObj', 'height'], '');
    const caption = lodashGet(this.dataObj, [_id, 'imageCaption'], '');
    
    
    // ---------------------------------------------
    //   すでに同じ画像が追加されていないかチェックする
    // ---------------------------------------------
    
    let duplication = false;
    
    if (imagesAndVideosArr.length > 0) {
      
      for (const valueObj of imagesAndVideosArr.values()) {
        
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
      //   imagesAndVideosArr に追加する
      // ---------------------------------------------
      
      if (limit === 1) {
        
        imagesAndVideosArr.splice(0, 1);
        
        imagesAndVideosArr.push({
          _id: shortid.generate(),
          type: 'image',
          caption,
          srcSetArr,
        });
        
      } else if (limit > imagesAndVideosArr.length) {
        
        imagesAndVideosArr.push({
          _id: shortid.generate(),
          type: 'image',
          caption,
          srcSetArr,
        });
        
      } else {
        
        storeLayout.handleSnackbarOpen('error', `アップロードできる画像は${limit}枚までです`);
        return;
        
      }
      
      
      
      
      // ---------------------------------------------
      //   Caption 入力フォームをリセット
      // ---------------------------------------------
      
      lodashSet(this.dataObj, [_id, 'imageCaption'], '');
      
      
    }
    
  };
  
  
  /**
   * 画像を削除する
   * @param {string} id - ID
   * @param {number} index - 削除する画像番号
   * @param {Array} imagesAndVideosArr - 画像と動画の情報が入った配列
   */
  @action.bound
  handleRemoveImage({ _id, index, imagesAndVideosArr }) {
    imagesAndVideosArr.splice(index, 1);
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