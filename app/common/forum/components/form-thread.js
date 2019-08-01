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
//   Validations
// ---------------------------------------------

const { validationForumThreadsName } = require('../../../@database/forum-threads/validations/name');


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
    
    const communities_id = this.props.gameCommunities_id || this.props.userCommunities_id;
    
    // 新規追加時
    this.pathArr = [communities_id, 'formThreadObj'];
    
    // 編集時
    if (props.forumThreads_id) {
      this.pathArr = [props.forumThreads_id, 'formThreadObj'];
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
    
    // const _id = this.props.gameCommunities_id || this.props.userCommunities_id;
    // this.props.stores.layout.handleButtonEnable({ _id: `${_id}-${this.props.forumThreads_id}-formThread` });
    
    
  }
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, storeForum, intl, gameCommunities_id, userCommunities_id, forumThreads_id } = this.props;
    
    const communities_id = gameCommunities_id || userCommunities_id;
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: [...this.pathArr, 'buttonDisabled'] });
    // const buttonDisabled = lodashGet(stores, ['layout', 'buttonDisabledObj', `${_id}-${forumThreads_id}-formThread`], true);
    
    
    
    
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
    
    const name = lodashGet(dataObj, [...this.pathArr, 'name'], '');
    const description = lodashGet(dataObj, [...this.pathArr, 'description'], '');
    
    const validationForumThreadsNameObj = validationForumThreadsName({ value: name });
    
    
    // --------------------------------------------------
    //   Show
    // --------------------------------------------------
    
    const showForm = lodashGet(dataObj, [communities_id, 'threadObj', forumThreads_id, 'showForm'], false);
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
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
      <div
        css={css`
          padding: 0 0 8px;
        `}
      >
        
        
        {/* Name */}
        <TextField
          css={css`
            && {
              width: 100%;
              max-width: 500px;
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
            value={description}
            onChange={(eventObj) => handleEdit({
            pathArr: [...this.pathArr, 'description'],
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
            // _id={`${_id}-${forumThreads_id}`}
            pathArr={[...this.pathArr, 'formImagesAndVideosObj']}
            descriptionImage="スレッドに表示する画像をアップロードできます。"
            descriptionVideo="スレッドに表示する動画を登録できます。"
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
          
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSubmitFormThread({ gameCommunities_id, userCommunities_id, forumThreads_id })}
            disabled={buttonDisabled}
          >
            {forumThreads_id !== 'create' ? 'スレッドを編集する' : 'スレッドを作成する'}
          </Button>
          
          
          {forumThreads_id !== 'create' &&
            <div
              css={css`
                margin: 0 0 0 auto;
              `}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleEdit({
                  pathArr: [communities_id, 'threadObj', forumThreads_id, 'showForm'],
                  value: !showForm
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