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
    //   Unique ID
    // --------------------------------------------------
    
    // 編集時
    this.uniqueID = `${props._id}-formReply`;
    
    // 新規追加時
    if (props.forumComments_id) {
      
      this.uniqueID = `${props.forumComments_id}-formReply`;
      
    // 新規追加時　返信に対する返信
    } else if (props.forumComments_id && props.replyToForumComments_id) {
      
      this.uniqueID = `${props.forumComments_id}-${props.replyToForumComments_id}-formReply`;
      
    }
    
    
    // --------------------------------------------------
    //   Path Array
    // --------------------------------------------------
    
    // 編集時
    this.pathArr = [props._id, 'formReplyObj'];
    this.showFormReplyPathArr = [props._id, 'formReplyObj', 'show'];
    
    // 新規追加時
    if (props.forumComments_id) {
      
      this.pathArr = [props.forumComments_id, 'formReplyObj'];
      this.showFormReplyPathArr = [props.forumComments_id, 'formReplyObj', 'show'];
      
    // 新規追加時　返信に対する返信
    } else if (props.forumComments_id && props.replyToForumComments_id) {
      
      this.pathArr = [props.forumComments_id, props.replyToForumComments_id, 'formReplyObj'];
      this.showFormReplyPathArr = [props.forumComments_id, props.replyToForumComments_id, 'formReplyObj', 'show'];
      
    }
    
    // this.showFormReplyPathArr = this.pathArr.push('show');
    // console.log(chalk`
    //   constructor
    // `);
    
  }
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount(){
    
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    // const _id = this.props.gameCommunities_id || this.props.userCommunities_id;
    // const _idForum = this.props.forumComments_id || this.props.forumComments_id;
    this.props.stores.layout.handleButtonEnable({ _id: this.uniqueID });
    
    
  }
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, storeForum, intl, _id, gameCommunities_id, userCommunities_id, forumThreads_id, forumComments_id, replyToForumComments_id } = this.props;
    
    const communities_id = gameCommunities_id || userCommunities_id;
    
    
    // --------------------------------------------------
    //   Unique ID
    // --------------------------------------------------
    
    // 編集時
    // let uniqueID = `${_id}-formReply`;
    
    // // 新規追加時
    // if (forumComments_id) {
      
    //   uniqueID = `${forumComments_id}-formReply`;
      
    // // 新規追加時　返信に対する返信
    // } else if (forumComments_id && replyToForumComments_id) {
      
    //   uniqueID = `${forumComments_id}-${replyToForumComments_id}-formReply`;
      
    // }
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = lodashGet(stores, ['layout', 'buttonDisabledObj', this.uniqueID], true);
    
    
    
    
    // --------------------------------------------------
    //   Forum
    // --------------------------------------------------
    
    const {
      
      dataObj,
      handleEdit,
      handleSubmitFormThread,
      
    } = storeForum;
    
    
    // --------------------------------------------------
    //   Form Thread
    // --------------------------------------------------
    
    const comment = lodashGet(dataObj, [this.uniqueID, 'comment'], '');
    
    
    // --------------------------------------------------
    //   Show
    // --------------------------------------------------
    
    // let showFormReplyPathArr = [communities_id, forumComments_id, 'showFormReply'];
    
    // if (replyToForumComments_id) {
    //   showFormReplyPathArr = [communities_id, forumComments_id, replyToForumComments_id, 'showFormReply'];
    //   // showFormReply = lodashGet(dataObj, [communities_id, forumComments_id, replyToForumComments_id, 'showFormReply'], false);
    // }
    
    // const showFormReply = lodashGet(dataObj, [forumComments_id, 'formReplyObj', 'show'], false);
    const showFormReply = lodashGet(dataObj, this.showFormReplyPathArr, false);
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- validationForumThreadsNameObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(validationForumThreadsNameObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   /app/common/forum/components/form-comment.js
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   userCommunities_id: {green ${userCommunities_id}}
    //   forumThreads_id: {green ${forumThreads_id}}
    //   forumComments_id: {green ${forumComments_id}}
    // `);
    
    console.log(`
      ----- this.pathArr -----\n
      ${util.inspect(JSON.parse(JSON.stringify(this.pathArr)), { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    // console.log(chalk`
    //   this.uniqueID: {green ${this.uniqueID}}
    // `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <div
        css={css`
          padding: 12px 0 12px 0;
        `}
      >
        
        
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
            pathArr: [_id, forumComments_id, 'formCommentObj', 'comment'],
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
            _id={this.uniqueID}
            descriptionImage="返信に表示する画像をアップロードできます。"
            descriptionVideo="返信に表示する動画を登録できます。"
            arrayName="mainArr"
            caption={true}
            limit={3}
          />
          
        </div>
        
        
        
        
        {/* Buttons */}
        <div
          css={css`
            display: flex;
            flex-flow: row nowrap;
            margin: 16px 0 0 0;
          `}
        >
          
          
          {/* Submit */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSubmitFormThread({ gameCommunities_id, userCommunities_id, forumComments_id })}
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
                pathArr: this.showFormReplyPathArr,
                value: !showFormReply
              })}
              disabled={buttonDisabled}
            >
              閉じる
            </Button>
          </div>
          
          
        </div>
        
        
      </div>
    );
    
  }
  
});