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
import lodashCloneDeep from 'lodash/cloneDeep';
import lodashMerge from 'lodash/merge';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../../../@modules/fetch';
import { CustomError } from '../../../@modules/error/custom';


// --------------------------------------------------
//   Stores
// --------------------------------------------------

import initStoreLayout from '../../layout/stores/layout';
import initStoreForum from '../../forum/stores/store';
import initStoreGcRecruitment from '../../../gc/rec/stores/store';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeGood = null;
const storeLayout = initStoreLayout({});
const storeForum = initStoreForum({});
const storeGcRecruitment = initStoreGcRecruitment({});
      



// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  /**
   * Good ボタンを押したときの処理
   * @param {Array} pathArr - パス
   * @param {Array} goodsPathArr - グッド数を更新するためのパス
   * @param {string} type - タイプ / forumComment / forumReply / recruitmentComment / recruitmentReply
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
      
      // const result = true;
      
      // ---------------------------------------------
      //   更新するストアを選択
      // ---------------------------------------------
      
      let store = '';
      
      if (type === 'forumComment' || type === 'forumReply') {
        
        store = storeForum;
        
      } else if (type === 'recruitmentComment' || type === 'recruitmentReply') {
        
        store = storeGcRecruitment;
        
      }
      
      
      // ---------------------------------------------
      //   Good 数更新
      // ---------------------------------------------
      
      let goods = 0;
      
      if (result) {
        
        goods = lodashGet(store, ['dataObj', ...goodsPathArr, 'goods'], 0) + 1;
        
      } else {
        
        goods = lodashGet(store, ['dataObj', ...goodsPathArr, 'goods'], 0) - 1;
        
      }
      
      lodashSet(store, ['dataObj', ...goodsPathArr, 'goods'], goods);
      
      
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/common/good/stores/store.js - handleSubmitGood
      // `);
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(pathArr, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- goodsPathArr -----\n
      //   ${util.inspect(goodsPathArr, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   type  : {green ${type}}
      //   target_id  : {green ${target_id}}
      //   result  : {green ${result}}
      //   goods  : {green ${goods}}
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