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
import lodashHas from 'lodash/has';
import lodashCloneDeep from 'lodash/cloneDeep';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from 'app/@modules/fetch.js';
import { CustomError } from 'app/@modules/error/custom.js';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreLayout from 'app/common/layout/stores/layout.js';
import initStoreCardPlayer from 'app/common/card/player/stores/player.js';
import initStoreGameForm from 'app/common/game/stores/form.js';
import initStoreGcRecruitment from 'app/gc/rec/stores/store.js';

let storeIDForm = null;
const storeLayout = initStoreLayout({});
const storeCardPlayer = initStoreCardPlayer({});
const storeGameForm = initStoreGameForm({});
const storeGcRecruitment = initStoreGcRecruitment({});






// -------------------------------------------------------
//   Class
// -------------------------------------------------------

class Store {
  
  
  // --------------------------------------------------
  //   Data
  // --------------------------------------------------
  
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
  
  
  
  
  
  
  // --------------------------------------------------
  //   ID入力・編集フォームを開く
  // --------------------------------------------------
  
  /**
   * フォーム（ダイアログ）を開く
   * Fetchでユーザーが登録しているIDをすべて取得する
   * @param {Array} pathArr - パス
   * @param {string} _id
   * @param {Array} idsArr - 選択されているIDが入っている配列
   */
  @action.bound
  async handleDialogOpen({ pathArr, _id, idsArr }) {
    
    
    try {
      
      
      // --------------------------------------------------
      //   編集フォームに表示するデータがすでに読み込まれている場合
      //   編集フォームをすぐに表示する
      // --------------------------------------------------
      
      if (lodashHas(this.dataObj, [...pathArr, 'dataArr'])) {
        
        lodashSet(this.dataObj, [...pathArr, 'dialog'], true);
        
        
      // --------------------------------------------------
      //   編集フォームに表示するデータがまだ読み込まれていない場合
      //   Fetch でデータを取得してから編集フォームを表示する
      // --------------------------------------------------
      
      } else {
        
        
        // --------------------------------------------------
        //   Button Disable
        // --------------------------------------------------
        
        storeLayout.handleButtonDisable({ pathArr });
        
        
        
        
        // --------------------------------------------------
        //   FormData
        // --------------------------------------------------
        
        const formDataObj = {};
        
        
        // --------------------------------------------------
        //   Fetch
        // --------------------------------------------------
        
        const resultObj = await fetchWrapper({
          urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/ids/read-edit-form`,
          methodType: 'POST',
          formData: JSON.stringify(formDataObj),
        });
        
        
        
        
        
        // --------------------------------------------------
        //   Error
        // --------------------------------------------------
        
        if ('errorsArr' in resultObj) {
          throw new CustomError({ errorsArr: resultObj.errorsArr });
        }
        
        
        
        
        // --------------------------------------------------
        //   Data 更新
        // --------------------------------------------------
        
        const dataArr = lodashGet(resultObj, ['data'], []);
        
        const selectedArr = [];
        const unselectedArr = [];
        
        
        // ----------------------------------------
        //   - 選択IDの配列を作成する
        // ----------------------------------------
        
        for (let valueObj of idsArr.values()) {
          
          // 存在するIDかチェックする（すでに削除されている可能性があるため）
          const index = dataArr.findIndex((value2Obj) => {
            return value2Obj._id === valueObj._id;
          });
          
          if (index !== -1) {
            selectedArr.push(valueObj._id);
          }
          
        }
        
        
        // ----------------------------------------
        //   - 未選択IDの配列を作成する
        // ----------------------------------------
        
        for (let valueObj of dataArr.values()) {
          
          // 選択IDに含まれていない場合、配列に追加
          const index = idsArr.findIndex((value2Obj) => {
            return value2Obj._id === valueObj._id;
          });
          
          if (index === -1) {
            unselectedArr.push(valueObj._id);
          }
          
        }
        
        lodashSet(this.dataObj, [...pathArr, 'selectedArr'], selectedArr);
        lodashSet(this.dataObj, [...pathArr, 'unselectedArr'], unselectedArr);
        lodashSet(this.dataObj, [...pathArr, 'dataArr'], dataArr);
        
        
        
        
        // --------------------------------------------------
        //   編集フォーム表示
        // --------------------------------------------------
        
        lodashSet(this.dataObj, [...pathArr, 'dialog'], true);
        
        
        
        // --------------------------------------------------
        //   console.log
        // --------------------------------------------------
        
        // console.log(`
        //   ----------------------------------------\n
        //   /app/common/id/stores/form.js - handleDialogOpen
        // `);
        
        // console.log(`
        //   ----- pathArr -----\n
        //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
        // console.log(chalk`
        //   _id: {green ${_id}}
        // `);
        
        // console.log(`
        //   ----- idsArr -----\n
        //   ${util.inspect(JSON.parse(JSON.stringify(idsArr)), { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
        // console.log(`
        //   ----- selectedArr -----\n
        //   ${util.inspect(JSON.parse(JSON.stringify(selectedArr)), { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
        // console.log(`
        //   ----- unselectedArr -----\n
        //   ${util.inspect(JSON.parse(JSON.stringify(unselectedArr)), { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
        
        // --------------------------------------------------
        //   console.log
        // --------------------------------------------------
        
        // console.log(`
        //   ----------------------------------------\n
        //   /app/common/id/stores/form.js - handleDialogOpen
        // `);
        
        // console.log(`
        //   ----- pathArr -----\n
        //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
        // console.log(`
        //   ----- dataArr -----\n
        //   ${util.inspect(JSON.parse(JSON.stringify(dataArr)), { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
        // console.log(`
        //   ----- gamesArr -----\n
        //   ${util.inspect(JSON.parse(JSON.stringify(gamesArr)), { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
         
      }
      
      
    } catch (error) {
      
    } finally {
      
      
      // --------------------------------------------------
      //   Button Enable
      // --------------------------------------------------
      
      storeLayout.handleButtonEnable({ pathArr });
      
      
    }
    
    
  };
  
  
  
  
  
  
  // --------------------------------------------------
  //   選択
  // --------------------------------------------------
  
  /**
   * 選択IDから未選択IDに移動する
   * @param {Array} pathArr - パス
   * @param {number} index - 移動するIDの配列index
   */
  @action.bound
  handleMoveSelected({ pathArr, index }) {
    
    const selectedArr = lodashGet(this.dataObj, [...pathArr, 'selectedArr'], []);
    const unselectedArr = lodashGet(this.dataObj, [...pathArr, 'unselectedArr'], []);
    
    unselectedArr.push(selectedArr[index]);
    selectedArr.splice(index, 1);
    
    lodashSet(this.dataObj, [...pathArr, 'unselectedArr'], unselectedArr);
    lodashSet(this.dataObj, [...pathArr, 'selectedArr'], selectedArr);
    
  };
  
  
  /**
   * 未選択IDから選択IDに移動する
   * @param {Array} pathArr - パス
   * @param {number} index - 移動するIDの配列index
   */
  @action.bound
  handleMoveUnselected({ pathArr, index }) {
    
    const selectedArr = lodashGet(this.dataObj, [...pathArr, 'selectedArr'], []);
    const unselectedArr = lodashGet(this.dataObj, [...pathArr, 'unselectedArr'], []);
    
    selectedArr.push(unselectedArr[index]);
    unselectedArr.splice(index, 1);
    
    lodashSet(this.dataObj, [...pathArr, 'selectedArr'], selectedArr);
    lodashSet(this.dataObj, [...pathArr, 'unselectedArr'], unselectedArr);
    
  };
  
  
  
  
  /**
   * 選択を確定するボタンを押したときに実行される
   * @param {Array} pathArr - パス
   * @param {string} type - IDフォームの呼び出し元の種類 / cardPlayerForm, recruitment
   * @param {string} _id - cardPlayers_id / 
   * @param {Array} idsArr - 選択されたIDの配列
   * @param {Array} forUpdateOtherStorePathArr - 別のストア更新用のパスが入った配列
   */
  @action.bound
  handleSelectButton({ pathArr, type, _id, idsArr, forUpdateOtherStorePathArr }) {
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/common/id/stores/form.js - handleSelectButton
    // `);
    
    // console.log(`
    //   ----- pathArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forUpdateOtherStorePathArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(forUpdateOtherStorePathArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   type: {green ${type}}
    //   _id: {green ${_id}}
    // `);
    
    // console.log(`
    //   ----- idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   プレイヤーカードのフォーム
    // --------------------------------------------------
    
    if (type === 'cardPlayerForm') {
      
      const clonedArr = lodashCloneDeep(idsArr);
      lodashSet(storeCardPlayer, ['cardPlayerEditFormDataObj', _id, 'idsArr'], clonedArr);
      
    }
    
    
    // --------------------------------------------------
    //   募集フォーム
    // --------------------------------------------------
    
    if (type === 'recruitment') {
      
      const clonedArr = lodashCloneDeep(idsArr);
      lodashSet(storeGcRecruitment, ['dataObj', ...forUpdateOtherStorePathArr, 'idsArr'], clonedArr);
      
    }
    
    
    // --------------------------------------------------
    //   ダイアログを閉じる
    // --------------------------------------------------
    
    lodashSet(this.dataObj, [...pathArr, 'dialog'], false);
    
    
  };
  
  
  
  
  
  
  // --------------------------------------------------
  //   編集・登録
  // --------------------------------------------------
  
  /**
   * 編集時に編集するIDを選択する（各フォームの値を設定する）
   * 編集フォームの ID (Chip) をクリックしたときに発動
   * @param {Array} pathArr - パス
   * @param {string} _id - ID
   * @param {string} ids_id - DB IDs _id
   */
  @action.bound
  handleChangeEditID({ pathArr, _id, ids_id }) {
    
    
    // --------------------------------------------------
    //   データを取得する
    // --------------------------------------------------
    
    const dataArr = lodashGet(this.dataObj, [...pathArr, 'dataArr'], []);
    
    const resultObj = dataArr.find((valueObj) => {
      return valueObj._id === ids_id;
    });
    
    
    // --------------------------------------------------
    //   フォームのデータを変更する
    // --------------------------------------------------
    
    lodashSet(this.dataObj, [...pathArr, '_id'], resultObj._id);
    lodashSet(this.dataObj, [...pathArr, 'platform'], resultObj.platform);
    lodashSet(this.dataObj, [...pathArr, 'label'], resultObj.label);
    lodashSet(this.dataObj, [...pathArr, 'id'], resultObj.id);
    lodashSet(this.dataObj, [...pathArr, 'publicSetting'], resultObj.publicSetting);
    lodashSet(this.dataObj, [...pathArr, 'search'], resultObj.search);
    
    
    // --------------------------------------------------
    //   ゲームフォームのゲームを変更する
    // --------------------------------------------------
    
    const games_id = lodashGet(resultObj, ['gamesObj', '_id'], '');
    const gameCommunities_id = lodashGet(resultObj, ['gamesObj', 'gameCommunities_id'], '');
    const name = lodashGet(resultObj, ['gamesObj', 'name'], '');
    const imagesAndVideosThumbnailObj = lodashGet(resultObj, ['gamesObj', 'imagesAndVideosThumbnailObj'], {});
    
    let gamesArr = [];
    
    if (games_id && gameCommunities_id && name) {
      gamesArr = [{ _id: games_id, gameCommunities_id, name, imagesAndVideosThumbnailObj }];
    }
    
    storeGameForm.handleSetGamesArr({ pathArr, gamesArr });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/common/id/stores/form.js - handleChangeEditID
    // `);
    
    // console.log(`
    //   ----- pathArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- gamesArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(gamesArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    //   ids_id: {green ${ids_id}}
    // `);
    
    // console.log(`
    //   ----- resultObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- this.dataObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(this.dataObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----------------------------------------
    // `);
    
    
  };
  
  
  
  
  /**
   * 削除ダイアログを開く
   * @param {string} _id
   */
  @action.bound
  handleDeleteDialogOpen({ pathArr }) {
    
    
    // --------------------------------------------------
    //   削除するIDが選ばれていない場合、エラーを通知
    // --------------------------------------------------
    
    const form_id = lodashGet(this.dataObj, [...pathArr, '_id'], '');
    
    // console.log(chalk`
    //   form_id: {green ${form_id}}
    // `);
    
    if (!form_id) {
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        messageID: 'Z9LG9XL5W',
      });
      
      return;
      
    }
      
    
    lodashSet(this.dataObj, [...pathArr, 'deleteDialogOpen'], true);
    
  };
  
  
  
  
  /**
   * 削除ダイアログを閉じる
   * @param {Array} pathArr - パス
   */
  @action.bound
  handleDeleteDialogClose({ pathArr }) {
    lodashSet(this.dataObj, [...pathArr, 'deleteDialogOpen'], false);
  };
  
  
  
  
  /**
   * 編集フォームを送信する
   * @param {Array} pathArr - パス
   * @param {string} type
   * @param {string} _id
   * @param {Array} idsArr - 選択されているID情報の入った配列
   * @param {Array} forUpdateOtherStorePathArr - 別のストア更新用のパスが入った配列
   */
  @action.bound
  async handleEditSubmit({ pathArr, type, _id, idsArr, forUpdateOtherStorePathArr }) {
    
    
    try {
      
      
      // --------------------------------------------------
      //   Button Disable
      // --------------------------------------------------
      
      storeLayout.handleButtonDisable({ pathArr });
      
      
      
      
      // --------------------------------------------------
      //   編集するIDが選ばれていない場合、エラー
      // --------------------------------------------------
      
      const form_id = lodashGet(this.dataObj, [...pathArr, '_id'], '');
      
      if (!form_id) {
        throw new CustomError({ errorsArr: [{ code: 'cOQptDp5', messageID: 'sHOvvQXWL' }] });
      }
      
      
      
      
      // --------------------------------------------------
      //   フォームのデータを取得
      // --------------------------------------------------
      
      const platform = lodashGet(this.dataObj, [...pathArr, 'platform'], '');
      const label = lodashGet(this.dataObj, [...pathArr, 'label'], '');
      const id = lodashGet(this.dataObj, [...pathArr, 'id'], '');
      const publicSetting = lodashGet(this.dataObj, [...pathArr, 'publicSetting'], '');
      const search = lodashGet(this.dataObj, [...pathArr, 'search'], true);
      
      const gamesArr = storeGameForm.handleGetGamesArr({ pathArr });
      
      let gameCommunities_id = '';
      
      if (gamesArr.length > 0) {
        gameCommunities_id = lodashGet(gamesArr, [0, 'gameCommunities_id'], '');
      }
      
      // console.log(`
      //   ----- gamesArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(gamesArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // --------------------------------------------------
      //   フォームに必要な情報が入力されていない場合、エラー
      // --------------------------------------------------
      
      if (!platform || !id || !publicSetting) {
        throw new CustomError({ errorsArr: [{ code: '5Geof8YQ', messageID: 'uwHIKBy7c' }] });
      }
      
      
      
      
      // --------------------------------------------------
      //   FormData
      // --------------------------------------------------
      
      const formDataObj = {
        
        _id: form_id,
        platform,
        label,
        gameCommunities_id,
        id,
        publicSetting,
        search,
        
      };
      
      
      // --------------------------------------------------
      //   Fetch
      // --------------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/ids/upsert`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj),
      });
      
      
      
      
      // --------------------------------------------------
      //   Error
      // --------------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      
      
