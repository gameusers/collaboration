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

let storeUcSettings = null;
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
    //   userCommunityName
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['userCommunityName'])) {
      lodashSet(storeUcSettings, ['dataObj', ...pathArr, 'userCommunityName'], propsObj.userCommunityName);
    }
    
    
    // --------------------------------------------------
    //   userCommunityDescription
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['userCommunityDescription'])) {
      lodashSet(storeUcSettings, ['dataObj', ...pathArr, 'userCommunityDescription'], propsObj.userCommunityDescription);
    }
    
    
    // --------------------------------------------------
    //   userCommunityDescriptionShort
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['userCommunityDescriptionShort'])) {
      lodashSet(storeUcSettings, ['dataObj', ...pathArr, 'userCommunityDescriptionShort'], propsObj.userCommunityDescriptionShort);
    }
    
    
    // --------------------------------------------------
    //   userCommunityID
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['userCommunityID'])) {
      lodashSet(storeUcSettings, ['dataObj', ...pathArr, 'userCommunityID'], propsObj.userCommunityID);
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