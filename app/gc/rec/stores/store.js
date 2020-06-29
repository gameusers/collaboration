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

import Router from 'next/router';
import { action, observable } from 'mobx';
import moment from 'moment';
import Cookies from 'js-cookie';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashHas from 'lodash/has';
import lodashCloneDeep from 'lodash/cloneDeep';
import lodashMerge from 'lodash/merge';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from 'app/@modules/fetch.js';
import { CustomError } from 'app/@modules/error/custom.js';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationBoolean } from 'app/@validations/boolean.js';
import { validationHandleName } from 'app/@validations/name.js';

import { validationRecruitmentThreadsCategory } from 'app/@database/recruitment-threads/validations/category.js';
import { validationRecruitmentThreadsTitle } from 'app/@database/recruitment-threads/validations/title.js';

import { validationRecruitmentThreadsComment } from 'app/@database/recruitment-threads/validations/comment.js';
import { validationRecruitmentThreadsPlatform, validationRecruitmentThreadsID, validationRecruitmentThreadsInformationTitle, validationRecruitmentThreadsInformation, validationRecruitmentThreadsPublicSetting } from 'app/@database/recruitment-threads/validations/ids-informations.js';
import { validationRecruitmentThreadsDeadlineDate } from 'app/@database/recruitment-threads/validations/deadline.js';


// --------------------------------------------------
//   Stores
// --------------------------------------------------

import initStoreData from 'app/@stores/data.js';
import initStoreWebPush from 'app/@stores/web-push.js';
import initStoreLayout from 'app/common/layout/stores/layout.js';
import initStoreHardware from 'app/common/hardware/stores/store.js';
import initStoreIDForm from 'app/common/id/stores/form.js';
import initStoreImageAndVideoForm from 'app/common/image-and-video/stores/form.js';

