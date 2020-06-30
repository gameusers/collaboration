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
// import { Element } from 'react-scroll';
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

import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconClose from '@material-ui/icons/Close';
import IconSettings from '@material-ui/icons/Settings';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateUser } from 'app/@states/user.js';
import { ContainerStateGc } from 'app/@states/gc.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import FormSelect from 'app/common/id/components/form-select.js';
import FormEdit from 'app/common/id/components/form-edit.js';
import FormRegister from 'app/common/id/components/form-register.js';






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
    
    idsArr,
    setIDsArr,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formType, setFormType] = useState('select');
  
  
  useEffect(() => {
    
    setButtonDisabled(false);
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  // const stateUser = ContainerStateUser.useContainer();
  // const stateGc = ContainerStateGc.useContainer();
  
  // const { login } = stateUser;
  
  // const {
    
  //   recruitmentThreadsObj,
    
  // } = stateGc;
  
  
  
  
  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------
  
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
   * スレッド作成・編集フォームを送信する
   * @param {Object} eventObj - イベント
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} recruitmentThreads_id - DB recruitment-threads _id / 編集するスレッドのID
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
  
  
  
  
  // const {
    
  //   dataObj,
  //   handleEdit,
  //   handleDialogOpen,
    
  // } = storeIDForm;
  
  
  
  
  // --------------------------------------------------
  //   フォームを切り替える
  // --------------------------------------------------
  
  let component = '';
  
  if (formType === 'select') {
    
    // component =
    //   <FormSelect
    //     idsArr={idsArr}
    //     setIDsArr={setIDsArr}
    //   />
    // ;
    
  } else if (formType === 'edit') {
    
    // component =
    //   <FormEdit
    //     idsArr={idsArr}
    //     setIDsArr={setIDsArr}
    //     additionalGameLimit={1}
    //   />
    // ;
    
  } else {
    
    // component =
    //   <FormRegister
    //     additionalGameLimit={1}
    //   />
    // ;
    
  }
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/id/v2/components/form.js
  // `);
  
  // console.log(chalk`
  //   _id: {green ${_id}}
  // `);
  
  // console.log(`
  //   ----- idsArr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(idsArr)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <React.Fragment>
      
      
      {/* ダイアログ表示ボタン */}
      <Button
        variant="outlined"
        color="primary"
        disabled={buttonDisabled}
        startIcon={<IconSettings />}
        onClick={() => setDialogOpen(true)}
      >
        IDを登録・編集する
      </Button>
      
      
      
      
      {/* ダイアログ - ID選択＆登録フォーム */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullScreen
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
        
        {/* 上部メニュー */}
        <AppBar>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={() => setDialogOpen(false)}
              aria-label="Close"
            >
              <IconClose />
            </IconButton>
            <Typography variant="h6" color="inherit" >
              ID 入力フォーム
            </Typography>
          </Toolbar>
        </AppBar>
        
        
        
        
        {/* ボタン */}
        <div
          css={css`
            margin: 88px 0 0 12px;
            
            @media screen and (max-width: 480px) {
              margin: 76px 0 0 12px;
            }
          `}
        >
          
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            
            <Button
              disabled={buttonDisabled}
              onClick={() => setFormType('select')}
            >
              <span
                css={css`
                  font-weight: ${formType === 'select' ? 'bold' : 'normal' };
                `}
              >
                選択
              </span>
            </Button>
            
            
            <Button
              disabled={buttonDisabled}
              onClick={() => setFormType('edit')}
            >
              <span
                css={css`
                  font-weight: ${formType === 'edit' ? 'bold' : 'normal' };
                `}
              >
                編集
              </span>
            </Button>
            
            
            <Button
              disabled={buttonDisabled}
              onClick={() => setFormType('register')}
            >
              <span
                css={css`
                  font-weight: ${formType === 'register' ? 'bold' : 'normal' };
                `}
              >
                登録
              </span>
            </Button>
            
          </ButtonGroup>
          
        </div>
        
        
        
        
        {/* コンテンツ */}
        {component}
        
        
      </Dialog>
      
      
    </React.Fragment>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;