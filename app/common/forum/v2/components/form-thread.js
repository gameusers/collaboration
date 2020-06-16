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
import TextField from '@material-ui/core/TextField';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateLayout } from 'app/@states/layout.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from 'app/@modules/fetch.js';
import { CustomError } from 'app/@modules/error/custom.js';
import { getCookie } from 'app/@modules/cookie.js';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationForumThreadsName } from 'app/@database/forum-threads/validations/name.js';
import { validationForumThreadsComment } from 'app/@database/forum-threads/validations/comment.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import ImageAndVideoForm from 'app/common/image-and-video/v2/components/form.js';






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
    
    setGameCommunityObj,
    setForumThreadsForListObj,
    setForumThreadsObj,
    setForumCommentsObj,
    setForumRepliesObj,
    
    name,
    setName,
    comment,
    setComment,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  const [imagesAndVideosObj, setImagesAndVideosObj] = useState({
    
    _id: '',
    createdDate: '',
    updatedDate: '',
    users_id: '',
    type: 'forum',
    arr: [],
    
  });
  
  
  useEffect(() => {
    
    setButtonDisabled(false);
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  const stateLayout = ContainerStateLayout.useContainer();
  
  const {
    
    handleSnackbarOpen,
    handleDialogOpen,
    handleLoadingOpen,
    handleLoadingClose,
    handleScrollTo,
    
  } = stateLayout;
  
  // console.log(chalk`
  //   /app/common/forum/v2/components/form-thread.js
  // `);
  
  
  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------
  
  /**
   * スレッド作成・編集フォームを送信する
   * @param {Object} eventObj - イベント
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
   * @param {string} forumThreads_id - DB forum-threads _id / 編集するスレッドのID
   */
  const handleSubmit = async ({
    
    eventObj,
    gameCommunities_id,
    userCommunities_id,
    forumThreads_id,
    
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
      
      const validationHandleNameObj = validationForumThreadsName({ value: name });
      const validationForumThreadsCommentObj = validationForumThreadsComment({ value: comment });
      
      // console.log(`
      //   ----- validationHandleNameObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(validationHandleNameObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // ---------------------------------------------
      //   Validation Error
      // ---------------------------------------------
      
      if (
        validationHandleNameObj.error ||
        validationForumThreadsCommentObj.error
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
      
      // let resultObj = {};
      
      // if (gameCommunities_id) {
        
      //   resultObj = await fetchWrapper({
          
      //     urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/forum-threads/upsert-gc`,
      //     methodType: 'POST',
      //     formData: JSON.stringify(formDataObj),
          
      //   });
        
      // } else {
        
      //   resultObj = await fetchWrapper({
          
      //     urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/forum-threads/upsert-uc`,
      //     methodType: 'POST',
      //     formData: JSON.stringify(formDataObj),
          
      //   });
        
      // }
      
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // // ---------------------------------------------
      // //   Error
      // // ---------------------------------------------
      
      // if ('errorsArr' in resultObj) {
      //   throw new CustomError({ errorsArr: resultObj.errorsArr });
      // }
      
      
      
      
      // // --------------------------------------------------
      // //   gameCommunityObj
      // // --------------------------------------------------
      
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
      
      
      // // ---------------------------------------------
      // //   forumRepliesObj
      // // ---------------------------------------------
      
      // setForumRepliesObj(lodashGet(resultObj, ['data', 'forumRepliesObj'], {}));
      
      
      
      
      // // ---------------------------------------------
      // //   Close Form & Reset Form
      // // ---------------------------------------------
      
      // if (forumThreads_id) {
        
      //   // lodashSet(this.dataObj, [forumThreads_id, 'showForm'], false);
        
      // } else {
        
      //   setName('');
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
      
      
      
      
      // // ---------------------------------------------
      // //   forumThreads_id
      // // ---------------------------------------------
      
      // newForumThreads_id = lodashGet(resultObj, ['data', 'forumThreadsForListObj', `page1Obj`, 'arr', 0], '');
      
      // // forumThreads_id = 'YSYsoS4eo';
      
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
      //   Scroll
      // ---------------------------------------------
      
      // handleScrollTo({
        
      //   to: forumThreads_id,
      //   duration: 0,
      //   delay: 0,
      //   smooth: 'easeInOutQuart',
      //   offset: -50,
        
      // });
      
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
  //   Validations
  // --------------------------------------------------
  
  const validationForumThreadsNameObj = validationForumThreadsName({ value: name });
  
  
  
  
  // --------------------------------------------------
  //   Forum
  // --------------------------------------------------
  
  // const {
    
  //   dataObj,
  //   handleEdit,
  //   handleSubmit,
  //   handleDeleteThread,
    
  // } = storeForum;
  
  
  
  
  // --------------------------------------------------
  //   Limit
  // --------------------------------------------------
  
  const limit = parseInt(process.env.NEXT_PUBLIC_FORUM_THREAD_IMAGES_AND_VIDEOS_LIMIT, 10);
  
  
  
  
  // --------------------------------------------------
  //   スレッドを削除するか尋ねるダイアログを表示するための変数
  // --------------------------------------------------
  
  // const showDeleteDialog = lodashGet(dataObj, [...this.pathArr, 'showDeleteDialog'], false);
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/forum/components/form-thread.js
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
      css={css`
        padding: 0 0 8px;
      `}
      name={`form-${forumThreads_id}`}
      onSubmit={(eventObj) => handleSubmit({
        eventObj,
        gameCommunities_id,
        userCommunities_id,
        forumThreads_id,
      })}
    >
      
      
      {!forumThreads_id &&
        <p
          css={css`
            margin: 0 0 14px 0;
          `}
        >
          スレッドを新しく投稿する場合、こちらのフォームを利用して投稿してください。ログインして投稿するとスレッドをいつでも編集できるようになります。
        </p>
      }
      
      
      
      
      {/* Name */}
      <TextField
        css={css`
          && {
            width: 100%;
            max-width: 500px;
            ${forumThreads_id && `margin-top: 4px;`}
          }
        `}
        id="createTreadName"
        label="スレッド名"
        value={validationForumThreadsNameObj.value}
        onChange={(eventObj) => setName(eventObj.target.value)}
        error={validationForumThreadsNameObj.error}
        helperText={intl.formatMessage({ id: validationForumThreadsNameObj.messageID }, { numberOfCharacters: validationForumThreadsNameObj.numberOfCharacters })}
        margin="normal"
        inputProps={{
          maxLength: 100,
        }}
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
          placeholder="スレッドについての説明、書き込みルールなどがあれば、こちらに記述してください。"
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
        
        <ImageAndVideoForm
          descriptionImage="スレッドに表示する画像をアップロードできます。"
          descriptionVideo="スレッドに表示する動画を登録できます。"
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
          {forumThreads_id ? 'スレッドを編集する' : 'スレッドを作成する'}
        </Button>
        
        
        
        
        {/* 削除ボタン */}
        {forumThreads_id &&
          <div
            css={css`
              margin: 0 0 0 24px;
            `}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={
                buttonDisabled
                  ?
                    () => {}
                  :
                    // () => {}
                    () => handleDialogOpen({
                    
                      title: 'スレッド削除',
                      description: 'スレッドを削除しますか？',
                      // handle: handleFetch,
                      handle: () => {},
                      argumentsObj: {
                        gameCommunities_id,
                        userCommunities_id,
                        forumThreads_id,
                      },
                      
                    })
              }
              disabled={buttonDisabled}
            >
              削除する
            </Button>
          </div>
        }
        
        
        
        
        {/* Close */}
        {forumThreads_id &&
          <div
            css={css`
              margin: 0 0 0 auto;
            `}
          >
            <Button
              variant="outlined"
              color="secondary"
              // onClick={() => handleEdit({
              //   pathArr: [forumThreads_id, 'showForm'],
              //   value: false
              // })}
              disabled={buttonDisabled}
            >
              閉じる
            </Button>
          </div>
        }
        
      </div>
      
      
      
      
      {/* スレッドを削除するか尋ねるダイアログ */}
      {/*<Dialog
        open={showDeleteDialog}
        onClose={() => handleEdit({
          pathArr: [...this.pathArr, 'showDeleteDialog'],
          value: false,
        })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
        <DialogTitle id="alert-dialog-title">スレッド削除</DialogTitle>
        
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            スレッドを削除しますか？
          </DialogContentText>
        </DialogContent>
        
        <DialogActions>
          <div
            css={css`
              margin: 0 auto 0 0;
            `}
          >
            <Button
              onClick={() => handleDeleteThread({
                pathArr: this.pathArr,
                gameCommunities_id,
                userCommunities_id,
                forumThreads_id,
              })}
              color="primary"
              autoFocus
            >
              はい
            </Button>
          </div>
          
          <Button
            onClick={() => handleEdit({
              pathArr: [...this.pathArr, 'showDeleteDialog'],
              value: false,
            })}
            color="primary"
          >
            いいえ
          </Button>
        </DialogActions>
        
      </Dialog>*/}
      
      
    </form>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;