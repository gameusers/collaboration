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
import initStoreGameForm from '../../../common/game/stores/form';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeUcSettings = null;
let storeData = initStoreData({});
let storeLayout = initStoreLayout({});
let storeImageAndVideoForm = initStoreImageAndVideoForm({});
let storeGameForm = initStoreGameForm({});
      



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
  
  
  
  
  
  /**
   * ユーザーコミュニティ設定フォームを送信する
   */
  @action.bound
  async handleSubmitSettings({ pathArr }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisable({ pathArr });
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const userCommunities_id = lodashGet(this.dataObj, [...pathArr, 'userCommunities_id'], '');
      const name = lodashGet(this.dataObj, [...pathArr, 'name'], '');
      const description = lodashGet(this.dataObj, [...pathArr, 'description'], '');
      const descriptionShort = lodashGet(this.dataObj, [...pathArr, 'descriptionShort'], '');
      const userCommunityID = lodashGet(this.dataObj, [...pathArr, 'userCommunityID'], '');
      const communityType = lodashGet(this.dataObj, [...pathArr, 'communityType'], '');
      const approval = lodashGet(this.dataObj, [...pathArr, 'approval'], '');
      const anonymity = lodashGet(this.dataObj, [...pathArr, 'anonymity'], '');
      
      const imagesAndVideosObj = storeImageAndVideoForm.handleGetImagesAndVideosObj({ pathArr });
      const imagesAndVideosThumbnailObj = storeImageAndVideoForm.handleGetImagesAndVideosObj({ pathArr: [...pathArr, 'thumbnailObj'] });
      
      const gamesArr = storeGameForm.handleGetGamesArr({ pathArr });
      
      const gameCommunities_idsArr = [];
      
      for (let valueObj of gamesArr.values()) {
        gameCommunities_idsArr.push(valueObj.gameCommunities_id);
      }
      
      
      
      
      // console.log(chalk`
      //   /app/uc/settings/stores/store.js
      //   userCommunities_id: {green ${userCommunities_id}}
      //   name: {green ${name}}
      //   description: {green ${description}}
      //   descriptionShort: {green ${descriptionShort}}
      //   userCommunityID: {green ${userCommunityID}}
      //   communityType: {green ${communityType}}
      //   approval: {green ${approval}}
      //   anonymity: {green ${anonymity}}
      // `);
      
      // console.log(`
      //   ----- imagesAndVideosObj -----\n
      //   ${util.inspect(imagesAndVideosObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- imagesAndVideosThumbnailObj -----\n
      //   ${util.inspect(imagesAndVideosThumbnailObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- gamesArr -----\n
      //   ${util.inspect(gamesArr, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- gameCommunities_idsArr -----\n
      //   ${util.inspect(gameCommunities_idsArr, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        userCommunities_id,
        name,
        description,
        descriptionShort,
        userCommunityID,
        communityType,
        approval,
        anonymity,
        gameCommunities_idsArr,
        imagesAndVideosObj,
        imagesAndVideosThumbnailObj,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/user-communities/upsert-settings`,
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
        messageID: '1DwN0BJVa',
      });
      
      
      // ---------------------------------------------
      //   リロードする
      // ---------------------------------------------
      
      window.location.href = `${process.env.NEXT_PUBLIC_URL_BASE}uc/${userCommunityID}/settings`;
      
      
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

export default function initStoreUcSettings({ propsObj }) {
  
  
  // --------------------------------------------------
  //   Store
  // --------------------------------------------------
  
  if (storeUcSettings === null) {
    storeUcSettings = new Store();
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
    //   ----- pathArr -----\n
    //   ${util.inspect(pathArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   userCommunities_id
    // --------------------------------------------------
    
    // console.log(chalk`
    //   /app/uc/settings/stores/store.js
    //   propsObj.userCommunities_id: {green ${propsObj.userCommunities_id}}
    // `);
    
    if (lodashHas(propsObj, ['userCommunities_id'])) {
      lodashSet(storeUcSettings, ['dataObj', ...pathArr, 'userCommunities_id'], propsObj.userCommunities_id);
    }
    
    
    // --------------------------------------------------
    //   name
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['name'])) {
      lodashSet(storeUcSettings, ['dataObj', ...pathArr, 'name'], propsObj.name);
    }
    
    
    // --------------------------------------------------
    //   description
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['description'])) {
      lodashSet(storeUcSettings, ['dataObj', ...pathArr, 'description'], propsObj.description);
    }
    
    
    // --------------------------------------------------
    //   descriptionShort
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['descriptionShort'])) {
      lodashSet(storeUcSettings, ['dataObj', ...pathArr, 'descriptionShort'], propsObj.descriptionShort);
    }
    
    
    // --------------------------------------------------
    //   userCommunityID
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['userCommunityID'])) {
      lodashSet(storeUcSettings, ['dataObj', ...pathArr, 'userCommunityID'], propsObj.userCommunityID);
    }
    
    
    // --------------------------------------------------
    //   communityType
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['communityType'])) {
      lodashSet(storeUcSettings, ['dataObj', ...pathArr, 'communityType'], propsObj.communityType);
    }
    
    
    // --------------------------------------------------
    //   anonymity
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['anonymity'])) {
      lodashSet(storeUcSettings, ['dataObj', ...pathArr, 'anonymity'], propsObj.anonymity);
    }
    
    
    // --------------------------------------------------
    //   approval
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['approval'])) {
      lodashSet(storeUcSettings, ['dataObj', ...pathArr, 'approval'], propsObj.approval);
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
  
  return storeUcSettings;
  
  
}