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
// import shortid from 'shortid';
import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashHas from 'lodash/has';
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
  //   Getter & Setter
  // ---------------------------------------------
  
  /**
   * imagesAndVideosObjを取得する
   * @param {Array} pathArr - データを取得する場所を配列で指定する
   */
  @action.bound
  handleGetImagesAndVideosObj({ pathArr }) {
    return lodashGet(this.dataObj, [...pathArr, 'imagesAndVideosObj'], {});;
  };
  
  
  /**
   * imagesAndVideosObjを置き換える
   * @param {Array} pathArr - データを保存する場所を配列で指定する
   * @param {Object} imagesAndVideosObj - 保存するデータ
   */
  @action.bound
  handleSetImagesAndVideosObj({ pathArr, imagesAndVideosObj }) {
    lodashSet(this.dataObj, [...pathArr, 'imagesAndVideosObj'], imagesAndVideosObj);
  };
  
  
  
  
  // ---------------------------------------------
  //   Reset
  // ---------------------------------------------
  
  /**
   * フォームをリセットする
   * @param {Array} pathArr - データを保存する場所を配列で指定する
   */
  @action.bound
  handleResetForm({ pathArr }) {
    
    lodashSet(this.dataObj, [...pathArr, 'showFormImage'], false);
    lodashSet(this.dataObj, [...pathArr, 'showFormVideo'], false);
    
    lodashSet(this.dataObj, [...pathArr, 'imageObj'], {});
    
    lodashSet(this.dataObj, [...pathArr, 'imagesAndVideosObj'], {});
    
    lodashSet(this.dataObj, [...pathArr, 'imageCaption'], '');
    
    lodashSet(this.dataObj, [...pathArr, 'videoChannel'], 'youtube');
    lodashSet(this.dataObj, [...pathArr, 'videoURL'], '');
    
  };
  
  
  
  
  // ---------------------------------------------
  //   Form Show
  // ---------------------------------------------
  
  /**
   * 画像投稿フォームを表示する
   * @param {Array} pathArr - path
   */
  @action.bound
  handleShowFormImage({ pathArr }) {
    
    const showFormImage = lodashGet(this.dataObj, [...pathArr, 'showFormImage'], false);
    
    lodashSet(this.dataObj, [...pathArr, 'showFormImage'], !showFormImage);
    lodashSet(this.dataObj, [...pathArr, 'showFormVideo'], false);
    
  };
  
  
  /**
   * 動画投稿フォームを表示する
   * @param {Array} pathArr - path
   */
  @action.bound
  handleShowFormVideo({ pathArr }) {
    
    const showFormVideo = lodashGet(this.dataObj, [...pathArr, 'showFormVideo'], false);
    
    lodashSet(this.dataObj, [...pathArr, 'showFormVideo'], !showFormVideo);
    lodashSet(this.dataObj, [...pathArr, 'showFormImage'], false);
    
  };
  
  
  
  
  // ---------------------------------------------
  //   Form - Image
  // ---------------------------------------------
  
  /**
   * 画像を選択したときに呼び出される
   * @param {Array} pathArr - データを保存する場所を配列で指定する
   * @param {Object} fileObj - ファイルオブジェクト
   */
  @action.bound
  handleSelectImage({ pathArr, fileObj }) {
    
    
    // ---------------------------------------------
    //   Error
    // ---------------------------------------------
    
    if (!fileObj) {
      return;
    }
    
    // FileReaderに対応しているかチェック
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        messageID: 'aSErb-9vc',
      });
      
      return;
      
    }
    
    // アップロードできる画像の種類かチェック
    if (!fileObj.type.match(/^image\/(gif|jpeg|png|svg\+xml)$/)) {
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        messageID: 'sdHI6gvbB',
      });
      
      return;
      
    }
    
    // ファイルサイズが設定より大きすぎないかチェック
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
        
        lodashSet(this.dataObj, [...pathArr, 'imageObj', 'src'], fileReader.result);
        lodashSet(this.dataObj, [...pathArr, 'imageObj', 'width'], width);
        lodashSet(this.dataObj, [...pathArr, 'imageObj', 'height'], height);
        
      };
      
    };

    fileReader.readAsDataURL(fileObj);
    
  };
  
  
  /**
   * 選択した画像を追加する
   * 追加すると画像のサムネイルがフォーム内に表示される（プレビューできる）
   * @param {Array} pathArr - データを保存する場所を配列で指定する
   * @param {string} type - imagesAndVideosObjのtype
   * @param {number} limit - 画像を追加できる上限
   */
  @action.bound
  handleAddImage({ pathArr, type, limit }) {
    
    
    // ---------------------------------------------
    //   Get Data
    // ---------------------------------------------
    
    let imagesAndVideosObj = lodashGet(this.dataObj, [...pathArr, 'imagesAndVideosObj'], {});
    
    
    // --------------------------------------------------
    //   imagesAndVideosObj がない場合は新たに作成
    // --------------------------------------------------
    
    if (Object.keys(imagesAndVideosObj).length === 0) {
      
      imagesAndVideosObj = {
        _id: '',
        createdDate: '',
        updatedDate: '',
        users_id: '',
        type: type,
        arr: [],
      };
      
    }
    
    const arr = lodashGet(imagesAndVideosObj, ['arr'], []);
    
    const clonedArr = lodashCloneDeep(arr);
    
    const src = lodashGet(this.dataObj, [...pathArr, 'imageObj', 'src'], '');
    const width = lodashGet(this.dataObj, [...pathArr, 'imageObj', 'width'], '');
    const height = lodashGet(this.dataObj, [...pathArr, 'imageObj', 'height'], '');
    const caption = lodashGet(this.dataObj, [...pathArr, 'imageCaption'], '');
    
    
    // console.log(`\n---------- pathArr ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(pathArr)));
    // console.log(`\n-----------------------------------\n`);
    
    // console.log(`\n---------- imagesAndVideosObj ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(imagesAndVideosObj)));
    // console.log(`\n-----------------------------------\n`);
    
    // console.log(`\n---------- arr ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(arr)));
    // console.log(`\n-----------------------------------\n`);
    
    
    
    
    // ---------------------------------------------
    //   画像が選択されていない場合、処理停止
    // ---------------------------------------------
    
    if (src === '') {
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        messageID: 'kcnBnLcoV',
      });
      
      return;
      
    }
    
    
    // ---------------------------------------------
    //   同じ画像を追加しようとしている場合、処理停止
    // ---------------------------------------------
    
    let duplication = false;
    
    if (arr.length > 0) {
      
      for (const valueObj of arr.values()) {
        
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
    
    if (duplication) {
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        messageID: 'cPw2kZIqY',
      });
      
      return;
      
    }
    
    
    // ---------------------------------------------
    //   limit が 1 のときは既存の要素を削除する
    // ---------------------------------------------
    
    if (limit === 1) {
      
      clonedArr.splice(0, 1);
      
      
    // ---------------------------------------------
    //   画像＆動画が limit より多くなっている場合は処理停止
    // ---------------------------------------------
      
    } else if (limit <= clonedArr.length) {
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        messageID: 'MansOH_XH',
      });
      
      return;
      
    }
    
    
    
    
    // ---------------------------------------------
    //   srcSetArr データを生成する
    // ---------------------------------------------
    
    const srcSetArr = [{
      _id: '',
      w: '320w',
      width,
      height,
      src,
    }];
    
    
    // ---------------------------------------------
    //   imagesAndVideosArr に追加する
    // ---------------------------------------------
    
    const tempObj = {
      _id: '',
      type: 'image',
      srcSetArr,
    };
    
    if (caption) {
      
      tempObj.localesArr = [
        {
          _id: '',
          language: 'ja',
          caption,
        }
      ];
      
    }
    
    clonedArr.push(tempObj);
    
    imagesAndVideosObj.arr = clonedArr;
    
    
    // console.log(`\n---------- clonedArr ----------\n`);
    // console.dir(clonedArr);
    // console.log(`\n-----------------------------------\n`);
    
    
    // ---------------------------------------------
    //   更新
    // ---------------------------------------------
    
    lodashSet(this.dataObj, [...pathArr, 'imagesAndVideosObj'], imagesAndVideosObj);
    
    
    // ---------------------------------------------
    //   入力フォームをリセット
    // ---------------------------------------------
    
    // this.handleResetForm({ pathArr });
    lodashSet(this.dataObj, [...pathArr, 'imageCaption'], '');
    
    
    // console.log(`\n---------- this.dataObj ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(this.dataObj)));
    // console.log(`\n-----------------------------------\n`);
    
    
  };
  
  
  
  
  /**
   * 入力した動画を追加する
   * 追加すると動画のサムネイルがフォーム内に表示される（プレビューできる）
   * @param {Array} pathArr - データを保存する場所を配列で指定する
   * @param {number} limit - 動画を追加できる上限
   */
  @action.bound
  handleAddVideo({ pathArr, type, limit }) {
    
    
    // ---------------------------------------------
    //   Get Data
    // ---------------------------------------------
    
    let imagesAndVideosObj = lodashGet(this.dataObj, [...pathArr, 'imagesAndVideosObj'], {});
    
    
    // --------------------------------------------------
    //   imagesAndVideosObj がない場合は新たに作成
    // --------------------------------------------------
    
    if (Object.keys(imagesAndVideosObj).length === 0) {
      
      imagesAndVideosObj = {
        _id: '',
        createdDate: '',
        updatedDate: '',
        users_id: '',
        type,
        arr: [],
      };
      
    }
    
    const arr = lodashGet(imagesAndVideosObj, ['arr'], []);
    const clonedArr = lodashCloneDeep(arr);
    
    const videoChannel = lodashGet(this.dataObj, [...pathArr, 'videoChannel'], 'youtube');
    const videoURL = lodashGet(this.dataObj, [...pathArr, 'videoURL'], '');
    
    
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
    
    const resultObj = arr.find((valueObj) => {
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
    //   limit が 1 のときは既存の要素を削除する
    // ---------------------------------------------
    
    if (limit === 1) {
      
      clonedArr.splice(0, 1);
      
      
    // ---------------------------------------------
    //   画像＆動画が limit より多くなっている場合は処理停止
    // ---------------------------------------------
      
    } else if (limit <= clonedArr.length) {
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        messageID: 'fWrKN58iV',
      });
      
      return;
      
    }
    
    
    // ---------------------------------------------
    //   imagesAndVideosArr に追加する
    // ---------------------------------------------
    
    clonedArr.push({
      _id: '',
      type: 'video',
      videoChannel,
      videoID,
    });
    
    imagesAndVideosObj.arr = clonedArr;
    
    
    // ---------------------------------------------
    //   更新
    // ---------------------------------------------
    
    lodashSet(this.dataObj, [...pathArr, 'imagesAndVideosObj'], imagesAndVideosObj);
    
    
    // ---------------------------------------------
    //   入力フォームをリセット
    // ---------------------------------------------
    
    lodashSet(this.dataObj, [...pathArr, 'videoChannel'], 'youtube');
    lodashSet(this.dataObj, [...pathArr, 'videoURL'], '');
    
    
    // console.log(`\n---------- clonedArr ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(clonedArr)));
    // console.log(`\n-----------------------------------\n`);
    
  };
  
  
  
  
  /**
   * プレビューを削除する
   * @param {Array} pathArr - データを保存する場所を配列で指定する
   * @param {number} index - 削除するプレビュー番号
   */
  @action.bound
  handleRemovePreview({ pathArr, index }) {
    
    
    // ---------------------------------------------
    //   データ取得＆クローン
    // ---------------------------------------------
    
    const imagesAndVideosObj = lodashGet(this.dataObj, [...pathArr, 'imagesAndVideosObj'], {});
    const arr = lodashGet(imagesAndVideosObj, ['arr'], []);
    const clonedArr = lodashCloneDeep(arr);
    
    
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
    
    imagesAndVideosObj.arr = clonedArr;
    lodashSet(this.dataObj, [...pathArr, 'imagesAndVideosObj', 'arr'], clonedArr);
    
    
  };
  
  
}




// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreImageAndVideoForm({ propsObj }) {
  
  
  // --------------------------------------------------
  //   Store
  // --------------------------------------------------
  
  if (storeImageAndVideoForm === null) {
    storeImageAndVideoForm = new Store();
  }
  
  
  // --------------------------------------------------
  //   Props
  // --------------------------------------------------
  
  if (propsObj) {
    
    
    // --------------------------------------------------
    //   pathArr
    // --------------------------------------------------
    
    const pathArr = lodashGet(propsObj, ['pathArr'], []);
    
    // console.log(`
    //   /app/common/image-and-video/stores/form.js\n
    //   ----- pathArr -----\n
    //   ${util.inspect(pathArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   imagesAndVideosObj
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['imagesAndVideosObj'])) {
      storeImageAndVideoForm.handleSetImagesAndVideosObj({ pathArr, imagesAndVideosObj: propsObj.imagesAndVideosObj });
    }
    
    
    // --------------------------------------------------
    //   imagesAndVideosThumbnailObj
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['imagesAndVideosThumbnailObj'])) {
      storeImageAndVideoForm.handleSetImagesAndVideosObj({ pathArr: [...pathArr, 'thumbnailObj'], imagesAndVideosObj: propsObj.imagesAndVideosThumbnailObj });
    }
    
    
  }
    
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storeImageAndVideoForm;
  
  
}