      // --------------------------------------------------
      //   データ更新
      // --------------------------------------------------
      
      lodashSet(this.dataObj, [...pathArr, 'dataArr'], resultObj.data);
      
      
      // --------------------------------------------------
      //   ID登録フォームをロードした元のフォームのIDを更新する
      // --------------------------------------------------
      
      const updatedIDsArr = [];
      
      for (let valueObj of idsArr.values()) {
        
        // 現在選択されているIDを抽出する
        const newObj = resultObj.data.find((valueObj2) => {
          return valueObj2._id === valueObj._id;
        });
        
        // 新しくなった選択IDの配列を作成
        if (newObj) {
          updatedIDsArr.push(newObj);
        }
        
        // console.log(`
        //   ----- valueObj -----\n
        //   ${util.inspect(valueObj, { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
        // console.log(`
        //   ----- newObj -----\n
        //   ${util.inspect(newObj, { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
      }
      
      
      // --------------------------------------------------
      //   プレイヤーカードのフォーム更新
      // --------------------------------------------------
      
      if (type === 'cardPlayerForm') {
        
        const clonedArr = lodashCloneDeep(updatedIDsArr);
        lodashSet(storeCardPlayer, ['cardPlayerEditFormDataObj', _id, 'idsArr'], clonedArr);
        
      }
      
      
      
    
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/common/id/stores/form.js - handleEditSubmit
      // `);
      
