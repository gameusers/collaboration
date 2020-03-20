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

import React from 'react';
import { inject, observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import TextareaAutosize from 'react-autosize-textarea';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationForumThreadsName } from '../../../@database/forum-threads/validations/name';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import ImageAndVideoForm from '../../image-and-video/components/form';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores', 'storeForum')
@observer
export default injectIntl(class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    super(props);
    
    
    // --------------------------------------------------
    //   Path Array
    // --------------------------------------------------
    
    this.communities_id = props.gameCommunities_id || props.userCommunities_id;
    
    // 新規追加時
    this.pathArr = [this.communities_id, 'formThreadObj'];
    
    // 編集時
    if (props.forumThreads_id) {
      this.pathArr = [props.forumThreads_id, 'formThreadObj'];
    }
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount() {
    
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    this.props.stores.layout.handleButtonEnable({ pathArr: this.pathArr });
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const {
      
      stores,
      storeForum,
      intl,
      gameCommunities_id,
      userCommunities_id,
      forumThreads_id,
      
    } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: this.pathArr });
    
    
    
    
    // --------------------------------------------------
    //   Forum
    // --------------------------------------------------
    
    const {
      
      dataObj,
      handleEdit,
      handleSubmitFormThread,
      handleDeleteThread,
      
    } = storeForum;
    
    
    // --------------------------------------------------
    //   Form Data
    // --------------------------------------------------
    
    const name = lodashGet(dataObj, [...this.pathArr, 'name'], '');
    const comment = lodashGet(dataObj, [...this.pathArr, 'comment'], '');
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    const validationForumThreadsNameObj = validationForumThreadsName({ value: name });
    
    
    // --------------------------------------------------
    //   Limit
    // --------------------------------------------------
    
    const limit = parseInt(process.env.FORUM_THREAD_IMAGES_AND_VIDEOS_LIMIT, 10);
    
    
    // --------------------------------------------------
    //   スレッドを削除するか尋ねるダイアログを表示するための変数
    // --------------------------------------------------
    
    const showDeleteDialog = lodashGet(dataObj, [...this.pathArr, 'showDeleteDialog'], false);
    
    
    
    
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
    //   /app/common/forum/components/form-thread.js
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
        onSubmit={(eventObj) => handleSubmitFormThread({
          eventObj,
          pathArr: this.pathArr,
          gameCommunities_id,
          userCommunities_id,
          forumThreads_id,
        })}
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
          onChange={(eventObj) => handleEdit({
            pathArr: [...this.pathArr, 'name'],
            value: eventObj.target.value
          })}
          error={validationForumThreadsNameObj.error}
          helperText={intl.formatMessage({ id: validationForumThreadsNameObj.messageID }, { numberOfCharacters: validationForumThreadsNameObj.numberOfCharacters })}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />
        
        
        
        
        {/* Description */}
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
            onChange={(eventObj) => handleEdit({
              pathArr: [...this.pathArr, 'comment'],
              value: eventObj.target.value
            })}
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
            pathArr={this.pathArr}
            type="forum"
            descriptionImage="スレッドに表示する画像をアップロードできます。"
            descriptionVideo="スレッドに表示する動画を登録できます。"
            showImageCaption={true}
            limit={limit}
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
                onClick={() => handleEdit({
                  pathArr: [...this.pathArr, 'showDeleteDialog'],
                  value: true,
                })}
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
                onClick={() => handleEdit({
                  pathArr: [forumThreads_id, 'showForm'],
                  value: false
                })}
                disabled={buttonDisabled}
              >
                閉じる
              </Button>
            </div>
          }
          
        </div>
        
        
        
        
        {/* スレッドを削除するか尋ねるダイアログ */}
        <Dialog
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
          
        </Dialog>
        
        
      </form>
    );
    
  }
  
});