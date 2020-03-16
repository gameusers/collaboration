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
//   Validations
// ---------------------------------------------

import { validationUsersLoginID } from '../../../@database/users/validations/login-id';
import { validationUsersLoginPassword, validationUsersLoginPasswordConfirmation } from '../../../@database/users/validations/login-password';
import { validationUsersEmail } from '../../../@database/users/validations/email';


// --------------------------------------------------
//   Stores
// --------------------------------------------------

import initStoreData from '../../../@stores/data';
import initStoreWebPush from '../../../@stores/web-push';
import initStoreLayout from '../../../common/layout/stores/layout';
import initStoreImageAndVideoForm from '../../../common/image-and-video/stores/form';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeUrSettings = null;
let storeData = initStoreData({});
let storeWebPush = initStoreWebPush({});
let storeLayout = initStoreLayout({});
let storeImageAndVideoForm = initStoreImageAndVideoForm({});
      



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
  //   Edit Account
  // ---------------------------------------------
  
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
      const approval = lodashGet(this.dataObj, [...pathArr, 'approval'], false);
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        userID,
        pagesArr,
        approval,
        
      };
      
      
      // ----------------------------------------
      //   - メイン画像
      //   新たにアップロードされた画像がある場合、オブジェクトに追加する
      // ----------------------------------------
      
      const imagesAndVideosObj = storeImageAndVideoForm.handleGetImagesAndVideosObj({ pathArr });
      const imagesAndVideosArr = lodashGet(imagesAndVideosObj, ['arr'], []);
      
      const index = imagesAndVideosArr.findIndex((valueObj) => {
        return valueObj._id === '';
      });
      
      if (index !== -1) {
        formDataObj.imagesAndVideosObj = imagesAndVideosObj;
      }
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(chalk`
      //   index: {green ${index}}
      // `);
      
      // console.log(`
      //   ----- imagesAndVideosObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   userID: {green ${userID}}
      //   approval: {green ${approval}}
      // `);
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v2/db/users/upsert-settings-pages`,
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
  
  
  
  
  /**
   * ログインID ＆パスワード編集フォームを送信する
   * @param {Array} pathArr - パス
   */
  @action.bound
  async handleSubmitAccount({ pathArr }) {
    
    
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
      
      const loginID = lodashGet(this.dataObj, [...pathArr, 'loginID'], '');
      const loginPassword = lodashGet(this.dataObj, [...pathArr, 'loginPassword'], '');
      const loginPasswordConfirmation = lodashGet(this.dataObj, [...pathArr, 'loginPasswordConfirmation'], '');
      
      
      
      
      // ---------------------------------------------
      //   Validations
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
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        loginID,
        loginPassword,
        
      };
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/ur/settings/stores/store.js - handleSubmitAccount
      // `);
      
      // console.log(chalk`
      //   loginID: {green ${loginID}}
      //   loginPassword: {green ${loginPassword}}
      //   loginPasswordConfirmation: {green ${loginPasswordConfirmation}}
      // `);
      
      
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v2/db/users/upsert-settings-account`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj)
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
      
      lodashSet(this.dataObj, [...pathArr, 'loginPassword'], '');
      lodashSet(this.dataObj, [...pathArr, 'loginPasswordConfirmation'], '');
      
      
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
      
      storeLayout.handleButtonEnable({ pathArr });
      
      
      // ---------------------------------------------
      //   Loading 非表示
      // ---------------------------------------------
      
      storeLayout.handleLoadingHide({});
      
      
    }
    
    
  };
  
  
  
  
  /**
   * メールアドレスを登録する
   * @param {Array} pathArr - パス
   */
  @action.bound
  async handleSubmitEmail({ pathArr }) {
    
    
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
      
      const email = lodashGet(this.dataObj, [...pathArr, 'email'], '');
      const emailSource = lodashGet(this.dataObj, [...pathArr, 'emailSource'], '');
      const emailConfirmation = lodashGet(this.dataObj, [...pathArr, 'emailConfirmation'], false);
      
      
      
      
      // ---------------------------------------------
      //   Validations
      // ---------------------------------------------
      
      const validationUsersEmailObj = validationUsersEmail({ required: true, value: email });
      
      
      // ---------------------------------------------
      //   Validation Error
      // ---------------------------------------------
      
      if (validationUsersEmailObj.error) {
        throw new CustomError({ errorsArr: [{ code: '6cFcqgVgL', messageID: 'uwHIKBy7c' }] });
      }
      
      
      
      
      // ---------------------------------------------
      //   メールアドレスが確認済みの場合、送信しない
      // ---------------------------------------------
      
      if (email && emailSource && email === emailSource && emailConfirmation) {
        
        storeLayout.handleSnackbarOpen({
          variant: 'warning',
          messageID: 'DQrBNlhe4',
        });
        
        return;
        
      }
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        email,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v2/db/users/upsert-settings-email`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj)
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
      
      
      
      
      // --------------------------------------------------
      //   emailSource を登録する
      // --------------------------------------------------
      
      lodashSet(this.dataObj, [...pathArr, 'emailSource'], email);
      
      
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'success',
        messageID: 'CquCU7BtA',
      });
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/ur/settings/stores/store.js - handleSubmitEmail
      // `);
      
      // console.log(chalk`
      //   email: {green ${email}}
      //   emailSource: {green ${emailSource}}
      //   emailConfirmation: {green ${emailConfirmation}}
      // `);
      
      
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
  
  
  
  
  /**
   * メールアドレスを削除する
   * @param {Array} pathArr - パス
   */
  @action.bound
  async handleSubmitDeleteEmail({ pathArr }) {
    
    
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
      
      const emailSource = lodashGet(this.dataObj, [...pathArr, 'emailSource'], '');
      
      
      
      
      // ---------------------------------------------
      //   メールアドレスが登録されていない場合、送信しない
      // ---------------------------------------------
      
      if (!emailSource) {
        
        storeLayout.handleSnackbarOpen({
          variant: 'warning',
          messageID: 'a107F1Uxw',
        });
        
        return;
        
      }
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {};
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v2/db/users/delete-settings-email`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj)
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
      
      
      
      
      // --------------------------------------------------
      //   フォームを空にする
      // --------------------------------------------------
      
      lodashSet(this.dataObj, [...pathArr, 'email'], '');
      lodashSet(this.dataObj, [...pathArr, 'emailSource'], '');
      lodashSet(this.dataObj, [...pathArr, 'emailConfirmation'], false);
      
      
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'success',
        messageID: 'hbRy4HpaP',
      });
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/ur/settings/stores/store.js - handleSubmitEmail
      // `);
      
      // console.log(chalk`
      //   email: {green ${email}}
      //   emailSource: {green ${emailSource}}
      //   emailConfirmation: {green ${emailConfirmation}}
      // `);
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        errorObj,
      });
      
      
    } finally {
      
      
      // --------------------------------------------------
      //   ダイアログを非表示にする
      // --------------------------------------------------
      
      lodashSet(this.dataObj, [...pathArr, 'showDialog'], false);
      
      
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
  
  
  
  
  /**
   * 通知設定 - 購読する
   * @param {Array} pathArr - パス
   */
  @action.bound
  async handleSubmitWebPushSubscribe({ pathArr }) {
    
    
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
      //   Subscribe
      // ---------------------------------------------
      
      const subscriptionObj = await storeWebPush.handleWebPushSubscribe();
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        subscriptionObj,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v2/db/users/upsert-settings-web-push`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj)
      });
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      
      
      // ---------------------------------------------
      //   Permission true
      // ---------------------------------------------
      
      lodashSet(this.dataObj, [...pathArr, 'webPushPermission'], true);
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/ur/settings/stores/store.js - handleSubmitWebPushSubscribe
      // `);
      
      // console.log(chalk`
      //   resultSubscribe: {green ${resultSubscribe}}
      // `);
      
      // console.log(`
      //   ----- subscriptionObj -----\n
      //   ${util.inspect(subscriptionObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
    } catch (errorObj) {
      
      
      // console.log(`
      //   ----- errorObj -----\n
      //   ${util.inspect(errorObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        messageID: 'KkWs0oIKw',
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
  
  
  
  
  /**
   * 通知設定 - 購読解除する
   * @param {Array} pathArr - パス
   */
  @action.bound
  async handleSubmitWebPushUnsubscribe({ pathArr }) {
    
    
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
      //   Unsubscribe
      // ---------------------------------------------
      
      const resultUnsubscribe = await storeWebPush.handleWebPushUnsubscribe();
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {};
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v2/db/users/delete-settings-web-push`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj)
      });
      
      
      
      
      // ---------------------------------------------
      //   Permission false
      // ---------------------------------------------
      
      lodashSet(this.dataObj, [...pathArr, 'webPushPermission'], false);
      
      
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'success',
        messageID: 'lJRp1gpPT',
      });
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/ur/settings/stores/store.js - handleSubmitWebPushUnsubscribe
      // `);
      
      // console.log(chalk`
      //   resultUnsubscribe: {green ${resultUnsubscribe}}
      // `);
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        errorObj,
      });
      
      
    } finally {
      
      
      // --------------------------------------------------
      //   ダイアログを非表示にする
      // --------------------------------------------------
      
      lodashSet(this.dataObj, [...pathArr, 'showDialog'], false);
      
      
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
      lodashSet(storeUrSettings, ['dataObj', ...pathArr, 'formPageObj', 'userID'], propsObj.userID);
    }
    
    
    // --------------------------------------------------
    //   pagesObj
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['pagesObj'])) {
      lodashSet(storeUrSettings, ['dataObj', ...pathArr, 'formPageObj', 'pagesObj'], propsObj.pagesObj);
    }
    
    
    // --------------------------------------------------
    //   approval
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['approval'])) {
      lodashSet(storeUrSettings, ['dataObj', ...pathArr, 'formPageObj', 'approval'], propsObj.approval);
    }
    
    
    
    
    // --------------------------------------------------
    //   loginID
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['loginID'])) {
      // console.log(chalk`
      //   propsObj.loginID: {green ${propsObj.loginID}}
      // `);
      lodashSet(storeUrSettings, ['dataObj', ...pathArr, 'formAccountObj', 'loginID'], propsObj.loginID);
    }
    
    
    
    
    // --------------------------------------------------
    //   email
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['email'])) {
      lodashSet(storeUrSettings, ['dataObj', ...pathArr, 'formEmailObj', 'emailSource'], propsObj.email);
      lodashSet(storeUrSettings, ['dataObj', ...pathArr, 'formEmailObj', 'email'], propsObj.email);
    }
    
    
    // --------------------------------------------------
    //   emailConfirmation
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['emailConfirmation'])) {
      lodashSet(storeUrSettings, ['dataObj', ...pathArr, 'formEmailObj', 'emailConfirmation'], propsObj.emailConfirmation);
    }
    
    
    
    
    // --------------------------------------------------
    //   Web Push Permission
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['webPushPermission'])) {
      lodashSet(storeUrSettings, ['dataObj', ...pathArr, 'formWebPushObj', 'webPushPermission'], propsObj.webPushPermission);
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