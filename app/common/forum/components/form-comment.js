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
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: [...this.pathArr, 'buttonDisabled'] });
    
    
    
    
    // --------------------------------------------------
    //   Store Forum
    // --------------------------------------------------
    
    const {
      
      dataObj,
      handleEdit,
      handleSubmitFormThread,
      
    } = storeForum;
    
    
    // --------------------------------------------------
    //   Form Data
    // --------------------------------------------------
    
    const name = lodashGet(dataObj, [...this.pathArr, 'name'], '');
    const comment = lodashGet(dataObj, [...this.pathArr, 'comment'], '');
    
    
    // --------------------------------------------------
    //   Show
    // --------------------------------------------------
    
    // const showFormComment = lodashGet(dataObj, [...this.pathArr, 'showFormComment'], false);
    
    
    
    
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
      <form onSubmit={(eventObj) => handleSubmitFormThread({ gameCommunities_id, userCommunities_id, forumComments_id })}>
        
        
        {/* Login ID */}
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
            label="名前"
            value={name}
            // value={validationUsersLoginIDObj.value}
            // onChange={(eventObj) => handleEdit({
            //   pathArr: ['loginID'],
            //   value: eventObj.target.value
            // })}
            // error={validationUsersLoginIDObj.error}
            // helperText={intl.formatMessage({ id: validationUsersLoginIDObj.messageID }, { numberOfCharacters: validationUsersLoginIDObj.numberOfCharacters })}
            disabled={buttonDisabled}
            margin="normal"
            inputProps={{
              maxLength: 50,
            }}
            // InputProps={{
            //   startAdornment: (
            //     <InputAdornment position="start">
            //       <IconID />
            //     </InputAdornment>
            //   ),
            // }}
          />
        </div>
        
        
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
            descriptionImage="コメントに表示する画像をアップロードできます。"
            descriptionVideo="コメントに表示する動画を登録できます。"
            showImageCaption={true}
            limit={3}
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
            // onClick={() => handleSubmitFormThread({ gameCommunities_id, userCommunities_id, forumComments_id })}
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
                  value: false
                })}
                disabled={buttonDisabled}
              >
                閉じる
              </Button>
            </div>
          }
          
        </div>
        
        
      </form>
    );
    
  }
  
});