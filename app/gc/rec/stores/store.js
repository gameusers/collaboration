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
import lodashMerge from 'lodash/merge';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../../../@modules/fetch';
import { CustomError } from '../../../@modules/error/custom';


// --------------------------------------------------
//   Stores
// --------------------------------------------------

import initStoreData from '../../../@stores/data';
import initStoreLayout from '../../../common/layout/stores/layout';
import initStoreForm from '../../../common/form/stores/store';
import initStoreImageAndVideoForm from '../../../common/image-and-video/stores/form';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeGcRecruitment = null;
let storeData = initStoreData({});
let storeLayout = initStoreLayout({});
let storeForm = initStoreForm({});
let storeImageAndVideoForm = initStoreImageAndVideoForm({});




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
  @observable dataObj = {};
  
  
  /**
   * データを変更する
   * @param {Array} pathArr - パス
   * @param {string} value - 値
   */
  @action.bound
  handleEdit({ pathArr, value }) {
    lodashSet(this.dataObj, pathArr, value);
  };
  
  
  
  
  
  
  // ---------------------------------------------
  //   function
  // ---------------------------------------------
  
  /**
   * 募集を投稿する
   * @param {Object} eventObj - イベント
   * @param {Array} pathArr - パス
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} recruitmentThreads_id - DB recruitment-threads _id / 募集スレッドのID
   */
  @action.bound
  async handleRecruitment({
    
    eventObj,
    pathArr,
    gameCommunities_id,
    recruitmentThreads_id,
    
  }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   フォームの送信処理停止
      // ---------------------------------------------
      
      eventObj.preventDefault();
      
      
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const hardwaresArr = lodashGet(storeForm, ['dataObj', ...pathArr, 'hardwaresArr'], []);
      
      const hardwareIDsArr = [];
      
      for (let valueObj of hardwaresArr.values()) {
        hardwareIDsArr.push(valueObj.hardwareID);
      }
      
      const category = lodashGet(this.dataObj, [...pathArr, 'category'], 1);
      const title = lodashGet(this.dataObj, [...pathArr, 'title'], '');
      const name = lodashGet(this.dataObj, [...pathArr, 'name'], '');
      const comment = lodashGet(this.dataObj, [...pathArr, 'comment'], '');
      const imagesAndVideosObj = lodashGet(storeImageAndVideoForm, ['dataObj', ...pathArr, 'imagesAndVideosObj'], {});
      
      const hardware1 = lodashGet(this.dataObj, [...pathArr, 'hardware1'], 'none');
      const hardware2 = lodashGet(this.dataObj, [...pathArr, 'hardware2'], 'none');
      const hardware3 = lodashGet(this.dataObj, [...pathArr, 'hardware3'], 'none');
      
      const id1 = lodashGet(this.dataObj, [...pathArr, 'id1'], '');
      const id2 = lodashGet(this.dataObj, [...pathArr, 'id2'], '');
      const id3 = lodashGet(this.dataObj, [...pathArr, 'id3'], '');
      
      const informationTitle1 = lodashGet(this.dataObj, [...pathArr, 'informationTitle1'], '');
      const informationTitle2 = lodashGet(this.dataObj, [...pathArr, 'informationTitle2'], '');
      const informationTitle3 = lodashGet(this.dataObj, [...pathArr, 'informationTitle3'], '');
      const informationTitle4 = lodashGet(this.dataObj, [...pathArr, 'informationTitle4'], '');
      const informationTitle5 = lodashGet(this.dataObj, [...pathArr, 'informationTitle5'], '');
      
      const information1 = lodashGet(this.dataObj, [...pathArr, 'information1'], '');
      const information2 = lodashGet(this.dataObj, [...pathArr, 'information2'], '');
      const information3 = lodashGet(this.dataObj, [...pathArr, 'information3'], '');
      const information4 = lodashGet(this.dataObj, [...pathArr, 'information4'], '');
      const information5 = lodashGet(this.dataObj, [...pathArr, 'information5'], '');
      
      const openType = lodashGet(this.dataObj, [...pathArr, 'openType'], 1);
      
      const deadlineDate = lodashGet(this.dataObj, [...pathArr, 'deadlineDate'], '');
      
      const twitter = lodashGet(this.dataObj, [...pathArr, 'twitter'], false);
      const webPush = lodashGet(this.dataObj, [...pathArr, 'webPush'], false);
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      console.log(`
        ----------------------------------------\n
        /app/gc/rec/stores/store.js / handleRecruitment
      `);
      
      console.log(`
        ----- pathArr -----\n
        ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      console.log(`
        ----- hardwareIDsArr -----\n
        ${util.inspect(JSON.parse(JSON.stringify(hardwareIDsArr)), { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      console.log(chalk`
        gameCommunities_id: {green ${gameCommunities_id}}
        recruitmentThreads_id: {green ${recruitmentThreads_id}}
        category: {green ${category}}
        title: {green ${title}}
        name: {green ${name}}
        comment: {green ${comment}}
      `);
      
      console.log(`
        ----- imagesAndVideosObj -----\n
        ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosObj)), { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      console.log(chalk`
        hardware1: {green ${hardware1}}
        id1: {green ${id1}}
        hardware2: {green ${hardware2}}
        id2: {green ${id2}}
        hardware3: {green ${hardware3}}
        id3: {green ${id3}}
        
        informationTitle1: {green ${informationTitle1}}
        information1: {green ${information1}}
        informationTitle2: {green ${informationTitle2}}
        information2: {green ${information2}}
        informationTitle3: {green ${informationTitle3}}
        information3: {green ${information3}}
        informationTitle4: {green ${informationTitle4}}
        information4: {green ${information4}}
        informationTitle5: {green ${informationTitle5}}
        information5: {green ${information5}}
        
        openType: {green ${openType}}
        
        deadlineDate: {green ${deadlineDate}}
      `);
      
      console.log(chalk`
        twitter: {green ${twitter}}
        webPush: {green ${webPush}}
      `);
      
      return;
      
      
      
      
      // ---------------------------------------------
      //   Loading 表示
      // ---------------------------------------------
      
      storeLayout.handleLoadingShow({});
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisable({ pathArr });
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        gameCommunities_id,
        recruitmentThreads_id,
        
      };
      
      if (Object.keys(imagesAndVideosObj).length !== 0) {
        formDataObj.imagesAndVideosObj = imagesAndVideosObj;
      }
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      // const resultObj = await fetchWrapper({
        
      //   urlApi: `${process.env.URL_API}/v2/db/recruitment-threads/upsert`,
      //   methodType: 'POST',
      //   formData: JSON.stringify(formDataObj),
        
      // });
      
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      // if ('errorsArr' in resultObj) {
      //   throw new CustomError({ errorsArr: resultObj.errorsArr });
      // }
      
      
      
      
      // // ---------------------------------------------
      // //   メンバー読み込み
      // // ---------------------------------------------
      
      // const page = lodashGet(this.dataObj, [...pathArr, 'membersObj', 'page'], 1);
      
      // this.handleReadMembers({
      //   pathArr,
      //   pathname,
      //   userCommunities_id,
      //   page,
      //   forceReload: true,
      // });
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/uc/member/stores/store.js / handleMembers
      // `);
      
      // console.log(chalk`
      //   userCommunities_id: {green ${userCommunities_id}}
      //   managedUsers_id: {green ${managedUsers_id}}
      //   type: {green ${type}}
      // `);
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
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

export default function initStoreGcRecruitment({ propsObj }) {
  
  
  // --------------------------------------------------
  //   Store
  // --------------------------------------------------
  
  if (storeGcRecruitment === null) {
    storeGcRecruitment = new Store();
  }
  
  
  // --------------------------------------------------
  //   Props
  // --------------------------------------------------
  
  if (propsObj) {
    
    
    // --------------------------------------------------
    //   gameCommunities_id
    // --------------------------------------------------
    
    const gameCommunities_id = lodashGet(propsObj, ['gameCommunities_id'], '');
    
    
    // --------------------------------------------------
    //   recruitmentThreadsObj
    // --------------------------------------------------
    
    const recruitmentThreadsObj = lodashGet(propsObj, ['recruitmentThreadsObj'], null);
    
    if (recruitmentThreadsObj) {
      lodashSet(storeGcRecruitment, ['dataObj', gameCommunities_id, 'recruitmentThreadsObj'], recruitmentThreadsObj);
    }
    
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storeGcRecruitment;
  
  
}