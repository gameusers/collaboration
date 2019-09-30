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
    
    // 編集時
    this.pathArr = [props._id, 'formReplyObj'];
    
    // 新規追加時　返信に対する返信
    if (props.forumComments_id && props.replyToForumComments_id) {
      
      this.pathArr = [props.forumComments_id, props.replyToForumComments_id, 'formReplyObj'];
      
    // 新規追加時
    } else if (props.forumComments_id) {
      
      this.pathArr = [props.forumComments_id, 'formReplyObj'];
      
    }
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount(){
    
    
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
    
    const { stores, storeForum, intl, _id, gameCommunities_id, userCommunities_id, forumThreads_id, forumComments_id, replyToForumComments_id } = this.props;
    
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
    //   Forum
    // --------------------------------------------------
    
    const {
      
      dataObj,
      handleEdit,
      handleSubmitFormReply,
      
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
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   /app/common/forum/components/form-reply.js
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   userCommunities_id: {green ${userCommunities_id}}
    //   forumThreads_id: {green ${forumThreads_id}}
    //   forumComments_id: {green ${forumComments_id}}
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
        css={css`
          padding: 12px 0 12px 0;
        `}
        name={`form-${forumComments_id}-reply`}
        onSubmit={(eventObj) => handleSubmitFormReply({
          eventObj,
          pathArr: this.pathArr,
          gameCommunities_id,
          userCommunities_id,
          forumThreads_id,
          forumComments_id,
          replyToForumComments_id,
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
            placeholder="返信を書き込んでください"
            value={comment}
            onChange={(eventObj) => handleEdit({
            pathArr: [...this.pathArr, 'comment'],
            value: eventObj.target.value
          })}
            maxLength={3000}
          />
          
        </div>
        
        
        
        
        {/* Image & Video */}
        <div
          css={css`
            margin: 12px 0 0 0;
          `}
        >
          
          <ImageAndVideoForm
            pathArr={[...this.pathArr, 'formImagesAndVideosObj']}
            descriptionImage="返信に表示する画像をアップロードできます。"
            descriptionVideo="返信に表示する動画を登録できます。"
            arrayName="mainArr"
            caption={true}
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
            {_id ? '返信を編集する' : '返信を投稿する'}
          </Button>
          
          
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
        
        
      </form>
    );
    
  }
  
});