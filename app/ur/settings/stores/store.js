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
import lodashHas from 'lodash/has';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../../../@modules/fetch';
import { CustomError } from '../../../@modules/error/custom';


// ---------------------------------------------
//   Validation
// ---------------------------------------------

import { validationUsersLoginID } from '../../../@database/users/validations/login-id';
import { validationUsersLoginPassword, validationUsersLoginPasswordConfirmation } from '../../../@database/users/validations/login-password';
import { validationUsersEmail } from '../../../@database/users/validations/email';

// const { validationUsersLoginID } = require('../../../@database/users/validations/login-id');
// const { validationUsersLoginPassword, validationUsersLoginPasswordConfirmation } = require('../../../@database/users/validations/login-password');
// const { validationUsersEmail } = require('../../../@database/users/validations/email');


// --------------------------------------------------
//   Stores
// --------------------------------------------------

import initStoreData from '../../../@stores/data';
import initStoreLayout from '../../../common/layout/stores/layout';
import initStoreImageAndVideoForm from '../../../common/image-and-video/stores/form';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeUrSettings = null;
let storeData = initStoreData({});
let storeLayout = initStoreLayout({});
let storeImageAndVideoForm = initStoreImageAndVideoForm({});
      



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
  //   Edit Account
  // ---------------------------------------------
  
  /**
   * パスワード入力フォームの目のマークを押したときに呼び出される
   * 押すと隠されているログインパスワードを表示する
   */
  @action.bound
  handlePasswordShow() {
    this.dataObj['loginPasswordShow'] = !this.dataObj['loginPasswordShow'];
  };
  
  
  /**
   * パスワード入力フォーム onMouseDown で呼び出される
   * Material UI のページに解説されているとおりに入れている
   * 参考：https://material-ui.com/demos/text-fields/#input-adornments
   * @param {Object} eventObj - イベント
   */
  @action.bound
  handlePasswordMouseDown(eventObj) {
    eventObj.preventDefault();
  };
  
  
  /**
   * パスワード確認入力フォームの目のマークを押したときに呼び出される
   * 押すと隠されているログインパスワードを表示する
   */
  @action.bound
  handlePasswordConfirmationShow() {
    this.dataObj['loginPasswordConfirmationShow'] = !this.dataObj['loginPasswordConfirmationShow'];
  };
  
  
  /**
   * パスワード確認入力フォーム onMouseDown で呼び出される
   * Material UI のページに解説されているとおりに入れている
   * 参考：https://material-ui.com/demos/text-fields/#input-adornments
   * @param {Object} eventObj - イベント
   */
  @action.bound
  handlePasswordConfirmationMouseDown(eventObj) {
    eventObj.preventDefault();
  };
  
  
  
  
  /**
   * ログイン情報編集フォームを送信する
   */
  @action.bound
  async handleSubmitAccount() {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisable({ _id: 'submitAccount' });
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const loginID = lodashGet(this.dataObj, ['loginID'], '');
      const loginPassword = lodashGet(this.dataObj, ['loginPassword'], '');
      const loginPasswordConfirmation = lodashGet(this.dataObj, ['loginPasswordConfirmation'], '');
      
      
      // ---------------------------------------------
      //   Validation
      // ---------------------------------------------
      
      const validationUsersLoginIDObj = validationUsersLoginID({ required: true, value: loginID });
      const validationUsersLoginPasswordObj = validationUsersLoginPassword({ required: true, value: loginPassword, loginID: loginID });
      const validationUsersLoginPasswordConfirmationObj = validationUsersLoginPasswordConfirmation({ required: true, value: loginPasswordConfirmation, loginPassword: loginPassword });
      
      
      // ---------------------------------------------
      //   Validation Error
      // ---------------------------------------------
      
      if (
        validationUsersLoginIDObj.error ||
        validationUsersLoginPasswordObj.error ||
        validationUsersLoginPasswordConfirmationObj.error
      ) {
        throw new CustomError({ errorsArr: [{ code: 'G22F0axr0', messageID: 'uwHIKBy7c' }] });
      }
      
      
      
      // console.log(chalk`
      //   loginID: {green ${loginID}}
      //   loginPassword: {green ${loginPassword}}
      // `);
      
      // console.log(`\n---------- validationUsersLoginIDObj ----------\n`);
      // console.dir(JSON.parse(JSON.stringify(validationUsersLoginIDObj)));
      // console.log(`\n-----------------------------------\n`);
      
      // console.log(`\n---------- validationUsersLoginPasswordObj ----------\n`);
      // console.dir(JSON.parse(JSON.stringify(validationUsersLoginPasswordObj)));
      // console.log(`\n-----------------------------------\n`);
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      let formData = new FormData();
      
      formData.append('loginID', loginID);
      formData.append('loginPassword', loginPassword);
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v1/users/edit-account`,
        methodType: 'POST',
        formData: formData
      });
      
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      // ---------------------------------------------
      //   Form Reset
      // ---------------------------------------------
      
      lodashSet(this.dataObj, 'loginPassword', '');
      lodashSet(this.dataObj, 'loginPasswordConfirmation', '');
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'success',
        messageID: 'nhn2yers2',
      });
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        errorObj,
      });
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      storeLayout.handleButtonEnable({ _id: 'submitAccount' });
      
      
      // ---------------------------------------------
      //   Loading 非表示
      // ---------------------------------------------
      
      storeLayout.handleLoadingHide({});
      
      
    }
    
    
  };
  
  
  
  
  /**
   * E-Mailフォームを送信する
   */
  @action.bound
  async handleSubmitEmail() {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisable({ _id: 'submitEmail' });
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const email = lodashGet(this.dataObj, ['emailObj', 'value'], '');
      const removeEmail = lodashGet(this.dataObj, ['removeEmail'], false);
      
      
      // ---------------------------------------------
      //   Validation
      // ---------------------------------------------
      
      const validationUsersEmailObj = validationUsersEmail({ value: email });
      
      
      // ---------------------------------------------
      //   Validation Error
      // ---------------------------------------------
      
      if (validationUsersEmailObj.error) {
        throw new CustomError({ errorsArr: [{ code: '6cFcqgVgL', messageID: 'uwHIKBy7c' }] });
      }
      
      
      // ---------------------------------------------
      //   E-Mailも解除チェックボックスも空の場合、エラー
      // ---------------------------------------------
      
      if (!email && !removeEmail) {
        throw new CustomError({ errorsArr: [{ code: 'wVkjU5SCS', messageID: 'uwHIKBy7c' }] });
      }
      
      
      
      // console.log(chalk`
      //   email: {green ${email}}
      // `);
      
      // console.log(`\n---------- validationUsersEmailObj ----------\n`);
      // console.dir(JSON.parse(JSON.stringify(validationUsersEmailObj)));
      // console.log(`\n-----------------------------------\n`);
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      let formData = new FormData();
      
      formData.append('email', email);
      if (removeEmail) formData.append('removeEmail', true);
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v1/users/email`,
        methodType: 'POST',
        formData: formData
      });
      
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      // ---------------------------------------------
      //   Form Reset
      // ---------------------------------------------
      
      lodashSet(this.dataObj, ['emailObj', 'value'], '');
      lodashSet(this.dataObj, ['emailObj', 'confirmation'], false);
      lodashSet(this.dataObj, ['emailObj', 'secret'], resultObj.data.emailSecret);
      lodashSet(this.dataObj, ['removeEmail'], false);
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      if (removeEmail) {
        
        storeLayout.handleSnackbarOpen({
          variant: 'success',
          messageID: 'hbRy4HpaP',
        });
        
      } else {
        
        storeLayout.handleSnackbarOpen({
          variant: 'success',
          messageID: '84FmVC7RZ',
        });
        
      }
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        errorObj,
      });
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      storeLayout.handleButtonEnable({ _id: 'submitEmail' });
      
      
      // ---------------------------------------------
      //   Loading 非表示
      // ---------------------------------------------
      
      storeLayout.handleLoadingHide({});
      
      
    }
    
    
  };
  
  
  
  
  /**
   * 確認メールを再送信する
   */
  @action.bound
  async handleSubmitConfirmation() {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisable({ _id: 'submitConfirmation' });
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      let formData = new FormData();
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v1/email-confirmations/resend`,
        methodType: 'POST',
        formData: formData
      });
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'success',
        messageID: 'CquCU7BtA',
      });
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        errorObj,
      });
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      storeLayout.handleButtonEnable({ _id: 'submitConfirmation' });
      
      
      // ---------------------------------------------
      //   Loading 非表示
      // ---------------------------------------------
      
      storeLayout.handleLoadingHide({});
      
      
    }
    
    
  };
  
  
  
  
  /**
   * ユーザーページ設定フォームを送信する
   * @param {Array} pathArr - パス
   */
  @action.bound
  async handleSubmitPages({ pathArr }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Loading 表示
      // ---------------------------------------------
      
      storeLayout.handleLoadingShow({});
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisable({ pathArr });
      
      
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const userID = lodashGet(this.dataObj, [...pathArr, 'userID'], '');
      const pagesArr = lodashGet(this.dataObj, [...pathArr, 'pagesObj', 'arr'], []);
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        userID,
        pagesArr
        
      };
      
      
      // メイン画像
      const imagesAndVideosObj = storeImageAndVideoForm.handleGetImagesAndVideosObj({ pathArr });
      
      if (Object.keys(imagesAndVideosObj).length !== 0) {
        formDataObj.imagesAndVideosObj = imagesAndVideosObj;
      }
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v2/db/users/upsert-pages`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj)
      });
      
      // console.log(`\n---------- resultObj ----------\n`);
      // console.dir(resultObj);
      // console.log(`\n-----------------------------------\n`);
      
      
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'success',
        messageID: '5o6-p-Pkz',
      });
      
      
      // ---------------------------------------------
      //   Page Transition / URLを変更した場合にリロードする
      // ---------------------------------------------
      
      const pageTransition = lodashGet(resultObj, ['data', 'pageTransition'], false);
      
      if (pageTransition) {
        window.location.href = `${process.env.URL_BASE}ur/${userID}/settings`;
      }
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        errorObj,
      });
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      storeLayout.handleButtonEnable({ pathArr });
      
      
      // ---------------------------------------------
      //   Loading 非表示
      // ---------------------------------------------
      
      storeLayout.handleLoadingHide({});
      
      
    }
    
    
  };
  
  
}




// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreUrSettings({ propsObj }) {
  
  
  // --------------------------------------------------
  //   Store
  // --------------------------------------------------
  
  if (storeUrSettings === null) {
    storeUrSettings = new Store();
  }
  
  
  // --------------------------------------------------
  //   Props
  // --------------------------------------------------
  
  if (propsObj) {
    
    
    // --------------------------------------------------
    //   pathArr
    // --------------------------------------------------
    
    const pathArr = lodashGet(propsObj, ['pathArr'], []);
    
    
    // --------------------------------------------------
    //   userID
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['userID'])) {
      lodashSet(storeUrSettings, ['dataObj', ...pathArr, 'userID'], propsObj.userID);
    }
    
    
    // --------------------------------------------------
    //   pagesObj
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['pagesObj'])) {
      lodashSet(storeUrSettings, ['dataObj', ...pathArr, 'pagesObj'], propsObj.pagesObj);
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   userCommunities_id: {green ${userCommunities_id}}
    // `);
    
    // console.log(`
    //   ----- propsObj -----\n
    //   ${util.inspect(propsObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storeUrSettings;
  
  
}