      // console.log(`
      //   ----- forUpdateOtherStorePathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(forUpdateOtherStorePathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   type: {green ${type}}
      // `);
      
      
      
      // --------------------------------------------------
      //   募集フォーム
      // --------------------------------------------------
      
      if (type === 'recruitment') {
        
        const clonedArr = lodashCloneDeep(updatedIDsArr);
        lodashSet(storeGcRecruitment, ['dataObj', ...forUpdateOtherStorePathArr, 'idsArr'], clonedArr);
        
      }
      
      
      
      
      // --------------------------------------------------
      //   Snackbar: Success
      // --------------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'success',
        messageID: 'EnStWOly-',
        horizontal: 'right',
      });
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(chalk`
      //   _id: {green ${_id}}
      // `);
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- idsArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(idsArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- updatedIDsArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(updatedIDsArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- this.dataObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(this.dataObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- formDataObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(formDataObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
    } catch (errorObj) {
      
      
      // --------------------------------------------------
      //   Snackbar: Error
      // --------------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        errorObj,
      });
      
      
    } finally {
      
      
      // --------------------------------------------------
      //   Button Enable
      // --------------------------------------------------
      
      storeLayout.handleButtonEnable({ pathArr });
      
      
    }
    
    
  };
  
  
  
  
  /**
   * 削除フォームを送信する
   * @param {Array} pathArr - パス
   * @param {string} type
   * @param {string} _id
   * @param {Array} idsArr - 選択されているID情報の入った配列
   * @param {Array} forUpdateOtherStorePathArr - 別のストア更新用のパスが入った配列
   */
  @action.bound
  async handleDeleteSubmit({ pathArr, type, _id, idsArr, forUpdateOtherStorePathArr }) {
    
    
    try {
      
      
      // --------------------------------------------------
      //   Button Disable
      // --------------------------------------------------
      
      storeLayout.handleButtonDisable({ pathArr });
      
      
      
      
      // --------------------------------------------------
      //   編集するIDが選ばれていない場合、エラー
      // --------------------------------------------------
      
      const form_id = lodashGet(this.dataObj, [...pathArr, '_id'], '');
      
      if (!form_id) {
        throw new CustomError({ errorsArr: [{ code: '-PQYNFlb', messageID: 'Z9LG9XL5W' }] });
      }
      
      
      
      
      // --------------------------------------------------
      //   FormData
      // --------------------------------------------------
      
      const formDataObj = {
        
        _id: form_id,
        
      };
      
      
      // --------------------------------------------------
      //   Fetch
      // --------------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/ids/delete`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj),
      });
      
      
      
      
      // --------------------------------------------------
      //   Error
      // --------------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      
      
      // --------------------------------------------------
      //   データ更新
      // --------------------------------------------------
      
      lodashSet(this.dataObj, [...pathArr, 'dataArr'], resultObj.data);
      
      
      // --------------------------------------------------
      //   渡された関数を実行する
      //   ID登録フォームをロードした元のフォームのIDを更新する
      // --------------------------------------------------
      
      const updatedIDsArr = [];
      
      for (let valueObj of idsArr.values()) {
        
        const newObj = resultObj.data.find((valueObj2) => {
          return valueObj2._id === valueObj._id;
        });
        
        if (newObj) {
          updatedIDsArr.push(newObj);
        }
        
      }
      
      
      // --------------------------------------------------
      //   プレイヤーカードのフォーム更新
      // --------------------------------------------------
      
      if (type === 'cardPlayerForm') {
        
        const clonedArr = lodashCloneDeep(updatedIDsArr);
        lodashSet(storeCardPlayer, ['cardPlayerEditFormDataObj', _id, 'idsArr'], clonedArr);
        
      }
      
      
      // --------------------------------------------------
      //   募集フォーム
      // --------------------------------------------------
      
      if (type === 'recruitment') {
        
        const clonedArr = lodashCloneDeep(updatedIDsArr);
        lodashSet(storeGcRecruitment, ['dataObj', ...forUpdateOtherStorePathArr, 'idsArr'], clonedArr);
        
      }
      
      
      
      
      // --------------------------------------------------
      //   フォームを空にする
      // --------------------------------------------------
      
      this.handleResetForm({ pathArr });
      
      
      // --------------------------------------------------
      //   ゲームフォームを空にする
      // --------------------------------------------------
      
      storeGameForm.handleReset({ pathArr });
      
      
      // --------------------------------------------------
      //   削除ダイアログを閉じる
      // --------------------------------------------------
      
      this.handleDeleteDialogClose({ pathArr });
      
      
      
      
      // --------------------------------------------------
      //   Snackbar: Success
      // --------------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'success',
        messageID: 'j6lSS-Zf5',
        horizontal: 'right',
      });
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/common/id/stores/form.js - handleDeleteSubmit
      // `);
      
      // console.log(chalk`
      //   _id: {green ${_id}}
      // `);
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- idsArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(idsArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- updatedIDsArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(updatedIDsArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
    } catch (errorObj) {
      
      
      // --------------------------------------------------
      //   Snackbar: Error
      // --------------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        errorObj,
      });
      
      
    } finally {
      
      
      // --------------------------------------------------
      //   Button Enable
      // --------------------------------------------------
      
      storeLayout.handleButtonEnable({ pathArr });
      
      
    }
    
    
  };
  
  
  
  
  /**
   * 登録フォームを送信する
   * @param {Array} pathArr - パス
   * @param {string} _id
   */
  @action.bound
  async handleRegisterSubmit({ pathArr, _id }) {
    
    
    try {
      
      
      // --------------------------------------------------
      //   Button Disable
      // --------------------------------------------------
      
      storeLayout.handleButtonDisable({ pathArr });
      
      
      
      
      // --------------------------------------------------
      //   フォームのデータを取得
      // --------------------------------------------------
      
      const platform = lodashGet(this.dataObj, [...pathArr, 'platform'], '');
      const label = lodashGet(this.dataObj, [...pathArr, 'label'], '');
      const id = lodashGet(this.dataObj, [...pathArr, 'id'], '');
      const publicSetting = lodashGet(this.dataObj, [...pathArr, 'publicSetting'], '');
      const search = lodashGet(this.dataObj, [...pathArr, 'search'], true);
      
      const gamesArr = storeGameForm.handleGetGamesArr({ pathArr });
      
      let gameCommunities_id = '';
      
      if (gamesArr.length > 0) {
        gameCommunities_id = lodashGet(gamesArr, [0, 'gameCommunities_id'], '');
      }
      
      
      
      
      // --------------------------------------------------
      //   フォームに必要な情報が入力されていない場合、エラー
      // --------------------------------------------------
      
      if (!platform || !id || !publicSetting) {
        throw new CustomError({ errorsArr: [{ code: 'gk89EvTvH', messageID: 'uwHIKBy7c' }] });
      }
      
      
      
      
      // --------------------------------------------------
      //   FormData
      // --------------------------------------------------
      
      const formDataObj = {
        
        platform,
        label,
        gameCommunities_id,
        id,
        publicSetting,
        search,
        
      };
      
      
      // --------------------------------------------------
      //   Fetch
      // --------------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/ids/upsert`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj),
      });
      
      
      
      
      // --------------------------------------------------
      //   Error
      // --------------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      
      
      // --------------------------------------------------
      //   Data 更新
      // --------------------------------------------------
      
      const newPathArr = [_id, 'idFormObj'];
      
      lodashSet(this.dataObj, [...newPathArr, 'dataArr'], resultObj.data);
      
      
      // --------------------------------------------------
      //   未選択IDに追加 / _id のみでいい
      // --------------------------------------------------
      
      const dataArr = lodashGet(this.dataObj, [...newPathArr, 'dataArr'], []);
      const unselectedArr = lodashGet(this.dataObj, [...newPathArr, 'unselectedArr'], []);
      unselectedArr.push(dataArr[dataArr.length - 1]._id);
      
      lodashSet(this.dataObj, [...newPathArr, 'unselectedArr'], unselectedArr);
      
      
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/common/id/stores/form.js - handleRegisterSubmit
      // `);
      
      // console.log(chalk`
      //   _id: {green ${_id}}
      //   platform: {green ${platform}}
      //   label: {green ${label}}
      //   id: {green ${id}}
      //   publicSetting: {green ${publicSetting}}
      //   search: {green ${search}}
      //   gameCommunities_id: {green ${gameCommunities_id}}
      // `);
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- newPathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(newPathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- dataArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(dataArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- unselectedArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(unselectedArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- this.dataObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(this.dataObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      
      
      
      // --------------------------------------------------
      //   フォームを空にする
      // --------------------------------------------------
      
      this.handleResetForm({ pathArr });
      
      
      // --------------------------------------------------
      //   ゲームフォームを空にする
      // --------------------------------------------------
      
      storeGameForm.handleReset({ pathArr });
      
      
      
      
      // --------------------------------------------------
      //   Snackbar: Success
      // --------------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'success',
        messageID: 'As9-T8q9N',
        horizontal: 'right',
      });
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
    } catch (errorObj) {
      
      
      // --------------------------------------------------
      //   Snackbar: Error
      // --------------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        errorObj,
      });
      
      
    } finally {
      
      
      // --------------------------------------------------
      //   Button Enable
      // --------------------------------------------------
      
      storeLayout.handleButtonEnable({ pathArr });
      
      
    }
    
    
  };
  
  
  
  
  /**
   * フォームを空にする
   * @param {Array} pathArr - パス
   */
  @action.bound
  handleResetForm({ pathArr }) {
    
    lodashSet(this.dataObj, [...pathArr, '_id'], '');
    lodashSet(this.dataObj, [...pathArr, 'platform'], '');
    lodashSet(this.dataObj, [...pathArr, 'label'], '');
    lodashSet(this.dataObj, [...pathArr, 'id'], '');
    lodashSet(this.dataObj, [...pathArr, 'publicSetting'], '');
    lodashSet(this.dataObj, [...pathArr, 'search'], true);
    
  };
  
  
}




// -------------------------------------------------------
//   Initialize Store
// -------------------------------------------------------

export default function initStoreIDForm({}) {
  
  
  // --------------------------------------------------
  //   Store
  // --------------------------------------------------
  
  if (storeIDForm === null) {
    storeIDForm = new Store();
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storeIDForm;
  
  
}