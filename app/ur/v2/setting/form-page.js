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
import Link from 'next/link';
import Router from 'next/router';
import { useIntl } from 'react-intl';
import { Element } from 'react-scroll';
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/ja_JP';
import Cookies from 'js-cookie';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconDoubleArrow from '@material-ui/icons/DoubleArrow';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateForum } from 'app/@states/forum.js';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationUsersUserID } from 'app/@database/users/validations/user-id.js';
import { validationUsersPagesName } from 'app/@database/users/validations/pages.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Panel from 'app/common/layout/v2/components/panel.js';
import FormImageAndVideo from 'app/common/image-and-video/v2/components/form.js';






// --------------------------------------------------
//   Material UI Style Overrides
//   https://material-ui.com/styles/basics/
// --------------------------------------------------

const useStyles = makeStyles({
  
  expanded: {
    marginBottom: '0 !important',
  },
  
  input: {
    fontSize: '12px',
    color: '#666',
    padding: '6px 26px 6px 12px',
  },
  
});






// --------------------------------------------------
//   Function Components
// --------------------------------------------------

/**
 * Form Page Title
 */
const FormPageTitle = (props) => {
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  // const {
    
  //   arr = [],
    
  // } = props;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  const classes = useStyles();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  const [type, setType] = useState(props.type);
  const [name, setName] = useState(props.name);
  const [language, setLanguage] = useState(props.language);
  
  
  useEffect(() => {
    
    setButtonDisabled(false);
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   Validation
  // --------------------------------------------------
  
  const validationUsersPagesNameObj = validationUsersPagesName({ value: name });
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/ur/v2/setting/form-page.js
  // `);
  
  // console.log(`
  //   ----- arr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <React.Fragment>
      
      
      {/*<FormControl
        css={css`
          margin: 8px 0 0 0 !important;
        `}
        // variant="outlined"
        disabled={buttonDisabled}
      >
        
        <InputLabel htmlFor="pageType">変更するページ</InputLabel>
        
        <Select
          css={css`
            width: 250px;
          `}
          value={valueObj.type}
          onChange={(eventObj) => handleEdit({
            pathArr: ['pagesArr', 0, 'type'],
            value: eventObj.target.value
          })}
          inputProps={{
            name: 'pageType',
            id: 'pageType',
          }}
        >
          <MenuItem value={'top'}>トップページ</MenuItem>
        </Select>
        
      </FormControl>*/}
      
      
      
      
      <div
        css={css`
          // margin: 8px 0 12px 0;
        `}
      >
        
        <TextField
          css={css`
            && {
              width: 100%;
              max-width: 500px;
            }
          `}
          id="createTreadName"
          label="タイトル"
          value={validationUsersPagesNameObj.value}
          onChange={(eventObj) => setName(eventObj.target.value)}
          error={validationUsersPagesNameObj.error}
          helperText={intl.formatMessage({ id: validationUsersPagesNameObj.messageID }, { numberOfCharacters: validationUsersPagesNameObj.numberOfCharacters })}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />
        
      </div>
      
      
      
      
      {/*<FormControl disabled={buttonDisabled}>
        
        <InputLabel htmlFor="pageLanguage">タイトルの言語</InputLabel>
        
        <Select
          css={css`
            width: 250px;
          `}
          value={valueObj.language}
          onChange={(eventObj) => handleEdit({
            pathArr: ['pagesArr', 0, 'language'],
            value: eventObj.target.value
          })}
          inputProps={{
            name: 'pageLanguage',
            id: 'pageLanguage',
          }}
        >
          <MenuItem value={'ja'}>日本語</MenuItem>
        </Select>
        
      </FormControl>*/}
      
      
    </React.Fragment>
  );
  
  
};




/**
 * Export Component
 */
const Component = (props) => {
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  const {
    
    pagesObj,
    
  } = props;
  
  const arr = lodashGet(pagesObj, ['arr'], [{
    
    _id: '',
    type: 'top',
    name: '',
    language: 'ja',
    
  }]);
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  const classes = useStyles();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  const [userID, setUserID] = useState(lodashGet(props, ['userID'], ''));
  const [approval, setApproval] = useState(lodashGet(props, ['approval'], false));
  const [pagesArr, setPagesArr] = useState(arr);
  
  const [imagesAndVideosObj, setImagesAndVideosObj] = useState({
    
    _id: '',
    createdDate: '',
    updatedDate: '',
    users_id: '',
    type: 'ur',
    arr: [],
    
  });
  
  
  useEffect(() => {
    
    setButtonDisabled(false);
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  // const stateForum = ContainerStateForum.useContainer();
  
  // const {
    
  //   forumThreadsObj,
    
  // } = stateForum;
  
  
  
  
  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------
  
  /**
   * 募集を投稿する
   * @param {Object} eventObj - イベント
   */
  const handleSubmit = async ({
    
    eventObj,
    
  }) => {
    
    
    // ---------------------------------------------
    //   フォームの送信処理停止
    // ---------------------------------------------
    
    eventObj.preventDefault();
    
    
    // ---------------------------------------------
    //   新規投稿時の recruitmentThreads_id
    // ---------------------------------------------
    
    let newRecruitmentThreads_id = '';
    
    
    
    
    try {
      
      
      // console.log(chalk`
      //   platform1: {green ${platform1}}
      //   platform2: {green ${platform2}}
      //   platform3: {green ${platform3}}
      // `);
      
      
      // ---------------------------------------------
      //   Temp Data
      // ---------------------------------------------
      
      // setHardwaresArr([ { hardwareID: 'I-iu-WmkO', name: 'ファミリーコンピュータ' },  { hardwareID: '2yKF4qXAw', name: 'メガドライブ' } ]);
      // setCategory(1);
      // setTitle('テストタイトル');
      // setName('テストネーム');
      // setComment('テストコメント');
      // setWebPushAvailable(true);
      // setPlatform1('Other');
      // setPlatform2('Other');
      // setPlatform3('Other');
      // setID1('test-id-1');
      // setInformationTitle1('情報タイトル1');
      // setInformation1('情報1');
      // setPublicSetting(1);
      // setDeadlineDate('');
      // setWebPushSubscriptionObj({
        
      //   endpoint: 'https://fcm.googleapis.com/fcm/send/fStle9C5HJk:APA91bFMuBrN4DaT6QOVLhkXbaDJCTEM3q0hE8gM_FPqMqE7SgN6fkxylrFLfve3C8QA7O03Q-UWMXI2LQINSpCCveDrMV3FOpTfPfRhjabMbM43dsBVcKHJy4QcasADEW9KqA40Ea5y',
      //   keys: {
      //     p256dh: 'BCleeWTRP95hSeOXd3lTmcGInU2AFR4xEfy6W_kgzwd7IT_GMXzbhriEerFEFZDEXOQJNTGUFObhkol2P7qTMWw',
      //     auth: 'siDbUa9DCbg-n9AMsvWA1w'
      //   }
        
      // });
      
      
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const hardwareIDsArr = [];
      
      for (let valueObj of hardwaresArr.values()) {
        hardwareIDsArr.push(valueObj.hardwareID);
      }
      
      const threadLimit = parseInt((getCookie({ key: 'recruitmentThreadLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_THREAD_LIMIT), 10);
      const commentLimit = parseInt((getCookie({ key: 'recruitmentCommentLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_COMMENT_LIMIT), 10);
      const replyLimit = parseInt((getCookie({ key: 'recruitmentReplyLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_REPLY_LIMIT), 10);
      
      
      
      
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
      
      if (imagesAndVideosObj.arr.length !== 0) {
        formDataObj.imagesAndVideosObj = imagesAndVideosObj;
      }
      
      if (webPushAvailable && Object.keys(webPushSubscriptionObj).length !== 0) {
        formDataObj.webPushSubscriptionObj = webPushSubscriptionObj;
      }
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/recruitment-threads/upsert`,
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
      //   Reset Form
      // ---------------------------------------------
      
      setHardwaresArr([]);
      setCategory('');
      setTitle('');
      setName('');
      setComment('');
      setImagesAndVideosObj({
        
        _id: '',
        createdDate: '',
        updatedDate: '',
        users_id: '',
        type: 'recruitment',
        arr: [],
        
      });
      
      setIDsArr([]);
      setPlatform1('Other');
      setPlatform2('Other');
      setPlatform3('Other');
      setID1('');
      setID2('');
      setID3('');
      setInformationTitle1('');
      setInformationTitle2('');
      setInformationTitle3('');
      setInformationTitle4('');
      setInformationTitle5('');
      setInformation1('');
      setInformation2('');
      setInformation3('');
      setInformation4('');
      setInformation5('');
      setPublicSetting(1);
      setDeadlineDate('');
      setWebPushAvailable(false);
      setWebPushSubscriptionObj({});
      
      
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      setButtonDisabled(false);
      
      
      // --------------------------------------------------
      //   gameCommunityObj
      // --------------------------------------------------
      
      setGameCommunityObj(lodashGet(resultObj, ['data', 'gameCommunityObj'], {}));
      
      
      // ---------------------------------------------
      //   forumThreadsObj
      // ---------------------------------------------
      
      setRecruitmentThreadsObj(lodashGet(resultObj, ['data', 'recruitmentThreadsObj'], {}));
      
      
      // ---------------------------------------------
      //   forumCommentsObj
      // ---------------------------------------------
      
      setRecruitmentCommentsObj(lodashGet(resultObj, ['data', 'recruitmentCommentsObj'], {}));
      
      
      // ---------------------------------------------
      //   forumRepliesObj
      // ---------------------------------------------
      
      setRecruitmentRepliesObj(lodashGet(resultObj, ['data', 'recruitmentRepliesObj'], {}));
      
      
      // ---------------------------------------------
      //   新規投稿時の recruitmentThreads_id
      // ---------------------------------------------
      
      newRecruitmentThreads_id = lodashGet(resultObj, ['data', 'recruitmentThreadsObj', 'page1Obj', 'arr', 0], '');
      
      
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      handleSnackbarOpen({
        
        variant: 'success',
        messageID: recruitmentThreads_id ? 'xM5NqhTq5' : 'B9Goe5scP',
        
      });
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/gc/rec/v2/components/form/thread.js / handleSubmit
      // `);
      
      // console.log(`
      //   ----- formDataObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(formDataObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
      //   newRecruitmentThreads_id: {green ${newRecruitmentThreads_id}}
      // `);
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      setButtonDisabled(false);
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      handleSnackbarOpen({
        
        variant: 'error',
        errorObj,
        
      });
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Hide Form
      // ---------------------------------------------
      
      if (recruitmentThreads_id) {
        setShowForm(false);
      }
      
      
      // ---------------------------------------------
      //   Scroll
      // ---------------------------------------------
      
      handleScrollTo({
        
        to: recruitmentThreads_id || newRecruitmentThreads_id || 'recruitmentThreads',
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
        
      });
      
      
      // ---------------------------------------------
      //   Loading Close
      // ---------------------------------------------
      
      handleLoadingClose();
      
      
    }
    
    
  };
  
  
  
  
  // --------------------------------------------------
  //   Component - Page Title
  // --------------------------------------------------
  
  const componentsArr = [];
  
  
  for (const [index, valueObj] of pagesArr.entries()) {
    
    
    // --------------------------------------------------
    //   Push
    // --------------------------------------------------
    
    componentsArr.push(
      <FormPageTitle
        key={index}
        type={valueObj.type}
        name={valueObj.name}
        language={valueObj.language}
      />
    );
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   Limit
  // --------------------------------------------------
  
  const limitImagesAndVideos = parseInt(process.env.NEXT_PUBLIC_USER_PAGE_IMAGES_AND_VIDEOS_LIMIT, 10);
  
  
  
  
  // --------------------------------------------------
  //   Validations
  // --------------------------------------------------
  
  const validationUsersUserIDObj = validationUsersUserID({ value: userID });
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/forum/v2/components/forum.js
  // `);
  
  // console.log(chalk`
  //   urlID: {green ${urlID}}
  //   gameCommunities_id: {green ${gameCommunities_id}}
  //   userCommunityID: {green ${userCommunityID}}
  //   userCommunities_id: {green ${userCommunities_id}}
    
  //   page: {green ${page}}
  //   count: {green ${count}}
  //   limit: {green ${limit}}
  // `);
  
  // console.log(`
  //   ----- arr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <Element
      name="forumThreads"
    >
      
      
      <Panel
        heading="ユーザーページ設定"
        defaultExpanded={false}
      >
        
        
        <p>
          ユーザーページの設定を行います。ユーザーページというのは、各ユーザーごとに用意される固有のページになります。URLやページのタイトルを変更することが可能です。
        </p>
        
        
        
        
        {/* フォーム */}
        <form>
          
          
          {/* Image Top */}
          <div
            css={css`
              border-top: 1px dashed #848484;
              margin: 24px 0 0 0;
              padding: 24px 0 0 0;
            `}
          >
            
            <h3
              css={css`
                font-weight: bold;
                margin: 0 0 6px 0;
              `}
            >
              トップ画像
            </h3>
            
            <p>
              ユーザーページのトップに表示される大きな画像です。横長の画像（推奨サイズ 1920 x ---）をアップロードしてください。
            </p>
            
            
            <FormImageAndVideo
              showVideoButton={false}
              descriptionImage="横長の大きな画像をアップロードしてください。"
              showImageCaption={true}
              limit={limitImagesAndVideos}
              imagesAndVideosObj={imagesAndVideosObj}
              setImagesAndVideosObj={setImagesAndVideosObj}
            />
            
          </div>
          
          
          
          
          {/* URL */}
          <div
            css={css`
              border-top: 1px dashed #848484;
              margin: 36px 0 0 0;
              padding: 24px 0 0 0;
            `}
          >
            
            <h3
              css={css`
                margin: 0 0 6px 0;
              `}
            >
              URL変更
            </h3>
            
            <p>
              ユーザーページのURLを入力してください。次の形式のURLになります。https://gameusers.org/ur/<span css={css`color: red;`}>***</span>　赤文字部分の文字列を入力してください。
            </p>
            
            <p
              css={css`
                margin: 0 0 8px 0;
              `}
            >
              利用できる文字は半角英数字とハイフン( - )アンダースコア( _ )です。3文字以上、32文字以内。
            </p>
            
            
            
            <TextField
              css={css`
                && {
                  width: 100%;
                  max-width: 500px;
                }
              `}
              label="URL"
              value={validationUsersUserIDObj.value}
              onChange={(eventObj) => setUserID(eventObj.target.value)}
              error={validationUsersUserIDObj.error}
              helperText={intl.formatMessage({ id: validationUsersUserIDObj.messageID }, { numberOfCharacters: validationUsersUserIDObj.numberOfCharacters })}
              margin="normal"
              inputProps={{
                maxLength: 32,
              }}
            />
            
          </div>
          
          
          
          
          {/* Page Title */}
          <div
            css={css`
              border-top: 1px dashed #848484;
              margin: 24px 0 0 0;
              padding: 24px 0 0 0;
            `}
          >
            
            <h3
              css={css`
                font-weight: bold;
                margin: 0 0 6px 0;
              `}
            >
              ページのタイトル変更
            </h3>
            
            
            <p
              css={css`
                margin: 0 0 12px 0;
              `}
            >
              ユーザーページのタイトルを変更できます。
            </p>
            
            
            {componentsArr}
            
          
          </div>
          
          
          
          
          {/* 参加条件 */}
          <div
            css={css`
              border-top: 1px dashed #848484;
              margin: 24px 0 0 0;
              padding: 24px 0 0 0;
            `}
          >
            
            <h3
              css={css`
                font-weight: bold;
                margin: 0 0 6px 0;
              `}
            >
              フォロー承認制
            </h3>
            
            <p
              css={css`
                margin: 0 0 12px 0;
              `}
            >
              以下をチェックすると、あなたをフォローするのにあなたの承認が必要になります。チェックを外すと誰でもフォローができるようになります。
            </p>
            
            
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={approval}
                    onChange={(eventObj) => setApproval(eventObj.target.checked)}
                  />
                }
                label="フォロー承認制にする"
              />
            </div>
            
          </div>
          
          
          
          
          {/* Submit Button */}
          <div
            css={css`
              display: flex;
              flex-flow: row wrap;
              border-top: 1px dashed #848484;
              margin: 24px 0 0 0;
              padding: 24px 0 0 0;
            `}
          >
            
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSubmit()}
              disabled={buttonDisabled}
            >
              送信する
            </Button>
            
          </div>
          
          
        </form>
        
        
      </Panel>
      
      
    </Element>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;