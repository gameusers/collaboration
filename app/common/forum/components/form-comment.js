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
  
  componentDidMount(){
    
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    this.props.stores.layout.handleButtonEnable({ pathArr: [...this.pathArr, 'buttonDisabled'] });
    
    
  }
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, storeForum, intl, gameCommunities_id, userCommunities_id, forumThreads_id, forumComments_id } = this.props;
    
    // const _id = gameCommunities_id || userCommunities_id;
    // const _idForum = forumThreads_id || forumComments_id;
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: [...this.pathArr, 'buttonDisabled'] });
    
    
    
    
    // --------------------------------------------------
    //   Forum
    // --------------------------------------------------
    
    const {
      
      dataObj,
      handleEdit,
      handleSubmitFormThread,
      
    } = storeForum;
    
    const comment = lodashGet(dataObj, [...this.pathArr, 'comment'], '');
    
    
    // --------------------------------------------------
    //   Show
    // --------------------------------------------------
    
    const showFormComment = lodashGet(dataObj, [...this.pathArr, 'show'], false);
    
    
    // --------------------------------------------------
    //   Form Thread
    // --------------------------------------------------
    
    // const comment = lodashGet(dataObj, [_id, forumComments_id, 'formCommentObj', 'comment'], '');
    
    // const validationForumThreadsNameObj = validationForumThreadsName({ value: name });
    
    
    
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
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <div
        css={css`
          
        `}
      >
        
        
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
            placeholder="コメントを書き込んでください"
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
            descriptionImage="コメントに表示する画像をアップロードできます。"
            descriptionVideo="コメントに表示する動画を登録できます。"
            arrayName="mainArr"
            caption={true}
            limit={3}
          />
          
        </div>
        
        
        
        
        {/* Buttons */}
        <div
          css={css`
            margin: 16px 0 0 0;
          `}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSubmitFormThread({ gameCommunities_id, userCommunities_id, forumComments_id })}
            disabled={buttonDisabled}
          >
            {forumComments_id ? 'コメントを編集する' : 'コメントを投稿する'}
          </Button>
          
          
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
                  value: !showFormComment
                })}
                disabled={buttonDisabled}
              >
                閉じる
              </Button>
            </div>
          }
          
        </div>
        
        
      </div>
    );
    
  }
  
});