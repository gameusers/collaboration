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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationForumCommentsName } = require('../../../@database/forum-comments/validations/form');


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
    
    // 新規追加時
    this.pathArr = [props.forumThreads_id, 'formCommentObj'];
    
    // 編集時
    if (props.forumComments_id) {
      this.pathArr = [props.forumComments_id, 'formCommentObj'];
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
    
    const { classes, stores, storeForum, intl, gameCommunities_id, userCommunities_id, forumThreads_id, forumComments_id } = this.props;
    
    const { loginUsersObj } = stores.data;
    
    
    
    
    // --------------------------------------------------
    //   ログインしているかどうか
    // --------------------------------------------------
    
    let login = false; 
    
    if (Object.keys(loginUsersObj).length > 0) {
      login = true;
    }
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: this.pathArr });
    
    
    
    
    // --------------------------------------------------
    //   Store Forum
    // --------------------------------------------------
    
    const {
      
      dataObj,
      handleEdit,
      handleSubmitFormComment,
      handleDeleteComment,
      
    } = storeForum;
    
    
    // --------------------------------------------------
    //   Form Data
    // --------------------------------------------------
    
    const name = lodashGet(dataObj, [...this.pathArr, 'name'], '');
    const anonymity = lodashGet(dataObj, [...this.pathArr, 'anonymity'], false);
    const comment = lodashGet(dataObj, [...this.pathArr, 'comment'], '');
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    const validationForumCommentsNameObj = validationForumCommentsName({ value: name });
    
    
    // --------------------------------------------------
    //   Limit
    // --------------------------------------------------
    
    const limit = parseInt(process.env.FORUM_COMMENT_IMAGES_AND_VIDEOS_LIMIT, 10);
    
    
    // --------------------------------------------------
    //   返信を削除するか尋ねるダイアログを表示するための変数
    // --------------------------------------------------
    
    const showDeleteDialog = lodashGet(dataObj, [...this.pathArr, 'showDeleteDialog'], false);
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- this.pathArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(this.pathArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- validationForumCommentsNameObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(validationForumCommentsNameObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   /app/common/forum/components/form-comment.js
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   userCommunities_id: {green ${userCommunities_id}}
    //   forumThreads_id: {green ${forumThreads_id}}
    //   forumComments_id: {green ${forumComments_id}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <form
        name={`form-${forumComments_id}`}
        onSubmit={(eventObj) => handleSubmitFormComment({
          eventObj,
          pathArr: this.pathArr,
          gameCommunities_id,
          userCommunities_id,
          forumThreads_id,
          forumComments_id
        })}
      >
        
        
        {/* 名前 */}
        {!login &&
          <div>
            <TextField
              css={css`
                && {
                  width: 400px;
                  margin-top: 0;
                  
                  @media screen and (max-width: 480px) {
                    width: 100%;
                  }
                }
              `}
              id={`name-${forumThreads_id}`}
              placeholder="名前"
              value={name}
              value={validationForumCommentsNameObj.value}
              onChange={(eventObj) => handleEdit({
                pathArr: [...this.pathArr, 'name'],
                value: eventObj.target.value
              })}
              error={validationForumCommentsNameObj.error}
              disabled={buttonDisabled}
              margin="normal"
              inputProps={{
                maxLength: 50,
              }}
            />
          </div>
        }
        
        
        {/* Anonymity */}
        {login &&
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={anonymity}
                  onChange={(eventObj) => handleEdit({
                    pathArr: [...this.pathArr, 'anonymity'],
                    value: eventObj.target.checked
                  })}
                />
              }
              label="匿名にする"
            />
          </div>
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
            placeholder="コメントを書き込んでください"
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
        <div>
          
          <ImageAndVideoForm
            pathArr={this.pathArr}
            type="forum"
            descriptionImage="コメントに表示する画像をアップロードできます。"
            descriptionVideo="コメントに表示する動画を登録できます。"
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
            {forumComments_id ? 'コメントを編集する' : 'コメントを投稿する'}
          </Button>
          
          
          {/* 削除ボタン */}
          {forumComments_id &&
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
          {forumComments_id &&
            <div
              css={css`
                display: flex;
                flex-flow: row nowrap;
                margin: 0 0 0 auto;
              `}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleEdit({
                  pathArr: [...this.pathArr, 'show'],
                  value: false
                })}
                disabled={buttonDisabled}
              >
                閉じる
              </Button>
            </div>
          }
          
        </div>
        
        
        
        
        {/* コメントを削除するか尋ねるダイアログ */}
        <Dialog
          open={showDeleteDialog}
          onClose={() => handleEdit({
            pathArr: [...this.pathArr, 'showDeleteDialog'],
            value: false,
          })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          
          <DialogTitle id="alert-dialog-title">コメント削除</DialogTitle>
          
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              コメントを削除しますか？
            </DialogContentText>
          </DialogContent>
          
          <DialogActions>
            <div
              css={css`
                margin: 0 auto 0 0;
              `}
            >
              <Button
                onClick={() => handleDeleteComment({
                  pathArr: this.pathArr,
                  gameCommunities_id,
                  userCommunities_id,
                  forumThreads_id,
                  forumComments_id,
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