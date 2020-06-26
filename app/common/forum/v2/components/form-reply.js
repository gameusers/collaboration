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
import { useIntl } from 'react-intl';
import TextareaAutosize from 'react-autosize-textarea';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';


// ---------------------------------------------
//   Material UI / Icon
// ---------------------------------------------

import IconReply from '@material-ui/icons/Reply';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateLayout } from 'app/@states/layout.js';
import { ContainerStateGc } from 'app/@states/gc.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from 'app/@modules/fetch.js';
import { CustomError } from 'app/@modules/error/custom.js';
import { getCookie } from 'app/@modules/cookie.js';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationHandleName } from 'app/@validations/name.js';
import { validationBoolean } from 'app/@validations/boolean.js';

import { validationForumCommentsComment } from 'app/@database/forum-comments/validations/comment.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import FormName from 'app/common/form/components/name.js';
import FormImageAndVideo from 'app/common/image-and-video/v2/components/form.js';






// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cssNew = css`
  border-top: 1px dashed #BDBDBD;
  margin: 12px 0 0 0;
  padding: 12px 0 12px 0;
`;

const cssEdit = css`
  padding: 0 0 12px 0;
`;






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
    userCommunities_id,
    forumThreads_id,
    forumComments_id,
    forumReplies_id,
    replyToForumComments_id,
    enableAnonymity,
    
    setShowFormReply,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  const [name, setName] = useState('');
  const [anonymity, setAnonymity] = useState(false);
  const [comment, setComment] = useState('');
  const [imagesAndVideosObj, setImagesAndVideosObj] = useState({
    
    _id: '',
    createdDate: '',
    updatedDate: '',
    users_id: '',
    type: 'forum',
    arr: [],
    
  });
  
  
  useEffect(() => {
    
    
    // --------------------------------------------------
    //   Button Enable
    // --------------------------------------------------
    
    setButtonDisabled(false);
    
    
    // --------------------------------------------------
    //   編集用データを読み込む
    // --------------------------------------------------
    
    if (forumReplies_id) {
      handleGetEditData({ forumReplies_id });
    }
    
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  const stateLayout = ContainerStateLayout.useContainer();
  const stateGc = ContainerStateGc.useContainer();
  
  const {
    
    handleSnackbarOpen,
    handleLoadingOpen,
    handleLoadingClose,
    handleScrollTo,
    
  } = stateLayout;
  
  const {
    
    setGameCommunityObj,
    setForumThreadsForListObj,
    setForumThreadsObj,
    setForumCommentsObj,
    forumRepliesObj,
    setForumRepliesObj,
    
  } = stateGc;
  
  
  
  
  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------
  
  /**
   * 編集用データを読み込む
   * @param {string} forumReplies_id - DB forum-replies _id / 返信のID
   */
  const handleGetEditData = async ({ forumReplies_id }) => {
    
    
    try {
      
      
      // ---------------------------------------------
      //   forumReplies_id が存在しない場合エラー
      // ---------------------------------------------
      
      if (!forumReplies_id) {
        throw new CustomError({ errorsArr: [{ code: '3cWrPpMq8', messageID: 'Error' }] });
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
        
        forumComments_id: forumReplies_id,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/forum-comments/get-edit-data`,
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
      const anonymity = lodashGet(resultObj, ['data', 'anonymity'], false);
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
      setAnonymity(anonymity);
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
        
        to: forumComments_id,
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
        
      });
      
      
    }
    
    
  };
  
  
  /**
   * 返信作成・編集フォームを送信する
   * @param {Object} eventObj - イベント
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
   * @param {string} forumThreads_id - DB forum-threads _id / スレッドのID
   * @param {string} forumComments_id - DB forum-comments _id / コメントのID
   * @param {string} forumReplies_id - DB forum-comments _id / 返信のID（コメントと返信は同じコレクションなので、コメントのIDと同じもの）
   * @param {string} replyToForumComments_id - DB forum-comments _id / 返信先のID
   */
  const handleSubmit = async ({
    
    eventObj,
    gameCommunities_id,
    userCommunities_id,
    forumThreads_id,
    forumComments_id,
    forumReplies_id,
    replyToForumComments_id,
    
  }) => {
    
    
    // ---------------------------------------------
    //   フォームの送信処理停止
    // ---------------------------------------------
    
    eventObj.preventDefault();
    
    
    
    // ---------------------------------------------
    //   新規投稿時の forumReplies_id
    // ---------------------------------------------
    
    let newForumReplies_id = '';
    
    
    
    
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
      
      if ((!gameCommunities_id && !userCommunities_id) || !forumThreads_id || !forumComments_id) {
        throw new CustomError({ errorsArr: [{ code: 'ooDR_zAOu', messageID: '1YJnibkmh' }] });
      }
      
      
      // ---------------------------------------------
      //   Validation Error
      // ---------------------------------------------
      
      if (
        
        validationHandleName({ value: name }).error ||
        validationBoolean({ value: anonymity }).error ||
        validationForumCommentsComment({ value: comment }).error
        
      ) {
        
        throw new CustomError({ errorsArr: [{ code: 'keP5ra5TO', messageID: 'uwHIKBy7c' }] });
        
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
      
      console.log(`
        ----------------------------------------\n
        /app/common/forum/v2/components/form-reply.js - handleSubmit
      `);
      
      console.log(chalk`
        gameCommunities_id: {green ${gameCommunities_id}}
        userCommunities_id: {green ${userCommunities_id}}
        forumThreads_id: {green ${forumThreads_id}}
        forumComments_id: {green ${forumComments_id}}
        forumReplies_id: {green ${forumReplies_id}}
        replyToForumComments_id: {green ${replyToForumComments_id}}
        name: {green ${name}}
        anonymity: {green ${anonymity}}
        comment: {green ${comment}}
      `);
      
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
        forumComments_id,
        name,
        anonymity,
        comment,
        threadListLimit,
        threadLimit,
        commentLimit,
        replyLimit,
        
      };
      
      if (forumReplies_id) {
        formDataObj.forumReplies_id = forumReplies_id;
      }
      
      if (replyToForumComments_id) {
        formDataObj.replyToForumComments_id = replyToForumComments_id;
      }
      
      if (imagesAndVideosObj.arr.length !== 0) {
        formDataObj.imagesAndVideosObj = imagesAndVideosObj;
      }
      
      
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = {};
      
      if (gameCommunities_id) {
        
        resultObj = await fetchWrapper({
          
          urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/forum-comments/upsert-reply-gc`,
          methodType: 'POST',
          formData: JSON.stringify(formDataObj),
          
        });
        
      } else if (userCommunities_id) {
        
        resultObj = await fetchWrapper({
          
          urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/forum-comments/upsert-reply-uc`,
          methodType: 'POST',
          formData: JSON.stringify(formDataObj),
          
        });
        
      }
      
      
      console.log(`
        ----- resultObj -----\n
        ${util.inspect(resultObj, { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      
      
      // --------------------------------------------------
      //   gameCommunityObj
      // --------------------------------------------------
      
      // setGameCommunityObj(lodashGet(resultObj, ['data', 'updatedDateObj'], {}));
      
      
      // // ---------------------------------------------
      // //   forumThreadsForListObj
      // // ---------------------------------------------
      
      // setForumThreadsForListObj(lodashGet(resultObj, ['data', 'forumThreadsForListObj'], {}));
      
      
      // // ---------------------------------------------
      // //   forumThreadsObj
      // // ---------------------------------------------
      
      // setForumThreadsObj(lodashGet(resultObj, ['data', 'forumThreadsObj'], {}));
      
      
      // // ---------------------------------------------
      // //   forumCommentsObj
      // // ---------------------------------------------
      
      // setForumCommentsObj(lodashGet(resultObj, ['data', 'forumCommentsObj'], {}));
      
      
      // ---------------------------------------------
      //   forumRepliesObj
      // ---------------------------------------------
      
      setForumRepliesObj(lodashGet(resultObj, ['data', 'forumRepliesObj'], {}));
      
      
      
      
      // // ---------------------------------------------
      // //   Close Form & Reset Form
      // // ---------------------------------------------
      
      // if (forumComments_id) {
        
      //   // setShowFormComment(false);
        
      // } else {
        
      //   setName('');
      //   setAnonymity(false);
      //   setComment('');
      //   setImagesAndVideosObj({
          
      //     _id: '',
      //     createdDate: '',
      //     updatedDate: '',
      //     users_id: '',
      //     type: 'forum',
      //     arr: [],
          
      //   });
        
      // }
      
      
      
      
      // ---------------------------------------------
      //   新規投稿時の forumComments_id
      // ---------------------------------------------
      
      newForumReplies_id = lodashGet(resultObj, ['data', 'forumRepliesObj', forumComments_id, 'page1Obj', 'arr', 0], '');
      
      // console.log(chalk`
      //   newForumComments_id: {green ${newForumComments_id}}
      // `);
      
      
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      handleSnackbarOpen({
        variant: 'success',
        messageID: forumComments_id ? 'NKsMLWvkt' : 'fhi9lUaap',
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
      //   Close Form & Reset Form
      // ---------------------------------------------
      
      if (forumComments_id) {
        
        setShowFormReply(false);
        
      } else {
        
        setName('');
        setAnonymity(false);
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
      //   Scroll To
      // ---------------------------------------------
      
      handleScrollTo({
        
        to: forumComments_id || newForumReplies_id || forumComments_id || forumThreads_id || 'forumThreads',
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
  //   handleSubmitFormReply,
  //   handleDeleteReply,
    
  // } = storeForum;
  
  // const name = lodashGet(dataObj, [...this.pathArr, 'name'], '');
  // const anonymity = lodashGet(dataObj, [...this.pathArr, 'anonymity'], false);
  // const comment = lodashGet(dataObj, [...this.pathArr, 'comment'], '');
  
  
  // --------------------------------------------------
  //   Limit
  // --------------------------------------------------
  
  const limit = parseInt(process.env.NEXT_PUBLIC_FORUM_REPLY_IMAGES_AND_VIDEOS_LIMIT, 10);
  
  
  
  
  // --------------------------------------------------
  //   Reply to
  // --------------------------------------------------
  
  let replyToName = '';
  let repliesDataObj = {};
  let replyTo = '';
  
  if (forumReplies_id) {
    
    repliesDataObj = lodashGet(forumRepliesObj, ['dataObj', forumReplies_id], {});
    replyToName = lodashGet(repliesDataObj, ['replyToName'], '');
    
  } else if (replyToForumComments_id) {
    
    repliesDataObj = lodashGet(forumRepliesObj, ['dataObj', replyToForumComments_id], {});
    replyToName = lodashGet(repliesDataObj, ['cardPlayersObj', 'name'], repliesDataObj.name);
    
    if (!replyToName) {
      replyToName = 'ななしさん';
    }
    
  }
  
  if (replyToName) {
    replyTo = `${replyToName} | ${replyToForumComments_id} への返信`;
  }
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/forum/v2/components/form-thread.js
  // `);
  
  // console.log(`
  //   ----- imagesAndVideosObj -----\n
  //   ${util.inspect(imagesAndVideosObj, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(`
  //   ----- validationForumThreadsNameObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(validationForumThreadsNameObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(chalk`
  //   forumThreads_id: {green ${forumThreads_id}}
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <form
      css={forumReplies_id ? cssEdit : cssNew}
      name={`form-${forumComments_id}-reply`}
      onSubmit={(eventObj) => handleSubmit({
        eventObj,
        gameCommunities_id,
        userCommunities_id,
        forumThreads_id,
        forumComments_id,
        forumReplies_id,
        replyToForumComments_id,
      })}
    >
      
      
      {/* Reply To */}
      {replyTo &&
        <div
          css={css`
            display: flex;
            flex-flow: row nowrap;
            margin: 0 0 12px 0;
            color: #7401DF;
          `}
        >
          <IconReply
            css={css`
              && {
                font-size: 16px;
                margin: 4px 4px 0 0;
              }
            `}
          />
          <p>{replyTo}</p>
        </div>
      }
      
      
      
      
      {/* Name */}
      <FormName
        name={name}
        setName={setName}
        anonymity={anonymity}
        setAnonymity={setAnonymity}
        enableAnonymity={enableAnonymity}
      />
      
      
      
      
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
          placeholder="返信を書き込んでください。"
          value={comment}
          onChange={(eventObj) => setComment(eventObj.target.value)}
          maxLength={3000}
          disabled={buttonDisabled}
        />
        
      </div>
      
      
      
      
      {/* Form Images & Videos */}
      <div
        css={css`
          margin: 12px 0 0 0;
        `}
      >
        
        <FormImageAndVideo
          type="forum"
          descriptionImage="返信に表示する画像をアップロードできます。"
          descriptionVideo="返信に表示する動画を登録できます。"
          showImageCaption={true}
          limit={limit}
          imagesAndVideosObj={imagesAndVideosObj}
          setImagesAndVideosObj={setImagesAndVideosObj}
        />
        
      </div>
      
      
      
      
      {/* Buttons */}
      <div
        css={css`
          display: flex;
          flex-flow: row nowrap;
          margin: 36px 0 0 0;
        `}
      >
        
        
        {/* Submit */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={buttonDisabled}
        >
          {forumReplies_id ? '返信を編集する' : '返信を投稿する'}
        </Button>
        
        
        
        
        {/* Close */}
        {forumComments_id &&
          <div
            css={css`
              margin: 0 0 0 auto;
            `}
          >
            <Button
              variant="outlined"
              color="secondary"
              disabled={buttonDisabled}
              onClick={() => setShowFormReply(false)}
            >
              閉じる
            </Button>
          </div>
        }
        
      </div>
      
      
    </form>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;