let storeGcRecruitment = null;
const storeData = initStoreData({});
const storeWebPush = initStoreWebPush({});
const storeLayout = initStoreLayout({});
const storeHardware = initStoreHardware({});
const storeIDForm = initStoreIDForm({});
const storeImageAndVideoForm = initStoreImageAndVideoForm({});






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
  //   Navigation - Form
  // ---------------------------------------------
  
  /**
   * カテゴリーをチェックしたときに呼び出す
   * @param {Array} pathArr - パス
   * @param {string} value - 値
   */
  // @action.bound
  // handleNavigationFormSearchCategory({
    
  //   pathArr,
  //   value,
    
  // }) {
    
    
  //   // --------------------------------------------------
  //   //   配列を取得
  //   // --------------------------------------------------
    
  //   let categoriesArr = lodashGet(this.dataObj, [...pathArr, 'categoriesArr'], []);
    
    
  //   // --------------------------------------------------
  //   //   配列に存在しない場合は追加、存在する場合は削除
  //   // --------------------------------------------------
    
  //   if (categoriesArr.indexOf(value) === -1) {
      
  //     categoriesArr.push(value);
      
  //   } else {
      
  //     const newArr = categoriesArr.filter(number => number !== value);
  //     categoriesArr = newArr;
      
  //   }
    
    
  //   // --------------------------------------------------
  //   //   数字の昇順に並び替え
  //   // --------------------------------------------------
    
  //   categoriesArr = categoriesArr.slice().sort((a, b) => {
  //     return a - b;
  //   });
    
    
  //   // --------------------------------------------------
  //   //   更新
  //   // --------------------------------------------------
    
  //   lodashSet(this.dataObj, [...pathArr, 'categoriesArr'], categoriesArr);
    
    
  //   // console.log(`
  //   //   ----- categoriesArr -----\n
  //   //   ${util.inspect(JSON.parse(JSON.stringify(categoriesArr)), { colors: true, depth: null })}\n
  //   //   --------------------\n
  //   // `);
    
  //   // console.log(chalk`
  //   //   value: {green ${value}}
  //   // `);
    
  // };
  
  
  
  
  
  
  // ---------------------------------------------
  //   Read
  // ---------------------------------------------
  
  /**
   * スレッドを読み込む / 募集を検索する
   * @param {Array} pathArr - パス
   * @param {string} urlID - ゲームのURLになるID　例）Dead-by-Daylight
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティID
   * @param {number} page - スレッドのページ
   * @param {number} changeLimit - 1ページに表示する件数を変更する場合、値を入力する
   */
  @action.bound
  async handleReadRecruitmentThreads({
    
    pathArr,
    urlID,
    gameCommunities_id,
    page,
    changeLimit,
    
  }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   For Search
      // ---------------------------------------------
      
      const pathNavigationArr = [gameCommunities_id, 'recruitment', 'navigation'];
      
      const hardwaresArr = lodashGet(storeHardware, ['dataObj', ...pathNavigationArr, 'hardwaresArr'], []);
      const hardwareIDsArr = [];
      
      for (let valueObj of hardwaresArr.values()) {
        hardwareIDsArr.push(valueObj.hardwareID);
      }
      
      const categoriesArr = lodashGet(this.dataObj, [...pathNavigationArr, 'categoriesArr'], []);
      const keyword = lodashGet(this.dataObj, [...pathNavigationArr, 'keyword'], '');
      
      
      // ---------------------------------------------
      //   Router.push 用
      // ---------------------------------------------
      
      const urlHardwares = hardwareIDsArr.length > 0 ? `hardwares=${hardwareIDsArr.join(',')}&` : '';
      const urlCategories = categoriesArr.length > 0 ? `categories=${categoriesArr.join(',')}&` : '';
      const urlKeyword = keyword ? `keyword=${encodeURI(keyword)}&` : '';
      
      let url = `/gc/[urlID]/rec/[...slug]?urlID=${urlID}${urlHardwares}${urlCategories}${urlKeyword}page=${page}`;
      let as = `/gc/${urlID}/rec/search?${urlHardwares}${urlCategories}${urlKeyword}page=${page}`;
      
      if (!urlHardwares && !urlCategories && !urlKeyword) {
        
        if (page === 1) {
          
          url = `/gc/[urlID]/rec/index?urlID=${urlID}&page=${page}`;
          as = `/gc/${urlID}/rec`;
          
        } else {
          
          url = `/gc/[urlID]/rec/[...slug]?urlID=${urlID}&page=${page}`;
          as = `/gc/${urlID}/rec/${page}`;
          
        }
        
      }
      
      
      
      
      // ---------------------------------------------
      //   Change Limit / Set Cookie
      // ---------------------------------------------
      
      if (changeLimit) {
        
        Cookies.set('recruitmentThreadLimit', changeLimit);
        
        // console.log(chalk`
        //   changeLimit: {green ${changeLimit}}
        // `);
        
      }
      
      
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/gc/rec/stores/store.js - handleReadRecruitmentThreads
      // `);
      
      // console.log(`
      //   ----- recruitmentObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(recruitmentObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   urlHardwares: {green ${urlHardwares}}
      //   urlCategories: {green ${urlCategories}}
      //   urlKeyword: {green ${urlKeyword}}
      //   url: {green ${url}}
      //   as: {green ${as}}
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   page: {green ${page}}
      //   loadedDate: {green ${loadedDate}}
      //   changeLimit：{green ${changeLimit}}
      // `);
      
      // console.log(`
      //   ----- hardwareIDsArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(hardwareIDsArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- categoriesArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(categoriesArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   keyword: {green ${keyword}}
      // `);
      
      // console.log(`
      //   ----- arr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // return;
      
      
      // ---------------------------------------------
      //   Router.push = History API pushState()
      // ---------------------------------------------
      
      // Router.push(url, as, { shallow: true });
      await Router.push(url, as);
      
      
      // ---------------------------------------------
      //   Scroll
      // ---------------------------------------------
      
      if (page === 1) {
        
        storeLayout.handleScrollTo({
          
          to: 'recruitmentThreads',
          duration: 0,
          delay: 0,
          smooth: 'easeInOutQuart',
          offset: -50,
          
        });
        
      }
      
      
    } catch (errorObj) {
      
      
      
    } finally {
      
      
      
    }
    
    
  };
  
  
  
  
  /**
   * コメントを読み込む
   * @param {Array} pathArr - パス
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティID
   * @param {string} recruitmentThreads_id - DB recruitment-threads _id / スレッドID
   * @param {number} page - コメントのページ
   * @param {number} changeLimit - 1ページに表示する件数を変更する場合、値を入力する
   */
  @action.bound
  async handleReadRecruitmentComments({
    
    pathArr,
    gameCommunities_id,
    recruitmentThreads_id,
    page,
    changeLimit,
    
  }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const recruitmentObj = lodashGet(this.dataObj, [gameCommunities_id], {});
      const clonedObj = lodashCloneDeep(recruitmentObj);
      
      const loadedDate = lodashGet(recruitmentObj, ['recruitmentCommentsObj ', recruitmentThreads_id, `page${page}Obj`, 'loadedDate'], '');
      const arr = lodashGet(recruitmentObj, ['recruitmentCommentsObj', recruitmentThreads_id, `page${page}Obj`, 'arr'], []);
      const reloadComments = lodashGet(recruitmentObj, ['reloadComments'], false);
      
      const threadLimit = parseInt((storeData.getCookie({ key: 'recruitmentThreadLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_THREAD_LIMIT), 10);
      let commentLimit = parseInt((storeData.getCookie({ key: 'recruitmentCommentLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_COMMENT_LIMIT), 10);
      const replyLimit = parseInt((storeData.getCookie({ key: 'recruitmentReplyLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_REPLY_LIMIT), 10);
      
      
      
      
      // ---------------------------------------------
      //   Change Limit
      // ---------------------------------------------
      
      if (changeLimit) {
        
        
        commentLimit = changeLimit;
        
        
        // ---------------------------------------------
        //   Set Cookie - recruitmentCommentLimit
        // ---------------------------------------------
        
        Cookies.set('recruitmentCommentLimit', changeLimit);
        
        
      }
      
      
      
      
      // ---------------------------------------------
      //   再読込するかどうか
      // ---------------------------------------------
      
      let reload = false;
      
      
      // ---------------------------------------------
      //   1ページに表示する件数を変更した場合、再読込
      // ---------------------------------------------
      
      if (changeLimit || reloadComments) {
        
        
        // ---------------------------------------------
        //   スレッド＆コメント　次回の読み込み時に強制リロード
        // ---------------------------------------------
        
        lodashSet(clonedObj, ['reloadThreads'], true);
        lodashSet(clonedObj, ['reloadComments'], false);
        
        
        // ---------------------------------------------
        //   再読込
        // ---------------------------------------------
        
        reload = true;
        
      
      // ---------------------------------------------
      //   最後の読み込み以降に募集の更新があった場合
      //   または最後の読み込みからある程度時間（10分）が経っていた場合、再読込する
      // ---------------------------------------------
        
      } else if (loadedDate) {
        
        const recruitmentUpdatedDate = lodashGet(recruitmentObj, ['updatedDateObj', 'recruitment'], '0000-01-01T00:00:00Z');
        
        const datetimeLoaded = moment(loadedDate).utcOffset(0);
        const datetimeRecruitmentUpdated = moment(recruitmentUpdatedDate).utcOffset(0);
        const datetimeNow = moment().utcOffset(0);
        const datetimeReloadLimit = moment(loadedDate).add(process.env.NEXT_PUBLIC_RECRUITMENT_RELOAD_MINUTES, 'm').utcOffset(0);
        
        if (
          datetimeRecruitmentUpdated.isAfter(datetimeLoaded) ||
          datetimeNow.isAfter(datetimeReloadLimit)
        ) {
          reload = true;
        }
        
      }
      
      
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      // console.log(`
      //   ----- recruitmentObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(recruitmentObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- arr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
      //   page: {green ${page}}
      //   threadLimit: {green ${threadLimit}}
      //   commentLimit: {green ${commentLimit}}
      //   replyLimit: {green ${replyLimit}}
      //   loadedDate: {green ${loadedDate}}
      //   changeLimit：{green ${changeLimit}}
      // `);
      
      // console.log(chalk`
      //   reload: {green ${reload}}
      // `);
      
      
      
      
      // ---------------------------------------------
      //   すでにデータを読み込んでいる場合は、ストアのデータを表示する
      // ---------------------------------------------
      
      if (!reload && arr.length > 0) {
        
        
        console.log('store');
        
        
        // ---------------------------------------------
        //   Page 更新
        // ---------------------------------------------
        
        lodashSet(clonedObj, ['recruitmentCommentsObj', recruitmentThreads_id, 'page'], page);
        
        this.handleEdit({
          pathArr: [gameCommunities_id],
          value: clonedObj
        });
        
        
        // ---------------------------------------------
        //   Return
        // ---------------------------------------------
        
        return;
        
        
      }
      
      console.log('fetch');
      
      
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisable({ pathArr });
      
      
      
      
      // ---------------------------------------------
      //   recruitmentThreads_idsArr
      // ---------------------------------------------
      
      let recruitmentThreads_idsArr = [recruitmentThreads_id];
      
      // 表示件数を変更する場合は他のスレッドも一緒に更新するため、現在表示されているスレッドのIDを取得する
      if (changeLimit) {
        
        const recruitmentThreadsObj = lodashGet(recruitmentObj, ['recruitmentThreadsObj'], {});
        const recruitmentThreadsPage = lodashGet(recruitmentThreadsObj, ['page'], 1);
        recruitmentThreads_idsArr = lodashGet(recruitmentThreadsObj, [`page${recruitmentThreadsPage}Obj`, 'arr'], []);
        
      }
      
      
      // console.log(`
      //   ----- recruitmentThreads_idsArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(recruitmentThreads_idsArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        gameCommunities_id,
        recruitmentThreads_idsArr,
        threadPage: 1,
        threadLimit,
        commentPage: page,
        commentLimit,
        replyPage: 1,
        replyLimit,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/recruitment-comments/read-comments`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj),
        
      });
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      
      // ---------------------------------------------
      //   recruitmentThreadsDataObj - dataObj / [データオブジェクトのみ]
      // ---------------------------------------------
      
      const recruitmentThreadsOldDataObj = lodashGet(recruitmentObj, ['recruitmentThreadsObj', 'dataObj'], {});
      const recruitmentThreadsNewDataObj = lodashGet(resultObj, ['data', 'recruitmentThreadsObj', 'dataObj'], {});
      
      // スレッドはデータオブジェクトのみ古いデータと新しいデータをマージする
      const recruitmentThreadsMergedDataObj = lodashMerge(recruitmentThreadsOldDataObj, recruitmentThreadsNewDataObj);
      
      lodashSet(clonedObj, ['recruitmentThreadsObj', 'dataObj'], recruitmentThreadsMergedDataObj);
      
      
      // ---------------------------------------------
      //   recruitmentCommentsObj
      // ---------------------------------------------
      
      const recruitmentCommentsOldObj = lodashGet(recruitmentObj, ['recruitmentCommentsObj'], {});
      const recruitmentCommentsNewObj = lodashGet(resultObj, ['data', 'recruitmentCommentsObj'], {});
      
      // 再読込する場合は新しいデータに置き換える、再読込しない場合は古いデータと新しいデータをマージする
      const recruitmentCommentsMergedObj = reload ? recruitmentCommentsNewObj : lodashMerge(recruitmentCommentsOldObj, recruitmentCommentsNewObj);
      
      clonedObj.recruitmentCommentsObj = recruitmentCommentsMergedObj;
      
      
      // ---------------------------------------------
      //   recruitmentRepliesObj
      // ---------------------------------------------
      
      const recruitmentRepliesOldObj = lodashGet(recruitmentObj, ['recruitmentRepliesObj'], {});
      const recruitmentRepliesNewObj = lodashGet(resultObj, ['data', 'recruitmentRepliesObj'], {});
      
      // 再読込する場合は新しいデータに置き換える、再読込しない場合は古いデータと新しいデータをマージする
      const recruitmentRepliesMergedObj = reload ? recruitmentRepliesNewObj : lodashMerge(recruitmentRepliesOldObj, recruitmentRepliesNewObj);
      
      clonedObj.recruitmentRepliesObj = recruitmentRepliesMergedObj;
      
      
      
      
      // ---------------------------------------------
      //   Page
      // ---------------------------------------------
      
      lodashSet(clonedObj, ['recruitmentCommentsObj', recruitmentThreads_id, 'page'], page);
      
      
      // --------------------------------------------------
      //   Community UpdatedDateObj
      // --------------------------------------------------
      
      const updatedDateObj = lodashGet(resultObj, ['data', 'updatedDateObj'], {});
      clonedObj.updatedDateObj = updatedDateObj;
      
      
      
      
      // ---------------------------------------------
      //   Update
      // ---------------------------------------------
      
      this.handleEdit({
        pathArr: ['recruitmentCommentLimit'],
        value: commentLimit,
      });
      
      this.handleEdit({
        pathArr: [gameCommunities_id],
        value: clonedObj
      });
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      // storeLayout.handleSnackbarOpen({
      //   variant: 'error',
      //   errorObj,
      // });
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      storeLayout.handleButtonEnable({ pathArr });
      
      
      // ---------------------------------------------
      //   Scroll
      // ---------------------------------------------
      
      storeLayout.handleScrollTo({
        
        to: pathArr.join('-'),
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
        
      });
      
      
    }
    
    
  };
  
  
  
  
  /**
   * 返信を読み込む
   * @param {Array} pathArr - パス
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティID
   * @param {string} recruitmentComments_id - DB recruitment-comments _id / コメントID
   * @param {number} page - 返信のページ
   * @param {number} changeLimit - 1ページに表示する件数を変更する場合、値を入力する
   */
  @action.bound
  async handleReadRecruitmentReplies({
    
    pathArr,
    gameCommunities_id,
    recruitmentComments_id,
    page,
    changeLimit,
    
  }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const recruitmentObj = lodashGet(this.dataObj, [gameCommunities_id], {});
      const clonedObj = lodashCloneDeep(recruitmentObj);
      
      const loadedDate = lodashGet(recruitmentObj, ['recruitmentRepliesObj ', recruitmentComments_id, `page${page}Obj`, 'loadedDate'], '');
      const arr = lodashGet(recruitmentObj, ['recruitmentRepliesObj', recruitmentComments_id, `page${page}Obj`, 'arr'], []);
      // const reloadComments = lodashGet(recruitmentObj, ['reloadComments'], false);
      
      // const threadLimit = parseInt((storeData.getCookie({ key: 'recruitmentThreadLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_THREAD_LIMIT), 10);
      const commentLimit = parseInt((storeData.getCookie({ key: 'recruitmentCommentLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_COMMENT_LIMIT), 10);
      let replyLimit = parseInt((storeData.getCookie({ key: 'recruitmentReplyLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_REPLY_LIMIT), 10);
      
      
      
      
      // ---------------------------------------------
      //   Change Limit
      // ---------------------------------------------
      
      if (changeLimit) {
        
        
        replyLimit = changeLimit;
        
        
        // ---------------------------------------------
        //   Set Cookie - recruitmentReplyLimit
        // ---------------------------------------------
        
        Cookies.set('recruitmentReplyLimit', changeLimit);
        
        
      }
      
      
      
      
      // ---------------------------------------------
      //   再読込するかどうか
      // ---------------------------------------------
      
      let reload = false;
      
      
      // ---------------------------------------------
      //   1ページに表示する件数を変更した場合、再読込
      // ---------------------------------------------
      
      if (changeLimit) {
        
        
        // ---------------------------------------------
        //   スレッド＆コメント　次回の読み込み時に強制リロード
        // ---------------------------------------------
        
        lodashSet(clonedObj, ['reloadThreads'], true);
        lodashSet(clonedObj, ['reloadComments'], false);
        
        
        // ---------------------------------------------
        //   再読込
        // ---------------------------------------------
        
        reload = true;
        
      
      // ---------------------------------------------
      //   最後の読み込み以降に募集の更新があった場合
      //   または最後の読み込みからある程度時間（10分）が経っていた場合、再読込する
      // ---------------------------------------------
        
      } else if (loadedDate) {
        
        const recruitmentUpdatedDate = lodashGet(recruitmentObj, ['updatedDateObj', 'recruitment'], '0000-01-01T00:00:00Z');
        
        const datetimeLoaded = moment(loadedDate).utcOffset(0);
        const datetimeRecruitmentUpdated = moment(recruitmentUpdatedDate).utcOffset(0);
        const datetimeNow = moment().utcOffset(0);
        const datetimeReloadLimit = moment(loadedDate).add(process.env.NEXT_PUBLIC_RECRUITMENT_RELOAD_MINUTES, 'm').utcOffset(0);
        
        if (datetimeRecruitmentUpdated.isAfter(datetimeLoaded) || datetimeNow.isAfter(datetimeReloadLimit)) {
          reload = true;
        }
        
      }
      
      
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      // console.log(`
      //   ----- recruitmentObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(recruitmentObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- arr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   recruitmentComments_id: {green ${recruitmentComments_id}}
      //   page: {green ${page}}
      //   commentLimit: {green ${commentLimit}}
      //   replyLimit: {green ${replyLimit}}
      //   loadedDate: {green ${loadedDate}}
      //   changeLimit：{green ${changeLimit}}
      // `);
      
      // console.log(chalk`
      //   reload: {green ${reload}}
      // `);
      
      
      
      
      // ---------------------------------------------
      //   すでにデータを読み込んでいる場合は、ストアのデータを表示する
      // ---------------------------------------------
      
      if (!reload && arr.length > 0) {
        
        
        console.log('store');
        
        
        // ---------------------------------------------
        //   Page 更新
        // ---------------------------------------------
        
        lodashSet(clonedObj, ['recruitmentRepliesObj', recruitmentComments_id, 'page'], page);
        
        this.handleEdit({
          pathArr: [gameCommunities_id],
          value: clonedObj
        });
        
        
        // ---------------------------------------------
        //   Return
        // ---------------------------------------------
        
        return;
        
        
      }
      
      console.log('fetch');
      
      
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisable({ pathArr });
      
      
      
      
      // ---------------------------------------------
      //   recruitmentComments_idsArr
      // ---------------------------------------------
      
      let recruitmentComments_idsArr = [recruitmentComments_id];
      
      // 表示件数を変更する場合は他のスレッドも一緒に更新するため、現在表示されているスレッドのIDを取得する
      if (changeLimit) {
        
        const recruitmentThreadsObj = lodashGet(recruitmentObj, ['recruitmentThreadsObj'], {});
        const recruitmentThreadsPage = lodashGet(recruitmentThreadsObj, ['page'], 1);
        const recruitmentThreads_idsArr = lodashGet(recruitmentThreadsObj, [`page${recruitmentThreadsPage}Obj`, 'arr'], []);
        
        
        recruitmentComments_idsArr = [];
        
        for (let recruitmentThreads_id of recruitmentThreads_idsArr.values()) {
          
          const recruitmentCommentsPage = lodashGet(recruitmentObj, ['recruitmentCommentsObj', recruitmentThreads_id, 'page'], 1);
          const tempRecruitmentComments_idsArr = lodashGet(recruitmentObj, ['recruitmentCommentsObj', recruitmentThreads_id, `page${recruitmentCommentsPage}Obj`, 'arr'], []);
          
          recruitmentComments_idsArr = recruitmentComments_idsArr.concat(tempRecruitmentComments_idsArr);
          
        }
        
      }
      
      
      // console.log(`
      //   ----- recruitmentComments_idsArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(recruitmentComments_idsArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        gameCommunities_id,
        recruitmentComments_idsArr,
        commentPage: 1,
        commentLimit,
        replyPage: page,
        replyLimit,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/recruitment-replies/read-replies`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj),
        
      });
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      
      // ---------------------------------------------
      //   recruitmentRepliesObj
      // ---------------------------------------------
      
      const recruitmentRepliesOldObj = lodashGet(recruitmentObj, ['recruitmentRepliesObj'], {});
      const recruitmentRepliesNewObj = lodashGet(resultObj, ['data', 'recruitmentRepliesObj'], {});
      
      // 再読込する場合は新しいデータに置き換える、再読込しない場合は古いデータと新しいデータをマージする
      const recruitmentRepliesMergedObj = reload ? recruitmentRepliesNewObj : lodashMerge(recruitmentRepliesOldObj, recruitmentRepliesNewObj);
      
      clonedObj.recruitmentRepliesObj = recruitmentRepliesMergedObj;
      
      
      
      
      // ---------------------------------------------
      //   Page
      // ---------------------------------------------
      
      lodashSet(clonedObj, ['recruitmentRepliesObj', recruitmentComments_id, 'page'], page);
      
      
      // --------------------------------------------------
      //   Community UpdatedDateObj
      // --------------------------------------------------
      
      const updatedDateObj = lodashGet(resultObj, ['data', 'updatedDateObj'], {});
      clonedObj.updatedDateObj = updatedDateObj;
      
      
      
      
      // ---------------------------------------------
      //   Update
      // ---------------------------------------------
      
      this.handleEdit({
        pathArr: ['recruitmentReplyLimit'],
        value: replyLimit,
      });
      
      this.handleEdit({
        pathArr: [gameCommunities_id],
        value: clonedObj
      });
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      // storeLayout.handleSnackbarOpen({
      //   variant: 'error',
      //   errorObj,
      // });
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      storeLayout.handleButtonEnable({ pathArr });
      
      
      // ---------------------------------------------
      //   Scroll
      // ---------------------------------------------
      
      storeLayout.handleScrollTo({
        
        to: pathArr.join('-'),
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
        
      });
      
      
    }
    
    
  };
  
  
  
  
  
  
  // ---------------------------------------------
  //   Form - Show / Hide
  // ---------------------------------------------
  
  /**
   * スレッド編集フォームを表示する
   * @param {Array} pathArr - パス
   * @param {string} recruitmentThreads_id - DB recruitment-threads _id / スレッドID
   */
  @action.bound
  async handleShowFormRecruitmentThread({ pathArr, recruitmentThreads_id }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   recruitmentThreads_id が存在しない場合エラー
      // ---------------------------------------------
      
      if (!recruitmentThreads_id) {
        throw new CustomError({ errorsArr: [{ code: '1sfB7JPUO', messageID: 'Error' }] });
      }
      
      
      
      
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
        recruitmentThreads_id,
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/recruitment-threads/get-edit-data`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj),
        
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
      //   Hardware
      // ---------------------------------------------
      
      const hardwaresArr = lodashGet(resultObj, ['data', 'hardwaresArr'], []);
      lodashSet(storeHardware, ['dataObj', ...pathArr, 'hardwaresArr'], hardwaresArr);
      
      
      // ---------------------------------------------
      //   Images And Videos
      // ---------------------------------------------
      
      const imagesAndVideosObj = lodashGet(resultObj, ['data', 'imagesAndVideosObj'], {});
      
      if (Object.keys(imagesAndVideosObj).length !== 0) {
        storeImageAndVideoForm.handleSetImagesAndVideosObj({ pathArr, imagesAndVideosObj });
      }
      
      
      // ---------------------------------------------
      //   Data
      // ---------------------------------------------
      
      const editObj = lodashGet(resultObj, ['data'], {});
      
      editObj.title = lodashGet(resultObj, ['data', 'localesArr', 0, 'title'], ''),
      editObj.name = lodashGet(resultObj, ['data', 'localesArr', 0, 'name'], ''),
      editObj.comment = lodashGet(resultObj, ['data', 'localesArr', 0, 'comment'], ''),
      
      lodashSet(this.dataObj, [...pathArr], editObj);
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/gc/rec/stores/store.js - handleShowFormRecruitmentThread
      // `);
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
      // `);
      
      // console.log(`
      //   ----- hardwaresArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(hardwaresArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- editObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(editObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Show Form Thread
      // ---------------------------------------------
      
      lodashSet(this.dataObj, [...pathArr, 'showFormThread'], true);
      
      
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
      
      
      // ---------------------------------------------
      //   Scroll
      // ---------------------------------------------
      
      storeLayout.handleScrollTo({
        
        to: recruitmentThreads_id,
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
        
      });
      
      
    }
    
    
  };
  
  
  
  
  /**
   * スレッド編集フォームを閉じる
   * @param {Array} pathArr - パス
   * @param {string} recruitmentThreads_id - DB recruitment-threads _id / スレッドID
   */
  @action.bound
  async handleHideFormRecruitmentThread({ pathArr, recruitmentThreads_id }) {
    
    
    // ---------------------------------------------
    //   Hide Form Thread
    // ---------------------------------------------
    
    lodashSet(this.dataObj, [...pathArr, 'showFormThread'], false);
    
    
    // ---------------------------------------------
    //   Scroll
    // ---------------------------------------------
    
    storeLayout.handleScrollTo({
      
      to: recruitmentThreads_id,
      duration: 0,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -50,
      
    });
    
    
  };
  
  
  
  
  /**
   * コメント編集フォームを表示する
   * @param {Array} pathArr - パス
   * @param {string} recruitmentComments_id - DB recruitment-comments _id / コメントID
   */
  @action.bound
  async handleShowFormRecruitmentComment({ pathArr, recruitmentComments_id }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   recruitmentComments_id が存在しない場合エラー
      // ---------------------------------------------
      
      if (!recruitmentComments_id) {
        throw new CustomError({ errorsArr: [{ code: 'cWwMK65fH', messageID: 'Error' }] });
      }
      
      
      
      
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
        
        recruitmentComments_id,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/recruitment-comments/get-edit-data`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj),
        
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
      //   Hardware
      // ---------------------------------------------
      
      // const hardwaresArr = lodashGet(resultObj, ['data', 'hardwaresArr'], []);
      // lodashSet(storeHardware, ['dataObj', ...pathArr, 'hardwaresArr'], hardwaresArr);
      
      
      // ---------------------------------------------
      //   Images And Videos
      // ---------------------------------------------
      
      const imagesAndVideosObj = lodashGet(resultObj, ['data', 'imagesAndVideosObj'], {});
      
      if (Object.keys(imagesAndVideosObj).length !== 0) {
        storeImageAndVideoForm.handleSetImagesAndVideosObj({ pathArr, imagesAndVideosObj });
      }
      
      
      // ---------------------------------------------
      //   Data
      // ---------------------------------------------
      
      const editObj = lodashGet(resultObj, ['data'], {});
      
      // editObj.title = lodashGet(resultObj, ['data', 'localesArr', 0, 'title'], ''),
      editObj.name = lodashGet(resultObj, ['data', 'localesArr', 0, 'name'], ''),
      editObj.comment = lodashGet(resultObj, ['data', 'localesArr', 0, 'comment'], ''),
      
      lodashSet(this.dataObj, [...pathArr], editObj);
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/gc/rec/stores/store.js - handleShowFormRecruitmentComment
      // `);
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   recruitmentComments_id: {green ${recruitmentComments_id}}
      // `);
      
      // console.log(`
      //   ----- hardwaresArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(hardwaresArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- editObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(editObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Show Form
      // ---------------------------------------------
      
      lodashSet(this.dataObj, [...pathArr, 'showFormComment'], true);
      
      
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
      
      
      // ---------------------------------------------
      //   Scroll
      // ---------------------------------------------
      
      storeLayout.handleScrollTo({
        
        to: recruitmentComments_id,
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
        
      });
      
      
    }
    
    
  };
  
  
  
  
  /**
   * コメント投稿フォームを閉じる
   * @param {Array} pathArr - パス
   * @param {string} recruitmentThreads_id - DB recruitment-threads _id / スレッドID
   * @param {string} recruitmentComments_id - DB recruitment-comments _id / コメントID
   */
  @action.bound
  async handleHideFormRecruitmentComment({ pathArr, recruitmentThreads_id, recruitmentComments_id }) {
    
    
    // console.log(chalk`
    //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
    //   recruitmentComments_id: {green ${recruitmentComments_id}}
    // `);
    
    // ---------------------------------------------
    //   Hide Form Comment
    // ---------------------------------------------
    
    lodashSet(this.dataObj, [...pathArr, 'showFormComment'], false);
    
    
    // ---------------------------------------------
    //   Scroll
    // ---------------------------------------------
    
    storeLayout.handleScrollTo({
      
      to: recruitmentComments_id || recruitmentThreads_id,
      duration: 0,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -50,
      
    });
    
    
  };
  
  
  
  
  /**
   * 返信編集フォームを表示する
   * @param {Array} pathArr - パス
   * @param {string} recruitmentReplies_id - DB recruitment-replies _id / 返信ID
   */
  @action.bound
  async handleShowFormRecruitmentReply({ pathArr, recruitmentReplies_id }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   recruitmentReplies_id が存在しない場合エラー
      // ---------------------------------------------
      
      if (!recruitmentReplies_id) {
        throw new CustomError({ errorsArr: [{ code: 'eryvlZc7N', messageID: 'Error' }] });
      }
      
      
      
      
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
        
        recruitmentReplies_id,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/recruitment-replies/get-edit-data`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj),
        
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
      //   Images And Videos
      // ---------------------------------------------
      
      const imagesAndVideosObj = lodashGet(resultObj, ['data', 'imagesAndVideosObj'], {});
      
      if (Object.keys(imagesAndVideosObj).length !== 0) {
        storeImageAndVideoForm.handleSetImagesAndVideosObj({ pathArr, imagesAndVideosObj });
      }
      
      
      // ---------------------------------------------
      //   Data
      // ---------------------------------------------
      
      const editObj = lodashGet(resultObj, ['data'], {});
      
      editObj.name = lodashGet(resultObj, ['data', 'localesArr', 0, 'name'], ''),
      editObj.comment = lodashGet(resultObj, ['data', 'localesArr', 0, 'comment'], ''),
      
      lodashSet(this.dataObj, [...pathArr], editObj);
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/gc/rec/stores/store.js - handleShowFormRecruitmentReply
      // `);
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   recruitmentReplies_id: {green ${recruitmentReplies_id}}
      // `);
      
      // console.log(`
      //   ----- editObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(editObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Show Form
      // ---------------------------------------------
      
      lodashSet(this.dataObj, [...pathArr, 'showFormReply'], true);
      
      
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
      
      
      // ---------------------------------------------
      //   Scroll
      // ---------------------------------------------
      
      storeLayout.handleScrollTo({
        
        to: recruitmentReplies_id,
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
        
      });
      
      
    }
    
    
  };
  
  
  
  
  /**
   * 返信投稿フォームを閉じる
   * @param {Array} pathArr - パス
   * @param {string} recruitmentComments_id - DB recruitment-comments _id / コメントID
   * @param {string} recruitmentReplies_id - DB recruitment-replies _id / 返信ID
   * @param {string} replyToRecruitmentReplies_id - DB recruitment-replies _id / 返信ID
   * @param {string} scrollTo - スクロールする移動先
   */
  @action.bound
  async handleHideFormRecruitmentReply({
    
    pathArr,
    recruitmentComments_id,
    recruitmentReplies_id,
    replyToRecruitmentReplies_id,
    scrollTo,
    
  }) {
    
    
    // ---------------------------------------------
    //   スクロールする対象の _id
    // ---------------------------------------------
    
    let scrollToTarget = '';
    
    
    // ---------------------------------------------
    //   Update - 返信対象が存在する
    // ---------------------------------------------
    
    if (recruitmentReplies_id && replyToRecruitmentReplies_id) {
      
      lodashSet(this.dataObj, [...pathArr, 'showFormReply'], false);
      scrollToTarget = recruitmentReplies_id;
      
      
    // ---------------------------------------------
    //   Update - 返信対象が存在しない
    // ---------------------------------------------
      
    } else if (recruitmentReplies_id && !replyToRecruitmentReplies_id) {
      
      lodashSet(this.dataObj, [...pathArr, 'showFormReply'], false);
      scrollToTarget = recruitmentReplies_id;
    
      
    // ---------------------------------------------
    //   Insert - 返信対象が存在する
    // ---------------------------------------------
      
    } else if (!recruitmentReplies_id && replyToRecruitmentReplies_id) {
      // console.log('Insert - 返信対象が存在する');
      lodashSet(this.dataObj, [...pathArr, 'showFormReplyTo'], false);
      scrollToTarget = replyToRecruitmentReplies_id;
      
      
    // ---------------------------------------------
    //   Insert - 返信対象が存在しない
    // ---------------------------------------------
      
    } else {
      
      lodashSet(this.dataObj, [...pathArr, 'showFormReply'], false);
      scrollToTarget = recruitmentComments_id;
      
    }
    
    
    
    
    // ---------------------------------------------
    //   スクロール先の指定がある場合はそちらに移動させる
    // ---------------------------------------------
    
    if (scrollTo) {
      scrollToTarget = scrollTo;
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/gc/rec/stores/store.js - handleHideFormRecruitmentReply
    // `);
    
    // console.log(`
    //   ----- pathArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   recruitmentComments_id: {green ${recruitmentComments_id}}
    //   recruitmentReplies_id: {green ${recruitmentReplies_id}}
    //   replyToRecruitmentReplies_id: {green ${replyToRecruitmentReplies_id}}
    //   scrollTo: {green ${scrollTo}}
    // `);
    
    
    
    
    // ---------------------------------------------
    //   Scroll
    // ---------------------------------------------
    
    storeLayout.handleScrollTo({
      
      to: scrollToTarget,
      duration: 0,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -50,
      
    });
    
    
  };
  
  
  
  
  
  
  // ---------------------------------------------
  //   Form - Submit
  // ---------------------------------------------
  
  /**
   * 募集を投稿する
   * @param {Object} eventObj - イベント
   * @param {Array} pathArr - パス
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} recruitmentThreads_id - DB recruitment-threads _id / 募集スレッドのID
   */
  @action.bound
  async handleSubmitRecruitmentThread({
    
    eventObj,
    pathArr,
    gameCommunities_id,
    recruitmentThreads_id,
    
  }) {
    
    
    // ---------------------------------------------
    //   フォームの送信処理停止
    // ---------------------------------------------
    
    eventObj.preventDefault();
    
    
    
    
    try {
      
      
      // ---------------------------------------------
      //   Temp Data
      // ---------------------------------------------
      
      // lodashSet(storeHardware, ['dataObj', ...pathArr, 'hardwaresArr'], [ { hardwareID: 'I-iu-WmkO', name: 'ファミリーコンピュータ' },  { hardwareID: '2yKF4qXAw', name: 'メガドライブ' } ]);
      
      
      // const newObj = {
        
      //   gameCommunities_id,
      //   recruitmentThreads_id: '',
      //   category: 1,
      //   title: 'テストタイトル',
      //   name: 'テストネーム',
      //   comment: 'テストコメント',
      //   // anonymity: false,
      //   platform1: 'Other',
      //   platform2: 'Other',
      //   platform3: 'Other',
      //   id1: 'test-id-1',
      //   id2: '',
      //   id3: '',
      //   informationTitle1: '情報タイトル1',
      //   informationTitle2: '',
      //   informationTitle3: '',
      //   informationTitle4: '',
      //   informationTitle5: '',
      //   information1: '情報1',
      //   information2: '',
      //   information3: '',
      //   information4: '',
      //   information5: '',
      //   publicSetting: 1,
      //   // deadlineDate: '2020-12-31',
      //   // twitter: false,
      //   // webPush: false,
      //   webPushSubscriptionObj: {
      //     endpoint: 'https://fcm.googleapis.com/fcm/send/fStle9C5HJk:APA91bFMuBrN4DaT6QOVLhkXbaDJCTEM3q0hE8gM_FPqMqE7SgN6fkxylrFLfve3C8QA7O03Q-UWMXI2LQINSpCCveDrMV3FOpTfPfRhjabMbM43dsBVcKHJy4QcasADEW9KqA40Ea5y',
      //     keys: {
      //       p256dh: 'BCleeWTRP95hSeOXd3lTmcGInU2AFR4xEfy6W_kgzwd7IT_GMXzbhriEerFEFZDEXOQJNTGUFObhkol2P7qTMWw',
      //       auth: 'siDbUa9DCbg-n9AMsvWA1w'
      //     }
      //   },
        
      // };
      
      // const oldObj = lodashGet(this.dataObj, [...pathArr], {});
      // const mergedObj = lodashMerge(oldObj, newObj);
      
      // lodashSet(this.dataObj, [...pathArr], mergedObj);
      
      
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const hardwaresArr = lodashGet(storeHardware, ['dataObj', ...pathArr, 'hardwaresArr'], []);
      
      const hardwareIDsArr = [];
      
      for (let valueObj of hardwaresArr.values()) {
        hardwareIDsArr.push(valueObj.hardwareID);
      }
      
      const category = lodashGet(this.dataObj, [...pathArr, 'category'], '');
      const title = lodashGet(this.dataObj, [...pathArr, 'title'], '');
      const name = lodashGet(this.dataObj, [...pathArr, 'name'], '');
      const comment = lodashGet(this.dataObj, [...pathArr, 'comment'], '');
      const imagesAndVideosObj = lodashGet(storeImageAndVideoForm, ['dataObj', ...pathArr, 'imagesAndVideosObj'], {});
      
      const idsArr = lodashGet(this.dataObj, [...pathArr, 'idsArr'], []);
      
      const platform1 = lodashGet(this.dataObj, [...pathArr, 'platform1'], 'Other');
      const platform2 = lodashGet(this.dataObj, [...pathArr, 'platform2'], 'Other');
      const platform3 = lodashGet(this.dataObj, [...pathArr, 'platform3'], 'Other');
      
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
      
      const publicSetting = lodashGet(this.dataObj, [...pathArr, 'publicSetting'], 1);
      
      const deadlineDate = lodashGet(this.dataObj, [...pathArr, 'deadlineDate'], '');
      
      const webPushAvailable = lodashGet(this.dataObj, [...pathArr, 'webPushAvailable'], false);
      const webPushSubscriptionObj = lodashGet(this.dataObj, [...pathArr, 'webPushSubscriptionObj'], {});
      
      
      const threadLimit = parseInt((storeData.getCookie({ key: 'recruitmentThreadLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_THREAD_LIMIT), 10);
      const commentLimit = parseInt((storeData.getCookie({ key: 'recruitmentCommentLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_COMMENT_LIMIT), 10);
      const replyLimit = parseInt((storeData.getCookie({ key: 'recruitmentReplyLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_REPLY_LIMIT), 10);
      
      
      
      
      // ---------------------------------------------
      //   Validations
      // ---------------------------------------------
      
      if (
        
        validationRecruitmentThreadsCategory({ value: category }).error ||
        
        validationRecruitmentThreadsTitle({ value: title }).error ||
        validationHandleName({ value: name }).error ||
        validationRecruitmentThreadsComment({ value: comment }).error ||
        
        validationRecruitmentThreadsPlatform({ value: platform1 }).error ||
        validationRecruitmentThreadsPlatform({ value: platform2 }).error ||
        validationRecruitmentThreadsPlatform({ value: platform3 }).error ||
        
        validationRecruitmentThreadsID({ value: id1 }).error ||
        validationRecruitmentThreadsID({ value: id2 }).error ||
        validationRecruitmentThreadsID({ value: id3 }).error ||
        
        validationRecruitmentThreadsInformationTitle({ value: informationTitle1 }).error ||
        validationRecruitmentThreadsInformationTitle({ value: informationTitle2 }).error ||
        validationRecruitmentThreadsInformationTitle({ value: informationTitle3 }).error ||
        validationRecruitmentThreadsInformationTitle({ value: informationTitle4 }).error ||
        validationRecruitmentThreadsInformationTitle({ value: informationTitle5 }).error ||
        
        validationRecruitmentThreadsInformation({ value: information1 }).error ||
        validationRecruitmentThreadsInformation({ value: information2 }).error ||
        validationRecruitmentThreadsInformation({ value: information3 }).error ||
        validationRecruitmentThreadsInformation({ value: information4 }).error ||
        validationRecruitmentThreadsInformation({ value: information5 }).error ||
        
        validationRecruitmentThreadsPublicSetting({ value: publicSetting }).error ||
        
        validationRecruitmentThreadsDeadlineDate({ value: deadlineDate }).error ||
        
        validationBoolean({ value: webPushAvailable }).error
        
      ) {
        
        throw new CustomError({ errorsArr: [{ code: 'S0JRF6V5l', messageID: 'uwHIKBy7c' }] });
        
      }
      
      
      
      
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
        hardwareIDsArr,
        category,
        title,
        name,
        comment,
        idsArr,
        platform1,
        platform2,
        platform3,
        id1,
        id2,
        id3,
        informationTitle1,
        informationTitle2,
        informationTitle3,
        informationTitle4,
        informationTitle5,
        information1,
        information2,
        information3,
        information4,
        information5,
        publicSetting,
        deadlineDate,
        webPushAvailable,
        threadLimit,
        commentLimit,
        replyLimit,
        
      };
      
      if (Object.keys(imagesAndVideosObj).length !== 0) {
        formDataObj.imagesAndVideosObj = imagesAndVideosObj;
      }
      
      if (webPushAvailable && Object.keys(webPushSubscriptionObj).length !== 0) {
        formDataObj.webPushSubscriptionObj = webPushSubscriptionObj;
      }
      
      
      // nOVilxpSk
      // formDataObj.webPushSubscriptionObj = {
      //   endpoint: 'https://fcm.googleapis.com/fcm/send/cOsJ3EXpj2E:APA91bHnycUwE37fsnmlRNYEuJYx_kf67jaq7CFmr7oFIGzIqRk8tXi8BhHmtCfL7MlMjhyYoFwhhvLMx7sfUCqh00wDXVIovAp5hamTe2UWGDF4QUd4Z8VRNkNcrQadHGUuy7k-Jqbd',
      //   keys: {
      //     p256dh: 'BCCZ55xYxmC_6JNemzKc1FzAiz-fUEz4xCA3WXqVq2MRBaSJA3SUKtlY_G_747sT2C0Xm6QJD4L7KKzunNtj-Zo',
      //     auth: 'EYpxeXGdImUIaTpBqVca0A'
      //   }
      // };
      
      // L4D5QB9p4
      // formDataObj.webPushSubscriptionObj = {
      //   endpoint: 'https://fcm.googleapis.com/fcm/send/fCVMofN4BLo:APA91bFShjo-hy02fDaVOpLDHQE_TaRRCPSG1IJIc_2qhndZuqkC67x4_RFbWp5uH4I11SKRdxpVquPQP59QNcomJw4irs0F-EWqOUu6ydVDMZ0Gau92YGmEV36SSO5a63vxUet7wEIo',
      //   keys: {
      //     p256dh: 'BLPT_K71Dk35Le_w0eyviBXXNRBsaZc-5o1-D0VKp18XW_N4wCPyzilZE-j0V-eJ4Cz5irqOZt0nePNG8zLDdaQ',
      //     auth: '0MuLywCY4rbTg5I2_nFEOQ'
      //   }
      // };
      
      // Error
      // formDataObj.webPushSubscriptionObj = {
      //   endpoint: 'https://fcm.googleapis.com/fcm/send/aaa',
      //   keys: {
      //     p256dh: 'bbb',
      //     auth: 'ccc'
      //   }
      // };
      
      
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/recruitment-threads/upsert`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj),
        
      });
      
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      
      
      // ---------------------------------------------
      //   スレッド更新
      // ---------------------------------------------
      
      const recruitmentObj = lodashGet(this.dataObj, [gameCommunities_id], {});
      const clonedObj = lodashCloneDeep(recruitmentObj);
      
      clonedObj.recruitmentThreadsObj = lodashGet(resultObj, ['data', 'recruitmentThreadsObj'], {});
      clonedObj.recruitmentCommentsObj = lodashGet(resultObj, ['data', 'recruitmentCommentsObj'], {});
      clonedObj.recruitmentRepliesObj = lodashGet(resultObj, ['data', 'recruitmentRepliesObj'], {});
      clonedObj.updatedDateObj = lodashGet(resultObj, ['data', 'updatedDateObj'], {});
      
      this.handleEdit({
        pathArr: [gameCommunities_id],
        value: clonedObj
      });
      
      
      
      
      // ---------------------------------------------
      //   編集の場合
      // ---------------------------------------------
      
      if (recruitmentThreads_id) {
        
        
        // ---------------------------------------------
        //   Hide Form
        // ---------------------------------------------
        
        lodashSet(this.dataObj, [...pathArr, 'showFormThread'], false);
        
        
      // ---------------------------------------------
      //   新規投稿の場合
      // ---------------------------------------------
        
      } else {
        
        
        // ---------------------------------------------
        //   Reset Form
        // ---------------------------------------------
        
        // ----------------------------------------
        //   - Hardware
        // ----------------------------------------
        
        storeHardware.handleResetForm({ pathArr });
        
        
        // ----------------------------------------
        //   - Image and Video
        // ----------------------------------------
        
        storeImageAndVideoForm.handleResetForm({ pathArr });
        
        
        // ----------------------------------------
        //   - ID
        // ----------------------------------------
        
        storeIDForm.handleResetForm({ pathArr });
        
        
        // ----------------------------------------
        //   - Form
        // ----------------------------------------
        
        lodashSet(this.dataObj, pathArr, {});
        
        
        // ---------------------------------------------
        //   パネルを閉じる
        // ---------------------------------------------
        
        storeLayout.handlePanelExpand({ pathArr });
        
        
      }
      
      
      
      
      // ---------------------------------------------
      //   Scroll
      // ---------------------------------------------
      
      storeLayout.handleScrollTo({
        
        to: recruitmentThreads_id || 'recruitmentThreads',
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
        
      });
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/gc/rec/stores/store.js / handleRecruitment
      // `);
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- this.dataObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(this.dataObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- ids_idsArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(ids_idsArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- hardwaresArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(hardwaresArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- hardwareIDsArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(hardwareIDsArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
      //   category: {green ${category}}
      //   title: {green ${title}}
      //   name: {green ${name}}
      //   comment: {green ${comment}}
      // `);
      
      // console.log(`
      //   ----- imagesAndVideosObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   platform1: {green ${platform1}}
      //   id1: {green ${id1}}
      //   platform2: {green ${platform2}}
      //   id2: {green ${id2}}
      //   platform3: {green ${platform3}}
      //   id3: {green ${id3}}
        
      //   informationTitle1: {green ${informationTitle1}}
      //   information1: {green ${information1}}
      //   informationTitle2: {green ${informationTitle2}}
      //   information2: {green ${information2}}
      //   informationTitle3: {green ${informationTitle3}}
      //   information3: {green ${information3}}
      //   informationTitle4: {green ${informationTitle4}}
      //   information4: {green ${information4}}
      //   informationTitle5: {green ${informationTitle5}}
      //   information5: {green ${information5}}
        
      //   publicSetting: {green ${publicSetting}}
        
      //   deadlineDate: {green ${deadlineDate}}
      // `);
      
      // console.log(chalk`
      //   twitter: {green ${twitter}}
      //   webPush: {green ${webPush}}
      // `);
      
      // return;
      
      
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
   * コメントを投稿する
   * @param {Object} eventObj - イベント
   * @param {Array} pathArr - パス
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} recruitmentThreads_id - DB recruitment-threads _id / 募集スレッドのID
   * @param {string} recruitmentComments_id - DB recruitment-comments _id / 募集コメントのID
   */
  @action.bound
  async handleSubmitRecruitmentComment({
    
    eventObj,
    pathArr,
    gameCommunities_id,
    recruitmentThreads_id,
    recruitmentComments_id,
    
  }) {
    
    
    // ---------------------------------------------
    //   フォームの送信処理停止
    // ---------------------------------------------
    
    eventObj.preventDefault();
    
    
    
    
    try {
      
      
      // ---------------------------------------------
      //   Temp Data
      // ---------------------------------------------
      
      // const newObj = {
        
      //   gameCommunities_id,
      //   // recruitmentThreads_id: '',
      //   // recruitmentComments_id: '',
      //   category: 1,
      //   // name: 'テストネーム',
      //   // comment: 'テストコメント',
      //   platform1: 'Other',
      //   platform2: 'Other',
      //   platform3: 'Other',
      //   id1: 'test-id-1',
      //   id2: '',
      //   id3: '',
      //   informationTitle1: '情報タイトル1',
      //   informationTitle2: '',
      //   informationTitle3: '',
      //   informationTitle4: '',
      //   informationTitle5: '',
      //   information1: '情報1',
      //   information2: '',
      //   information3: '',
      //   information4: '',
      //   information5: '',
      //   publicSetting: 1,
      //   webPush: true,
      //   webPushSubscriptionObj: {
      //     endpoint: 'https://fcm.googleapis.com/fcm/send/fStle9C5HJk:APA91bFMuBrN4DaT6QOVLhkXbaDJCTEM3q0hE8gM_FPqMqE7SgN6fkxylrFLfve3C8QA7O03Q-UWMXI2LQINSpCCveDrMV3FOpTfPfRhjabMbM43dsBVcKHJy4QcasADEW9KqA40Ea5y',
      //     keys: {
      //       p256dh: 'BCleeWTRP95hSeOXd3lTmcGInU2AFR4xEfy6W_kgzwd7IT_GMXzbhriEerFEFZDEXOQJNTGUFObhkol2P7qTMWw',
      //       auth: 'siDbUa9DCbg-n9AMsvWA1w'
      //     }
      //   },
        
      // };
      
      // const oldObj = lodashGet(this.dataObj, [...pathArr], {});
      // const mergedObj = lodashMerge(oldObj, newObj);
      
      // lodashSet(this.dataObj, [...pathArr], mergedObj);
      
      
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const name = lodashGet(this.dataObj, [...pathArr, 'name'], '');
      const comment = lodashGet(this.dataObj, [...pathArr, 'comment'], '');
      const imagesAndVideosObj = lodashGet(storeImageAndVideoForm, ['dataObj', ...pathArr, 'imagesAndVideosObj'], {});
      
      const idsArr = lodashGet(this.dataObj, [...pathArr, 'idsArr'], []);
      
      const platform1 = lodashGet(this.dataObj, [...pathArr, 'platform1'], 'Other');
      const platform2 = lodashGet(this.dataObj, [...pathArr, 'platform2'], 'Other');
      const platform3 = lodashGet(this.dataObj, [...pathArr, 'platform3'], 'Other');
      
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
      
      const publicSetting = lodashGet(this.dataObj, [...pathArr, 'publicSetting'], 1);
      
      const webPushAvailable = lodashGet(this.dataObj, [...pathArr, 'webPushAvailable'], false);
      const webPushSubscriptionObj = lodashGet(this.dataObj, [...pathArr, 'webPushSubscriptionObj'], {});
      
      
      const threadLimit = parseInt((storeData.getCookie({ key: 'recruitmentThreadLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_THREAD_LIMIT), 10);
      const commentLimit = parseInt((storeData.getCookie({ key: 'recruitmentCommentLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_COMMENT_LIMIT), 10);
      const replyLimit = parseInt((storeData.getCookie({ key: 'recruitmentReplyLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_REPLY_LIMIT), 10);
      
      
      
      
      // ---------------------------------------------
      //   Validations
      // ---------------------------------------------
      
      if (
        
        validationHandleName({ value: name }).error ||
        validationRecruitmentThreadsComment({ value: comment }).error ||
        
        validationRecruitmentThreadsPlatform({ value: platform1 }).error ||
        validationRecruitmentThreadsPlatform({ value: platform2 }).error ||
        validationRecruitmentThreadsPlatform({ value: platform3 }).error ||
        
        validationRecruitmentThreadsID({ value: id1 }).error ||
        validationRecruitmentThreadsID({ value: id2 }).error ||
        validationRecruitmentThreadsID({ value: id3 }).error ||
        
        validationRecruitmentThreadsInformationTitle({ value: informationTitle1 }).error ||
        validationRecruitmentThreadsInformationTitle({ value: informationTitle2 }).error ||
        validationRecruitmentThreadsInformationTitle({ value: informationTitle3 }).error ||
        validationRecruitmentThreadsInformationTitle({ value: informationTitle4 }).error ||
        validationRecruitmentThreadsInformationTitle({ value: informationTitle5 }).error ||
        
        validationRecruitmentThreadsInformation({ value: information1 }).error ||
        validationRecruitmentThreadsInformation({ value: information2 }).error ||
        validationRecruitmentThreadsInformation({ value: information3 }).error ||
        validationRecruitmentThreadsInformation({ value: information4 }).error ||
        validationRecruitmentThreadsInformation({ value: information5 }).error ||
        
        validationRecruitmentThreadsPublicSetting({ value: publicSetting }).error ||
        
        validationBoolean({ value: webPushAvailable }).error
        
      ) {
        
        throw new CustomError({ errorsArr: [{ code: '-2btbTXrm', messageID: 'uwHIKBy7c' }] });
        
      }
      
      
      
      
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
        recruitmentComments_id,
        name,
        comment,
        idsArr,
        platform1,
        platform2,
        platform3,
        id1,
        id2,
        id3,
        informationTitle1,
        informationTitle2,
        informationTitle3,
        informationTitle4,
        informationTitle5,
        information1,
        information2,
        information3,
        information4,
        information5,
        publicSetting,
        webPushAvailable,
        threadLimit,
        commentLimit,
        replyLimit,
        
      };
      
      if (Object.keys(imagesAndVideosObj).length !== 0) {
        formDataObj.imagesAndVideosObj = imagesAndVideosObj;
      }
      
      if (webPushAvailable && Object.keys(webPushSubscriptionObj).length !== 0) {
        formDataObj.webPushSubscriptionObj = webPushSubscriptionObj;
      }
      
      
      // nOVilxpSk
      // formDataObj.webPushSubscriptionObj = {
      //   endpoint: 'https://fcm.googleapis.com/fcm/send/cOsJ3EXpj2E:APA91bHnycUwE37fsnmlRNYEuJYx_kf67jaq7CFmr7oFIGzIqRk8tXi8BhHmtCfL7MlMjhyYoFwhhvLMx7sfUCqh00wDXVIovAp5hamTe2UWGDF4QUd4Z8VRNkNcrQadHGUuy7k-Jqbd',
      //   keys: {
      //     p256dh: 'BCCZ55xYxmC_6JNemzKc1FzAiz-fUEz4xCA3WXqVq2MRBaSJA3SUKtlY_G_747sT2C0Xm6QJD4L7KKzunNtj-Zo',
      //     auth: 'EYpxeXGdImUIaTpBqVca0A'
      //   }
      // };
      
      // L4D5QB9p4
      // formDataObj.webPushSubscriptionObj = {
      //   endpoint: 'https://fcm.googleapis.com/fcm/send/fCVMofN4BLo:APA91bFShjo-hy02fDaVOpLDHQE_TaRRCPSG1IJIc_2qhndZuqkC67x4_RFbWp5uH4I11SKRdxpVquPQP59QNcomJw4irs0F-EWqOUu6ydVDMZ0Gau92YGmEV36SSO5a63vxUet7wEIo',
      //   keys: {
      //     p256dh: 'BLPT_K71Dk35Le_w0eyviBXXNRBsaZc-5o1-D0VKp18XW_N4wCPyzilZE-j0V-eJ4Cz5irqOZt0nePNG8zLDdaQ',
      //     auth: '0MuLywCY4rbTg5I2_nFEOQ'
      //   }
      // };
      
      // Error
      // formDataObj.webPushSubscriptionObj = {
      //   endpoint: 'https://fcm.googleapis.com/fcm/send/aaa',
      //   keys: {
      //     p256dh: 'bbb',
      //     auth: 'ccc'
      //   }
      // };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/recruitment-comments/upsert`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj),
        
      });
      
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      
      
      // ---------------------------------------------
      //   スレッド更新
      // ---------------------------------------------
      
      const recruitmentObj = lodashGet(this.dataObj, [gameCommunities_id], {});
      const clonedObj = lodashCloneDeep(recruitmentObj);
      
      clonedObj.recruitmentThreadsObj = lodashGet(resultObj, ['data', 'recruitmentThreadsObj'], {});
      clonedObj.recruitmentCommentsObj = lodashGet(resultObj, ['data', 'recruitmentCommentsObj'], {});
      clonedObj.recruitmentRepliesObj = lodashGet(resultObj, ['data', 'recruitmentRepliesObj'], {});
      clonedObj.updatedDateObj = lodashGet(resultObj, ['data', 'updatedDateObj'], {});
      
      this.handleEdit({
        pathArr: [gameCommunities_id],
        value: clonedObj
      });
      
      
      
      
      // ---------------------------------------------
      //   Hide Form
      // ---------------------------------------------
      
      lodashSet(this.dataObj, [...pathArr, 'showFormComment'], false);
      
      
      // ---------------------------------------------
      //   Scroll
      // ---------------------------------------------
      
      storeLayout.handleScrollTo({
        
        to: recruitmentComments_id,
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
        
      });
      
      // ---------------------------------------------
      //   編集の場合
      // ---------------------------------------------
      
      // if (recruitmentComments_id) {
        
        
      //   // ---------------------------------------------
      //   //   Hide Form
      //   // ---------------------------------------------
        
      //   lodashSet(this.dataObj, [...pathArr, 'showFormComment'], false);
        
        
      //   // ---------------------------------------------
      //   //   Scroll
      //   // ---------------------------------------------
        
      //   storeLayout.handleScrollTo({
          
      //     to: recruitmentComments_id,
      //     duration: 0,
      //     delay: 0,
      //     smooth: 'easeInOutQuart',
      //     offset: -50,
          
      //   });
        
      // }
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/gc/rec/stores/store.js / handleSubmitRecruitmentComment
      // `);
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- formDataObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(formDataObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- ids_idsArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(ids_idsArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- hardwaresArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(hardwaresArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- hardwareIDsArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(hardwareIDsArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
      //   recruitmentComments_id: {green ${recruitmentComments_id}}
      //   name: {green ${name}}
      //   comment: {green ${comment}}
      // `);
      
      // console.log(`
      //   ----- imagesAndVideosObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   platform1: {green ${platform1}}
      //   id1: {green ${id1}}
      //   platform2: {green ${platform2}}
      //   id2: {green ${id2}}
      //   platform3: {green ${platform3}}
      //   id3: {green ${id3}}
        
      //   informationTitle1: {green ${informationTitle1}}
      //   information1: {green ${information1}}
      //   informationTitle2: {green ${informationTitle2}}
      //   information2: {green ${information2}}
      //   informationTitle3: {green ${informationTitle3}}
      //   information3: {green ${information3}}
      //   informationTitle4: {green ${informationTitle4}}
      //   information4: {green ${information4}}
      //   informationTitle5: {green ${informationTitle5}}
      //   information5: {green ${information5}}
        
      //   publicSetting: {green ${publicSetting}}
        
      //   deadlineDate: {green ${deadlineDate}}
      // `);
      
      // console.log(chalk`
      //   twitter: {green ${twitter}}
      //   webPush: {green ${webPush}}
      // `);
      
      // return;
      
      
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
   * 返信を投稿する
   * @param {Object} eventObj - イベント
   * @param {Array} pathArr - パス
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティID
   * @param {string} recruitmentThreads_id - DB recruitment-threads _id / スレッドID
   * @param {string} recruitmentComments_id - DB recruitment-comments _id / コメントID
   * @param {string} recruitmentReplies_id - DB recruitment-replies _id / 返信ID
   * @param {string} replyToRecruitmentReplies_id - DB recruitment-replies _id / 返信対象の返信ID
   */
  @action.bound
  async handleSubmitRecruitmentReply({
    
    eventObj,
    pathArr,
    gameCommunities_id,
    recruitmentThreads_id,
    recruitmentComments_id,
    recruitmentReplies_id,
    replyToRecruitmentReplies_id,
    
  }) {
    
    
    // ---------------------------------------------
    //   フォームの送信処理停止
    // ---------------------------------------------
    
    eventObj.preventDefault();
    
    
    
    
    try {
      
      
      // ---------------------------------------------
      //   Temp Data
      // ---------------------------------------------
      
      // const newObj = {
        
      //   gameCommunities_id,
      //   // recruitmentThreads_id: '',
      //   // recruitmentComments_id: '',
      //   name: 'テストネーム',
      //   comment: 'テストコメント',
        
      // };
      
      // const oldObj = lodashGet(this.dataObj, [...pathArr], {});
      // const mergedObj = lodashMerge(oldObj, newObj);
      
      // lodashSet(this.dataObj, [...pathArr], mergedObj);
      
      
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const name = lodashGet(this.dataObj, [...pathArr, 'name'], '');
      const comment = lodashGet(this.dataObj, [...pathArr, 'comment'], '');
      const imagesAndVideosObj = lodashGet(storeImageAndVideoForm, ['dataObj', ...pathArr, 'imagesAndVideosObj'], {});
      
      const threadLimit = parseInt((storeData.getCookie({ key: 'recruitmentThreadLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_THREAD_LIMIT), 10);
      const commentLimit = parseInt((storeData.getCookie({ key: 'recruitmentCommentLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_COMMENT_LIMIT), 10);
      const replyLimit = parseInt((storeData.getCookie({ key: 'recruitmentReplyLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_REPLY_LIMIT), 10);
      
      
      
      
      // ---------------------------------------------
      //   Validations
      // ---------------------------------------------
      
      if (
        
        validationHandleName({ value: name }).error ||
        validationRecruitmentThreadsComment({ value: comment }).error
        
      ) {
        
        throw new CustomError({ errorsArr: [{ code: 'gNEl9TZsF', messageID: 'uwHIKBy7c' }] });
        
      }
      
      
      
      
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
        recruitmentComments_id,
        recruitmentReplies_id,
        replyToRecruitmentReplies_id,
        name,
        comment,
        threadLimit,
        commentLimit,
        replyLimit,
        
      };
      
      if (Object.keys(imagesAndVideosObj).length !== 0) {
        formDataObj.imagesAndVideosObj = imagesAndVideosObj;
      }
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/recruitment-replies/upsert`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj),
        
      });
      
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      
      
      // ---------------------------------------------
      //   募集更新
      // ---------------------------------------------
      
      const recruitmentObj = lodashGet(this.dataObj, [gameCommunities_id], {});
      const clonedObj = lodashCloneDeep(recruitmentObj);
      
      const recruitmentRepliesOldObj = lodashGet(recruitmentObj, ['recruitmentRepliesObj'], {});
      const recruitmentRepliesNewObj = lodashGet(resultObj, ['data', 'recruitmentRepliesObj'], {});
      
      clonedObj.recruitmentRepliesObj = lodashMerge(recruitmentRepliesOldObj, recruitmentRepliesNewObj);
      clonedObj.updatedDateObj = lodashGet(resultObj, ['data', 'updatedDateObj'], {});
      
      this.handleEdit({
        pathArr: [gameCommunities_id],
        value: clonedObj
      });
      
      
      
      
      // ---------------------------------------------
      //   Hide Form & Scroll To
      // ---------------------------------------------
      
      this.handleHideFormRecruitmentReply({
        
        pathArr,
        recruitmentComments_id,
        recruitmentReplies_id,
        // recruitmentReplies_id: lodashGet(resultObj, ['data', 'scrollTo_id'], ''),
        replyToRecruitmentReplies_id,
        
      });
      
      
      
      
      // ---------------------------------------------
      //   Reset Form
      // ---------------------------------------------
      
      lodashSet(this.dataObj, [...pathArr, 'name'], '');
      lodashSet(this.dataObj, [...pathArr, 'comment'], '');
      
      storeImageAndVideoForm.handleResetForm({ pathArr });
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/gc/rec/stores/store.js / handleSubmitRecruitmentReply
      // `);
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
      //   recruitmentComments_id: {green ${recruitmentComments_id}}
      //   recruitmentReplies_id: {green ${recruitmentReplies_id}}
      //   replyToRecruitmentReplies_id: {green ${replyToRecruitmentReplies_id}}
      //   name: {green ${name}}
      //   comment: {green ${comment}}
      // `);
      
      // console.log(`
      //   ----- imagesAndVideosObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosObj)), { colors: true, depth: null })}\n
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
  
  
  
  
  
  
  // ---------------------------------------------
  //   Form - Delete
  // ---------------------------------------------
  
  /**
   * 削除ダイアログを表示する
   * @param {Array} pathArr - パス
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティID
   * @param {string} recruitmentThreads_id - DB recruitment-threads _id / スレッドID
   * @param {string} recruitmentComments_id - DB recruitment-comments _id / コメントID
   * @param {string} recruitmentReplies_id - DB recruitment-replies _id / 返信ID
   */
  @action.bound
  async handleShowDeleteDialog({
    
    gameCommunities_id,
    recruitmentThreads_id,
    recruitmentComments_id,
    recruitmentReplies_id,
    
  }) {
    
    
    // ---------------------------------------------
    //   Set deleteDialogObj
    // ---------------------------------------------
    
    const deleteDialogObj = {
      
      recruitmentThreads_id,
      recruitmentComments_id,
      recruitmentReplies_id,
      
    };
    
    lodashSet(this.dataObj, [gameCommunities_id, 'deleteDialogObj'], deleteDialogObj);
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/gc/rec/stores/store.js - handleShowDeleteDialog
    // `);
    
    
  };
  
  
  
  
  /**
   * スレッド・コメント・返信を削除する
   * @param {Array} pathArr - パス
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティID
   * @param {string} recruitmentThreads_id - DB recruitment-threads _id / スレッドID
   * @param {string} recruitmentComments_id - DB recruitment-comments _id / コメントID
   * @param {string} recruitmentReplies_id - DB recruitment-replies _id / 返信ID
   */
  @action.bound
  async handleDeleteRecruitment({
    
    gameCommunities_id,
    
  }) {
    
    
    // ---------------------------------------------
    //   Property
    // ---------------------------------------------
    
    const recruitmentThreads_id = lodashGet(this.dataObj, [gameCommunities_id, 'deleteDialogObj', 'recruitmentThreads_id'], '');
    const recruitmentComments_id = lodashGet(this.dataObj, [gameCommunities_id, 'deleteDialogObj', 'recruitmentComments_id'], '');
    const recruitmentReplies_id = lodashGet(this.dataObj, [gameCommunities_id, 'deleteDialogObj', 'recruitmentReplies_id'], '');
    
    
    
    
    // ---------------------------------------------
    //   Fetch で削除する
    // ---------------------------------------------
    
    // ----------------------------------------
    //   - Reply
    // ----------------------------------------
    
    if (recruitmentReplies_id) {
      
      await this.handleDeleteRecruitmentReply({
        
        gameCommunities_id,
        recruitmentThreads_id,
        recruitmentComments_id,
        recruitmentReplies_id,
        
      });
      
    
    // ----------------------------------------
    //   - Comment
    // ----------------------------------------
    
    } else if (recruitmentComments_id) {
      
      await this.handleDeleteRecruitmentComment({
        
        gameCommunities_id,
        recruitmentThreads_id,
        recruitmentComments_id,
        
      });
      
      
    // ----------------------------------------
    //   - Thread
    // ----------------------------------------
      
    } else if (recruitmentThreads_id) {
      
      await this.handleDeleteRecruitmentThread({
        
        gameCommunities_id,
        recruitmentThreads_id,
        
      });
      
    }
    
    
    
    
    // ---------------------------------------------
    //   ダイアログを閉じる
    // ---------------------------------------------
    
    lodashSet(this.dataObj, [gameCommunities_id, 'deleteDialogObj'], {});
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/gc/rec/stores/store.js / handleDeleteRecruitment
    // `);
    
    // console.log(chalk`
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
    //   recruitmentComments_id: {green ${recruitmentComments_id}}
    //   recruitmentReplies_id: {green ${recruitmentReplies_id}}
    // `);
    
    // console.log(`
    //   ----- this.dataObj[gameCommunities_id].recruitmentRepliesObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(this.dataObj[gameCommunities_id].recruitmentRepliesObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
  };
  
  
  
  
  /**
   * スレッドを削除する
   * @param {Array} pathArr - パス
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティID
   * @param {string} recruitmentThreads_id - DB recruitment-threads _id / スレッドID
   */
  @action.bound
  async handleDeleteRecruitmentThread({
    
    pathArr,
    gameCommunities_id,
    recruitmentThreads_id,
    
  }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const threadLimit = parseInt((storeData.getCookie({ key: 'recruitmentThreadLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_THREAD_LIMIT), 10);
      const commentLimit = parseInt((storeData.getCookie({ key: 'recruitmentCommentLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_COMMENT_LIMIT), 10);
      const replyLimit = parseInt((storeData.getCookie({ key: 'recruitmentReplyLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_REPLY_LIMIT), 10);
      
      
      
      
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
        
        recruitmentThreads_id,
        threadLimit,
        commentLimit,
        replyLimit,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/recruitment-threads/delete`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj),
        
      });
      
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      
      
      // ---------------------------------------------
      //   DOM 削除
      // ---------------------------------------------
      
      const page = lodashGet(this.dataObj, [gameCommunities_id, 'recruitmentThreadsObj', 'page'], 1);
      const arr = lodashGet(this.dataObj, [gameCommunities_id, 'recruitmentThreadsObj', `page${page}Obj`, 'arr'], []);
      const newArr = arr.filter(value => value !== recruitmentThreads_id);
      lodashSet(this.dataObj, [gameCommunities_id, 'recruitmentThreadsObj', `page${page}Obj`, 'arr'], newArr);
      
      const dataObj = lodashGet(this.dataObj, [gameCommunities_id, 'recruitmentThreadsObj', 'dataObj'], {});
      delete dataObj[recruitmentThreads_id];
      
      
      // ---------------------------------------------
      //   Scroll
      // ---------------------------------------------
      
      storeLayout.handleScrollTo({
        
        to: 'recruitmentThreads',
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
        
      });
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'success',
        messageID: 'j6lSS-Zf5',
      });
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/gc/rec/stores/store.js / handleDeleteRecruitmentComment
      // `);
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
      //   recruitmentComments_id: {green ${recruitmentComments_id}}
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
   * コメントを削除する
   * @param {Array} pathArr - パス
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティID
   * @param {string} recruitmentThreads_id - DB recruitment-threads _id / スレッドID
   * @param {string} recruitmentComments_id - DB recruitment-comments _id / コメントID
   */
  @action.bound
  async handleDeleteRecruitmentComment({
    
    pathArr,
    gameCommunities_id,
    recruitmentThreads_id,
    recruitmentComments_id,
    
  }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const threadLimit = parseInt((storeData.getCookie({ key: 'recruitmentThreadLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_THREAD_LIMIT), 10);
      const commentLimit = parseInt((storeData.getCookie({ key: 'recruitmentCommentLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_COMMENT_LIMIT), 10);
      const replyLimit = parseInt((storeData.getCookie({ key: 'recruitmentReplyLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_REPLY_LIMIT), 10);
      
      
      
      
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
        recruitmentComments_id,
        threadLimit,
        commentLimit,
        replyLimit,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/recruitment-comments/delete`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj),
        
      });
      
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      
      
      // ---------------------------------------------
      //   DOM 削除
      // ---------------------------------------------
      
      const page = lodashGet(this.dataObj, [gameCommunities_id, 'recruitmentCommentsObj', recruitmentThreads_id, 'page'], 1);
      const arr = lodashGet(this.dataObj, [gameCommunities_id, 'recruitmentCommentsObj', recruitmentThreads_id, `page${page}Obj`, 'arr'], []);
      const newArr = arr.filter(value => value !== recruitmentComments_id);
      lodashSet(this.dataObj, [gameCommunities_id, 'recruitmentCommentsObj', recruitmentThreads_id, `page${page}Obj`, 'arr'], newArr);
      
      const dataObj = lodashGet(this.dataObj, [gameCommunities_id, 'recruitmentCommentsObj', 'dataObj'], {});
      delete dataObj[recruitmentComments_id];
      
      
      // ---------------------------------------------
      //   Scroll
      // ---------------------------------------------
      
      storeLayout.handleScrollTo({
        
        to: recruitmentThreads_id,
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
        
      });
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'success',
        messageID: 'j6lSS-Zf5',
      });
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/gc/rec/stores/store.js / handleDeleteRecruitmentComment
      // `);
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
      //   recruitmentComments_id: {green ${recruitmentComments_id}}
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
   * 返信を削除する
   * @param {Array} pathArr - パス
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティID
   * @param {string} recruitmentThreads_id - DB recruitment-threads _id / スレッドID
   * @param {string} recruitmentComments_id - DB recruitment-comments _id / コメントID
   * @param {string} recruitmentReplies_id - DB recruitment-replies _id / 返信ID
   */
  @action.bound
  async handleDeleteRecruitmentReply({
    
    pathArr,
    gameCommunities_id,
    recruitmentThreads_id,
    recruitmentComments_id,
    recruitmentReplies_id,
    
  }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const threadLimit = parseInt((storeData.getCookie({ key: 'recruitmentThreadLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_THREAD_LIMIT), 10);
      const commentLimit = parseInt((storeData.getCookie({ key: 'recruitmentCommentLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_COMMENT_LIMIT), 10);
      const replyLimit = parseInt((storeData.getCookie({ key: 'recruitmentReplyLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_REPLY_LIMIT), 10);
      
      
      
      
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
        
        recruitmentReplies_id,
        threadLimit,
        commentLimit,
        replyLimit,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/recruitment-replies/delete`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj),
        
      });
      
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      
      
      // ---------------------------------------------
      //   DOM 削除
      // ---------------------------------------------
      
      const page = lodashGet(this.dataObj, [gameCommunities_id, 'recruitmentRepliesObj', recruitmentComments_id, 'page'], 1);
      const arr = lodashGet(this.dataObj, [gameCommunities_id, 'recruitmentRepliesObj', recruitmentComments_id, `page${page}Obj`, 'arr'], []);
      const newArr = arr.filter(value => value !== recruitmentReplies_id);
      lodashSet(this.dataObj, [gameCommunities_id, 'recruitmentRepliesObj', recruitmentComments_id, `page${page}Obj`, 'arr'], newArr);
      
      const dataObj = lodashGet(this.dataObj, [gameCommunities_id, 'recruitmentRepliesObj', 'dataObj'], {});
      delete dataObj[recruitmentReplies_id];
      
      
      // ---------------------------------------------
      //   Scroll
      // ---------------------------------------------
      
      storeLayout.handleScrollTo({
        
        to: recruitmentComments_id,
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
        
      });
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'success',
        messageID: 'j6lSS-Zf5',
      });
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/gc/rec/stores/store.js / handleDeleteRecruitmentReply
      // `);
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
      //   recruitmentComments_id: {green ${recruitmentComments_id}}
      //   recruitmentReplies_id: {green ${recruitmentReplies_id}}
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
  
  
  
  
  
  
  // ---------------------------------------------
  //   ID Form
  // ---------------------------------------------
  
  /**
   * ID 選択・編集フォームで利用する
   * @param {Array} pathArr - パス
   * @param {Array} idsArr - DB ids _id が入っている配列
   */
  @action.bound
  async handleSetIDsArr({ pathArr, idsArr }) {
    
    
    // ---------------------------------------------
    //   Set
    // ---------------------------------------------
    
    const clonedArr = lodashCloneDeep(idsArr);
    lodashSet(this.dataObj, [...pathArr, 'idsArr'], clonedArr);
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/gc/rec/stores/store.js - handleSetIDsArr
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
    
    
  };
  
  
  
  
  
  
  // ---------------------------------------------
  //   通知
  // ---------------------------------------------
  
  /**
   * 通知設定 - 購読データを取得する
   * @param {Array} pathArr - パス
   * @param {boolean} checked - チェックの状態
   */
  @action.bound
  async handleGetWebPushSubscribeObj({ pathArr, checked }) {
    
    
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
      
      let webPushSubscriptionObj = {};
      
      if (checked) {
        
        webPushSubscriptionObj = await storeWebPush.handleWebPushSubscribe();
        lodashSet(this.dataObj, [...pathArr, 'webPushSubscriptionObj'], webPushSubscriptionObj);
        
      }
      
      
      
      
      // ---------------------------------------------
      //   Check Box
      // ---------------------------------------------
      
      lodashSet(this.dataObj, [...pathArr, 'webPushAvailable'], checked);
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/gc/rec/stores/store.js - handleGetWebPushSubscribeObj
      // `);
      
      // console.log(`
      //   ----- webPushSubscriptionObj -----\n
      //   ${util.inspect(webPushSubscriptionObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
    } catch (errorObj) {
      
      
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
    
    
    
    // console.log(`
    //     ----- propsObj -----\n
    //     ${util.inspect(propsObj, { colors: true, depth: null })}\n
    //     --------------------\n
    //   `);
    
    // --------------------------------------------------
    //   hardwareIDsArr
    // --------------------------------------------------
    
    const hardwaresArr = lodashGet(propsObj, ['hardwaresArr'], null);
    
    if (hardwaresArr) {
      
      // console.log(`
      //   ----- hardwaresArr -----\n
      //   ${util.inspect(hardwaresArr, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      lodashSet(storeHardware, ['dataObj', gameCommunities_id, 'recruitment', 'navigation', 'hardwaresArr'], hardwaresArr);
      
    }
    
    
    // --------------------------------------------------
    //   categoriesArr
    // --------------------------------------------------
    
    const categories = lodashGet(propsObj, ['recruitmentNavigationObj', 'categories'], null);
    const categoriesArr = categories ? categories.split(',') : [];
    
    // console.log(chalk`
    //   categories: {green ${categories}}
    // `);
    
    // console.log(`
    //   ----- categoriesArr -----\n
    //   ${util.inspect(categoriesArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    if (categoriesArr.length > 0) {
      
      const tempArr = [];
      
      for (let value of categoriesArr.values()) {
        tempArr.push(parseInt(value, 10));
      }
      
      // console.log(`
      //   ----- tempArr -----\n
      //   ${util.inspect(tempArr, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      lodashSet(storeGcRecruitment, ['dataObj', gameCommunities_id, 'recruitment', 'navigation', 'categoriesArr'], tempArr);
      
    }
    
    
    // --------------------------------------------------
    //   keyword
    // --------------------------------------------------
    
    const keyword = lodashGet(propsObj, ['recruitmentNavigationObj', 'keyword'], null);
    
    if (keyword) {
      lodashSet(storeGcRecruitment, ['dataObj', gameCommunities_id, 'recruitment', 'navigation', 'keyword'], keyword);
    }
    
    
    
    
    // --------------------------------------------------
    //   recruitmentThreadsObj
    // --------------------------------------------------
    
    const recruitmentThreadsObj = lodashGet(propsObj, ['recruitmentThreadsObj'], null);
    
    if (recruitmentThreadsObj) {
      lodashSet(storeGcRecruitment, ['dataObj', gameCommunities_id, 'recruitmentThreadsObj'], recruitmentThreadsObj);
    }
    
    
    // --------------------------------------------------
    //   recruitmentCommentsObj
    // --------------------------------------------------
    
    const recruitmentCommentsObj = lodashGet(propsObj, ['recruitmentCommentsObj'], null);
    
    if (recruitmentCommentsObj) {
      lodashSet(storeGcRecruitment, ['dataObj', gameCommunities_id, 'recruitmentCommentsObj'], recruitmentCommentsObj);
    }
    
    
    // --------------------------------------------------
    //   recruitmentRepliesObj
    // --------------------------------------------------
    
    const recruitmentRepliesObj = lodashGet(propsObj, ['recruitmentRepliesObj'], null);
    
    if (recruitmentCommentsObj) {
      lodashSet(storeGcRecruitment, ['dataObj', gameCommunities_id, 'recruitmentRepliesObj'], recruitmentRepliesObj);
    }
    
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storeGcRecruitment;
  
  
}