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

import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Router from 'next/router';
import { useIntl } from 'react-intl';
import { Element } from 'react-scroll';
import TextareaAutosize from 'react-autosize-textarea';
// import Pagination from 'rc-pagination';
// import localeInfo from 'rc-pagination/lib/locale/ja_JP';
// import Cookies from 'js-cookie';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
// import lodashCloneDeep from 'lodash/cloneDeep';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateUser } from 'app/@states/user.js';
import { ContainerStateLayout } from 'app/@states/layout.js';
import { ContainerStateGc } from 'app/@states/gc.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

// import { handleWebPushSubscribe } from 'app/@modules/web-push.js';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationRecruitmentThreadsTitle } from 'app/@database/recruitment-threads/validations/title.js';
import { validationRecruitmentThreadsName } from 'app/@database/recruitment-threads/validations/name.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import FormImageAndVideo from 'app/common/image-and-video/v2/components/form.js';
import FormHardwares from 'app/common/hardware/v2/components/form.js';
import WebPuchCheckbox from 'app/common/web-push/v2/components/checkbox.js';
import FormIDsInformations from 'app/gc/rec/v2/components/form/ids-informations.js';
import FormDeadline from 'app/gc/rec/v2/components/form/deadline.js';






// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cssBox = css`
  border-top: 1px dashed #848484;
  margin: 24px 0 0 0;
  padding: 24px 0 0 0;
