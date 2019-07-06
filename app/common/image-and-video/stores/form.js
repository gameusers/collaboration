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
import shortid from 'shortid';
import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashCloneDeep from 'lodash/cloneDeep';


// --------------------------------------------------
//   Stores
// --------------------------------------------------

import initStoreLayout from '../../../common/layout/stores/layout';




// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeImageAndVideoForm = null;
let storeLayout = initStoreLayout({});;




// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
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
  //   Get
  // ---------------------------------------------
  
  /**
   * imagesAndVideosObjを取得する
   * @param {string} _id - ID
   */
  @action.bound
  handleGetImagesAndVideosObj({ _id }) {
    const imagesAndVideosObj = lodashGet(this.dataObj, [_id, 'imagesAndVideosObj'], {});
    
    console.log(chalk`
      \n---------- handleGetImagesAndVideosObj ----------\n
      _id: {green ${_id}}
    `);
    
    console.log(`
      ----- imagesAndVideosObj -----\n
      ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosObj)), { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    return imagesAndVideosObj;
  };
  
  
  
  
  // ---------------------------------------------
  //   Form Show
  // ---------------------------------------------
  
  /**
   * 画像投稿フォームを表示する
   * @param {string} _id - ID
   */
  @action.bound
  handleFormImageShow({ _id }) {
    
    const formImageShow = lodashGet(this.dataObj, [_id, 'formImageShow'], false);
    
    lodashSet(this.dataObj, [_id, 'formImageShow'], !formImageShow);
    lodashSet(this.dataObj, [_id, 'formVideoShow'], false);
    
  };
  
  
  /**
   * 動画投稿フォームを表示する
   * @param {string} _id - ID
   */
  @action.bound
  handleFormVideoShow({ _id }) {
    
    const formVideoShow = lodashGet(this.dataObj, [_id, 'formVideoShow'], false);
    
    lodashSet(this.dataObj, [_id, 'formVideoShow'], !formVideoShow);
    lodashSet(this.dataObj, [_id, 'formImageShow'], false);
    
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
    //   Error
    // ---------------------------------------------
    
    if (!fileObj) {
      return;
    }
    
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        messageID: 'aSErb-9vc',
      });
      return;
    }
    
    if (!fileObj.type.match(/^image\/(gif|jpeg|png|svg\+xml)$/)) {
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        messageID: 'sdHI6gvbB',
      });
      return;
    }
    
    if (fileObj.size > process.env.UPLOAD_IMAGE_SIZE_UPPER_LIMIT) {
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        messageID: 'ihxQ34x1L',
      });
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
        
      };
      
    };

    fileReader.readAsDataURL(fileObj);
    
  };
  
  
  /**
   * 選択した画像を追加する
   * 追加すると画像のサムネイルがフォーム内に表示される（プレビューできる）
   * @param {string} _id - ID
   * @param {string} arrayName - 操作する配列名
   * @param {number} limit - 画像を追加できる上限
   */
  @action.bound
  handleAddImage({ _id, arrayName, limit }) {
    
    
    // ---------------------------------------------
    //   Get Data
    // ---------------------------------------------
    
    const imagesAndVideosArr = lodashGet(this.dataObj, [_id, 'imagesAndVideosObj', arrayName], []);
    let clonedArr = lodashCloneDeep(imagesAndVideosArr);
    
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
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        messageID: 'kcnBnLcoV',
      });
      
      return;
      
      
    // ---------------------------------------------
    //   同じ画像を追加しようとしている場合、処理停止
    // ---------------------------------------------  
    
    } else if (duplication) {
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        messageID: 'cPw2kZIqY',
      });
      
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
        
        clonedArr.splice(0, 1);
        
        clonedArr.push({
          _id: shortid.generate(),
          type: 'image',
          localesArr: [
            {
              _id: shortid.generate(),
              language: 'ja',
              caption,
            }
          ],
          srcSetArr,
        });
        
      } else if (limit > clonedArr.length) {
        
        clonedArr.push({
          _id: shortid.generate(),
          type: 'image',
          localesArr: [
            {
              _id: shortid.generate(),
              language: 'ja',
              caption,
            }
          ],
          srcSetArr,
        });
        
      } else {
        
        storeLayout.handleSnackbarOpen({
          variant: 'error',
          messageID: 'MansOH_XH',
        });
        
        return;
        
      }
      
      
      // ---------------------------------------------
      //   更新
      // ---------------------------------------------
      
      lodashSet(this.dataObj, [_id, 'imagesAndVideosObj', arrayName], clonedArr);
      
      
      // ---------------------------------------------
      //   Caption 入力フォームをリセット
      // ---------------------------------------------
      
      lodashSet(this.dataObj, [_id, 'imageCaption'], '');
      
      
    }
    
  };
  
  
  
  
  /**
   * 入力した動画を追加する
   * 追加すると動画のサムネイルがフォーム内に表示される（プレビューできる）
   * @param {string} _id - ID
   * @param {string} arrayName - 操作する配列名
   * @param {number} limit - 動画を追加できる上限
   */
  @action.bound
  handleAddVideo({ _id, arrayName, limit }) {
    
    
    // ---------------------------------------------
    //   Get Data
    // ---------------------------------------------
    
    const imagesAndVideosArr = lodashGet(this.dataObj, [_id, 'imagesAndVideosObj', arrayName], []);
    let clonedArr = lodashCloneDeep(imagesAndVideosArr);
    
    const videoChannel = lodashGet(this.dataObj, [_id, 'videoChannel'], 'youtube');
    const videoURL = lodashGet(this.dataObj, [_id, 'videoURL'], '');
    
    
    // ---------------------------------------------
    //   videoID取得
    //   正規表現参考：https://stackoverflow.com/questions/2936467/parse-youtube-video-id-using-preg-match
    // ---------------------------------------------
    
    const regex = new RegExp('(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})', 'i');
    const resultMatchObj = videoURL.match(regex);
    const videoID = lodashGet(resultMatchObj, [1], '');
    
    
    // ---------------------------------------------
    //   videoIDが存在しない場合、処理停止
    // ---------------------------------------------
    
    if (videoURL === '') {
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        messageID: 'kcnBnLcoV',
      });
      
      return;
      
    }
    
    
    // console.log(`\n---------- resultMatchObj ----------\n`);
    // console.dir(resultMatchObj);
    // console.log(`\n-----------------------------------\n`);
    
    // console.log(`\n---------- imagesAndVideosArr ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(imagesAndVideosArr)));
    // console.log(`\n-----------------------------------\n`);
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    //   arrayName: {green ${arrayName}}
    //   limit: {green ${limit}}
    //   videoChannel: {green ${videoChannel}}
    //   videoURL: {green ${videoURL}}
    //   videoID: {green ${videoID}}
    // `);
    
    
    // ---------------------------------------------
    //   同じ動画を追加しようとしている場合、処理停止
    // ---------------------------------------------  
    
    const resultObj = imagesAndVideosArr.find((valueObj) => {
      return valueObj.videoID === videoID;
    });
    
    if (resultObj) {
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        messageID: 'Qd5d74x-3',
      });
      
      return;
      
    }
    
    
    // console.log(`\n---------- resultObj ----------\n`);
    // console.dir(resultObj);
    // console.log(`\n-----------------------------------\n`);
    
    
    // ---------------------------------------------
    //   imagesAndVideosArr に追加する
    // ---------------------------------------------
    
    if (limit === 1) {
      
      clonedArr.splice(0, 1);
      
      clonedArr.push({
        _id: shortid.generate(),
        type: 'video',
        videoChannel,
        videoID,
      });
      
    } else if (limit > clonedArr.length) {
      
      clonedArr.push({
        _id: shortid.generate(),
        type: 'video',
        videoChannel,
        videoID,
      });
      
    } else {
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        messageID: 'fWrKN58iV',
      });
      
      return;
      
    }
    
    
    // ---------------------------------------------
    //   更新
    // ---------------------------------------------
    
    lodashSet(this.dataObj, [_id, 'imagesAndVideosObj', arrayName], clonedArr);
    
    
    // ---------------------------------------------
    //   入力フォームをリセット
    // ---------------------------------------------
    
    lodashSet(this.dataObj, [_id, 'videoChannel'], 'youtube');
    lodashSet(this.dataObj, [_id, 'videoURL'], '');
    
    
    // console.log(`\n---------- clonedArr ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(clonedArr)));
    // console.log(`\n-----------------------------------\n`);
    
  };
  
  
  
  
  /**
   * プレビューを削除する
   * @param {string} id - ID
   * @param {string} arrayName - 操作する配列名
   * @param {number} index - 削除するプレビュー番号
   */
  @action.bound
  handleRemovePreview({ _id, arrayName, index }) {
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    //   index: {green ${index}}
    // `);
    
    // ---------------------------------------------
    //   データ取得＆クローン
    // ---------------------------------------------
    
    const imagesAndVideosArr = lodashGet(this.dataObj, [_id, 'imagesAndVideosObj', arrayName], []);
    let clonedArr = lodashCloneDeep(imagesAndVideosArr);
    
    
    // console.log(`
    //   ----- clonedArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(clonedArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // ---------------------------------------------
    //   削除
    // ---------------------------------------------
    
    clonedArr.splice(index, 1);
    
    
    // ---------------------------------------------
    //   更新
    // ---------------------------------------------
    
    lodashSet(this.dataObj, [_id, 'imagesAndVideosObj', arrayName], clonedArr);
    
    // console.log(`
    //   ----- clonedArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(clonedArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
  };
  
  
}




// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreImageAndVideoForm({}) {
  
  if (storeImageAndVideoForm === null) {
    storeImageAndVideoForm = new Store();
  }
  
  return storeImageAndVideoForm;
  
}