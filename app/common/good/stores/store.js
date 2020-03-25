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
import moment from 'moment';
import Cookies from 'js-cookie';
import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashHas from 'lodash/has';
import lodashCloneDeep from 'lodash/cloneDeep';
import lodashMerge from 'lodash/merge';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../../../@modules/fetch';
import { CustomError } from '../../../@modules/error/custom';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationForumThreadsName } from '../../../@database/forum-threads/validations/name';
import { validationForumThreadsComment } from '../../../@database/forum-threads/validations/comment';

import { validationForumCommentsName } from '../../../@database/forum-comments/validations/name';
import { validationForumCommentsComment } from '../../../@database/forum-comments/validations/comment';


// --------------------------------------------------
//   Stores
// --------------------------------------------------

// import initStoreData from '../../../@stores/data';
import initStoreLayout from '../../layout/stores/layout';
import initStoreForum from '../../forum/stores/store';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeGood = null;
// let storeData = initStoreData({});
const storeLayout = initStoreLayout({});
const storeForum = initStoreForum({});
      



// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  // ---------------------------------------------
  //   Data
  // ---------------------------------------------
  
  /**
   * データを入れるオブジェクト
   * @type {Object}
   */
  // @observable dataObj = {};
  
  
  /**
   * データを変更する
   * @param {Array} pathArr - パス
   * @param {string} value - 値
   */
  // @action.bound
  // handleEdit({ pathArr, value }) {
  //   lodashSet(this.dataObj, pathArr, value);
  // };
  
  
  
  
  
  
  // ---------------------------------------------
  //   
  // ---------------------------------------------
  
  /**
   * Good ボタンを押したときの処理
   * @param {Array} pathArr - パス
   * @param {string} type - タイプ
   * @param {string} target_id - Goodボタンを押したコンテンツのID
   */
  @action.bound
  async handleSubmitGood({
    
    pathArr,
    goodsPathArr,
    type,
    target_id,
    
  }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisable({ pathArr });
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        type,
        target_id,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        
        urlApi: `${process.env.URL_API}/v2/db/goods/upsert`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj),
        
      });
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      
      
      // ---------------------------------------------
      //   result
      // ---------------------------------------------
      
      const result = lodashGet(resultObj, ['data', 'result'], true);
      
      
      
      
      // ---------------------------------------------
      //   Good
      // ---------------------------------------------
      
      let goods = 0;
      
      if (result) {
        
        goods = lodashGet(storeForum, ['dataObj', ...goodsPathArr, 'goods'], 0) + 1;
        
      } else {
        
        goods = lodashGet(storeForum, ['dataObj', ...goodsPathArr, 'goods'], 0) - 1;
        
      }
      
      lodashSet(storeForum, ['dataObj', ...goodsPathArr, 'goods'], goods);
      
      
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      console.log(`
        ----------------------------------------\n
        /app/common/good/stores/store.js - handleSubmitGood
      `);
      
      console.log(`
        ----- pathArr -----\n
        ${util.inspect(pathArr, { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      console.log(`
        ----- goodsPathArr -----\n
        ${util.inspect(goodsPathArr, { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      console.log(chalk`
        type  : {green ${type}}
        target_id  : {green ${target_id}}
        result  : {green ${result}}
        goods  : {green ${goods}}
      `);
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- lodashGet(storeForum, ['dataObj', ...goodsPathArr], 'AAA') -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(lodashGet(storeForum, ['dataObj', ...goodsPathArr], 'AAA'))), { colors: true, depth: null })}\n
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
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      storeLayout.handleButtonEnable({ pathArr });
      
      
    }
    
    
  };
  
  
}




// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreGood({ propsObj }) {
  
  // console.log('initStoreGood');
  // --------------------------------------------------
  //   Store
  // --------------------------------------------------
  
  if (storeGood === null) {
    storeGood = new Store();
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storeGood;
  
  
}