`;


// --------------------------------------------------
//   Material UI Style Overrides
//   https://material-ui.com/styles/basics/
// --------------------------------------------------

const useStyles = makeStyles({
  
  label: {
    fontSize: 14
  },
  
});






// --------------------------------------------------
//   Function Components
// --------------------------------------------------

/**
 * Export Component
 */
const Component = (props) => {
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  const {
    
    gameCommunities_id,
    recruitmentThreads_id,
    
    setShowForm,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  const classes = useStyles();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  const [hardwaresArr, setHardwaresArr] = useState([]);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [webPushAvailable, setWebPushAvailable] = useState(false);
  const [webPushSubscriptionObj, setWebPushSubscriptionObj] = useState({});
  const [imagesAndVideosObj, setImagesAndVideosObj] = useState({
    
    _id: '',
    createdDate: '',
    updatedDate: '',
    users_id: '',
    type: 'recruitment',
    arr: [],
    
  });
  
  const [ids_idsArr, setIDs_idsArr] = useState([]);
  const [platform1, setPlatform1] = useState('');
  const [platform2, setPlatform2] = useState('');
  const [platform3, setPlatform3] = useState('');
  const [id1, setID1] = useState('');
  const [id2, setID2] = useState('');
  const [id3, setID3] = useState('');
  const [informationTitle1, setInformationTitle1] = useState('');
  const [informationTitle2, setInformationTitle2] = useState('');
  const [informationTitle3, setInformationTitle3] = useState('');
  const [informationTitle4, setInformationTitle4] = useState('');
  const [informationTitle5, setInformationTitle5] = useState('');
  const [information1, setInformation1] = useState('');
  const [information2, setInformation2] = useState('');
  const [information3, setInformation3] = useState('');
  const [information4, setInformation4] = useState('');
  const [information5, setInformation5] = useState('');
  const [publicSetting, setPublicSetting] = useState(1);
  
  const [deadlineDate, setDeadlineDate] = useState('');
  
  
  useEffect(() => {
    
    
    // --------------------------------------------------
    //   Button Enable
    // --------------------------------------------------
    
    setButtonDisabled(false);
    
    
    // --------------------------------------------------
    //   編集用データを読み込む
    // --------------------------------------------------
    
    if (recruitmentThreads_id) {
      handleGetEditData({ recruitmentThreads_id });
    }
    
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  const stateUser = ContainerStateUser.useContainer();
  const stateLayout = ContainerStateLayout.useContainer();
  const stateGc = ContainerStateGc.useContainer();
  
  const { login } = stateUser;
  
  const {
    
    handleSnackbarOpen,
    handleDialogOpen,
    handleLoadingOpen,
    handleLoadingClose,
    handleScrollTo,
    
  } = stateLayout;
  
  const {
    
    recruitmentThreadsObj,
    
  } = stateGc;
  
  
  
  
  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------
  
  /**
   * 通知設定 - 購読データを取得する
   * @param {boolean} checked - チェックの状態
   */
  // const handleWebPush = async (checked) => {
    
    
  //   try {
      
      
  //     // ---------------------------------------------
  //     //   Loading Open
  //     // ---------------------------------------------
      
  //     handleLoadingOpen({});
      
      
  //     // ---------------------------------------------
  //     //   Button Disable
  //     // ---------------------------------------------
      
  //     setButtonDisabled(true);
      
      
      
      
  //     // ---------------------------------------------
  //     //   Subscribe
  //     // ---------------------------------------------
      
  //     let webPushSubscriptionObj = {};
      
  //     if (checked) {
        
  //       // webPushSubscriptionObj = await handleWebPushSubscribe();
  //       // // lodashSet(this.dataObj, [...pathArr, 'webPushSubscriptionObj'], webPushSubscriptionObj);
        
        
  //       // console.log(`
  //       //   ----- webPushSubscriptionObj -----\n
  //       //   ${util.inspect(JSON.parse(JSON.stringify(webPushSubscriptionObj)), { colors: true, depth: null })}\n
  //       //   --------------------\n
  //       // `);
        
  //     }
      
      
      
      
  //     // ---------------------------------------------
  //     //   Check
  //     // ---------------------------------------------
      
  //     setWebPushAvailable(!webPushAvailable);
      
      
      
      
  //     // --------------------------------------------------
  //     //   console.log
  //     // --------------------------------------------------
      
  //     // console.log(`
  //     //   ----------------------------------------\n
  //     //   /app/gc/rec/v2/components/form/thread.js - handleWebPush
  //     // `);
      
  //     // console.log(`
  //     //   ----- webPushSubscriptionObj -----\n
  //     //   ${util.inspect(webPushSubscriptionObj, { colors: true, depth: null })}\n
  //     //   --------------------\n
  //     // `);
      
      
  //   } catch (errorObj) {
      
      
  //     // ---------------------------------------------
  //     //   Snackbar: Error
  //     // ---------------------------------------------
      
  //     handleSnackbarOpen({
        
  //       variant: 'error',
  //       messageID: 'KkWs0oIKw',
        
  //     });
      
      
  //   } finally {
      
      
  //     // ---------------------------------------------
  //     //   Button Enable
  //     // ---------------------------------------------
      
  //     setButtonDisabled(false);
      
      
  //     // ---------------------------------------------
  //     //   Loading Close
  //     // ---------------------------------------------
      
  //     handleLoadingClose();
      
      
  //   }
    
    
  // };
  
  
  
  
  /**
   * 編集用データを読み込む
   * @param {string} recruitmentThreads_id - DB recruitment-threads _id / スレッドのID
   */
  const handleGetEditData = async ({ recruitmentThreads_id }) => {
    
    
    try {
      
      
      // ---------------------------------------------
      //   forumThreads_id が存在しない場合エラー
      // ---------------------------------------------
      
      if (!forumThreads_id) {
        throw new CustomError({ errorsArr: [{ code: '5bsoal_-V', messageID: 'Error' }] });
      }
      
      
      
      
      // ---------------------------------------------
      //   Loading Open
      // ---------------------------------------------
      
      handleLoadingOpen({});
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      setButtonDisabled(true);
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        forumThreads_id,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/forum-threads/get-edit-data`,
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
      //   Set Form Data
      // ---------------------------------------------
      
      const name = lodashGet(resultObj, ['data', 'name'], '');
      const comment = lodashGet(resultObj, ['data', 'comment'], '');
      let imagesAndVideosObj = lodashGet(resultObj, ['data', 'imagesAndVideosObj'], {});
      
      if (Object.keys(imagesAndVideosObj).length === 0) {
        
        imagesAndVideosObj = {
          
          _id: '',
          createdDate: '',
          updatedDate: '',
          users_id: '',
          type: 'forum',
          arr: [],
          
        };
        
      }
      
      setName(name);
      setComment(comment);
      setImagesAndVideosObj(imagesAndVideosObj);
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      handleSnackbarOpen({
        variant: 'error',
        errorObj,
      });
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      setButtonDisabled(false);
      
      
      // ---------------------------------------------
      //   Loading Close
      // ---------------------------------------------
      
      handleLoadingClose();
      
      
      // ---------------------------------------------
      //   Scroll To
      // ---------------------------------------------
      
      handleScrollTo({
        
        to: forumThreads_id,
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
        
      });
      
      
    }
    
    
  };
  
  
  
  
  /**
   * 募集を投稿する
   * @param {Object} eventObj - イベント
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} recruitmentThreads_id - DB recruitment-threads _id / 募集スレッドのID
   */
  const handleSubmit = async ({
    
    eventObj,
    gameCommunities_id,
    recruitmentThreads_id,
    
  }) => {
    
    
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
   * スレッド作成・編集フォームを送信する
   * @param {Object} eventObj - イベント
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} recruitmentThreads_id - DB recruitment-threads _id / 編集するスレッドのID
   */
  const handleSubmit2 = async ({
    
    eventObj,
    gameCommunities_id,
    recruitmentThreads_id,
    
  }) => {
    
    
    // ---------------------------------------------
    //   フォームの送信処理停止
    // ---------------------------------------------
    
    eventObj.preventDefault();
    
    
    
    // ---------------------------------------------
    //   新規投稿時の forumThreads_id
    // ---------------------------------------------
    
    let newForumThreads_id = '';
    
    
    
    
    try {
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const threadListLimit = parseInt((getCookie({ key: 'forumThreadListLimit' }) || process.env.NEXT_PUBLIC_FORUM_THREAD_LIST_LIMIT), 10);
      const threadLimit = parseInt((getCookie({ key: 'forumThreadLimit' }) || process.env.NEXT_PUBLIC_FORUM_THREAD_LIMIT), 10);
      const commentLimit = parseInt((getCookie({ key: 'forumCommentLimit' }) || process.env.NEXT_PUBLIC_FORUM_COMMENT_LIMIT), 10);
      const replyLimit = parseInt((getCookie({ key: 'forumReplyLimit' }) || process.env.NEXT_PUBLIC_FORUM_REPLY_LIMIT), 10);
      
      
      
      
      // ---------------------------------------------
      //   _id が存在しない場合エラー
      // ---------------------------------------------
      
      if (!gameCommunities_id && !userCommunities_id) {
        throw new CustomError({ errorsArr: [{ code: '8319EqfHo', messageID: '1YJnibkmh' }] });
      }
      
      
      // ---------------------------------------------
      //   Validation
      // ---------------------------------------------
      
      // const validationHandleNameObj = validationForumThreadsName({ value: name });
      // const validationForumThreadsCommentObj = validationForumThreadsComment({ value: comment });
      
      
      // ---------------------------------------------
      //   Validation Error
      // ---------------------------------------------
      
      if (
        
        validationForumThreadsName({ value: name }).error ||
        validationForumThreadsComment({ value: comment }).error
        
      ) {
        
        throw new CustomError({ errorsArr: [{ code: '3NtQODEsb', messageID: 'uwHIKBy7c' }] });
        
      }
      
      
      
      
      // ---------------------------------------------
      //   Loading Open
      // ---------------------------------------------
      
      handleLoadingOpen({});
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      setButtonDisabled(true);
      
      
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/common/forum/v2/components/form-thread.js - handleSubmit
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   userCommunities_id: {green ${userCommunities_id}}
      //   forumThreads_id: {green ${forumThreads_id}}
      //   name: {green ${name}}
      //   comment: {green ${comment}}
      // `);
      
      // console.log(`
      //   ----- imagesAndVideosObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // return;
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        gameCommunities_id,
        userCommunities_id,
        forumThreads_id,
        name,
        comment,
        threadListLimit,
        threadLimit,
        commentLimit,
        replyLimit,
        
      };
      
      if (imagesAndVideosObj.arr.length !== 0) {
        formDataObj.imagesAndVideosObj = imagesAndVideosObj;
      }
      
      
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = {};
      
      if (gameCommunities_id) {
        
        resultObj = await fetchWrapper({
          
          urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/forum-threads/upsert-gc`,
          methodType: 'POST',
          formData: JSON.stringify(formDataObj),
          
        });
        
      } else {
        
        resultObj = await fetchWrapper({
          
          urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/forum-threads/upsert-uc`,
          methodType: 'POST',
          formData: JSON.stringify(formDataObj),
          
        });
        
      }
      
      
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
      //   gameCommunityObj
      // --------------------------------------------------
      
      setGameCommunityObj(lodashGet(resultObj, ['data', 'gameCommunityObj'], {}));
      
      
      // ---------------------------------------------
      //   forumThreadsForListObj
      // ---------------------------------------------
      
      setForumThreadsForListObj(lodashGet(resultObj, ['data', 'forumThreadsForListObj'], {}));
      
      
      // ---------------------------------------------
      //   forumThreadsObj
      // ---------------------------------------------
      
      setForumThreadsObj(lodashGet(resultObj, ['data', 'forumThreadsObj'], {}));
      
      
      // ---------------------------------------------
      //   forumCommentsObj
      // ---------------------------------------------
      
      setForumCommentsObj(lodashGet(resultObj, ['data', 'forumCommentsObj'], {}));
      
      
      // ---------------------------------------------
      //   forumRepliesObj
      // ---------------------------------------------
      
      setForumRepliesObj(lodashGet(resultObj, ['data', 'forumRepliesObj'], {}));
      
      
      
      
      // ---------------------------------------------
      //   Close Form & Reset Form
      // ---------------------------------------------
      
      if (forumThreads_id) {
        
        setShowForm(false);
        
      } else {
        
        setName('');
        setComment('');
        setImagesAndVideosObj({
          
          _id: '',
          createdDate: '',
          updatedDate: '',
          users_id: '',
          type: 'forum',
          arr: [],
          
        });
        
      }
      
      
      
      
      // ---------------------------------------------
      //   新規投稿時の forumThreads_id
      // ---------------------------------------------
      
      newForumThreads_id = lodashGet(resultObj, ['data', 'forumThreadsObj', 'page1Obj', 'arr', 0], '');
      
      // console.log(chalk`
      //   forumThreads_id: {green ${forumThreads_id}}
      // `);
      
      
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      handleSnackbarOpen({
        variant: 'success',
        messageID: forumThreads_id ? 'HINAkcSmJ' : 'pInPmleQh',
      });
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      handleSnackbarOpen({
        variant: 'error',
        errorObj,
      });
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      setButtonDisabled(false);
      
      
      // ---------------------------------------------
      //   Loading Close
      // ---------------------------------------------
      
      handleLoadingClose();
      
      
      // ---------------------------------------------
      //   Scroll To
      // ---------------------------------------------
      
      handleScrollTo({
        
        to: forumThreads_id || newForumThreads_id || 'forumThreads',
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
        
      });
      
      
    }
    
    
  };
  
  
  
  
  // --------------------------------------------------
  //   Forum
  // --------------------------------------------------
  
  // const {
    
  //   dataObj,
  //   handleEdit,
  //   handleSubmitRecruitmentThread,
  //   handleGetWebPushSubscribeObj,
  //   // handleDeleteRecruitmentThread,
  //   handleHideFormRecruitmentThread,
    
  // } = storeGcRecruitment;
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const limitHardwares = parseInt(process.env.NEXT_PUBLIC_RECRUITMENT_THREAD_HARDWARES_LIMIT, 10);
  const limitImagesAndVideos = parseInt(process.env.NEXT_PUBLIC_RECRUITMENT_THREAD_IMAGES_AND_VIDEOS_LIMIT, 10);
  
  
  
  
  // --------------------------------------------------
  //   Validations
  // --------------------------------------------------
  
  const validationRecruitmentThreadsTitleObj = validationRecruitmentThreadsTitle({ value: title });
  const validationRecruitmentThreadsNameObj = validationRecruitmentThreadsName({ value: name });
  
  
  
  
  // --------------------------------------------------
  //   Element Name
  // --------------------------------------------------
  
  const elementName = recruitmentThreads_id ? `${recruitmentThreads_id}-formThread` : `${gameCommunities_id}-formThread`;
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/gc/rec/v2/components/form/thread.js
  // `);
  
  // console.log(chalk`
  //   category: {green ${category} / ${typeof category}}
  // `);
  
  // console.log(chalk`
  //   gameCommunities_id: {green ${gameCommunities_id}}
  //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
  //   login: {green ${login}}
  //   formName: {green ${formName}}
  // `);
  
  // console.log(`
  //   ----- validationRecruitmentThreadsID1Obj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(validationRecruitmentThreadsID1Obj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <Element
      name={elementName}
    >
      
      
      {/* Form */}
      <form
        name={elementName}
        onSubmit={(eventObj) => handleSubmit({
          eventObj,
          gameCommunities_id,
          recruitmentThreads_id,
        })}
      >
        
        
        {/* Heading & Explanation */}
        {recruitmentThreads_id &&
          <React.Fragment>
          
            <h3
              css={css`
                font-weight: bold;
                margin: 0 0 12px 0;
              `}
            >
              募集編集フォーム
            </h3>
            
            
            <p
              css={css`
                margin: 0 0 14px 0;
              `}
            >
              投稿済みの募集を編集できます。
            </p>
            
          </React.Fragment>
        }
        
        
        {!recruitmentThreads_id &&
          <p
            css={css`
              margin: 0 0 14px 0;
            `}
          >
            募集を新しく投稿する場合、こちらのフォームを利用して投稿してください。ログインして投稿すると募集をいつでも編集できるようになり、ID・情報の公開相手を選ぶことができるようになります。
          </p>
        }
        
        
        
        
        {/* Form Hardware */}
        <div css={cssBox}>
          
          <h3
            css={css`
              font-weight: bold;
              margin: 0 0 2px 0;
            `}
          >
            ハードウェア
          </h3>
          
          
          <p
            css={css`
              margin: 0 0 14px 0;
            `}
          >
            募集に関係するハードウェアを選んでください（PC版、○○版などの情報です）
          </p>
          
          <p
            css={css`
              margin: 0 0 14px 0;
            `}
          >
            ハードウェア名（またはSFC、N64などの略称）の一部を入力すると、入力フォームの下に一覧でハードウェアの正式名称が表示されます。一覧上でハードウェアをクリック（タップ）すると入力は完了です。この欄では複数のハードウェアを入力することが可能です。
          </p>
          
          <p>
            ゲームのハードウェア名だけでなく、「Android」「iOS」「PC」などもハードウェアとして入力できます。
          </p>
          
          
          
          
          <FormHardwares
            hardwaresArr={hardwaresArr}
            setHardwaresArr={setHardwaresArr}
            limit={limitHardwares}
          />
          
        </div>
        
        
        
        
        {/* Category */}
        <div css={cssBox}>
          
          <h3
            css={css`
              font-weight: bold;
              margin: 0 0 2px 0;
            `}
          >
            カテゴリー
          </h3>
          
          <p
            css={css`
              margin: 0 0 24px 0;
            `}
          >
            当てはまるカテゴリーを選んでください。どのカテゴリーにも当てはまらない場合は「なし」を選んでください。
          </p>
          
          
          <FormControl>
            
            <InputLabel shrink id="categoryLabel">募集のカテゴリー</InputLabel>
            
            <Select
              css={css`
                && {
                  width: 200px;
                }
              `}
              labelId="categoryLabel"
              value={category}
              onChange={(eventObj) => setCategory(eventObj.target.value)}
              displayEmpty
            >
              <MenuItem value="">なし</MenuItem>
              <MenuItem value={1}>フレンド募集</MenuItem>
              <MenuItem value={2}>メンバー募集</MenuItem>
              <MenuItem value={3}>売買・交換相手募集</MenuItem>
            </Select>
            
          </FormControl>
          
        </div>
        
        
        
        
        {/* Title & Handle Name & Comment */}
        <div css={cssBox}>
          
          
          {/* Title */}
          <TextField
            css={css`
              && {
                width: 100%;
                max-width: 500px;
                ${recruitmentThreads_id && `margin-top: 4px;`}
              }
            `}
            label="募集タイトル"
            value={validationRecruitmentThreadsTitleObj.value}
            onChange={(eventObj) => setTitle(eventObj.target.value)}
            error={validationRecruitmentThreadsTitleObj.error}
            helperText={intl.formatMessage({ id: validationRecruitmentThreadsTitleObj.messageID }, { numberOfCharacters: validationRecruitmentThreadsTitleObj.numberOfCharacters })}
            margin="normal"
            inputProps={{
              maxLength: 100,
            }}
          />
          
          
          
          
          {/* Name */}
          {!login &&
            <TextField
              css={css`
                && {
                  width: 100%;
                  max-width: 500px;
                  ${recruitmentThreads_id && `margin-top: 4px;`}
                }
              `}
              label="ハンドルネーム"
              value={validationRecruitmentThreadsNameObj.value}
              onChange={(eventObj) => setName(eventObj.target.value)}
              error={validationRecruitmentThreadsNameObj.error}
              helperText={intl.formatMessage({ id: validationRecruitmentThreadsNameObj.messageID }, { numberOfCharacters: validationRecruitmentThreadsNameObj.numberOfCharacters })}
              margin="normal"
              inputProps={{
                maxLength: 50,
              }}
            />
          }
          
          
          
          
          {/* Comment */}
          <div
            css={css`
              margin: 12px 0 0 0;
            `}
          >
            
            <TextareaAutosize
              css={css`
                && {
                  width: 100%;
                  border-radius: 4px;
                  box-sizing: border-box;
                  padding: 8px 12px;
                  line-height: 1.8;
                  
                  &:focus {
                    outline: 1px #A9F5F2 solid;
                  }
                  
                  resize: none;
                }
              `}
              rows={5}
              placeholder="募集について必要な情報をこちらに記述してください。"
              value={comment}
              maxLength={3000}
              disabled={buttonDisabled}
              onChange={(eventObj) => setComment(eventObj.target.value)}
            />
            
          </div>
          
          
          
          
          {/* Form Images & Videos */}
          <div
            css={css`
              margin: 12px 0 0 0;
            `}
          >
            
            <FormImageAndVideo
              type="recruitment"
              descriptionImage="募集に表示する画像をアップロードできます。"
              descriptionVideo="募集に表示する動画を登録できます。"
              showImageCaption={true}
              limit={limitImagesAndVideos}
              imagesAndVideosObj={imagesAndVideosObj}
              setImagesAndVideosObj={setImagesAndVideosObj}
            />
            
          </div>
          
          
        </div>
        
        
        
        
        {/* ID & Other Information */}
        <div css={cssBox}>
          
          <FormIDsInformations
            type="thread"
            gameCommunities_id={gameCommunities_id}
            recruitmentThreads_id={recruitmentThreads_id}
            
            ids_idsArr={ids_idsArr}
            setIDs_idsArr={setIDs_idsArr}
            
            platform1={platform1}
            setPlatform1={setPlatform1}
            platform2={platform2}
            setPlatform2={setPlatform2}
            platform3={platform3}
            setPlatform3={setPlatform3}
            
            id1={id1}
            setID1={setID1}
            id2={id2}
            setID2={setID2}
            id3={id3}
            setID3={setID3}
            
            informationTitle1={informationTitle1}
            setInformationTitle1={setInformationTitle1}
            informationTitle2={informationTitle2}
            setInformationTitle2={setInformationTitle2}
            informationTitle3={informationTitle3}
            setInformationTitle3={setInformationTitle3}
            informationTitle4={informationTitle4}
            setInformationTitle4={setInformationTitle4}
            informationTitle5={informationTitle5}
            setInformationTitle5={setInformationTitle5}
            
            information1={information1}
            setInformation1={setInformation1}
            information2={information2}
            setInformation2={setInformation2}
            information3={information3}
            setInformation3={setInformation3}
            information4={information4}
            setInformation4={setInformation4}
            information5={information5}
            setInformation5={setInformation5}
            
            publicSetting={publicSetting}
            setPublicSetting={setPublicSetting}
          />
          
        </div>
        
        
        
        
        {/* Deadline */}
        <div css={cssBox}>
          
          <FormDeadline
            deadlineDate={deadlineDate}
            setDeadlineDate={setDeadlineDate}
            recruitmentThreads_id={recruitmentThreads_id}
          />
          
        </div>
        
        
        
        
        {/* プッシュ通知 */}
        <div css={cssBox}>
          
          <h3
            css={css`
              font-weight: bold;
              margin: 0 0 2px 0;
            `}
          >
            プッシュ通知
          </h3>
          
          <p
            css={css`
              margin: 0 0 12px 0;
            `}
          >
            ブラウザで通知を受け取れるプッシュ通知の設定を行えます。プッシュ通知を許可すると、募集に返信があったときに通知を受け取れるのでおすすめです。
          </p>
          
          <p
            css={css`
              margin: 0 0 12px 0;
            `}
          >
            プッシュ通知に対応しているブラウザは Chrome、Edge、Firefox、Opera です。
          </p>
          
          <p
            css={css`
              margin: 0 0 12px 0;
            `}
          >
            過去にGame Usersからのプッシュ通知をブロックしたことがある方は、ブロックを解除しなければ通知を受けることができません。通知を受け取りたい場合は、ご使用のブラウザのブロック解除方法を調べて実行してください。
          </p>
          
          
          
          
          <WebPuchCheckbox
            webPushAvailable={webPushAvailable}
            setWebPushAvailable={setWebPushAvailable}
            webPushSubscriptionObj={webPushSubscriptionObj}
            setWebPushSubscriptionObj={setWebPushSubscriptionObj}
          />
          
          {/*<div>
            <FormControlLabel
              classes={{
                label: classes.label
              }}
              control={
                <Checkbox
                  checked={webPushAvailable}
                  onChange={(eventObj) => handleWebPush(eventObj.target.checked)}
                />
              }
              label="プッシュ通知を許可する"
            />
          </div>*/}
          
        </div>
        
        
        
        
        {/* Buttons */}
        <div
          css={css`
            display: flex;
            flex-flow: row nowrap;
            border-top: 1px dashed #848484;
            margin: 24px 0 0 0;
            padding: 36px 0 0 0;
          `}
        >
          
          
          {/* Submit */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={buttonDisabled}
          >
            {recruitmentThreads_id ? '編集する' : '投稿する'}
          </Button>
          
          
          
          
          {/* Close */}
          {recruitmentThreads_id &&
            <div
              css={css`
                margin: 0 0 0 auto;
              `}
            >
              <Button
                variant="outlined"
                color="secondary"
                // onClick={() => handleHideFormRecruitmentThread({
                //   pathArr,
                //   recruitmentThreads_id,
                // })}
                disabled={buttonDisabled}
                onClick={() => setShowForm(false)}
              >
                閉じる
              </Button>
            </div>
          }
          
        </div>
        
        
      </form>
      
      
    </Element>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;