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

import React, { useState, useEffect, useContext } from 'react';
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
//   Validations
// ---------------------------------------------

import { validationForumThreadsName } from 'app/@database/forum-threads/validations/name.js';


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
  //   props
  // --------------------------------------------------
  
  const {
    
    gameCommunities_id,
    userCommunities_id,
    forumThreads_id,
    
    name,
    setName,
    comment,
    setComment,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  const stateLayout = ContainerStateLayout.useContainer();
  
  const { handleSnackbarOpen, handleDialogOpen } = stateLayout;
  
  
  
  
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
  //   handleSubmitFormThread,
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
      // onSubmit={(eventObj) => handleSubmitFormThread({
      //   eventObj,
      //   pathArr: this.pathArr,
      //   gameCommunities_id,
      //   userCommunities_id,
      //   forumThreads_id,
      // })}
    >
      
      
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
          margin: 24px 0 0 0;
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