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

// import { validationUsersLoginID } from '../../../@database/users/validations/login-id';
// import { validationUsersLoginPassword, validationUsersLoginPasswordConfirmation } from '../../../@database/users/validations/login-password';
// import { validationUsersEmail } from '../../../@database/users/validations/email';


// --------------------------------------------------
//   Stores
// --------------------------------------------------

import initStoreData from '../../../@stores/data';
import initStoreLayout from '../../../common/layout/stores/layout';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeUcMember = null;
let storeData = initStoreData({});
let storeLayout = initStoreLayout({});
      



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

export default function initStoreUcMember({ propsObj }) {
  
  
  // --------------------------------------------------
  //   Store
  // --------------------------------------------------
  
  if (storeUcMember === null) {
    storeUcMember = new Store();
  }
  // console.log('initStoreUcMember');
  
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
    //   memberPage
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['memberPage'])) {
      lodashSet(storeUcMember, ['dataObj', ...pathArr, 'memberPage'], propsObj.memberPage);
    }
    
    
    // --------------------------------------------------
    //   memberLimit
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['memberLimit'])) {
      lodashSet(storeUcMember, ['dataObj', ...pathArr, 'memberLimit'], propsObj.memberLimit);
    }
    
    
    // --------------------------------------------------
    //   membersCount
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['membersCount'])) {
      lodashSet(storeUcMember, ['dataObj', ...pathArr, 'membersCount'], propsObj.membersCount);
    }
    
    
    // --------------------------------------------------
    //   cardPlayersForOrderArr
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['cardPlayersForOrderArr'])) {
      lodashSet(storeUcMember, ['dataObj', ...pathArr, 'cardPlayersForOrderArr'], propsObj.cardPlayersForOrderArr);
    }
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   userCommunities_id: {green ${userCommunities_id}}
    // `);
    
    // console.log(`
    //   ----- storeUcMember.dataObj -----\n
    //   ${util.inspect(storeUcMember.dataObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    console.log(`
      ----- storeUcMember.dataObj -----\n
      ${util.inspect(JSON.parse(JSON.stringify(storeUcMember.dataObj)), { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storeUcMember;
  
  
}