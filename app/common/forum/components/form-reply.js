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
//   Material UI / Icon
// ---------------------------------------------

import IconReply from '@material-ui/icons/Reply';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationForumCommentsName } = require('../../../@database/forum-comments/validations/form');


// ---------------------------------------------
//   Components
// ---------------------------------------------

import ImageAndVideoForm from '../../image-and-video/components/form';




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
    
    
    // 編集時
    if (props.forumReplies_id) {
      
      this.pathArr = [props.forumReplies_id, 'formReplyObj'];
      
    // 新規追加時　返信に対する返信
    } else if (props.forumComments_id && props.replyToForumComments_id) {
      
      this.pathArr = [props.forumComments_id, props.replyToForumComments_id, 'formReplyObj'];
      
    // 新規追加時
    } else if (props.forumComments_id) {
      
      this.pathArr = [props.forumComments_id, 'formReplyObj'];
      
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
      forumComments_id,
      forumReplies_id,
      replyToForumComments_id,
      settingAnonymity,
      
    } = this.props;
    
    // const { loginUsersObj } = stores.data;
    
    
    
    
    // --------------------------------------------------
    //   ログインしているかどうか
    // --------------------------------------------------
    
    const login = stores.data.getLogin();
    
    
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
      handleSubmitFormReply,
      handleDeleteReply,
      
    } = storeForum;
    
    const name = lodashGet(dataObj, [...this.pathArr, 'name'], '');
    const anonymity = lodashGet(dataObj, [...this.pathArr, 'anonymity'], false);
    const comment = lodashGet(dataObj, [...this.pathArr, 'comment'], '');
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    const validationForumCommentsNameObj = validationForumCommentsName({ value: name });
    
    
    // --------------------------------------------------
    //   Show
    // --------------------------------------------------
    
    const showFormReply = lodashGet(dataObj, [...this.pathArr, 'show'], false);
    
    
    // --------------------------------------------------
    //   Limit
    // --------------------------------------------------
    
    const limit = parseInt(process.env.FORUM_REPLY_IMAGES_AND_VIDEOS_LIMIT, 10);
    
    
    // --------------------------------------------------
    //   Reply to
    // --------------------------------------------------
    
    let replyToName = '';
    let repliesDataObj = {};
    let replyTo = '';
    
    if (forumReplies_id) {
      
      repliesDataObj = lodashGet(dataObj, [this.communities_id, 'forumRepliesObj', 'dataObj', forumReplies_id], {});
      replyToName = lodashGet(repliesDataObj, ['replyToName'], '');
      
    } else if (replyToForumComments_id) {
      
      repliesDataObj = lodashGet(dataObj, [this.communities_id, 'forumRepliesObj', 'dataObj', replyToForumComments_id], {});
      replyToName = lodashGet(repliesDataObj, ['cardPlayersObj', 'name'], repliesDataObj.name);
      
      if (!replyToName) {
        replyToName = 'ななしさん';
      }
      
    }
    
    if (replyToName) {
      replyTo = `${replyToName} | ${replyToForumComments_id} への返信`;
    }
    
    
    // --------------------------------------------------
    //   返信を削除するか尋ねるダイアログを表示するための変数
    // --------------------------------------------------
    
    const showDeleteDialog = lodashGet(dataObj, [...this.pathArr, 'showDeleteDialog'], false);
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   /app/common/forum/components/form-reply.js
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   userCommunities_id: {green ${userCommunities_id}}
    //   forumThreads_id: {green ${forumThreads_id}}
    //   forumComments_id: {green ${forumComments_id}}
    //   forumReplies_id: {green ${forumReplies_id}}
    //   replyToForumComments_id: {green ${replyToForumComments_id}}
    // `);
    
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
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <form
        css={forumReplies_id ? cssEdit : cssNew}
        name={`form-${forumComments_id}-reply`}
        onSubmit={(eventObj) => handleSubmitFormReply({
          eventObj,
          pathArr: this.pathArr,
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
        
        
        {/* 名前 */}
        {!login &&
          <div
            css={css`
              margin: 0 0 12px 0;
            `}
          >
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
              id="name"
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
        {(login && settingAnonymity) &&
          <div
            css={css`
              margin: 0 0 4px 0;
            `}
          >
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
              label="ハンドルネームを匿名にする"
            />
          </div>
        }
        
        
        
        
        {/* Comment */}
        <div>
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
            placeholder="返信を書き込んでください"
            value={comment}
            onChange={(eventObj) => handleEdit({
              pathArr: [...this.pathArr, 'comment'],
              value: eventObj.target.value
            })}
            maxLength={3000}
            disabled={buttonDisabled}
          />
        </div>
        
        
        
        
        {/* Image & Video */}
        <div
          css={css`
            margin: 12px 0 0 0;
          `}
        >
          <ImageAndVideoForm
            pathArr={this.pathArr}
            type="forum"
            descriptionImage="返信に表示する画像をアップロードできます。"
            descriptionVideo="返信に表示する動画を登録できます。"
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
            {forumReplies_id ? '返信を編集する' : '返信を投稿する'}
          </Button>
          
          
          {/* 削除ボタン */}
          {forumReplies_id &&
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
          <div
            css={css`
              margin: 0 0 0 auto;
            `}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleEdit({
                pathArr: [...this.pathArr, 'show'],
                value: !showFormReply
              })}
              disabled={buttonDisabled}
            >
              閉じる
            </Button>
          </div>
          
          
        </div>
        
        
        
        
        {/* 返信を削除するか尋ねるダイアログ */}
        <Dialog
          open={showDeleteDialog}
          onClose={() => handleEdit({
            pathArr: [...this.pathArr, 'showDeleteDialog'],
            value: false,
          })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          
          <DialogTitle id="alert-dialog-title">返信削除</DialogTitle>
          
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              返信を削除しますか？
            </DialogContentText>
          </DialogContent>
          
          <DialogActions>
            <div
              css={css`
                margin: 0 auto 0 0;
              `}
            >
              <Button
                onClick={() => handleDeleteReply({
                  pathArr: this.pathArr,
                  gameCommunities_id,
                  userCommunities_id,
                  forumThreads_id,
                  forumComments_id,
                  forumReplies_id,
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